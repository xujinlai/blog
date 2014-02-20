---
layout: post
title: "【转】Mahout学习——K-Means Clustering"
id: 34001
date: 2013-11-26 09:32:44
tags: 
- Clustering
- Hadoop
- Mahout
categories: 
- Hadoop
---

这几天来看了一些hadoop相关的书，发现这个叫做mahout的库非常的有用，在这里mark一下

并找了一些相关的文章，这里是其中一篇，写的挺不错的。

转自：[http://www.cnblogs.com/vivounicorn/archive/2011/10/08/2201986.html](http://www.cnblogs.com/vivounicorn/archive/2011/10/08/2201986.html)

--------------------正文开始--------------------

K-Means这个词第一次使用是在1967，但是它的思想可以追溯到1957年，它是一种非常简单地基于距离的聚类算法，认为每个Cluster由相似的点组成而这种相似性由距离来衡量，不同Cluster间的点应该尽量不相似，每个Cluster都会有一个&ldquo;重心&rdquo;；另外它也是一种排他的算法，即任意点必然属于某一Cluster且只属于该Cluster。当然它的缺点也比较明显，例如：对于孤立点敏感、产生最终聚类之间规模的差距不大。

## 一、基本思想

### 1、数学描述

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 给定d维实数向量(![x_1,x_2,quad ...quad x_n](http://chart.apis.google.com/chart?cht=tx&amp;chl=x_1%2cx_2%2c%5cquad+...%5cquad+x_n))，后面就将这个实数向量称作**点**吧，短！K-Means算法会根据事先制定的参数k，将这些点划分出k个Cluster(k &le; n)，而划分的标准是最小化点与Cluster重心(均值)的距离平方和，假设这些Cluster为：![C={C_1,C_2,...,C_k}](http://chart.apis.google.com/chart?cht=tx&amp;chl=C%3d%7bC_1%2cC_2%2c...%2cC_k%7d)，则数学描述如下：

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![arg_Cmin sum limit_{i=1}^{k} sum limit_{x_j in C_i}{||x_j-mu_i||}^2 ](http://chart.apis.google.com/chart?cht=tx&amp;chl=arg_Cmin+%5csum+%5climit_%7bi%3d1%7d%5e%7bk%7d+%5csum+%5climit_%7bx_j+%5cin+C_i%7d%7b%7c%7cx_j-%5cmu_i%7c%7c%7d%5e2%0a)，其中![mu_i](http://chart.apis.google.com/chart?cht=tx&amp;chl=%5cmu_i)为第i个Cluster的&ldquo;重心&rdquo;(Cluster中所有点的平均值)。

&nbsp;&nbsp;&nbsp;&nbsp; 聚类的效果类似下图：

[![image](http://images.cnblogs.com/cnblogs_com/vivounicorn/201110/201110081258098212.png "image")](http://images.cnblogs.com/cnblogs_com/vivounicorn/201110/201110081258013739.png)

具体可见：[http://en.wikipedia.org/wiki/K-means_clustering](http://en.wikipedia.org/wiki/K-means_clustering "http://en.wikipedia.org/wiki/K-means_clustering")

### 2、算法步骤

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 典型的算法如下，它是一种迭代的算法：

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (1)、根据事先给定的k值建立初始划分，得到k个Cluster，比如，可以随机选择k个点作为k个Cluster的重心，又或者用Canopy Clustering得到的Cluster作为初始重心(当然这个时候k的值由Canopy Clustering得结果决定)；

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (2)、计算每个点到各个Cluster重心的距离，将它加入到最近的那个Cluster；

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (3)、重新计算每个Cluster的重心；

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (4)、重复过程2~3，直到各个Cluster重心在某个精度范围内不变化或者达到最大迭代次数。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 别看算法简单，很多复杂算法的实际效果或许都不如它，而且它的局部性较好，容易并行化，对大规模数据集很有意义；算法时间复杂度是：O(nkt)，其中：n 是聚类点个数，k 是Cluster个数，t 是迭代次数。

&nbsp;

## 三、并行化策略

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; K-Means较好地局部性使它能很好的被并行化。第一阶段，生成Cluster的过程可以并行化，各个Slaves读取存在本地的数据集，用上述算法生成Cluster集合，最后用若干Cluster集合生成第一次迭代的全局Cluster集合，然后重复这个过程直到满足结束条件，第二阶段，用之前得到的Cluster进行聚类操作。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 用map-reduce描述是：datanode在map阶段读出位于本地的数据集，输出每个点及其对应的Cluster；combiner操作对位于本地包含在相同Cluster中的点进行reduce操作并输出，reduce操作得到全局Cluster集合并写入HDFS。

&nbsp;

## 四、Mahout K-Means Clustering说明

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; mahout实现了标准K-Means Clustering，思想与前面相同，一共使用了2个map操作、1个combine操作和1个reduce操作，每次迭代都用1个map、1个combine和一个reduce操作得到并保存全局Cluster集合，迭代结束后，用一个map进行聚类操作。可以在mahout-core下的src/main/java中的package：org.apache.mahout.clustering.kmeans中找到相关代码：

[![image](http://images.cnblogs.com/cnblogs_com/vivounicorn/201110/201110081258205595.png "image")](http://images.cnblogs.com/cnblogs_com/vivounicorn/201110/201110081258137991.png)

### 1、数据模型

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 可以参见[上一篇](http://www.cnblogs.com/vivounicorn/archive/2011/09/23/2186483.html)相同标题。

&nbsp;

### 2、目录结构

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 从目录结构上说，需要两个输入目录：一个用于保存数据点集&mdash;&mdash;input，一个用来保存点的初始划分&mdash;&mdash;clusters；在形成Cluster的阶段，每次迭代会生成一个目录，上一次迭代的输出目录会作为下一次迭代的输入目录，这种目录的命名为：Clusters-&ldquo;迭代次数&rdquo;；最终聚类点的结果会放在clusteredPoints文件夹中而Cluster信息放在Clusters-&ldquo;最后一次迭代次数&rdquo;文件夹中。

&nbsp;

### 3、如何抽象Cluster

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 可以从Cluster.java及其父类，对于Cluster，mahout实现了一个抽象类AbstractCluster封装Cluster，具体说明可以参考上一篇文章，这里做个简单说明：

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (1）、private int id; #**每个K-Means算法产生的Cluster的id**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (2）、private long numPoints; #**Cluster中包含点的个数，这里的点都是Vector**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (3）、private Vector center; #**Cluster的重心，这里就是平均值，由s0和s1计算而来。**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (4）、private Vector Radius; #**Cluster的半径，这个半径是各个点的标准差，反映组内个体间的离散程度，由s0、s1和s2计算而来。**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (5）、private double s0; #**表示<strong>Cluster**包含点的权重之和，![s_0=sumlimit_{i=0}^{n}{w_i}](http://chart.apis.google.com/chart?cht=tx&amp;chl=s_0%3d%5csum%5climit_%7bi%3d0%7d%5e%7bn%7d%7bw_i%7d)</strong>

**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**(6）、private Vector s1; #**表示<strong>Cluster**包含点的加权和，![s_1=sumlimit_{i=0}^{n}{x_iw_i} ](http://chart.apis.google.com/chart?cht=tx&amp;chl=s_1%3d%5csum%5climit_%7bi%3d0%7d%5e%7bn%7d%7bx_iw_i%7d+)</strong>

**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**(7）、private Vector s2; #**表示<strong>Cluster**包含点平方的加权和，![s_2=sumlimit_{i=0}^{n}{x_i^2w_i} ](http://chart.apis.google.com/chart?cht=tx&amp;chl=s_2%3d%5csum%5climit_%7bi%3d0%7d%5e%7bn%7d%7bx_i%5e2w_i%7d+)</strong>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (8）、public void computeParameters(); #**根据s0、s1、s2计算numPoints、center和Radius**：

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![ numPoints={(int)}s0](http://chart.apis.google.com/chart?cht=tx&amp;chl=+numPoints%3d%7b(int)%7ds0)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![center=s1/s0](http://chart.apis.google.com/chart?cht=tx&amp;chl=center%3ds1%2fs0)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![radius=frac{sqrt{s2quad s0 -s1quad s1}}{s0}  ](http://chart.apis.google.com/chart?cht=tx&amp;chl=radius%3d%5cfrac%7b%5csqrt%7bs2%5cquad+s0+-s1%5cquad+s1%7d%7d%7bs0%7d+%0a)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![s0 = 0](http://chart.apis.google.com/chart?cht=tx&amp;chl=s0+%3d+0)&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![s1 = null](http://chart.apis.google.com/chart?cht=tx&amp;chl=s1+%3d+null)&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![s2 = null](http://chart.apis.google.com/chart?cht=tx&amp;chl=s2+%3d+null)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 这几个操作很重要，**最后三步很必要**，在后面会做说明。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (9）、public void observe(VectorWritable x, double weight); #**每当有一个新的点加入当前Cluster时都需要更新s0、s1、s2的值**&nbsp;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (10)、public ClusterObservation getObservations(); #**这个操作在combine操作时会经常被用到，它会返回由s0、s1、s2初始化的ClusterObservation对象，表示当前Cluster中包含的所有被观察过的点**

&nbsp;

## 五、K-Means Clustering的Map-Reduce实现

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; K-Means Clustering的实现同样包含单机版和MR两个版本，单机版就不说了，MR版用了两个map操作、一个combine操作和一个reduce操作，是通过两个不同的job触发，用Dirver来组织的，map和reduce阶段执行顺序是：

### [![image](http://images.cnblogs.com/cnblogs_com/vivounicorn/201110/201110081258253181.png "image")](http://images.cnblogs.com/cnblogs_com/vivounicorn/201110/20111008125822937.png)

图1

### 1、初始划分的形成

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; K-Means算法需要一个对数据点的初始划分，mahout里用了两种方法（以Iris dataset前3个feature为例）：

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (1)、使用RandomSeedGenerator类

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 在指定clusters目录生成k个初始划分并以Sequence File形式存储，其选择方法希望能尽可能不让孤立点作为Cluster重心，大概流程如下：

[![image](http://images.cnblogs.com/cnblogs_com/vivounicorn/201110/201110081258333369.png "image")](http://images.cnblogs.com/cnblogs_com/vivounicorn/201110/201110081258293275.png)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 图2

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (2)、使用Canopy Clustering

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Canopy Clustering常常用来对初始数据做一个粗略的划分，它的结果可以为之后代价较高聚类提供帮助，个人觉得Canopy Clustering用在数据预处理上要比单纯拿来聚类更有用，比如对K-Means来说提供k值，另外还能很好的处理孤立点，当然，需要人工指定的参数由k变成了T1、T2，T1和T2所起的作用是缺一不可的，**T1决定了每个Cluster包含点的数目，这直接影响了Cluster的&ldquo;重心&rdquo;和&ldquo;半径&rdquo;，而T2则决定了Cluster的数目，T2太大会导致只有一个Cluster，而太小则会出现过多的Cluster**。通过实验，T1和T2取值会严重影响到算法的效果，如何确定T1和T2，似乎可以用AIC、BIC或者交叉验证去做，但是我没有找到具体做法，希望各位高人给指条明路:)。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 以Iris为例，canopy方法选择T1=3、T2=1.5、cd=0.5、x=10，两种方法结果的前三个维度比较如下：

[![image](http://images.cnblogs.com/cnblogs_com/vivounicorn/201110/201110081258476933.png "image")](http://images.cnblogs.com/cnblogs_com/vivounicorn/201110/201110081258397726.png)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 图3

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 从图中不同Cluster的交界情况可以看出这两种方法的不同效果。

### 2、配置Cluster信息

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; K-Means算法的MR实现，第一次迭代需要将随机方法或者Canopy Clustering方法结果目录作为kmeans第一次迭代的输入目录，接下来的每次迭代都需要将上次迭代的**输出**目录作为本次迭代的**输入**目录，这就需要能在每次kmeans map和kmeans reduce操作前从该目录得到Cluster的信息，这个功能由KMeansUtil.configureWithClusterInfo实现，它依据指定的HDFS目录将Canopy Cluster或者上次迭代Cluster的信息存储到一个Collection中，这个方法在之后的每个map和reduce操作中都需要。

### 3、KMeansMapper

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 对照[上一篇](http://www.cnblogs.com/vivounicorn/archive/2011/09/23/2186483.html)第三节关于MR的那幅图，map操作之前的InputFormat、Split、RR与上一篇完全相同。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (1)、KMeansMapper接收的是(WritableComparable&lt;?&gt;, VectorWritable) Pair，setup方法利用KMeansUtil.configureWithClusterInfo得到上一次迭代的Clustering结果，map操作需要依据这个结果聚类。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (2)、每个slave机器会分布式的处理存在硬盘上的数据，依据之前得到得Cluster信息，用emitPointToNearestCluster方法将每个点加入到与其距离最近的Cluster，输出结果为(与当前点距离最近Cluster的ID, 由当前点包装而成的ClusterObservations) Pair。

### 4、KMeansCombiner

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; combiner操作是一个本地的reduce操作，发生在map之后，reduce之前：

### 5、KMeansReducer

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 很直白的的操作，只是在setup的时候稍复杂。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (1)、setup操作的目的是读取初始划分或者上次迭代的结果，构建Cluster信息，同时做了Map&lt;Cluster的ID,Cluster&gt;映射，方便从ID找Cluster。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (2)、reduce操作非常直白，将从combiner传来的&lt;Cluster ID，ClusterObservations&gt;进行汇总；

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; computeConvergence用来判断当前Cluster是否收敛，即新的&ldquo;重心&rdquo;与老的&ldquo;重心&rdquo;距离是否满足之前传入的精度要求；

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Last but not least，注意到有个cluster.computeParameters()操作，这个操作非常重要，它保证了本次迭代的结果不会影响到下次迭代，也就是保证了能够&ldquo;重新计算每个Cluster的重心&rdquo;这一步骤**。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![ numPoints={(int)}s0](http://chart.apis.google.com/chart?cht=tx&amp;chl=+numPoints%3d%7b(int)%7ds0)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![center=s1/s0](http://chart.apis.google.com/chart?cht=tx&amp;chl=center%3ds1%2fs0)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![radius=frac{sqrt{s2quad s0 -s1quad s1}}{s0}  ](http://chart.apis.google.com/chart?cht=tx&amp;chl=radius%3d%5cfrac%7b%5csqrt%7bs2%5cquad+s0+-s1%5cquad+s1%7d%7d%7bs0%7d+%0a)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 前三个操作得到新的Cluster信息；

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![s0 = 0](http://chart.apis.google.com/chart?cht=tx&amp;chl=s0+%3d+0)&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![s1 = null](http://chart.apis.google.com/chart?cht=tx&amp;chl=s1+%3d+null)&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![s2 = null](http://chart.apis.google.com/chart?cht=tx&amp;chl=s2+%3d+null)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 后三个步骤清空S0、S1、S2信息，保证下次迭代所需的Cluster信息是&ldquo;干净&rdquo;的。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 之后，reduce将(Cluster ID, Cluster) Pair写入到HDFS中以&rdquo;clusters-迭代次数&ldquo;命名的文件夹中。

### 6、KMeansClusterMapper

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 之前的MR操作用于构建Cluster信息，KMeansClusterMapper则用构造好的Cluster信息来聚类。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (1)、setup依然是从指定目录读取并构建Cluster信息；

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (2)、map操作通过计算每个点到各Cluster&ldquo;重心&rdquo;的距离完成聚类操作，可以看到map操作结束，所有点就都被放在唯一一个与之距离最近的Cluster中了，因此之后并不需要reduce操作。

### 7、KMeansDriver

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 如果把前面的KMeansMapper、KMeansCombiner、KMeansReducer、KMeansClusterMapper看做是砖的话，KMeansDriver就是盖房子的人，它用来组织整个kmeans算法流程(包括单机版和MR版)。示意图如下：

[![image](http://images.cnblogs.com/cnblogs_com/vivounicorn/201110/201110081258584632.png "image")](http://images.cnblogs.com/cnblogs_com/vivounicorn/201110/201110081258531813.png)图4

&nbsp;

### 8、Example

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 在源码的/mahout-examples目录下的package org.apache.mahout.clustering.syntheticcontrol.kmeans中有个Job.java文件提供了对K-Means Clustering的一个版本。核心内容是两个run函数：第一个是用随机选择的方法确定初始划分；第二个是用Canopy 方法确定初始划分，需要注意的是，我们不需要Canopy 方法来做聚类操作，所以CanopyDriver.run的倒数第二个参数(runClustering)要设定为false。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; example的使用方法如下：

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ● 启动master和slave机器；

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ● 终端输入：**hadoop namenode &ndash;format**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ● 终端输入：start-all.sh

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ● 查看hadoop相关进程是否启动，终端输入：jps

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ● 在HDFS创建testdata目录，终端输入：hadoop dfs -mkdir testdata

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ● 将[http://archive.ics.uci.edu/ml/](http://archive.ics.uci.edu/ml/ "http://archive.ics.uci.edu/ml/")中Iris数据集下载，更改一下数据格式，将数据集中&ldquo;，&rdquo;替换为&ldquo; &rdquo;(空格)，并上传到HDFS的testdata文件夹中，进入Iris目录，终端输入：**hadoop dfs -put iris.txt testdata/**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ● 用Canopy 方法确定初始划分，参数取值为：t1=3，t2=1.5，convergenceDelta=0.5，maxIter=10，进入mahout目录，确认终端执行ls后可以看到mahout-examples-0.5-job.jar这个文件，终端执行：**hadoop jar mahout-examples-0.5-job.jar org.apache.mahout.clustering.syntheticcontrol.kmeans.Job -i testdata -o output -t1 3 -t2 1.5 -cd 0.5 -x 10**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ● 在[http://localhost:50030/jobtracker.jsp](http://localhost:50030/jobtracker.jsp)&nbsp;查看作业执行情况：

[![image](http://images.cnblogs.com/cnblogs_com/vivounicorn/201110/20111008125922727.png "image")](http://images.cnblogs.com/cnblogs_com/vivounicorn/201110/201110081259086149.png)图5

&nbsp;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 从HDFS上可以看到以下几个目录：

[![image](http://images.cnblogs.com/cnblogs_com/vivounicorn/201110/201110081259419236.png "image")](http://images.cnblogs.com/cnblogs_com/vivounicorn/201110/201110081259308407.png)

图6

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; job_201110082236_0001是由InputDriver对原始数据集的一个预处理，输入目录是：testdata，输出目录是：output/data

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; job_201110082236_0002是由CanopyDriver发起的对data的初始划分，输入目录是：output/data，输出目录是：output/clusters-0

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; job_201110082236_0003是由KmeansDriver发起的构建Cluster的第一次迭代，输入目录是：output/clusters-0，输出目录是：output/clusters-1

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; job_201110082236_0004是由KmeansDriver发起的构建Cluster的第二次迭代，输入目录是：output/clusters-1，输出目录是：output/clusters-2

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; job_201110082236_0005是由KmeansDriver发起的Clustering，输入目录是：output/data，输出目录是：output/clusteredPoints

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 可见，要查看最终结果需要两个信息：Cluster信息和Clustering data后点的信息，它们分别存储在HDFS的最后一次迭代目录output/clusters-2和聚类点目录output/clusteredPoints。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ● 查看结果，将结果获取到本地，终端输入：**bin/mahout clusterdump --seqFileDir /user/leozhang/output/clusters-2 --pointsDir /user/leozhang/output/clusteredPoints --output result.txt**，终端输入：ls可以看到result.txt这个文件，文件内容类似：

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ● 为了能比较直观的查看数据，可以利用R(可以使用强大的RStudio，需要安装rgl)，我将数据整理到以下链接：[http://files.cnblogs.com/vivounicorn/data%26result.rar](http://files.cnblogs.com/vivounicorn/data%26result.rar "http://files.cnblogs.com/vivounicorn/data%26result.rar")&nbsp;，分组显示数据前三维，不同Cluster用不同颜色表示。效果类似于**图3**，代码类似于：

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 执行pca &lt;- read.table(ttt,header=TRUE)可能会报错：Error in read.table(ttt, header = TRUE) : more columns than column names，没关系，再重新执行一下这句就行了。

&nbsp;

## 六、总结

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; K-Means Clustering是基于距离的排他的划分方法，初始划分对它很重要，mahout里实现了两种方法：随机方法和Canopy方法，前者比较简单，但孤立点会对其Clustering效果造成较大影响，后者对孤立点的处理能力很强但是需要确定的参数多了一个且如何合理取值需要探讨。

&nbsp;

&nbsp;

&nbsp;

## 七、参考资料

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1、[http://mahout.apache.org/](http://mahout.apache.org/)&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2、[https://cwiki.apache.org/MAHOUT/k-means-clustering.html](https://cwiki.apache.org/MAHOUT/k-means-clustering.html "https://cwiki.apache.org/MAHOUT/k-means-clustering.html")&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3、[http://developer.yahoo.com/hadoop/tutorial/](http://developer.yahoo.com/hadoop/tutorial/)&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4、[http://www.ibm.com/developerworks/cn/web/1103_zhaoct_recommstudy3/](http://www.ibm.com/developerworks/cn/web/1103_zhaoct_recommstudy3/)&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5、[http://grepcode.com/file/repo1.maven.org/maven2/org.apache.mahout/mahout-utils/0.5/org/apache/mahout/clustering/conversion/InputDriver.java#InputDriver](http://grepcode.com/file/repo1.maven.org/maven2/org.apache.mahout/mahout-utils/0.5/org/apache/mahout/clustering/conversion/InputDriver.java#InputDriver "http://grepcode.com/file/repo1.maven.org/maven2/org.apache.mahout/mahout-utils/0.5/org/apache/mahout/clustering/conversion/InputDriver.java#InputDriver")

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 6、http://faculty.chass.ncsu.edu/garson/PA765/cluster.htm