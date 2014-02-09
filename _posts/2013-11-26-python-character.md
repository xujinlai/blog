---
title: Python字符编码详解
link: http://seeksky.duapp.com/index.php/python%e5%ad%97%e7%ac%a6%e7%bc%96%e7%a0%81%e8%af%a6%e8%a7%a3/
author: xujinlai
description: 
post_id: 18002
created: 2013/11/26 09:32:44
created_gmt: 2013/11/26 09:32:44
comment_status: open
post_name: python%e5%ad%97%e7%ac%a6%e7%bc%96%e7%a0%81%e8%af%a6%e8%a7%a3
status: publish
layout: post
---

<!--本文简单介绍了各种常用的字符编码的特点，并介绍了在python2.x中如何与编码问题作战 ：） 
<br /><br /><br />请注意本文关于Python的内容仅适用于2.x，3.x中str和unicode有翻天覆地的变化，请查阅其他相关文档。 
<br /><br /><br />尊重作者的劳动，转载请注明作者及原文地址 >.<-->

# Python字符编码详解

> 本文简单介绍了各种常用的字符编码的特点，并介绍了在python2.x中如何与编码问题作战 ：）   
请注意本文关于Python的内容仅适用于2.x，3.x中str和unicode有翻天覆地的变化，请查阅其他相关文档。   
尊重作者的劳动，转载请注明作者及原文地址 >.<

## 转自：http://www.cnblogs.com/huxi/archive/2010/12/05/1897271.html

感谢原作者[AstralWind](http://www.cnblogs.com/huxi/)的辛勤劳作

![返回主页](http://www.cnblogs.com/Skins/custom/images/logo.gif)

## 1\. 字符编码简介

### 1.1. ASCII

ASCII(American Standard Code for Information Interchange)，是一种单字节的编码。计算机世界里一开始只有英文，而单字节可以表示256个不同的字符，可以表示所有的英文字符和许多的控制符号。不过ASCII只用到了其中的一半（x80以下），这也是MBCS得以实现的基础。

### 1.2. MBCS

然而计算机世界里很快就有了其他语言，单字节的ASCII已无法满足需求。后来每个语言就制定了一套自己的编码，由于单字节能表示的字符太少，而且同时也需要与ASCII编码保持兼容，所以这些编码纷纷使用了多字节来表示字符，如GBxxx、BIGxxx等等，他们的规则是，如果第一个字节是x80以下，则仍然表示ASCII字符；而如果是x80以上，则跟下一个字节一起（共两个字节）表示一个字符，然后跳过下一个字节，继续往下判断。

这里，IBM发明了一个叫Code Page的概念，将这些编码都收入囊中并分配页码，GBK是第936页，也就是CP936。所以，也可以使用CP936表示GBK。

MBCS(Multi-Byte Character Set)是这些编码的统称。目前为止大家都是用了双字节，所以有时候也叫做DBCS(Double-Byte Character Set)。必须明确的是，MBCS并不是某一种特定的编码，Windows里根据你设定的区域不同，MBCS指代不同的编码，而Linux里无法使用MBCS作为编码。在Windows中你看不到MBCS这几个字符，因为微软为了更加洋气，使用了ANSI来吓唬人，记事本的另存为对话框里编码ANSI就是MBCS。同时，在简体中文Windows默认的区域设定里，指代GBK。

### 1.3. Unicode

后来，有人开始觉得太多编码导致世界变得过于复杂了，让人脑袋疼，于是大家坐在一起拍脑袋想出来一个方法：所有语言的字符都用同一种字符集来表示，这就是Unicode。

最初的Unicode标准UCS-2使用两个字节表示一个字符，所以你常常可以听到Unicode使用两个字节表示一个字符的说法。但过了不久有人觉得256*256太少了，还是不够用，于是出现了UCS-4标准，它使用4个字节表示一个字符，不过我们用的最多的仍然是UCS-2。

UCS(Unicode Character Set)还仅仅是字符对应码位的一张表而已，比如"汉"这个字的码位是6C49。字符具体如何传输和储存则是由UTF(UCS Transformation Format)来负责。

一开始这事很简单，直接使用UCS的码位来保存，这就是UTF-16，比如，"汉"直接使用x6Cx49保存(UTF-16-BE)，或是倒过来使用x49x6C保存(UTF-16-LE)。但用着用着美国人觉得自己吃了大亏，以前英文字母只需要一个字节就能保存了，现在大锅饭一吃变成了两个字节，空间消耗大了一倍……于是UTF-8横空出世。

UTF-8是一种很别扭的编码，具体表现在他是变长的，并且兼容ASCII，ASCII字符使用1字节表示。然而这里省了的必定是从别的地方抠出来的，你肯定也听说过UTF-8里中文字符使用3个字节来保存吧？4个字节保存的字符更是在泪奔……（具体UCS-2是怎么变成UTF-8的请自行搜索）