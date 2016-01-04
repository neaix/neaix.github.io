---
layout: post
title: "Prevent your Mac from sleeping"
comments: true
category: technology
tags: [tricks, OS X]
---
There are times you would want to prevent your mac from sleeping after it's idle for a long time. OS X provides a inbuilt utility called `Caffeinate` which helps you achieve this. Caffeinate creates assertions to alter system sleep behavior. If no assertion flags are specified, caffeinate creates an assertion to prevent idle sleep. If a utility is specified, caffeinate creates the assertions on the utility's behalf, and those assertions will persist for the duration of the utility's execution. Otherwise, caffeinate creates the assertions directly, and those assertions will persist until caffeinate exits

So if you want to prevent your mac from sleeping for an hour, then just do

`caffeinate -t 3600`
