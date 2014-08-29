---
layout: post
title: "The Tips of Compiling Hadoop on Ubuntu"
description:
modified: 2014-06-19 17:09:58 +0800
category:
tags: [Hadoop,MapReduce,Ubuntu,Compiling,Src]
image:
  feature: http://seeksky.qiniudn.com/19.jpg-clip.jpg
  credit:
  creditlink:
comments: true
share: true
alias: [/2014/06/19/The Tips of Compliling Hadoop on Ubuntu]
---

### Introduction
With the work of optimizing the performance of MapReduce.\\
I do some solid work to understand the core source code of MapReduce.\\
And do some programming with the core code.\\
So there is something being introduced here to clean the way of compiling Hadoop on Ubuntu.

<!--more-->

### 1.Initiation
At first, the Eclipse and the work-space must be configured appropriately with the code of Hadoop(I use the version CDH5 modified by Cloudera).\\
Then, there are some installation work with Maven and the configuration of the Repositories of Maven.

### 2.Compile
With some modify of the MapReduce core source code, the code must be packaged and deployed to every node of the cluster.\\
The command is below:

~~~ bash
mvn install -DskipTests
~~~

You may with some errors telling you that some tools must be installed before compiling.\\
Just like Findbugs and Protobuf, they can be easily installed by yourself.
