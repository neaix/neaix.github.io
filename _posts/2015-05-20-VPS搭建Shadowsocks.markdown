---
layout: post
title: "VPS搭建Shadowsocks服务（ss-panel前台+shadowsocks后台）" 
comments: true
share: true
tags: 笔记
---



环境：Ubuntu14.04


----------

走过的弯路：

1. 一开始在lnmp环境下搭一直无法启动apache2，后来重装系统，转apache2为服务（默认的server就是apache）才成功。但是我看到别人的类似网站都是nginx的，不知道怎么做到。

2. 后来发现网站生成的端口和密码在我本地配置文件中没有，以为要手动加或者程序自己添加。最后问了别人才明白所有的端口密码数据都是在数据库里的。这个原理就是前端ss-panel和后台shadowsocks共同调用一个数据库，所以不需要去shadowsocks里单独配置。这个和网上那些个人的shadowsocks搭建不同！

3. 后来发现什么都可以了，但是就是连上去出现502. 最后偶然的发现，是/shadowsocks/shadowsocks/config.json 中配置错误。

文件内容要为：

	{
	    "server":"0.0.0.0",
	    "server_ipv6": "[::]",
	    "server_port":8388,
	    "local_address": "127.0.0.1",
	    "local_port":1080,
	    "password":"m",
	    "timeout":300,
	    "method":"aes-256-cfb",
	    "fast_open": false,
	    "workers": 1
	}

一开始默认的加密方法是rc4，所以才导致一直连不上。


----------



1. 先ssh登录到vps，再安装工具：
<code>

	apt-get update
	
	apt-get install screen python-pip mysql-server libapache2-mod-php5 python-m2crypto php5-cli git apache2 php5-gd php5-mysql php5-dev libmysqlclient15-dev php5-curl php-pear language-pack-zh* -y
	
	apt-get install python-gevent python-pip python-m2crypto
	
	pip install cymysql shadowsocks

</code>
（中间会提示输入mysql root密码） 

2. 下载shadowsocks多用户后台
<code>
	# apt-get -y install git-core git-doc git-gui gitk
	# screen
	# cd /root​
	# ​git clone -b manyuser https://github.com/mengskysama/shadowsocks.git
	# cd /root/shadowsocks/shadowsocks
</code>

screen的作用是保证接下来的操作不会因为ssh断开而影响。


3. 修改数据库配置文件，设置数据库host,用户名（root），密码，数据库名

![](http://img.blog.csdn.net/20150304202020114)
	
	# vi Config.py //修改配置文件

设置mysql数据库 ：
	
	# mysql -u root -p​ //输入设置的mysql root密码

	mysql>​create database shadowsocks; 
	> use shadowsocks;
	> flush privileges;
	> exit;
	

![](http://img.blog.csdn.net/20150304202813497)

4. shadowsocks前台web（使用ss-panel）

a. 下载前台web

	# cd /root
	# git clone https://github.com/orvice/ss-panel.git

b. 修改web配置

	# cd ss-panel/lib
	# mv config-sample.php config.php //更名
	# vi config.php //修改配置

c. 导入web数据库

	# mysql -u root -p
	mysql> use shadowsocks;
	mysql> source /root/ss-panel/sql/invite_code.sql
	mysql> source /root/ss-panel/sql/ss_admin.sql
	mysql> source /root/ss-panel/sql/ss_node.sql
	mysql> source /root/ss-panel/sql/ss_reset_pwd.sql
	mysql> source /root/ss-panel/sql/user.sql
	mysql> flush privileges;
	mysql> exit;

d. 将web由apache2代理

	# rm /var/www/html/index.html
	# cp -rd /root/ss-panel/* /var/www/html

5. 启动服务

a. 重启web服务
	
	# service apache2 restart

b. 开启shadowsocks服务

	# cd /root/shadowsocks/shadowsocks
	# nohup python server.py > /var/log/shadowsocks.log 2>&1 &
	# cat /var/log/shadowsocks.log

出现以下信息表示启动成功
	
	db start server at port [%s] pass [%s]

![](http://img.blog.csdn.net/20150304210450999)


----------



一键安装篇（优选，上面的步骤可以作为参考原理）

==============

本方法是通过脚本一键安装，但是由于脚本是托管在Github上的，所以要先安装git工具下载脚本。另外需要自己设置 root密码设置。

一、准备工作

1、下载需要的工具

	# apt-get update
	# apt-get install -y git screen

2、下载执行脚本

	# screen
	# cd /root
	# git clone https://github.com/lasyman/lasyman_setup_ss.git

3、执行脚本
	
	# bash lasyman_setup_ss.sh


PS: 待脚本执行完成无错误，在浏览器输入VPS IP就可以看到ss-panel的前端界面。管理后台可通过http://IP/admin进入，初始管理员账户为me@me.com密码为my。


参考资料：

[http://blog.csdn.net/lasyman2015/article/details/44035871](http://blog.csdn.net/lasyman2015/article/details/44035871 "http://blog.csdn.net/lasyman2015/article/details/44035871")





----------


----------


6月5日更新：

具体思路：

shadowsocks后台只是调用了数据库里的用户表来建立端口和密码，只要mysql里面允许数据库的用户远程登录（建议用一个单独的用户，给比较少的权限），然后在配置后端的时候数据库地址填写前端SS-Panel所在的服务器的地址，然后数据库用户名密码什么的和之前的一样就可以了。然后再去SS-Panel配置里面加上这个新节点的名称和地址就可以了。

ShadowSocksManyuser会自动去远程数据库中读取用户的端口密码等值。对于同一个用户来说，在所有节点的端口和密码都是相同的。



在添加节点的时候遇到问题：

无法远程连接数据库，零零碎碎看了些资料尝试了下都不行。最后总结出完整的一个做法：

1）本机登陆mysql：mysql -uroot -ppasswd ；

改变数据库：use mysql;

2）从所有主机：

	grant all privileges on *.* to root@"%" identified by "password" with grant option;  
	flush privileges;

3）从指定主机：

	grant all privileges on *.* to root@"192.168.11.205" identified by "password" with grant option; 
	
	flush privileges;

4)  进mysql库查看host为%的数据是否添加：

	use mysql; 
	select * from user;

5)  只读权限dump数据库：  
	
	mysqldump -h 172.192.1.12 -uroot -p123456 --single-transaction your_db > your_db_bk.sql

6)  通过MySQL端口远程连接

	mysql： mysql -h 122.128.10.114 -P 3306 -uroot -ppasswd   
	// -P mysql在/etc/mysql/my.cnf 配置文件配置的端口，-p 密码


这里有一个地方被网上的教程给坑了。一开始还以为是一个端口只能连接一个Ip。注意，假如你要能够让远程服务器来访问你的话，就要把 bind-address 给注释掉！而不是赋予ip值！
		
	用#注释掉！
	#bind-address		= 45.62.113.44

然后就能够远程访问数据库了！​