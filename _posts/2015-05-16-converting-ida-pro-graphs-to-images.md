---
comments: true
date: 2015-05-16 15:23:25+00:00
layout: post
slug: converting-ida-pro-graphs-to-images
title: 'Converting IDA Pro graphs to images'
description: 'Converting IDA Pro graphs to images'
categories:
- IDA Pro
tags:
- IDA Pro
- graph
- control flow graph
- CFG
- blog
---

It's been a long time since my last post. I have been busy with work, and (thanks to IPR) could not post anything. This post is about a much needed feature in IDA Pro (specifically the wingraph32 utility), saving the graph as an image.

IDA Pro provides an interesting feature to view the disassembly of a function as a flowchart. The flowchart shows the function in the form of a control flow graph, where each node in the graph represents a basic block and each edge represents a control transfer. In many instances, one would like to export it as an image. However, the wingraph32 utility does not provide such an option.

<figure align="center">
    <img src="/images/wingraph32.png">
    <figcaption>A graph shown by wingraph32</figcaption>
</figure>

The graph can be exported from IDA Pro (or from wingraoh32) as a .gdl (graph description language) file. GDL file is a text representation of graph, and can be opened using a text editor. It can be converted into an image using the [Graph::Easy](http://search.cpan.org/dist/Graph-Easy/bin/graph-easy) CPAN module.

To convert it into a PNG (or any other format) image, first install the Graph::Easy CPAN module. It requires [Graphviz](http://www.graphviz.org/) to run, so install that as well.

{% highlight bash %}
cpan Graph::Easy
{% endhighlight %}

Then, convert the .gdl file to an image.

{% highlight bash %}
graph-easy --from gdl --input=graph.gdl --png --output=graph.png
{% endhighlight %}

This is how the final image of the above graph looks like.

<figure align="center">
    <img src="/images/graph.png">
    <figcaption>Graph produced by graph_easy</figcaption>
</figure>


