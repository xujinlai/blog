---
layout: post
title: "Blog Renovation Complete"
description: "Blog装修完毕,在这里mark一下"
modified: 2014-02-20 19:39:16 +0800
category: "Blog"
tags: [Jekyll,Blog,Theme,coderay,github pages,hsptr]
image:
  feature:
  credit:
  creditlink:
comments: true
share: true
---

### 前言
  折腾了将近一个星期,终于把博客整个装修了一遍,使用了新的`响应式布局`的主题`hpstr`.\\
  因为实在是折腾了一番.
  在这里将对于新主题的一些改进进行一个细致的说明,同时也提供一些使用jekyll的心得在这里.\\
  主要分为以下几点:

  1. [使用新主题`hsptr`](#hsptr)
  2. [将`markdown`解析器换为`kramdown`](#kramdown)
  3. [使用`google code prettify`进行代码高亮处理,解决github pages无法使用`coderay`的问题](#gcp)
  4. [为`hsptr`主题增加右侧悬浮`TOC`(悬停显示)](#toc)
  5. [为`hsptr`主题增加`categories`页面](#categories)

<!--more-->

### 新主题hsptr
  之前一直使用的[Jekyll 博客主题 Kunka](http://www.zhanxin.info/jekyll/2013-08-11-jekyll-theme-kunka.html)这个主题,也对其进行了一定的修改,但是最近发现其在手机上的表现实在不尽如人意,所以决定换成响应式布局的主题.

  然后首先尝试的是[hexo](http://zespia.tw/hexo/),但是hexo有几个很致命的问题:

  + Hexo 不支持Github Pages自动生成,还要在本地生成再传到Github上去,违反了**简便**原则
  + hexo能用的主题太少,好用并且好看的主题更加是基本为0,[pacman](http://yangjian.me/workspace/introducing-pacman-theme/)这个主题还算是不错,但是有一些位置和我的要求相悖,比如主页文章无法显示摘要等等.

  最后再一番挣扎和妥协(`自己还修改了hexo的wordpress导出程序`)之后还是放弃了hexo转而投向原生的jekyll.\\
  并且发现jekyll还是有许多好的主题可以使用的,比如我现在使用的[hsptr主题](https://github.com/mmistakes/hpstr-jekyll-theme),还有许多其他的主题可以使用,参见:[Jekyll Themes](http://jekyllthemes.org/).
  ![](https://github-camo.global.ssl.fastly.net/3d61a3577179496689d9b4931711089a6a9d7a07/687474703a2f2f6d6d697374616b65732e6769746875622e696f2f68707374722d6a656b796c6c2d7468656d652f696d616765732f68707374722d6a656b796c6c2d7468656d652d707265766965772e6a7067)

  在`hsptr`的基础上,我还修改了一些样式,比如:

  + `inlinecode`的样式为有立体感觉.
  + `code hightlight`的字体改为`Consolas`.

### kramdown
  用过了之后才发现,都是`markdown`解析器,差别其实相当大,`kramdown`支持的语法非常多,比如我现在最想要的引用,其原生就支持,除了生成速度较慢,使用起来是相当方便的.\\
  我也是看了一篇[^1]`markdown`解析器的对比之后才转过来使用`kramdown`的.kramdown在任何方面都有其优势,只是由于其原生使用的`coderay`无法在`Github Pages`上使用(Github Pages不支持插件),所以需要进行一定的修改,让其更加好用.

### GCP
  尝试了一些方法在`Github Pages`上不通过插件的方式实现代码高亮,最后发现[GCP(Google Code Prettify)](http://google-code-prettify.googlecode.com/svn/trunk/README.html)是其中最好用的.\\
  首先在`Google Code Prettify`的网站上下载它的js和css的包放入博客目录中.
  然后在页面上加入如下一段代码就行了:

~~~html
<link rel="stylesheet" href="/assets/js/plugins/prettify/prettify.css">
<script src="/assets/js/plugins/prettify/prettify.js"></script>
<script type="text/javascript">
  $(function(){
    $("pre").addClass("prettyprint");
    prettyPrint();
  });
</script>
~~~

### 悬浮TOC
  另外一个问题就是文章目录的问题,首先在kramdown里面可以很简单的插入文章目录,使用如下代码:

~~~
* TOC
{:toc}
~~~
  但是这样生成的文章目录不是很好用,也不美观,文章太长的话,想要找东西很麻烦,然后就本着造福人类的想法,我投身到了完全没有接触过的`JS`和`CSS`的世界中去了,由于改动的位置实在太多,这里就不冗述了,详情参见我博客的github项目.

  这里**mark**一下jquery的获取元素位置的方式:

~~~ js
$('#h2outline').height() //获取元素高度
$('header').outerHeight() //获取元素外部高度(包括margin)
~~~

  下面是主要修改的两个文件:

  + [CSS](https://github.com/xujinlai/xujinlai.github.io/blob/master/assets/css/main.min.css)
  + [TOC-ASIDE JS](https://github.com/xujinlai/xujinlai.github.io/blob/master/assets/js/plugins/toc-aside.js)

### Categories
  这个是借的`kunka`主题的,然后对应我的`hsptr`主题进行了一定修改,参见:

  + [categories.html](https://github.com/xujinlai/xujinlai.github.io/blob/master/categories.html)

---

### 参考

[^1]: [Using Kramdown instead of Maruku](http://bloerg.net/2013/03/07/using-kramdown-instead-of-maruku.html)
