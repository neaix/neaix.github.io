---
layout: post
title:  "nginx install"
author: Near
---


### nginx编译安装步骤
 
###### 环境:CentOS7 64
 
- 下载[nginx](http://nginx.org/download/nginx-1.15.2.tar.gz)
 
- 安装nginx依赖包
 ```
 yum -y install gcc gcc-c++ 
 yum -y install zlib zlib-devel pcre-devel openssl openssl-devel 
 ```
###### 依赖包介绍
 + gcc gcc-c++ 编译环境
 + zlib：nginx的gzip模块 传输数据压缩
 + pcre-devel 地址重写
 + openssl ssl加密支持(https)
 
###### 编译安装

+ 解压ngxin安装包
```
    tar -zxvf nginx-1.15.2.tar.gz /your directory
```

+ 检测系统环境是否符合安装要求，以及指定安装目录，以及安装模块

```
./configure 
 --prefix=/usr/local/nginx 
 --sbin-path=/usr/local/nginx/sbin/nginx 
 --conf-path=/usr/local/nginx/conf/nginx.conf 
 --with-http_ssl_module 
 --with-http_stub_status_module
 --with-http_gzip_static_module
 --with-pcre
  ...
```
+ 编译安装
```
make && make install
```

+ 启动

```
/usr/local/nginx/sbin/nginx 
```

###### 浏览器访问 http://your ip:80 
###### Enjoy~






 
 
 
 

