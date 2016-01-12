---
layout: post
title: 归博偶书
date: 2014-05-01 16:57:00
category: 感慨
tags: Jekyll
---

不觉之间，博客又荒废已久。前阵子突然发现主题中的背景素材链接已经失效，一时变得丑陋不堪，于是紧急修改了样式。然而诸多页面中的字体异常，拖到今天才修复。

大概是这半年太过匆忙，没完没了的需求和加班，逐渐让人麻木。无感无发，连坚持了一年的网络日记也停摆了好些时候。然而这样的状态终究会让我空虚。没有文字记录的岁月是苍白的。我基于无法记起自己曾经做过什么，想过什么。

五月的第一天，睡了半天觉，剩下的半天也没有出门。阴沉的天气，以及持续了数天的感冒，让我丝毫没有出门的冲动。就像一直不好的胃口。

今天试图修复博客中的字体问题，然而push之后一直没有生效。困惑之中检查邮箱，才知道页面没有成功生成。于是决定在本地搭建jekyll方便调试。这个过程其实很快，但也踩了几个小坑。

运行jekyll需要安装ruby, rubygems。如果安装的是ruby1.8.7，则还需要手动安装json包，不然会无法运行jekyll。

    $ sudo apt-get install rubygems1.8 rake
    $ sudo gem install jekyll
    $ sudo gem install json

设置环境变量：

    PATH=$PATH:/var/lib/gems/1.8/bin
    export PATH

这样就可以跑起来了。

检查了下出错的文档，原来是没有在标题的`#`号后添加空格。

此外，这篇文章是用UberWriter编写的。这是Ubuntu平台上很简洁的一篇MarkDown编辑器。安装方法如下:

    sudo add-apt-repository ppa:w-vollprecht/ppa
    sudo apt-get update
    sudo apt-get install uberwriter 

网站地址是: http://uberwriter.wolfvollprecht.de/