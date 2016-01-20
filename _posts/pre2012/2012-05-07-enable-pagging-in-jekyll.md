---
layout: post
title: "在Jekyll中使用分页功能"
description: ""
category: 博客
tags: [Jekyll, Blogging]
---

Jekyll默认支持分页功能，然而仅支持在html文件中使用，而不支持markdown。您可以通过以下步骤为你的博客添加分页功能：

## 修改`_config.yml`配置文件

添加以下选项：

{% highlight html %}
markdown: rdiscount
pygments: true
lsi: true
exclude: ['README.markdown', 'README_FOR_COLLABORATORS.markdown', 'Gemfile.lock', 'Gemfile']
production: false
//add this line to add pagination
paginate: 3 //the number of post per page
{% endhighlight %}

## 在html文件中使用paginator

示例代码如下：

{% highlight html %}
  {% if paginator.previous_page %}
  &lt;p class="previous"&gt;
    {% if paginator.previous_page == 1 %}
    &lt;a href="/"&gt;Previous&lt;/a&gt;
    {% else %}
    &lt;a href="/page{{paginator.previous_page}}"&gt;Previous&lt;/a&gt;
    {% endif %}
  &lt;/p&gt;
  {% else %}
  &lt;p class="previous disabled"&gt;
    &lt;span&gt;Previous&lt;/span&gt;
  &lt;/p&gt;
  {% endif %}

  &lt;ul class="pages"&gt;
    &lt;li class="page"&gt;
      {% if paginator.page == 1 %}
      &lt;span class="current-page"&gt;1&lt;/span&gt;
      {% else %}
      &lt;a href="/"&gt;1&lt;/a&gt;
      {% endif %}
    &lt;/li&gt;

    {% for count in (2..paginator.total_pages) %}
    &lt;li class="page"&gt;
      {% if count == paginator.page %}
      &lt;span class="current-page"&gt;{{count}}&lt;/span&gt;
      {% else %}
      &lt;a href="/page{{count}}"&gt;{{count}}&lt;/a&gt;
      {% endif %}
    &lt;/li&gt;
    {% endfor %}
  &lt;/ul&gt;

  {% if paginator.next_page %}
  &lt;p class="next"&gt;
    &lt;a href="/page{{paginator.next_page}}"&gt;Next&lt;/a&gt;
  &lt;/p&gt;
  {% else %}
  &lt;p class="next disabled"&gt;
    &lt;span&gt;Next&lt;/span&gt;
  &lt;/p&gt;
  {% endif %}

{% endhighlight %}

需要说明的是，上述代码并不会产生一个名为page1的文件夹，所以当您点击第１页会会提示页面不存在。以下代码则解决了这个问题：

现在分页功能已经完成了。当然，这个分页器看上去很丑陋，您可以定制它的CSS样式。
