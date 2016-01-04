---
layout: post
title: "jekyll character encoding problems"
comments: true
category: technology 
tags: [jekyll, ruby]
---
I use jekyll as my primary blogging platform. I wanted to write a post today and all of a sudden jekyll stopped working 
and did not generate the `_site` content anymore. I then deleted the `_site` content and tried regenerating my site using 
`jekyll --server`. It blindly said it re-generated my site however it did not. When I tried accessing my http://localhost/4000 it gave me a forbidden error, no access permission to /. It was because my `_site` directory was empty. 

I then ran `jekyll --no-auto --server` which actually printed the error on why it was failing to generate the site

    /Users/pradeepnayak/projects/jekyll/lib/jekyll/convertible.rb:26:in `read_yaml': invalid 
    byte sequence in UTF-8 (ArgumentError)
    from /Users/pradeepnayak/projects/jekyll/lib/jekyll/post.rb:39:in `initialize'
    from /Users/pradeepnayak/projects/jekyll/lib/jekyll/site.rb:110:in `new'
    from /Users/pradeepnayak/projects/jekyll/lib/jekyll/site.rb:110:in `block in read_posts'
    from /Users/pradeepnayak/projects/jekyll/lib/jekyll/site.rb:108:in `each'
    from /Users/pradeepnayak/projects/jekyll/lib/jekyll/site.rb:108:in `read_posts'
    from /Users/pradeepnayak/projects/jekyll/lib/jekyll/site.rb:169:in `read_directories'
    from /Users/pradeepnayak/projects/jekyll/lib/jekyll/site.rb:79:in `read'
    from /Users/pradeepnayak/projects/jekyll/lib/jekyll/site.rb:71:in `process'
    from ../jekyll/bin/jekyll:150:in `'


To fix this problem add the following lines in your `.zshrc or .bashrc` file depending upon your shell.
{% highlight bash %}
    export LC_ALL=en_US.UTF-8
    export LANG=en_US.UTF-8
{% endhighlight %}

This is mainly an issue of how Ruby decides to handle String encodings by default. You can read more about it [here](http://blog.grayproductions.net/articles/ruby_19s_string)
