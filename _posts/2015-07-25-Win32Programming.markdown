---
layout: post
title: "Win32学习笔记" 
comments: true
share: true
tags: Win32
---

注意点：

- 对话框无法最前显示: 

.rc文件对话框属性里:设置Topmost为true就可以了。

如果是MessageBox无法最前显示，那么多半是DLG设置成最前了，而MessageBox的第一个参数是NULL，这时候把对话框的hwnd句柄传给它的第一个参数就行了

但是加入hwnd的对话框也不是最前显示的(如后台程序，压根就隐藏了对话框)，则可以用GetTopWindow(NULL)来获得最前窗口句柄，再传入MessageBox()
	
	MessageBox(GetTopWindow(NULL), L"123", L"FileCrypt Error", MB_ICONWARNING);

- 如果dll 不是静态编译的话,在干净的机器上会出现加载失败的情况
- 下拉框设置属性为不可编辑: 把Type设置为Drop List 而不是DropDown
- 注意，对话框静态文本如果是在rc文件里写代码的形式话，要注意尺寸设定，不然会显示不全！！！
- 注意，对于一个dll，假如它想在自己这里使用其字符串资源，千万不能LoadString(GetModuleHandle(NULL), nResID, strRes, 50);这样，因为GetModuleHandle(NULL)得到的是当前进程的句柄，而不是dll的，这里可以考虑用dll句柄的全局变量！
- DialogBoxParam()和DialogBox()的返回值是窗口过程中，调用EndDialog(hDlg, LOWORD(wParam));的第二个参数！

-----

具体方法：

---
## Win32修改StaticText方法 ##

网上找了很对源代码和博客，都是用MFC的，我后来自己根据别人MFC的弄法改造了下，发现成功了。所以以后遇到MFC的时候也别怕，和WIN32的基本逻辑是差不多的。

首先在rc文件里面建立对应的static text资源 (注意，可以使用图形界面去建立，但是这个ID千万不能是系统默认的那个IDC_STATIC，一开始就是因为是这个所以一直不行，要自己单独建立一个宏)。

注意，static text 是放在界面里的那些资源，不是string table里的那种字符串资源！！！

弄完以后，在对话框处理函数里：

	HWND hText = GetDlgItem(hDlg, IDC_STATIC1);
	SetWindowText(hText,L"New");

这样就能把static text转换了，不需要别的任何操作！

工程放在了github上。

---
## Win32实现打开文件多选功能 ##

		OPENFILENAME ofn;
		char szOpenFileNames[128 * MAX_PATH] = "";
		char szPath[MAX_PATH];

		char* p;
		int nLen = 0;
		ZeroMemory(&ofn, sizeof(ofn));

		ofn.lStructSize = sizeof(ofn);
		ofn.hwndOwner = NULL;
		ofn.lpstrFile = szOpenFileNames;
		ofn.nMaxFile = sizeof(szOpenFileNames);
		ofn.lpstrFilter = "所有文件\0*.*\0文本文件\0*.txt\0JPEG文件\0*.jpg\0";
		ofn.nFilterIndex = 3;
		ofn.lpstrFileTitle = NULL;
		ofn.nMaxFileTitle = 0;
		ofn.lpstrInitialDir = NULL;
		ofn.Flags = OFN_EXPLORER | OFN_PATHMUSTEXIST | OFN_FILEMUSTEXIST | OFN_ALLOWMULTISELECT;

		if (GetOpenFileName(&ofn))
		{
			//把第一个文件名前的复制到szPath,即:
			//如果只选了一个文件,就复制到最后一个'/'
			//如果选了多个文件,就复制到第一个NULL字符
			lstrcpyn(szPath, szOpenFileNames, ofn.nFileOffset);

			//当只选了一个文件时,下面这个NULL字符是必需的.
			//这里不区别对待选了一个和多个文件的情况
			szPath[ofn.nFileOffset] = '\0';
			nLen = lstrlen(szPath);

			if (szPath[nLen - 1] != '\\')   //如果选了多个文件,则必须加上'\\'
			{
				lstrcat(szPath, "\\");
			}
			strcpy(szIndexFileName, szPath);//在img目录路径下生成index.html
			strcat(szIndexFileName, "index.html");

			p = szOpenFileNames + ofn.nFileOffset; //把指针移到第一个文件
			ZeroMemory(szFileName, sizeof(szFileName));
			while (*p)
			{
				lstrcat(szFileName, szPath);  //给文件名加上路径  
				lstrcat(szFileName, p);    //加上文件名    
				//lstrcat(szFileName, TEXT("/n")); //换行//这样不行，要把'\0'给替换掉！
				//字符串不替换掉'\0'后期使用函数都会被截断的！
				szFileName[lstrlen(szFileName)] = '\n';
				p += lstrlen(p) + 1;     //移至下一个文件	
			}
		}
		//至此，得到的szFileName是由'\n'分割的所有文件名！
		//在文本框中显示文件路径  
		HWND hEdt = GetDlgItem(hDlg, IDC_EDIT2);
		SendMessage(hEdt, WM_SETTEXT, NULL, (LPARAM)szFileName);


---
## 利用Win32API实现文件复制和追加 ##


	//文件复制，只需要一个函数就可以了，第三个参数表示：
	//如果目标文件存在, True: 失败; False: 覆盖
	CopyFile(szHeadFileName, szIndexFileName, FALSE)


	//文件追加：
			HANDLE hFile;
			HANDLE hAppend;
			DWORD  dwBytesRead, dwBytesWritten, dwPos;
			BYTE   buff[4096];
			// Open the existing file. 
			hFile = CreateFile(szEndFileName, // open
				GENERIC_READ,             // open for reading 
				0,                        // do not share 
				NULL,                     // no security 
				OPEN_EXISTING,            // existing file only 
				FILE_ATTRIBUTE_NORMAL,    // normal file 
				NULL);                    // no attr. template 
			if (hFile == INVALID_HANDLE_VALUE)
			{
				MessageBox(NULL, "fail", "INVALID_HANDLE_VALUE", MB_OK);
				return 1;
			}
			// Open the existing file, or if the file does not exist, 
			// create a new file. 
			hAppend = CreateFile(szIndexFileName, // open Two.txt 
				GENERIC_WRITE,            // open for writing 
				FILE_SHARE_READ,          // allow multiple readers 
				NULL,                     // no security 
				OPEN_ALWAYS,              // open or create 
				FILE_ATTRIBUTE_NORMAL,    // normal file 
				NULL);                    // no attr. template 
			if (hAppend == INVALID_HANDLE_VALUE)
			{
				MessageBox(NULL, "fail", "INVALID_HANDLE_VALUE", MB_OK);
				return 1;
			}
			// Append the first file to the end of the second file. 
			// Lock the second file to prevent another process from 
			// accessing it while writing to it. Unlock the 
			// file when writing is finished. 
			do
			{
				if (ReadFile(hFile, buff, sizeof(buff), &dwBytesRead, NULL))
				{
					dwPos = SetFilePointer(hAppend, 0, NULL, FILE_END);
					LockFile(hAppend, dwPos, 0, dwBytesRead, 0);
					WriteFile(hAppend, buff, dwBytesRead, &dwBytesWritten, NULL);
					UnlockFile(hAppend, dwPos, 0, dwBytesRead, 0);
				}
			} while (dwBytesRead == sizeof(buff));
			// Close both files. 
			CloseHandle(hFile);
			CloseHandle(hAppend);



----------


## win32 用系统默认方式打开文件:
	
	ShellExecute(NULL, "open", cmdline, "", "", SW_SHOWNORMAL);


cmdline 可以是单独一个文件名字，如"1.txt" 这样就会以系统注册表中指定的默认名字来打开文件了




####  参考资料：  ####

