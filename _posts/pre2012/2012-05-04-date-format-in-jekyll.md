---
layout: post
title: "Jekyll中的日期格式化"
description: ""
category: 博客
tags: [Jekyll, Liquid, Blogging]
---

Jekyll uses Liquid for its template language. It’s worth reading over the Liquid for designers page to get a basic understanding of what’s available. The specific reference for date manipulation can be found here: Liquid date formatting.
To do the specific output you are looking for (e.g. “12 September 2011”), you would change your initial “05-04-2012” to:
04 May 2012 Side note: In some places you will need to use “post.date” instead of “page.date”. If “page.date” doesn’t produce any output, try the “post” version.
转自：Stack Overflow
原文：http://stackoverflow.com/questions/7395520/jekyll-date-format
