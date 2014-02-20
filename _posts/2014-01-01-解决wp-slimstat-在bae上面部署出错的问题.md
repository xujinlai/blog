---
layout: post
title: "解决WP SlimStat 在BAE上面部署出错的问题"
id: 36051
date: 2013-11-29 00:37:30
tags: 
- plugin
- stat
- wordpress
- original
categories: 
- wordpress
---

这几天刚刚将GAE上面micolog转到BAE上的wordpress上面，遇到了许多问题，现在还有很多问题没有解决

今天在网上面找了一下有关wordpress在网站统计方面的插件

发现了**WP SlimStat**这样一个很好用的插件，功能比较齐全

下载地址：[http://wordpress.org/plugins/wp-slimstat/](http://wordpress.org/plugins/wp-slimstat/)

然后按照正常插件安装的方式放在plugin目录下面，上传

但是BAE的webapp更新错误，错误日志如下：

Parse error: syntax error, unexpected T_STRING, expecting ')' in code/builder/work/appidmm29i4u634/0/wp-content/plugins/wp-slimstat/admin/lang/dynamic_strings.php on line 311
Errors parsing code/builder/work/appidmm29i4u634/0/wp-content/plugins/wp-slimstat/admin/lang/dynamic_strings.php

大致的意思就是     /wp-content/plugins/wp-slimstat/admin/lang/dynamic_strings.php     这个文件中的这一句代码解析出现错误，然后查看这一段代码：

~~~ php
__('l-zu-ZA','wp-slimstat') // Zulu (South Africa)
__('l-','wp-slimstat'), // Unknown
__('l-empty','wp-slimstat'), // Unknown
__('l-xx','wp-slimstat') // Unknown
__('c-xy','wp-slimstat'), // Local IP Address
);
~~~

将311,312,313,314四行全部注释掉，也就是贴出来这段代码的第2,3,4,5行，修改为如下：

~~~ php
__('l-zu-ZA','wp-slimstat') // Zulu (South Africa)
#__('l-','wp-slimstat'), // Unknown
#__('l-empty','wp-slimstat'), // Unknown
#__('l-xx','wp-slimstat') // Unknown
#__('c-xy','wp-slimstat'), // Local IP Address
);
~~~

然后将修改之后的文件上传，问题解决。