---
title: 【转】hadoop杂记-为什么会有Map-reduce v2 (Yarn)
link: http://seeksky.duapp.com/index.php/%e3%80%90%e8%bd%ac%e3%80%91hadoop%e6%9d%82%e8%ae%b0-%e4%b8%ba%e4%bb%80%e4%b9%88%e4%bc%9a%e6%9c%89map-reduce-v2-yarn/
author: xujinlai
description: 
post_id: 36001
created: 2013/11/26 09:32:44
created_gmt: 2013/11/26 09:32:44
comment_status: open
post_name: %e3%80%90%e8%bd%ac%e3%80%91hadoop%e6%9d%82%e8%ae%b0-%e4%b8%ba%e4%bb%80%e4%b9%88%e4%bc%9a%e6%9c%89map-reduce-v2-yarn
status: publish
layout: post
---

<!--转自：http://www.cnblogs.com/LeftNotEasy/archive/2012/02/18/why-yarn.html
<br />
<br />这段时间在研究map-reduce模型，看到hadoop最近alpha版动作频繁，似乎有大动作
<br />
<br />yarn就是一个很好的例子，最近hadoop2.0放出来，其中最大的一个改变就是yarn的出现，这资源这一层独立出来
<br />
<br />相对于之前死板的map-reduce架构，这个重大的改变使hadoop可以支持更多的计算模型-->

# 【转】hadoop杂记-为什么会有Map-reduce v2 (Yarn)

转自：http://www.cnblogs.com/LeftNotEasy/archive/2012/02/18/why-yarn.html

这段时间在研究map-reduce模型，看到hadoop最近alpha版动作频繁，似乎有大动作

yarn就是一个很好的例子，最近hadoop2.0放出来，其中最大的一个改变就是yarn的出现，这资源这一层独立出来

相对于之前死板的map-reduce架构，这个重大的改变使hadoop可以支持更多的计算模型

\----------------分割线--------------------

## 前言：

有一段时间没有写博客了(发现这是我博客最常见的开头，不过这次间隔真的好长），前段时间事情比较多，所以耽搁得也很多。

现在准备计划写一个新的专题，叫做《hadoop杂记》，里面的文章有深有浅，文章不是按入门-中级-高级的顺序组织的，如果想看看从入门到深入的书，比较推荐《the definitive guide of hadoop》。

今天主要想写写关于map-reduce v2(或者叫map-reduce next generation，或者叫YARN)与之前的map-reduce有什么不同。最近在学习Yarn的过程中，也参考了很多人的博客，里面的介绍都各有所长。不过一个很重要的问题是，为什么需要一个Yarn，初看之后，也不觉得Yarn有什么特别的，就是把之前设计中的一块拆成了几块，仔细想想，方才明白其中的奥妙。

理解本文需要对老的Map-reduce框架有一定的了解。有朋友如果对hadoop以及大数据处理的架构、应用的咨询、讨论等等可以按下一段的联系方式与我联系。

**版权声明：**本文由leftnoteasy发布于[http://leftnoteasy.cnblogs.com](http://leftnoteasy.cnblogs.com/)，本文可以部分或者全部的被引用，但请注明出处，可以联系wheeleast (at) gmail.com, 也可以加我weibo:<http://weibo.com/leftnoteasy>

 

## Why Yarn：

### **Map-reduce****老矣，尚能饭否?**

第一次看到Yarn的问题，就需要问问，为什么要重新设计之前这样一个成熟的架构。

“The Apache Hadoop Map-reduce framework is showing it’s age, clearly”, 社区的Yarn设计文档 ”[MapReduce_NextGen-Architecture](https://issues.apache.org/jira/secure/attachment/12486023/MapReduce_NextGen_Architecture.pdf)”如是说。

目前的Map-reduce framework碰到了很多的问题，比如说过于大的内存消耗、不合理的线程模型设计、当集群规模增大后，扩展性/稳定性/性能的不足。这是目前hadoop的集群一直停留在Yahoo公布出来的3000台这个数量级上。

为了克服之前说道的问题，就需要对目前架构上进行重新思考，之后我会对新老Map-reduce架构上进行比较。

 

### **Yarn****的设计需求**

这里放上设计需求不是为了凑字数的，最近越来越发现设计需求是软件开发的灵魂，虽然需求常常变化可以唤醒植物人，不过一份好的设计需求可以让之后怎么走变得非常清晰。参考自Yarn设计文档：

**最优先的需求：**

· Reliability

· Availability

· Scalability - Clusters of 10000 nodes and 200,000 cores

· Backward Compatibility - Ensure customers’ Map-Reduce applications can run unchanged in the nextversion of the framework. Also implies forward compatibility. （向前兼容）

· Evolution – Ability for customers to control upgrades to the grid software stack.

· Predictable Latency – A major customer concern.

· Cluster utilization

**The second tier of requirements is****（优先级低一点的需求）:**

· Support for alternate programming paradigms to Map-Reduce

· Support for limited, short-lived services

这里解释一下这份需求，首先是可以支持非常大的集群规模，200k cores这个数字的确很惊人。

然后是向前兼容，之前大家都写了很多在map-reduce上面的程序，如果不能支持这些老的程序，老的用户怎么都不愿意切换到新版本上去。

另外集群资源最大化利用，这个之后会提一下

然后值得一提的是，支持增加除了Map-Reduce之外的计算模型，这个彰显了Hadoop想做领域霸主的决心，之前的Hadoop基本上就与Map-Reduce划上了等号，Map-Reduce干不了的事情，Hadoop基本上就干不了。Map-Reduce能做的事情有限（可以参考一下我之前的一篇[文章](http://www.cnblogs.com/LeftNotEasy/archive/2011/08/27/why-map-reduce-must-be-future-of-distributed-computing.html),在”hadoop的劣势”部分），简单的说就是，数据多，但是计算简单的时候，hadoop威力强大。如果计算逻辑复杂，需要搞个迭代至收敛之类的算法之类的，hadoop就玩不动了。如果能够在Hadoop上加入其他的计算模型，支持这种数据量不那么大，但是计算量大的场景，就防止一些挑剔的客户在这个问题上jjyy了。

最后说的支持limited, short-lived services还没有看到过更详细的说明，如果有人明白欢迎补充

 

### **老的Map-reduce设计**

下面给出一个设计图，

![clip_image001](http://images.cnblogs.com/cnblogs_com/LeftNotEasy/201202/201202182305096573.png)

**简单的介绍一下**