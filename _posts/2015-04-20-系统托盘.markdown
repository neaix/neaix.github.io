---
layout: post
title: "实现右下角系统托盘显示及菜单选项的方法" 
comments: true
share: true
tags: 笔记
---


## 解决方案 1: ##

使用了 C++.NET 中的NotifyIcon 类，缺点，依赖 .NEt 环境

MSDN链接：[https://msdn.microsoft.com/zh-cn/library/system.windows.forms.notifyicon(v=vs.110).aspx?cs-save-lang=1&cs-lang=cpp#code-snippet-2](https://msdn.microsoft.com/zh-cn/library/system.windows.forms.notifyicon(v=vs.110).aspx?cs-save-lang=1&cs-lang=cpp#code-snippet-2 "https://msdn.microsoft.com/zh-cn/library/system.windows.forms.notifyicon(v=vs.110).aspx?cs-save-lang=1&cs-lang=cpp#code-snippet-2")


	#using <System.dll>
	#using <System.Windows.Forms.dll>
	#using <System.Drawing.dll>
	
	using namespace System;
	using namespace System::Drawing;
	using namespace System::Windows::Forms;
	public ref class Form1 : public System::Windows::Forms::Form
	{
	private:
		System::Windows::Forms::NotifyIcon^ notifyIcon1;
		System::Windows::Forms::ContextMenu^ contextMenu1;
		System::Windows::Forms::MenuItem^ menuItem1;
		System::ComponentModel::IContainer^ components;
	
	public:
		Form1()
		{
			this->components = gcnew System::ComponentModel::Container;
			this->contextMenu1 = gcnew System::Windows::Forms::ContextMenu;
			this->menuItem1 = gcnew System::Windows::Forms::MenuItem;
	
			// Initialize contextMenu1
			array<System::Windows::Forms::MenuItem^>^temp0 = { this->menuItem1 };
			this->contextMenu1->MenuItems->AddRange(temp0);
	
			// Initialize menuItem1
			this->menuItem1->Index = 0;
			this->menuItem1->Text = "E&xit";
			this->menuItem1->Click += gcnew System::EventHandler(this, &Form1::menuItem1_Click);
	
			// Set up how the form should be displayed.
			this->ClientSize = System::Drawing::Size(292, 266);
			this->Text = "Notify Icon Example";
	
			// Create the NotifyIcon.
			this->notifyIcon1 = gcnew System::Windows::Forms::NotifyIcon(this->components);
	
			// The Icon property sets the icon that will appear
			// in the systray for this application.
			notifyIcon1->Icon = gcnew System::Drawing::Icon("appicon.ico");
	
			// The ContextMenu property sets the menu that will
			// appear when the systray icon is right clicked.
			notifyIcon1->ContextMenu = this->contextMenu1;
	
			// The Text property sets the text that will be displayed,
			// in a tooltip, when the mouse hovers over the systray icon.
			notifyIcon1->Text = "Form1 (NotifyIcon example)";
			notifyIcon1->Visible = true;
	
			// Handle the DoubleClick event to activate the form.
			notifyIcon1->DoubleClick += gcnew System::EventHandler(this, &Form1::notifyIcon1_DoubleClick);
		}
	
	protected:
		~Form1()
		{
			if (components != nullptr)
			{
				delete components;
			}
		}
	
	private:
		void notifyIcon1_DoubleClick(Object^ /*Sender*/, EventArgs^ /*e*/)
		{
	
			// Show the form when the user double clicks on the notify icon.
			// Set the WindowState to normal if the form is minimized.
			if (this->WindowState == FormWindowState::Minimized)
				this->WindowState = FormWindowState::Normal;
	
			// Activate the form.
			this->Activate();
		}
	
		void menuItem1_Click(Object^ /*Sender*/, EventArgs^ /*e*/)
		{
	
			// Close the form, which closes the application.
			this->Close();
		}
	
	};
	
	[STAThread]
	int main()
	{
		Application::Run(gcnew Form1);
	}




----------


## 解决方案 2 ： ##

使用MFC来实现，缺点是所依赖的dll都弄成静态编译包含进exe的话，就会导致文件稍微有点大了。

源工程文件链接：[oneoneone.wang/MFCFileCrypt.rar](oneoneone.wang/MFCFileCrypt.rar "oneoneone.wang/MFCFileCrypt.rar")

参考链接：

[http://blog.163.com/chenluyu0910@126/blog/static/99042293201222805047974/](http://blog.163.com/chenluyu0910@126/blog/static/99042293201222805047974/ "http://blog.163.com/chenluyu0910@126/blog/static/99042293201222805047974/")

[http://blog.sina.com.cn/s/blog_923e0cd7010190if.html](http://blog.sina.com.cn/s/blog_923e0cd7010190if.html "http://blog.sina.com.cn/s/blog_923e0cd7010190if.html")

[http://blog.csdn.net/equationdz/article/details/2100798](http://blog.csdn.net/equationdz/article/details/2100798 "http://blog.csdn.net/equationdz/article/details/2100798")


Tips:

MFC中，字符串要用_T（“1243”）；

include "stdafx.h"
是预编译作用，要放在开头，因为预编译是从下而上进行检索的



