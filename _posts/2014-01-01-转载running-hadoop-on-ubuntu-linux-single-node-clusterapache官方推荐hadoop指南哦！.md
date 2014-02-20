---
layout: post
title: "[转载]Running Hadoop on Ubuntu Linux (Single-Node Cluster)(apache官方推荐hadoop指南哦！)"
id: 29001
date: 2013-11-26 09:32:44
tags: 
- Cloud
- Hadoop
categories: 
- Hadoop
---

转自：[http://www.michael-noll.com/tutorials/running-hadoop-on-ubuntu-linux-single-node-cluster/](http://www.michael-noll.com/tutorials/running-hadoop-on-ubuntu-linux-single-node-cluster/)

这篇是haddop官方推荐的指南，写的非常详细

感谢作者的辛勤耕耘

----------------正文开始-----------------

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">n this tutorial I will describe the required steps for setting up a&nbsp;_pseudo-distributed, single-node_&nbsp;Hadoop cluster backed by the Hadoop Distributed File System, running on Ubuntu Linux.

Are you looking for the&nbsp;[multi-node cluster tutorial](http://www.michael-noll.com/tutorials/running-hadoop-on-ubuntu-linux-multi-node-cluster/)? Just&nbsp;[head over there](http://www.michael-noll.com/tutorials/running-hadoop-on-ubuntu-linux-multi-node-cluster/).

Hadoop is a framework written in Java for running applications on large clusters of commodity hardware and incorporates features similar to those of the&nbsp;[Google File System (GFS)](http://en.wikipedia.org/wiki/Google_File_System)&nbsp;and of the&nbsp;[MapReduce](http://en.wikipedia.org/wiki/MapReduce)&nbsp;computing paradigm. Hadoop&rsquo;s&nbsp;[HDFS](http://hadoop.apache.org/hdfs/docs/current/hdfs_design.html)&nbsp;is a highly fault-tolerant distributed file system and, like Hadoop in general, designed to be deployed on low-cost hardware. It provides high throughput access to application data and is suitable for applications that have large data sets.

The main goal of this tutorial is to get a simple Hadoop installation up and running so that you can play around with the software and learn more about it.

This tutorial has been tested with the following software versions:

*   [Ubuntu Linux](http://www.ubuntu.com/)&nbsp;10.04 LTS (deprecated: 8.10 LTS, 8.04, 7.10, 7.04)
*   [Hadoop](http://hadoop.apache.org/)&nbsp;1.0.3, released May 2012

![](http://www.michael-noll.com/blog/uploads/Yahoo-hadoop-cluster_OSCON_2007.jpeg "Cluster of machines running Hadoop at Yahoo!")

Figure 1: Cluster of machines running Hadoop at Yahoo! (Source: Yahoo!)

# Prerequisites

## Sun Java 6

Hadoop requires a working Java 1.5+ (aka Java 5) installation. However, using&nbsp;Java 1.6 (aka Java 6) is recommended&nbsp;for running Hadoop. For the sake of this tutorial, I will therefore describe the installation of Java 1.6.

Important Note: The apt instructions below are taken from&nbsp;[this SuperUser.com thread](http://superuser.com/questions/353983/how-do-i-install-the-sun-java-sdk-in-ubuntu-11-10-oneric). I got notified that the previous instructions that I provided no longer work. Please be aware that adding a third-party repository to your Ubuntu configuration is considered a security risk. If you do not want to proceed with the apt instructions below, feel free to install Sun JDK 6 via alternative means (e.g. by&nbsp;[downloading the binary package from Oracle](http://www.oracle.com/technetwork/java/javase/downloads/)) and then continue with the next section in the tutorial.
</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
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

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 749.5999755859375px;">

</td>
</tr>
</tbody>
</table>

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">The full JDK which will be placed in&nbsp;`/usr/lib/jvm/java-6-sun`&nbsp;(well, this directory is actually a symlink on Ubuntu).

After installation, make a quick check whether Sun&rsquo;s JDK is correctly set up:

</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
1
2
3
4

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 757.5999755859375px;">

</td>
</tr>
</tbody>
</table>

## Adding a dedicated Hadoop system user

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">We will use a dedicated Hadoop user account for running Hadoop. While that&rsquo;s not required it is recommended because it helps to separate the Hadoop installation from other software applications and user accounts running on the same machine (think: security, permissions, backups, etc).

</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
1
2

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 757.5999755859375px;">

</td>
</tr>
</tbody>
</table>

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">This will add the user&nbsp;`hduser`&nbsp;and the group&nbsp;`hadoop`&nbsp;to your local machine.

## Configuring SSH

Hadoop requires SSH access to manage its nodes, i.e. remote machines plus your local machine if you want to use Hadoop on it (which is what we want to do in this short tutorial). For our single-node setup of Hadoop, we therefore need to configure SSH access to&nbsp;`localhost`for the&nbsp;`hduser`&nbsp;user we created in the previous section.

I assume that you have SSH up and running on your machine and configured it to allow SSH public key authentication. If not, there are&nbsp;[several online guides](http://ubuntuguide.org/)&nbsp;available.

First, we have to generate an SSH key for the&nbsp;`hduser`&nbsp;user.

</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
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

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 749.5999755859375px;">

</td>
</tr>
</tbody>
</table>

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">The second line will create an RSA key pair with an empty password. Generally, using an empty password is not recommended, but in this case it is needed to unlock the key without your interaction (you don&rsquo;t want to enter the passphrase every time Hadoop interacts with its nodes).

Second, you have to enable SSH access to your local machine with this newly created key.

</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
1

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 757.5999755859375px;">

</td>
</tr>
</tbody>
</table>

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">The final step is to test the SSH setup by connecting to your local machine with the&nbsp;`hduser`user. The step is also needed to save your local machine&rsquo;s host key fingerprint to the&nbsp;`hduser`user&rsquo;s&nbsp;`known_hosts`&nbsp;file. If you have any special SSH configuration for your local machine like a non-standard SSH port, you can define host-specific SSH options in&nbsp;`$HOME/.ssh/config`&nbsp;(see&nbsp;`man ssh_config`&nbsp;for more information).

</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
1
2
3
4
5
6
7
8
9

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 757.5999755859375px;">

</td>
</tr>
</tbody>
</table>

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">If the SSH connect should fail, these general tips might help:

*   Enable debugging with&nbsp;`ssh -vvv localhost`&nbsp;and investigate the error in detail.
*   Check the SSH server configuration in&nbsp;`/etc/ssh/sshd_config`, in particular the options&nbsp;`PubkeyAuthentication`&nbsp;(which should be set to&nbsp;`yes`) and&nbsp;`AllowUsers`&nbsp;(if this option is active, add the&nbsp;`hduser`&nbsp;user to it). If you made any changes to the SSH server configuration file, you can force a configuration reload with&nbsp;`sudo /etc/init.d/ssh reload`.

## Disabling IPv6

One problem with IPv6 on Ubuntu is that using&nbsp;`0.0.0.0`&nbsp;for the various networking-related Hadoop configuration options will result in Hadoop binding to the IPv6 addresses of my Ubuntu box. In my case, I realized that there&rsquo;s no practical point in enabling IPv6 on a box when you are not connected to any IPv6 network. Hence, I simply disabled IPv6 on my Ubuntu machine. Your mileage may vary.

To disable IPv6 on Ubuntu 10.04 LTS, open&nbsp;`/etc/sysctl.conf`&nbsp;in the editor of your choice and add the following lines to the end of the file:

/etc/sysctl.conf
</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
1
2
3
4

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 757.5999755859375px;">

</td>
</tr>
</tbody>
</table>

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">You have to reboot your machine in order to make the changes take effect.

You can check whether IPv6 is enabled on your machine with the following command:

</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
1

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 757.5999755859375px;">

</td>
</tr>
</tbody>
</table>

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">A return value of 0 means IPv6 is enabled, a value of 1 means disabled (that&rsquo;s what we want).

### Alternative

You can also disable IPv6 only for Hadoop as documented in&nbsp;[HADOOP-3437](https://issues.apache.org/jira/browse/HADOOP-3437). You can do so by adding the following line to&nbsp;`conf/hadoop-env.sh`:

conf/hadoop-env.sh
</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
1

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 757.5999755859375px;">

</td>
</tr>
</tbody>
</table>

# Hadoop

## Installation

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">[Download Hadoop](http://www.apache.org/dyn/closer.cgi/hadoop/core)&nbsp;from the&nbsp;[Apache Download Mirrors](http://www.apache.org/dyn/closer.cgi/hadoop/core)&nbsp;and extract the contents of the Hadoop package to a location of your choice. I picked&nbsp;`/usr/local/hadoop`. Make sure to change the owner of all the files to the&nbsp;`hduser`&nbsp;user and&nbsp;`hadoop`&nbsp;group, for example:

</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
1
2
3
4

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 757.5999755859375px;">

</td>
</tr>
</tbody>
</table>

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">(Just to give you the idea, YMMV &ndash; personally, I create a symlink from&nbsp;`hadoop-1.0.3`&nbsp;to&nbsp;`hadoop`.)

## Update $HOME/.bashrc

Add the following lines to the end of the&nbsp;`$HOME/.bashrc`&nbsp;file of user&nbsp;`hduser`. If you use a shell other than bash, you should of course update its appropriate configuration files instead of&nbsp;`.bashrc`.

$HOME/.bashrc
</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
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

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 749.5999755859375px;">

</td>
</tr>
</tbody>
</table>

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">You can repeat this exercise also for other users who want to use Hadoop.

## Excursus: Hadoop Distributed File System (HDFS)

Before we continue let us briefly learn a bit more about Hadoop&rsquo;s distributed file system.

> The Hadoop Distributed File System (HDFS) is a distributed file system designed to run on commodity hardware. It has many similarities with existing distributed file systems. However, the differences from other distributed file systems are significant. HDFS is highly fault-tolerant and is designed to be deployed on low-cost hardware. HDFS provides high throughput access to application data and is suitable for applications that have large data sets. HDFS relaxes a few POSIX requirements to enable streaming access to file system data. HDFS was originally built as infrastructure for the Apache Nutch web search engine project. HDFS is part of the Apache Hadoop project, which is part of the Apache Lucene project.
> 
> **The Hadoop Distributed File System: Architecture and Design**<cite style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">[hadoop.apache.org/hdfs/docs/&hellip;](http://hadoop.apache.org/hdfs/docs/current/hdfs_design.html)</cite>

The following picture gives an overview of the most important HDFS components.

![](http://www.michael-noll.com/blog/uploads/HDFS-Architecture.gif "HDFS Architecture (source: Hadoop documentation)")

## Configuration

Our goal in this tutorial is a single-node setup of Hadoop. More information of what we do in this section is available on the&nbsp;[Hadoop Wiki](http://wiki.apache.org/hadoop/GettingStartedWithHadoop).

### hadoop-env.sh

The only required environment variable we have to configure for Hadoop in this tutorial is&nbsp;`JAVA_HOME`. Open&nbsp;`conf/hadoop-env.sh`&nbsp;in the editor of your choice (if you used the installation path in this tutorial, the full path is&nbsp;`/usr/local/hadoop/conf/hadoop-env.sh`) and set the&nbsp;`JAVA_HOME`&nbsp;environment variable to the Sun JDK/JRE 6 directory.

Change

conf/hadoop-env.sh
</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
1
2

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 757.5999755859375px;">

</td>
</tr>
</tbody>
</table>

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">to

conf/hadoop-env.sh
</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
1
2

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 757.5999755859375px;">

</td>
</tr>
</tbody>
</table>

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">Note: If you are on a Mac with OS X 10.7 you can use the following line to set up&nbsp;`JAVA_HOME`&nbsp;in`conf/hadoop-env.sh`.

conf/hadoop-env.sh (on Mac systems)
</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
1
2

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 757.5999755859375px;">

</td>
</tr>
</tbody>
</table>

### conf/*-site.xml

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">In this section, we will configure the directory where Hadoop will store its data files, the network ports it listens to, etc. Our setup will use Hadoop&rsquo;s Distributed File System,&nbsp;[HDFS](http://hadoop.apache.org/hdfs/docs/current/hdfs_design.html), even though our little &ldquo;cluster&rdquo; only contains our single local machine.

You can leave the settings below &ldquo;as is&rdquo; with the exception of the&nbsp;`hadoop.tmp.dir`&nbsp;parameter &ndash; this parameter you must change to a directory of your choice. We will use the directory&nbsp;`/app/hadoop/tmp`&nbsp;in this tutorial. Hadoop&rsquo;s default configurations use&nbsp;`hadoop.tmp.dir`&nbsp;as the base temporary directory both for the local file system and HDFS, so don&rsquo;t be surprised if you see Hadoop creating the specified directory automatically on HDFS at some later point.

Now we create the directory and set the required ownerships and permissions:

</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
1
2
3
4

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 757.5999755859375px;">

</td>
</tr>
</tbody>
</table>

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">If you forget to set the required ownerships and permissions, you will see a&nbsp;`java.io.IOException`&nbsp;when you try to format the name node in the next section).

Add the following snippets between the&nbsp;`&lt;configuration&gt; ... &lt;/configuration&gt;`&nbsp;tags in the respective configuration XML file.

In file&nbsp;`conf/core-site.xml`:

conf/core-site.xml
</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
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

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 749.5999755859375px;">

</td>
</tr>
</tbody>
</table>

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">In file&nbsp;`conf/mapred-site.xml`:

conf/mapred-site.xml
</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
1
2
3
4
5
6
7
8

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 757.5999755859375px;">

</td>
</tr>
</tbody>
</table>

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">In file&nbsp;`conf/hdfs-site.xml`:

conf/hdfs-site.xml
</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
1
2
3
4
5
6
7
8

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 757.5999755859375px;">

</td>
</tr>
</tbody>
</table>

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">See&nbsp;[Getting Started with Hadoop](http://wiki.apache.org/hadoop/GettingStartedWithHadoop)&nbsp;and the documentation in&nbsp;[Hadoop&rsquo;s API Overview](http://hadoop.apache.org/core/docs/current/api/overview-summary.html)&nbsp;if you have any questions about Hadoop&rsquo;s configuration options.

## Formatting the HDFS filesystem via the NameNode

The first step to starting up your Hadoop installation is formatting the Hadoop filesystem which is implemented on top of the local filesystem of your &ldquo;cluster&rdquo; (which includes only your local machine if you followed this tutorial). You need to do this the first time you set up a Hadoop cluster.

Do not format a running Hadoop filesystem as you will lose all the data currently in the cluster (in HDFS)!

To format the filesystem (which simply initializes the directory specified by the&nbsp;`dfs.name.dir`variable), run the command

</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
1

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 757.5999755859375px;">

</td>
</tr>
</tbody>
</table>

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">The output will look like this:

</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
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

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 1260.800048828125px;">

</td>
</tr>
</tbody>
</table>

## Starting your single-node cluster

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">Run the command:

</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
1

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 757.5999755859375px;">

</td>
</tr>
</tbody>
</table>

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">This will startup a Namenode, Datanode, Jobtracker and a Tasktracker on your machine.

The output will look like this:

</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
1
2
3
4
5
6
7

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 996.7999877929688px;">

</td>
</tr>
</tbody>
</table>

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">A nifty tool for checking whether the expected Hadoop processes are running is&nbsp;`jps`&nbsp;(part of Sun&rsquo;s Java since v1.5.0). See also&nbsp;[How to debug MapReduce programs](http://wiki.apache.org/hadoop/HowToDebugMapReducePrograms).

</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
1
2
3
4
5
6
7

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 757.5999755859375px;">

</td>
</tr>
</tbody>
</table>

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">You can also check with&nbsp;`netstat`&nbsp;if Hadoop is listening on the configured ports.

</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
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

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 749.5999755859375px;">

</td>
</tr>
</tbody>
</table>

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">If there are any errors, examine the log files in the&nbsp;`/logs/`&nbsp;directory.

## Stopping your single-node cluster

Run the command

</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
1

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 757.5999755859375px;">

</td>
</tr>
</tbody>
</table>

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">to stop all the daemons running on your machine.

Example output:

</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
1
2
3
4
5
6
7

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 757.5999755859375px;">

</td>
</tr>
</tbody>
</table>

## Running a MapReduce job

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">We will now run your first Hadoop MapReduce job. We will use the&nbsp;[WordCount example job](http://wiki.apache.org/hadoop/WordCount)which reads text files and counts how often words occur. The input is text files and the output is text files, each line of which contains a word and the count of how often it occurred, separated by a tab. More information of&nbsp;[what happens behind the scenes](http://wiki.apache.org/hadoop/WordCount)&nbsp;is available at the&nbsp;[Hadoop Wiki](http://wiki.apache.org/hadoop/WordCount).

### Download example input data

We will use three ebooks from Project Gutenberg for this example:

*   [The Outline of Science, Vol. 1 (of 4) by J. Arthur Thomson](http://www.gutenberg.org/etext/20417)
*   [The Notebooks of Leonardo Da Vinci](http://www.gutenberg.org/etext/5000)
*   [Ulysses by James Joyce](http://www.gutenberg.org/etext/4300)

Download each ebook as text files in&nbsp;`Plain Text UTF-8`&nbsp;encoding and store the files in a local temporary directory of choice, for example&nbsp;`/tmp/gutenberg`.

</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
1
2
3
4
5
6

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 757.5999755859375px;">

</td>
</tr>
</tbody>
</table>

### Restart the Hadoop cluster

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">Restart your Hadoop cluster if it&rsquo;s not running already.

</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
1

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 757.5999755859375px;">

</td>
</tr>
</tbody>
</table>

### Copy local example data to HDFS

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">Before we run the actual MapReduce job, we first&nbsp;[have to copy](http://wiki.apache.org/hadoop/ImportantConcepts)&nbsp;the files from our local file system to Hadoop&rsquo;s&nbsp;[HDFS](http://hadoop.apache.org/hdfs/docs/current/hdfs_design.html).

</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
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

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 820.7999877929688px;">

</td>
</tr>
</tbody>
</table>

### Run the MapReduce job

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">Now, we actually run the WordCount example job.

</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
1

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 1068.800048828125px;">

</td>
</tr>
</tbody>
</table>

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">This command will read all the files in the HDFS directory&nbsp;`/user/hduser/gutenberg`, process it, and store the result in the HDFS directory&nbsp;`/user/hduser/gutenberg-output`.

Note: Some people run the command above and get the following error message:

In this case, re-run the command with the full name of the Hadoop Examples JAR file, for example:

Example output of the previous command in the console:

</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
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

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 1068.800048828125px;">

</td>
</tr>
</tbody>
</table>

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">Check if the result is successfully stored in HDFS directory&nbsp;`/user/hduser/gutenberg-output`:

</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
1
2
3
4
5
6
7
8
9

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 844.7999877929688px;">

</td>
</tr>
</tbody>
</table>

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">If you want to modify some Hadoop settings on the fly like increasing the number of Reduce tasks, you can use the&nbsp;`"-D"`&nbsp;option:

</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
1

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 1276.800048828125px;">

</td>
</tr>
</tbody>
</table>

> An important note about&nbsp;<tt style="margin: -1px 0px; padding: 0px 0.3em; border: 1px solid #dddddd; font-family: Menlo, Monaco, &#39;Andale Mono&#39;, &#39;lucida console&#39;, &#39;Courier New&#39;, monospace; font-style: inherit; font-variant: inherit; line-height: 1.5em; font-size: 0.8em; vertical-align: baseline; display: inline-block; background-color: #ffffff; color: #555555; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em; border-bottom-right-radius: 0.4em; border-bottom-left-radius: 0.4em;">mapred.map.tasks</tt>:&nbsp;[Hadoop does not honor mapred.map.tasks](http://markmail.org/message/k32nrcb2ncsq67ef?q=mapred%2Emap%2Etasks+)&nbsp;beyond considering it a hint. But it accepts the user specified&nbsp;<tt style="margin: -1px 0px; padding: 0px 0.3em; border: 1px solid #dddddd; font-family: Menlo, Monaco, &#39;Andale Mono&#39;, &#39;lucida console&#39;, &#39;Courier New&#39;, monospace; font-style: inherit; font-variant: inherit; line-height: 1.5em; font-size: 0.8em; vertical-align: baseline; display: inline-block; background-color: #ffffff; color: #555555; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em; border-bottom-right-radius: 0.4em; border-bottom-left-radius: 0.4em;">mapred.reduce.tasks</tt>&nbsp;and doesn&rsquo;t manipulate that. You cannot force&nbsp;<tt style="margin: -1px 0px; padding: 0px 0.3em; border: 1px solid #dddddd; font-family: Menlo, Monaco, &#39;Andale Mono&#39;, &#39;lucida console&#39;, &#39;Courier New&#39;, monospace; font-style: inherit; font-variant: inherit; line-height: 1.5em; font-size: 0.8em; vertical-align: baseline; display: inline-block; background-color: #ffffff; color: #555555; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em; border-bottom-right-radius: 0.4em; border-bottom-left-radius: 0.4em;">mapred.map.tasks</tt>&nbsp;but you can specify&nbsp;<tt style="margin: -1px 0px; padding: 0px 0.3em; border: 1px solid #dddddd; font-family: Menlo, Monaco, &#39;Andale Mono&#39;, &#39;lucida console&#39;, &#39;Courier New&#39;, monospace; font-style: inherit; font-variant: inherit; line-height: 1.5em; font-size: 0.8em; vertical-align: baseline; display: inline-block; background-color: #ffffff; color: #555555; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em; border-bottom-right-radius: 0.4em; border-bottom-left-radius: 0.4em;">mapred.reduce.tasks</tt>.

### Retrieve the job result from HDFS

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">To inspect the file, you can copy it from HDFS to the local file system. Alternatively, you can use the command

</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
1

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 780.7999877929688px;">

</td>
</tr>
</tbody>
</table>

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">to read the file directly from HDFS without copying it to the local file system. In this tutorial, we will copy the results to the local file system though.

</p>
<table style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: baseline; border-collapse: collapse; border-spacing: 0px;">
<tbody style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<tr style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; vertical-align: baseline;">
<td class="gutter" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle;">
~~~ line-numbers
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

~~~
</td>
<td class="code" style="margin: 0px; padding: 0px; border: 0px; font-family: inherit; font-style: inherit; font-variant: inherit; line-height: inherit; font-size: 18.399999618530273px; vertical-align: middle; width: 892.7999877929688px;">

</td>
</tr>
</tbody>
</table>

<p style="margin: 0px 0px 1.5em; padding: 0px; border: 0px; font-family: &#39;PT Serif&#39;, Georgia, Times, &#39;Times New Roman&#39;, serif; line-height: 27.600000381469727px; font-size: 18.399999618530273px; vertical-align: baseline; color: #333333; background-color: #f8f8f8;">Note that in this specific output the quote signs (&ldquo;) enclosing the words in the&nbsp;`head`&nbsp;output above have not been inserted by Hadoop. They are the result of the word tokenizer used in the WordCount example, and in this case they matched the beginning of a quote in the ebook texts. Just inspect the&nbsp;`part-00000`&nbsp;file further to see it for yourself.

> The command&nbsp;<tt style="margin: -1px 0px; padding: 0px 0.3em; border: 1px solid #dddddd; font-family: Menlo, Monaco, &#39;Andale Mono&#39;, &#39;lucida console&#39;, &#39;Courier New&#39;, monospace; font-style: inherit; font-variant: inherit; line-height: 1.5em; font-size: 0.8em; vertical-align: baseline; display: inline-block; background-color: #ffffff; color: #555555; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em; border-bottom-right-radius: 0.4em; border-bottom-left-radius: 0.4em;">fs -getmerge</tt>&nbsp;will simply concatenate any files it finds in the directory you specify. This means that the merged file might (and most likely will)&nbsp;**not be sorted**.

## Hadoop Web Interfaces

Hadoop comes with several web interfaces which are by default (see&nbsp;`conf/hadoop-default.xml`) available at these locations:

*   [http://localhost:50070/](http://localhost:50070/)&nbsp;&ndash; web UI of the NameNode daemon
*   [http://localhost:50030/](http://localhost:50030/)&nbsp;&ndash; web UI of the JobTracker daemon
*   [http://localhost:50060/](http://localhost:50060/)&nbsp;&ndash; web UI of the TaskTracker daemon

These web interfaces provide concise information about what&rsquo;s happening in your Hadoop cluster. You might want to give them a try.

### NameNode Web Interface (HDFS layer)

The name node web UI shows you a cluster summary including information about total/remaining capacity, live and dead nodes. Additionally, it allows you to browse the HDFS namespace and view the contents of its files in the web browser. It also gives access to the local machine&rsquo;s Hadoop log files.

By default, it&rsquo;s available at&nbsp;[http://localhost:50070/](http://localhost:50070/).

![](http://www.michael-noll.com/blog/uploads/Hadoop-namenode-screenshot.png "A screenshot of Hadoop&#39;s NameNode web interface")

### JobTracker Web Interface (MapReduce layer)

The JobTracker web UI provides information about general job statistics of the Hadoop cluster, running/completed/failed jobs and a job history log file. It also gives access to the &lsquo;&lsquo;local machine&rsquo;s&rsquo;&rsquo; Hadoop log files (the machine on which the web UI is running on).

By default, it&rsquo;s available at&nbsp;[http://localhost:50030/](http://localhost:50030/).

![](http://www.michael-noll.com/blog/uploads/Hadoop-jobtracker-screenshot.png "A screenshot of Hadoop&#39;s Job Tracker web interface")

### TaskTracker Web Interface (MapReduce layer)

The task tracker web UI shows you running and non-running tasks. It also gives access to the &lsquo;&lsquo;local machine&rsquo;s&rsquo;&rsquo; Hadoop log files.

By default, it&rsquo;s available at&nbsp;[http://localhost:50060/](http://localhost:50060/).

![](http://www.michael-noll.com/blog/uploads/Hadoop-tasktracker-screenshot.png "A screenshot of Hadoop&#39;s Task Tracker web interface")

# What&rsquo;s next?

If you&rsquo;re feeling comfortable, you can continue your Hadoop experience with my follow-up tutorial&nbsp;[Running Hadoop On Ubuntu Linux (Multi-Node Cluster)](http://www.michael-noll.com/tutorials/running-hadoop-on-ubuntu-linux-multi-node-cluster/)&nbsp;where I describe how to build a Hadoop &lsquo;&lsquo;multi-node&rsquo;&rsquo; cluster with two Ubuntu boxes (this will increase your current cluster size by 100%, heh).

In addition, I wrote&nbsp;[a tutorial](http://www.michael-noll.com/tutorials/writing-an-hadoop-mapreduce-program-in-python/)&nbsp;on&nbsp;[how to code a simple MapReduce job](http://www.michael-noll.com/tutorials/writing-an-hadoop-mapreduce-program-in-python/)&nbsp;in the Python programming language which can serve as the basis for writing your own MapReduce programs.

# Related Links

From yours truly:

*   [Running Hadoop On Ubuntu Linux (Multi-Node Cluster)](http://www.michael-noll.com/tutorials/running-hadoop-on-ubuntu-linux-multi-node-cluster/)
*   [Writing An Hadoop MapReduce Program In Python](http://www.michael-noll.com/tutorials/writing-an-hadoop-mapreduce-program-in-python/)

From other people:

*   [How to debug MapReduce programs](http://wiki.apache.org/hadoop/HowToDebugMapReducePrograms)
*   [Hadoop API Overview](http://hadoop.apache.org/core/docs/current/api/overview-summary.html)&nbsp;(for Hadoop 2.x)
</p>