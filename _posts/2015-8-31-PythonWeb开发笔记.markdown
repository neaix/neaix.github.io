---
layout: post
title: "Python Web开发笔记"
comments: true
share: true
tags: Python
---

###完全使用内置模块搭建一个web app

	# server.py
	# 从wsgiref模块导入:
	from wsgiref.simple_server import make_server
	# 导入我们自己编写的application函数:

	# 处理函数
	def application(environ, start_response):
	    start_response('200 OK', [('Content-Type', 'text/html')])
	    body = '<h1>Hello, %s!</h1>' % (environ['PATH_INFO'][1:] or 'web')
	    return [body.encode('utf-8')]
	
	# 创建一个服务器，IP地址为空，端口是8000，处理函数是application:
	httpd = make_server('', 8000, application)
	print('Serving HTTP on port 8000...')
	# 开始监听HTTP请求:
	httpd.serve_forever()

这样就搭建完成了一个最简单的web app 版本hello world

输入 localhost:8000 就能访问

###


---
####  参考资料：  ####
- 
