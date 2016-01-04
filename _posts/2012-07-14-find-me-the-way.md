---
layout: post
title: "Find me the way"
comments: true
category: tutorials  
tags: [tutorials, google, tricks]
---
Often I have seen my friends giving me directions to different venues like a marriage hall, a restaurant or even their house using google maps. Yes you can open google maps and search the directions entering the start and end addresses and get the way. However I wrote a small form which solves the problem in a much simpler and elegant way. The form just accepts the address where you are currently at. On submitting it, will directly launch the google maps with appropriate directions from your place to the desired destination address (this remains constant)
## How do I do it ?
To implement this on your site, just copy the html below and replace your desired destination address.

{% highlight html %}
<form action="http://maps.google.com/maps" method="get" target="_blank">
   <label for="saddr">Where are you now ?</label>
   <input type="text" name="saddr" />
   <input type="hidden" name="daddr" value="<Your desired destination address>" />
   <input type="submit" value="Find me the way" />
</form>
{% endhighlight %}

## How to reach Pradeep's House
<form action="http://maps.google.com/maps" method="get" target="_blank">
   <label for="saddr">Where are you now ?</label>
   <input type="text" name="saddr" />
   <input type="hidden" name="daddr" value="12.907424, 74.831443 @12.907424,74.831443" />
   <input type="submit" value="Find me the way" />
</form>

