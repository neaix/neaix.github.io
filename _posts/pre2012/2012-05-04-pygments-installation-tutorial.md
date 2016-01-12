---
layout: post
title: "Pygments安装教程"
description: ""
category: 博客
tags: [Jekyll, Pygments]
---

在Windows环境下安装Pygments

## 安装Python

安装Python通常有两种方法：

- 安装ActivePython

- 安装来自Python.org的Python 

## 安装easy_install

1. 下载脚本：http://peak.telecommunity.com/dist/ez_setup.py

2. 执行ez_setup.py。可以在 IDLE中通过文件菜单打开脚本，然后Ctrl  + F5执行。

3. 添加环境变量，比如：C:\Python\Scripts\

##安装Pygments

### 打开命令提示符，执行：


{% highlight rb %}
puts "Hello,world!"
{% endhighlight %}

### 生成css文件：

{% highlight rb %}
pygmentize -S default -f html > css/pygments/default.css
{% endhighlight %}

### 在html中包括css文件

### 安装补丁

为了防止出现错误：`Liquid eror: bad file descriptor`，你需要安装该补丁([下载地址](https://gist.github.com/1185645))。然后执行以下命令：

{% highlight sh linenos %}
cd /c/Ruby192/lib/ruby/gems/1.9.1/gems/albino-1.3.3/lib; 
patch < 0001-albino-windows-refactor.patch
{% endhighlight %}

参见：http://bradleygrainger.com/2011/09/07/how-to-use-github-pages-on-windows.html
