---
layout: post
title: "Say Happy Birthday to your friend on Facebook programatically"
comments: true
category: technology
tags: [facebook, birthday]
---

If you read one of my old [posts](http://pradeepnayak.in/technology/2012/08/13/programatically-responding-to-your-bday-wishes-on-facebook/), I showed you how to thank your friends when they wished you on your birthday on your facebook wall. Now I will show you how to wish your facebook friends on their birthdays programatically. 

Before you get started, you need the following setup on your machine:

 * Get the Facebook access token: Head to this [link](https://developers.facebook.com/tools/explorer) and get the api token. Select `publish_actions` , `publish_stream` , `read_stream` , `status_update` , `friends_birthdays' and `user_about_me` options when obtaining the API token. 

 * Install the facepy python library from [here](https://facepy.readthedocs.org/en/latest/)

 * Download my app from [github](https://github.com/pradeep1288/fb_bday_wisher)

 * In the script `fb_bday_wisher.py` replace FB\_API\_KEY with the key you generated in step 1

Now run your application

 * Run the app `python fb_bday_wisher.py`

 Hurray!!

 This is a very simple app and the code is self explanatory. 

 **Future Enhancements**

 * Support exceptions. You may not want to wish a specific friend :D
 * Wish people on their anniversaries and other life events and make the app more generic

 If you wish to contribute, please [fork](https://github.com/pradeep1288/fb_bday_wisher/fork) away 

