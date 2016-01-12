---
layout: post
title: "VisualStudio宏对应含义以及系统变量含义" 
comments: true
share: true
tags: 笔记
---




$(RemoteMachine)

在“调试”属性页上设置为 Remote Machine 属性的值。 有关更多信息，请参见更改用于 C/C++ 调试配置的项目设置。

$(Configuration)

当前项目配置的名称（例如“Debug”）。

$(Platform)

当前项目平台的名称（例如“Win32”）。

$(ParentName)

（已否决。）包含此项目项的项的名称。 该名称将是父文件夹名称或项目名称。

$(RootNameSpace)

包含应用程序的命名空间（如果有）。

$(IntDir)

为中间文件指定的相对于项目目录的目录路径。 此路径应具有尾部斜杠。 这解析为 Intermediate Directory 属性的值。

$(OutDir)

输出文件目录的路径，相对于项目目录。 此路径应具有尾部斜杠。 这解析为 Output Directory 属性的值。

$(DevEnvDir)

Visual Studio 2010 的安装目录（定义为驱动器 + 路径）；包括尾部反斜杠“\”。

$(InputDir)

（已否决；已迁移。）输入文件的目录（定义形式：驱动器 + 路径）；包括尾部的反斜杠“\”。 如果项目为输入，则此宏等效于 $(ProjectDir)。

$(InputPath)

（已否决；已迁移。）输入文件的绝对路径名（定义形式：驱动器 + 路径 + 基本名称 + 文件扩展名）。 如果项目为输入，则此宏等效于 $(ProjectPath)。

$(InputName)

（已否决；已迁移。）输入文件的基本名称。 如果项目为输入，则此宏等效于 $(ProjectName)。

$(InputFileName)

（已否决；已迁移。）输入文件的文件名（定义为基本名称 + 文件扩展名）。 如果项目为输入，则此宏等效于 $(ProjectFileName)。

$(InputExt)

（已否决；已迁移。）输入文件的文件扩展名。 它在文件扩展名的前面包括“.”。 如果项目为输入，则此宏等效于 $(ProjectExt)。

$(ProjectDir)

项目的目录（定义形式：驱动器 + 路径）；包括尾部的反斜杠“\”。

$(ProjectPath)

项目的绝对路径名（定义形式：驱动器 + 路径 + 基本名称 + 文件扩展名）。

$(ProjectName)

项目的基名称。

$(ProjectFileName)

项目的文件名（定义为基本名称 + 文件扩展名）。

$(ProjectExt)

项目的文件扩展名。 它在文件扩展名的前面包括“.”。

$(SolutionDir)

解决方案的目录（定义形式：驱动器 + 路径）；包括尾部的反斜杠“\”。

$(SolutionPath)

解决方案的绝对路径名（定义形式：驱动器 + 路径 + 基本名称 + 文件扩展名）。

$(SolutionName)

解决方案的基名称。

$(SolutionFileName)

解决方案的文件名（定义为基本名称 + 文件扩展名）。

$(SolutionExt)

解决方案的文件扩展名。 它在文件扩展名的前面包括“.”。

$(TargetDir)

生成的主输出文件的目录（定义形式：驱动器 + 路径）；包括尾部的反斜杠“\”。

$(TargetPath)

生成的主输出文件的绝对路径名（定义形式：驱动器 + 路径 + 基本名称 + 文件扩展名）。

$(TargetName)

生成的主输出文件的基本名称。

$(TargetFileName)

生成的主输出文件的文件名（定义为基本名称 + 文件扩展名）。

$(TargetExt)

生成的主输出文件的文件扩展名。 它在文件扩展名的前面包括“.”。

$(VSInstallDir)

安装 Visual Studio 2010 的目录。 

此属性包含目标 Visual Studio 的版本，该版本可能与宿主 Visual Studio 不同。 例如，在使用 $(PlatformToolset) = v90 进行生成时，$(VSInstallDir) 包含 Visual Studio 2008 安装位置的路径。

$(VCInstallDir)

安装 Visual C++ 2010 的目录。 

此属性包含目标 Visual C++ 的版本，该版本可能与宿主 Visual Studio 不同。 例如，在使用 $(PlatformToolset) = v90 进行生成时，$(VCInstallDir) 包含 Visual C++ 2008 安装位置的路径。

$(FrameworkDir)

安装 .NET Framework 的目录。

$(FrameworkVersion)

Visual Studio 使用的 .NET Framework 版本。 与 $(FrameworkDir) 相结合，就是 Visual Studio 使用的 .NET Framework 版本的完整路径。

$(FrameworkSDKDir)

安装 .NET Framework 的目录。 .NET Framework 可能已作为 Visual Studio 2010 的一部分安装，也可能单独安装。

$(WebDeployPath)

从 Web 部署根到项目输出所属于的位置的相对路径。 返回与 RelativePath 相同的值。

$(WebDeployRoot)

指向 <localhost> 位置的绝对路径。 例如，c:\inetpub\wwwroot。

$(SafeParentName)

（已否决。）有效名称格式的直接父级的名称。 例如，窗体是 .resx 文件的父级。

$(SafeInputName)

（已否决。）作为有效类名的文件的名称，但不包括文件扩展名。

$(SafeRootNamespace)

（已否决。）项目向导将在其中添加代码的命名空间名称。 此命名空间名称将只包含在有效的 C++ 标识符中允许的字符。

$(FxCopDir)

fxcop.cmd 文件的路径。 fxcop.cmd 文件不和所有的 Visual C++ 版本一起安装。


-------


	%SystemDrive%        操作系统所在的分区号。如   C:
	
	%SystemRoot%         操作系统根目录。如 C:\WINDOWS
	
	%windir%                   操作系统根目录。如 C:\WINDOWS
	
	%ALLUSERSPROFILE%           相当于   C:\Documents and Settings\All Users
	
	%APPDATA%           相当于   C:\Documents and Settings\用户目录\Application Data
	
	%ProgramFiles%      相当于   C:\Program Files
	
	%CommonProgramFiles%          相当于   C:\Program Files\Common Files
	
	%HOMEDRIVE%       操作系统所在的分区号。如：C:
	
	%HOMEPATH%        相当于   \Documents and Settings\用户目录
	
	%USERPROFILE%   相当于   C:\Documents and Settings\用户目录
	
	%HOMEDRIVE%     = C:\                    当前启动的系统的所在分区 
	%SystemRoot%      = C:\WINDOWS           当前启动的系统的所在目录 
	%windir%                 = %SystemRoot% = C:\WINDOWS                   当前启动的系统的所在目录
	%USERPROFILE% = C:\Documents and Settings\sihochina           当前用户数据变量 
	%HOMEPATH%       = C:\Documents and Settings\sihochina           当前用户环境变量 
	%system%              = C:\WINDOWS\SYSTEM32   
	
	%ALLUSERSPROFILE% ： 列出所有用户Profile文件位置。 
	%APPDATA% :   列出应用程序数据的默认存放位置。 
	%CD% :   列出当前目录。 
	%CLIENTNAME% :   列出联接到终端服务会话时客户端的NETBIOS名。 
	%CMDCMDLINE% :   列出启动当前cmd.exe所使用的命令行。 
	%CMDEXTVERSION% :   命令出当前命令处理程序扩展版本号。 
	%CommonProgramFiles% :   列出了常用文件的文件夹路径。 
	%COMPUTERNAME% :   列出了计算机名。 
	%COMSPEC% :   列出了可执行命令外壳（命令处理程序）的路径。 
	%DATE% :   列出当前日期。 
	%ERRORLEVEL% :   列出了最近使用的命令的错误代码。 
	%HOMEDRIVE% :   列出与用户主目录所在的驱动器盘符。 
	%HOMEPATH% :   列出用户主目录的完整路径。 
	%HOMESHARE% :   列出用户共享主目录的网络路径。 
	%LOGONSEVER% :   列出有效的当前登录会话的域名控制器名。 
	%NUMBER_OF_PROCESSORS% :   列出了计算机安装的处理器数。 
	%OS% :   列出操作系统的名字。(Windows XP 和 Windows 2000 列为 Windows_NT.) 
	%Path% :   列出了可执行文件的搜索路径。 
	%PATHEXT% :   列出操作系统认为可被执行的文件扩展名。 
	%PROCESSOR_ARCHITECTURE% :   列出了处理器的芯片架构。 
	%PROCESSOR_IDENTFIER% :   列出了处理器的描述。 
	%PROCESSOR_LEVEL% :   列出了计算机的处理器的型号。 
	%PROCESSOR_REVISION% :   列出了处理器的修订号。 
	%ProgramFiles% :   列出了Program Files文件夹的路径。 
	%PROMPT% :   列出了当前命令解释器的命令提示设置。 
	%RANDOM% :   列出界于0 和 32767之间的随机十进制数。 
	%SESSIONNAME% :   列出连接到终端服务会话时的连接和会话名。 
	%SYSTEMDRIVE% :   列出了Windows启动目录所在驱动器。 
	%SYSTEMROOT% :   列出了Windows启动目录的位置。 
	%TEMP% and %TMP% :   列出了当前登录的用户可用应用程序的默认临时目录。 
	%TIME% :   列出当前时间。 
	%USERDOMAIN% :   列出了包含用户帐号的域的名字。 
	%USERNAME% :   列出当前登录的用户的名字。 
	%USERPROFILE% :   列出当前用户Profile文件位置。 
	%WINDIR% :   列出操作系统目录的位置。
	
	变量 类型 描述 
	%ALLUSERSPROFILE% 本地 返回“所有用户”配置文件的位置。 
	%APPDATA% 本地 返回默认情况下应用程序存储数据的位置。 
	%CD% 本地 返回当前目录字符串。 
	%CMDCMDLINE% 本地 返回用来启动当前的 Cmd.exe 的准确命令行。 
	%CMDEXTVERSION% 系统 返回当前的“命令处理程序扩展”的版本号。 
	%COMPUTERNAME%   系统 返回计算机的名称。 
	%COMSPEC%   系统 返回命令行解释器可执行程序的准确路径。 
	%DATE%   系统 返回当前日期。使用与 date /t 命令相同的格式。由 Cmd.exe 生成。有关 date 命令的详细信息，请参阅 Date。 
	%ERRORLEVEL%   系统 返回上一条命令的错误代码。通常用非零值表示错误。 
	%HOMEDRIVE%   系统 返回连接到用户主目录的本地工作站驱动器号。基于主目录值而设置。用户主目录是在“本地用户和组”中指定的。 
	%HOMEPATH%   系统 返回用户主目录的完整路径。基于主目录值而设置。用户主目录是在“本地用户和组”中指定的。 
	%HOMESHARE%   系统 返回用户的共享主目录的网络路径。基于主目录值而设置。用户主目录是在“本地用户和组”中指定的。 
	%LOGONSERVER%   本地 返回验证当前登录会话的域控制器的名称。 
	%NUMBER_OF_PROCESSORS%   系统 指定安装在计算机上的处理器的数目。 
	%OS%   系统 返回操作系统名称。Windows 2000 显示其操作系统为 Windows_NT。 
	%PATH% 系统 指定可执行文件的搜索路径。 
	%PATHEXT% 系统 返回操作系统认为可执行的文件扩展名的列表。 
	%PROCESSOR_ARCHITECTURE%   系统 返回处理器的芯片体系结构。值：x86 或 IA64（基于 Itanium）。 
	%PROCESSOR_IDENTFIER% 系统 返回处理器说明。 
	%PROCESSOR_LEVEL%   系统 返回计算机上安装的处理器的型号。 
	%PROCESSOR_REVISION% 系统 返回处理器的版本号。 
	%PROMPT% 本地 返回当前解释程序的命令提示符设置。由 Cmd.exe 生成。 
	%RANDOM% 系统 返回 0 到 32767 之间的任意十进制数字。由 Cmd.exe 生成。 
	%SYSTEMDRIVE% 系统 返回包含 Windows server operating system 根目录（即系统根目录）的驱动器。 
	%SYSTEMROOT%   系统 返回 Windows server operating system 根目录的位置。 
	%TEMP% 和 %TMP% 系统和用户 返回对当前登录用户可用的应用程序所使用的默认临时目录。有些应用程序需要 TEMP，而其他应用程序则需要 TMP。 
	%TIME% 系统 返回当前时间。使用与 time /t 命令相同的格式。由 Cmd.exe 生成。有关 time 命令的详细信息，请参阅 Time。 
	%USERDOMAIN% 本地 返回包含用户帐户的域的名称。 
	%USERNAME% 本地 返回当前登录的用户的名称。 
	%USERPROFILE% 本地 返回当前用户的配置文件的位置。 
	%WINDIR% 系统 返回操作系统目录的位置。
	
	%temp%        = %USERPROFILE%\Local Settings\Temp = C:\Documents and Settings\sihochina\Local Settings\Temp                                                                              当前用户TEMP缓存变量


