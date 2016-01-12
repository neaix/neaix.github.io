---
layout: post
title: "Win7下对Linux的双系统安装过程总结" 
comments: true
share: true
tags: 笔记
---

最近在折腾Linux的Ubuntu版本，对于一个新手，首先安装就成了个麻烦，虽然网上有很多教程，但是感觉都不太完整和细致，所以把之前的折腾索性整理出来。

中间遇到的问题有：

1. 一开始安装直接把为原来的win7给弄没了，因为为选择的是安装新系统
2. 后来在分区那里卡住了，因为最后那个引导设置选择默认的，没有选择boot的那个。
3. 最后装好了以后发现竟然不能连无线，因为系统自带的驱动和为的网卡不兼容，但是可以用有线，不过为的是校园网，而那个校园网客户端显然没有linux版本的。
4. 之后觉得国外的不靠谱，用了一个国产的优麒麟的Ubuntu版本，系统界面差了很多不说，驱动也还是不行！！彻底绝望。解决方案是：网上买有linux驱动版本的无线网卡，或者网上有一种教程可以通过一系列复杂的手段让windows的驱动在linux下能兼容。
5. U盘如果用USBwriter烧过以后，它把U盘给分区了，导致这个U盘只有几个M是在win下可见的。如果要重新使用U盘，可以通过运行cmd，之后敲入“diskpart”来启动磁盘工具，执行“list disk”命令，会列出一个磁盘列表，根据大小判断你的U盘，再执行“select disk 4”命令（假设disk 4是我的U盘），然后执行“clean”，然后再执行“creat partition primary”(因为我刚才把焦点移动到了磁盘4上，所以创建分区这个操作也是在磁盘4上进行的)，可是磁盘格式却是RAW格式的，下面就是要格式化一下这个分区了，执行“format quick fs=fat32”格式化U盘成fat32，最后执行“exit”退出。

下面是正式安装过程：

环境：windows7 （win8下也可行）

# U盘安装Ubuntu 14.10 #

## 1、 ##

首先下载U盘安装Linux 刻录工具：USBWriter。见 [http://www.linuxidc.com/Linux/2014-10/108015.htm](http://www.linuxidc.com/Linux/2014-10/108015.htm "http://www.linuxidc.com/Linux/2014-10/108015.htm")

下载 Ubuntu 14.10 正式版的ISO镜像文件。见[ http://www.linuxidc.com/Linux/2014-10/108363.htm ]( http://www.linuxidc.com/Linux/2014-10/108363.htm  " http://www.linuxidc.com/Linux/2014-10/108363.htm ")

*PS：常用linux资料在linux公社的FTP站点：*

*http://linux.linuxidc.com/*

*用户名与密码都是www.linuxidc.com*

并且单独给linux分出一个盘，**并且在磁盘管理工具中删除卷**

## 2、刻录到U盘 ##

打开USBWriter 

点击Browse 找到 ubuntu-14.10-desktop-i386.iso

找到U盘：I

点击 Write

## 3、开始安装 ##

完成后在BISO里设置U盘启动。*（华硕是开机时不停按esc）*

接下来按部就班如win7般的安装

自由选择 试用 Ubuntu 或者直接安装Ubuntu。

欢迎安装界面：选择 中文（简体）

选择无线网络，最好不连网，否则安装会很慢，因为会下载一些软件包。

![](http://www.linuxidc.com/upload/2014_10/14102421311231.png)

这步时很关键，（若从未安装过Linux则不会出现第一个选项）

如果选择第一个或第二个选项，则会清空原有的所有系统以及所有硬盘，意思就是装好后电脑什么都不剩，就剩下一个装好的linux系统。

如果需要装双系统，则选择其他选项

之后会要你手动分区

这里更加关键，注意！！

观察磁盘列表里是否有一个列表为空闲状态

若没有空闲，说明你一开始没有单独弄出一个磁盘，且没有对它进行删除卷操作。此时，你可以选择一个你不需要的盘（*前提是你得看的明白哪个盘你不需要，所以要求最好在win7下就对磁盘做好分出一个盘的操作*），再点“-”号按钮，等待片刻后该盘就变成空闲状态了。

之后对空闲盘进行分区操作：（重点）

![](http://www.linuxidc.com/upload/2014_10/14102421341747.png)

建议分4个区

次序分别为：

/boot：一般200M~300M，但是似乎论坛上有人因改分区空间不够而失败的，所以在硬盘足够大的情况下，宁可多分几百M

swap：与内存相同（如4G内存就分4＊1024M）

/home：相当于windows下的文档区，大小随意，一般20G~50G足够

/：剩下的全部空间

分好后千万千万注意，下面还有一个**安装启动引导器的设备**栏没填

这个填错将导致安装失败或者无法引导进入系统

注意到*/dev/sda*后都有一个数字，找到你前面分的区中/boot的sda后的数字，然后引导器那栏也要对应选相应的sda区。

最后填写个人信息以及系统密码

## 4、设置引导 ##

安装完成后系统会重启

重启后仍然会回到你的windows系统

此时下载EasyBCD软件（ [http://www.linuxidc.com/Linux/2012-10/72140.htm](http://www.linuxidc.com/Linux/2012-10/72140.htm "http://www.linuxidc.com/Linux/2012-10/72140.htm") ）

运行EasyBCD，“添加新条目”->“Linux/BCD”。

类型选择 Grub2（选第一个也行），名称可自定，驱动器选择/boot所在的分区（若不知道可根据大小判断）。点击“添加条目”即可。如下图如所示：
![](http://img.blog.csdn.net/20131122151800218?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvTHZhbk5lbw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

重启后便可看到引导页面。

至此双系统就安装完毕，若要卸载其中任一系统，只要格式化其盘，删除引导即可。



----------


参考资料：

[U盘安装Ubuntu 14.10-Linux公社](http://www.linuxidc.com/Linux/2014-10/108402.htm "U盘安装Ubuntu 14.10")
