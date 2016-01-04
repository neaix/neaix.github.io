---
layout: post
title: "Technical Summary - Rate limiting YouTube Video Streaming"
comments: true
category: technology
tags: [youtube, google, networks, tcp]
---

I reviewed this [paper](http://research.google.com/pubs/pub38103.html) as part of my Computer Communications course at USC. 

Introduction
------------

YouTube traffic is bursty. These bursts trigger packet losses and stress router queues, causing TCP congestion-control algorithm to kick in. The paper provides an implementation called Trickle, a server side mechanism which uses TCP to rate limit YouTube video streaming. Trickle paces the video stream by placing an upper bound on TCP's congestion window.

YouTube follows the concept of just-in-time delivery i.e. the video is delivered just in time to the video player, so when the user cancels a video, only a limited quantity of data is discarded.


--------------------------------


Design & Implementation
-----------------------

The YouTube serving infrastructure is complicated, with many interacting components, including load balancing, hierarchial storage, multiple client types and many format conversions. However, the YouTube content delivery uses the same server application, called **ustreamer** independent of client type, video format or geographical location.

The just-in-time algorithm in YouTube comprises of two phases namely the **startup** phase and a **throttling** phase.

Startup Phase
-------------
* It builds up the playback buffer in the client, to minimize the likelyhood of player pauses due to rebuffering(buffer-under-run) events.
* *ustreamer* sends the first 30-40 seconds of video as fast as possible into the TCP socket

Throttling Phase
----------------

* In this phase, ustreamer uses a token bucket algorithm to compute the schedule for delivering the rest of the video.
* Tokens are added to the bucket at 125% of the video encoding rate and they are removed as soon as the video is delivered.
* A delay timer for a data block (64KB) is computed to expire as soon as the bucket has sufficient tokens.
* If for some reason, the video delivery is running behind, then the calculated delay will be zero and the data is written to TCP socket as soon as possible. 
* The extra 25% added to data rate as described above reduces the number of rebuffering events.


NOTE: A video is delivered over a single TCP connection.

------------------------------------

Problem in JIT delivery algorithm
---------------------------------
* The bursts of data separated by idle periods, disrupts TCP's self clocking.
* For most applications, TCP data transmissions are triggered by the ACK returning from the receiver
* With YouTube, TCP typically has no data to send when the ACKs arrive, and then when ustreamer writes the data to the socket, it is sent immediately because TCP has unused **cwnd**(congestion window)

-------------------------------------

Solution
---------
* YouTube solves this problem by setting an upper bound on **cwnd** of *target_rate* x *RTT*, where *target_rate* is the target streaming rate of the video in throttling phase.
* Linux already provides this feature as a per-route option called cwnd clamp. YouTube team wrote a small kernel patch to make it available as a per-socket option.

----------------------------------------
Challenges
----------
The solution described above encounters two practical challenges:

* Network congestions causing re-buffering.
* Small cwnd causing inefficient transfers.

Trickle addresses both these challenges and provides an algorithm to overcome them. Algorithm is decribed below. You can take a look at the animated demo [here](http://www.cs.toronto.edu/~monia/tcptrickle.html) 

--------------------------------------------

Algorithm of Trickle in throttling phase
----------------------------------------
{% highlight python %}
    R = target_rate(video_id)
    while (new data available from the cache)
        rtt = getsockopt(TCP_INFO)
        clamp = rtt * R / MSS
        clamp = 1.2 * clamp
        goodput = delivered / elapsed
        if goodput < R:
            clamp = inf
        if clamp < 10:
            clamp = 10
            write_throttle = true
        setsockopt(MAX_CWND, clamp)
        if write_throttle:
            throttles writes at rate R
        else:
            write all available data
{% endhighlight %}

--------------------------------------------

Results
-------
Trickle has effectively reduced the retransmissions by up to 50% in high bandwidth networks. It also reduces the average RTT by up to 28%.

---------------------------------------------

References
----------
* [Rate Limiting YouTube Video Streaming](http://research.google.com/pubs/pub38103.html)
* [ALCOCK, S., AND NELSON, R. Application flow control in YouTube video streams. CCR 41 (April 2011), 24–30.](http://ccr.sigcomm.org/online/files/p25-v41n2d2-alcockA.pdf)


Finally, thanks [Abinesh](https://twitter.com/abineshtd) for taking time to review this post!
