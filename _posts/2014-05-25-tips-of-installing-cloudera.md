---
layout: post
title: "The Tips of Installing Cloudera in Ubuntu"
description:
modified: 2014-05-25 15:27:42 +0800
category: "hadoop"
tags: [Hadoop, Cloudera]
image:
  feature: http://seeksky.qiniudn.com/19.jpg-clip.jpg
  credit:
  creditlink:
comments: true
share: true
---

### Introduction
As TOEFL test being finally completed, I can enjoy the fun of playing with programs and servers.\\
Because `Cloudera` is still not installed on the new servers, I can do it just taking the time.\\
Since I have installed `Cloudera` on the Dell servers in our department, the progress is so easy for me. However, some of the processes are easy to forget. So I am writing this tips for retrieve later.

<!--more-->

### Tip1: SSH
There are several problems dealing with SSH in Ubuntu Desktop Edition.\\
 1. You have to install ssh first before using it as the edition without it in the beginning.\\
 2. You could either to copy the `public key file` to the **slaves** or input the password every time.\\
 3. For the Ubuntu Desktop Edition, the password of root is not initially set. So if you want to use the `Cloudera` auto installation tools, you have to set the root password.

This is the command for the upper steps:

~~~
sudo apt-get install ssh
scp  masterIP:/home/user/.ssh/id_rsa.pub ~/.ssh/authorized_keys
sudo passwd
~~~

### Tip2: Hosts
Host IP is not really interesting for me for the sake of the complexity to set it correctly.\\
Because we have not used the DNS resolving service in our cluster, we have to set the `hosts` file manually.\\
And then use the `scp` tools to copy the file to the slaves.

However, there is a easy solution to solve the problem, WINS. WINS is a service for Windows OS to resolve the IP by the hostnames of the VMs.\\
And I decide to use this service to easily build **the hostname to IP service**.
