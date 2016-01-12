---
layout: post
title: "图书馆管理系统（C++控制台应用）" 
comments: true
share: true
tags: C/C++
---




## 1.0版本： ##

没有用真正的面向对象方法做。


## 主要功能： ##


	图书的信息包括：

		书名
		价格
		借书人
		借书日期
		sign（是否可借）
		
	0.信息录入

		a. 录入所有图书信息
		b. 查看所有图书信息
		c. 输入书名查找借书信息
		e. 删除一本图书信息
		f. 将每一份借书信息都读入“LibraryInfo.txt” 
	
	
	1.借书：
		a. 查询是否可借
		b. 输入借书人姓名和借书日期
	
	2.还书：

<br>
<br>
<br>
<br>
<br>

## BookData.h ##


	class BookData
	{
	public:
		BookData() = default;
		string BookName;  //书名
		int Price;		  //价格
		string BorrowName = "NULL"; //借书人
		string BorrowDate = "NULL"; //借书日期格式：2015-03-11
		bool sign = 1;	 //是否可借的标志
		//查看图书信息
		void print_data() {
			cout << (*this).BookName << "    "
			     << (*this).Price << "    ";
			if (sign) {
				cout << "Free" << endl;
			}
			else {
				cout << (*this).BorrowName << "    "
				     << (*this).BorrowDate << endl;
			}
		}
		//信息读入文件
		void PutInTxt(string name, fstream &file) {
			file << BookName << "  " << Price << "  ";
			if (sign == 0) {
				file << BorrowName << "  " << BorrowDate << endl;
			}
			else {
				file << endl;
			}
		}
		//借书
		void Borrow(string name, string date) {
			sign = 0;
			BorrowName = name;
			BorrowDate = date;
		}
		//还书
		void Return() {
			sign = 1;
			BorrowName = "NULL";
			BorrowDate = "NULL";
		}
	};
	





<br>
<br>
<br>
<br>
<br>



##     main.cpp ##

	#include <iostream>
	#include <vector>
	#include <string>
	#include <fstream>
	using namespace std;
	#include "BookData.h"
	
	
	//录入一本图书信息
	void AddData(vector<BookData> &data, string BookName, int Price) {
		BookData NewData;
		NewData.BookName = BookName;
		NewData.Price = Price;
		data.push_back(NewData);
	}
	//打印所有图书信息
	void PrintAllData(const vector<BookData> &data, string FileName) {
		fstream file(FileName, ostream::app);
		for (auto t : data) {
			t.PutInTxt(FileName, file);
		}
	}
	//查找一本书的信息,返回该图书的BookData类型值
	BookData &SearchBook(vector<BookData> &data, string Book_Name) {
	
		bool flag = 0;
		for (auto beg = data.begin(); beg != data.end(); ++beg) {
			if ((*beg).BookName == Book_Name) {
				flag = 1;
				return *beg;
			}
		}
		// if(flag)
		// 	return data.end();
	}
	
	//删除一本书信息
	void DeleteData(vector<BookData> &data, string Book_Name) {
		for (auto beg = data.begin(); beg != data.end(); ++beg) {
			if ((*beg).BookName == Book_Name) {
				data.erase(beg);
				break;
			}
		}
	}
	
	//查询是否可借
	bool ifBorrow(vector<BookData> &data, const string Book_Name) {
		return SearchBook(data, Book_Name).sign;
	}
	//借书
	void BorrowBook(vector<BookData> &data, string Book_Name,
	                string name, string date) {
		SearchBook(data, Book_Name).Borrow(name, date);
	}
	//还书
	void ReturnBook(vector<BookData> &data, const string Book_Name) {
		(SearchBook(data, Book_Name)).Return();
	}
	
	
	int main() {
		vector<BookData> All_BookData;
		cout << "         Welcome to Library System\n"
				"         -------------------------\n";
		while (1) {
			cout << "Enter a number to choose what you want to do\n"
			     << "  1.Imput all BookData\n"
			     << "  2.Print all BookData\n"
			     << "  3.Search a book\n"
			     << "  4.Add a BookData\n"
			     << "  5.Delete a BookData\n"
			     << "  6.Borrow a book\n"
			     << "  7.return a book\n"
			     << "  8.quit\n"
			     << endl;
			int ChooseNum;
			cin >> ChooseNum;
			string Book_Name;
			string FileName, name, date;
			int Price;
			switch (ChooseNum) {
			case 1:
				//信息录入
				cout << "Enter the data in order (BookName Price)" << endl;
				while ((cin >> Book_Name >> Price) && Book_Name != "0" && Price != 0) {
					AddData(All_BookData, Book_Name, Price);
				}
				break;
			case 2:
				//信息打印			
				cout << "Enter a file name" << endl;
				cin >> FileName;
				FileName += ".txt";
				PrintAllData(All_BookData, FileName);
				break;
			case 3:
				//查找一本书
				cout << "Enter the BookName" << endl;
				cin >> Book_Name;
				SearchBook(All_BookData, Book_Name).print_data();
				break;
			case 4:
				//增加一本书信息
				cout << "Enter the BookName and Price" << endl;
				cin >> Book_Name >> Price;
				AddData(All_BookData, Book_Name, Price);
				break;
			case 5:
				//删除一本书信息
				cout << "Enter the BookName which you want to delete" << endl;
				cin >> Book_Name;
				DeleteData(All_BookData, Book_Name);
				break;
			case 6:
				//借一本书
				cout << "Enter the BookName , your name and the date" << endl;
				cin >> Book_Name >> name >> date;
				if (ifBorrow(All_BookData, Book_Name)) {
					BorrowBook(All_BookData, Book_Name, name, date);
				}
				else {
					cout << Book_Name << "had been borrowed" << endl;
				}
				break;
			case 7:
				cout << "Enter the BookName" << endl;
				cin >> Book_Name;
				SearchBook(All_BookData, Book_Name).Return();
				break;
			case 8:
				return 0;
			}
		}
	}



## 2.0版本： ##

后来听老师分析了以后，明白了。

首先要根据现实场景明确什么类具有什么功能，不可以图书类自己具有借书功能，最好学生不要有还书功能，但是学生可以有想要还书的功能，然后通过管理员来间接实现还书功能。

千万记住，**设计大于coding!!!**


其次，为了让所有操作的数据都同步， 把所有人和书都放如图书馆类中，因为在现实意义上，图书馆就包括了他们。之前想到的是让管理员拥有图书馆权限，使他能够操作图书馆的
书，但是这样还并不是很好。

更新：

但是，如果管理员在图书馆类里面，而书也在图书馆类里面，则管理员要调用自己成员函数时，不能再传入图书馆类参数，所以无法修改。

这里我想：

A类里有B类类型的数据成员，则A类可以修改B，但B不能修改A。

所以我不懂这样子做管理员要如何才能修改图书馆里的数据了。

这里我认为管理员的权限是最高的，所以不能这样做。还是得用友元来做。

再次更新：

后来发现，可以这样：

	class Library{
	private:
		vector<Book> boks;
		vector<Admin> adms;
	}
	
	class Admin{
	public:
		void setBook(Book &bok){
			...;
		}
	}
	
	int main(){
		Library lib;
		lib.adms[0].setBook(lib.boks);
	}

但是这样子我总觉得很做作，感觉完全是为了弄在一起而弄在一起。不知道有没有什么更加自然的方法。



## 3.0 版本 ： ##

经过多次修改，添加了异常处理，形成一个完整的系统。

代码地址：

[https://github.com/joway/HomeWork_Library/tree/master/LibraryNew](https://github.com/joway/HomeWork_Library/tree/master/LibraryNew)