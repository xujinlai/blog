---
layout: post
title: "【已解决】安装Python模块mmseg出错：error: Unable to find vcvarsall.bat"
id: 19002
date: 2013-11-26 09:32:44
tags: 
- Python
- Scrapy
categories: 
- original
---

http://www.crifan.com/python_mmseg_error_unable_to_find_vcvarsall_bat/

【问题】

折腾：

[【original】折腾Python中的mmseg中文分词模块](http://www.crifan.com/try_python_mmseg_chinese_segment_on_mmseg_algorithm)

期间，安装出错：

<table style="font-variant: inherit; border-collapse: collapse; border-spacing: 0px; width: 589px; margin: 0px !important; padding: 0px !important; border: 1px solid #c0c0c0 !important; font-size: 1em !important; line-height: 1.1em !important; vertical-align: baseline !important; outline: 0px !important; background-image: none !important; float: none !important; position: static !important; left: auto !important; top: auto !important; right: auto !important; bottom: auto !important; height: auto !important; min-height: auto !important; border-top-left-radius: 0px !important; border-top-right-radius: 0px !important; border-bottom-right-radius: 0px !important; border-bottom-left-radius: 0px !important; overflow: visible !important; box-sizing: content-box !important;" border="0" cellspacing="0" cellpadding="0">
<tbody style="font-variant: inherit; margin: 0px !important; padding: 0px !important; border: 0px !important; font-size: 1em !important; line-height: 1.1em !important; vertical-align: baseline !important; outline: 0px !important; background-image: none !important; float: none !important; position: static !important; left: auto !important; top: auto !important; right: auto !important; bottom: auto !important; height: auto !important; width: auto !important; min-height: auto !important; border-top-left-radius: 0px !important; border-top-right-radius: 0px !important; border-bottom-right-radius: 0px !important; border-bottom-left-radius: 0px !important; overflow: visible !important; box-sizing: content-box !important;">
<tr style="font-variant: inherit; margin: 0px !important; padding: 0px !important; border: 0px !important; font-size: 1em !important; line-height: 1.1em !important; vertical-align: baseline !important; outline: 0px !important; background-image: none !important; float: none !important; position: static !important; left: auto !important; top: auto !important; right: auto !important; bottom: auto !important; height: auto !important; width: auto !important; min-height: auto !important; border-top-left-radius: 0px !important; border-top-right-radius: 0px !important; border-bottom-right-radius: 0px !important; border-bottom-left-radius: 0px !important; overflow: visible !important; box-sizing: content-box !important;">
<td class="gutter" style="font-variant: inherit; margin: 0px !important; padding: 5px !important; border: 0px !important; font-family: Consolas, 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace !important; font-size: 1em !important; line-height: 1.1em !important; vertical-align: baseline !important; outline: 0px !important; background-image: none !important; float: none !important; position: static !important; left: auto !important; top: auto !important; right: auto !important; bottom: auto !important; height: auto !important; width: auto !important; min-height: auto !important; border-top-left-radius: 0px !important; border-top-right-radius: 0px !important; border-bottom-right-radius: 0px !important; border-bottom-left-radius: 0px !important; overflow: visible !important; box-sizing: content-box !important;">
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31</td>
<td class="code" style="font-variant: inherit; width: 541px; margin: 0px !important; padding: 0px !important; border: 0px !important; font-family: Consolas, 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace !important; font-size: 1em !important; line-height: 1.1em !important; vertical-align: baseline !important; outline: 0px !important; background-image: none !important; float: none !important; position: static !important; left: auto !important; top: auto !important; right: auto !important; bottom: auto !important; height: auto !important; min-height: auto !important; border-top-left-radius: 0px !important; border-top-right-radius: 0px !important; border-bottom-right-radius: 0px !important; border-bottom-left-radius: 0px !important; overflow: visible !important; box-sizing: content-box !important;">

`E:Dev_Toolspythonmodulesmmsegmmseg-1.3.0&gt;setup.``install``all`
`runni``install``all`
`running bdist_egg`
`running egg_info`
`writing mmseg.egg-infoPKG-INFO`
`writi``top``top-level names to mmseg.egg-infotop_level.txt`
`writing dependency_links to mmseg.egg-infodependency_links.txt`
`reading manife``file``i``'mmseg.egg-infoSOURCES.txt'``xt'`
`writing manife``file``i``'mmseg.egg-infoSOURCES.txt'``xt'`
`installing library code to buildbdist.win-amd64egg`
`running install_lib`
`running build_py`
`creating build`
`creating buildlib.win-amd64-2.7`
`creating buildlib.win-amd64-2.7mmseg`
`copying mmsegsearch.py -&gt; buildlib.win-amd64-2.7mmseg`
`copying mmsegword2.py -&gt; buildlib.win-amd64-2.7mmseg`
`copying mmseg_mmseg.py -&gt; buildlib.win-amd64-2.7mmseg`
`copying mmseg__init__.py -&gt; buildlib.win-amd64-2.7mmseg`
`creating buildlib.win-amd64-2.7mmsegdata`
`copy``test``mmsegdatatest.py -&gt; buildlib.win-amd64-2.7mmsegdata`
`copying mmsegdataword2_gen.py -&gt; buildlib.win-amd64-2.7mmsegdata`
`copying mmsegdataword_in_word_rm.py -&gt; buildlib.win-amd64-2.7mmsegdata`
`copying mmsegdata__init__.py -&gt; buildlib.win-amd64-2.7mmsegdata`
`creating buildlib.win-amd64-2.7mmsegmmseg_cpp`
`copying mmsegmmseg_cpp__init__.py -&gt; buildlib.win-amd64-2.7mmsegmmseg_cpp`
`copying mmsegdatachars.dic -&gt; buildlib.win-amd64-2.7mmsegdata`
`copying mmsegdatawords.dic -&gt; buildlib.win-amd64-2.7mm``'mmseg'``a`
`running build_ext`
`building``find``seg' extension`
`error: Unable to find vcvarsall.bat`
</td>
</tr>
</tbody>
</table>

【解决过程】

1.参考了：

[python—解决“Unable to find vcvarsall.bat”错误](http://my.oschina.net/zhangdapeng89/blog/54407)

和

[error: Unable to find vcvarsall.bat](http://stackoverflow.com/questions/2817869/error-unable-to-find-vcvarsall-bat)

都是让安装mingw32.

此处懒得装。

2。打算去试试，看看能否利用我已有的cygwin去实现编译。

暂时放弃此复杂的方法。

3.参考上面那个：

[error: Unable to find vcvarsall.bat](http://stackoverflow.com/questions/2817869/error-unable-to-find-vcvarsall-bat)

中别人的回答，去：

执行：

SET VS90COMNTOOLS=%VS100COMNTOOLS%

然后再去编译，貌似至少可以消除此处的问题了。

【总结】

当使用

setup.py install

去安装Python模块出现：

error: Unable to find vcvarsall.bat

的错误时，

对于像我这里：

*   Python 2.7

    *   python2.7会去查找已安装的Visual Studio 2008，即VS90（其使用VS90COMNTOOLS这个环境变量）

*   已经安装了VS2010

    *   对应的：C:Program Files (x86)Microsoft Visual Studio 10.0Common7Tools中就有了vsvars32.bat

的，不想安装mingw32的人来说，可以：

1.设置环境变量

执行：

<table style="font-variant: inherit; border-collapse: collapse; border-spacing: 0px; width: 589px; margin: 0px !important; padding: 0px !important; border: 1px solid #c0c0c0 !important; font-size: 1em !important; line-height: 1.1em !important; vertical-align: baseline !important; outline: 0px !important; background-image: none !important; float: none !important; position: static !important; left: auto !important; top: auto !important; right: auto !important; bottom: auto !important; height: auto !important; min-height: auto !important; border-top-left-radius: 0px !important; border-top-right-radius: 0px !important; border-bottom-right-radius: 0px !important; border-bottom-left-radius: 0px !important; overflow: visible !important; box-sizing: content-box !important;" border="0" cellspacing="0" cellpadding="0">
<tbody style="font-variant: inherit; margin: 0px !important; padding: 0px !important; border: 0px !important; font-size: 1em !important; line-height: 1.1em !important; vertical-align: baseline !important; outline: 0px !important; background-image: none !important; float: none !important; position: static !important; left: auto !important; top: auto !important; right: auto !important; bottom: auto !important; height: auto !important; width: auto !important; min-height: auto !important; border-top-left-radius: 0px !important; border-top-right-radius: 0px !important; border-bottom-right-radius: 0px !important; border-bottom-left-radius: 0px !important; overflow: visible !important; box-sizing: content-box !important;">
<tr style="font-variant: inherit; margin: 0px !important; padding: 0px !important; border: 0px !important; font-size: 1em !important; line-height: 1.1em !important; vertical-align: baseline !important; outline: 0px !important; background-image: none !important; float: none !important; position: static !important; left: auto !important; top: auto !important; right: auto !important; bottom: auto !important; height: auto !important; width: auto !important; min-height: auto !important; border-top-left-radius: 0px !important; border-top-right-radius: 0px !important; border-bottom-right-radius: 0px !important; border-bottom-left-radius: 0px !important; overflow: visible !important; box-sizing: content-box !important;">
<td class="gutter" style="font-variant: inherit; margin: 0px !important; padding: 5px !important; border: 0px !important; font-family: Consolas, 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace !important; font-size: 1em !important; line-height: 1.1em !important; vertical-align: baseline !important; outline: 0px !important; background-image: none !important; float: none !important; position: static !important; left: auto !important; top: auto !important; right: auto !important; bottom: auto !important; height: auto !important; width: auto !important; min-height: auto !important; border-top-left-radius: 0px !important; border-top-right-radius: 0px !important; border-bottom-right-radius: 0px !important; border-bottom-left-radius: 0px !important; overflow: visible !important; box-sizing: content-box !important;">
1</td>
<td class="code" style="font-variant: inherit; width: 541px; margin: 0px !important; padding: 0px !important; border: 0px !important; font-family: Consolas, 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace !important; font-size: 1em !important; line-height: 1.1em !important; vertical-align: baseline !important; outline: 0px !important; background-image: none !important; float: none !important; position: static !important; left: auto !important; top: auto !important; right: auto !important; bottom: auto !important; height: auto !important; min-height: auto !important; border-top-left-radius: 0px !important; border-top-right-radius: 0px !important; border-bottom-right-radius: 0px !important; border-bottom-left-radius: 0px !important; overflow: visible !important; box-sizing: content-box !important;">

`SET VS90COMNTOOLS=%VS100COMNTOOLS%`
</td>
</tr>
</tbody>
</table>

2.再去安装：

<table style="font-variant: inherit; border-collapse: collapse; border-spacing: 0px; width: 589px; margin: 0px !important; padding: 0px !important; border: 1px solid #c0c0c0 !important; font-size: 1em !important; line-height: 1.1em !important; vertical-align: baseline !important; outline: 0px !important; background-image: none !important; float: none !important; position: static !important; left: auto !important; top: auto !important; right: auto !important; bottom: auto !important; height: auto !important; min-height: auto !important; border-top-left-radius: 0px !important; border-top-right-radius: 0px !important; border-bottom-right-radius: 0px !important; border-bottom-left-radius: 0px !important; overflow: visible !important; box-sizing: content-box !important;" border="0" cellspacing="0" cellpadding="0">
<tbody style="font-variant: inherit; margin: 0px !important; padding: 0px !important; border: 0px !important; font-size: 1em !important; line-height: 1.1em !important; vertical-align: baseline !important; outline: 0px !important; background-image: none !important; float: none !important; position: static !important; left: auto !important; top: auto !important; right: auto !important; bottom: auto !important; height: auto !important; width: auto !important; min-height: auto !important; border-top-left-radius: 0px !important; border-top-right-radius: 0px !important; border-bottom-right-radius: 0px !important; border-bottom-left-radius: 0px !important; overflow: visible !important; box-sizing: content-box !important;">
<tr style="font-variant: inherit; margin: 0px !important; padding: 0px !important; border: 0px !important; font-size: 1em !important; line-height: 1.1em !important; vertical-align: baseline !important; outline: 0px !important; background-image: none !important; float: none !important; position: static !important; left: auto !important; top: auto !important; right: auto !important; bottom: auto !important; height: auto !important; width: auto !important; min-height: auto !important; border-top-left-radius: 0px !important; border-top-right-radius: 0px !important; border-bottom-right-radius: 0px !important; border-bottom-left-radius: 0px !important; overflow: visible !important; box-sizing: content-box !important;">
<td class="gutter" style="font-variant: inherit; margin: 0px !important; padding: 5px !important; border: 0px !important; font-family: Consolas, 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace !important; font-size: 1em !important; line-height: 1.1em !important; vertical-align: baseline !important; outline: 0px !important; background-image: none !important; float: none !important; position: static !important; left: auto !important; top: auto !important; right: auto !important; bottom: auto !important; height: auto !important; width: auto !important; min-height: auto !important; border-top-left-radius: 0px !important; border-top-right-radius: 0px !important; border-bottom-right-radius: 0px !important; border-bottom-left-radius: 0px !important; overflow: visible !important; box-sizing: content-box !important;">
1</td>
<td class="code" style="font-variant: inherit; width: 541px; margin: 0px !important; padding: 0px !important; border: 0px !important; font-family: Consolas, 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace !important; font-size: 1em !important; line-height: 1.1em !important; vertical-align: baseline !important; outline: 0px !important; background-image: none !important; float: none !important; position: static !important; left: auto !important; top: auto !important; right: auto !important; bottom: auto !important; height: auto !important; min-height: auto !important; border-top-left-radius: 0px !important; border-top-right-radius: 0px !important; border-bottom-right-radius: 0px !important; border-bottom-left-radius: 0px !important; overflow: visible !important; box-sizing: content-box !important;">

`setup.py ``install`
</td>
</tr>
</tbody>
</table>

就可以正常，编译，安装了。

注：

不过，我这里，好像是mmseg比较特殊，所有又出现了其他错误：

LINK : error LNK2001: 无法解析的外部符号 initmmseg

详细折腾过程参见：

[【未解决】Python中安装mmseg时编译出错：LINK : error LNK2001: 无法解析的外部符号 initmmseg](http://www.crifan.com/python_mmseg_link_error_lnk2001_unresolved_external_symbol_initmmseg)