---
layout: post
title: "一个适合emacs的字体以及主题设置"
description: "刚开始使用emacs修改主题以及字体"
category: "emacs"
tags: [emacs, font, config]
---

### 前言

最近终于下定决心捣鼓一下`emacs`了，之前一直想用这个神奇的编辑器来写代码或者是博客，但是由于其庞大的需要记忆的快捷键组合和陡峭的学习曲线，一直没有下定决心，最近终于下定决心来完成这样一项壮举。
但是其实还是需求驱动的，前一段时间使用git hub pages弄了一个博客，然后使用sublime写了几篇文章，但是最后还是发现其对于命令行的无缝切换和一些细微的位置不好使用（比如说有时候会崩溃，package control经常性的失效等等）。
所以最终下定决心捣鼓一下`emacs`了。

<!--more-->

### 正文
捣鼓emacs，一开始还是比较麻烦的，详细见我另外一篇文章：[如何开始在emacs的世界遨游](/emacs/2014/01/12/surfing-in-the-emacs-world/)。
这篇文章主要讲如何让`emacs`变得漂亮，我基本上是仿造我sublime的风格来优化我emacs的显示效果的
这里先讲讲我sublime使用的主题及风格：

* **字体**：**YaHei Consolas Hybrid** （这个字体是在网上找的，非常适合编程的一个字体，将英文的consolas和微软雅黑合并的一个字体）
* **主题**：**monokai**（之前在sublime上面一直用这个主题，习惯了，配色看着也比较舒服）

#### 安装方法
  首先是字体，先找个位置下载，google 一下下载地址就好了，我这里也给一个地址，但是不保证能用：
  [**YaHei Consolas Hybrid字体下载地址**](http://www.iplaysoft.com/consolas.html)
  字体在系统里面安装好之后，就是设置字体了，在`.emcas`文件里面加上下面这一行代码：

~~~cl
(set-default-font "YaHei Consolas Hybrid")
~~~

  然后是主题的安装，这个就比较简单了,在emacs的包管理器里面就有，步骤如下：

* `M`+`x` `packages-list-packages`
* 查找`monokai-theme`，然后安装就好了
* 在设置里面添加如下一行代码:

~~~cl
 (disable-theme 'zenburn)
 (load-theme 'monokai t)
~~~
ps:由于我使用的[**prelude**](https://github.com/bbatsov/prelude)做的emacs配置文件,所以多了上面一行,没有用他的配置文件的同学请无视

  按照如上方法整过之后,emacs的主题以及字体显示就和之前sublime一模一样了
