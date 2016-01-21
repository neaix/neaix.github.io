---
layout: post
title: Java邮件发送
date: 2016-01-20 16:41:00
category: Java
tags: java mail
---
Java邮件发送demo.

在项目中引用mail库

	<dependency>
		<groupId>javax.mail</groupId>
		<artifactId>mail</artifactId>
		<version>1.4.7</version>
	</dependency>


mail.properties

	mail.smtp.host=smtp.xx.com
	mail.username=邮箱用户名
	mail.password=邮箱密码
	mail.smtp.auth=true
	mail.smtp.timeout=25000
	mail.port=465
	

邮件发送器

	package com.neaix.common.mail;
	
	import com.neaix.util.PropertiesUtil;
	
	import java.io.IOException;
	import java.io.UnsupportedEncodingException;
	import java.util.Date;
	import java.util.List;
	import java.util.Properties;
	
	import javax.activation.DataHandler;
	import javax.activation.FileDataSource;
	import javax.mail.Authenticator;
	import javax.mail.BodyPart;
	import javax.mail.Message;
	import javax.mail.MessagingException;
	import javax.mail.Multipart;
	import javax.mail.PasswordAuthentication;
	import javax.mail.Session;
	import javax.mail.Transport;
	import javax.mail.internet.InternetAddress;
	import javax.mail.internet.MimeBodyPart;
	import javax.mail.internet.MimeMessage;
	import javax.mail.internet.MimeMultipart;
	import javax.mail.internet.MimeUtility;
	
	import org.apache.log4j.Logger;
	
	/**
	 * 邮件发送器
	 * 
	 * @author near
	 * @Date 2015年9月11日
	 * 
	 */
	public class MailTransmitter {
	
	    public static Logger log = Logger.getLogger(MailTransmitter.class);
	    // 邮箱配置文件地址
	    public static final String CONFIG_FILE_PATH = "mail.properties";
	
	    // 服务器地址
	    public static final String MAIL_HOST = "mail.smtp.host";
	    // 用户名
	    public static final String MAIL_USER_NAME = "mail.username";
	
	    // 密码
	    public static final String MAIL_PWD = "mail.password";
	
	    // 端口号
	    public static final String MAIL_PORT = "mail.port";
	
	    // 服务端认证
	    public static final String MAIL_SMTP_AUTH = "mail.smtp.auth";
	
	    // 链接超时时间
	    public static final String MAIL_CONNECTION_TIME_OUT = "mail.smtp.timeout";
	
	    // 发件人昵称
	    public static final String MAIL_NICK_NAME = "mail.nickname";
	
	    // 邮件编码格式
	    public static final String CHARSET_UTF8 = "utf-8";
	    // 字符编码类别
	    public static final String ENCODEING = "B";
	
	    // 邮件类型 -html
	    public static final String HTML_CHAR_SET = "text/html;charset=utf-8";
	
	    public static Properties props;
	
	    static {
	        init();
	    }
	
	    // 加载邮箱配置信息
	    public static void init() {
	
	        try {
	            props = PropertiesUtil.load(CONFIG_FILE_PATH);
	        } catch (IOException e) {
	            e.printStackTrace();
	            log.error("init mail transmitter falid.", e);
	        }
	    }
	
	    private MailTransmitter() {
	    }
	
	    /**
	     * 发送邮件，统一采取html格式，统一编码：utf-8
	     * 
	     * @param subject
	     *            邮件主题
	     * @param content
	     *            邮件正文
	     * @param attachmentList
	     *            附件路径（此处必须是绝对路径）
	     * @param to
	     *            接收者邮箱，支持群发
	     * @return true 发送成功，false失败
	     */
	    public static boolean send(String subject, String content, List<String> attachmentList, String... to) {
	
	        Session session = Session.getInstance(props, new Authenticator() {
	            @Override
	            public PasswordAuthentication getPasswordAuthentication() {
	                return new PasswordAuthentication(props.getProperty(MAIL_USER_NAME), props.getProperty(MAIL_PWD));
	            }
	        });
	
	        try {
	            MimeMessage msg = new MimeMessage(session);
	            // 设置发件人地址，昵称
	            msg.setFrom(new InternetAddress(props.getProperty(MAIL_USER_NAME), props.getProperty(MAIL_NICK_NAME)));
	            // 设置收件人地址 支持群发
	            InternetAddress[] addresses = new InternetAddress[to.length];
	            for (int i = 0; i < to.length; i++) {
	                addresses[i] = new InternetAddress(to[i]);
	            }
	            msg.setRecipients(Message.RecipientType.TO, addresses);
	            // 设置邮件主题，正文编码格式 ，此处全部采用UTF-8
	            subject = MimeUtility.encodeText(new String(subject.getBytes(), CHARSET_UTF8), CHARSET_UTF8, ENCODEING);
	            msg.setSubject(subject);
	            // 构建Multipart
	            Multipart mp = new MimeMultipart();
	            BodyPart mbpContent = new MimeBodyPart();
	            // 添加正文 采用html格式
	            mbpContent.setContent(content, HTML_CHAR_SET);
	            mp.addBodyPart(mbpContent);
	            // 存在附件
	            if (null != attachmentList && attachmentList.size() > 0) {
	                for (String string : attachmentList) {
	                    MimeBodyPart mbpFile = new MimeBodyPart();
	                    // 以文件名创建FileDataSource对象
	                    FileDataSource fds = new FileDataSource(string);
	                    // 处理附件
	                    mbpFile.setDataHandler(new DataHandler(fds));
	                    // 规避附件名称乱码
	                    mbpFile.setFileName(MimeUtility.encodeText(new String(fds.getName().getBytes(), CHARSET_UTF8),
	                            CHARSET_UTF8, ENCODEING));
	                    mp.addBodyPart(mbpFile);
	                }
	
	                attachmentList.clear();
	            }
	            msg.setContent(mp);
	            msg.setSentDate(new Date());
	            Transport.send(msg);
	
	        } catch (MessagingException e) {
	            log.error(e.getMessage(), e);
	            return false;
	        } catch (UnsupportedEncodingException e) {
	            log.error(e.getMessage(), e);
	            return false;
	        }
	        return true;
	    }
	}


附上PropertiesUtil
	
	package com.neaix.util;
	
	import java.io.IOException;
	import java.io.InputStream;
	import java.util.Properties;
	
		/**
		 * 
		 * @author near
		 * @Date 2015年9月11日
		 * 
		 */ class PropertiesUtil {
	  	  /**
	     * read properties file, relative to root classpath,
	     * 
	     * @param path
	     * @return
	     * @throws IOException
	     */
	    public static Properties load(String path) throws IOException {
	        Properties ps = new Properties();
	        InputStream stream = PropertiesUtil.class.getClassLoader().getResourceAsStream(path);
	        ps.load(stream);
	        return ps;
	    }

