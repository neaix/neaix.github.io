---
layout: post
title: "Redesigning my website using Jekyll"
comments: true
category: technology
tags: [tutorials]
---

I wanted to redesign my website and my goal was to make it simple, elegant and easy to maintain. This is when I was introduced to [Jekyll](https://github.com/mojombo/jekyll) by [@KarthikDot](http://twitter.com/KarthikDot "target=_blank") on twitter and now my site is powered by Jekyll. It took me two nights to set it up and get my website running. I spent time on understanding the framework as I was completely new to it.

## What is Jekyll ?
Jekyll is a simple, blog aware, static site generator. It takes a template directory (representing the raw form of a website), runs it through Textile or Markdown and Liquid converters, and spits out a complete, static website suitable for serving with Apache or your favorite web server. This is also the engine behind [GitHub Pages](http://pages.github.com), which you can use to host your project's page or blog right here from GitHub.

## Setup on my Mac OS X Lion
I followed this particular [link](http://brandonbohling.com/2011/08/27/Installing-Jekyll-on-Mac/ "target=_blank") for setting it up on my mac. I also spent time reading this [wiki](https://github.com/mojombo/jekyll/wiki "target=_blank"). Do let me know if you have any issues setting this up. You can mail me at [pradeep1288\[at\]gmail\[dot\]com](mailto:pradeep1288@gmail.com)

## Recomended read

[Jekyll Bootstrap](http://jekyllbootstrap.com/) is the best place to start with for beginers like me. It has a very clear explaination on how the framework works. It contains some default themes which you can build upon. There are lots of examples available to try out.

## Setting up the comment engine

I am using [Disqus](http://disqus.com) for mananging comments on my [blog](/blog). Disqus supports integration with Jekyll too. All you need to do is follow the below steps:

* Add a variable `comments` to the [YAML Font Matter](https://github.com/mojombo/jekyll/wiki/YAML-Front-Matter) and set its value to `true`. A sample font matter would like:

		---
		layout: post
		comments: true
		title: Hello World
		---

* In between a  `{{ "{% if page.comments "}}%}`  and a `{{ "{% endif "}}%}` add the [universal code](http://docs.disqus.com/developers/universal/ "target=_blank") in the appropriate template where you would like Disqus to load.

## Setting up the tweet button for your blog post
You may want users to share your blog post via twitter when they read your blog post. Twitter already provides this and you can create your button [here](https://twitter.com/about/resources/buttons#tweet "target=_blank"). After customizing your button you will be getting a custom html+js code, and all you need to do is insert that code in the appropriate templates where you want this tweet button. 

## Source code
You may reuse the source code of this site and its available on github. You can clone this [repository](https://github.com/pradeep1288/pradeep1288.github.com) 
