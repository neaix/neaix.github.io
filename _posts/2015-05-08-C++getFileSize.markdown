---
layout: post
title: "C++下获取文件大小的几种方法" 
comments: true
share: true
tags: 笔记
---

代码来自：[http://developer.51cto.com/art/201002/182227.htm](http://developer.51cto.com/art/201002/182227.htm "http://developer.51cto.com/art/201002/182227.htm")


PS:

有另外一种方法是通过文件尾指针 减去 文件头指针
但是发现：

	fstream p("1.txt", istream::in);
	auto size = (p.end - p.beg);

这样输出结果永远是2

后来发现这个end/beg根本不是指针，只是个值而已。

end是2，beg是0，一般是用来作为函数参数用的

具体是什么暂时还没查出来。

<br>




	#include < iostream>
	#include < io.h>
	#include < sys\stat.h>
	#include < afx.h>
	#define _AFXDLL
	using namespace std;
	void main()
	{
		// 此文件在工程打开状态下为不可访问
		char* filepath = "..\\test.ncb";
		// C++获取文件大小方法一
		struct _stat info;
		_stat(filepath, &info);
		int size = info.st_size;
		cout < < size < < endl;
		// C++获取文件大小方法二
		FILE* file = fopen(filepath, "rb");
		if (file)
		{
			int size = filelength(fileno(file));
			cout < < size < < endl;
			fclose(file);
		}
		// C++获取文件大小方法三
		CFile cfile;
		if (cfile.Open(filepath, CFile::modeRead))
		{
			int size = cfile.GetLength();
			cout < < size < < endl;
		}
		// C++获取文件大小方法四(需要先进行char *转LPCWSTR)
		wchar_t *convertCharArrayToLPCWSTR(const char* charArray)
		{
			wchar_t* wString = new wchar_t[4096];
			MultiByteToWideChar(CP_ACP, 0, charArray, -1, wString, 4096);
			return wString;
		}
		
		long long getFileSize(const char *filepath){
			LPCWSTR _WfilePath = convertCharArrayToLPCWSTR(filepath);
			HANDLE handle = CreateFile(_WfilePath, FILE_READ_EA,
				FILE_SHARE_READ, 0, OPEN_EXISTING, 0, 0);
			if (handle != INVALID_HANDLE_VALUE)
			{
				long long size = GetFileSize(handle, NULL);
				return size;
				CloseHandle(handle);
			}
		}

	}



C下最常用方法：

	long getFileSize(FILE *file)
	{
		fseek(file, 0L, SEEK_END);
		long size = ftell(file);
		fseek(file, 0L, SEEK_SET);//重置文件位置指针
		//这里切记使其文件位置指针回到文件开始，不然之后文件操作会凌乱掉
	
		return size;
	}

另外，有一次遇到了无法fseek的情况，这时还可以用：

**long _filelength(int _FileHandle);  -------<io.h>**

PS:msdn建议使用_filelength版本，尽管filelength()也是可以用的。

filelength函数用于获取文件的长度，但是最大只能获取2g的文件大小，因为返回值类型long使用4个字节大小来表示，最大为2的31次方也就是2G的大小。

为了在C中获得文件句柄，可用下面的示例：

	FILE*file=fopen("test.txt","r");
	intiSize=filelength(fileno(file));
	fclose(file);

---

fileno：

函数名称：fileno（在VC++6.0下为_fileno[1] ）

函数原型：int _fileno( FILE *stream );

函数功能：fileno()用来取得参数stream指定的文件流所使用的文件描述符

返回值：某个数据流的文件描述符

头文件：stdio.h