---
layout: post
title: "【original】如何用python读取excel中嵌入的word文档"
id: 36093
date: 2013-12-05 19:34:48
tags: 
- Excel
- Office
- OLE
- Python
- win32com
- Word
- original
categories: 
- original
---

original作者 : seeksky         [http://blog.seeksky.tk](http://blog.seeksky.tk)       转载请注明

最近在做一个项目，有关企业中的CRM的项目

客户的原始资料是存储在excel中的，需要导入到新的基于服务的数据库中

其中有一个很麻烦的位置，就是有一部分文件是存储在嵌入在excel的word之中的（后来才知道所有的office的文件都可以被解析成ole对象，包括excel文档本身和word文档本身），这样使用python读取excel的库xlrt就不行了

在这之间查了很多资料，最后确定使用win32com这个库可以实现这个功能，因为win32com直接调用的office的程序的接口进行操作，和VBA调用的基本一样（后来分析了win32com的代码才发现其实就是用的一样的接口，使用的office的类似java中反射一类的接口，直接通过函数名称调用的一种方式）

在网上查找了一些资料之后，终于把这件事情搞定了，下面就来详细讲一下如何使用python win32com库读取excel中的word文档

--------------------------------正文---------------------------------

*   ### 安装win32com
这步很简单，但是之前要装python运行环境，我的装的是2.7的所以对应的也是win32com针对2.7运行环境的版本，当然还有64位操作系统与32位操作系统的区别，不过这里的64位和32位指的是你装的python运行环境是32位还是64位的（因为64位操作系统也可以跑32位的python）。

下载地址：[http://sourceforge.net/projects/pywin32/files/pywin32/Build%20218/pywin32-218.win-amd64-py2.7.exe/download](http://sourceforge.net/projects/pywin32/files/pywin32/Build%20218/pywin32-218.win-amd64-py2.7.exe/download "http://sourceforge.net/projects/pywin32/files/pywin32/Build%20218/pywin32-218.win-amd64-py2.7.exe/download")

*   ### 读取excel中嵌入的word文档
先贴代码：

~~~ python
from win32com.client import Dispatch
import win32com.client
import codecs
import sys
import os
import types

class easyExcel:
    def __init__(self, filename=None):
        self.xlApp = win32com.client.Dispatch('Excel.Application')
        self.xlApp.Visible = False
        if filename:
             self.filename = filename
             self.xlBook = self.xlApp.Workbooks.Open(filename)
        else:
             print "not found this file"
        print self.xlBook.Worksheets(1).name
        for ole_1 in self.xlBook.Worksheets(1).OLEObjects():
            ole_1.Activate()
            ole_obj = ole_1.Object
            word_obj = ole_obj.Application
            doc = word_obj.Documents(1)
            doc.Activate()
            str1 = doc.Tables(1).Cell(2,1).Range.Text
            str2=str1.encode('gbk')
            str2=str2.decode("gbk")
~~~

这里主要分为几个步骤

##### 1.建立excel应用对象

~~~ python
self.xlApp = win32com.client.Dispatch('Excel.Application')
self.xlApp.Visible = False
~~~

##### 2.读取excel文档

~~~ python
if filename:
             self.filename = filename
             self.xlBook = self.xlApp.Workbooks.Open(filename)
else:
             print "not found this file"
~~~

##### 3.取出嵌入到excel中的word文档的ole对象

~~~ python
for ole_1 in self.xlBook.Worksheets(1).OLEObjects():
            ole_1.Activate()
            ole_obj = ole_1.Object
            word_obj = ole_obj.Application
            doc = word_obj.Documents(1)
            doc.Activate()
~~~

##### 4.读取word文档中的内容(这里的例子是读取了文档中一个表格的内容,具体方法参考word中Document对象VBA宏的用法)

~~~ python
str1 = doc.Tables(1).Cell(2,1).Range.Text
str1=str1.encode('gbk')
str1=str1.decode("gbk")
~~~

&nbsp;

*   ### 遇到的问题总结
在整个过程中遇到的问题很多,因为从来没有人做过相关的工作,在网上也找不到任何相关的资料,在这里把问题总结一下

首先一个是win32com库的相关问题：

1.由于本身这个库使用的是office自带的库的反射机制实现的，所以通过**dir()**或者是**help()**这样python自带的帮助函数是看不到你想要用的库函数的声明和帮助的，唯一的办法就是查微软的MSDN

2.由于这个库直接使用office自带的API，所以虽然大部分的版本都能通用，但是部分函数在office不同版本中有所差别，所以兼容性需要在对应的版本上面进行测试

另外一方面是有关字符集的问题：

在读取word文档的时候遇到了一个很奇怪的问题，因为数据库使用的utf-8的字符集，所以需要将本身word中存储的gbk字符集的字符串进行转换，但是转换总是出错，提示类似ascii编码超出128的错误提示，貌似是因为ascii和gbk混合的原因，最后加了一句encode(‘gbk’)再decode(‘gbk’)问题解决，但是具体什么原理，并不清楚。