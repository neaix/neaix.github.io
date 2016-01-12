---
layout: post
title: "Hibernate的基本用法"
comments: true
share: true
tags: 笔记
---

##基础操作：

###基本的操作模板:

**DBConnection** 类，用来建立基础的数据库连接。默认数据库配置文档为：hibernate.cfg.xml ，路径在项目名称.iml中设定。

假如要使用另外的数据库配置文件来连接数据库，则在下面调用：

> configuration.configure("/xxx/xxx.xml");



	public class DBConnection {
	    private static final SessionFactory ourSessionFactory;
	    private static final ServiceRegistry serviceRegistry;
	
	    static {
	        try {
				// 不带参数的configure()方法默认加载hibernate.cfg.xml文件，
				// 如果传入abc.xml作为参数，则不再加载hibernate.cfg.xml，改为加载abc.xml
	            Configuration configuration = new Configuration();
	            configuration.configure();
	
	            serviceRegistry = new ServiceRegistryBuilder().applySettings(configuration.getProperties()).buildServiceRegistry();

				// 以Configuration实例创建SessionFactory实例
	            ourSessionFactory = configuration.buildSessionFactory(serviceRegistry);
	        } catch (Throwable ex) {
	            throw new ExceptionInInitializerError(ex);
	        }
	    }
	
	    public static Session getSession() throws HibernateException {
	        return ourSessionFactory.openSession();
	    }
	}

这样，每次想要开启一个新的Session就只要调用DBConnection类的静态函数getSession()就行了:

    // 创建Session
    Session sess = DBConnection.getSession();
    // 开始事务
    Transaction tx = sess.beginTransaction();

	//do something

    // 提交事务
    tx.commit();
    // 关闭Session
    sess.close();

上面就是一个基本的数据库操作模板

接下来所有操作都是do something 的部分，不再写模板的内容。

###保存对象

	// 创建对象
	News n = new News();
	//设置值
	n.setTitle("Title");
	n.setContent("Content");
	// 保存对象
	//save()方法会返回该持久化对象的标志属性值(即主键值)
	sess.save(n);

###获取对象

有两种方法:

####get()方法

	Integer id = 1;
	News news = (News) sess.get(News.class, id);

特点:

- 立即访问数据库
- 若没有该匹配，返回null

####load()方法

	Integer id = 1;
    News news = (News) sess.load(News.class, id);

特点:

- 如果在持久化注解中指定了延迟加载，则会执行延迟加载，load()方法返回一个未初始化的代理对象，此时并没有加载数据记录，直到调用该对象的某方法时才会去访问数据库真正加载进来。
- 若没有该匹配，则抛出HibernateException异常

###修改对象

注意:通过get()或者load()方法得到的对象就是一个持久化的对象，对其进行set操作就会改变数据库中的对象，前提是改变后要正常保存。

一般可用session.flush();来保存当前已做的修改。

如：

	Integer id = 1;
	News news = (News) sess.get(News.class, id);
	news.setTitle("new title");
	sess.flush();

###更新脱管对象


脱管对象：一个曾经持久化但现在已经脱离了Session管理的持久化对象。

	Integer id = 1;
	News news = (News) sess.get(News.class, id);
	sess.close();
	new.setTitle("new title");
	
	//打开第二个session
	Session session = DBConnection.getSession();
	session.update(news);

如果不清楚对象是否曾经持久化过，可使用updateOrSave()方法，该方法自动判断对象是否持久化过从而选择相应的方法。


###删除对象

	Integer id = 1;
	News news = (News) sess.get(News.class, id);

	sess.delete(news);


---
####  参考资料：  ####
- 
