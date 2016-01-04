---
layout: post
title: "Git “Command Not Found” Error In Mountain Lion [Quickfix]"
comments: true
category: technology
tags: [tricks, mountain lion]
---
I just upgraded my Mac from Lion to Mountain Lion this morning. I must say the Mac OS just keeps getting better :). After the upgrade I just noticed that git was broken and I was getting the `Command not found error`. 

To fix this :
* Download the latest git package from [here](http://git-scm.com/download/mac).
* If you try and install the package directly, it will fail to install and would complain saying `Unidentified source`. This is due to the new [Gatekeeper](http://support.apple.com/kb/HT5290?viewlocale=en_US) feature in Mountain Lion. To fix this go to `System Preferences -> Security & Privacy` and select `Anywhere` under `Allow Applications Downloaded from` section.
* Go ahead and install the package you just downloaded.

An alternative method to fix this can be found [here](http://www.hongkiat.com/blog/mountain-lion-git-fix/). 