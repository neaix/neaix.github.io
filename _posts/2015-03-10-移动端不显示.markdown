---
layout: post
title: "让某个插件在移动端不显示的实现" 
comments: true
share: true
tags: 网页设计
---


	<script>
	var isOnPc=!(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent));
	if(isOnPc) {
		...
	}
	</script>


