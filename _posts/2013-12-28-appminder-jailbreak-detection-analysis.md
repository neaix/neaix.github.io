---
comments: true
date: 2013-12-28 12:38:07+00:00
layout: post
slug: appminder-jailbreak-detection-analysis
title: 'AppMinder jailbreak detection analysis'
description: 'AppMinder jailbreak detection analysis'
categories:
- iOS
tags:
- AppMinder
- Neso labs
- jailbreak detection
- iOS
- blog
---
 

Neso Lab's [AppMinder](http://appminder.nesolabs.de/) project is another attempt at providing jailbreak detection for enterprise iOS applications (and perhaps AppStore apps). It provides three variants of jailbreak detections codes, each with an increasing level of self integrity checks and code obfuscation, and optionally including anti-debugging checks. It generates a piece of code with a function containing inline assembly code which can be inserted into the app's source code and called where jailbreak detection needs to be implemented. The generated code is metamorphic with a random function name. Metamorphism is achieved by a combination of register interchanges, instruction reordering, inserting dead code such as unused ``push``, ``pop`` and ``cmp`` instructions.

{% highlight c %}
#if !(TARGET_IPHONE_SIMULATOR)
__attribute__ ((always_inline)) static void
FsNZKlEjkXtDxShPvqbttYCo (void)
{
        asm volatile ("mov r0, r0;mov r2, #152;sub r0, r2, #121;sub r1, r1;mov r2, #1;sub r2, #1;sub r3, r3;mov r4, #23;add r12, r4, #3;svc 0x80;mov r0, #76;mov r1, #2;b #2;push {r0-r12};mov r12, r1;b #2;pop {r0-r15};sub r1, r1, r1;b #1;cmp r0, r10;mov r0, r1;svc 0x80;cmp r0, #1;b #2;stmdb sp!, {r0-r12};bne #1;b #8;mov r0, #1;mov r12, #1;svc 0x80;mov r2, #12;sub r2, r2, r0;add r2, pc;bx r2;mov r0, #1;mov r12, #1;svc 0x80;b #1;cmp r0, r10;mov r1, r1;sub r1, r1, r1;b #2;push {r0-r12};mov r0, r1;mov r12, #256;asr r12, #7;b #1;cmp r0, r10;mov r1, #29;mov r0, r1;b #2;stmdb sp!, {r0-r12};svc 0x80;mov r2, r2;sub r1, r1, r1;mov r1, r1;mov r3, r1;add r3, r3, #1;cmp r0, r3;mov r2, r2;beq #8;mov r0, #1;mov r12, #1;svc 0x80;mov r1, r0;add r0, r0, #3;add r0, pc;mov pc, r0;pop {r0-r15};mov r0, r1;mov r0, r0;mov r3, #34;sub r0, r3, #3;sub r2, r2;mov r1, r2;sub r2, r2;sub r12, r12;mov r3, r12;mov r4, #193;sub r12, r4, #167;svc 0x80;b #2;pop {r0-r15};" : : : "r0", "r1", "r2", "r3", "r4", "r12", "cc", "memory");
}
#endif
{% endhighlight %}

The code can be made a little more readable using ``cat jbdetect.c | tr ';' '\n'``.


The code makes use of ``svc 0x80`` instruction throughout to invoke system calls. ``svc 0x80`` is the ARM counterpart of Intel's ``int 0x80`` instruction, used to invoke system calls. In iOS, which is a derivative of Darwin, the system call number is passed in r12 and the arguments in r0-r3. The return value is optionally returned in r0. ``svc`` also goes by the name of ``swi`` or _software interrupt_.


## Debugger detection

Process tracing utilities and debuggers make use of ``ptrace`` system call to trace a running process. If the 'Anti-debugging option' was selected, the code tries to detect and deny any debugging attempts. It does this by invoking ``ptrace`` (system call 26) on the current process with an argument of 31, i.e. ``PT_DENY_ATTACH``. Quoting from the man page:

<figure align="center">
    <img src="/images/ptrace.png">
    <figcaption>PT_DENY_ATTACH in the man page</figcaption>
</figure>

The process is killed if a debugger is detected. Additionally, debuggers are denied to trace the process in any future requests. gdb shows a "Operation not permitted" message if it tries to attach to a process which has called ``ptrace`` with ``PT_DENY_ATTACH``.


A complete list of system calls can be found in [sys/syscall.h](http://www.opensource.apple.com/source/xnu/xnu-1228.5.20/bsd/sys/syscall.h).


## Jailbreak Detection

The code detects jailbreaks using ``fork``. On non-jailbroken iOS, the sandbox restricts the use of ``fork``. Calling ``fork`` fails with a return value of 1. However, on a jailbroken iOS, ``fork`` succeeds and spawns a new process. The code terminates the process using ``exit(1)`` if ``fork`` does not return 1.

<p></p>

The code does not do anything new, and does not even conceal its presence. It can be easily identified in memory by simply looking for ``svc 0x80`` instructions, which assemble to ``80 00 00 EF``. Given the fact that jailbreak detection is inherently self defeating, it becomes trivial to bypass the above checks.
