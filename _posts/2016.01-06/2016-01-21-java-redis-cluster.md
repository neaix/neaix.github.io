---
layout: post
title: 使用jedis搭建redis集群服务
date: 2016-01-21 14:41:00
category: Java
tags: Redis
---

Jedis是Redis官方推荐使用Java客户端开发包,当前项目也采用了Jedis,在此做个笔记.

Redis安装不做赘述.

下载[Jedis包](http://central.maven.org/maven2/redis/clients/jedis/2.8.0/jedis-2.8.0.jar)  

or maven

	<dependency>
		<groupId>redis.clients</groupId>
		<artifactId>jedis</artifactId>
		<version>2.8.0</version>
	</dependency>


redis.properties


    #集群地址
	redis.cluster.hosts=172.25.5.200:8001;172.25.5.201:8001;172.25.5.202:8001;172.25.5.202:8001;172.25.5.204:8001;172.25.5.205:8001;172.25.5.205:8001;
	
	#最大连接数  
	redis.maxIdle=20
	#最大分配的对象数   
	redis.maxTotal=50
	#等待时间
	redis.maxWaitMillis=2000
	#超时时间
	redis.timeout=6000
	
	#多长时间检查一次连接池中空闲的连接
	redis.timeBetweenEvictionRunsMillis=6000
	#空闲连接多长时间后会被收回
	redis.minEvictableIdleTimeMillis=5000
	#当调用borrow Object方法时，是否进行有效性检查  
	redis.testOnBorrow=true
	####是否开启Redis服务应用
	redis.unlock=false


RedisClusterDao

	package com.neaix.common.base.dao;
	
	import java.util.HashSet;
	import java.util.ResourceBundle;
	import java.util.Set;
	
	import redis.clients.jedis.HostAndPort;
	import redis.clients.jedis.JedisCluster;
	import redis.clients.jedis.JedisPoolConfig;
	
	/**
	 * @author neaix
	 * @Date 2015年10月18日
	 * 
	 */
	public class RedisClusterDao {
	
	    public static JedisCluster jc;
	
	    static {
	
	        init();
	    }
	
	    private static void init() {
	        ResourceBundle bundle = ResourceBundle.getBundle("redis");
	        if (null == bundle) {
	            throw new IllegalArgumentException("redis.properties not found.");
	        }
	        // 拿到集群服务器地址
	        String clusterHosts = bundle.getString("redis.cluster.hosts");
	        String[] hosts = clusterHosts.split(";");
	        Set<HostAndPort> jedisNodes = new HashSet<HostAndPort>();
	        for (String host : hosts) {
	            if (!(null == host && "".equals(host))) {
	                String[] hp = host.split(":");
	                jedisNodes.add(new HostAndPort(hp[0], Integer.valueOf(hp[1])));
	            }
	        }
	
	        JedisPoolConfig conf = new JedisPoolConfig();
	        conf.setMaxIdle(Integer.valueOf(bundle.getString("redis.maxTotal")));
	        conf.setMaxIdle(Integer.valueOf(bundle.getString("redis.maxIdle")));
	        conf.setMaxWaitMillis(Integer.valueOf(bundle.getString("redis.maxWaitMillis")));
	        conf.setTestOnBorrow(Boolean.valueOf(bundle.getString("redis.testOnBorrow")));
	        conf.setTimeBetweenEvictionRunsMillis(Long.valueOf(bundle.getString("redis.timeBetweenEvictionRunsMillis")));
	        jc = new JedisCluster(jedisNodes, Integer.valueOf(bundle.getString("redis.timeout")), conf);
	        
	
	    }
		
	public  void set(String key, String value) {
			jc.set(key, value);
	}

	public  String get(String key) {
			return jc.get(key);
	}
	

	}

