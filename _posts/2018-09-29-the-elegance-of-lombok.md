---
layout: post
title: "the elegance of lombok"
date: 2018-09-29
excerpt: "elegant java tool library"
tags: [Java, Tools, Elegance]
comments: true
---
### 简介

[lombok](https://projectlombok.org/)是一个很优雅的Java类库，使用它可以省掉JavaBean中冗余的getter(),setter()方法，减少大量的代码数量。它能做的还远不止于此，以下是lombok的官方介绍：
>  Project Lombok is a java library that automatically plugs into your editor and build tools, spicing up your java.
Never write another getter or equals method again. Early access to future java features such as val, and much more.

## 构建
lombok团队对现有主流的Java开发工具都提供了插件支持，直接通过maven，gradle或者直接引入jar包的方式到工程中直接使用会直接报编译错误。

### eclipse插件安装

- 下载[lombok安装包](https://projectlombok.org/downloads/lombok.jar)

- 安装

打开命令行

```
 java -jar [your lombok jar path]

```
在弹出的对话框中选择你打算安装该插件的IDE,然后install/update即可。

- 检查
  - eclipse目录（eclipse.ini同级目录）是否存在lombok.jar
  - eclipse.ini中是否存在
    ```
    -javaagent:lombok.jar
    -Xbootclasspath/a:lombok.jar
    ```




### intellij idea插件安装
直接通过File->Setting->Plugins直接搜索lombok安装即可。

## 使用

在工程中引入lombok工具包
```
<dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <version>1.16.18</version>
      <scope>provided</scope>
</dependency>
```
新建Java bean，在对应的字段上添加@Getter,@Setter注解，使用该Java bean的时候你会发现lombok已经在字段上对应的生成getter(),setter()了。
lombok提供的功能远远不止于此。

```
public class Domain {

    @Getter
    @Setter
    public int id;

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private int age;
}
```
## 注解介绍
 以下介绍几种比较常用的注解

- @Getter

  参数获取注解,修饰Java bean的字段。
```
  public class Clazz{

    @Getter
    public String name;

  }
```
  等同于
  ```
    public class Clazz{

      public String name;

      public String getName(){
        return this.name;
      }

    }
  ```


- @Setter

  参数设置注解,修饰Java bean的字段。
```
  public class Clazz{

    @Setter
    public String name;

  }
```
  等同于
  ```
    public class Clazz{

      public String name;

      public void setName(String name){
         this.name = name;
      }

    }
  ```


- @NotNull

    非空注解，可以修饰构造方法,普通方法，以及Java bean的字段属性。
    ```
    public class Clazz{

          @NotNull
          @Getter
          @Setter
          private String name;

          public void doSomeThing(@NotNull String arg){
              //do something
          }
    }
    ```
    等同于
    ```
    public class Clazz{

          private String name;

          public void setName(String name){
            if(null == name){
              throw new NullPointerException("name is marked @NonNull but is null");
            }
            this.name = name;
          }
          public String getName(){
            return this.name;
          }

          public void doSomeThing(String arg){
            if(null == arg){
              throw new NullPointerException("arg is marked @NonNull but is null");
            }
              //do something
          }
    }
    ```
- @Cleanup
    自动关闭资源连接，无需在finally块中手动close()，如果在使用的对象中不包含close()或是其他名称的关闭方法,例如org.eclipse.swt.widgets.CoolBar，是通过dispose()关闭的。
    那么可以使用@Cleanup("dispose")来指定。需要注意的是,@Cleanup不能操作带参数的关闭资源方法。
    ```
    public class Clazz {
      public static void main(String[] args) throws IOException {
        @Cleanup InputStream in = new FileInputStream(args[0]);
        @Cleanup OutputStream out = new FileOutputStream(args[1]);
        byte[] b = new byte[10000];
        while (true) {
          int r = in.read(b);
          if (r == -1) break;
          out.write(b, 0, r);
        }
      }
}
    ```


- @ToString
 为当前类生成toString()，如果不想把所有的字段都放入toString()里，可以通过@ToString(exclude = {"",""})过滤。

 ```
  @ToString(exclude={"id"})
  public class Clazz{
    public int id;
    private String name;
    private String address;
  }
 ```

- @EqualsAndHashCode
  生成equals()和hashCode()

- @NoArgsConstructor, @RequiredArgsConstructor,           @AllArgsConstructor
  生成无参，部分参数，全部参数的构造方法.

- @Log
  在类中添加log实体，通过对象实例名为log，可直接通过log.info(),log.error()使用。现支持大部分主流的日志框架。


- @Data
  等同于，@ToString+@EqualsAndHashCode+@RequiredArgsConstructor, 以及为所有非final修饰的字段添加getter(),setter()
