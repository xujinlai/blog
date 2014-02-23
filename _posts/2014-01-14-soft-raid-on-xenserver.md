---
layout: post
title: "Soft Raid On XenServer"
description: "如何在XenServer上建立软件RAID"
category: "virtualization"
tags: [virtualization, XenServer, RAID, Soft RAID, mdadm]
comments: true
share: true
---


### 前言
最近实验室买了几台新的服务器,自己动手试着安装了XenServer虚拟化平台,然后在上面试着做了软件RAID5,主要参考以下文章:
[**XenServer 6.1 with software RAID1 installation**](http://blog.danielss.com/?p=151)

<!--more-->


### 正文

XenServer的安装还是比较轻松的,基本上光盘刻好放进去,一步步按照提示输入相
关信息就好了. 基本上没有什么很大的难度,然后就是硬盘挂载部分,在安装的时
候只选择了一个盘挂载了RAID,由于我们服务器自带了一个SSD,以XenServer就装
在了SSD上面,而另外7个4TB的硬盘就准备挂载软件RAID.

#### 1.进入XenServer的控制界面之后,使用上下键选择切换到shell模式

#### 2.然后首先对磁盘进行分区,使用sgdisk命令就可以了:

~~~ sh
sgdisk --zap-all /dev/sdb
sgdisk --zap-all /dev/sdc
sgdisk --zap-all /dev/sdd
sgdisk --zap-all /dev/sde
sgdisk --zap-all /dev/sdf
sgdisk --zap-all /dev/sdg
sgdisk --zap-all /dev/sdh

sgdisk --mbrtogpt /dev/sdb
sgdisk --mbrtogpt /dev/sdc
sgdisk --mbrtogpt /dev/sdd
sgdisk --mbrtogpt /dev/sde
sgdisk --mbrtogpt /dev/sdf
sgdisk --mbrtogpt /dev/sdg
sgdisk --mbrtogpt /dev/sdh

sgdisk --largest-new=1 /dev/sdb
sgdisk --largest-new=1 /dev/sdc
sgdisk --largest-new=1 /dev/sdd
sgdisk --largest-new=1 /dev/sde
sgdisk --largest-new=1 /dev/sdf
sgdisk --largest-new=1 /dev/sdg
sgdisk --largest-new=1 /dev/sdh

sgdisk --typecode=1:fd00 /dev/sdb
sgdisk --typecode=1:fd00 /dev/sdc
sgdisk --typecode=1:fd00 /dev/sdd
sgdisk --typecode=1:fd00 /dev/sde
sgdisk --typecode=1:fd00 /dev/sdf
sgdisk --typecode=1:fd00 /dev/sdg
sgdisk --typecode=1:fd00 /dev/sdh
~~~

这里的sgdisk使用的几个参数分别是如下的意思:

  + `--zap-all`是将磁盘的mrb以及GPT数据清空
  + `--mbrtogpt`在磁盘上重新写GPT数据
  + `--largest-new`是以磁盘最大大小建立一个分区,后面跟的数字是分区的标号,**注意是从1开始**
  + `--typecode`是设置分区的识别号,`fd00`表示该分区是一个`Linux RAID auto detect`分区,至于有什么区别我也说不清楚,
  貌似是用于RAID分区的自动加载,详情参考[Autodetect - Linux Raid Wiki](https://raid.wiki.kernel.org/index.php/Autodetect)

#### 3.然后使用mdadm命令建立软件RAID分区:

~~~ sh
mdadm --create /dev/md0 --level=5 --raid-devices=7 /dev/sd[b-h]1
~~~

这里mdadm的几个参数都比较好理解:

  + `--create`是创建软件RAID的基本指令,后面跟着的是设备路径
  + `--lever`是指的RAID的级别,mdadm支持**0,1,5,6,10**还有其他两种软件RAID的方式,我这里由于创建RAID5分区,
  所以参数设置为5,(RAID级别的选择详见wiki:[RAID](http://zh.wikipedia.org/wiki/RAID))
  + `--raid-devices`这个是RAID使用的分区设备路径,我这里从`sdb`到`sdh`一共七个设备,参数后面跟的七个设备的路径
  + 补充说明:如果需要其他设置还有一些参数可以设置,比图`--spare-devices`参数之后跟设备路径指定热备盘,另外还有`--metadata`参数后面接版本号用于指定RAID超级分区的版本,我看wiki的[RAID设置](https://raid.wiki.kernel.org/index.php/RAID_setup)里面推荐如果作为引导分区的话使用1.2版本会比较好.

#### 4.查看RAID盘初始化状态,并挂载RAID盘到XenServer上.
使用两个简单的命令就好了

~~~ sh
watch -n 1 cat /proc/mdstat
~~~

这个命令会查看RAID盘的状况,RAID5在建立的时候会有一次扫描,需要的时间比较
久,但是这时候磁盘就可以使用了,只是不要重启或进行其他断电操作. 然后是将
RAID盘信息写入mdadm的配置文件中,并将其加入XenServer的SR设备中.

~~~ sh
echo DEVICE /dev/sd[b-h]1 >> /etc/mdadm.conf
mdadm --detail --scan >> /etc/mdadm.conf
xe sr-create content-type=user device-config:device=/dev/md0 name-label="Soft Raid5 on Server02" shared=false type=lvm
~~~

*附加说明*: 通过`madadm --detail --scan`导入的配置文件会提示出错,说`metadata 1.0`不能识别的错误,具体原因不明,但是不影响使用,如果觉得看着不舒服,编辑`/etc/mdadm.conf`文件,将里面的`metadata=1.0`删掉就行了

### 附录:
这里提供一下RAID对比的表格:


RAID等级|	最少硬盘|	最大容错|	可用容量|	读取性能|	写入性能|	安全性|	目的|	应用产业
---------------|--------------|----------------|---------------|-----------|---------|--------------|----|----------
单一硬盘|	(参考)|	0|	1|	1|	1|	无
|----
JBOD|	1|	0|	    n|	    1|	    1|	    无（同RAID 0）|	增加容量|	个人（暂时）存储备份
|----
0|	   2|	0|	    n|	    n|	    n|	    一个硬盘异常，全部硬盘都会异常|	追求最大容量、速度|	3D产业实时渲染、视频剪接高速缓存用途
1|	   2|	n-1|	n/2|	n|	    1|	    最高，一个正常即可|	追求最大安全性|	个人、企业备份
|----
5|	   3|	1|	    n-1|	n-1|	n-1|	高|	追求最大容量、最小预算|	个人、企业备份
6|	   4|	2|	    n-2|	n-2|	n-2|	安全性较RAID 5高|	同RAID 5，但较安全|	个人、企业备份
|----
10|	4|	n/2|	n/2|	n|	    n/2|	安全性高|	综合RAID 0/1优点，理论速度较快|	大型数据库、服务器
{: rules="groups"}
