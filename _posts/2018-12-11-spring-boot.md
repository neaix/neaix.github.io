---
layout: post
title: "Spring Boot学习笔记"
date: 2018-12-11
excerpt: "note on Spring Boot"
tags: [Java, Spring Boot]
comments: true
---

### 环境
机器： MacBook Pro(Mojave)

JDK:1.8.0_181-b13

Maven:3.25

Spring Boot:2.1.1


### 简介

Spring Boot是由Pivotal团队开发的Spring框架，采用约定大于配置的观点，致力于快速开发，简化配置。提供的自动装配和起步依赖使开发者不需要维护大量的xml配置，提供的监控组件同时也为项目的运维提供了极大便利。以下是Spring Boot的官方介绍。

>Spring Boot makes it easy to create stand-alone, production-grade Spring based
    Applications that you can "just run".

>    We take an opinionated view of the Spring platform and third-party libraries so
    you can get started with minimum fuss. Most Spring Boot applications need very
    little Spring configuration.


### 工程构建

Spring官方提供了[Spring Initializr](https://start.spring.io)可以快速构建Spring Boot工程，开发者可以通过maven or Gradle创建自己的项目，支持Java、Kotlin、Groovy等基于JVM的语言，并且可以选择项目需要依赖的外部组件，例如：Lombok、JPA、Web、数据库驱动包等。现有的IDE包括IntelliJ idea、VS Code都已经支持通过Spring Initializr快速构建Spring Boot工程。

#### 官方构建工具构建


1.  访问[Spring Initializr](https://start.spring.io)
2.  选择项目管理工具（Maven、Gradle）
3.  选择开发语言（Java、Kotlin、Groovy）
4.  选择Spring Boot版本号
5.  填写项目的机构标示
6.  选择项目需要依赖的第三方组件
7.  Generate Project
8.  将download下来的压缩包解压导入IDE


#### 通过IntelliJ idea构建
IntelliJ idea构建Spring Boot比较简单，可以基于Spring Initializr或其他的构建源。
File->new->project->左边菜单栏选择Spring Initializr，选择JDK版本，操作步骤几乎与官方一致。


#### Hello World
在IDE中找到刚导入的工程中名为Application结尾的Java文件，这个类是SpringBoot工程的启动的主类，一般通过Spring Initializr创建主类的名字一般是构建工程时填写的“Artifact”的值+Application.


1.  修改主类然后运行main方法

```
//标示该类是一个控制器
@RestController
//标示该类是Spring Boot的启动类
@SpringBootApplication
public class CoreApplication {
    //url映射
    @RequestMapping("/hello")
    public String sayHello(){
        return "Hello World";
    }

	public static void main(String[] args) {
		SpringApplication.run(CoreApplication.class, args);
	}

}

```

2.  运行该类的main方法或者通过maven打成jar包，然后通过jar包启动
```
  java -jar [your jar]
```

3. 浏览器输入:http://127.0.0.1:8080/hello



### 配置文件分析
Spring Boot采用约定大于配置的做法，使开发者不需要添加过多的配置就能让程序正常运行。但是在实际项目开发中，少量的配置文件是不可避免的，例如：数据库连接、多环境配置、系统配置、外部程序的访问地址等等。

#### Spring Boot pom文件

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		 xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
<modelVersion>4.0.0</modelVersion>
<parent>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-parent</artifactId>
	<version>2.1.1.RELEASE</version>
	<relativePath/> <!-- lookup parent from repository -->
</parent>
<groupId>com.demo</groupId>
<artifactId>core</artifactId>
<version>0.0.1-SNAPSHOT</version>
<name>core</name>
<description>Demo project for Spring Boot</description>

<properties>
	<java.version>1.8</java.version>
</properties>

<dependencies>
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-web</artifactId>
	</dependency>


	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-test</artifactId>
		<scope>test</scope>
	</dependency>
</dependencies>

<build>
	<plugins>
		<plugin>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-maven-plugin</artifactId>
		</plugin>
	</plugins>
</build>

</project>


```

- *spring-boot-starter-parent* 指定当前Spring Boot的版本为 *2.1.1.RELEASE*,parent中指定了Spring Boot的一些基础依赖包，以及加载Spring Boot配置文件的位置。

- *spring-boot-starter-web* 指定全栈web开发模块，包含嵌入Tomcat,Spring Web模块以及Spring MVC。

- *spring-boot-starter-test* 通用测试模块，包含Junit,Hamcrest,Mockito。

类似于*spring-boot-starter-web*这种模块引用在Spring Boot生态链中被称为Starter POMS,轻量级的依赖包，一站式解决方案，解决整合项目时各种jar包导入引用以及版本冲突的问题，例如：期望当前工程具有Web能力，导入*spring-boot-starter-web*，访问数据库可以使用*spring-boot-starter-jdbc*,安全模块可引入*spring-boot-starter-security*等等。

通过查看*spring-boot-starter-parent*的pom文件发现，Spring Boot支持的项目配置文件是位于根目录下以application开头的文件，支持的格式包含两种,properties,以及yml(yml,yaml其实是一种，[yaml.org](https://yaml.org))推荐使用yaml)。



```
<!--spring-boot-starter-parent.pom文件片段-->
<resources>
           <resource>
               <filtering>true</filtering>
               <directory>${basedir}/src/main/resources</directory>
               <includes>
                   <include>**/application*.yml</include>
                   <include>**/application*.yaml</include>
                   <include>**/application*.properties</include>
               </includes>
           </resource>
           <resource>
               <directory>${basedir}/src/main/resources</directory>
               <excludes>
                   <exclude>**/application*.yml</exclude>
                   <exclude>**/application*.yaml</exclude>
                   <exclude>**/application*.properties</exclude>
               </excludes>
           </resource>
       </resources>

```

#### application配置
Spring Boot是在工程的/src/main/resources下加载名字为application开的配置，支持yaml和properties。


###### 读取配置文件

- 在/src/main/resources添加application.yaml

```
app:
  name: demo
  version: 1.0
```

-  新建Config类


```
@Component
public class Config {

    @Getter
    @Setter
    @Value("${app.name}")
    private String name;

    @Getter
    @Setter
    @Value("${app.version}")
    private String version;
}

```
  *@Component* 标示这个一个Spring的Bean组件

  *@Getter* *Setter* 是Lombok组件提供省略getter,setter方法的，可参考[Lombok-优雅的Java类库](https://neaix.life/the-elegance-of-lombok/),(可在通过Spring Initializr构建项目的时候选择Lombok，或者手动添加Lombok依赖)。

  *@Value* Spring提供的值映射注解

- 建立Controller类读取

```
@RestController
public class IndexController {


    @Autowired
    private Config config;

    @RequestMapping("/info")
    public Map<String,String> appInfo(){
        Map<String,String> appInfo = new HashMap();
        appInfo.put("name",config.getName());
        appInfo.put("version",config.getVersion());
        return appInfo;
    }

}
```
运行程序，通过浏览器访问[your ip]:[port]/info

```
{"name":"demo","version":"1.0"}
```

#### 多环境配置
实际开发中，针对程序运行每个环境对应的端口号，数据库连接等都会不同，每次在上线改动配置文件确实过于麻烦，容易出错且不利于自动部署，Spring Boot的多环境切换的功能提供了很大的便利，在Spring Boot的规范中,多环境配置文件的命名规则为*application-{profile}.properties*或者*application-{profile}.yaml | yml，{profile}对应环境标示。

- application-dev.yaml 开发环境
- application-test.yaml 测试环境
- application-prod.yaml 生产环境

具体加载那个文件，可以在application.yaml文件中指定。
```
spring:
  profile:
    active: dev
```
*active* 的value对应application-{profile}.yaml中的{profile}，除此之外，我们通过jar包启动Spring Boot工程时可以通过启动参数来指定。

```
  java -jar [your jar] --spring.profile.active={profile}
```

#### 配置加载顺序

*数值越小优先级越高*

1. 命令行参数
2. SPRING_APPLICATION_JSON的属性（系统环境变量中JSON格式的Spring配置）
3. 从 *java:comp/env* 得到的JNDI属性
4. 通过System.getProerties()获取的属性
5. 操作系统的环境变量
6. 通过random.*配置的随机变量
7. 当前程序的jar包之外，application-{profile}.yaml或者application-{profile}.properties文件
8. 当前程序的jar包之内，application-{profile}.yaml或者application-{profile}.properties文件
9. 当前程序的jar包之外的application.yaml或者application.properties
10. 当前程序的jar包之内的application.yaml或者application.properties
11. 在@Configuration注解中修改的类，通过@PropertySource注解定义的属性
12. SpringApplication.setDefaultProperties定义的配置






### DB
数据库：postgreSQL 10.5

ORM框架：Mybatis 3.5.0（通过注解）

- 添加pom依赖

```
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.0.0</version>
  </dependency>
	<dependency>
		<groupId>org.postgresql</groupId>
		<artifactId>postgresql</artifactId>
		<version>42.2.5</version>
	</dependency>
```
- 添加数据库表

```
create table t_user(
	id serial primary key,
	user_name varchar(200) not null,
	password varchar(200) not null,
	nick_name varchar(200) not null
)
```

- application.yaml修改


```
mybatis:
# 实体类所在目录
  type-type-aliases-package: com.near.entity

spring:
  datasource:
    driver-class-name: org.postgresql.Driver
    url: jdbc:postgresql://127.0.0.1:5432/postgres
    username: postgres
    password: postgres
```


- 添加实体类和mapper类

```
public class User {

    @Getter
    @Setter
    private long id;

    @Getter
    @Setter
    private String username;

    @Getter
    @Setter
    private String password;

    @Getter
    @Setter
    private String nickname;

}
```

```
@Mapper
public interface UserMapper {


    @Select("select  * from t_user")
    @Results({
            @Result(property = "id",column = "id",javaType = Long.class),
            @Result(property = "username",column = "user_name",javaType = String.class),
            @Result(property = "nickname",column = "nick_name",javaType = String.class)
    })
    List<User> getAll();

    @Insert("insert into t_user(user_name,password,nick_name) values(#{username},#{password},#{nickname})")
    void insert(User user);

    @Select("select * from t_user where id =#{id}")
    @Results({
            @Result(property = "id",column = "id",javaType = Long.class),
            @Result(property = "username",column = "user_name",javaType = String.class),
            @Result(property = "nickname",column = "nick_name",javaType = String.class)
    })
    void selectOne(long id);

    @Delete("delete from t_user where id = #{id}")
    void romove(long id);



}
```

- 添加controller类

```
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserMapper userMapper;

    @RequestMapping("/queryAll")
    public List<User> queryAll(){
        List<User> list =  userMapper.getAll();
        return list;
    }

    @RequestMapping("/add")
    public String insert(User user){
        userMapper.insert(user);
        return "success";
    }

    @RequestMapping("/delete/{id}")
    public String delete(@PathVariable("id") long id){
        userMapper.romove(id);
        return "success";
    }

}

```

启动后可通过idea 自带的rest测试工具或者postman测试访问。
