---
layout: post
title: "HowMany - A simple foursquare app that summarizes your check in's"
comments: true
category: technology
tags: [foursquare]
---

I use [foursquare](http://foursquare.com) a lot, I mean a lot! So, a few months back I decided to write a foursquare application which would make sense of my foursquare check-in's. My main goal was to track number of visits to different kinds of places. That's when I decided to build [HowMany](https://github.com/pradeep1288/knowme), an app which summarizes your foursquare check-in's for you.

Currently HowMany summarizes:

* How many Starbucks Coffee shops you have been to 
* How many Restuarants you have been to 
* How many Airports you have been to 
* How many Muliplexes/Movie theatre's you have been to 
* How many Shopping Mall's you have been to 
* How many Resedential Buildings you have been to

This app makes use of the foursquare [venue history](https://developer.foursquare.com/docs/users/venuehistory) API to get the information about your past check-in's. I get a JSON response from the API and a typical response for a single venue item would be like this as shown below:

{% highlight html %}
{
beenHere: 1
venue: {
id: "3fd66200f964a52020e31ee3"
name: "Doughnut Plant"
contact: {
phone: "2125053700"
formattedPhone: "(212) 505-3700"
twitter: "doughnutplantny"
}
location: {
address: "379 Grand St"
crossStreet: "at Norfolk St"
lat: 40.71634664858483
lng: -73.9885425567627
postalCode: "10002"
city: "New York"
state: "NY"
country: "United States"
cc: "US"
}
canonicalUrl: "https://foursquare.com/v/doughnut-plant/3fd66200f964a52020e31ee3"
categories: [
{
id: "4bf58dd8d48988d148941735"
name: "Donut Shop"
pluralName: "Donut Shops"
shortName: "Donuts"
icon: {
prefix: "https://foursquare.com/img/categories_v2/food/donuts_"
suffix: ".png"
}
primary: true
}
]
verified: true
stats: {
checkinsCount: 12346
usersCount: 7542
tipCount: 202
}
url: "http://www.doughnutplant.com"
menu: {
type: "Menu"
label: "Menu"
anchor: "See menu"
url: "https://foursquare.com/v/doughnut-plant/3fd66200f964a52020e31ee3/menu"
mobileUrl: "https://foursquare.com/v/3fd66200f964a52020e31ee3/device_menu"
}
}
}
{% endhighlight %}


I make use of this data and build the summary all on the client side. I plan to add more support on different kinds of categories, add visualizations etc. Do let me know  if you have suggestions. 

So if you are a foursquare user and want to summarize your check-in's go ahead and give my app a shot by visting this [link](http://pradeepnayak.in/HowMany). You will be prompted to authorize my app, once you do that you should be able to see your summary. 
