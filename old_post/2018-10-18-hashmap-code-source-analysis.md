---
layout: post
title: "HashMap源码分析(JDK1.8)"
date: 2018-10-18
excerpt: "HashMap code source analysis"
tags: [Java, HashMap,Code Source]
comments: true
---
## HashMap简介
HashMap是基于Hash表的Map实现，以key-value的方式存储数据，可以使用null作为key和value，键唯一，无序，非线程安全。

![uml图](https://github.com/neaix/neaix.github.io/raw/master/assets/img/hashmap-uml.png)

```
public class HashMap<K,V> extends AbstractMap<K,V>
    implements Map<K,V>, Cloneable, Serializable {

    }
```
通过继承AbstractMap类,实现Map接口得到添加、删除、遍历等方法。
- 实现Cloneable接口，且覆盖了clone()，即能被克隆
- 实现Serializable接口，标示能被序列化


## 源码分析

### 属性

```
    // 默认初始化容量 16
    static final int DEFAULT_INITIAL_CAPACITY = 1 << 4;

    // 最大容量 1073741824
    static final int MAXIMUM_CAPACITY = 1 << 30;

    //默认加载因子
    static final float DEFAULT_LOAD_FACTOR = 0.75f;

    //链表转红黑树的阙值
    static final int TREEIFY_THRESHOLD = 8;

    //红黑树转链表的阙值
    static final int UNTREEIFY_THRESHOLD = 6;

    //最小树形化Hash表容量
    static final int MIN_TREEIFY_CAPACITY = 64;

    //元素存储的数组
    transient Node<K,V>[] table;

    transient int size;

    transient int modCount;


    int threshold;

    final float loadFactor;
```
