---
layout: post
title: "用python对pdf批量重命名"
id: 13003
date: 2013-11-26 09:32:44
tags: 
- PDF
- Python
categories: 
- original
---

正当我很嗨的下着infocom2013年的论文的时候

我忽视了一个问题，下了之后完全不知道谁是谁

然后我就崩溃了

然后找到了这个帖子，虽然代码有挺大的问题，不过基本上还能用

后面那一段取pdf第一行标题的位置没有做文件名长度的限制

我做了一个限制32个字符（NTFS貌似最长是128个字符）

更改代码片段如下：

&nbsp;

&nbsp;

&nbsp;

~~~ python
 #这里就是把先前得到的路径名加上得到的新文件名，再加上后缀名，得到新的文件名

        title=title[:32]   #这里就是我添加的代码，改了之后就不会报文件名过长的错误了

        new=string+title+".pdf"

        print "old=%s " % old
~~~

&nbsp;

&nbsp;

他的代码中还有一处问题，就是字符串编码的问题，会导致很多符号无法识别，比如（？）这样的字符都会报错

然后我顺便把编码方式从GBK改成GB2312了，搞定收工

&nbsp;

~~~ python
        print "new = %s " % new
#这里一定要对新的文件名重新定义编码格式，而且一定是GBK，因为Windows中文版默认的就是GBK编码
        new=new.encode(&#39;GB2312&#39;)
#关闭文件流，不然无法更名
        stream.close()
~~~

&nbsp;

&nbsp;

本文转载自[点击打开链接](http://blog.sina.com.cn/s/blog_65db99840100saue.html)

如下：

这两天全组的人都被shadi抓着去下各种会议论文，有些会议还好，可以直接批量下载。像IEEE和ACM的会议，只能从学校图书馆里进数据库，然后一篇篇地打开、保存，而且保存下来的pdf文件名字都是数字。还有些是从google scholar里搜出来的，名字更加没有规律了。

大神jhonglei同学见状，自告奋勇地上网搜索了一番，给出了一段可以根据pdf文件的title属性对pdf文件进行批量重命名的python代码。
[![用python对pdf批量重命名](http://s10.sinaimg.cn/middle/65db9984ga78e49bd09a9&amp;690 "用python对pdf批量重命名")](http://photo.blog.sina.com.cn/showpic.html#blogid=65db99840100saue&amp;url=http://s10.sinaimg.cn/orignal/65db9984ga78e49bd09a9)
#encoding:utf-8

&#39;&#39;&#39;

需要到：http://pybrary.net/pyPdf/ &nbsp;&nbsp;下载安装pyPdf库

&#39;&#39;&#39;

import&nbsp;os
import&nbsp;operator
from&nbsp;pyPdf&nbsp;import&nbsp;PdfFileWriter,&nbsp;PdfFileReader
#对取得的文件命格式化，去掉其中的非法字符
def&nbsp;format(filename):
&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(isinstance(filename,&nbsp;str)):
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tuple=(&#39;?&#39;,&#39;╲&#39;,&#39;*&#39;,&#39;/&#39;,&#39;,&#39;,&#39;"&#39;,&#39;&lt;&#39;,&#39;&gt;&#39;,&#39;|&#39;,&#39;&ldquo;&#39;,&#39;"&#39;,&#39;，&#39;,&#39;&lsquo;&#39;,&#39;&rdquo;&#39;,&#39;,&#39;,&#39;/&#39;,&#39;:&#39;)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;char&nbsp;in&nbsp;tuple:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(filename.find(char)!=-1):
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filename=filename.replace(char,"&nbsp;")
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;filename
&nbsp;&nbsp;&nbsp;&nbsp;else:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;&#39;None&#39;
#通过递归调用次方法依次遍历文件夹中的每个文件,如果后缀名是.pdf，则对其处理
def&nbsp;VisitDir(path):
&nbsp;&nbsp;&nbsp;&nbsp;li=os.listdir(path)
&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;p&nbsp;in&nbsp;li:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pathname=os.path.join(path,p)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;not&nbsp;os.path.isfile(pathname):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;VisitDir(pathname)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;back=os.path.splitext(pathname)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;backname=back[1]
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;backname==&#39;.pdf&#39;:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print&nbsp;pathname
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rename(pathname)
#文件改名程序
def&nbsp;rename(pathname):
&nbsp;&nbsp;&nbsp;&nbsp;stream=file(pathname,&nbsp;"rb")
&nbsp;&nbsp;&nbsp;&nbsp;input1&nbsp;=&nbsp;PdfFileReader(stream)
&nbsp;&nbsp;&nbsp;&nbsp;isEncrypted=input1.isEncrypted
&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;not(isEncrypted):&nbsp;
#这里的pathname包含路径以及文件名，根据/将起分割成一个list然后去除文件名，保留路径
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list=pathname.split("\")
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oldname=""
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;strname&nbsp;in&nbsp;list:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oldname+=strname+&#39;\&#39;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;old=oldname[0:len(oldname)-1]
#这就是去除文件名
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list.pop()
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;string=""
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;strname&nbsp;in&nbsp;list:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;string+=strname+&#39;\&#39;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print&nbsp;"string=&nbsp;%s"&nbsp;%&nbsp;string
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title=str(input1.getDocumentInfo().title)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print&nbsp;"title&nbsp;=&nbsp;%s"&nbsp;%&nbsp;(input1.getDocumentInfo().title)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title=format(title)
&nbsp;#这里就是把先前得到的路径名加上得到的新文件名，再加上后缀名，得到新的文件名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;new=string+title+".pdf"
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print&nbsp;"old=%s&nbsp;"&nbsp;%&nbsp;old
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print&nbsp;"new&nbsp;=&nbsp;%s&nbsp;"&nbsp;%&nbsp;new
#这里一定要对新的文件名重新定义编码格式，而且一定是GBK，因为Windows中文版默认的就是GBK编码
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;new=new.encode(&#39;GBK&#39;)
#关闭文件流，不然无法更名
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stream.close()
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if(str(title)!="None"):
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;try:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;os.rename(old,&nbsp;new)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;except&nbsp;WindowsError,e:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#print&nbsp;str(e)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print&nbsp;e
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print"The&nbsp;file&nbsp;contian&nbsp;no&nbsp;title&nbsp;attribute!"&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;else:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print&nbsp;"This&nbsp;file&nbsp;is&nbsp;encrypted!"
if&nbsp;__name__=="__main__":
&nbsp;path=r"F:PapersICDE&#39;09Demos"
&nbsp;VisitDir(path)
但是这段代码还是有问题的：
1、有些pdf文件的title属性为空，或者并不是真正的文件名
[![用python对pdf批量重命名](http://s4.sinaimg.cn/middle/65db9984ga78e68d3f2d3&amp;690 "用python对pdf批量重命名")](http://photo.blog.sina.com.cn/showpic.html#blogid=65db99840100saue&amp;url=http://s4.sinaimg.cn/orignal/65db9984ga78e68d3f2d3)
这样的重命名无意义
2、有些pdf文件的title属性里有非拉丁字符，
[![用python对pdf批量重命名](http://s2.sinaimg.cn/middle/65db9984ga78e75b37da1&amp;690 "用python对pdf批量重命名")](http://photo.blog.sina.com.cn/showpic.html#blogid=65db99840100saue&amp;url=http://s2.sinaimg.cn/orignal/65db9984ga78e75b37da1)
这会报错
UnicodeEncodeError: &#39;ascii&#39; codec can&#39;t encode character u&#39;xe9&#39; in position 4: ordinal not in range(128)
后来大神又找到了一个更牛逼的库，pdfminer&nbsp;&nbsp;&nbsp;[http://www.unixuser.org/~euske/python/pdfminer/](http://www.unixuser.org/~euske/python/pdfminer/)
主要的想法就是用pfdminer的pdf2txt模块将pdf文件的第一页转换成文本，然后从中读取第一行作为文件名
得益于pdfminer强大的功能，这样的命名准确率非常高。只要你的pdf文件不是扫描版的（图片格式），都可以正确获取文件名
下面的代码要正常运行，必须与pdfminer中的pdf2txt.py位于同一目录下

#encoding:utf-8

&#39;&#39;&#39;
目的：根据文章的标题重命名title

采用两种方式获取文章的title
方式一：
读取PDF的title属性g，根据这个属性，更改次文档的名字！
也就是选中pdf文件右键后点击查看获取的
需要到：http://pybrary.net/pyPdf/
方式二：
根据pdf内容获取title
需要pdfminer
&#39;&#39;&#39;

import&nbsp;os
import&nbsp;operator
from&nbsp;pyPdf&nbsp;import&nbsp;PdfFileWriter,&nbsp;PdfFileReader
#对取得的文件命格式化，去掉其中的非法字符
def&nbsp;format(filename):
&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(isinstance(filename,&nbsp;str)):
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tuple=(&#39;?&#39;,&#39;╲&#39;,&#39;*&#39;,&#39;/&#39;,&#39;,&#39;,&#39;"&#39;,&#39;&lt;&#39;,&#39;&gt;&#39;,&#39;|&#39;,&#39;&ldquo;&#39;,&#39;"&#39;,&#39;，&#39;,&#39;&lsquo;&#39;,&#39;&rdquo;&#39;,&#39;,&#39;,&#39;/&#39;,&#39;:&#39;)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;char&nbsp;in&nbsp;tuple:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(filename.find(char)!=-1):
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filename=filename.replace(char,"&nbsp;")
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;filename
&nbsp;&nbsp;&nbsp;&nbsp;else:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;&#39;None&#39;

##&nbsp;添加因为pdf转换产生的乱码
key_value&nbsp;=&nbsp;{&nbsp;&#39;xefxacx81&#39;:&#39;fi&#39;}

#通过递归调用次方法依次遍历文件夹中的每个文件,如果后缀名是.pdf，则对其处理
def&nbsp;VisitDir(path):
&nbsp;&nbsp;&nbsp;&nbsp;li=os.listdir(path)
&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;p&nbsp;in&nbsp;li:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pathname=os.path.join(path,p)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;not&nbsp;os.path.isfile(pathname):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;VisitDir(pathname)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;back=os.path.splitext(pathname)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;backname=back[1]
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;backname==&#39;.pdf&#39;:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print&nbsp;pathname
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rename(pathname)
#文件改名程序
def&nbsp;rename(pathname):
&nbsp;&nbsp;&nbsp;&nbsp;stream=file(pathname,&nbsp;"rb")
&nbsp;&nbsp;&nbsp;&nbsp;input1&nbsp;=&nbsp;PdfFileReader(stream)
&nbsp;&nbsp;&nbsp;&nbsp;isEncrypted=input1.isEncrypted
&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;not(isEncrypted):&nbsp;
#这里的pathname包含路径以及文件名，根据/将起分割成一个list然后去除文件名，保留路径
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list=pathname.split("\")
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oldname=""
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;strname&nbsp;in&nbsp;list:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oldname+=strname+&#39;\&#39;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;old=oldname[0:len(oldname)-1]
#这就是去除文件名
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list.pop()
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;string=""
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;strname&nbsp;in&nbsp;list:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;string+=strname+&#39;\&#39;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print&nbsp;"string=&nbsp;%s"&nbsp;%&nbsp;string
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;##&nbsp;Option&nbsp;1:&nbsp;user&nbsp;attributes
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title&nbsp;=&nbsp;str(input1.getDocumentInfo().title)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#print&nbsp;"title&nbsp;=&nbsp;%s"&nbsp;%&nbsp;(input1.getDocumentInfo().title)&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;################&nbsp;jiang&nbsp;added&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#if(str(title)&nbsp;==&nbsp;"None"):
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;###Option2:&nbsp;use&nbsp;pdf&nbsp;content&nbsp;download
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;os.system(&#39;python&nbsp;pdf2txt.py&nbsp;-p&nbsp;1&nbsp;"&#39;+old+&#39;"&nbsp;&gt;c.txt&#39;)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;f&nbsp;=&nbsp;open("c.txt","rb")
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title&nbsp;=&nbsp;""
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a&nbsp;=&nbsp;f.readline()
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;while(&nbsp;a&nbsp;not&nbsp;in&nbsp;("rn","n")&nbsp;):
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title&nbsp;+=&nbsp;a
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a&nbsp;=&nbsp;f.readline()
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title&nbsp;=&nbsp;title.replace("rn","&nbsp;").strip()&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;###########&nbsp;jiang&nbsp;added&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title=format(title)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;key,value&nbsp;in&nbsp;key_value.iteritems():
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title&nbsp;=&nbsp;title.replace(key,value)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;#这里就是把先前得到的路径名加上得到的新文件名，再加上后缀名，得到新的文件名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;new=string+title+".pdf"
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print&nbsp;"old=%s&nbsp;"&nbsp;%&nbsp;old
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print&nbsp;"new&nbsp;=&nbsp;%s&nbsp;"&nbsp;%&nbsp;new
#这里一定要对新的文件名重新定义编码格式，而且一定是GBK，因为Windows中文版默认的就是GBK编码
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;new=new.encode(&#39;GBK&#39;)
#关闭文件流，不然无法更名
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stream.close()
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if(str(title)!="None"):
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;try:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;os.rename(old,&nbsp;new)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;except&nbsp;WindowsError,e:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print&nbsp;str(e)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;python&nbsp;pdf2txt.py&nbsp;-p&nbsp;1&nbsp;p43-nazir.pdf&nbsp;&gt;c.txt
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print"The&nbsp;file&nbsp;contian&nbsp;no&nbsp;title&nbsp;attribute!"&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;else:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print&nbsp;"This&nbsp;file&nbsp;is&nbsp;encrypted!"
if&nbsp;__name__=="__main__":
&nbsp;&nbsp;&nbsp;&nbsp;path=r"."&nbsp;#the current directory
&nbsp;&nbsp;&nbsp;&nbsp;VisitDir(path)

&nbsp;