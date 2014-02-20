---
layout: post
title: "有关lyapunov optimization的学习笔记哦，original的（第0篇之先看看wiki的解释）"
id: 25001
date: 2013-11-26 09:32:44
tags: 
- LyapunovOptimization
- Wiki
categories: 
- original
---

&nbsp;

关于lyapunov optimization看了一些资料
包括之前看的那一篇论文：
infocom2013年的
Profit-Maximizing Virtual Machine Trading in
a Federation of Selfish Clouds

Hongxing Li_, Chuan Wu&nbsp;_, Zongpeng Li&dagger;&nbsp;and Francis C.M. Lau_
_Department of Computer Science, The University of Hong Kong, Hong Kong, Email:&nbsp;{hxli, cwu, fcmlau}@cs.hku.hk
&dagger;Department of Computer Science, University of Calgary, Canada, Email:&nbsp;[zongpeng@ucalgary.ca](mailto:zongpeng@ucalgary.ca)

这里做一些摘录和说明：
先是wiki上的：
前面这里就不紧扯了，就是介绍一下这个方法，大致的意思就是很牛逼，对动态系统有效，队列网络什么的

# Lyapunov optimization

From Wikipedia, the free encyclopedia
[](http://en.wikipedia.org/wiki/Lyapunov_optimization#mw-head)[](http://en.wikipedia.org/wiki/Lyapunov_optimization#p-search)

This article describes Lyapunov optimization for dynamical systems. It gives an example application to optimal control in queueing networks.

&nbsp;

<table style="line-height: 1.5em; font-size: 12px; border: 1px solid #aaaaaa; background-color: #f9f9f9; padding: 5px;">
<tbody>
<tr>
<td>

## Contents

&nbsp;&nbsp;&nbsp;[[hide](http://en.wikipedia.org/wiki/Lyapunov_optimization)]&nbsp;

*   [1&nbsp;Introduction](http://en.wikipedia.org/wiki/Lyapunov_optimization#Introduction)
*   [2&nbsp;Lyapunov drift for queueing networks](http://en.wikipedia.org/wiki/Lyapunov_optimization#Lyapunov_drift_for_queueing_networks)
    *   [2.1&nbsp;Quadratic Lyapunov functions](http://en.wikipedia.org/wiki/Lyapunov_optimization#Quadratic_Lyapunov_functions)
    *   [2.2&nbsp;Bounding the Lyapunov drift](http://en.wikipedia.org/wiki/Lyapunov_optimization#Bounding_the_Lyapunov_drift)
    *   [2.3&nbsp;A basic Lyapunov drift theorem](http://en.wikipedia.org/wiki/Lyapunov_optimization#A_basic_Lyapunov_drift_theorem)

*   [3&nbsp;Lyapunov optimization for queueing networks](http://en.wikipedia.org/wiki/Lyapunov_optimization#Lyapunov_optimization_for_queueing_networks)
*   [4&nbsp;Related links](http://en.wikipedia.org/wiki/Lyapunov_optimization#Related_links)
*   [5&nbsp;References](http://en.wikipedia.org/wiki/Lyapunov_optimization#References)
*   [6&nbsp;Primary Sources](http://en.wikipedia.org/wiki/Lyapunov_optimization#Primary_Sources)
</td>
</tr>
</tbody>
</table>

&nbsp;

## [[edit](http://en.wikipedia.org/w/index.php?title=Lyapunov_optimization&amp;action=edit&amp;section=1 "Edit section: Introduction")]Introduction

Lyapunov optimization refers to the use of a&nbsp;[Lyapunov function](http://en.wikipedia.org/wiki/Lyapunov_function "Lyapunov function")&nbsp;to optimally control a dynamical system. Lyapunov functions are used extensively in control theory to ensure different forms of system stability. The state of a system at a particular time is often described by a multi-dimensional vector. A Lyapunov function is a scalar measure of this multi-dimensional state. Typically, the function is defined to grow large when the system moves towards undesirable states. System stability is achieved by taking control actions that make the Lyapunov function drift in the negative direction.

Lyapunov drift is central to the study of optimal control in queueing networks. A typical goal is to stabilize all network queues while optimizing some performance objective, such as minimizing average energy or maximizing average throughput. Minimizing the drift of a quadratic Lyapunov function leads to the&nbsp;[backpressure routing](http://en.wikipedia.org/wiki/Backpressure_routing "Backpressure routing")&nbsp;algorithm for network stability, also called the&nbsp;_max-weight algorithm_.<sup>[[1]](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_note-tass-radio-nets-1)</sup>&nbsp;<sup>[[2]](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_note-tass-server-allocation-2)</sup>&nbsp;Adding a weighted penalty term to the Lyapunov drift and minimizing the sum leads to the&nbsp;[drift-plus-penalty algorithm](http://en.wikipedia.org/wiki/Drift_plus_penalty "Drift plus penalty")&nbsp;for joint network stability and penalty minimization.&nbsp;<sup>[[3]](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_note-neely-fairness-infocom05-3)</sup>&nbsp;<sup>[[4]](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_note-now-4)</sup>&nbsp;<sup>[[5]](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_note-sno-text-5)</sup>&nbsp;The&nbsp;[drift-plus-penalty](http://en.wikipedia.org/wiki/Drift_plus_penalty "Drift plus penalty")&nbsp;procedure can also be used to compute solutions to&nbsp;[convex programs](http://en.wikipedia.org/wiki/Convex_optimization "Convex optimization")&nbsp;and&nbsp;[linear programs](http://en.wikipedia.org/wiki/Linear_programming "Linear programming").<sup>[[6]](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_note-neely-dcdis-6)</sup>

## [[edit](http://en.wikipedia.org/w/index.php?title=Lyapunov_optimization&amp;action=edit&amp;section=2 "Edit section: Lyapunov drift for queueing networks")]Lyapunov drift for queueing networks

Consider a queueing network that evolves in discrete time with normalized time slots t in {0, 1, 2, &hellip;}. Suppose there are N queues in the network, and define the vector of queue backlogs at time t by:

![$Q(t) = (Q_1(t), Q_2(t), ..., Q_N(t))$](http://upload.wikimedia.org/math/2/b/0/2b0dfb70eab030c6c2a3329eefbd3fd7.png)

### [[edit](http://en.wikipedia.org/w/index.php?title=Lyapunov_optimization&amp;action=edit&amp;section=3 "Edit section: Quadratic Lyapunov functions")]Quadratic Lyapunov functions

For each slot t, define L(t) as the sum of the squares of the current queue backlogs (divided by 2 for convenience later):

![$L(t) = frac{1}{2}sum_{i=1}^NQ_i(t)^2$](http://upload.wikimedia.org/math/5/f/0/5f0b6f0d3cab361e60e25e93cc8d3a3f.png)

//这里到底是什么玩意完全搞不懂，貌似就是队列积压的工作的数目的平方的和再除以二

This function is a scalar measure of the total queue backlog in the network. It is called&nbsp;_quadratic Lyapunov function_&nbsp;on the queue state. Define the&nbsp;_Lyapunov drift_&nbsp;as the change in this function from one slot to the next:

![$Delta(t) = L(t+1) - L(t)$](http://upload.wikimedia.org/math/0/4/5/045c4275ac8545028589611df5863b31.png)
//这里是前后时间片的这样一个函数的差

### [[edit](http://en.wikipedia.org/w/index.php?title=Lyapunov_optimization&amp;action=edit&amp;section=4 "Edit section: Bounding the Lyapunov drift")]Bounding the Lyapunov drift

//貌似小标题是要对李雅普诺夫漂移进行限定

Suppose the queue backlogs change over time according to the following equation:

![$Q_i(t+1) = max[Q_i(t) + a_i(t) - b_i(t), 0]$](http://upload.wikimedia.org/math/7/d/4/7d477fc326ac80810f13daf6970af2a7.png)
//单个队列来看，一个队列下一个时间片积累的数目就是收到的减去处理了的（管你怎么处理，直接扔掉也算是处理了）

where a_i(t) and b_i(t) are arrivals and service opportunities, respectively, in queue i on slot t. This equation can be used to compute a bound on the Lyapunov drift for any slot t:

![$Q_i(t+1)^2 = max[Q_i(t) + a_i(t) - b_i(t), 0]^2 leq (Q_i(t+1) + a_i(t) - b_i(t))^2$](http://upload.wikimedia.org/math/6/c/9/6c983ca5c2585a16ea1a5bbb33d9b5c5.png)
//这里为什么就要用平方啊，可耻啊，完全搞不懂想干嘛，而且自己推了一下这个不等式尽然不成立

Rearranging this inequality, summing over all i, and dividing by 2 leads to:

![$(Eq. 1) text{ } Delta(t) leq B(t) + sum_{i=1}^N Q_i(t)(a_i(t) - b_i(t))$](http://upload.wikimedia.org/math/0/8/3/083e99eb32a0b828a27bcdc7b1245be2.png)
//如果前面的成立，推出这个不等式，里面的B就是界限之类的东西，但是t+1跑哪里去了？被吃了么？

where B(t) is defined:

![$B(t) = frac{1}{2}sum_{i=1}^N[a_i(t)^2 + b_i(t)^2 - 2a_i(t)b_i(t)]$](http://upload.wikimedia.org/math/8/9/4/8948358643ac90712ab3743646be15ef.png)
//上面那个不等式的一部分

Suppose the second moments of arrivals and service in each queue are bounded, so that there is a finite constant B&gt;0 such that for all t and all possible queue vectors Q(t) the following property holds:

![$E[B(t) | Q(t)] leq B$](http://upload.wikimedia.org/math/f/4/5/f450c5db18b8f06a4150c89a6ec934f5.png)
//这个期望中间那一竖搞不清楚是要干嘛，但是大致明白是什么意思了，就是B是这个的上限，因为不管怎么样a(t)-b(t)都是个有限数

Taking conditional expectations of (Eq. 1) leads to the following bound on the&nbsp;_conditional expected Lyapunov drift_:

![$(Eq. 2) text{ } E[Delta(t) | Q(t)] leq B + sum_{i=1}^N Q_i(t)E[a_i(t) - b_i(t) | Q(t)]$](http://upload.wikimedia.org/math/2/c/e/2ce35121dd5c5dfeebbfe4a2dfdfcc3b.png)
//这里就是替换了一下，中间那一竖还是不知道什么意思

### [[edit](http://en.wikipedia.org/w/index.php?title=Lyapunov_optimization&amp;action=edit&amp;section=5 "Edit section: A basic Lyapunov drift theorem")]A basic Lyapunov drift theorem

//这里貌似是基本原理之类的

In many cases, the network can be controlled so that the difference between arrivals and service at each queue satisfies the following property for some real number&nbsp;![$epsilon&gt;0$](http://upload.wikimedia.org/math/e/7/7/e778429d8769714354b1994984a23fe5.png):

![$E[a_i(t) - b_i(t) | Q(t)] leq -epsilon$](http://upload.wikimedia.org/math/2/0/5/2057f70e99546eb61675876580d21155.png)
//还是进行一些YY，反正就是先YY个上界（其实不是YY，应该是有道理的，使用了某些技术，比如松弛？）

If the above holds for the same epsilon for all queues i, all slots t, and all possible vectors Q(t), then (Eq. 2) reduces to the drift condition used in the following Lyapunov drift theorem. The theorem below can be viewed as a variation on&nbsp;[Foster&#39;s theorem](http://en.wikipedia.org/wiki/Foster%27s_theorem "Foster&#39;s theorem")&nbsp;for&nbsp;[Markov chains](http://en.wikipedia.org/wiki/Markov_chains "Markov chains"). However, it does not require a Markov chain structure.

![text{ Theorem (Lyapunov Drift):}](http://upload.wikimedia.org/math/0/5/2/0525ce9ba3aa1a5a0e6d193baf1e582e.png)&nbsp;<sup>[[7]](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_note-leonardi-7)</sup>&nbsp;<sup>[[5]](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_note-sno-text-5)</sup>

 Suppose there are constants&nbsp;![Bgeq 0, epsilon&gt;0](http://upload.wikimedia.org/math/2/5/0/250877dc47784cd6072d5552e42da6ef.png)&nbsp;such that for all t and all possible vectors Q(t) the conditional Lyapunov drift satisfies:

![$E[Delta(t)|Q(t)] leq B - epsilon sum_{i=1}^N Q_i(t)$](http://upload.wikimedia.org/math/e/8/c/e8cb077341bf066f15b5ba286b0baeb6.png)
//上面那个公式继续简化，这样就用两个常量限制了这个不等式

Then for all slots t&gt;0 the time average queue size in the network satisfies:

![$frac{1}{t}sum_{tau=0}^{t-1} sum_{i=1}^NE[Q_i(tau)] leq frac{B}{epsilon} + frac{E[L(0)]}{epsilon t}$](http://upload.wikimedia.org/math/8/0/6/80648022337eb4cd3c75ae55001b5ba2.png)
//这个公式是下面证明了的，其实就是通过上面一个公式通过一定时间片的累加推出来的一个有意义的结论

![text{ Proof:}](http://upload.wikimedia.org/math/a/f/0/af02ccb4c35693c381d74f48a0e2b630.png)

Taking expectations of both sides of the drift inequality and using the law of iterated expectations yields:

![$E[Delta(t)] leq B - epsilon sum_{i=1}^N E[Q_i(t)]$](http://upload.wikimedia.org/math/4/6/8/4683eaf21caa183a86bd099b307c757d.png)
//这就是上上面那个公式，怎么中间的一竖去掉了，忽悠我呢

Summing the above expression over&nbsp;![tau in {0, 1, ldots, t-1}](http://upload.wikimedia.org/math/e/5/f/e5f5bc8e8b7076e1ed7528b8bf075dd5.png)&nbsp;and using the law of telescoping sums gives:

![$E[L(t)] - E[L(0)] leq Bt - epsilon sum_{tau=0}^{t-1}sum_{i=1}^NE[Q_i(tau)]$](http://upload.wikimedia.org/math/7/f/d/7fd7e2d1ee6ff68bfabf7b5c0c130536.png)
//来吧从0加到t+1，然后就搞定了
Using the fact that L(t) is non-negative and rearranging the terms in the above expression proves the result.

## [[edit](http://en.wikipedia.org/w/index.php?title=Lyapunov_optimization&amp;action=edit&amp;section=6 "Edit section: Lyapunov optimization for queueing networks")]Lyapunov optimization for queueing networks

//李雅普诺夫优化之于队列网络

Consider the same queueing network as in the above section. Now define p(t) as a&nbsp;_network penalty_&nbsp;incurred on slot t. Suppose the goal is to stabilize the queueing network while minimizing the time average of p(t). For example, to stabilize the network while minimizing time average power, p(t) can be defined as the total power incurred by the network on slot t.&nbsp;<sup>[[8]](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_note-neely-energy-it-8)</sup>&nbsp;To treat problems of maximizing the time average of some desirable&nbsp;_reward_&nbsp;r(t), the penalty can be defined p(t) = -r(t). This is useful for maximizing network throughput utility subject to stability.&nbsp;<sup>[[3]](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_note-neely-fairness-infocom05-3)</sup>

//这里一个比较有用的就是penalty和reward之间可以相互转化，加个负号就行
 To stabilize the network while minimizing the time average of p(t), network algorithms can be designed to make control actions that greedily minimize a bound on the following&nbsp;[drift-plus-penalty expression](http://en.wikipedia.org/wiki/Drift_plus_penalty "Drift plus penalty")&nbsp;on each slot t:<sup>[[5]](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_note-sno-text-5)</sup>

![$Delta(t) + Vp(t)$](http://upload.wikimedia.org/math/3/2/3/3234ccd630d816b10be83e9183a440df.png)

//这里是相当关键的一步，使用的[drift-plus-penalty](http://en.wikipedia.org/wiki/Drift_plus_penalty "Drift plus penalty")方法，可以简单的理解成使用将这个公式最小化的方法来控制队列

where V is a non-negative weight that is chosen as desired to affect a performance tradeoff. Choosing V = 0 reduces to minimizing a bound on the drift every slot and, for routing in multi-hop queueing networks, reduces to the&nbsp;[backpressure routing](http://en.wikipedia.org/wiki/Backpressure_routing "Backpressure routing")&nbsp;algorithm developed by Tassiulas and Ephremides.<sup>[[1]](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_note-tass-radio-nets-1)</sup><sup>[[2]](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_note-tass-server-allocation-2)</sup>&nbsp;Using V&gt;0 and defining p(t) as the network power use on slot t leads to the&nbsp;[drift-plus-penalty algorithm](http://en.wikipedia.org/wiki/Drift_plus_penalty "Drift plus penalty")&nbsp;for minimizing average power subject to network stability developed by Neely.<sup>[[8]](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_note-neely-energy-it-8)</sup>&nbsp;Using V&gt;0 and using p(t) as -1 times an admission control utility metric leads to the drift-plus-penalty algorithm for joint flow control and network routing developed by Neely, Modiano, and Li.<sup>[[3]](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_note-neely-fairness-infocom05-3)</sup>

<sup>//这一段的大致意思就是V=0和V&gt;0是属于不同的情况，讲了一些具体的例子</sup>

A generalization of the Lyapunov drift theorem of the previous section is important in this context. For simplicity of exposition, assume the penalty p(t) is lower bounded by some (possibly negative) real number p_min:

![$p(t) geq p_{min} text{ } forall t in {0, 1, 2, ...}$](http://upload.wikimedia.org/math/7/d/f/7dfd742dfdf397dd511f96c5c635440a.png)

Let p* represent a desired target for the time average of p(t). Let V be a parameter used to weight the importance of meeting the target. The following theorem shows that if a drift-plus-penalty condition is met, then the time average penalty is at most O(1/V) above the desired target, while average queue size is O(V). The V parameter can be tuned to make time average penalty as close to (or below) the target as desired, with a corresponding queue size tradeoff.

![text{ Theorem (Lyapunov Optimization):}](http://upload.wikimedia.org/math/7/c/0/7c046e2f917208d7eef927af56cbd30c.png)<sup>[[5]](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_note-sno-text-5)</sup>

Suppose there are constants&nbsp;![Bgeq 0, epsilon&gt;0, Vgeq 0, p^*](http://upload.wikimedia.org/math/c/8/d/c8d0eb7463f106796af158839d85ed38.png)&nbsp;such that for all t and all possible vectors Q(t) the following drift-plus-penalty condition holds:

![$(Eq. 3) text{ } E[Delta(t) + Vp(t) | Q(t)] leq B + Vp^* - epsilonsum_{i=1}^NQ_i(t)$](http://upload.wikimedia.org/math/b/1/6/b1675c31bb1684bae5ab33afd90e18e3.png)

//这里就是结论了，结合之前bounding的步骤，这里增加了V和p*这两个参数，这样对于一个有penalty需求的动态系统，使用李雅普诺夫优化可以解

Then for all t&gt;0 the time average penalty and time average queue sizes satisfy:

*   ![$text{ } frac{1}{t}sum_{tau=0}^{t-1} E[p(tau)] leq p^* + frac{B}{V} + frac{E[L(0)]}{Vt}$](http://upload.wikimedia.org/math/5/7/0/57030614bbd29c2db55a9e41a5aa01b9.png)

*   ![$text{ } frac{1}{t}sum_{tau=0}^{t-1} sum_{i=1}^NE[Q_i(tau)] leq frac{B + V(p^* - p_{min})}{epsilon} + frac{E[L(0)]}{epsilon t}$](http://upload.wikimedia.org/math/a/b/1/ab19a60de57b75be61f4b0ee5b1ce694.png)

//这有两个有用的结论，一个是有关penalty的和队列的时间上平均的大小得到上界

![text{ Proof:}](http://upload.wikimedia.org/math/a/f/0/af02ccb4c35693c381d74f48a0e2b630.png)

//证明就不讲了，和上面那个差不多

Taking expectations of (Eq. 3) and using the law of iterated expectations gives:

![$E[Delta(t)] + VE[p(t)] leq B + Vp^* - epsilon sum_{i=1}^NE[Q_i(t)]$](http://upload.wikimedia.org/math/e/d/6/ed6c7d6fe8b066c824c364f81b58a9a4.png)

Summing the above over the first t slots and using the law of telescoping sums gives:

![$E[L(t)] - E[L(0)] + Vsum_{tau=0}^{t-1}E[p(tau)] leq (B+Vp^*)t - epsilonsum_{tau=0}^{t-1}sum_{i=1}^NE[Q_i(tau)]$](http://upload.wikimedia.org/math/d/d/2/dd2a9932e26bc2f7422255061020e9db.png)

Since L(t) and Q_i(t) are non-negative quantities, it follows that:

![$- E[L(0)] + Vsum_{tau=0}^{t-1}E[p(tau)] leq (B+Vp^*)t$](http://upload.wikimedia.org/math/f/b/c/fbc26bf6cde74539a3a9615743eac629.png)

Dividing the above by Vt and rearranging terms proves the time average penalty bound. A similar argument proves the time average queue size bound.

## [[edit](http://en.wikipedia.org/w/index.php?title=Lyapunov_optimization&amp;action=edit&amp;section=7 "Edit section: Related links")]Related links

*   [Drift plus penalty](http://en.wikipedia.org/wiki/Drift_plus_penalty "Drift plus penalty")
*   [Backpressure routing](http://en.wikipedia.org/wiki/Backpressure_routing "Backpressure routing")
*   [Lyapunov function](http://en.wikipedia.org/wiki/Lyapunov_function "Lyapunov function")
*   [Foster&#39;s theorem](http://en.wikipedia.org/wiki/Foster%27s_theorem "Foster&#39;s theorem")
*   [Control-Lyapunov function](http://en.wikipedia.org/wiki/Control-Lyapunov_function "Control-Lyapunov function")

## [[edit](http://en.wikipedia.org/w/index.php?title=Lyapunov_optimization&amp;action=edit&amp;section=8 "Edit section: References")]References

1.  ^&nbsp;[<sup>_**a**_</sup>](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_ref-tass-radio-nets_1-0)&nbsp;[<sup>_**b**_</sup>](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_ref-tass-radio-nets_1-1)&nbsp;L. Tassiulas and A. Ephremides, "Stability Properties of Constrained Queueing Systems and Scheduling Policies for Maximum Throughput in Multihop Radio Networks,&nbsp;_IEEE Transactions on Automatic Control_, vol. 37, no. 12, pp. 1936-1948, Dec. 1992.
2.  ^&nbsp;[<sup>_**a**_</sup>](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_ref-tass-server-allocation_2-0)&nbsp;[<sup>_**b**_</sup>](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_ref-tass-server-allocation_2-1)&nbsp;L. Tassiulas and A. Ephremides, "Dynamic Server Allocation to Parallel Queues with Randomly Varying Connectivity," IEEE Transactions on Information Theory, vol. 39, no. 2, pp. 466-478, March 1993.
3.  ^&nbsp;[<sup>_**a**_</sup>](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_ref-neely-fairness-infocom05_3-0)&nbsp;[<sup>_**b**_</sup>](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_ref-neely-fairness-infocom05_3-1)&nbsp;[<sup>_**c**_</sup>](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_ref-neely-fairness-infocom05_3-2)&nbsp;M. J. Neely, E. Modiano, and C. Li, "Fairness and Optimal Stochastic Control for Heterogeneous Networks," Proc. IEEE INFOCOM, March 2005.
4.  **[^](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_ref-now_4-0)**&nbsp;L. Georgiadis, M. J. Neely, and L. Tassiulas, "Resource Allocation and Cross-Layer Control in Wireless Networks,"&nbsp;_Foundations and Trends in Networking_, vol. 1, no. 1, pp. 1-149, 2006.
5.  ^&nbsp;[<sup>_**a**_</sup>](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_ref-sno-text_5-0)&nbsp;[<sup>_**b**_</sup>](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_ref-sno-text_5-1)&nbsp;[<sup>_**c**_</sup>](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_ref-sno-text_5-2)&nbsp;[<sup>_**d**_</sup>](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_ref-sno-text_5-3)&nbsp;M. J. Neely.&nbsp;_Stochastic Network Optimization with Application to Communication and Queueing Systems,_&nbsp;Morgan &amp; Claypool, 2010.
6.  **[^](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_ref-neely-dcdis_6-0)**&nbsp;M. J. Neely, "Distributed and Secure Computation of Convex Programs over a Network of Connected Processors," DCDIS Conf, Guelph, Ontario, July, 2005
7.  **[^](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_ref-leonardi_7-0)**&nbsp;E. Leonardi, M. Mellia, F. Neri, and M. Ajmone Marsan, "Bounds on Average Delays and Queue Size Averages and Variances in Input-Queued Cell-Based Switches", Proc. IEEE INFOCOM, 2001.
8.  ^&nbsp;[<sup>_**a**_</sup>](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_ref-neely-energy-it_8-0)&nbsp;[<sup>_**b**_</sup>](http://en.wikipedia.org/wiki/Lyapunov_optimization#cite_ref-neely-energy-it_8-1)&nbsp;M. J. Neely, "Energy Optimal Control for Time Varying Wireless Networks," IEEE Transactions on Information Theory, vol. 52, no. 7, pp. 2915-2934, July, 2006.

## [[edit](http://en.wikipedia.org/w/index.php?title=Lyapunov_optimization&amp;action=edit&amp;section=9 "Edit section: Primary Sources")]Primary Sources

*   M. J. Neely.&nbsp;_Stochastic Network Optimization with Application to Communication and Queueing Systems_, Morgan &amp; Claypool, 2010.

[Categories](http://en.wikipedia.org/wiki/Help:Categories "Help:Categories"):&nbsp;&nbsp;  

*   [Networking algorithms](http://en.wikipedia.org/wiki/Category:Networking_algorithms "Category:Networking algorithms")
*   [Stochastic processes](http://en.wikipedia.org/wiki/Category:Stochastic_processes "Category:Stochastic processes")

&nbsp;