---
layout: post
title: keepalived+nginx的HA方案
date: 2016-01-19 15:40:00
category: 技术
tags:keepalived
---
##环境
OS:centOS 7


IP:172.25.5.220(master) 172.25.5.19(backup),在这两台机器上都安装keepalived+nginx.

VIP:172.25.5.168

[nginx搭建步骤](http://www.neaix.com/blog/nginx-build/)


##搭建步骤

下载[keepalived源码包](http://www.keepalived.org/software/keepalived-1.2.19.tar.gz)

安装依赖包

	yum install openssl openssl-devel
	
解压安装

	tar -zxvf  keepalived-1.2.19.tar.gz
	cd keepalived-1.2.19
	./configure
	make && make install
	
拷贝相应的文件

	cp /usr/local/sbin/keepalived /usr/sbin/ 
	cp /usr/local/etc/rc.d/init.d/keepalived /etc/init.d/  
	cp /usr/local/etc/sysconfig/keepalived /etc/sysconfig/  
	cp -r /usr/local/etc/keepalived/ /etc/  
	
修改nginx默认welcome页面,测试时做服务器区分 

	vi /usr/local/nginx/html/index.html
	
	<!DOCTYPE html>
	<html>
	<head>
	<title>Welcome to nginx!</title>
	<style>
	    body {
	        width: 35em;
	        margin: 0 auto;
	        font-family: Tahoma, Verdana, Arial, sans-serif;
	    }
	</style>
	</head>
	<body>
	<h1>Welcome to nginx!</h1>
       <!--加入mater 或 backup的ip作为区分 !-->
	<h3>172.25.5.220</h3>
	<p>If you see this page, the nginx web server is successfully installed and
	working. Further configuration is required.</p>
	
	<p>For online documentation and support please refer to
	<a href="http://nginx.org/">nginx.org</a>.<br/>
	Commercial support is available at
	<a href="http://nginx.com/">nginx.com</a>.</p>
	<p><em>Thank you for using nginx.</em></p>
	</body>
	</html>

master机器(172.25.5.220)配置

	vi /etc/keepalived/keepalived.conf
	
	 ! Configuration File for keepalived

	global_defs {
	   notification_email {
	     neaix@hotmail.com             #设置报警邮件地址，可以设置多个，每行一个。 需开启本机的sendmail服务
	   }
	   notification_email_from  neaix@hotmail.com        #设置邮件的发送地址
	   smtp_server 127.0.0.1                                #设置smtp server地址
	   smtp_connect_timeout 30                              #设置连接smtp server的超时时间
	   router_id LVS_DEVEL                                  #表示运行keepalived服务器的一个标识。发邮件时显示在邮件主题的信息
	}
	
	vrrp_instance VI_1 {
	    state MASTER              #指定keepalived的角色，MASTER表示此主机是主服务器，BACKUP表示此主机是备用服务器
	    interface eno16777736            #指定HA监测网络的接口
	    virtual_router_id 51      #虚拟路由标识，这个标识是一个数字，同一个vrrp实例使用唯一的标识。即同一vrrp_instance下，MASTER和BACKUP必须是一致的
	    priority 100              #定义优先级，数字越大，优先级越高，在同一个vrrp_instance下，MASTER的优先级必须大于BACKUP的优先级
	    advert_int 1              #设定MASTER与BACKUP负载均衡器之间同步检查的时间间隔，单位是秒
	    authentication {          #设置验证类型和密码
	        auth_type PASS        #设置验证类型，主要有PASS和AH两种
	        auth_pass 1111        #设置验证密码，在同一个vrrp_instance下，MASTER与BACKUP必须使用相同的密码才能正常通信
	    }
	    virtual_ipaddress {       #设置虚拟IP地址，可以设置多个虚拟IP地址，每行一个
	        172.25.5.168
	    }
	}
	
	virtual_server 172.25.5.168 80 {      #设置虚拟服务器，需要指定虚拟IP地址和服务端口，IP与端口之间用空格隔开
	    delay_loop 6                    #设置运行情况检查时间，单位是秒
	    lb_algo rr                      #设置负载调度算法，这里设置为rr，即轮询算法
	    lb_kind DR                      #设置LVS实现负载均衡的机制，有NAT、TUN、DR三个模式可选
	    persistence_timeout 50          #会话保持时间，单位是秒。这个选项对动态网页是非常有用的，为集群系统中的session共享提供了一个很好的解决方案。
	                                    #有了这个会话保持功能，用户的请求会被一直分发到某个服务节点，直到超过这个会话的保持时间。
	                                    #需要注意的是，这个会话保持时间是最大无响应超时时间，也就是说，用户在操作动态页面时，如果50秒内没有执行任何操作，
	                                    #那么接下来的操作会被分发到另外的节点，但是如果用户一直在操作动态页面，则不受50秒的时间限制
	    protocol TCP                    #指定转发协议类型，有TCP和UDP两种
	
	    real_server 172.25.5.220 80 {     #配置服务节点1，需要指定real server的真实IP地址和端口，IP与端口之间用空格隔开
	        weight 3                    #配置服务节点的权值，权值大小用数字表示，数字越大，权值越高，设置权值大小可以为不同性能的服务器
	                                    #分配不同的负载，可以为性能高的服务器设置较高的权值，而为性能较低的服务器设置相对较低的权值，这样才能合理地利用和分配系统资源
	        TCP_CHECK {                 #realserver的状态检测设置部分，单位是秒
	            connect_timeout 10      #表示3秒无响应超时
	            nb_get_retry 3          #表示重试次数
	            delay_before_retry 3    #表示重试间隔
	            connect_port 80
	        }
	    }
	    real_server 172.25.5.19 80 {
	        weight 2
	        TCP_CHECK {
	            connect_timeout 10
	            nb_get_retry 3
	            delay_before_retry 3
	            connect_port 80
	        }
	    }
	}

backup机配置与master机大致相同，仅仅修改一些权重信息


	 ! Configuration File for keepalived
	
	global_defs {
	   notification_email {
	     neaix@hotmail.com             
	   }
	   notification_email_from  neaix@hotmail.com        
	   smtp_server 127.0.0.1                              
	   smtp_connect_timeout 30                             
	   router_id LVS_DEVEL                                  
	}
	
	vrrp_instance VI_1 {
	    state BACKUP              
	    interface eno16777736            
	    virtual_router_id 51     
	    priority 100              
	    advert_int 1             
	    authentication {       
	        auth_type PASS      
	        auth_pass 1111       
	    }
	    virtual_ipaddress {      
	        172.25.5.168
	    }
	}
	
	virtual_server 172.25.5.168 80 {      
	    delay_loop 6                    
	    lb_algo rr                      
	    lb_kind DR                     
	    persistence_timeout 50          
	    protocol TCP                    
	    real_server 172.25.5.220 80 {    
	        weight 3                    
	        TCP_CHECK {                
	            connect_timeout 10     
	            nb_get_retry 3          
	            delay_before_retry 3   
	            connect_port 80
	        }
	    }
	    real_server 172.25.5.19 80 {
	        weight 2
	        TCP_CHECK {
	            connect_timeout 10
	            nb_get_retry 3
	            delay_before_retry 3
	            connect_port 80
	        }
	    }
	}


配置成功后启动两台机器的nginx与keepalived

	*之前的nginx没有配置成服务，所以无法通过service启动*
	
	cd /usr/local/nginx/sbin/
	./nginx
	service keepalived start

打开浏览器 输入*172.25.5.168*（VIP）

页面显示master机上的IP

停止master机器上的nginx

	./nginx -s stop
	
刷新浏览器，页面显示backup机上的IP.

成功。

	





	






