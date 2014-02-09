---
title: [转载]Running Hadoop on Ubuntu Linux (Single-Node Cluster)(apache官方推荐hadoop指南哦！)
link: http://seeksky.duapp.com/index.php/%e8%bd%ac%e8%bd%bdrunning-hadoop-on-ubuntu-linux-single-node-clusterapache%e5%ae%98%e6%96%b9%e6%8e%a8%e8%8d%90hadoop%e6%8c%87%e5%8d%97%e5%93%a6%ef%bc%81/
author: xujinlai
description: 
post_id: 29001
created: 2013/11/26 09:32:44
created_gmt: 2013/11/26 09:32:44
comment_status: open
post_name: %e8%bd%ac%e8%bd%bdrunning-hadoop-on-ubuntu-linux-single-node-clusterapache%e5%ae%98%e6%96%b9%e6%8e%a8%e8%8d%90hadoop%e6%8c%87%e5%8d%97%e5%93%a6%ef%bc%81
status: publish
layout: post
---

<!--转自：http://www.michael-noll.com/tutorials/running-hadoop-on-ubuntu-linux-single-node-cluster/
<br />
<br />这篇是haddop官方推荐的指南，写的非常详细
<br />
<br />感谢作者的辛勤耕耘-->

# [转载]Running Hadoop on Ubuntu Linux (Single-Node Cluster)(apache官方推荐hadoop指南哦！)

转自：<http://www.michael-noll.com/tutorials/running-hadoop-on-ubuntu-linux-single-node-cluster/>

这篇是haddop官方推荐的指南，写的非常详细

感谢作者的辛勤耕耘

\----------------正文开始-----------------

n this tutorial I will describe the required steps for setting up a _pseudo-distributed, single-node_ Hadoop cluster backed by the Hadoop Distributed File System, running on Ubuntu Linux.

Are you looking for the [multi-node cluster tutorial](http://www.michael-noll.com/tutorials/running-hadoop-on-ubuntu-linux-multi-node-cluster/)? Just [head over there](http://www.michael-noll.com/tutorials/running-hadoop-on-ubuntu-linux-multi-node-cluster/).

Hadoop is a framework written in Java for running applications on large clusters of commodity hardware and incorporates features similar to those of the [Google File System (GFS)](http://en.wikipedia.org/wiki/Google_File_System) and of the [MapReduce](http://en.wikipedia.org/wiki/MapReduce) computing paradigm. Hadoop’s [HDFS](http://hadoop.apache.org/hdfs/docs/current/hdfs_design.html) is a highly fault-tolerant distributed file system and, like Hadoop in general, designed to be deployed on low-cost hardware. It provides high throughput access to application data and is suitable for applications that have large data sets.

The main goal of this tutorial is to get a simple Hadoop installation up and running so that you can play around with the software and learn more about it.

This tutorial has been tested with the following software versions:

  * [Ubuntu Linux](http://www.ubuntu.com/) 10.04 LTS (deprecated: 8.10 LTS, 8.04, 7.10, 7.04)
  * [Hadoop](http://hadoop.apache.org/) 1.0.3, released May 2012

![](http://www.michael-noll.com/blog/uploads/Yahoo-hadoop-cluster_OSCON_2007.jpeg)

Figure 1: Cluster of machines running Hadoop at Yahoo! (Source: Yahoo!)

# Prerequisites