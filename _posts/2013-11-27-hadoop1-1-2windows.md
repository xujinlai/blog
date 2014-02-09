---
title: 有关hadoop1.1.2在windows上面部署的问题总结
link: http://seeksky.duapp.com/index.php/%e6%9c%89%e5%85%b3hadoop1-1-2%e5%9c%a8windows%e4%b8%8a%e9%9d%a2%e9%83%a8%e7%bd%b2%e7%9a%84%e9%97%ae%e9%a2%98%e6%80%bb%e7%bb%93/
author: xujinlai
description: 
post_id: 13
created: 2013/11/27 00:43:22
created_gmt: 2013/11/26 16:43:22
comment_status: open
post_name: %e6%9c%89%e5%85%b3hadoop1-1-2%e5%9c%a8windows%e4%b8%8a%e9%9d%a2%e9%83%a8%e7%bd%b2%e7%9a%84%e9%97%ae%e9%a2%98%e6%80%bb%e7%bb%93
status: publish
layout: post
---

# 有关hadoop1.1.2在windows上面部署的问题总结

由于特殊要求，导致我最近在弄在windows上面部署hadoop的问题 本身这就是个逆天的事情，又碰到时运不济，各种问题层出不穷 不过这些问题基本上都和cygwin跑的windows文件系统与linux文件系统差异性的位置造成的 \-------------正文开始-------------- 问题一 java.io.IOException: File /tmp/hadoop-.../mapred/system/jobtracker.info could only be replicated to 0 nodes, instead of 1   f1 l; B0 Q9 f5 T 这个问题其实一般来讲是datanode启动失败造成的 这里面datanode启动失败的情况多种多样 尝试以下方法： 1.**$hadoop namenode -format ** 2.清空之前版本运行的残留文件夹tmp中的文件 3.执行$hadoop datanode    命令手动驱动datanode查看出错原因 最终能搞定 问题二： **Permission denied”错误** 这个问题一般是权限问题

解决方法：设置hdfs-site.xml配置文件中的权限检查为false

_<property>_

_ <name>dfs.permissions</name>_

_ <value>false</value>_

_ <description>_

_   If "true", enable permission checking in HDFS._

_   If "false", permission checking is turned off,_

_   but all other behavior is unchanged._