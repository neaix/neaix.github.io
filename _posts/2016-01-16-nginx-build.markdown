---
layout: post
title: nginx 编译安装
description: nginx 编译安装
date: 2016-01-14 14:49:36 +08:00
tags: "nginx 编译安装"
---
##环境
OS:centOS 7

##安装步骤
下载[ngxin]([http://nginx.org/download/nginx-1.9.9.tar.gz](http://nginx.org/download/nginx-1.9.9.tar.gz))源码包

安装nginx依赖包

	yum -y install zlib zlib-devel openssl openssl--devel pcre pcre-devel

添加nginx系统用户组与用户

	groupadd -r nginx

	useradd -r -g nginxuser -s /bin/false -M nginx


### 安装
 
	tar -zvxf nginx-1.9.9.tat.gz

	cd nginx-1.9.9·9

编译安装有两种方式，1.指定目录 2.默认
####*指定目录*

	 ./configure --sbin-path=/usr/local/nginx/nginx 

	--conf-path=/usr/local/nginx/nginx.conf 

	--pid-path=/usr/local/nginx/nginx.pid 

	--with-http_ssl_module

	--with-pcre=../pcre-8.21   #指向源码目录

	--with-zlib=../zlib-1.2.8     

	--with-openssl=../openssl-1.0.1 

	--with-http_stub_status_module  #启用nginx的NginxStatus功能

	--user=nginxuser 

	--group=nginx

####*默认*

	./configure
	
###编译安装

	mark && mark install

启动nginx

	cd /usr/local/nginx/sbin/
	./nginx·

在浏览器中输入localhost,看到nginx的默认welcome页面,成功!

***
贴下在网上找到比较相信的nginx配置信息


	#使用的用户和组

	user  nginx;

	#指定工作衍生进程数（一般等于CPU的总核数或总核数的两倍)

	worker_processes auto;
	
	#指定错误日志村反的路径，错误日志记录级别可选项为
	
	error_log  /home/weblogs/nginx_error.log  crit;
	
	#指定pid的错放的路径
	
	pid        /usr/local/nginx/logs/nginx.pid;


	#Specifies the value for maximum file descriptors that can be opened by this process.

	#指定文件描述符数量

	worker_rlimit_nofile 51200;

	events
	{
	
	#使用的网络I/O 模型，Linux系统推荐采用epoll模型

		use epoll;
		worker_connections 51200;
		multi_accept on;
	}

	http
	{
	     
	     include       mime.types;
		default_type  application/octet-stream;

		server_names_hash_bucket_size 128;
		client_header_buffer_size 32k;
		large_client_header_buffers 4 32k;
		client_max_body_size 50m;

		sendfile on;
		tcp_nopush     on;

		keepalive_timeout 60;

		tcp_nodelay on;

		gzip on;
		gzip_min_length  1k;
		gzip_buffers     4 16k;
		gzip_http_version 1.0;
		gzip_comp_level 2;
		gzip_types       text/plain application/x-javascript text/css application/xml;
		gzip_vary on;
		gzip_proxied        expired no-cache no-store private auth;
		gzip_disable        "MSIE [1-6]\.";

		#limit_conn_zone $binary_remote_addr zone=perip:10m;
		##If enable limit_conn_zone,add "limit_conn perip 10;" to server section.

		server_tokens off;
		#log format
		log_format  access  '$remote_addr - $remote_user [$time_local] "$request" '
        	    '$status $body_bytes_sent "$http_referer" '
             	'"$http_user_agent" $http_x_forwarded_for';
			 
		upstream local { 
			ip_hash;
			server localhost:8080 weight=1;
			#add hosts
		}
		upstream local2 { 
			ip_hash;
			server localhost:8080 weight=1;
			#add hosts
		} 

	#第一个虚拟主机

	server

	{
		listen 80 ;
		#listen [::]:80 default ipv6only=on;
		server_name www.domain.com domain.com;
		
		index login.html index.html index.htm index.jsp index.jspx index.jhtml;
		root /home/webroot/default;
		#error_page   404   /404.html;
	
		location /  {
          	 	index  index.html index.htm;
			proxy_pass http://local1/;
			proxy_redirect default;
			proxy_connect_timeout 10;
			
        }
	
		
		location ~ .*\.(js|gif|jpg|jpeg|png|bmp|swf)$
			{
				expires      30d;
			}
		location ~ .*\.(css)?$
			{
				expires      12h;
			}	
		access_log  /home/weblogs/default.log  access;
	}

	#第二个虚拟主机 hypermedia

	server

	{
		listen 80 ;
		#listen [::]:80 default ipv6only=on;
		server_name domain.com;
		access_log  /home/weblogs/domain.log  combined;
		index login.html index.html index.htm index.jsp index.jspx index.jhtml;
		root /home/webroot/domain.com;
		#error_page   404   /404.html;
	
		location /  {	
   	        	 index  index.html index.htm;
			proxy_pass http://local/;
 		   # proxy_redirect default;
      	          # proxy_connect_timeout 10;

     }
		location ~ .*\.(js|gif|jpg|jpeg|png|bmp|swf)$
			{
				expires      30d;
			}
		location ~ .*\.(css)?$
			{
				expires      12h;
			}	
	}
	#第三个虚拟主机 cloudnote

	server

	{
		listen 80 ;
		#listen [::]:80 default ipv6only=on;
		server_name domain.com;
		access_log  /home/weblogs/nginx.log  combined;
		root /home/webroot/domain.com;
		#error_page   404   /404.html;
	
			location /  {
        	  	  index  index.html index.htm;
			    #proxy_pass http://local2/;
			    #proxy_redirect default;
		      	    #proxy_connect_timeout 10;
        }


		location ~ .*\.(js|gif|jpg|jpeg|png|bmp|swf)$
			{
				expires      30d;
			}

		location ~ .*\.(css)?$
			{
				expires      12h;
			}
	}	
	
	#IP access is not allowed

	#server { 

		# listen  80 default;

		# server_name  _;

		#return 408;
	   }

	include vhost/*.conf;
	}









