---
layout: post
title: "Programatically responding to your B'day wishes on Facebook"
comments: true
category: technology
tags: [facebook, birthday]
---

One of the top advantages of Facebook is to wish your friends on their birthday. There were days where your friends used to call you at 12 in the night to just wish on your birthday just by their memory. Gone are those days and you hardly see any such calls these days. Even if you receive it's after your friend has seen your facebook profile just to realise that its your birthday. However there are exceptions, a few friends still call you to wish based on their memory. So in my case I just got a couple of calls from my friends apart from my parents and my sister.

So when I opened my Facebook profile, I saw there were 200+ birthday wishes on my  wall and I wanted to respond to all of them. Earlier in my May, my ex-roomate [Harsha](https://twitter.com/harry_sistalam) and me were discussing that we need to write an app for this. So he went ahead and wrote a python script using the Facebook python SDK to achieve this. It's really simple to use. All you need is a Facebook Developer Access token which you can easily get by visiting this [link](https://developers.facebook.com/tools/explorer) and a bunch of random thank you messages in order to make the replies genuine ;)

So if you want to use this go ahead and find the instructions below:

##Get the Facebook access token:

Head to this [link](https://developers.facebook.com/tools/explorer) and get the api token. Select `publish_actions` , `publish_stream` , `read_stream` , `status_update` 
and `user_about_me` options when obtaining the API token

Replace YOUR_FACEBOOK_API_TOKEN by this api token in the script below

##Installing facepy:

* direct install

    <code>
        pip install facepy
    </code>

* From github

    <code>
    git clone https://github.com/jgorset/facepy.git<br/>
    cd facepy<br/>
    python setup.py install<br/>
    </code>

* If you don't have root access 

    <code>python setup.py install --user</code>

And this is the code..

<div id ="gist-code">
<script src="https://gist.github.com/2821658.js?file=birth_day_thank_you.py"></script>
</div>

P.S. No offence meant to any of my friends. I sincerely thank you all for wishing me :)