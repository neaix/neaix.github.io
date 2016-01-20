---

layout: post
title: keepalived+nginx的HA方案
description: keepalived,nginx,ha
date: 2016-01-15 14:49:36 +08:00
tags: "nginx ha"
imageURL: qrcode.png
---
QR code(二维码)在现在的移动应用领域非常火热,其原理在此不再赘述，下面用Google的ZXing生成二维码。

Google ZXing jar包[下载](http://central.maven.org/maven2/com/google/zxing/core/3.2.1/core-3.2.1.jar) 

maven地址
	
	<dependency>
		<groupId>com.google.zxing</groupId>
		<artifactId>core</artifactId>
		<version>3.2.1</version>
	</dependency>


MatrixToImageWriter类，由Google提供

	package com.neaix.common.util;
	
	import java.awt.image.BufferedImage;
	import java.io.File;
	import java.io.IOException;
	import java.io.OutputStream;
	
	import javax.imageio.ImageIO;
	
	import com.google.zxing.common.BitMatrix;
	
	/**
	 * @author neaix
	 * @Date 2015年8月18日
	 * 
	 */
	public class MatrixToImageWriter {
	
	    private static final int BLACK = 0xFF000000;
	
	    private static final int WHITE = 0xFFFFFFFF;
	
	    private MatrixToImageWriter() {
	    }
	
	    public static BufferedImage toBufferedImage(BitMatrix matrix) {
	        int width = matrix.getWidth();
	        int height = matrix.getHeight();
	        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
	        for (int x = 0; x < width; x++) {
	            for (int y = 0; y < height; y++) {
	                image.setRGB(x, y, matrix.get(x, y) ? BLACK : WHITE);
	            }
	        }
	        return image;
	    }
	
	    public static void writeToFile(BitMatrix matrix, String format, File file) throws IOException {
	        BufferedImage image = toBufferedImage(matrix);
	        if (!ImageIO.write(image, format, file)) {
	            throw new IOException("Could not write an image of format " + format + " to " + file);
	        }
	    }
	
	    public static void writeToStream(BitMatrix matrix, String format, OutputStream stream) throws IOException {
	        BufferedImage image = toBufferedImage(matrix);
	        if (!ImageIO.write(image, format, stream)) {
	            throw new IOException("Could not write an image of format " + format);
	        }
	    }
	}
	
编写main方法测试

	public static void main(String[] args) throws WriterException, IOException {
	
	        String content = "";
	        Map<EncodeHintType, Object> map = new HashMap<EncodeHintType, Object>();
			//数据编码格式
	        map.put(EncodeHintType.CHARACTER_SET, “UTF-8”); 
	        //纠错级别采取最高，纠错级别越高，识别度越高，数据冗余就越大
	        map.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
	        BitMatrix bitMatrix = new MultiFormatWriter().encode(content, BarcodeFormat.QR_CODE, QRCodeConstants.WIDTH,
	                QRCodeConstants.HEIGHT, map);
	        File file = new File("F://" + File.separator + "test.png");
	        MatrixToImageWriter.writeToFile(bitMatrix, "png", file);
	    }





