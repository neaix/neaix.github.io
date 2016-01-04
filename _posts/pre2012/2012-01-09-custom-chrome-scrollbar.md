---
layout: post
title: "自定义Chrome滚动条样式"
description: ""
category: Web
tags: [Chrome]
---
{% include JB/setup %}

有不少可以帮你修改Chrome默认滚动条样式的扩展，Scroll Bar X就是其中的佼佼者，但是这个扩展在安装的时候提示说会存取所有的网站数据，这就让人感觉很难以接受了。其实咱们可以自己动手，丰衣足食。首先在自己的系统里找到如下这个.css文件：

Windows:

	%LOCALAPPDATA%\Google\Chrome\User Data\Default\User StyleSheets\Custom.css

Mac:

	/Users/YourUsername/Library/Application Support/Google/Chrome/Default/User StyleSheets/Custom.css

Ubuntu:

	~/.config/chromium/Default/User\ StyleSheets/Custom.css

用任何一款文字编辑器打开之，加入以下代码：

	::-webkit-scrollbar-track-piece{
		background-color:#fff;
		-webkit-border-radius:0;
	}
	::-webkit-scrollbar{
		width:8px;
		height:8px;
	}
	::-webkit-scrollbar-thumb{
		height:50px;
		background-color:#999;
		-webkit-border-radius:4px;
		outline:2px solid #fff;
		outline-offset:-2px;
		border: 2px solid #fff;
	}
	::-webkit-scrollbar-thumb:hover{
		height:50px;
		background-color:#9f9f9f;
		-webkit-border-radius:4px;
	}
保存之后重新打开你的Chrome浏览器，看到变化了吧？其实这些都是基础的CSS代码，所以你可以随心所欲的定制。比如你觉得滚动条太细了，即可编辑以下这段代码里的宽度：

	::-webkit-scrollbar{
		width:16px;
	}
另外，其实Chrome的Web Inspector也是可以通过修改CSS来定制页面风格的，其CSS文件地址：

Windows:

	%LOCALAPPDATA%\Google\Chrome\User Data\Default\User StyleSheets\Custom.css

Mac:

	/Users/YourUsername/Library/Application Support/Google/Chrome/Default/User StyleSheets/Custom.css

Ubuntu:

	~/.config/chromium/Default/User\ StyleSheets/Custom.css

Via GTricks

下面是我本人的滚动条样式：

	::-webkit-scrollbar-track-piece{
	background-color:RGB(62,179,223);
	-webkit-border-radius:0;
	}

	::-webkit-scrollbar{
	width:16px;
	height:8px;
	}

	::-webkit-scrollbar-thumb{
	height:50px;
	background-color:RGB(223,171,62);
	-webkit-border-radius:4px;
	outline:0px solid #fff;
	outline-offset:-2px;
	border: 0px solid #fff;
	}

	::-webkit-scrollbar-thumb:hover{
	height:50px;
	background-color:RGB(247,106,38);
	-webkit-border-radius:4px;
	}

转载自：谷奥