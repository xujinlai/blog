---
title: 有关lyapunov optimization的学习笔记哦，原创的（第0篇之先看看wiki的解释）
link: http://seeksky.duapp.com/index.php/%e6%9c%89%e5%85%b3lyapunov-optimization%e7%9a%84%e5%ad%a6%e4%b9%a0%e7%ac%94%e8%ae%b0%e5%93%a6%ef%bc%8c%e5%8e%9f%e5%88%9b%e7%9a%84%ef%bc%88%e7%ac%ac0%e7%af%87%e4%b9%8b%e5%85%88%e7%9c%8b%e7%9c%8bwiki/
author: xujinlai
description: 
post_id: 25001
created: 2013/11/26 09:32:44
created_gmt: 2013/11/26 09:32:44
comment_status: open
post_name: %e6%9c%89%e5%85%b3lyapunov-optimization%e7%9a%84%e5%ad%a6%e4%b9%a0%e7%ac%94%e8%ae%b0%e5%93%a6%ef%bc%8c%e5%8e%9f%e5%88%9b%e7%9a%84%ef%bc%88%e7%ac%ac0%e7%af%87%e4%b9%8b%e5%85%88%e7%9c%8b%e7%9c%8bwiki
status: publish
layout: post
---

<!--最近在学习lyapunov optimization，试着看了一些解释，自己决定整理一下，为广大人民造福，为人类的进步做贡献，仅此献给我逝去的宝贵青春和智商
<br /><br /><br />这一篇就是讲讲wiki上面怎么扯的，确实是扯，因为有几个公式推不通-->

# 有关lyapunov optimization的学习笔记哦，原创的（第0篇之先看看wiki的解释）

关于lyapunov optimization看了一些资料

包括之前看的那一篇论文：

infocom2013年的

Profit-Maximizing Virtual Machine Trading in

a Federation of Selfish Clouds

Hongxing Li_, Chuan Wu _, Zongpeng Li† and Francis C.M. Lau_

_Department of Computer Science, The University of Hong Kong, Hong Kong, Email: {hxli, cwu, fcmlau}@cs.hku.hk

†Department of Computer Science, University of Calgary, Canada, Email: [zongpeng@ucalgary.ca](mailto:zongpeng@ucalgary.ca)

  


  


这里做一些摘录和说明：

先是wiki上的：

前面这里就不紧扯了，就是介绍一下这个方法，大致的意思就是很牛逼，对动态系统有效，队列网络什么的

# Lyapunov optimization

From Wikipedia, the free encyclopedia

This article describes Lyapunov optimization for dynamical systems. It gives an example application to optimal control in queueing networks.

 

## Contents

   [[hide](http://en.wikipedia.org/wiki/Lyapunov_optimization)] 

  * [1 Introduction](http://en.wikipedia.org/wiki/Lyapunov_optimization#Introduction)
  * [2 Lyapunov drift for queueing networks](http://en.wikipedia.org/wiki/Lyapunov_optimization#Lyapunov_drift_for_queueing_networks)
    * [2.1 Quadratic Lyapunov functions](http://en.wikipedia.org/wiki/Lyapunov_optimization#Quadratic_Lyapunov_functions)
    * [2.2 Bounding the Lyapunov drift](http://en.wikipedia.org/wiki/Lyapunov_optimization#Bounding_the_Lyapunov_drift)
    * [2.3 A basic Lyapunov drift theorem](http://en.wikipedia.org/wiki/Lyapunov_optimization#A_basic_Lyapunov_drift_theorem)
  * [3 Lyapunov optimization for queueing networks](http://en.wikipedia.org/wiki/Lyapunov_optimization#Lyapunov_optimization_for_queueing_networks)