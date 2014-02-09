---
title: Google Spanner原理- 全球级的分布式数据库
link: http://seeksky.duapp.com/index.php/google-spanner%e5%8e%9f%e7%90%86-%e5%85%a8%e7%90%83%e7%ba%a7%e7%9a%84%e5%88%86%e5%b8%83%e5%bc%8f%e6%95%b0%e6%8d%ae%e5%ba%93/
author: xujinlai
description: 
post_id: 18003
created: 2013/11/26 09:32:44
created_gmt: 2013/11/26 09:32:44
comment_status: open
post_name: google-spanner%e5%8e%9f%e7%90%86-%e5%85%a8%e7%90%83%e7%ba%a7%e7%9a%84%e5%88%86%e5%b8%83%e5%bc%8f%e6%95%b0%e6%8d%ae%e5%ba%93
status: publish
layout: post
---

<!--Spanner 是Google的全球级的分布式数据库 (Globally-Distributed Database) 。Spanner的扩展性达到了令人咋舌的全球级，可以扩展到数百万的机器，数已百计的数据中心，上万亿的行。更给力的是，除了夸张的扩展性之外，他还能同时通过同步复制和多版本来满足外部一致性，可用性也是很好的。冲破CAP的枷锁，在三者之间完美平衡。-->

# Google Spanner原理- 全球级的分布式数据库

EMC中国研究院的研究员[颜开](http://weibo.com/yankaycom)又在自己博客上[分析了Google的全球级分布式数据库Spanner](http://www.yankay.com/google-spanner%E5%8E%9F%E7%90%86-%E5%85%A8%E7%90%83%E7%BA%A7%E7%9A%84%E5%88%86%E5%B8%83%E5%BC%8F%E6%95%B0%E6%8D%AE%E5%BA%93/)，他重点分析了Spanner的背景、设计和并发控制。

转自：

http://www.yankay.com/google-spanner%E5%8E%9F%E7%90%86-%E5%85%A8%E7%90%83%E7%BA%A7%E7%9A%84%E5%88%86%E5%B8%83%E5%BC%8F%E6%95%B0%E6%8D%AE%E5%BA%93/

 

##### Google Spanner简介

Spanner 是Google的全球级的分布式数据库 (Globally-Distributed Database) 。Spanner的扩展性达到了令人咋舌的全球级，可以扩展到数百万的机器，数已百计的数据中心，上万亿的行。更给力的是，除了夸张的扩展性之外，他还能同时通过同步复制和多版本来满足外部一致性，可用性也是很好的。冲破CAP的枷锁，在三者之间完美平衡。

![](http://yankaycom-wordpress.stor.sinaapp.com/uploads/2012/12/13479630216652_f.jpg)

Spanner是个可扩展，多版本，全球分布式还支持同步复制的数据库。他是Google的第一个可以全球扩展并且支持外部一致的事务。Spanner能做到这些，离不开一个用GPS和原子钟实现的时间API。这个API能将数据中心之间的时间同步精确到10ms以内。因此有几个给力的功能：无锁读事务，原子schema修改，读历史数据无block。

[EMC中国研究院](http://qing.weibo.com/2294942122/88ca09aa3300221n.html)实时紧盯业界动态，Google最近发布的一篇论文《[Spanner: Google's Globally-Distributed Database](http://research.google.com/archive/spanner.html)》, 笔者非常感兴趣，对Spanner进行了一些调研，并在这里分享。由于Spanner并不是开源产品，笔者的知识主要来源于Google的公开资料，通过现有公开资料仅仅只能窥得Spanner的沧海一粟，Spanner背后还依赖有大量Google的专有技术。研究院[原文](http://qing.weibo.com/2294942122/88ca09aa3300221n.html)。

下文主要是Spanner的背景，设计和并发控制。

##### Spanner背景

要搞清楚Spanner原理，先得了解Spanner在Google的定位。

![](http://yankaycom-wordpress.stor.sinaapp.com/uploads/2012/12/13479632808586_f.jpg)

从上图可以看到。Spanner位于F1和GFS之间，承上启下。所以先提一提F1和GFS。

###### F1

和众多互联网公司一样，在早期Google大量使用了Mysql。Mysql是单机的，可以用Master-Slave来容错，分区来扩展。但是需要大量的手工运维工作，有很多的限制。因此Google开发了一个可容错可扩展的RDBMS——F1。和一般的分布式数据库不同，F1对应RDMS应有的功能，毫不妥协。起初F1是基于Mysql的，不过会逐渐迁移到Spannerr。

F1有如下特点：

  * 7×24高可用。哪怕某一个数据中心停止运转，仍然可用。
  * 可以同时提供强一致性和弱一致。
  * 可扩展
  * 支持SQL