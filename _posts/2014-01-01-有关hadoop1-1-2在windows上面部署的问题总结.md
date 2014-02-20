---
layout: post
title: "有关hadoop1.1.2在windows上面部署的问题总结"
id: 13
date: 2013-11-27 00:43:22
tags: 
- Hadoop
categories: 
- Hadoop
---

由于特殊要求，导致我最近在弄在windows上面部署hadoop的问题

本身这就是个逆天的事情，又碰到时运不济，各种问题层出不穷

不过这些问题基本上都和cygwin跑的windows文件系统与linux文件系统差异性的位置造成的

-------------正文开始--------------
问题一

java.io.IOException: File /tmp/hadoop-.../mapred/system/jobtracker.info could only be replicated to 0 nodes, instead of 1   f1 l; B0 Q9 f5 T

这个问题其实一般来讲是datanode启动失败造成的

这里面datanode启动失败的情况多种多样

尝试以下方法：

1.**$hadoop namenode -format **

2.清空之前版本运行的残留文件夹tmp中的文件

3.执行$hadoop datanode    命令手动驱动datanode查看出错原因

最终能搞定

问题二：

**Permission denied”错误**

这个问题一般是权限问题

解决方法：设置hdfs-site.xml配置文件中的权限检查为false

_&lt;property&gt;_

_ &lt;name&gt;dfs.permissions&lt;/name&gt;_

_ &lt;value&gt;false&lt;/value&gt;_

_ &lt;description&gt;_

_   If "true", enable permission checking in HDFS._

_   If "false", permission checking is turned off,_

_   but all other behavior is unchanged._

_   Switching from one parameter value to the other does not change themode,_

_   owner or group of files or directories._

_ &lt;/description&gt;_

_&lt;/property&gt;_

问题3：

**“Failed to set permissions of path”错误**

这个错误可能出现在若干地方，例如taskTracker不启动、运行wordcount程序直接报此错误等。通常看到的错误都是不能将某个文件或目录设置为权限0700或0755等。

这个问题有很多人遇到过，是某些hadoop版本中存在的bug，在windows系统中不能兼容文件权限操作。

终极方法修改hadoop源代码，将权限操作验证的代码屏蔽掉：

修改hadoop的FileUtil类下如下代码：

**private static void** checkReturnValue(**boolean** rv, File p,

                                      FsPermission permission

                                       ) **throws** IOException {

//    if (!rv) {

//      throw new IOException("Failed to setpermissions of path: " + p +

//                            " to " +

//                           String.format("%04o", permission.toShort()));

//    }

  }

这里还涉及到在windows上面编译hadoop的过程

详情参阅[http://blog.csdn.net/liu_jason/article/details/7707472](http://blog.csdn.net/liu_jason/article/details/7707472)

**编译的时候遇到的问题层出不穷**

**基本上解决不了，最后在ubuntu上面一次搞定**

问题4：

类似这样的错误信息

java.io.FileNotFoundException: D:\Installer\Cygwin\home\lee\hadoop-1.0.4\logs\userlogs\job_201304162015_0001\attempt_201304162015_0001_m_000003_2\stderr (系统找不到指定的路径。) 

发现在org.apache.hadoop.fs.RawLocalFileSystem.mkdirs(Path)方法中，建立文件的路径方法检查attempt_201303232144_0002_m_000001_0是否为文件夹时会失败！ 

对于linux来说，这些就是引用到另一个文件夹，它本身应该也是文件夹！但是window的jdk不认识这些东西！ 

暂时没看见解决方法

然后找到一个台湾小伙改的hadoop1.0.3可以在windows上面跑

**名字叫windoop，网站：[https://code.google.com/p/windoop/](https://code.google.com/p/windoop/)**

在这里向他表示致敬！！

到此在windows上面部署hadoop告一段落

真心是逆天的事！！！！