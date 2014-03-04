---
layout: post
title: "Machine Learning Foundations note No.01"
description: "学习coursera上面机器学习基石课程的笔记"
modified: 2014-02-27 06:14:13 +0800
category: "ML"
tags: [ML, note]
image:
  feature: http://seeksky.qiniudn.com/19.jpg-clip.jpg
  credit:
  creditlink:
comments: true
share: true
alias: [/2014/02/27/machine-learning-foundations-note-no-dot-01/]
---

### 前言
这段时间看了coursera上面`机器学习基石`这门课程的相关内容,在这里留下一些记录

<!--more-->

### 第一课: The Learning Problem

机器学习是一个非常强大的工具,但是其基础在哪里,我们还要再问几个问题:

 + **When** Can Machines Learn? (illustrative + technical)
 + **Why** Can Machines Learn? (theoretical + illustrative)
 + **How** Can Machines Learn? (technical + practical)
 + How Can Machines Learn **Better**? (practical + theoretical)

这个课程将围绕解释上面这几个问题展开

[Google Doc上第一课的PPT](https://drive.google.com/file/d/0B9qw8YyWZEzKbVZpRzBveEZicDg/edit?usp=sharing)

<iframe src="https://docs.google.com/file/d/0B9qw8YyWZEzKbVZpRzBveEZicDg/preview" width="640" height="480"></iframe>

第一课主要解释了机器学习这个课程将要介绍的内容以及对机器学习进行了简单的建模.\\
这里主要是下面这一个图:\\
![]( {{ site.qiniu }}\MLF\DefML.png)

这个图主要阐述了下面几个内容:

 + input: $$x \in X$$ (customer application)
 + output: $$y \in Y$$ (good/bad after approving credit card)
 + **unknown pattern to be learned = target function**:\\
   * $$f : X \to Y$$ (ideal credit approval formula)
 + **data = training examples**: $$D = \{f(x_1, y_1), (x_2, y_2), \cdots , (x_N, y_N)\}$$ (historical records in bank)
 + **hypothesis = skill** with hopefully **good performance**:
   * $$g : X \to Y$$ (‘learned’ formula to be used)

 + target f unknown
 + hypothesis g hopefully $$\approx$$ f, but possibly **different** from f, (perfection ‘impossible’ when f unknown)
 + assume $$g \in H = \{h_k\}$$
 + hypothesis set H:
   * can contain **good or bad hypotheses**
   * up to A to pick the ‘best’ one as g

这个图总的来说就是描述了机器学习的模型,从数据到**g**函数,也就是对于**f**的猜想.中间的学习模型就是**A**和**H**.

 + 最后总结起来就是: `machine learning`: use **data** to compute **hypothesis _g_** that approximates **target _f_**
