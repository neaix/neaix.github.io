---
layout: post
title: "多功能日期类" 
comments: true
share: true
tags: C/C++
---


定义并实现日期类，该类成员函数至少能实现以下功能：

1)	显示日期；

2)	年、月或日增1；

3)	日期比较（>, <, ==, !=）；

4)	日期赋值（=）；

5)	判断当前年份是否为闰年；

6)	显示下一个工作日的日期，下一个周日的日期；

7)	输入/出运算符（>>, <<）；

<br>
<br>
<br>
<br>
<br>
<br>

	#include <iostream>
	using namespace std;
	
	class Date {
	public:
		int year, month, day;
		ostream &print(ostream &os) {  //显示日期
			os << year << "年" << month << "月" << day << "日" << endl;
		}
		int Month_Type() { //判断月份类别，直接返回天数
			switch ((*this).month) {
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				return 31;
			case 4:
			case 6:
			case 9:
			case 11:
				return 30;
			case 2:
				if (((*this).year % 4 == 0 && (*this).year % 100 != 0) || (*this).year % 400 == 0)
					return 29;
				else
					return 28;
			}
		}
		void addYear() {  //增加一年（带判断）
			(*this).year++;
		}
		void addMonth() {   //增加一个月（带判断）
			if ((*this).month < 12)
				(*this).month++;
			else {
				(*this).month = 1;
				(*this).addYear();
			}
		}
		void addDay() {   //增加一天（带判断）
			if ((*this).Month_Type() == 31) {
				if ((*this).day < 31)
					(*this).day++;
				else {
					if ((*this).month < 12) {
						(*this).month++;
						(*this).day = 1;
					}
					else {
						(*this).month = 1;
						(*this).day = 1;
					}
				}
			}
			else if ((*this).Month_Type() == 30) {
				if ((*this).day < 30)
					(*this).day++;
				else {
					if ((*this).month < 12) {
						(*this).month++;
						(*this).day = 1;
					}
				}
			}
			else if ((*this).Month_Type() == 29) {
				if ((*this).day < 29)
					(*this).day++;
				else {
					(*this).day = 1;
					(*this).month++;
				}
			}
			else {
				if ((*this).day < 28)
					(*this).day++;
				else {
					(*this).day = 1;
					(*this).month++;
				}
			}
		}
	//以下为重载运算符
		bool operator > (const Date & b) const {
			if ((*this).year != b.year) {
				return (*this).year > b.year;
			}
			else {
				if ((*this).month != b.month) {
					return (*this).month > b.month;
				}
				else {
					return (*this).day > b.day;
				}
			}
		}
		bool operator < (const Date & b) const {
			if ((*this).year != b.year) {
				return (*this).year < b.year;
			}
			else {
				if ((*this).month != b.month) {
					return (*this).month < b.month;
				}
				else {
					return (*this).day < b.day;
				}
			}
		}
		bool operator == (const Date & b) const {
			return (*this).year == b.year &&
			       (*this).month == b.month &&
			       (*this).day == b.day;
		}
		bool operator != (const Date & b) const {
			return ~((*this).year == b.year &&
			         (*this).month == b.month &&
			         (*this).day == b.day);
		}
		Date operator = (Date date) {
			(*this).year = date.year;
			(*this).month = date.month;
			(*this).day = date.day;
			return *this;
		}
	//判断是否为闰年
		bool isLeapYear() {
			return (((*this).year % 400 == 0) || ((*this).year % 100 != 0 && (*this).year % 4 == 0));
		}
		int weekday() { //直接返回星期几
			//使用蔡勒公式
			int c, y;
			int d = (*this).day;
			int m = (*this).month;
			if (m == 1 || m == 2) {
				c = (((*this).year - 1) / 100);
				y = (((*this).year - 1) % 100);
				m += 12;
			}
			else {
				c = (((*this).year) / 100);
				y = (((*this).year) % 100);
			}
			// c代表年份前两位数
			// y代表年（后两位数）
			// m代表月（m大于等于3，小于等于14，
			// 即在蔡勒公式中，某年的1、2月要看作上一年的13、14月来计算
			// ，比如2003年1月1日要看作2002年的13月1日来计算）
			// d代表日
			int w = ((y + y / 4 + c / 4 - 2 * c + (26 * (m + 1) / 10) + d - 1) % 7);
			w = (w % 7 + 7) % 7;
			return w;
		}
	//输出下一个工作日
		ostream &printLastWeekday(ostream & os) {
			Date temp = (*this);
			while (1) {
				temp.addDay();
				if ((temp.weekday() != 0) && (temp.weekday() != 6)) {
					temp.print(os);
					break;
				}
			}
		}
	//输出下一个周日
		ostream &printLastSunday(ostream &os) {
			Date temp = (*this);
			while (1) {
				temp.addDay();
				if ((temp.weekday() == 0)) {
					temp.print(os);
					break;
				}
			}
		}
	
	};
	//重载输入输出运算符
	//PS：！！！注意，输入输出运算符必须是非成员函数！不能是类的成员函数！
	ostream &operator << (ostream &os, const Date &date) {
		os << date.year << "年" << date.month << "月" << date.day << "日" << endl;
		return os;
	}
	istream &operator  >> (istream &is , Date &date) {
		is >> date.year >> date.month >> date.day;
		return is;
	}
	
	int main()
	{
		//测试类
		Date date, date2;
		cin >> date;
		date.addYear();
		date.addMonth();
		date.addDay();
		date.print(cout);
		cin >> date2;
		bool sign = date < date2;
		cout << sign << endl;
		date = date2;
		cout << date ;
		cout << date2.isLeapYear() << endl;
		date.printLastWeekday(cout);
		cout << date.weekday() << endl;
		date.printLastSunday(cout);
		return 0;
	}