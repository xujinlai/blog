---
layout: post
title: "The Tips of Installing Cloudera in Ubuntu"
description:
modified: 2014-05-25 15:27:42 +0800
category: "hadoop"
tags: [Hadoop, Cloudera, WINS, hostname]
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

~~~ bash
sudo apt-get install ssh
ssh-keygen -t rsa
scp  masterIP:/home/user/.ssh/id_rsa.pub ~/.ssh/authorized_keys
sudo passwd
~~~

### Tip2: Hosts
Host IP is really not interesting for me for the sake of the complexity to set it correctly.\\
Because we have not used the DNS resolving service in our cluster, we have to set the `hosts` file manually.\\
And then use the `scp` tools to copy the file to the slaves.

However, there is an easy solution to solve the problem, WINS. WINS is a service for Windows OS to resolve the IP by the hostnames of the VMs.\\
And I use this service to easily build **the hostname to IP service**.

For WINS service, there is a tools in Linux to serve as the same as the WINS service in Windows.\\
It is called `winbind`. You can easily install this tool by `apt-get` in ubuntu.\\
And then, you have to edit the `nsswitch.conf` file to add `wins` resolving service after the `dns`.[^1]\\
In addition, you have to install samba to response the request to get your IP by hostname.

The command in bash to configure and install is here:

~~~ bash
sudo apt-get install winbind
sudo vi /etc/nsswitch.conf
~~~

After these you will see some thing like this:

~~~
hosts:    files mdns4_minimal [NOTFOUND=return] dns mdns4
~~~

And then, add `wins` in the end, like this:

~~~
hosts:    files mdns4_minimal [NOTFOUND=return] dns mdns4 wins
~~~

With `sudo apt-get install samba`, you can finally `ping` your Linux by hostname.
Like this: `ping slave01`.

Here are some tips for hostname in **Ubuntu** and installing `Cloudera`:

 1. You have to use FQDN in Cloudera, because it uses this to resolve your IP.
 So just the hostname only like `slave01.local` **type** is suitable.
 2. WINS service verifies the **NetBIOS** to resolve the IP
 and **NetBIOS** must be less than 15 letters. So your hostname have to be less than 15 letters.

However, there is a problem with WINS. It only provide the service to transform
the NetBIOS to IP address, but not the **FULL HOSTNAME WITH DOMAIN**.\\
So if your  hostname is FQDN like `slave01.local`, you only get the short hostname `slave01` resolved
by the WINS service. But the full hostname with domain like `slave01.local` cannot be
resolved by the service.\\
So there is a necessary install a DNS service. I choose the `dnsmasq` which is
a light DNS resolving software and works only using the `hosts` file.
With this software, you can easily resolve the full hostname to IP address.



### Tip3: Reinstall
There are many problems with reinstalling cloudera-manager-server.\\
Here is some tips for solving the problems.\\
Form the official documents, you have to delete the residual files if the installation is aborted intermediately.[^2]\\
Here is the command:

~~~
sudo rm -Rf /usr/share/cmf /var/lib/cloudera* /var/cache/yum/cloudera*
~~~

Then, some more operation you have to do is to check whether the software is removed correctly.\\
Here is the list of the software you have to check:

 1. cloudera-manager-server
 2. cloudera-manager-agent
 3. cloudera-manager-deamon
 4. cloudera-manager-server-db-2

I also met some problems with reinstalling cloudera-manager-server.\\
I got the error message `cloudera-manager-server file does not exist`.\\
Because I delete the service file in the directory `/etc/init.d`.\\
Reinstalling the cloudera-manager-server always get error.\\
With the command above by the official document, the problem is easily sovled.

### Reference

[^1]: [HowTo: Configure Ubuntu to be able to use and respond to NetBIOS hostname queries like Windows does](http://www.serenux.com/2009/09/howto-configure-ubuntu-to-be-able-to-use-and-respond-to-netbios-hostname-queries-like-windows-does/)
[^2]: [Uninstalling Cloudera Manager and Managed Software](http://www.cloudera.com/content/cloudera-content/cloudera-docs/CM5/latest/Cloudera-Manager-Installation-Guide/cm5ig_uninstall_cm.html#cmig_topic_18)
