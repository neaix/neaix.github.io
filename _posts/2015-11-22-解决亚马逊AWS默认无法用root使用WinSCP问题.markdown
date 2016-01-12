---
layout: post
title: "亚马逊AWS使用过程中遇到的问题"
comments: true
share: true
tags: 笔记
---


办了张浦发银行的校园信用卡，成功申请到了亚马逊AWS的一年试用权，但是由于亚马逊对服务器的管理比较严格，遇到了很多之前在阿里云上没有遇到过的问题。其中很多问题其实都是由于亚马逊的安全性过高而导致的。


###putty的登陆问题

亚马逊是默认没有root账户的，只分配给一个ubuntu的用户，而且默认不支持密码登陆，而是要用一个私钥配置到putty里，才能够正常使用。WinSCP中也是要这样配置过的。配置方法亚马逊给了文档说明。

###winSCP的非root用户取得root权限问题

接下来我发现在WinSCP中，即便成功登陆了，也无法正常上传文件，因为很多目录都是要root权限的。在网上找到了解决方法，但是比较零碎，现在总结下，如下：

1. 先putty登陆到服务器，然后切换`/etc/sudoers`这个文件的权限(默认是只读的)，比如使用:sudo chmod 640 /etc/sudoers
2. 修改sudoers文件: sudo vi /etc/sudoers . 在root下添加：`yourusername ALL=NOPASSWD: /bin/sftp-server`
3. 修改WinSCP的文件协议为SCP
4. 高级设置中修改`环境`下的`SCP/Shell`下的`shell`为`sudo su -`
5. 这样后即可登录！