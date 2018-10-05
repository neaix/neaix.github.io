---
layout: post
title: "自己实现Stack"
date: 2018-10-02
excerpt: "self realization stack"
tags: [Java, Stack]
comments: true
---

## 栈实现
栈(Stack)，在JDK中定义是Vector的一个子类，遵循后进先出的原则，Stack跟Vector在对于锁的处理上比较粗暴（所有的加锁操作都是在方法上）。以下是自己实现的一个比较简单的Stack。
```
/**
 * @Author: Near
 * @Date: 2018/8/18 09:45
 * @Description: 栈实现
 */

public class Stack<T> {

    //默认容量大小为16
    private static final int DEFAULT_CAPACITY = 16;

    //对象存储数组
    private Object [] elements;

    //stack大小
    private int size = 0;

    /**
     * 初始化栈，并设置初始容量大小
     * @param capacity 容量
     */
    public Stack(int capacity){
        if(capacity <= 0){
            throw new IllegalArgumentException("capacity must gt 0");
        }
        elements = new Object[capacity];
    }

    /**
     *初始化栈，设置默认容量大小
     */
    public Stack(){
        this(DEFAULT_CAPACITY);
    }

    /**
     * 从顶部插入对象
     * @param o 存储对象
     * @return
     */
    public boolean push(T o){
        //检测容量是否满足
        ensureCapacity();
        synchronized (elements){
            elements[size++] = o;
        }
        return true;
    }

    /**
     * 移除栈顶部的对象，并将其返回
     * @return
     */
    public T pop(){
        synchronized (elements){
            T o = (T)elements[size--];
            elements[size] = null; //这里需要设置为null,否则JVM不会回收
            return o;
        }
    }

    /**
     * 返回栈大小
     * @return
     */
    public synchronized int size(){
            return size;
    }

    /**
     * 栈是否为空
     * @return
     */
    public boolean isEmpty(){
      return size == 0;
    }
    
    /**
     *容量增长，每次容量达到最大值，按2*设置容量+1扩充
     */
    private void ensureCapacity(){
        synchronized (this){
            if(size == elements.length){
                elements = Arrays.copyOf(elements,2 * size + 1);
            }
        }
    }
}

```
