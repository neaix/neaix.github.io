---
layout: post
title: "Installshield归纳总结" 
comments: true
share: true
tags: 笔记
---


新建Installshield项目后，在弹出的导航里：

出现如下窗口：

![](http://ww2.sinaimg.cn/mw690/708485bfgw1eqr99e4nfkj20r20gfadm.jpg)

## Application Information:  ##

1. 左上角的：Edit the defaut installation location ，打开后可以看到系统确定的默认文件夹，点中任何你想要设置为默认路径的文件夹，再点击下面的ok，就可以设置其为[INSTALLDIR]系统变量。

![](http://ww4.sinaimg.cn/mw690/708485bfgw1eqr99en9kkj20ad0btjsq.jpg)

2. 左上角还有一个General Information选项，打开后出现：



	Product Code ：产品ID(未知用途，可能用来注册表中或者产品安装时检测是否有相同软件已安装)
	
	Upgrade Code ：升级ID（未知用途，可能用来注册表中或者产品升级时检测是否有之前旧版本）
	
	Setup Language ： 选择安装界面语言
	
	INSTALLDIR ： 设置默认安装路径变量
	
	DATABASEDIR：（未知用途）
	
	Fast Install ： 如果Installer中包含的小文件数目非常多但又很在乎安装速度，可勾选此选项，生成的安装包在安装时不会设置系统还原点，也不会做一些额外的准备，安装速度会很快。

	Require Administrative Privileges : 设置安装时是否请求管理员权限。如果你的安装包中包含一些对系统文件、注册表的操作，勾选此项，否则可能导致安装时报错。    
	
	Unique ID ： （未知用途，可能用来注册表中）







## Installation Requirements: ##

主要是选择软件安装环境，以及是否需要其他的软件（主要是Adobe Reader和微软系软件）。一般无用。

## Installation Architecture: ##

Limited版本限制使用。

## Application Files: ##

用来添加程序以及管理安装好后你程序的内部目录结构，（但是，这里不能再设置INSTALLDIR变量，得去前面设。）

这里添加程序的时候，注意不要乱添加，要看文件目录的结构，否则你注册表那里设置的时候就不知道怎么加了。

![](http://ww1.sinaimg.cn/mw690/708485bfgw1eqr99ezp9dj20r80ghq6j.jpg)

## Application Shortcuts: ##

设置快捷方式。

普通Shortcut不能直接指定目标为网址，否则不会被创建。如果需要创建网页快捷方式，新建一个.url文件，里面写上目标网址，将此文件安装时复制到目录，再建一个快捷方式指向该.url; 

## Application Registry: ##

（注册表信息详情见：[http://joway.github.io/blog/2015/04/02/注册表学习笔记.html](http://joway.github.io/blog/2015/04/02/注册表学习笔记.html "http://joway.github.io/blog/2015/04/02/注册表学习笔记.html")）


设置注册表有两种方法：

1. 一种是直接在右边窗口可视化添加，一开始给你五个空的根文件夹，在你需要的那个文件夹里面添加文件夹（即key），一层层添加下去（具体参考regedit.exe中的结构，根目录下的每个文件夹都有自己特殊的功能，参考手册）。例如：

	我现在要添加在文件和文件夹上点击右键可以弹出如winrar那样的选项，并且直接链接到我的程序中去。
	而AllFilesystemObjects文件夹的功能就是“在文件和文件夹上点击右键可以弹出选项”，所以在HKEY_CLASSES_ROOT（一般都是在这个文件夹下操作）下建立AllFilesystemObjects文件夹，再在下面建立shell文件夹，再建立你所需要的选项的名字命名的文件夹，再添加一个默认的Value，value data为该选项名字，再在该文件夹下建立command文件夹，再设置一个默认的value，value data为，"[INSTALLDIR]fenc.exe" "%1"。

	！！！最后的value data的格式说明：[INSTALLDIR]就是我们的安装目录，我这里是D:\Program Files (x86)\HZNU\FileCrypt\，注意！！！，这个系统变量最后是带"\"的！，所以之后的fenc.exe是我想要调用的程序名字，如果在下面的另外文件夹，再加上那个文件夹的路径，注意衔接处不要加"\" ！

	！！！"%1" 的意思不是程序的第二个参数！程序的第几个参数你可以自己控制次序改的，而是对于右键点击这个动作，文件名是其传出来的第二个参数！！！！。

	！！！这里的双引号""不确定是不是一定要加，但是加了是没事的。

	！！！如果你没有为注册表键设置值，那么当你选择它时将什么都不显示。


	！！！这种修改注册表的方法目前发现的一个已知缺陷是，如果让把右键选项那个文件夹命名成中文，则会报错，无法通过编译。而且，如果打开本机的regedit.exe 后，会发现那里的注册表几乎都是英文的（但是手动可以添加中文注册表），然而很多软件却实现了注册表中是英文但是最终呈现是中文的效果，目前怀疑这可能是通过两种方法实现的：1.可能是自己写reg文件导入的(说不定在reg文件中允许添加中文注册表，目前还没试过)，2.可能是通过最后的value值是一串{}的ID实现的，但是这个原理并不是很清楚，况且，正如前面第一个界面里看到的那样，我一个程序里只有一个unique ID，但是若我程序有好几个exe文件，它怎么知道我要调用哪个？

	！！！在InstallScript项目中设置的所有的注册表数据（除了<Default>）必须关联到一个构件。在安装项目中，如果这个构件所属的功能部件在安装中被选择，那么这个构件的注册数据就会被安装到目标系统上。

	！！！默认的，你创建的所有键都被设置为自动安装或卸载。这意味着当它所属的构件安装时它也会被安装，构件卸载的时候它也会被卸载。

	


![](http://ww4.sinaimg.cn/mw690/708485bfgw1eqr99fg3mej20r60gkaea.jpg)

另外，左边的Registry选项可以可视化的把你本机的注册表信息拖入你程序要添加的那个栏中，优选这种操作方式。



2. 另一种是可以自己写reg文件添加。右上角有个Import a .reg file 选项，可以自己写一个reg文件，然后导入安装程序。（暂未试过）

当你导入一个.reg文件到一个构件或者注册表设置是，这个注册表数据将添加到构件或注册表设置的注册表数据部分，并在构件或注册表设置安装时写入到最终用户的系统中。（即最先是写入安装程序的）


左上角还有一个Creat an application path 选项，应该是设置系统变量path的，好像是对dll文件使用的，似乎很有用，目前暂未试过。

官方介绍如下：


	The application path registry key contains data that Windows uses as a private search path for the specified application’s .dll files. If you install an application’s .dll files into a directory not found in the PATH environment variable (and not into the application’s directory), you should set the appropriate application path to include the .dll file directory during installation. Application path information is stored in the registry under HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\AppName.exe.



## Installation Interview ： ##

用来定制安装程序的。

左边的Use custom images on diagos 可以使用自定义图片作为程序背景。

右边可以设置是否添加License, 是否允许人们添加公司名字和用户名字，**是否允许自定义安装目录**。


----------


最后，visual stdio 上面菜单里有singleImage（生成单个exe安装文件），CD_ROM，DVD-5三种选项。

