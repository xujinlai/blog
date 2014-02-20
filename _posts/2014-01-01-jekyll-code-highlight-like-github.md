---
layout: post
title: "如何让github pages自动的转换github的markdown代码高亮"
description: "如何使用github的代码高亮markdown方式进行markdown的编写，并且在github pages端自动生成代码高亮"
excerpt: "如何使用github的代码高亮markdown方式进行markdown的编写"
category: jekyll
tagline: "Supporting tagline"
tags: [jekyll, markdown, code Highlight, github]
---

这篇文章主要介绍如何在github pages上使用类似github的简约代码块方式编写markdown，并且包含高亮。

### 前言
这是在gitbug上面写的自己的第一篇blog，就来讲讲最近折腾github自带的jekyll遇到的问题吧。

<!--more-->

### 正文
首先是对于整个github pages的认识，要用好github提供的静态页面生成功能就必须要清楚其使用的库。
github使用的是jekyll来进行静态页面的生成的，jekyll是ruby的一个库，用于生成静态页面，原生支持markdown的静态页面支持。

然后我使用的是jekyll的扩展Jekyll-Bootstrap，让搭建github博客更加轻松，安装方法详见[Jekyll QuickStart](http://jekyllbootstrap.com/usage/jekyll-quick-start.html)。
安装好之后，有一个问题就是本身github自带的代码嵌入方式无法自动解析成代码高亮的形式。
如：

~~~
	~~~ ruby
        def say_hi
            print "hello world"
        end
	~~~
~~~

这样的代码块无法自动按照所示的源代码语言高亮，google了一些资料，找到了解决方法。
参考：[Jekyll的代码高亮](http://ztpala.com/2011/10/27/code-highlighting-jekyll/)
解决步骤：
#### 1. 配置jekyll使用支持github的markdown代码块解析的解析器
首先修改`_config.yml`，在其中添加如下代码：

~~~yaml
markdown: redcarpet
redcarpet:
    extensions: ["fenced_code_blocks", "autolink", "tables", "strikethrough"]
~~~
#### 2. 生成代码高亮css
之后是代码高亮的css选取。
我使用的是用pygments导出来的css，主题是monokai的。
参考：[用Jekyll和Pygments配置代码高亮](http://zyzhang.github.io/blog/2012/08/31/highlight-with-Jekyll-and-Pygments/)

>Pygments提供了多种样式，比如’native’, ‘emacs’, ‘vs’等等，可以在Pygments Demo中选择某种语言的例子，体验不同的样式。

>通过下面的命令可以查看当前支持的样式：

~~~bash
	>>> from pygments.styles import STYLE_MAP
	>>> STYLE_MAP.keys()
	['monokai', 'manni', 'rrt', 'perldoc', 'borland', 'colorful', 'default', 'murphy', 'vs', 'trac', 'tango', 'fruity', 'autumn', 'bw', 'emacs', 'vim', 'pastie', 'friendly', 'native']
~~~

>选择一种样式，应用在Jekyll中

>- `cd /dev/projects/zyzhang.github.com/assets/themes/abel/css`

>- `pygmentize -S native -f html > pygments.css`, “native”是样式名，“html”是formatter

#### 3.引入css
在layout中引用刚刚加的pygments.css
然后在自定义的模版中加入对代码高亮的css支持，我使用的主题是`the-program`，所以我的默认模版的位置在`_includes\themes\the-program\default.html`这里。
在其中`head`标签中加入你写好的css的路径地址。

~~~html
<link href="assets/themes/the-program/css/pygments.css" rel="stylesheet" type="text/css">
~~~

-------------
最后push代码到github上之后，github pages的jekyll就会自动帮你解析代码块了

=============
附录：
附上monokai的css

~~~css
.hll { background-color: #49483e }
.c { color: #75715e } /* Comment */
.err { color: #960050; background-color: #1e0010 } /* Error */
.k { color: #66d9ef } /* Keyword */
.l { color: #ae81ff } /* Literal */
.n { color: #f8f8f2 } /* Name */
.o { color: #f92672 } /* Operator */
.p { color: #f8f8f2 } /* Punctuation */
.cm { color: #75715e } /* Comment.Multiline */
.cp { color: #75715e } /* Comment.Preproc */
.c1 { color: #75715e } /* Comment.Single */
.cs { color: #75715e } /* Comment.Special */
.ge { font-style: italic } /* Generic.Emph */
.gs { font-weight: bold } /* Generic.Strong */
.kc { color: #66d9ef } /* Keyword.Constant */
.kd { color: #66d9ef } /* Keyword.Declaration */
.kn { color: #f92672 } /* Keyword.Namespace */
.kp { color: #66d9ef } /* Keyword.Pseudo */
.kr { color: #66d9ef } /* Keyword.Reserved */
.kt { color: #66d9ef } /* Keyword.Type */
.ld { color: #e6db74 } /* Literal.Date */
.m { color: #ae81ff } /* Literal.Number */
.s { color: #e6db74 } /* Literal.String */
.na { color: #a6e22e } /* Name.Attribute */
.nb { color: #f8f8f2 } /* Name.Builtin */
.nc { color: #a6e22e } /* Name.Class */
.no { color: #66d9ef } /* Name.Constant */
.nd { color: #a6e22e } /* Name.Decorator */
.ni { color: #f8f8f2 } /* Name.Entity */
.ne { color: #a6e22e } /* Name.Exception */
.nf { color: #a6e22e } /* Name.Function */
.nl { color: #f8f8f2 } /* Name.Label */
.nn { color: #f8f8f2 } /* Name.Namespace */
.nx { color: #a6e22e } /* Name.Other */
.py { color: #f8f8f2 } /* Name.Property */
.nt { color: #f92672 } /* Name.Tag */
.nv { color: #f8f8f2 } /* Name.Variable */
.ow { color: #f92672 } /* Operator.Word */
.w { color: #f8f8f2 } /* Text.Whitespace */
.mf { color: #ae81ff } /* Literal.Number.Float */
.mh { color: #ae81ff } /* Literal.Number.Hex */
.mi { color: #ae81ff } /* Literal.Number.Integer */
.mo { color: #ae81ff } /* Literal.Number.Oct */
.sb { color: #e6db74 } /* Literal.String.Backtick */
.sc { color: #e6db74 } /* Literal.String.Char */
.sd { color: #e6db74 } /* Literal.String.Doc */
.s2 { color: #e6db74 } /* Literal.String.Double */
.se { color: #ae81ff } /* Literal.String.Escape */
.sh { color: #e6db74 } /* Literal.String.Heredoc */
.si { color: #e6db74 } /* Literal.String.Interpol */
.sx { color: #e6db74 } /* Literal.String.Other */
.sr { color: #e6db74 } /* Literal.String.Regex */
.s1 { color: #e6db74 } /* Literal.String.Single */
.ss { color: #e6db74 } /* Literal.String.Symbol */
.bp { color: #f8f8f2 } /* Name.Builtin.Pseudo */
.vc { color: #f8f8f2 } /* Name.Variable.Class */
.vg { color: #f8f8f2 } /* Name.Variable.Global */
.vi { color: #f8f8f2 } /* Name.Variable.Instance */
.il { color: #ae81ff } /* Literal.Number.Integer.Long */
~~~
