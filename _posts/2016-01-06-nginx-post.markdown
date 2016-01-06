---
layout: post
title:  "nginx centOS7下安装"
date:   2016-01-06 10:38:25
categories: Personal
tags: nginx
image: /assets/images/designfin.jpg
---
![nginx](https://github.com/neaix/neaix.github.io/blob/master/assets/images/nginx.jpg)  


## 安装方式(源码编译)  

***
 *编译源码安装方式的好处*  
 
1. 可控性强，config时可根据当前系统环境优化参数，可定制组件及安装参数  
 
2. 易出错，对于初学者存在一定难度  
 
 
## 安装步骤  
 
1. 下载[nginx源码包](http://nginx.org/download/nginx-1.9.9.tar.gz)   
 
2. 解压到你希望安装的目录下  
 
3. 检查和安装依赖项  
 
  
   	` yum -y install gcc pcre pcre-devel zlib zlib-devel openssl openssl-devel`
  

4. 配置  
 

  	` configure`
    
     
5. 编译安装  
 

 	 `make && make install` 

 