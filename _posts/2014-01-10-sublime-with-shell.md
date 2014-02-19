---
layout: post
title: "如何在sublime中使用shell"
description: "在Sublime里面使用shell的插件SublimeREPL"
category: "sublime"
tags: [sublime, shell, SublimeREPL]
---

### 前言

这几天在捣鼓`emacs`，也对比了一下之前用的`sublime`的相关功能，emacs最吸引我的位置就是其eshell可以在emacs内做到无缝切换，
eshell对于经常在shell和编辑器之间切换的情况下是非常方便的一个功能，但是sublime中之前一直没有找到这样一个插件。但就在这几天，看了一下
sublime- [**Package control**](https://sublime.wbond.net/)的官方网站，发现了这个排名非常靠前的插件，名字叫**SublimeREPL**

<!--more-->

### 正文
现在就来谈谈这个sublime的类似控制台的插件，按照官方的介绍，其根本的目的其实不在于shell，而是在sublime中调试python程序
也就是可以用shell的模式使用python，这对于python开发者来说也是一个非常好用的功能，但是我主要是使用其shell功能

其shell功能类似emacs中的shell功能，也是使用缓冲区的形式实现的，但是其不能调用vi或者vim这样的程序
只能使用`git`或者`rake`这种终端命令，但是也已经非常的便利了

#### 插件安装
安装插件相当容易，`ctrl`+`shift`+`P`，然后输入插件的名字SublimeREPL就行了

#### 插件使用
插件的使用也是比较方便的，也是`ctrl`+`shift`+`P`之后输入sublimeREPL然后选择shell，就会进入shell模式
之后就和在windows里使用shell一样的操作就行了
