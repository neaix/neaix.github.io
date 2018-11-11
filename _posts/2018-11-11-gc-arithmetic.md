---
layout: post
title: "浅谈GC回收算法"
date: 2018-11-11
excerpt: "GC Arithmetic"
tags: [Java, JVM, GC, Arithmetic]
comments: true
---

Java区别与其他编译语言除了跨平台以外，对象的内存释放、清除是通过GC实现，无需程序员在编码阶段处理。

## 对象是否死亡

GC在回收对象之前，首先要确定哪些对象已经死亡，一般收集器都通过以下两种算法实现的。

### 引用计数算法

初始化对象时，给对象添加一个引用计数器，当一个地方引用该对象时，计数器+1，当引用失效后-1，计数器为0标示着该对象没有被使用了（可以回收）。但是引用计数算法存在一个缺陷，就是无法解决对象相互引用的问题。

```
    public class ReferenceCountGC{
      public Object instance;
      public static void doGC(){
        ReferenceCountGC obj1 = new ReferenceCountGC();
        ReferenceCountGC obj2 = new ReferenceCountGC();
        obj1.instance = obj2;
        obj2.instance = obj1;
        obj1 = null;
        obj2 = null;
      }
    }

```

以上代码中obj1,obj2除了相互引用以外已经没有其他引用，并且已经不能正常被使用了。如果使用引用计数算法，以上两个对象将不能被回收（即使已经无法再使用）。

### 可达性分析算法
 通过一系列被成为被称为“GC Roots”的对象作为起点，从这些节点开始往下搜素，当一个对象跟“GC Roots”节点没有任何引用链的话，则标记这些对象是不可用的。但不会立马被回收，一个对象从创建到死亡至少要经历两次标记过程。

 *obj1-obj4被判定为存活对象，obj5-obj6被判断为不可用*

 ![GC-Roots](https://github.com/neaix/neaix.github.io/raw/master/assets/img/gc-root.png)



 ## 如何回收

 对于已经判定为死亡的对象，如何高效的回收，一般由以下几种算法实现。

 ### 标记-清除算法

 标记-清除算法如果它的名字，分为标记、清除两个阶段，首先，标记已经死亡的对象，再标记完成后统一回收。该算法存在两个弊端，一是效率不高，标记清除两个阶段效率都不是很高，二是标记清除后容易产生大量的不连续的内存碎片，如果程序再运行过程中需要为一个对象分配较大内存时，无法找到足够的连续内存而不得不提前触发另一次回收动作。

*黑色：可回收*     

*蓝色：存活对象*    

*白色：未使用*

- 回收前

 ![回收前](https://github.com/neaix/neaix.github.io/raw/master/assets/img/bq-1.png)

- 回收后

 ![回收后](https://github.com/neaix/neaix.github.io/raw/master/assets/img/bq-2.png)



 ### 复制算法

将分配的内存分为大小相同的两块，每次只使用其中的一块，当被使用的内存块容量用完的时候，把存活的对象复制另一个内存块上，然后把使用过的内存空间一次清理掉。在这种情况下，就不用考虑内存碎片化的问题，但是每次都只使用分配的一半内存，另一半处于闲置状态，代价很高。

*黑色：已标记*

*蓝色：存活对象*

*白色：未使用*

- 回收前
[回收前](https://github.com/neaix/neaix.github.io/raw/master/assets/img/copy-1.png)

- 回收后

![回收后](https://github.com/neaix/neaix.github.io/raw/master/assets/img/copy-2.png)


### 标记-整理算法

基于老年代对象（存活时间比较久的对象）的特点，标记过程仍然与“标记-清除算法”一样，后续步骤不是清除对象，而是让所有存活对象向同一端移动，之后直接清理边界意外的内存。

*黑色：已标记*

*蓝色：存活对象*

*白色：未使用*


- 回收前
[回收前](https://github.com/neaix/neaix.github.io/raw/master/assets/img/bj-copy-1.png)

- 回收后

![回收后](https://github.com/neaix/neaix.github.io/raw/master/assets/img/bj-copy-2.png)
