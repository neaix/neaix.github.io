---
layout: post
title: "Hibernate环境折腾记录"
comments: true
share: true
tags: 笔记
---


Hibernate 的配置本身是很简单的，但是由于无论是网上还是书上的教程都太过杂乱，对于不同的IDE又有不同的做法，再加上本身对Java和Maven以及各种框架都不熟悉，所以对于我这样的新手来讲，配置好一个稳定便捷的环境着实不易。

我使用的是IDEA，本地的Mysql老是挂掉而且挂着还占内存(虽然我内存有8G但是不知为何一些只要到了6G内存基本上很多软件就要崩溃了)，所以我给它配了个远程的数据库。

简单讲讲我的折腾之路。

##1:目标：创建一个采用Maven管理且拥有了Hibernate,Spring MVC 环境的初始项目：

对于IDEA，一开始发现把Hibernate,Spring MVC,Web给勾选上再创建项目时，会默认失去Maven的勾选，后期再勾选Maven时，又会发现它似乎怎么都没有生效。这个我觉得应该是有方法解决的，但是我都还不熟悉。

我目前采取的方法是:

- 先创建一个Spring MVC(Web配置会自动勾选)的项目，这时默认是以Maven管理的
- 再在项目上右键添加框架支持，这时候再勾选Hibernate，并在右边两个勾选栏中都勾选
- 点ok后，会发现hibernate.cfg.xml已经生成在了src/目录下。

遇到的问题：

####问题1：

src/hibernate.cfg.xml 这样的结构会导致找不到hibernate.cfg.xml(这个问题别人似乎没遇到，我不清楚是否是因为我乱弄配置所导致的，但是目前来看的确如此)，我根据别人的demo，把hibernate.cfg.xml移动到了:src\main\webapp\WEB-INF\classes

这样就成功了。

后来我观察配置的文件HibernateTest.iml(HibernateTest是项目名)的时候，发现：

    <facet type="hibernate" name="Hibernate">
      <configuration>
        <datasource-map>
          <unit-entry name="hibernate.cfg.xml" value="2fca4c16-5bfb-4f74-9a09-fbefdb4b7e97" />
          <unit-entry name="src:main:webapp:WEB-INF:classes:hibernate.cfg.xml" />
        </datasource-map>
        <naming-strategy-map />
        <deploymentDescriptor name="hibernate.cfg.xml" url="file://$MODULE_DIR$/src/main/webapp/WEB-INF/classes/hibernate.cfg.xml" />
      </configuration>
    </facet>

这说明hibernate.cfg.xml的路径是在这里配置的，但是我修改这里的时候，无论怎么修改法，当把hibernate.cfg.xml放在src/后时，就是会报错。不过起码现在大概知道映射关系是怎么样的了，以后遇到同类问题至少能够多留意这个文件的问题。


问题2：

默认生成的Main类运行时，会提示hibernate.cfg.xml not Found。

这个大概和之前那个差不多的原因，由于我之前的项目比较混乱，所以以后还得留意下。



##2:目标：配置远程数据库，并自动创建好相关类

IDEA 右边有个Database，可以配置数据库，配置好后，如果贪图以后别的项目的方便，可以在数据库配置页右上角点击Scope选择IDE，这样就能全局设置了

配置好后，工作区左下角有一个Persistence(持久化)的选项，点击并在Hibernate上点击右键，选择Generate Persistence :By DataBase Schema,弹出如下配置图：

![](https://dn-joway.qbox.me/1448024122236_QQ%E6%88%AA%E5%9B%BE20151120205429.png)

注意勾选的地方要勾选，一开始没有勾选又爆出一堆错误。

点ok后会进行自动生成数据库事务类。

但是即便我们在IDE设置里能够连接上数据库，并不代表我们的代码能够知道这个数据库的密码。所以这里要单独配置好数据库的用户名和密码(数据库地址和端口IDE自动给配置好了)

hibernate.cfg.xml 的文件内容如下：


	<?xml version='1.0' encoding='utf-8'?>
	<!DOCTYPE hibernate-configuration PUBLIC
	        "-//Hibernate/Hibernate Configuration DTD//EN"
	        "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
	<hibernate-configuration>
	    <session-factory>
	        <property name="connection.url">jdbc:mysql://xxxmysqlxxx.com:3306</property>
	        <property name="connection.driver_class">com.mysql.jdbc.Driver</property>
	        <property name="hibernate.connection.username">yourusername</property>
	        <property name="hibernate.connection.password">yourpassword</property>
	        <mapping class="com.springapp.mvc.InfoEntity"/>
	        <!-- DB schema will be updated if needed -->
	        <!-- <property name="hbm2ddl.auto">update</property> -->
	    </session-factory>
	</hibernate-configuration>


这样代码就能连接到数据库了！


##3:目标: 在另外一个类中操作数据库

注意，一般会自动生成Main类如下：

	public class Main {
	    private static final SessionFactory ourSessionFactory;
	    private static final ServiceRegistry serviceRegistry;
	
	    static {
	        try {
	            Configuration configuration = new Configuration();
	            configuration.configure();
	
	            serviceRegistry = new ServiceRegistryBuilder().applySettings(configuration.getProperties()).buildServiceRegistry();
	            ourSessionFactory = configuration.buildSessionFactory(serviceRegistry);
	        } catch (Throwable ex) {
	            throw new ExceptionInInitializerError(ex);
	        }
	    }
	
	    public static Session getSession() throws HibernateException {
	        return ourSessionFactory.openSession();
	    }
	
	//    public static void main(final String[] args) throws Exception {
	//        final Session session = getSession();
	//        try {
	//            System.out.println("querying all the managed entities...");
	//            final Map metadataMap = session.getSessionFactory().getAllClassMetadata();
	//            for (Object key : metadataMap.keySet()) {
	//                final ClassMetadata classMetadata = (ClassMetadata) metadataMap.get(key);
	//                final String entityName = classMetadata.getEntityName();
	//                final Query query = session.createQuery("from " + entityName);
	//                System.out.println("executing: " + query.getQueryString());
	//                for (Object o : query.list()) {
	//                    System.out.println("  " + o);
	//                }
	//            }
	//        } finally {
	//            session.close();
	//        }
	//    }
	}


这里利用这个自动生成的类，并加以改造：

	public class DBConnection {
	    private static final SessionFactory ourSessionFactory;
	    private static final ServiceRegistry serviceRegistry;
	
	    static {
	        try {
	            Configuration configuration = new Configuration();
	            configuration.configure();
	
	            serviceRegistry = new ServiceRegistryBuilder().applySettings(configuration.getProperties()).buildServiceRegistry();
	            ourSessionFactory = configuration.buildSessionFactory(serviceRegistry);
	        } catch (Throwable ex) {
	            throw new ExceptionInInitializerError(ex);
	        }
	    }
	
	    public static Session getSession() throws HibernateException {
	        return ourSessionFactory.openSession();
	    }
	
	}

其实就是把Static main 函数给删掉了，并且改了个名字

然后：

在别的类中要操作数据库的时候，使用：

        // 创建Session
        Session sess = DBConnection.getSession();
        // 开始事务
        Transaction tx = sess.beginTransaction();
        // 创建消息对象
        InfoEntity n = new InfoEntity();
        // 设置消息标题和消息内容
        n.setName("001");
        // 保存消息
        sess.save(n);
        // 提交事务
        tx.commit();
        // 关闭Session
        sess.close();

这样一系列操作就是一个完整的数据库操作流程。

注意，InfoEntity是自动生成的，如下：

	@Entity
	@Table(name = "info", schema = "", catalog = "qdm11447512_db")
	public class InfoEntity {
	    private String name;
	    private int id;
	
	    @Basic
	    @Column(name = "name", nullable = true, insertable = true, updatable = true, length = 100)
	    public String getName() {
	        return name;
	    }
	
	    public void setName(String name) {
	        this.name = name;
	    }
	
	    @Id
    	@GeneratedValue(strategy = GenerationType.IDENTITY)//这个不会自动生成，需要手动添加这个主键生成策略
	    @Column(name = "id", nullable = false, insertable = true, updatable = true)
	    public int getId() {
	        return id;
	    }
	
	    public void setId(int id) {
	        this.id = id;
	    }
	
	    @Override
	    public boolean equals(Object o) {
	        if (this == o) return true;
	        if (o == null || getClass() != o.getClass()) return false;
	
	        InfoEntity that = (InfoEntity) o;
	
	        if (id != that.id) return false;
	        if (name != null ? !name.equals(that.name) : that.name != null) return false;
	
	        return true;
	    }
	
	    @Override
	    public int hashCode() {
	        int result = name != null ? name.hashCode() : 0;
	        result = 31 * result + id;
	        return result;
	    }
	}

即使有InfoEntity.setId()这个函数，也不应该在操作数据库的时候手动去设置，因为它是自增长的，你不能够确定该设成什么，所以不要去设置。


---


这样，最折腾的基本配置部分就弄好了，再根据文档就能随心所欲的操作数据库了。