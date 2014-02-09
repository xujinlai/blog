---
title: 有关hadoop1.1.2在windows上面部署的问题总结
link: http://seeksky.duapp.com/index.php/%e6%9c%89%e5%85%b3hadoop1-1-2%e5%9c%a8windows%e4%b8%8a%e9%9d%a2%e9%83%a8%e7%bd%b2%e7%9a%84%e9%97%ae%e9%a2%98%e6%80%bb%e7%bb%93-2/
author: xujinlai
description: 
post_id: 31001
created: 2013/11/26 09:32:44
created_gmt: 2013/11/26 09:32:44
comment_status: open
post_name: %e6%9c%89%e5%85%b3hadoop1-1-2%e5%9c%a8windows%e4%b8%8a%e9%9d%a2%e9%83%a8%e7%bd%b2%e7%9a%84%e9%97%ae%e9%a2%98%e6%80%bb%e7%bb%93-2
status: publish
layout: post
---

<!--由于特殊要求，导致我最近在弄在windows上面部署hadoop的问题
<br />
<br />本身这就是个逆天的事情，又碰到时运不济，各种问题层出不穷
<br />
<br />不过这些问题基本上都和cygwin跑的windows文件系统与linux文件系统差异性的位置造成的-->

# 有关hadoop1.1.2在windows上面部署的问题总结

由于特殊要求，导致我最近在弄在windows上面部署hadoop的问题

本身这就是个逆天的事情，又碰到时运不济，各种问题层出不穷

不过这些问题基本上都和cygwin跑的windows文件系统与linux文件系统差异性的位置造成的

\-------------正文开始--------------  
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

_<property>_

_ <name>dfs.permissions</name>_

_ <value>false</value>_

_ <description>_

_   If "true", enable permission checking in HDFS._

_   If "false", permission checking is turned off,_

_   but all other behavior is unchanged._

_   Switching from one parameter value to the other does not change themode,_

_   owner or group of files or directories._

_ </description>_

_</property>_

 

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

详情参阅<http://blog.csdn.net/liu_jason/article/details/7707472>

**编译的时候遇到的问题层出不穷**

**基本上解决不了，最后在ubuntu上面一次搞定**

问题4：

类似这样的错误信息