---
layout: post
title: "Jekyll使用笔记"
description: ""
category: Web
tags: [Jekyll, Blogging]
---
{% include JB/setup %}

关于Jekyll的介绍，请猛击[这里](http://jekyllbootstrap.com/)

#前期准备
* 你必须拥有一个github帐号。
* 安装git本地客户端
* 安装Ruby。windows用户可以直接下载RubyInstaller进行安装（尼玛太幸福了）。

这些都是准备工作，下面正式开始了。

#安装Jekyll-Bootstrap。
1 创建一个新的Repository。

新的repo的命名格式为USERNAME.github.com，其中，USERNAME是您在github.com上的用户名。

2 安装Jekyll-Bootstrap

	git clone https://github.com/plusjade/jekyll-bootstrap.git USERNAME.github.com
	cd USERNAME.github.com
	git remote set-url origin git@github.com:USERNAME/USERNAME.github.com.git
	git push origin master

敲完这个命令后，您可以去泡杯咖啡拉。几分钟后，您的网站可以通过http://USERNAME.github.com进行访问了。这真是一个奇迹！

#在本地运行Jekyll
Jekyll的一些依赖包需要DevKit方可正确安装。请先下载DevKit。解压DevKit之后，进行该目录中，依次运行：

	ruby dk.rb init
	ruby dk.rb install

然后，通过以下命令安装Jekyll：

	gem install jekyll

您现在可以在本地预览您的网站拉：

	cd USERNAME.github.com
	jekyll --server

Tips：

>Jekyll默认都是英文，如果想让他支持中文，直接输可以了。等等，您需要将它存为UTF-8格式的，注意，不要加BOM头哦。（推荐使用EmEditor）
#添加文章和页面

1 添加文章

通过rake任务可以轻松创建文章：

	rake post title="你好"

2 添加页面

同样通过rake添加页面，与创建文章语法类似：

	rake page name="about.md"

#安装主题

访问jekyllbootstrap主题站，请猛击[这里](http://themes.jekyllbootstrap.com/)。页面底层显示了可用的主题列表。点击Install Theme会告诉您安装命令。

#生成文章列表
	<div id="post_links">
		<ul>
			{\% for post in site.posts \%}
			<li><span>{\{ post.date | date_to_string }\}</span>  <a href="{{ post.url }}">{{ post.title }}</a></li>
			{\% endfor \%}
		</ul>
	</div>
	
#常见问题
1. SSH连接GitHub时出现错误“ssh: connect to host github.com port 22: Bad file number”，如何解决？
   
   问题原因是系统的22号端口可能被屏蔽。解决方法是在.ssh目录下创建config文件，即文件名为config，没有后缀。将以下代码复制到该文件中，如下：

		Host github.com
		User joshualeung
		Port 443
		Hostname ssh.github.com
	
即将连接端口修改为443，并将主机名修改为ssh.github.com。


#后记：
几天之后，我在自己电脑上部署Jekyll的时候，由于编码问题