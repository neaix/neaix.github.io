---
comments: true
date: 2009-06-30 15:14:29+00:00
layout: post
slug: formatshield
title: 'FormatShield: A tool to defend against format string attacks'
description: 'FormatShield: Download formatshield source'
wordpress_id: 291
categories:
- Archive
tags:
- binary rewriting
- format string attacks
- formatshield
- memory corruption attacks
- blog
---

FormatShield is a library that intercepts call to vulnerable functions and uses binary rewriting to defend against format string attacks. It identifies the vulnerable call sites in a running process and dumps the corresponding context information in the ELF binary of the process. Attacks are detected when format specifiers are found at these contexts of the vulnerable call sites.

FormatShield provides wrappers for the following libc functions:

{% highlight c %}
int printf(const char *format, ...)
int fprintf(FILE *stream, const char *format, ...)
int sprintf(char *str, const char *format, ...)
int snprintf(char *str, size_t size, const char *format, ...)
int vprintf(const char *format, va_list ap)
int vfprintf(FILE *stream, const char *format, va_list ap)
int vsprintf(char *str, const char *format, va_list ap)
int vsnprintf(char *str, size_t size, const char *format, va_list ap)
void syslog(int priority, const char *format, ...)
void vsyslog(int priority, const char *format, va_list ap)
{% endhighlight %}

On detecting an attack, the victim process is killed and a log is written to syslog. More details about the inner working of FormatShield are available in the [research paper](/assets/files/formatshield-acisp08.pdf).

[Formatshield source](https://github.com/pank4j/formatshield) is licensed as GNU GPL v3 and is archived on github. It is available only for testing/research, please use it at your own risk.
