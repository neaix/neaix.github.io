---
layout: post
title: "C/C++  Practice" 
comments: true
share: true
tags: C/C++
---

习题3-8   手机键盘（keyboard）

手机键盘如下，输入一个由小写字母组成的英文单词，输出敲击序列。

如：

输入：abc

输出:a1a2a3

![](http://i.imgur.com/ESrrPv4.png)

<br>
<br>
<br>
<br>
<br>

		// 一开始代码如下，错误出在输入abc，输出a1b2c3，而不是a1a2a3！！
	
		// #include <iostream>
		// #include <set>
		// #include <string>
		// #define MAX 100
		// using namespace std;
		// int main()
		// {
		//  set<char> ch1 = {'a', 'd', 'g', 'j', 'm', 'p', 't', 'w'};
		//  set<char> ch2 = {'b', 'e', 'h', 'k', 'n', 'q', 'u', 'x'};
		//  set<char> ch3 = {'c', 'f', 'i', 'l', 'o', 'r', 'v', 'y'};
		//  set<char> ch4 = {'s', 'z'};
		//  //一开始用vector，但是顺序容器不能用find成员函数。
		//  string word;
		//  cin >> word;
		//  for (auto i : word) {
		//      cout << i;
		//      if (ch1.find(i) != ch1.end()) {
		//          cout << 1;
		//      }
		//      else if (ch2.find(i) != ch2.end()) {
		//          cout << 2;
		//      }
		//      else if (ch3.find(i) != ch3.end()) {
		//          cout << 3;
		//      }
		//      else if (ch4.find(i) != ch4.end()) {
		//          cout << 4;
		//      }
		//  }
		// }
		//
		// 修改后如下，用数组保存
		#include <iostream>
		#include <set>
		#include <string>
		#define MAX 100
		using namespace std;
		int main()
		{
			char key[8][5] = {"abc", "def", "ghi", "jkl",
			                  "mno", "pqrs", "tuv", "wxyz"
			                 };
			string word;
			cin >> word;
			for (auto i : word) {
				for (int c = 0; c < 8; ++c) {
					for (int j = 0; j < 4; ++j) {
						if (i == key[c][j]) {
							cout << key[c][0] << j + 1;
						}
					}
				}
			}
			return 0;
		}
	




<br>
<br>
<br>
<br>
<br>
----------

<br>
<br>
<br>
<br>
<br>
输入一个n*n的矩阵，左旋90度

思路：

无非就是另起一个数组，按照一个规律把另一个数组的值赋给它。

<br>
<br>
<br>
<br>
<br>

	#include <iostream>
	#include <iomanip>
	#define MAX 100
	using namespace std;
	int main()
	{
		int num[MAX][MAX];
		int temp[MAX][MAX];
		int n;
		cin >> n;
		for (int i = 0; i < n; ++i)
		{
			for (int j = 0; j < n; ++j)
			{
				cin >> num[i][j];
				temp[n - 1 - j][i] = num[i][j];
			}
		}
		for (int i = 0; i < n; ++i)
		{
			for (int j = 0; j < n; ++j)
			{
				cout << setw(3) << temp[i][j];
			}
			cout << '\n';
		}
	
	}

<br>
<br>
<br>
<br>
<br>
----------

<br>
<br>
<br>
<br>
<br>
最长回文串：

输入一个字符串，输出其最大回文子串

例如：

输入：

haha ni hao a AMAMAMA

输出：

7

<br>
<br>
<br>
<br>
<br>

	#include <iostream>
	#include <string>
	#define MAX 5000
	using namespace std;
	int main()
	{
		string str;
		getline(cin, str);
		int max = 0, flag = 1;
		for (int i = 0 ; i < str.size(); ++i) {  //控制哪里开头
			for (int j = i + 1; j < str.size(); ++j) { //控制哪里结尾（即提取一个子串）
				int temp = j;   // t为子串遍历末尾,k为开头
				for (int k = i; k <= (j - i + 1) / 2 + i; ++k) {
					if (str[k] != str[temp--]) { 
						flag = 0;
						break;
					}
				}
				if (flag) {
					if (max < j - i + 1)
						max = j - i + 1;
				}
				flag = 1;   //一开始这里忘记把flag归1了！
			}
		}
		cout << max << endl ;
	}

<br>
<br>
<br>
<br>
<br>
----------

<br>
<br>
<br>
<br>
<br>


    
    数组-10. 求整数序列中出现次数最多的数(15)
    
    时间限制
    400 ms
    内存限制
    65536 kB
    代码长度限制
    8000 B
    判题程序
    Standard
    作者
    张彤彧（浙江大学）
    本题要求统计一个整型序列中出现次数最多的整数及其出现次数。
    
    输入格式：
    
    输入在一行中给出序列中整数个数N（0<N<=1000），以及N个整数。数字间以空格分隔。
    
    输出格式：
    
    在一行中输出出现次数最多的整数及其出现次数，数字间以空格分隔。题目保证这样的数字是唯一的。
    
    输入样例：
    10 3 2 -1 5 3 4 3 0 3 2
    输出样例：
    3 4


<br>

>>"输入在一行中给出序列中整数个数 N（0< N <= 1000）" 

这句话一开始没看见，而且也没考虑整数>10的情况！

	下面的程序只对10以内整数有效，超过二位数就无效了！
	#include <iostream>
	#include <string>
	using namespace std;
	int main()
	{
	    string str;
	    char n[10] = {'0', '1', '2', '3', '4',
	                  '5', '6', '7', '8', '9'
	                 };
	    int count[10] = {0};
	    getline(cin, str);  //用getline可以读取空格！（勿忘cin!）
	    // cin >> str ; //!!!: 空格会被string截断！
	    // for(char ch;ch!='\n';){
	    //  cin >> ch;
	    //  str.push_back(ch);
	    // }   这样不能识别换行！会一直读取
	    for (auto i : str )   //范围for记住是auto！！！
	    {
	        //这样不行，只能识别一位数整数，别的不行了！
	        //而整数的位数又不知，所以n[]数组也无效。count[]数组也无效了！
	        if (i != ' ')
	        {
	            for (int t = 0; t < 10; ++t)
	            {
	                if (i == n[t])
	                {
	                    ++count[t];
	                }
	            }
	        }
	    }
	    int max_count = 0;
	    int val;
	    for (int t = 0; t < 10; ++t)
	    {
	        if (count[t] > max_count)
	        {
	            max_count = count[t];
	            val = t;
	        }
	    }
	    cout << val << " " << count[val] << endl;
	    return 0;
	}


<br>
<br>
<br>
<br>
<br>

----------


<br>
<br>
<br>
<br>
<br>

    循环-18. 龟兔赛跑(20)
    
    时间限制
    400 ms
    内存限制
    65536 kB
    代码长度限制
    8000 B
    判题程序
    Standard
    作者
    陈建海（浙江大学）
    乌龟与兔子进行赛跑，跑场是一个矩型跑道，跑道边可以随地进行休息。乌龟每分钟可以前进3米，兔子每分钟前进9米；兔子嫌乌龟跑得慢，觉得肯定能跑赢乌龟，于是，每跑10分钟回头看一下乌龟，若发现自己超过乌龟，就在路边休息，每次休息30分钟，否则继续跑10分钟；而乌龟非常努力，一直跑，不休息。假定乌龟与兔子在同一起点同一时刻开始起跑，请问T分钟后乌龟和兔子谁跑得快？
    
    输入格式：
    
    输入在一行中给出比赛时间T（分钟）。
    
    输出格式：
    
    在一行中输出比赛的结果：乌龟赢输出“@_@”，兔子赢输出“^_^”，平局则输出“-_-”；后跟1空格，再输出胜利者跑完的距离。
    
    输入样例：
    242
    输出样例：
    @_@ 726



<br>
<br>
<br>
<br>
<br>

	#include <iostream>
	#include <string>
	using namespace std;

	int main()
	{
	    int T;
	    cin >> T;
	    int def_R = 0, def_T = 0; //R=兔子，T=乌龟
	    int minutes = 1;
	    int sign = 0, t = 0;
	    while (minutes <= T)
	    {
	        def_T += 3;
	        if (sign == 0)
	            def_R += 9;
	        else
	            ++t;//表示休息t分种
	        if (t % 30 == 0)
	            sign = 0; //满30分钟恢复跑
	        if (minutes % 10 == 0)
	        {
	            if (def_R > def_T)
	                sign = 1; //表示休息
	        }
	        ++minutes;
	    }
	    if (def_R > def_T)
	    {
	        cout << "^_^ " << def_R << endl;
	    }
	    else if (def_T > def_R)
	    {
	        cout << "@_@ " << def_T << endl;
	    }
	    else
	    {
	        cout << "-_- " << def_T << endl;
	    }
	    return 0;
	}
    

<br>
<br>
<br>
<br>
<br>
----------

<br>
<br>
<br<
<br>
<br>

    循环-19. 币值转换(20)
    
    时间限制
    400 ms
    内存限制
    65536 kB
    代码长度限制
    8000 B
    判题程序
    Standard
    作者
    陈建海（浙江大学）
    输入一个整数（位数不超过9位）代表一个人民币值（单位为元），请转换成财务要求的大写中文格式。如23108元，转换后变成“贰万叁仟壹百零捌”元。为了简化输出，用小写英文字母a-j顺序代表大写数字0-9，用S、B、Q、W、Y分别代表拾、百、仟、万、亿。于是23108元应被转换输出为“cWdQbBai”元。
    
    输入格式：
    
    输入在一行中给出一个不超过9位的非负整数。
    
    输出格式：
    
    在一行中输出转换后的结果。注意“零”的用法必须符合中文习惯。
    
    输入样例1：
    813227345
    输出样例1：
    iYbQdBcScWhQdBeSf
    输入样例2：
    6900
    输出样例2：
    gQjB


<br>
<br>
<br>
半对，需要分开来计算，很麻烦


	#include <iostream>
	#include <string>
	using namespace std;
	
	int sumzero(unsigned int num[], int i) //用来计算i位置以及之后0的数目(切记还要是连续的！！！)
	{
	    //i 是数组当前下标，t是有几位数
	    int sum = 0;
	    for (int p = i; p > 0; --p)
	    {
	        if (num[p] == 0)  //!!!一开始这里变成‘=’号，导致数组变成0了！
	        {
	            ++sum;
	        }
	        else
	        {
	            break;
	        }
	    }
	    return sum;
	}
	int main()
	{
	    char ChNum[10] = {'a', 'b', 'c', 'd', 'e'
	                      , 'f', 'g', 'h', 'i', 'j'
	                     };
	    unsigned int num[10] = {0}; //代表个十百千万亿
	    string n;
	    cin >> n;
	    unsigned long N = stol(n);
	    int t = 0; //t保存有几位数
	    while (N != 0)
	    {
	        num[t + 1] = N % 10;
	        N /= 10;
	        ++t;
	    }
	    //num[]下标1相当于个位
	    for (int i = t; i > 0; --i)
	    {
	        if (sumzero(num, i) == i) //后面都是0
	        {
	            break;
	        }
	        else  //后面不全为0
	        {
	            //!!!:这里有个很难解决的问题：
	            //!那就是1亿三千万零五百和1亿零五百这样的怎么识别
	            //看来是要分隔开来，一万以上和一万以下来算。。。
	            cout << ChNum[num[i]]; //输出数字
	            if (num[i] == 0)
	            {
	                i = i - sumzero(num, i) + 1;
	            }
	            //231002112发抽！无法解决
	            else   //忘记用else了，导致为0时也输出了单位
	            {
	                switch (i)   //输出单位
	                {
	                case 9:
	                    cout << "Y" ;
	                    break;
	                case 8 :
	                    cout << "Q" ;
	                    break;
	                case 7:
	                    cout << "B" ;
	                    break;
	                case 6:
	                    cout << "S" ;
	                    break;
	                case 5:
	                    cout << "W" ;
	                    break;
	                case 4:
	                    cout << "Q" ;
	                    break;
	                case 3:
	                    cout << "B" ;
	                    break;
	                case 2:
	                    cout << "S" ;
	                    break;
	                }
	            }
	        }
	    }
	    return 0;
	}






<br>
<br>
<br>
<br>
<br>


----------
<br>
<br>
<br>
<br>
<br>





    数组-12. 简易连连看
    
    时间限制
    400 ms
    内存限制
    65536 kB
    代码长度限制
    8000 B
    判题程序
    Standard
    作者
    陈建海（浙江大学）
    本题要求实现一个简易连连看游戏模拟程序。
    
    给定一个2Nx2N的方阵网格游戏盘面，每个格子中放置一些符号。这些符号一定是成对出现的，同一个符号可能不止一对。程序读入玩家给出的一对位置(x1, y1)、(x2, y2)，判断这两个位置上的符号是否匹配。如果匹配成功，则将两个符号消为“*”并输出消去后的盘面；否则输出“Uh-oh”。若匹配错误达到3次，则输出“Game Over”并结束游戏。或者当全部符号匹配成功，则输出“Congratulations!”，然后结束游戏。
    
    输入格式：
    
    输入在一行中给一个正整数N（<5）。随后2N行，每行2N个大写英文字母（其间以1个空格分隔），表示游戏盘面。盘面之后给出一个正整数K，随后K行，每行按照格式“x1 y1 x2 y2”给出一个玩家的输入。注意格子的行、列编号是从1到2N。
    
    输出格式：
    
    根据玩家的每一步输入，输出相应的结果。输出盘面时注意，每行字符间以1个空格分隔，行末不得有多余空格。
    
    输入样例1：
    2
    I T I T
    Y T I A
    T A T Y
    I K K T
    11
    1 1 1 3
    4 2 4 3
    3 1 4 2
    2 2 1 2
    3 1 2 4
    4 4 3 1
    2 1 3 4
    3 3 1 4
    4 1 2 3
    2 4 3 2
    1 1 2 2
    输出样例1：
    * T * T
    Y T I A
    T A T Y
    I K K T
    * T * T
    Y T I A
    T A T Y
    I * * T
    Uh-oh
    * * * T
    Y * I A
    T A T Y
    I * * T
    Uh-oh
    * * * T
    Y * I A
    * A T Y
    I * * *
    * * * T
    * * I A
    * A T *
    I * * *
    * * * *
    * * I A
    * A * *
    I * * *
    * * * *
    * * * A
    * A * *
    * * * *
    Congratulations!
    输入样例2：
    2
    I T I T
    Y T I A
    T A T Y
    I K K T
    5
    1 1 4 4
    1 1 2 3
    1 1 2 3
    2 2 4 1
    2 2 3 3
    输出样例2：
    Uh-oh
    * T I T
    Y T * A
    T A T Y
    I K K T
    Uh-oh
    Uh-oh
    Game Over





<br>
<br>
<br>
<br>
<br>

    #include <cstdio>
    #include <iostream>
    #define MAX 10
    using namespace std;
    
    void print(char ch[MAX][MAX],int N){
    	int sign;
    	for(int i=1;i<=2*N;++i){
    		sign=0;
    		for(int j=1;j<=2*N;++j){
    			printf("%c",ch[i][j]);
    			if(++sign<2*N){
    				printf(" ");
    			}
    		}
    		printf("\n");
    	}
    }
    
    int main(){
    	int N;
    	scanf("%d",&N);
    	char ch[MAX][MAX]={0};
    	for(int i=1;i<=2*N;++i){
    		for(int j=1;j<=2*N;++j){
    			cin >> ch[i][j];
    			//scanf("%c", &ch[i][j]);
    			//用scanf导致空格和换行各种混淆
    			//cin会根据对象类型进行智能赋值，不会把空格换行读入！
    		}
    
    	}
    	int K;
    	cin >> K;
    	int sum=0;//错误次数
    	int count=0;//消去次数，用次数，否则每次都去判断是否全部消去太费时
    	while(K--){
    		int x1,y1,x2,y2;
    		scanf("%d%d%d%d",&x1,&y1,&x2,&y2);
    		if(ch[x1][y1]==ch[x2][y2]&&ch[x1][y1]!='*'&&ch[x2][y2]!='*'){
    										//一开始忘了消去以后的相等是不算的！
    			ch[x1][y1]=ch[x2][y2]='*';
    			++count;
    			if(count==2*N*N){
    			cout<< "Congratulations!"<<endl;
    			break;
    			}
    			print(ch,N);
    		}
    		else{
    			printf("Uh-oh\n");
    			++sum;
    		}
    		if(sum>=3){
    			cout << "Game Over"<<endl;
    			break;
    		}
    	}
    	return 0;
    }




<br>
<br>
<br>
<br>
<br>

----------
<br>
<br>
<br>
    数组-11. 猴子选大王(20)
    
    时间限制
    400 ms
    内存限制
    65536 kB
    代码长度限制
    8000 B
    判题程序
    Standard
    作者
    徐镜春（浙江大学）
    一群猴子要选新猴王。新猴王的选择方法是：让N只候选猴子围成一圈，从某位置起顺序编号为1-N号。从第1号开始报数，每轮从1报到3，凡报到3的猴子即退出圈子，接着又从紧邻的下一只猴子开始同样的报数。如此不断循环，最后剩下的一只猴子就选为猴王。请问是原来第几号猴子当选猴王？
    
    输入格式：
    
    输入在一行中给一个正整数N（<=1000）。
    
    输出格式：
    
    在一行中输出当选猴王的编号。
    
    输入样例：
    11
    输出样例：



<br>
<br>
<br>
<br>
<br>

	
	//下面思路错误，一开始用erase，但是发现好像迭代器会发抽
	//后来用把轮到3的元素变成0，发现也不行，因为会涉及到重复变成3的情况
	// #include <iostream>
	// #include <list>
	// using namespace std;
	
	// int sum(list<intnum)
	// {
	// int s = 0;
	// for (auto i : num)
	// {
	// if (i == 0)
	// ++s;
	// }
	// return s;
	// }
	// int main()
	// {
	// int N;
	// cin >N;
	// list<intnum;
	// for (int i = 1; i <= N; ++i)
	// {
	// num.push_back(i);
	// }
	// int flag = 0;
	// auto it = num.begin();
	// while (sum(num) != N - 1 )
	// {
	// if (it == num.end())
	// {
	// it = num.begin();
	// }
	// ++flag;
	// if (flag == 3)
	// {
	// *it = 0;
	// flag = 0;
	// }
	// ++it;   //next iter
	//// cout << *it << endl;
	// }
	// for (auto i : num)
	// {
	// if (i != 0)
	// {
	// cout << i << endl;
	// }
	// }
	// return 0;
	// }
	
	
	最后把erase改了下，就可以用erase了！
	
	
	#include <iostream>
	#include <list>
	using namespace std;
	
	int main()
	{
	    int N;
	    cin >> N;
	    list<int> num;
	    for (int i = 1; i <= N; ++i)
	    {
	        num.push_back(i);
	    }
	    int flag = 0;//标志1，2，3
	    auto it = num.begin();
	    while (num.size() > 1)
	    {
	        ++flag;
	        if (flag == 3)
	        {
	            it = num.erase(it); //注意删除后it就无效了，不能再去++！！！
	            //erase会返回被删除元素下一个的指针
	            flag = 0;
	        }
	        if (flag != 0)  //一开始这里弄错，由于删除时的保存操作，导致若删除了的话自动会移动到下一个的
	            ++it;   //next iter
	        if (it == num.end())
	        {
	            it = num.begin();
	        }
	    }
	    cout << *num.begin() << endl;
	    return 0;
	}



<br>
<br>
<br>
<br>
<br>

----------
<br>
<br>
<br>
<br>
<br>

    结构-05. 有理数均值(20)
    
    时间限制
    400 ms
    内存限制
    65536 kB
    代码长度限制
    8000 B
    判题程序
    Standard
    作者
    乔林（清华大学）
    本题要求编写程序，计算N个有理数的平均值。
    
    输入格式：
    
    输入第1行给出正整数N（<=100）；第2行中按照“a1/b1 a2/b2 ……”的格式给出N个分数形式的有理数，其中分子和分母全是整形范围内的整数；如果是负数，则负号一定出现在最前面。
    
    输出格式：
    
    在一行中按照“a/b”的格式输出N个有理数的平均值。注意必须是该有理数的最简分数形式，若分母为1，则只输出分子。
    
    输入样例1：
    4
    1/2 1/6 3/6 -5/10
    输出样例1：
    1/6
    输入样例2：
    2
    4/3 2/3
    输出样例2：
    1



<br>
<br>
<br>
下面代码的错误之处在于试图将已经变成小数的数字再变成分数！
应该保留原来的分数形式，否则在变小数时有四舍五入，最后的double 在循环小数的时候不可能变成分数，因为无线循环有四舍五入!

	#include <cstdio>
	// #include <iostream>
	// #include <string>
	// #include <sstream>
	// #include <cmath>
	// using namespace std;
	// //求最大公约数：
	// int gcd(long long a, long long b)
	// {
	// if (a < b)
	// {
	// a = a + b;
	// b = a - b;
	// a = a - b;
	// }
	// long long t;
	// while (b != 0)
	// {
	// t = a % b;
	// a = b;
	// b = t;
	// }
	// return a;
	// }
	
	// void PrintFenshu(double num)  //输出分数
	// {
	// int a = (int)num;
	// double b = num - a; //小数部分
	// //下面计算有几位小数
	// ostringstream strs;
	// strs << b;
	// string str = strs.str();
	// int len = str.size() - 2;
	// long long n = pow(10, len); //真分数的分母
	// long long x = b * n, y = n;
	// long long X, Y; //最终的分子分母
	// X = x + a * y;
	// Y = y;
	// //接下来求最大公约数
	// int GCD = gcd(X, Y);
	// cout << X / GCD << "/" << Y / GCD << endl;
	// }
	
	// struct n
	// {
	// int a;
	// int b;
	// //double val = a * 1.0 / b; 这样赋值是错误的！！！！a,b还不知道
	// } num[100];
	
	// int main()
	// {
	// int N;
	// cin >> N;
	// double sum = 0;
	// for (int i = 0; i < N; ++i)
	// {
	// scanf("%d/%d", &num[i].a, &num[i].b);
	// sum += num[i].a * 1.0 / num[i].b;
	// }
	// sum /= N;
	// cout << sum << endl;
	// PrintFenshu(sum);
	// return 0;
	// }


下面是网上找来的一个代码，他没有变成小数，直接同分来做，最后分子分母同时除以最大公约数

	#include <stdio.h>
	#define N 100
	struct Rational
	{
	    int n;  /* 分子 */
	    int d;  /* 分母 */
	};
	int gcd(int m, int n)   /* 求最大公约数 */
	{
	    int r;
	    if (m == 0 && n == 0)
	        return 0;
	    if (m == 0)
	        return n;
	    if (n == 0)
	        return m;
	    while (1)
	    {
	        r = m % n;
	        if (r == 0)
	            break;
	        m = n;
	        n = r;
	    }
	    return n;
	}
	int main(void)
	{
	    struct Rational ra[N], r;
	    int i, n, g;
	    scanf("%d", &n);
	    for (i = 0; i < n; ++i)
	        scanf("%d/%d", &ra[i].n, &ra[i].d);
	    r.n = 0;
	    r.d = 1;
	    for (i = 0; i < n; ++i)
	    {
	        r.n = r.n * ra[i].d + r.d * ra[i].n;
	        r.d = r.d * ra[i].d;
	    }
	    r.d *= n;   /*平均值 */
	    g = gcd(r.n, r.d);
	    if (g != 0)
	    {
	        r.n /= g;
	        r.d /= g;
	    }
	    if (r.n == 0)
	        printf("%d\n", r.n);
	    else if (r.d == 1)
	        printf("%d\n", r.n);
	    else
	        printf("%d/%d\n", r.n, r.d);
	    return 0;
	}

<br>
<br>
<br>
<br>
<br>


----------

<br>
<br>
<br>
<br>
<br>

    数组-13. 螺旋方阵(20)
    
    所谓“螺旋方阵”，是指对任意给定的N，将1到N*N的数字从左上角第1个格子开始，按顺时针螺旋方向顺序填入NxN的方阵里。本题要求构造这样的螺旋方阵。
    
    输入格式：
    
    输入在一行中给出一个正整数N（<10）。
    
    输出格式：
    
    输出NxN的螺旋方阵。每行N个数字，每个数字占3位。
    
    输入样例：
    
    5
    
    输出样例：
    
    1 2 3 4 5
    
    16 17 18 19 6
    
    15 24 25 20 7
    
    14 23 22 21 8
    
    13 12 11 10 9

<br>
<br>
<br>

	// #include <stdio.h>
	
	// int main()
	// {
	//     int num[11][11];
	//     int N;
	//     scanf("%d", &N);
	//     int count = 0, n = 1;
	//     //  rule: 右边增>左边增>右边减>左边减
	//     int i = 1, j = 1;
	//     while (++count)
	//     {
	//         if (i == 1 && j == 1)
	//         {
	//             --count;
	//             ++i;
	//             break;
	//         }
	//         if (i == 1 && j < N)
	//         {
	//             num[i][j++] = n++;
	//         }
	//         else if (i != N && j == N)
	//         {
	//             num[i++][j] = n++;
	//         }
	//         else if (i == N && j != 1)
	//         {
	//             num[i][j--] = n++;
	//         }
	//         else if (i != 1 && j == 1)
	//         {
	//             num[i--][j] = n++;
	//         }//到2 1 时停，此时i==1，j==1
	//     }
	//     while (++count <= N * N)
	//     {
	//         if (i == 2 && j != N)
	//         {
	//             num[i][j++] = n++;
	//         }
	//         else if (i != N - 1 && j == N)
	//         {
	//             num[++i][j] = n++;
	//         }
	//         else if (i == N - 1 && j != 2)
	//         {
	//             num[i][j--] = n++;
	//         }
	//         else if (i != 2 && j == 2)
	//         {
	//             num[i--][j] = n++;
	//         }
	//     }
	//     if (N % 2 == 1)
	//         num[N / 2 + 1][N / 2 + 1] = n;
	//     for (int a = 1; a <= N; ++a)
	//     {
	//         for (int b = 1; b <= N; ++b)
	//         {
	//             printf("%3d", num[a][b]);
	//         }
	//         printf("\n");
	//     }
	
	//     return 0;
	// }


以上错误，只是根据个例的规律


下面的是从网上看思路后自己写的

使用了控制下标k来控制变化！


	#include <cstdio>
	
	int main()
	{
	    int N;
	    scanf("%d", &N);
	    int di[] = {0, 1, 0, -1};
	    int dj[] = {1, 0, -1, 0}; //用来控制递增和递减
	    int k = 0;//上面数组的下标，通过控制它来控制递增还是递减
	    int num[10][10] = {0};
	    int nexti = 0, nextj = 0;//下一个坐标
	    int n = 1;
	    for (int t = 0; t < N * N; ++t)
	    {
	        num[nexti][nextj] = n++;
	        nexti += di[k];
	        nextj += dj[k];  //下一个坐标的变化
	        if (nexti < 0 || nexti > N - 1 || nextj < 0 || nextj > N - 1
	                || num[nexti][nextj] != 0)
	        {
	            //条件判断是否越界
	            nexti -= di[k];
	            nextj -= dj[k];   //越界后补偿前面发生的变化
	            k = (k + 1) % 4;  //生成新k
	            nexti += di[k];
	            nextj += dj[k];//新坐标
	        }
	    }
	    for (int t = 0; t < N; ++t)
	    {
	        for (int p = 0; p < N; ++p)
	        {
	            printf("%3d", num[t][p]);
	        }
	        printf("\n");
	    }
	    return 0;
	}

下面的是根据《算法竞赛入门经典》改写的，这种方法最好！

	#include <iostream>
	#include <iomanip>
	using namespace std;
	int main()
	{
		int n;
		cin >> n ;
		int num[10][10] = {0}, x = 0, y = 0;
		int tol = num[x][y] = 1;
		while (tol < n * n) {   //用下面的条件来判断临界状态。
								//注意，做题时要先判断后操作，不要操作了以后再去恢复
			while (y + 1 < n && !num[x][y + 1])  num[x][++y] = ++tol;
			while (x + 1 < n && !num[x + 1][y])  num[++x][y] = ++tol;
			while (y - 1 >= 0 && !num[x][y - 1]) num[x][--y] = ++tol;
			while (x - 1 >= 0 && !num[x - 1][y]) num[--x][y] = ++tol;
		}
		for (int i = 0; i < n; ++i) {
			for (int j = 0; j < n; ++j) {
				cout << setw(3) << num[i][j];  //setw只能控制下一次操作，所以每次都要设定！
			}
			cout << '\n';
		}
		return 0;
	}


<br>
<br>
<br>
<br>
<br>


----------

<br>
<br>
<br>
<br>
<br>

    结构
    第9题
    【描述】
    输入若干个正整数，输入-1时输入结束，用单向链表组织输入的正整数。定义和调用函数：struct node *createList(void)，建立单向链表，返回指向链表头结点的指针。定义和调用函数：void printList(struct node *head)，输出单向链表。定义和调用函数：int sum(struct node *head)，计算并返回所有结点中整数的和。定义和调用函数：struct node *cyclicShift(struct node *head, DIR dir)，实现链表的循环移位，DIR为枚举类型，取值LEFT和RIGHT，当dir的值为LEFT时，循环左移一次，当dir的值为RIGHT时，循环右移一次，返回指向循环移位后的链表头结点的指针。 
    【输入】
    输入若干个整数，以-1结尾，整数之间以空格间隔。
    【输出】
    第一行输出整数的和。
    第二行输出循环左移一次的结果，整数之间以空格间隔。最后一个整数后面没有空格。
    第三行输出循环右移一次的结果，整数之间以空格间隔。最后一个整数后面没有空格。
    【输入示例】
    1 3 5 2 -1
    【输出示例】
    11
    3 5 2 1
    1 3 5 2
    【提示】
    单向链表中结点结构的类型声明如下：
    struct node {
       int num;   /* 存放正整数 */
       struct node *next;
    };
    定义枚举类型DIR如下：
    enum DIR {LEFT, RIGHT};
    实现链表的循环移位，循环左移时，将链表的第一个结点删除，并将其插入到链表尾部；循环右移时，将链表的最后一个结点删除，并将其插入到链表头部。
    【来源】
    《程序设计基础——以C为例》第7章上机实验题4。



<br>


 
	# include <stdio.h>
	# include <stdlib.h>
	//这道题目学到的东西有点多。。。
	struct node
	{
	    int num;
	    struct node *next;
	};
	enum DIR {LEFT, RIGHT}; //这个枚举要定义在最前面，因为后面的函数需要用到它，不能定义在main中
	struct node *createList(void)
	{
	    struct node *head = NULL, *tail, *t; //head要初始化为NULL！不然后面会很难写
	    int num;
	    unsigned int size = sizeof(struct node);//结构体的sizeof可以直接这样弄，注意结构名node必须加！
	    scanf("%d", &num);
	    while (num > 0)
	    {
	        t = (struct node *)malloc(size); //动态分配得到内存并保存在t中
	        t->num = num;
	        t->next = NULL;   //一开始先当作是一个单元的链表
	        if (head == NULL)
	            head = t;//判断是否为空链表
	        else
	            tail->next = t;  //第一次之后，这里的tail是来使上一次的那个链表的next指向这一次的链表
	        tail = t; //tail就是当前的链表的指针，回到下一轮循环是代表的是上一轮链表的指针。
	        scanf("%d", &num);
	    }
	    return head;
	} //创建链表
	void printList(struct node *head)
	{
	    struct node *p = NULL;
	    int i = 0;
	    for (p = head; p != NULL; p = p->next)
	    {
	        if (i++)  //这里的i++这样使用是正确的，一开始仍然会是0，用来调整输出空格的
	            printf(" %d", p->num);
	        else
	            printf("%d", p->num);
	    }
	    printf("\n");
	}   //输出链表
	struct node *cyclicShift(struct node *head, enum DIR dir)
	{
	    struct node *p, *n; //注意这些指针的类型都必须是和链表的结构相同的结构类型
	    if (dir == LEFT)
	    {
	        n = head; //n用来保存头指针
	        head = head->next; //头指针指向下一个
	        p = head;
	        while (p->next != NULL)
	        {
	            p = p->next;
	        }   //找出最后一个链表，并保存在P中
	        n->next = NULL; //小心头指针尾部并不是NULL，先让它变成NULL，即变成尾指针
	        p->next = n; //在原先的最后一个链表p后面插入一个新链表n,即原来的头链表
	    }
	    else if (dir == RIGHT)  //枚举不用加任何符号如“”，照样能表示这么个枚举类型，并且可以进行关系判断
	    {
	        p = head;
	        while (p->next->next != NULL)
	        {
	            p = p->next;
	        } //找出倒数第二个指针
	        n = p->next; //用n保存最后个指针
	        p->next = NULL; //让倒数第二变成倒数第一
	        n->next = head;
	        head = n; //追加最后一个指针n到最前面，并且变成head。
	    }
	
	    return head;
	}  //循环移位
	int sum(struct node *head)
	{
	    int s = 0;
	    struct node *p = NULL;
	    for (p = head; p != NULL; p = p->next)
	    {
	        s += p->num;
	    }
	    return s;
	}   // 求和
	
	
	int main()
	{
	    struct node *head, *p = NULL;
	    head = createList();
	    int s;
	    s = sum(head);
	    printf("%d\n", s);
	    enum DIR dir;
	    head = cyclicShift(head, LEFT); //枚举类型作参数时，可以直接写入枚举的东西。不用加符号
	    //  head=cyclicShift(head,(enum DIR)0);  因为枚举中的元素本质就是数，只是类型变了，所以这样子强制类型转化仍然是可以得
	    //  head=cyclicShift(head,0)   但是这样用编译器还是可以，但是OJ上就不可以了，因为参数类型和函数定义不匹配
	    printList(head);
	    head = cyclicShift(head, RIGHT);
	    printList(head);
	    return 0;
	}