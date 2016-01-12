---
layout: post
title: "解决VisualStudio工程文件过大的方法" 
comments: true
share: true
tags: 笔记
---


ipch文件夹和一个与工程同名的.sdf文件，是Visual Studio用来保存预编译的头文件和Intellisense用的，删除这些文件对于工程的开发完全没有影响。

在VS2010中进入如下设置：工具 —> 选项 —> 文本编辑器 —> C/C++ —> 高级，找到回退位置选项，把
	
	“始终使用回退位置”

和
	
	“回退位置已在使用时，不警告”

两个选项设为“True”，在“回退位置”中设置存储ipch文件夹和sdf文件的指定文件夹。

![](http://images.cnitblog.com/i/335529/201407/031542158091287.jpg)

注意，若不指定文件夹，则存放在系统临时文件夹中：

系统临时文件夹的是在系统变量的用户变量:TMP中设置的：

![](http://images.cnitblog.com/blog/553942/201310/27100143-a06863d0ed114becab1630cd93367652.png)


操作完毕后，工程便只有几百kb~几M了


