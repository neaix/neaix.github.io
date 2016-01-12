---
layout: post
title: "使用Git+VPS搭建自己的Github(以Jekyll为例)"
comments: true
share: true
tags: Git
---


昨天把网站给搬到了阿里云上,顺便把https也给弄了,总体上讲还不错,就是多说那个东西坑爹不支持https,即使把js放在本地,登录用户的头像也还是各个网站自己的,不能支持https,听说要弄反向代理才能解决,我不打算弄了...

后来我发现如果每次发布文章都要登录控制台的话那就太麻烦了,所以想到利用git发布,但是由于jekyll在每次变动过后都要手动用"jekyll build"来重新生成下静态站点,所以导致即便是单纯用git上传也不行,还好git有自己的钩子函数可以检测到每次git push 后自动执行脚本.

完整步骤如下:

1. 安装Git :
	
	sudo apt-get install git

2. 创建一个git用户，用来运行git服务：(之后假如在hooks里放了创建任务的脚本的话,那么都将以git为拥有者和组)
	
	sudo adduser git

3. 收集所有需要登录的用户的公钥，就是他们自己的id_rsa.pub文件，把所有公钥导入到/home/git/.ssh/authorized_keys文件里，一行一个。
4. 初始化Git仓库：
	
	sudo git init --bare sample.git

	注意,一开始这里我不懂,以为以后push代码后就会把代码存放在这个目录里,实际上并不是这样的,
	Git服务器以分布式存储为主要特点的,并不是一个单纯的代码存放点.这样设计是为了阻止用户登录服务器上去修改仓库代码!如果要在别的地方使用这里的代码库,要在那个地方git clone!

5. 把owner改为git：
	
	sudo chown -R git:git sample.git

6. 禁用shell登录：

	出于安全考虑, git用户不允许登录shell，这可以通过编辑/etc/passwd文件完成。找到类似下面的一行：
	
	git:x:1001:1001:,,,:/home/git:/bin/bash

接下来就可以正常clone和push了. 但是如果要每次push完自动部署,就要用git hook

在/opt/git/Joway/hooks/下建立:post-receive文件,填上:

	#!/bin/bash -l
	GIT_REPO=/opt/git/Joway.git
	TMP_GIT_CLONE=/var/www/blog/Joway/
	PUBLIC_WWW=/var/www/blog/Joway/_site
	
	rm -rf ${TMP_GIT_CLONE}
	git clone $GIT_REPO $TMP_GIT_CLONE
	cd ${TMP_GIT_CLONE}
	jekyll build
	cd ~
	exit

这样做了以后,还要确保此时/var/www/blog/下没有创建好的Joway文件夹,因为我创建的都是root权限的,git用户无法存取和修改,一开始在这里浪费了很长时间才搞明白.

这样子以后,把nginx的配置文件里的网站根目录配置到:/var/www/blog/Joway/_site

这样就可以每次git push 完就自动部署了,而且和github的原理是一样的!对于非Jekyll站点也是一样的道理!


---
####  参考资料：  ####
- [http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/00137583770360579bc4b458f044ce7afed3df579123eca000](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/00137583770360579bc4b458f044ce7afed3df579123eca000)
- [http://jekyllcn.com/docs/deployment-methods/](http://jekyllcn.com/docs/deployment-methods/)
- [http://gitbook.liuhui998.com/5_8.html](http://gitbook.liuhui998.com/5_8.html)
