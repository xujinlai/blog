---
title: Scrapy安装介绍
link: http://seeksky.duapp.com/index.php/scrapy%e5%ae%89%e8%a3%85%e4%bb%8b%e7%bb%8d/
author: xujinlai
description: 
post_id: 14002
created: 2013/11/26 09:32:44
created_gmt: 2013/11/26 09:32:44
comment_status: open
post_name: scrapy%e5%ae%89%e8%a3%85%e4%bb%8b%e7%bb%8d
status: publish
layout: post
---

# Scrapy安装介绍

http://www.cnblogs.com/txw1958/archive/2012/07/12/scrapy_installation_introduce.html  

一、 Scrapy简介

Scrapy is a fast high-level screen scraping and web crawling framework, used to crawl websites and extract structured data from their pages. It can be used for a wide range of purposes, from data mining to monitoring and automated testing.

官方主页： <http://www.scrapy.org/>

二、 安装Python2.7

官方主页：<http://www.python.org/>

下载地址：<http://www.python.org/ftp/python/2.7.3/python-2.7.3.msi>

**1) **安装python

安装目录：D:Python27

**2) **添加环境变量

略System Properties -> Advanced -> Environment Variables - >System Variables -> Path -> Edit

**3) **验证环境变量
    
    
    T:>set PathPath=C:WINDOWSsystem32;C:WINDOWS;C:WINDOWSSystem32Wbem;D:Rationalcommon;D:RationalClearCasebin;D:Python27;D:Python27ScriptsPATHEXT=.COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH

**4) **验证Python

![复制代码](http://common.cnblogs.com/images/copycode.gif)
    
    
    T:>pythonPython 2.7.3 (default, Apr 10 2012, 23:31:26) [MSC v.1500 32 bit (Intel)] on win32Type "help", "copyright", "credits" or "license" for more information.>>> exit()T:>

![复制代码](http://common.cnblogs.com/images/copycode.gif)

三、 安装Twisted

Twisted is an event-driven networking engine written in Python and licensed under the open source

**1) **安装setuptools

Download, build, install, upgrade, and uninstall Python packages -- easily!

官方主页：<http://pypi.python.org/pypi/setuptools>

下载地址：<http://pypi.python.org/packages/2.7/s/setuptools/setuptools-0.6c11.win32-py2.7.exe>