---
layout: post
title: "Visual Studio 常见报错汇总" 
comments: true
share: true
tags: 笔记
---


## 1. error LNK2026 模块对于 SAFESEH 映像是不安全的。 ##

	打开该项目的“属性页”对话框，
	
	然后单击“链接器”--“命令行”
	
	将 /SAFESEH:NO 复制到“其它选项（D)”框中，然后点击应用。




## 2. 解决VS2013编译出的exe对于xp不支持： ##

![](http://pic3.zhimg.com/deacd686bad90b39eb4d60dbcf763ebe_r.jpg)

	在项目配置属性中，将平台工具集选择为"Visual Studio 2013 - Windows XP (v120_xp)"，即可解决“无效的 Win32 应用程序”问题。


![](http://pic2.zhimg.com/84d9ea62473e9a5adb98d85484f752e5_r.jpg)




## 3. 解决 “缺少msvcp120.dll”或者“缺少msvcp100.dll”问题 ##


![](http://pic4.zhimg.com/f44f4bbcea40797ace7637253dbb8047_r.jpg)

有三种种解决方案：

一种是从VC目录下去复制一个 “msvcp120.dll” 到程序目录中，然而又会报出“缺少msvcr120.dll”错误，所以还应该把msvcr120.dll也移到程序目录中。

另外一种方案是，在制作安装盘的时候，选择附加的环境包选项，让用户安装附加的环境安装包。

最后一种方案是在项目配置中，选择C/C++中的代码生成，里面的运行库，里面有四种选项：

![](http://pic2.zhimg.com/70699c860bc9c1361ca732b24fa06c45_r.jpg)

对应的名称：

	多线程（MT）
	多线程DLL（MD）
	多线程调试（MTd）
	多线程调试DLL（MDd）

1. 多线程DLL （MD）和 多线程调试DLL （MDd）

两者都导入了2个MSVCxxxx.dll （黄箭头所指），调试版本（MDd）导入的是MSVCP120D.dll和MSVCR120D.dll，比非调试（MD）的那个都多一个字母D。

很明显这是配套给调试版的运行时库。而我们之前安装的发行包所部署的都是不带D的版本，是给Release版的程序配套使用的。

顺便一提MSVCP代表MicroSoft Visual C++(Plus) ，MSVCR则代表MicroSoft Visual C（没有+）Runtime。 一个是C++运行时库一个是C运行时库。

2. 多线程（MT） 与 多线程调试（MTd）

都没有MSVCP和MSVCR函数导入，只有Kernel32.dll。

同时观察这两个文件的体积，都比MD或MDd大了很多，这正是它们不需要导入运行时库DLL函数的原因，因为它们把运行时库静态编译到自己的文件中去了。这也代表着它们运行的时候不会再依赖外部的运行时库DLL文件。

总结：

1. 将运行库选择为 【多线程 /MT 】或【多线程调试 /MTd】。
2. 当然如果使用了MFC，同理的要设置【在静态库中使用MFC】。

（参考自知乎：http://www.zhihu.com/question/25415940）

## 4. error C2259: “ATL::CComObject<Base>”: 不能实例化抽象类 ##

编译64位ATL 进程内com组件时，提示error C2259: “ATL::CComObject<Base>”: 

![](http://aigudao.net/content/uploadfile/201404/33e91396950771.png)

原因是：参数类型UINT，64位不兼容

	STDMETHODIMP CSimpleShlExt::GetCommandString (
	    UINT idCmd, UINT uFlags, UINT* pwReserved, LPSTR pszName, UINT cchMax )

第一个参数UINT改为UINT_PTR,其他参数不用改。

## 5. 预编译头文件来自编译器的早期版本，或者预编译头为 C++ 而在 C 中使用它(或相反) ##

需要在项目属性中，选择 C/C++ ， 预编译头项，然后选择不使用预编译头。

![](http://ww1.sinaimg.cn/mw690/708485bfgw1er7l3dtdowj20qg0fwgp1.jpg)

## 6. 类似于下面这种错误： ##

	>FaceDetection.obj : error LNK2019: 无法解析的外部符号 "int __stdcall SetDialogSkin(char *)" (?SetDialogSkin@@YGHPAD@Z)，该符号在函数 "public: virtual int __thiscall CFaceDetectionApp::InitInstance(void)" (?InitInstance@CFaceDetectionApp@@UAEHXZ) 中被引用

这是由于：

1. 没有找到某个.cpp文件

2. 或者是没有设置好lib，（即没有找到相应的库（即依赖项））

3. 提到的函数没有定义

4. 所依赖的dll没有被包含进来！


上述原因归根结底可以归咎于 没有设置好编译器依赖目录！

解决方案：

![](http://ww3.sinaimg.cn/mw690/708485bfgw1er7ldf5ko5j20vv0fdtci.jpg)

项目属性中的 配置属性 中的 链接器 中的 输入 中的 **附加依赖项**！

添上你所依赖的文件目录！


## 7. error D8016: “/O1”和“/RTC1”命令行选项不兼容。 ##

原因，项目属性 C/C++ 代码生成中的基本运行时检查的设置(RTC1) 和 C/C++中的优化选项(O1)冲突了！！！

但是我发现改优化里的话无论改成什么都没用，但是基本运行时检查改成默认值就可以解决了！

## 8. 发现有如下错误：##

	无法将参数 2 从“const char [5]”转换为“LPCWSTR” ......


	IntelliSense: "const char *" 类型的实参与 "LPCTSTR" 类型的形参不兼容 （vs2010）

	
则说明字符串和字符参数不能为Unicode，要为多字节字符集。（项目属性中可以设置）

但是：这里有一个问题是，假如你一个解决方案下有好几个项目，每个项目还各自相互依赖，而且有的项目是要在多字节字符集下编译，有的是要在Unicode下编译，这样的话你就无法通过设置项目属性来解决这个问题。

有一种手动的方法是：

	对于字符串 "string" 改成 _T("string")
	对于字符参数 int fun(char*); 改成 int fun ( TCHAR *)

上述操作要包含头文件 <tchar.h>


## 9. 无法解析的外部符号，该符号在函数XXX中被引用  ##

	MSVCRTD.lib(crtexew.obj) : error LNK2019: 无法解析的外部符号 _WinMain@16，该符号在函数 ___tmainCRTStartup 中被引用 
	Debug\jk.exe : fatal error LNK1120: 1 个无法解析的外部命令


连接程序在负责连接可执行程序时，选择相应的c/c++运行时启动函数。如果设定了/subsystem:windows连接程序开关，那么连接程序会试图寻找WinMain或wWinMain函数。如果连个函数都不存在，那么就会返回一个“一个未解决的外部符号”（无法解析的外部符号 _main，该符号在函数 ___tmainCRTStartup 中被引用)


同样，如果设定了/subsystem:console连接程序开关，那么连接程序就会试图寻找main函数或者wmain函数，如果找不到这连个函数是，连接程序返回unresolved externel symbol错误信息。

解决方案：

1. 将main函数改为Winmain函数
2. 将/subsystem:windows开关改为/subsytem:console
3. 全部删除/subsytem:windows开关，让连接程序根据源代码中实现的函数进行正确的操作。

更改/subsystem:windows的方法：


右键点击项目，选择属性，会看到如下的选项框，点击连接器->系统，在右侧会看到“子系统”选项，在这里可以选择相应的连接程序开关

## 10. IntelliSense: 应输入声明  ##


解决方案:

工具-->选项-->文本编辑器-->C/C++-->高级-->禁用自动更新-->True


## 11. C移植到C++时，出现：error C1853: 预编译头文件来自编译器的早期版本，或者预编译头为 C++ 而在 C 中使用它(或相反) ##

最直接的解决方案就是，设置为不适用预编译头.


假如一个项目依赖于另一个项目，则在生成这个项目的同时会重新编译另一个项目.这也是当一个解决方案下出现一个C项目和一个C++项目时最头疼的问题。


## 12.  “class”类型重定义:##

可能的原因：

1. 头文件重复包含出错；
2. 或者真的定义了两个一样名字的类

解决方案：

文件首部添加 #pragma once  可以让防止头文件被重复包含！

PS：类成员名字不能和成员函数名字一样！



## 13.  fatal error LNK1120: 1 个无法解析的外部命令##

可能原因：

1. 有某个函数的定义，却没有相应函数的实现部分
2. 编译缺少相应的附加依赖项
3. vs 工程中出现这个问题，源文件没有找到f()函数的实现。比较常见的就是函数体没有写上或者没有工程没有包含f函数所在的目录。
4. 还有一种情况就是，vs中混合使用c++代码和c代码时候，如果c++代码调用c的实现时候，也会出现这个情况。原因为两个函数的调用方式不一样，指函数明调用方式即可。


## 14. 没有与这些操作数匹配的"="运算符 ##

假如这个错误是出在条件语句中，说明：

1. 该表达式返回的不是bool
2. 该表达式忘记加括号了！（最常见）





## 15. 解决VS下对多字符的不支持问题 ##

在加载旧的VS工程时，会出现:
	
	错误 1 error MSB8031: Building an MFC project for a non-Unicode character set is deprecated. You must change the project property to Unicode or download an additional library. See http://go.microsoft.com/fwlink/p/?LinkId=286820 for more information. C:\Program Files (x86)\MSBuild\Microsoft.Cpp\v4.0\V120\Microsoft.CppBuild.targets


这是由于微软在VS2013中把 multi-byte character set 支持移除了。

解决办法：

去微软网站下载这个组件

[Multibyte MFC Library for Visual Studio 2013](http://www.microsoft.com/zh-cn/download/details.aspx?id=40770)

然后工程配置仍旧是多字节，就行了。


## 16. 应用程序无法正常启动(0xc000007b) ##

一般是用32位的exe调用了64位的dll或者64位的exe调用了32位的dll
