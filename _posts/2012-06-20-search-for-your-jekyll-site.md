---
layout: post
title: "Search for your Jekyll Site"
comments: true
category: technology 
tags: [technology, jekyll]
---
I have been successfully using [Jekyll](http://pradeepnayak.in/technology/2012/01/16/redesigning-my-website-using-jekyll/) and the only feature I missed was the ability to have a full text for search my blog. I looked at a variety of search plugins for jekyll based sites, but did not find anyone of them appealing. I also tried the custom google search, but did not like that either. 

Finally, after some rigorous researching I stumbled upon this [site](http://www.marran.com) where the search was implemented using simple jQuery and a  json based search index. The implementation is pretty simple as well. To get this working follow the steps below:

* Have a line called `searchindex: yes` in your `_config.yml`.
* Create a layout for your search results `search_post.html` in your `_layouts` directory. You can download the file from [here](https://raw.github.com/pradeep1288/pradeep1288.github.com/master/_layouts/search_post.html).
* Install the ruby stemmer plugin from [here](https://github.com/aurelian/ruby-stemmer).
* Download the `generate_searchindex.rb` plugin to your `_plugins` directory.   The code basically creates a series of JSON files and puts it in `search/terms`. It puts an HTML file for each post in `search/posts`.

Now the backend is ready, now its all javascript and jQuery fun. 

* Download the `site-search.js` file from [here](https://raw.github.com/pradeep1288/pradeep1288.github.com/master/assets/themes/pradeep/js/site-search.js)
* Download the `porter-stemmer.js` file from [here](https://raw.github.com/pradeep1288/pradeep1288.github.com/master/assets/themes/pradeep/js/porter-stemmer.js)
* Download the jQuery plugin.

Now design your search box, you can use my template from [here](https://raw.github.com/pradeep1288/pradeep1288.github.com/master/search.html). Just edit the paths to your js files you just downloaded. 

You are all set now. Compile your site using Jekyll and it will generate your search index. After compiling you will find a directory called search under your `_site` directory. If your site is hosted on github, then you need to explicilty commit your search index. 

Have a look at my site's source on [github](https://github.com/pradeep1288/pradeep1288.github.com) if you are confused.

Hope you find this useful! 