---
layout: post
title: "Root Kindle Fire - 6.2.2 on Mac OS X Lion"
comments: true
category: Hacks 
tags: [kindle, amazon]
---
As you all know that I recently bought a Kindle Fire and you read my review [here](http://pradeepnayak.in/technology/2012/02/27/kindle-fire-my-first-touch-gadget). The Kindle Fire is locked to the Amazon App store by default and it is available only in the US. I initially thought that I would not root my Kindle and would install the apps by downloading apk's from third party sites, however this process became cumbersome. A few friends of mine on twitter, [@varunkumar](http://twitter.com/varunkumar) and [@vivekgolecha](http:twitter.com/vivekgolecha) suggested me to root the device and install Android Market. The only challenge was that I had a Macbook and its not a easy process from a Mac. After a lot of research online, I found an awesome tool which can root your Kindle a little less than five minutes.

## Steps to Root Your Kindle Fire running 6.2.2 firmware

* Before you begin, goto Settings->More->Device and turn on "Allow Installation Of Applications"
* Now download the following three tools on your Mac: 
   
   * The [Kindle Water](http://goo.gl/qIOFq) app which you would be running to root your Kindle Fire.
   * [ADB Fixer](http://www.box.com/s/qnnqnr2k20e9y31shu5x) app.
   * TWRP Recovery tool. You can download it from [here](http://goo.gl/d1vbH). Once downloaded, put the file on your Desktop and rename it to recovery.img

Now connect your Kindle to your Mac, using a Micro USB cable. 

* Double click the **KindleWater_2.1.dmg** file, and open KindleWater from it. 

* Click on Set up **ADB button** first, and after that is done click on **Root** button. Don't worry, the software will automatically guide you what to do next. During this process your Kindle will reboot a couple of times. Don't panice and at any given point of time and don't plug your Kindle from your Mac unless told so. If you do not encounter any errors, then you should see the **Super User** app installed on your Kindle. If you encounter any errors see step 5 else goto step 6

* If you encounter errors from step 5, run the ADB Fixer app you downloaded in step 2 on your Mac and redo Step 4. 

* Press **Disconnect** on your Kindle Fire and then unplug it from your Mac.

Congratulations :) You have now rooted your Kindle fire!

## Install Android Market on rooted Kindle Fire

So once you have rooted, the next step is to install the Android Market so that you can install Apps on the go.

* First download this google apps package from my dropbox account [here](http://dl.dropbox.com/u/1258877/gapps.rar). Once downloaded extract the contents to a folder and copy it to your Kindle Fire.

* Next, you need a file explorer app to browse the files on your Kindle. There is a app called Root Explorer it's awesome but you need to pay for it. But instead you can get the work done by using the ES File Explorer app. You can download the apk file from [here](http://dl.dropbox.com/u/1258877/ES%20File%20Explorer.apk). You can copy this file to your downloads folder on your kindle and access the Downloads folder from your silk browser in your Kindle and install the App. The easier thing would be directly downloading this file from your kindle.

* Open the ES File Explorer app, and navigate to the folder containing google apps, and install the GoogleServicesFramework.apk and reboot the Kindle once the installation is complete.

* You now need to grant ES File Explorer App super user permissions. Go to settings of your ES File Explorer App(click on the half rectangle button on the bottom and choose settings). Under the **Root Settings** select the check boxes : *Root Explorer* & *Mount File System*.

* Now go to the Google Apps folder, Move the **Market.apk** file to **/system/app** location. (To move, press and hold the Market.apk file, you will see a move button, press move and navigate to /system/app and it would be moved to that location.)

Yay! You have now installed Android Market on your kindle fire :):)

By default Android Market shortcut will not be visible from your Carousel. You can either open it from ES File Explorer or install **Go Launcher** (It's there in the Google Apps folder you copied) or install the Market Opener app from [here](http://munday.ws/kindlefire/MarketOpener.apk)

You are now all set to install apps from the Android Market. 

I wrote this blog post as and when I did the process on my Kindle Fire. If you have any doubts, questions, drop a comment below and I will help you out.

