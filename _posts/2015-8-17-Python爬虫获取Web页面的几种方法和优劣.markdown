---
layout: post
title: "Python爬虫获取Web页面的几种方法和优劣"
comments: true
share: true
tags: Python
---


Python爬虫很关键的一点是在于如何解析获取到的页面数据。对页面解析的考虑点有如下：

- 程序是否高效(性能成本)
- 对不同类型界面是否需要人工定制规则(人力成本)
- 最后得到的数据是否干净

这里有四种解析模式：

## 1. xpath / css选择器 / 正则表达式 ##

设定需要抽取元素的 xpath、 css选择器 或 正则表达式 进行定位提取的方法（这里需要指出的是，html 并不是正则的，正则表达式可能在部分简单提取时有效，但**不要用正则表达式进行页面提取**）。

其根本思想是**提供一种定位元素的规则进行页面抽取**。

但是这种做法的缺点是：

- 通用性不足
- 区分度不够，选取到不需要的内容。这在大批量抽取时需要大量的高级人力去配置，即使是熟练工也需要5-10分钟配置一个页面（6-8个属性），需要耗费大量精力。


## 2. data highlighter ##

示例: [http://googlewebmastercentral.blogspot.com/2012/12/introducing-data-highlighter-for-event.html](http://googlewebmastercentral.blogspot.com/2012/12/introducing-data-highlighter-for-event.html)

Data Highlighter 的标注方式是：

给一系列相似的页面，让用户标出（高亮）每个属性在页面中的位置。通过多个页面的标注信息，寻找每个属性的特征。当然了，这个特征可以是 xpath，也可以是上下文，也有可能是机器学习的特征向量。

Data Hightlighter 通过高亮 多个页面中相同属性 进行规则学习，省去了人为设置规则时的学习成本。实践表明，在单一页面模板下，标记2个页面就足以生成规则了。效率远大于手工设置规则。

Google Data Highlighter 甚至对文字进行了切分，能在 英语 / 汉语普通话 / 粤语 xpath 相同的情况下，分别选出三种语言。是我目前见过的成熟度最高、通用性最好、最简便的数据抽取方式。

(谷歌的站长工具里提供了给自己网站结构化标注的工具，用的就是Highlighter)


## 3. micro-data ##

示例: [http://microformats.org/](http://microformats.org/) 以及各大网站

页面属性标记，通过在页面数据元素上增加属性标识，通过开放的标准格式，为数据提取提供便利，例如这是豆瓣的评论数据：

	< p class="rating_self clearfix" typeof="v:Rating">
	  <span class="ll bigstar35"></span>
	  <strong class="ll rating_num" property="v:average">6.7</strong>
	  <span property="v:best" content="10.0"></span>
	</p>

typeof="v:Rating" 表明这里是 rating 数据，v:best 表明 rating 的最大值。通过开放的 data format 标准，只按照标准抽取，就能得到包含的结构化数据。但是，需要站长的支持，在页面中加入标记才可以。

## 4. 模板生成与提取 ##

页面模板（wrapper）抽取是基于这样一个假设：结构化页面都是 通过模板 将数据库中的数据 映射成页面的。通过页面分析，得到页面模板，通过模板提取出实际的结构化数据。

PS：Jekyll 以及很多博客系统都是使用页面模板的！

例如，将多个相似页面放在一起比对(使用比较工具)，寻找等位节点（具有相同结构或表示相同数据类型的元素），将 DOM 树合并。通过比较不同页面上的同类节点，能够获知页面中哪部分是变化的，哪部分是不变的。变化的部分为数据，不变部分为模板。

---

##两个核心问题##

总结起来，以上四种解析模式都在尝试解决以下两个问题：

#### 1. 一个元素在说什么  ####

- 在 “xpath / css选择器 / 正则表达式” 的解析模式中，这个工作正是人肉去完成的，人去解读这个页面，找到信息所在元素。

- 而在 “data highlighter” 的解析模式中，也需要人在多个页面中进行标注，告诉机器每个属性所在。

- micro-data 通过开放的格式约定，通过 property 这一个特殊的属性标记告诉计算机一个元素说的是什么。

- 而模板挖掘通过：xpath，元素class，id属性，上下文等特征去挖掘元素的含义。



####  2. 这个元素和其他的元素有什么区别  ####

- 在 “xpath / css选择器 / 正则表达式” 的解析模式中，xpath、css选择器、正则表达式正是对要抽取元素的描述。选取一个正确的表达式，即涵盖不同页面，又和其他属性有所区分，是一件需要经验和技巧的工作。

- 而 “data highlighter” 将这个工作交给了计算机。“模板生成和套用” 过程中也由计算机分析出了规则。

- 而对于 “micro-data” 来说，这个问题有些特殊。通过开放的标准格式，程序已经能够了解每个元素在说什么了，那么定位就不再有意义。但是反过来，这又何尝不是一种定位。

## 结构化解析 ##

结构化解析实质是计算机对一个页面的理解，无论这种理解是人去创建规则、做出某种约定 还是 机器学习。

上面列举的四种解析方式，“xpath / css选择器 / 正则表达式” 和 “data highlighter” 回答了这个元素和其他的有什么区别。 “micro-data” 利用了一个元素在说什么。而 “模板生成与提取” 同时涉及元素说什么，它在哪。



---
####  参考资料：  ####
- [http://blog.binux.me/2014/07/how-to-extract-data-from-web/](http://blog.binux.me/2014/07/how-to-extract-data-from-web/)
