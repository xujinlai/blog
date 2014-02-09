---
title: Google Dremel 原理 - 如何能3秒分析1PB
link: http://seeksky.duapp.com/index.php/google-dremel-%e5%8e%9f%e7%90%86-%e5%a6%82%e4%bd%95%e8%83%bd3%e7%a7%92%e5%88%86%e6%9e%901pb/
author: xujinlai
description: 
post_id: 21002
created: 2013/11/26 09:32:44
created_gmt: 2013/11/26 09:32:44
comment_status: open
post_name: google-dremel-%e5%8e%9f%e7%90%86-%e5%a6%82%e4%bd%95%e8%83%bd3%e7%a7%92%e5%88%86%e6%9e%901pb
status: publish
layout: post
---

<!--Dremel 是Google 的“交互式”数据分析系统。可以组建成规模上千的集群，处理PB级别的数据。MapReduce处理一个数据，需要分钟级的时间。作为MapReduce的发起人，Google开发了Dremel将处理时间缩短到秒级，作为MapReduce的有力补充。Dremel作为Google BigQuery的report引擎，获得了很大的成功。最近Apache计划推出Dremel的开源实现Drill，将Dremel的技术又推到了浪尖上。-->

# Google Dremel 原理 - 如何能3秒分析1PB

##### 简介

Dremel 是Google 的“交互式”数据分析系统。可以组建成规模上千的集群，处理PB级别的数据。MapReduce处理一个数据，需要分钟级的时间。作为MapReduce的发起人，Google开发了Dremel将处理时间缩短到秒级，作为MapReduce的有力补充。Dremel作为Google BigQuery的report引擎，获得了很大的成功。最近Apache计划推出Dremel的开源实现Drill，将Dremel的技术又推到了浪尖上。

##### Google Dremel设计

根据Google公开的论文《[Dremel: Interactive Analysis of WebScaleDatasets](http://research.google.com/pubs/pub36632.html)》可以看到Dremel的设计原理。还有一些测试报告。论文写于2006年，公开于2010年，Google在处理大数据方面，果真有得天独厚的优势。下面的内容，很大部分来自这篇论文。

随着Hadoop的流行，大规模的数据分析系统已经越来越普及。数据分析师需要一个能将数据“玩转”的交互式系统。如此，就可以非常方便快捷的浏览数据，建立分析模型。Dremel系统有下面几个主要的特点：

  * **Dremel****是一个大规模系统。**在一个PB级别的数据集上面，将任务缩短到秒级，无疑需要大量的并发。磁盘的顺序读速度在100MB/S上下，那么在1S内处理1TB数据，意味着至少需要有1万个磁盘的并发读! Google一向是用廉价机器办大事的好手。但是机器越多，出问题概率越大，如此大的集群规模，需要有足够的容错考虑，保证整个分析的速度不被集群中的个别慢(坏)节点影响。
  * **Dremel****是MR****交互式查询能力不足的补充。**和MapReduce一样，Dremel也需要和数据运行在一起，将计算移动到数据上面。所以它需要GFS这样的文件系统作为存储层。在设计之初，Dremel并非是MapReduce的替代品，它只是可以执行非常快的分析，在使用的时候，常常用它来处理MapReduce的结果集或者用来建立分析原型。
  * **Dremel****的数据模型是嵌套(nested)****的。**互联网数据常常是非关系型的。Dremel还需要有一个灵活的数据模型，这个数据模型至关重要。Dremel支持一个嵌套(nested)的数据模型，类似于Json。而传统的关系模型，由于不可避免的有大量的Join操作，在处理如此大规模的数据的时候，往往是有心无力的。
  * **Dremel****中的数据是用列式存储的。**使用列式存储，分析的时候，可以只扫描需要的那部分数据的时候，减少CPU和磁盘的访问量。同时列式存储是压缩友好的，使用压缩，可以综合CPU和磁盘，发挥最大的效能。对于关系型数据，如果使用列式存储，我们都很有经验。但是对于嵌套(nested)的结构，Dremel也可以用列存储，非常值得我们学习。
  * **Dremel****结合了Web****搜索 ****和并行DBMS****的技术。**首先，他借鉴了Web搜索中的“查询树”的概念，将一个相对巨大复杂的查询，分割成较小较简单的查询。大事化小，小事化了，能并发的在大量节点上跑。其次，和并行DBMS类似，Dremel可以提供了一个SQL-like的接口，就像Hive和Pig那样。

#### Google Dremel应用场景

设想一个使用场景。我们的美女数据分析师，她有一个新的想法要验证。要验证她的想法，需要在一个上亿条数据上面，跑一个查询，看看结果和她的想法是不是一样，她可不希望等太长时间，最好几秒钟结果就出来。当然她的想法不一定完善，还需要不断调整语句。然后她验证了想法，发现了数据中的价值。最后，她可以将这个语句完善成一个长期运行的任务。

对于Google,数据一开始是放在GFS上的。可以通过MapReduce将数据导入到Dremel中去，在这些MapReduce中还可以做一些处理。然后分析师使用Dremel，轻松愉悦的分析数据，建立模型。最后可以编制成一个长期运行的MapReduce任务。