---
layout: post
title: "Set up beetel 450TC1 router for BSNL broadband"
comments: true
category: tutorials 
tags: [bsnl, routers]
---
I recently got a [Beetel 450TC1](http://www.ebay.in/itm/Brand-New-Beetel-450TC1-Wifi-Wireless-Modem-Router-DSL-ADSL-2-BSNL-AIRTEL-MTNL-/320846675637) adsl/wifi router so that I can set up wifi at home. I have BSNL broadband at home and I had a tough time setting this up and hence I am documenting the procedure so that others find it useful.

To set up the router for BSNL broadband connection, follow the steps below:

* Connect the router via to your laptop/computer via the lan cable provided and access modem settings by going to 192.168.1.1
* Default username=admin, password=password
* Go to Interface Setup tab. In Virtual Circuit dropdown, do the below for PVC0 and PVC1
  * Status : Pick Activated (radio button). 
  * Choose Bridge Mode (radio button) in Encapsulation section.  
  * Save it

* In Virtual Circuit dropdown, pick PVC2 now.
  
  * Encapsulation: Choose PPPoA/PPPoE (radio button)
  * Servicename: BSNL
  * Username and password: This will be provided by BSNL.
  * Password - It will be 'password' OR, 3char city name+3char first name+123.  Example: If you reside in Mangalore, firstname = Pradeep, password will be 'manpra123'.
  * Bridge Interface - Choose Deactivated (radio button).
  * Connection: Always On (radio button).
  * Get IP address: Choose Dynamic (radio button).
  * NAT: Choose from drop down as ENABLED.
  * Default Route: Choose YES.
  * Leave other parameters as it is.
  * Click SAVE.
* Go to Maintenance Tab. Go to SysRestart subtab.
  * System Restart with: Choose Current Settings in radio button.
  * Click Restart.
* Modem will reboot. Internet LED will glow green. You are set to browse the internet! 

## Configuring WiFi on the router

* Go the Interface tab and select Wireless
* Have the following configuration:
  * Access Point: Activated
  * Channel: India
  * 802\.11 b+g
  * SSID Index: 1
  * Broadcast SSID: Yes
  * Authentication Type: WEP 64Bits
  * SSID: Give the name of the network, ideally you would be connecting to this wifi network for internet access.
  * Set up a wifi password under the key field. Follow the password restrictions given on the routers page.

  Bingo! You have now configured your Beetel 450 TC1 router for BSNL broadband with WiFi access. 

  Let me know if you have any dobuts.
