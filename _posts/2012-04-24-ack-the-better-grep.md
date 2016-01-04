---
layout: post
title: "ack: the better grep"
comments: true
category: technology
tags: [grep]
---
I am not sure how many of you already know about this or started using this tool called **ack**. I was recently introduced to this by one of my colleagues at work. So what is ack ? ack is a super fast and efficient grep. I have been using it extensively and I am no longer a grepper :)

## Why ack ?

* **It's Fast** : Ack only searches the stuff that makes sense to search. Perl's regular expressions are highly optimized.
* **It's Portable** : ack is pure Perl
* **It ignores VCS directories**: ack recursively searches by default while ignoring your `.git`, `.svn`, `cvs` and other VCS directories.
* **Perl regular expressions**: For example, to generate a list of all files `#include`d in your C code, use this:
    
    `ack --cc '#include\s+<(.*)>' --output '$1' -h`
* **Match highlighting**: ack has flexible match highlighting, where you can specify the colors to use in its output.
* **\"ack\" is shorter than \"grep\" to type ;)**

So go ahead and use ack. You can intall it from [here](http://betterthangrep.com/install/) 



