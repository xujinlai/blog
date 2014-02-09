---
title: 【转】Mahout学习——K-Means Clustering
link: http://seeksky.duapp.com/index.php/%e3%80%90%e8%bd%ac%e3%80%91mahout%e5%ad%a6%e4%b9%a0-k-means-clustering/
author: xujinlai
description: 
post_id: 34001
created: 2013/11/26 09:32:44
created_gmt: 2013/11/26 09:32:44
comment_status: open
post_name: %e3%80%90%e8%bd%ac%e3%80%91mahout%e5%ad%a6%e4%b9%a0-k-means-clustering
status: publish
layout: post
---

<!--这几天来看了一些hadoop相关的书，发现这个叫做mahout的库非常的有用，在这里mark一下
<br /><br />
<br /><br />并找了一些相关的文章，这里是其中一篇，写的挺不错的。
<br /><br />
<br /><br />转自：http://www.cnblogs.com/vivounicorn/archive/2011/10/08/2201986.html-->

# 【转】Mahout学习——K-Means Clustering

这几天来看了一些hadoop相关的书，发现这个叫做mahout的库非常的有用，在这里mark一下

并找了一些相关的文章，这里是其中一篇，写的挺不错的。

转自：<http://www.cnblogs.com/vivounicorn/archive/2011/10/08/2201986.html>

\--------------------正文开始--------------------

K-Means这个词第一次使用是在1967，但是它的思想可以追溯到1957年，它是一种非常简单地基于距离的聚类算法，认为每个Cluster由相似的点组成而这种相似性由距离来衡量，不同Cluster间的点应该尽量不相似，每个Cluster都会有一个“重心”；另外它也是一种排他的算法，即任意点必然属于某一Cluster且只属于该Cluster。当然它的缺点也比较明显，例如：对于孤立点敏感、产生最终聚类之间规模的差距不大。

## 一、基本思想

### 1、数学描述

      给定d维实数向量(![x_1,x_2,quad ...quad x_n](http://chart.apis.google.com/chart?cht=tx&chl=x_1%2cx_2%2c%5cquad+...%5cquad+x_n))，后面就将这个实数向量称作**点**吧，短！K-Means算法会根据事先制定的参数k，将这些点划分出k个Cluster(k ≤ n)，而划分的标准是最小化点与Cluster重心(均值)的距离平方和，假设这些Cluster为：![C={C_1,C_2,...,C_k}](http://chart.apis.google.com/chart?cht=tx&chl=C%3d%7bC_1%2cC_2%2c...%2cC_k%7d)，则数学描述如下：

                                                  ![arg_Cmin sum limit_{i=1}^{k} sum limit_{x_j in C_i}{||x_j-mu_i||}^2 ](http://chart.apis.google.com/chart?cht=tx&chl=arg_Cmin+%5csum+%5climit_%7bi%3d1%7d%5e%7bk%7d+%5csum+%5climit_%7bx_j+%5cin+C_i%7d%7b%7c%7cx_j-%5cmu_i%7c%7c%7d%5e2%0a)，其中![mu_i](http://chart.apis.google.com/chart?cht=tx&chl=%5cmu_i)为第i个Cluster的“重心”(Cluster中所有点的平均值)。

     聚类的效果类似下图：

![image](http://images.cnblogs.com/cnblogs_com/vivounicorn/201110/201110081258098212.png)

具体可见：<http://en.wikipedia.org/wiki/K-means_clustering>

### 2、算法步骤

      典型的算法如下，它是一种迭代的算法：

      (1)、根据事先给定的k值建立初始划分，得到k个Cluster，比如，可以随机选择k个点作为k个Cluster的重心，又或者用Canopy Clustering得到的Cluster作为初始重心(当然这个时候k的值由Canopy Clustering得结果决定)；

      (2)、计算每个点到各个Cluster重心的距离，将它加入到最近的那个Cluster；

      (3)、重新计算每个Cluster的重心；

      (4)、重复过程2~3，直到各个Cluster重心在某个精度范围内不变化或者达到最大迭代次数。

      别看算法简单，很多复杂算法的实际效果或许都不如它，而且它的局部性较好，容易并行化，对大规模数据集很有意义；算法时间复杂度是：O(nkt)，其中：n 是聚类点个数，k 是Cluster个数，t 是迭代次数。

 

## 三、并行化策略

      K-Means较好地局部性使它能很好的被并行化。第一阶段，生成Cluster的过程可以并行化，各个Slaves读取存在本地的数据集，用上述算法生成Cluster集合，最后用若干Cluster集合生成第一次迭代的全局Cluster集合，然后重复这个过程直到满足结束条件，第二阶段，用之前得到的Cluster进行聚类操作。

      用map-reduce描述是：datanode在map阶段读出位于本地的数据集，输出每个点及其对应的Cluster；combiner操作对位于本地包含在相同Cluster中的点进行reduce操作并输出，reduce操作得到全局Cluster集合并写入HDFS。

 

## 四、Mahout K-Means Clustering说明