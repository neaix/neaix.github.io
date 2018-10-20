---
layout: post
title: "ArrayList源码分析(JDK1.8)"
date: 2018-10-18
excerpt: "ArrayList code source analysis"
tags: [Java, ArrayList,Code Source]
comments: true
---
## ArrayList简介
ArrayList在本质上就是一个动态数组，可以看成是对Array的封装or升级，与Array不用的是，它提供了动态添加、删除元素，动态设置容量并自动扩充等功能，且支持泛型。

![uml图](https://github.com/neaix/neaix.github.io/raw/master/assets/img/Arraylist.png)

```
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{}
```
- 通过继承AbstractList类,实现List接口得到添加、删除、修改、遍历等方法。
- 实现Cloneable接口，且覆盖了clone()，即能被克隆
- 实现Serializable接口，标示能被序列化
- 实现RandomAccess接口，标示可快速随机访问




## 源码分析

### 属性
```
    //序列化ID
    private static final long serialVersionUID = 8683452581122892189L;

    //默认初始化容量
    private static final int DEFAULT_CAPACITY = 10;

    //空数组
    private static final Object[] EMPTY_ELEMENTDATA = {};

    //空数组，使用默认构造函数，默认存储的数据
    private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};

    //对象存储数组,不能被序列化
    transient Object[] elementData;

    //集合（数组）大小
    private int size;


```

### 构造函数
JDK1.8中，ArrayList包含三个构造函数

- 无参构造

```
public ArrayList() {
        //对象存储数组默认为空数组
        this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
    }
```
- 有参构造

```
public ArrayList(int initialCapacity) {
        // 数组初始长度大于0，对象存储数组采取该长度
        if (initialCapacity > 0) {
            this.elementData = new Object[initialCapacity];
        }
        // 数组初始长度等于0，对象存储数组初始化为空数组
        else if (initialCapacity == 0) {
            this.elementData = EMPTY_ELEMENTDATA;
        }
        // 小于0抛出IllegalArgumentException
         else {
            throw new IllegalArgumentException("Illegal Capacity: "+
                                               initialCapacity);
        }
    }




// 可能会抛出NullPointerException,当参数c为null的时候
public ArrayList(Collection<? extends E> c) {

        // 将传入的集合转化为数组并赋值给ArrayList的对象存储数组
        elementData = c.toArray();

        // 同步修改size的大小，不为0且对象存储数组的类型不是Object[]时
        // 通过Arrays.copyOf()重新生成Object[]类型的数据存储对象

        if ((size = elementData.length) != 0) {

        // 需要注意的是，Collection.toArray()的返回值类型是Object[]
        // 但这个Object[]不一定能存放Object对象，例如：

        // List<String> list = Arrays.asList("1","2");
        // System.out.println(list.getClass());

        // print class java.util.Arrays$ArrayList

        // Object[] objects = list.toArray();
        // System.out.println(objects.getClass());

        // print class [Ljava.lang.String

        // objects[0] = new Object();
        // 这里会抛出ArrayStoreException

        // 具体可以参考jdk官方bug文档
        // https://bugs.java.com/bugdatabase/view_bug.do?bug_id=6260652
        // 所以当传入的Collection对象类型不是Object[]类型时，通过Arrays.copyOf()重新生成一个Object[]类型的elementData

            if (elementData.getClass() != Object[].class)
                elementData = Arrays.copyOf(elementData, size, Object[].class);
        } else {
            this.elementData = EMPTY_ELEMENTDATA;
        }
    }
```

### 方法


- add()

  ArrayList的两个添加方法不同的在于，第一个add(E e)直接添加在数组最后，add(int index,E element)根据index的值添加在数组的指定位置，下标在index之后的数据往后移动。在添加数据到数组前都会检测容量，首先检测当前数据存储数组是否为空，满足情况下数组初始长度为10，反之长度为取ArrayList的size+1,如果size+1的长度大于当前数据存储数组的长度，数据存储数组按1.5倍扩增，数据存储数组的默认最大长度为Integer.MAX_VALUE - 8,如果大于该长度，最大可扩张为Integer.MAX_VALUE。


  *ArrayList的默认初始长度为10*

  *长度每次扩张大小为1.5倍*

  *最大支持长度为Integer.MAX_VALUE*

```
public boolean add(E e) {
        //添加元素时，容量+1,确保数据能被正常存入
        ensureCapacityInternal(size + 1);
        elementData[size++] = e;
        return true;
    }

public void add(int index, E element) {
      // 检测index合法性，是否小于0或者大于ArrayList的当前大小
      // 如果是，抛出IndexOutOfBoundsException
       rangeCheckForAdd(index);
      //添加元素时，容量+1,确保数据能被正常存入
       ensureCapacityInternal(size + 1);
       //将index之后的元素全部往后移，然后将element放入下标为index的位置上，再将size+1
       System.arraycopy(elementData, index, elementData, index + 1,
                        size - index);
       elementData[index] = element;
       size++;
      }

//检测容量以及增长容量大小
private void ensureCapacityInternal(int minCapacity) {
       ensureExplicitCapacity(calculateCapacity(elementData, minCapacity));
   }

private static int calculateCapacity(Object[] elementData, int minCapacity) {
        //如果当前存储数据为空且比较送入的容量大小和默认的初始容量（长度为10），取最大值 ，否则采用送入的大小（size+1）
       if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
           return Math.max(DEFAULT_CAPACITY, minCapacity);
       }
       return minCapacity;
   }

private void ensureExplicitCapacity(int minCapacity) {
      //记录的修改次数加1
       modCount++;

       //如果当前ArrayList的size长度加1后大于当前存储对象数据长度，增长
       if (minCapacity - elementData.length > 0)
           grow(minCapacity);
   }

private void grow(int minCapacity) {

    //容量按当前容量的1.5倍增长
    //如果当前增长容量达到超过设置的MAX_ARRAY_SIZE(Integer的最大值-8)，当前容量取Integer的最大值
    //根据最新的容量生成新数据存储数组
    int oldCapacity = elementData.length;
    int newCapacity = oldCapacity + (oldCapacity >> 1);
    if (newCapacity - minCapacity < 0)
        newCapacity = minCapacity;
    if (newCapacity - MAX_ARRAY_SIZE > 0)
        newCapacity = hugeCapacity(minCapacity);
    elementData = Arrays.copyOf(elementData, newCapacity);
}

```

- addAll()

将一组Collection添加至ArrayList,两个重载方法，addAll(Collection<? extends E> c)添加一组数据至ArrayList末尾，addAll(int index,Collection<? extends E> c)添加一组数据至下标index所在的位置（占据index到index+c.size()的位置），不会覆盖index所在位置的对象，之后的数据往后移动。

```
public boolean addAll(Collection<? extends E> c) {
  //拿到需要存储的对象数组及其长度
     Object[] a = c.toArray();
     int numNew = a.length;
     //检测及增长容量
     ensureCapacityInternal(size + numNew);
     //添加对象至数据存储对象的末尾
     System.arraycopy(a, 0, elementData, size, numNew);
     size += numNew;
     return numNew != 0;
 }

public boolean addAll(int index, Collection<? extends E> c) {
  // 检测index合法性，是否大于size或者小于0，满足即抛出IndexOutOfBoundsException
     rangeCheckForAdd(index);
  // 拿到需要存储的对象数组及其长度
     Object[] a = c.toArray();
     int numNew = a.length;
  //检测及增长容量
     ensureCapacityInternal(size + numNew);
  //获取移动的长度
     int numMoved = size - index;
     if (numMoved > 0)
     //从index之后往后移动
         System.arraycopy(elementData, index, elementData, index + numNew,
                          numMoved);
      //将送入的一组数据放入index到index+该数据长度的位置
     System.arraycopy(a, 0, elementData, index, numNew);
     size += numNew;
     return numNew != 0;
 }
```

- set()

直接插入ArrayList中下标为index的位置，如果已存在该下标的数据，直接覆盖

```
public E set(int index, E element) {
  // 检测index合法性，是否小于当前长度,否则直接抛出IndexOutOfBoundsException
   rangeCheck(index);
   //直接插入数据
   E oldValue = elementData(index);
   elementData[index] = element;
   return oldValue;
}
```

- get()

```
public E get(int index) {
  // 检测index合法性，是否小于当前长度,否则直接抛出IndexOutOfBoundsException
      rangeCheck(index);
  // 直接读取index所在位置的数据，强转类型返回
      return elementData(index);
  }
```

- remove()

remove()也是两个重载方法，根据下标删除，根据Array的特性，找到下标所在位置，直接清除，速度快，根据对象删除，需要遍历，速度较慢。

```
public E remove(int index) {
  // 检测index合法性，是否小于当前长度,否则直接抛出IndexOutOfBoundsException
       rangeCheck(index);
       // 修改次数加1
       modCount++;
       E oldValue = elementData(index);
      // 获取移动的长度
       int numMoved = size - index - 1;
       if (numMoved > 0)
       // 将index之后的数据往前移动
           System.arraycopy(elementData, index+1, elementData, index,
                            numMoved);
        //将最后一位置为null,好让gc回收
       elementData[--size] = null; // clear to let GC do its work

       return oldValue;
   }

public boolean remove(Object o) {
  // 判断需要清除的对象是否为空，根据对象遍历数据存储数组得到对象下标
  // 根据下标删除，处理逻辑与remove(int index)一致
    if (o == null) {
        for (int index = 0; index < size; index++)
            if (elementData[index] == null) {
                fastRemove(index);
                return true;
            }
    } else {
        for (int index = 0; index < size; index++)
            if (o.equals(elementData[index])) {
                fastRemove(index);
                return true;
            }
    }
    return false;
}
```

- clear()

清空ArrayList的所有数据，当时数据存储对象数组长度不变，size清空。

```
public void clear() {
   //修改次数+1
    modCount++;

    for (int i = 0; i < size; i++)
    //置为null,以便gc回收
        elementData[i] = null;

    size = 0;
}
```

- subList()

获取ArrayList的送入的两个下标之间的数据，返回一个ArrayList的私有静态内部类SubList实例，SubList实例与ArrayList共享一个数组存储对象，在操作返回的SubList实例时，可以理解为操作两个下标之间的ArrayList数据。

```
public List<E> subList(int fromIndex, int toIndex) {
      //  检测送入下标合法性
       subListRangeCheck(fromIndex, toIndex, size);
       //送入ArrayList获取两个下标之间的数据
       return new SubList(this, 0, fromIndex, toIndex);
   }

```
- trimToSize()

清空ArrayList中为null的数据，可以让size跟数据存储数组长度一致。例如：ArrayList的size为3（存入了3条数据），但是数据存储数组elementData初始长度为10，那么就有7个是为null的数据，执行trimToSize()可以清除这7条为null的数据。

```
public void trimToSize() {
      modCount++;
      if (size < elementData.length) {
          elementData = (size == 0)
            ? EMPTY_ELEMENTDATA
            : Arrays.copyOf(elementData, size);
      }
  }
```

- contains()

根据送入的对象遍历查询ArrayList是否包含此对象。

```
public boolean contains(Object o) {
        return indexOf(o) >= 0;
    }

public int indexOf(Object o) {
  //遍历判断是否包含该对象
       if (o == null) {
           for (int i = 0; i < size; i++)
               if (elementData[i]==null)
                   return i;
       } else {
           for (int i = 0; i < size; i++)
               if (o.equals(elementData[i]))
                   return i;
       }
       return -1;
   }

```

- iterator()

获取迭代器,返回的是ArrayList的私有静态内部类实例Itr,Itr实现了Iterator接口,也是AbstractList.Itr的一个优化版本。

```
public Iterator<E> iterator() {
        return new Itr();
    }

    private class Itr implements Iterator<E> {
            // 元素索引
           int cursor;    
           // 最后一个元素返回的索引   
           int lastRet = -1;
           //修改次数
           int expectedModCount = modCount;

           Itr() {}
             //是否存在下一个元素
           public boolean hasNext() {
               return cursor != size;
           }

           @SuppressWarnings("unchecked")
           public E next() {
             // 检测迭代器遍历时，Arraylist是否发生修改
             // 如果有，抛出ConcurrentModificationException
               checkForComodification();
               // 记录下标
               int i = cursor;
               // 检测下标是否越界
               if (i >= size)
                   throw new NoSuchElementException();
               // 获取ArrayList的数据存储数组
               Object[] elementData = ArrayList.this.elementData;
               //检测下标是否越界
               if (i >= elementData.length)
                   throw new ConcurrentModificationException();
              //记录下一个元素的索引
               cursor = i + 1;
               //返回数据
               return (E) elementData[lastRet = i];
           }

           public void remove() {
             // 检测越界情况
               if (lastRet < 0)
                   throw new IllegalStateException();
             // 检测迭代器遍历时，Arraylist是否发生修改
             // 如果有，抛出ConcurrentModificationException
               checkForComodification();

               try {
                 // 清除当前下标的数据
                   ArrayList.this.remove(lastRet);
                   //由于cursor比lastRet大1，删除之后cursor往前移一位
                   cursor = lastRet;
                   //最后一个元素重置为-1
                   lastRet = -1;
                   //重新设置expectedModCount，避免越界
                   expectedModCount = modCount;
               } catch (IndexOutOfBoundsException ex) {
                   throw new ConcurrentModificationException();
               }
           }

          //将ArrayList的值取出赋给consumer
           @Override
           @SuppressWarnings("unchecked")
           public void forEachRemaining(Consumer<? super E> consumer) {
                // 检测非空
               Objects.requireNonNull(consumer);
               // 记录ArrayList大小，以及索引
               final int size = ArrayList.this.size;
               int i = cursor;
               // 索引越界，直接中断
               if (i >= size) {
                   return;
               }
               // 获取ArrayList对象存储数组
               final Object[] elementData = ArrayList.this.elementData;
               // 检测是否越界
               if (i >= elementData.length) {
                   throw new ConcurrentModificationException();
               }
               // 遍历存入数据
               while (i != size && modCount == expectedModCount) {
                   consumer.accept((E) elementData[i++]);
               }
               //记录当前下标
               cursor = i;
               //更新最后一位索引位置
               lastRet = i - 1;
               checkForComodification();
           }

          // 检测迭代器遍历时，Arraylist是否发生修改
          // 如果有，抛出ConcurrentModificationException
           final void checkForComodification() {
               if (modCount != expectedModCount)
                   throw new ConcurrentModificationException();
           }
       }
```

- listIterator()

返回的是ArrayList的私有静态内部类ListItr，也是AbstractList.ListItr的优化版本。与iterator()相比，listIterator()返回的可以双向移动，即可以往前、往后移动，且listIterator()返回的ListIterator实例有可以添加元素，listIterator()存在两个重载方法，listIterator(int index)可以操作index及其之后的元素，listIterator()中的index为0。

```
public ListIterator<E> listIterator(int index) {
      // 检测index的合法性
        if (index < 0 || index > size)
            throw new IndexOutOfBoundsException("Index: "+index);
      //返回ListItr实例
        return new ListItr(index);
    }


private class ListItr extends Itr implements ListIterator<E> {
  //构造函数中记录索引位置
    ListItr(int index) {
      super();
      cursor = index;
    }
    // 前面是否有元素
    public boolean hasPrevious() {
      return cursor != 0;
    }
    //下一个元素索引位置
    public int nextIndex() {
      return cursor;
    }
    //上一个元素索引位置
    public int previousIndex() {
      return cursor - 1;
    }

    @SuppressWarnings("unchecked")
    public E previous() {
      // 检测迭代器遍历时，Arraylist是否发生修改
      // 如果有，抛出ConcurrentModificationException
      checkForComodification();
      //记录上一个索引的位置
      int i = cursor - 1;
      //检测索引是否越界
      if (i < 0)
          throw new NoSuchElementException();
      //获取ArrayList当前存储的对象数组
      Object[] elementData = ArrayList.this.elementData;
      //检测索引是否越界
      if (i >= elementData.length)
          throw new ConcurrentModificationException();
      //返回上一个索引所处位置的数据，当前索引往前移动一位
      cursor = i;
      return (E) elementData[lastRet = i];
    }

    public void set(E e) {
      //检测索引是否越界
      if (lastRet < 0)
          throw new IllegalStateException();
      checkForComodification();

      try {
        //在当前索引处插入（替换）数据
          ArrayList.this.set(lastRet, e);
      } catch (IndexOutOfBoundsException ex) {
          throw new ConcurrentModificationException();
      }
    }

    public void add(E e) {
      // 检测迭代器遍历时，Arraylist是否发生修改
      // 如果有，抛出ConcurrentModificationException
      checkForComodification();

      try {
          // 记录当前索引
          int i = cursor;
          // 在索引后一位添加数据，之后的数据后移一位
          ArrayList.this.add(i, e);
          // 记录当前索引位置
          cursor = i + 1;
          // 重置最后一位索引
          lastRet = -1;
          expectedModCount = modCount;
      } catch (IndexOutOfBoundsException ex) {
          throw new ConcurrentModificationException();
      }
    }
}
```
