---
layout: post
title: "Pyspider学习记录"
comments: true
share: true
tags: Python
---

偶然看到的PySpider，是国人[Binux](http://blog.binux.me/)写的。感觉不错。还带Web端监控。

## Pyspider 的主要特性 ##

- python 脚本控制，可以用任何你喜欢的html解析包（内置 pyquery）
- WEB 界面编写调试脚本，起停脚本，监控执行状态，查看活动历史，获取结果产出
- 支持 MySQL, MongoDB, SQLite
- 支持抓取 JavaScript 的页面
- 组件可替换，支持单机/分布式部署，支持 Docker 部署
- 强大的调度控制

## Pyspider的安装： ##

由于Pyspider本身对windows的支持就不是很好（很多包都如此），再加上另外pysider对64位的支持更加不好，所以导致了在windows 64位下安装各种问题。

我的安装过程如下：

1. 安装pip,easy_install
2. pip install pyspider （爆出一堆错误）
3. 查阅错误log，发现有如下错误：

		Please specify --curl-dir=/path/to/built/libcurl

	一开始以为是没有判断是没有libcurl，后来各种搜索后才明白是没有pycurl库，谷歌后手动安装了一个。

4. 接着又爆：

	error: Microsoft Visual C++ 10.0 is required (Unable to find vcvarsall.bat).
 
	判断是VS2010库我没有，下载官方的MSVC++ 10.0包后发现还是不行，网上有个人也和我一样，不过他是直接装了个VS2010后才弄好。我在另外一台机器上装了2010然后把目录拷过来了。

5. 发现又爆 cl.exe 的错误，这里我已经崩溃了，但是后来吃完饭冷静了一下后，发现我不能在最下面找错误，要从提示信息的最上面，看看哪个错误是第一次出现的。于是发现是lxml这个库没有，接着安装lxml，但是发现这个玩意没有最高就3.2版本的。后来又不停搜索，发现了这个网站[http://www.lfd.uci.edu/~gohlke/pythonlibs/](http://www.lfd.uci.edu/~gohlke/pythonlibs/)

	发现这里的库真是齐全啊，虽然死whl格式文件的，不过只要 pip install xxx.whl就可以安装了！

	虽然这个网站标明了自己是非官方二进制文件库，但是如果以后找不到了就去这里找！


6. 最后只要进入C:\Python34\Lib\site-packages\pyspider目录，运行run.py，就能在localhost:5000中看到web页面了！



---
####  参考资料：  ####
- [http://blog.binux.me/2014/11/introduction-to-pyspider/](http://blog.binux.me/2014/11/introduction-to-pyspider/)
