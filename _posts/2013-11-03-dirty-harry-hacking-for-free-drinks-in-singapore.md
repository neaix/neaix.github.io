---
comments: true
date: 2013-11-03 16:38:07+00:00
layout: post
slug: dirty-harry-hacking-for-free-drinks-in-singapore
title: 'Dirty Harry: Hacking for free drinks in Singapore'
description: 'Hacking Appy Hour iOS app to win free drinks'
wordpress_id: 358
categories:
- iOS
- Web Application Security
tags:
- Appy Hour
- free drinks
- Harry's bar
- iOS
- blog
---

[Harry's bar](http://harrys.com.sg/) is one of the most popular bar chains in Singapore. It has an iOS app "Appy Hour" that lets users spin the Harry's "wheel of fortune" to win free drinks. The way it works is that a user would visit one of their strategically located bars and check in using the app. He would then spin the wheel, and if he is lucky, he would win a free drink. A time limit is imposed so that a user can spin the wheel only once in 24 hours while signed in a particular bar.

Now there may not be any such thing as a free lunch, but there are free drinks! Let's see how.

<figure align="center">
    <img src="/images/win240x360.png">
</figure>

## The 'luck factor'

The app communicates with ``www.exhost.se`` over HTTP. When started, the first thing the app does is to define the "luck factor" of the user, by downloading an XML file containing probabilities of various prizes. The probabilities are set in way such that 52% of the time a spin would yield 'Better Luck Next Time'.

{% highlight http %}
GET /harrys_1_1_beta/venues.xml HTTP/1.1
Host: www.exhost.se
User-Agent: Appy Hour 1.1.0 (iPhone; iPhone OS 6.0.1; en_SG)
Connection: keep-alive
Accept-Encoding: gzip

HTTP/1.1 200 OK
Age: 1659
Connection: Keep-Alive
Content-Length: 3071
Content-Type: application/xml
Date: Fri, 01 Nov 2013 06:27:45 GMT
ETag: "3c8066-bff-4d7ddfaa98300"
Last-Modified: Thu, 14 Mar 2013 08:05:00 GMT
Server: Apache/2.2.22 (Unix) mod_ssl/2.2.22 OpenSSL/0.9.8e-fips-rhel5 DAV/2 mod_bwlimited/1.4 mod_fcgid/2.3.6
Via: 1.1 qt-mfc4:80
 
<?xml version="1.0" encoding="UTF-8"?>
<Prizes>
<Prize>
<Description>Better Luck*Next Time</Description>
<Units>1</Units>
<ID>1</ID>
<Active>1</Active>
<Possibility>13</Possibility>
<IsPrize>0</IsPrize>
<PrizeFile>img/1.png</PrizeFile>
</Prize>
<Prize>
<Description>1-for-1 Bacardi*Sup Gls</Description>
<Units>1</Units>
<ID>2</ID>
<Active>1</Active>
<Possibility>5</Possibility>
<IsPrize>1</IsPrize>
<PrizeFile>img/2.png</PrizeFile>
</Prize>
--snipped--
{% endhighlight %}

## Time Restriction

Once the user has checked in the bar, the app checks if the user has already tried his luck in the past 24 hours in the same bar. It does so by sending a request with the iPhone's UDID, a timestamp and the bar's id. The response simply consists of ``true`` if the user is allowed to spin the wheel, or ``false`` otherwise.

{% highlight http %}
GET /harrys_1_1_beta/fetchdata.php?udid=aba5372762118af8f6f0594f836cd0eb32d10986&time=2013-01-11%02:56:15&venue=30 HTTP/1.1
Host: www.exhost.se
User-Agent: Appy Hour 1.1.0 (iPhone; iPhone OS 6.0.1; en_SG)
Connection: keep-alive
Accept-Encoding: gzip

HTTP/1.1 200 OK
Date: Fri, 01 Nov 2013 06:56:16 GMT
Server: Apache/2.2.22 (Unix) mod_ssl/2.2.22 OpenSSL/0.9.8e-fips-rhel5 DAV/2 mod_bwlimited/1.4 mod_fcgid/2.3.6
X-Powered-By: PHP/5.3.10
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
Transfer-Encoding: chunked
Content-Type: text/html

true
{% endhighlight %}

## Getting past everything

Well, the simplest way to get past everything would be to make the app communicate with another server instead of ``www.exhost.se``. First we will crawl ``www.exhost.se`` to get all the required files. The link ``http://www.exhost.se/harrys_1_1_beta/`` does not contain a default ``index.html`` or similar file, which makes crawling possible.

{% highlight bash %}
$ wget -nv -r --no-parent --reject "index.html*" http://www.exhost.se/harrys_1_1_beta/

2013-11-03 23:37:09 URL:http://www.exhost.se/harrys_1_1_beta/ [639/639] -> /"www.exhost.se/harrys_1_1_beta/index.html" [1] 
http://www.exhost.se/robots.txt:
2013-11-03 23:37:09 ERROR 404: Not Found.
2013-11-03 23:37:10 URL:http://www.exhost.se/harrys_1_1_beta/cms.php [169] -> "www.exhost.se/harrys_1_1_beta/cms.php" [1]
2013-11-03 23:37:10 URL:http://www.exhost.se/harrys_1_1_beta/connect.php [0/0] -> "www.exhost.se/harrys_1_1_beta/connect.php" [1]
2013-11-03 23:37:10 URL:http://www.exhost.se/harrys_1_1_beta/fetchdata.php [5] -> "www.exhost.se/harrys_1_1_beta/fetchdata.php" [1]
2013-11-03 23:37:11 URL:http://www.exhost.se/harrys_1_1_beta/img/ [1037/1037] -> "www.exhost.se/harrys_1_1_beta/img/index.html" [1]
2013-11-03 23:37:11 URL:http://www.exhost.se/harrys_1_1_beta/js/ [461/461] -> "www.exhost.se/harrys_1_1_beta/js/index.html" [1]
2013-11-03 23:37:12 URL:http://www.exhost.se/harrys_1_1_beta/venues.xml [3071/3071] -> "www.exhost.se/harrys_1_1_beta/venues.xml" [1]
2013-11-03 23:37:19 URL:http://www.exhost.se/harrys_1_1_beta/img/1.png [50769/50769] -> "www.exhost.se/harrys_1_1_beta/img/1.png" [1]
2013-11-03 23:37:23 URL:http://www.exhost.se/harrys_1_1_beta/img/10.png [62543/62543] -> "www.exhost.se/harrys_1_1_beta/img/10.png" [1]
2013-11-03 23:37:24 URL:http://www.exhost.se/harrys_1_1_beta/img/11.png [23376/23376] -> "www.exhost.se/harrys_1_1_beta/img/11.png" [1]
2013-11-03 23:37:26 URL:http://www.exhost.se/harrys_1_1_beta/img/12.png [33471/33471] -> "www.exhost.se/harrys_1_1_beta/img/12.png" [1]
2013-11-03 23:37:29 URL:http://www.exhost.se/harrys_1_1_beta/img/13.png [58419/58419] -> "www.exhost.se/harrys_1_1_beta/img/13.png" [1]
2013-11-03 23:37:31 URL:http://www.exhost.se/harrys_1_1_beta/img/14.png [50769/50769] -> "www.exhost.se/harrys_1_1_beta/img/14.png" [1]
2013-11-03 23:37:32 URL:http://www.exhost.se/harrys_1_1_beta/img/15.png [50119/50119] -> "www.exhost.se/harrys_1_1_beta/img/15.png" [1]
2013-11-03 23:37:33 URL:http://www.exhost.se/harrys_1_1_beta/img/16.png [23376/23376] -> "www.exhost.se/harrys_1_1_beta/img/16.png" [1]
2013-11-03 23:37:34 URL:http://www.exhost.se/harrys_1_1_beta/img/2.png [44208/44208] -> "www.exhost.se/harrys_1_1_beta/img/2.png" [1]
2013-11-03 23:37:36 URL:http://www.exhost.se/harrys_1_1_beta/img/3.png [62543/62543] -> "www.exhost.se/harrys_1_1_beta/img/3.png" [1]
2013-11-03 23:37:38 URL:http://www.exhost.se/harrys_1_1_beta/img/4.png [50769/50769] -> "www.exhost.se/harrys_1_1_beta/img/4.png" [1]
2013-11-03 23:37:40 URL:http://www.exhost.se/harrys_1_1_beta/img/5.png [60030/60030] -> "www.exhost.se/harrys_1_1_beta/img/5.png" [1]
2013-11-03 23:37:44 URL:http://www.exhost.se/harrys_1_1_beta/img/6.jpg [124823/124823] -> "www.exhost.se/harrys_1_1_beta/img/6.jpg" [1]
2013-11-03 23:37:46 URL:http://www.exhost.se/harrys_1_1_beta/img/6.png [50119/50119] -> "www.exhost.se/harrys_1_1_beta/img/6.png" [1]
2013-11-03 23:37:47 URL:http://www.exhost.se/harrys_1_1_beta/img/7.png [45129/45129] -> "www.exhost.se/harrys_1_1_beta/img/7.png" [1]
2013-11-03 23:37:49 URL:http://www.exhost.se/harrys_1_1_beta/img/8.png [50769/50769] -> "www.exhost.se/harrys_1_1_beta/img/8.png" [1]
2013-11-03 23:37:50 URL:http://www.exhost.se/harrys_1_1_beta/img/9.png [40394/40394] -> "www.exhost.se/harrys_1_1_beta/img/9.png" [1]
2013-11-03 23:37:52 URL:http://www.exhost.se/harrys_1_1_beta/js/jquery.min.js [85925/85925] -> "www.exhost.se/harrys_1_1_beta/js/jquery.min.js" [1]
FINISHED --2013-11-03 23:37:52--
Total wall clock time: 54s
Downloaded: 25 files, 950K in 34s (28.1 KB/s)
{% endhighlight %}

{% highlight bash %}
iPhone:~ root# strings -o /var/mobile/Applications/0B57A351-CE6D-4B05-A5D0-8B12BB150791/Harrys.app/Harrys | grep "http://www.exhost.se"
839501 http://www.exhost.se/harrys_1_1_beta/
842849 http://www.exhost.se/harrys_1_1_beta/venues.xml
843075 http://www.exhost.se/harrys_1_1_beta/fetchdata.php
{% endhighlight %}

Once we have the crawled files, we can edit the ``venues.xml`` file to change the probabilities. We can even change the drinks! ;-) Also, the file ``fetchdata.php`` should contain ``true`` for us to spin any number of times. Now these files can be hosted on a different server and these URLs can be changed in the app mach-o binary. Changing only the above two URLs is sufficient to make it work without any restrictions. The strings utility comes handy when trying to find out the location of these strings in the binary. These strings can now be edited using a hex editor. 

<figure align="center">
    <img src="/images/strings.png">
    <figcaption>Strings as seen in the disassembler after modification</figcaption>
</figure>

Once edited, we can run the app any number of times while signed in the same bar, and win a drink on every spin!

Cheers!


