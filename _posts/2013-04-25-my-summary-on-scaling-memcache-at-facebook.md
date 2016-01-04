---
layout: post
title: "My summary on scaling memcache at Facebook"
comments: true
category: technology
tags: [memcache, facebook, distributed]
---

Most of the modern web applications these days which have a more dominant read workload, experience significant infrastructure challenges. One of the primary challenges is to improve the user response time. This in turn leads to more user engament, and more revenue via Advertisements. Facebook currently solves this problem using [memcached](https://github.com/memcached/) as a building block to build *memcache*, and scale it to support one of the largest social networking sites in the world.


This blogpost is a summary of the paper which Facebook presented at the [NSDI](https://www.usenix.org/conference/nsdi13/scaling-memcache-facebook) conference this April, 2013. I read this paper as part of my CS599 (NoSql & New SQL Database management systems) course here at [USC](http://www.usc.edu).


The two major design goals which Facebook considered were:

* Any change must impact a userfacing or operational issue. Optimizations that have limited scope are rarely considered. 

* The probability of having stale data in the system is a parameter to be tuned, however its okay to have it as long as we insulate the backend storage from excessive load.

One of the primary challenges of scaling thousands of servers in a cluster is to reduce the **latency** (time taken to fetch the cached data) and **load** (cost of a cache miss).

<br/>
Reducing Latency
----------------
Facebook tries to solve the latency problem by implementing the following techniques:

* *Parallel requests and batching*
* *Optimizing client server communication*
* *Avoiding incast congestion* 

**Parallel requests and batching**


The web application code is analyzed to minimize the number of network round trips to respond to page requests. This is done by analyzing the data dependencies and modelling them as a directed acyclic graph (DAG). The web server makes use of this DAG to maximize the number of key,value pairs that can be fetched concurrently.

**Optimizing Client Server Communication**



*Memcached* servers do not communicate with each other. When appropriate, they  embed the complexity of the system into a stateless client rather than in the *memcached* servers.

Client logic is provided as two components: a library that can be embedded into applications or as a standalone proxy named *mcrouter*. This proxy presents a memcached server interface and routes the requests/replies to/from other servers.

The clients rely on UDP and TCP to communicate with the memcached servers. Clients use UDP for *get* requests as it is connectionless and every thread in the web server can directly communicate with a memcached server bypassing the *mcrouter* without establishing a connection and there by reducing the overhead. The UDP implementation detects the packets that arrive out of order and the ones which are dropped. These are treated as errors on the client side and these are treated as cache misses. Facebook claims that under peak load, memcache clients observe that 0.25% of get requests are discarded. About 80% of these drops
are due to late or dropped packets, while the remainder are due to out of order delivery.

For reliability, clients perform set and delete operations over TCP.

**Incast congestion**



*Incast congestion* is a situation where a single web server becomes a bottleneck as its bombarded with many responses from many memcached servers at the same time. Facebook eliminates this by implementing a flow control mechanism on the memcache clients. It is similar to the sliding window protocol which TCP employs for congestion control.

<br/>
Reducing Load
-------------
Facebook tries to optimize the frequency of fetching data from the backend database when web servers don't find the data they are looking for in the cache. The following three techniques are currently employed

* *Leases*
* *Memcache Pools*
* *Replication within Pools*

**Leases**



This mechanism is introduced to solve two problems i.e. *stale sets* and *thundering herds*. *Stale sets* occur when a web server sets a value in memcache and it does not reflect the latest value in the database. *Thundering herd* occurs when a specific key undergoes a lot of read & write activity.

Stale sets are avoided by issuing a short lived 64 bit lease token which are bound to the keys which clients originally requested. These clients then provide the lease token while setting the value in the cache and making use of this the memcached instances can determine whether the data should be stored or not. 


The thundering herd issue is solved by limiting the rate at which the lease tokens are issued and there by signalling other clients to wait for a while before they request for the key's value.


**Memcache pools**

The *memcached* servers in a cluster are partitioned into separate pools based on key accesses. For example a pool is dedicated for keys which are accessed frequently for which the cache misses are considered inexpensive. A large pool is dedicated for keys are which are accessed very frequently and cache misses are considered expensive. Facebook also maintains a default pool called as *wildcard* for keys which do not fall into any category.



**Replication within Pools**

In order to improve efficieny & latency, replication is done within pools. Facebook does replication if :

* when application fetches many keys from the same pool
* if the entire dataset fits into one or two memcached servers
* if the request rate is higher than what a single server can manage.

<br/>

Handling Failures
-----------------

It could so happen that a few of the memcached servers could fail and reasons could be many. This inturn increases the load on the backend databases which is not desirable. Facebook addresses two kinds of failures:

* A small number of servers are not accessible due to network or server failure.
* A widespread outage where significant number of servers in the cluster are affected.

For small outages, facebook maintains a small number of servers in a cluster called *Gutters*. Approximately 1% of servers in a cluster are reserved as Gutters. These Gutters take over the responsilbily of failed servers.

For large outages if the entire cluster has to be taken offline, they re-direct the web requests to other clusters.


Facebook also talk about partitioning the clusters based on Regions. This section of the paper includes discussion on *Regional Invalidations*, *Having Regional Pools*, *Maintaining consistency across different regions*. I am not very clear with what was being explained in this section of the paper and hence I would not be describing it here. However my friend [Abinesh](http://twitter.com/abineshtd) here at USC, has also summarized this paper and you can refer to his blog [here](http://abineshtd.blogspot.com/2013/04/notes-on-scaling-memcache-at-facebook.html) for information on this section.
<br/>

Single Server Improvements
--------------------------

**Performance Optimizations**

* Allow automatic expansion of the hash table, to avoid lookup times from drifting to *O(n)*
* Making the server multithreaded and using a global lock to protect multiple data structures.
* Giving every thread it's own UDP port so as to avoid contention.

The first two optimizations listed above have already been contributed towards the open source build of memcached.


**Adaptive Slab Allocator**

Memcached employs a slab allocator to manage memory. The allocator organizes memory into slab classes, each of which contains pre-allocated, uniformly sized chunks of memory. Once a memcached server can no longer allocate memory, the memory for new objects are allocated by eviciting items from LRU ( Least Recently Used ) list. 

However as the workload changes, it could so happen that a particular slab class be completely used and a there may be a slab class which is never used. When more and more requests come to the slab class which is full, the original memory allocated to this class may not be enough and thiw would lead to more poor hit rates.

Facebook solves this problem by employing a adaptive slab allocator which periodically rebalances memory allocated to different slab classes. This method is much better than the one which Twitter implemented (Random Eviction) in their version of memcached. You can read about that [here](http://engineering.twitter.com/2012/07/caching-with-twemcache.html)

**Transient Item Cache**

Memcached supports expiration times for keys. Memcached lazily evicts such entries by checking expiration times when serving a get request for that item or when they reach the end of the LRU. Although this is efficient for the common case, this scheme allows shortlived keys that see a single burst of activity to waste memory until they reach the end of the LRU.

Facebook solves this by storing such keys in a circular buffer of linked lists called the transient item cache.

**Software Upgrades**

Software upgrades usually mean clearing out whole cache and repopulating them again. However this is not desirable. Facebook uses System V's shared memory regions, so that data can remain live across software upgrades of these servers.


<br/>
Learnings from this paper
-------------------------





* Keep things simple.
* I have gained knowledge about memcached internals in depth.
* It's okay to have stale data to a certain extent at the cost of insulating the backend database server.
* Separating caching layer from the backend database simplifies scaling.

<br/>
I hope facebook open sources their build of memcached someday. And finally a shout out to my [Prof Shahram](http://perspolis.usc.edu/Users/shahram/), my instructor for CS599 course for having this paper as part of curriculum and [Abinesh](http://twitter.com/abineshtd) for his inputs and taking time to review this post.

