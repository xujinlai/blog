---
title: 用python对pdf批量重命名
link: http://seeksky.duapp.com/index.php/%e7%94%a8python%e5%af%b9pdf%e6%89%b9%e9%87%8f%e9%87%8d%e5%91%bd%e5%90%8d/
author: xujinlai
description: 
post_id: 13003
created: 2013/11/26 09:32:44
created_gmt: 2013/11/26 09:32:44
comment_status: open
post_name: %e7%94%a8python%e5%af%b9pdf%e6%89%b9%e9%87%8f%e9%87%8d%e5%91%bd%e5%90%8d
status: publish
layout: post
---

# 用python对pdf批量重命名

正当我很嗨的下着infocom2013年的论文的时候

我忽视了一个问题，下了之后完全不知道谁是谁

然后我就崩溃了

然后找到了这个帖子，虽然代码有挺大的问题，不过基本上还能用

后面那一段取pdf第一行标题的位置没有做文件名长度的限制

我做了一个限制32个字符（NTFS貌似最长是128个字符）

更改代码片段如下：

 

 

 
    
    
     #这里就是把先前得到的路径名加上得到的新文件名，再加上后缀名，得到新的文件名
    
            title=title[:32]   #这里就是我添加的代码，改了之后就不会报文件名过长的错误了
    
            new=string+title+".pdf"
    
            print "old=%s " % old

 

 

他的代码中还有一处问题，就是字符串编码的问题，会导致很多符号无法识别，比如（？）这样的字符都会报错

然后我顺便把编码方式从GBK改成GB2312了，搞定收工

 
    
    
            print "new = %s " % new
    #这里一定要对新的文件名重新定义编码格式，而且一定是GBK，因为Windows中文版默认的就是GBK编码
            new=new.encode('GB2312')
    #关闭文件流，不然无法更名
            stream.close()

 

 

本文转载自[点击打开链接](http://blog.sina.com.cn/s/blog_65db99840100saue.html)

如下：

这两天全组的人都被shadi抓着去下各种会议论文，有些会议还好，可以直接批量下载。像IEEE和ACM的会议，只能从学校图书馆里进数据库，然后一篇篇地打开、保存，而且保存下来的pdf文件名字都是数字。还有些是从google scholar里搜出来的，名字更加没有规律了。

大神jhonglei同学见状，自告奋勇地上网搜索了一番，给出了一段可以根据pdf文件的title属性对pdf文件进行批量重命名的python代码。

![用python对pdf批量重命名](http://s10.sinaimg.cn/middle/65db9984ga78e49bd09a9&690)