---
layout: post
title: "Using D Star navigation in ROS"
description: 在ROS使用DStar算法进行路径规划
modified: 2014-04-19 14:18:02 +0800
category: "AI"
tags: [ROS,D Star,navigation]
image:
  feature: http://seeksky.qiniudn.com/19.jpg-clip.jpg
  credit:
  creditlink:
comments: true
share: true
alias: [/2014/04/19/Using D Star navigation in ROS]
---

### 前言
曾今在本科的时候接触过`ROS`,那时候还是为了做3D建模.\\
最近由于一些原因又重温了一下`ROS`,发现如今的`ROS`越发强大和完善了,开源社区也非常活跃,越来越多开发者参与到其中.\\
就比如我今天要讲的`D Star`路径规划算法,也被人在`ROS`上实现了一把,并且用于`NAO`机器人的路径规划计算上面.

<!--more-->

### 简介
本文主要解决如何在ROS上面使用[**Humanoid Robots Lab at the Albert-Ludwigs-University in Freiburg, Germany**](http://hrl.informatik.uni-freiburg.de/)实验室编写的人形机器人路径规划模块\\
主要分为以下几个步骤进行:

 1. 安装最新版本的`ROS`. (以Ubuntu12.04为例)
 2. 安装`humanoid_navigation`库,并进行编译.
 3. 如何使用`humanoid_navigation`库进行人形机器人的路径规划

### 安装ROS
安装步骤参考[^1].\\
在Ubuntu12.04上面安装有一个好处就是使用apt工具安装相对较简单,省去自行下载代码并安装相应支持库的麻烦.\\
现在的最新版本的`ROS`代号为`Hydro`
步骤如下:

 + 设置apt库的源列表:

~~~ sh
 sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu precise main" > /etc/apt/sources.list.d/ros-latest.list'
~~~

 + 设置密钥:

~~~ sh
 wget http://packages.ros.org/ros.key -O - | sudo apt-key add -
~~~

 + 下载并安装ROS,并进行环境设置:

~~~ sh
 sudo apt-get update
 sudo apt-get install ros-hydro-desktop-full
 sudo rosdep init
 rosdep update
 echo "source /opt/ros/hydro/setup.bash" >> ~/.bashrc
 source ~/.bashrc
 sudo apt-get install python-rosinstall
~~~

### 安装humanoid_navigation包
安装步骤参考[^2][^3][^4].\\
在Ubuntu上面安装这个包在编译的时候会遇到一些问题,是由于boost版本与需要的版本不匹配造成的.
这个包依赖的相关库需要`boost 1.46`版本,所以首先安装一下`boost 1.46`.

~~~ sh
sudo apt-get install libboost1.46-all-dev
~~~

之后进行humanoid_navigation包的安装,其步骤如下,编译时候会缺少一些ros自带的库:

 * 配置`catkin`[^5]工作目录:

~~~ sh
 mkdir -p ~/catkin_ws/src
 cd ~/catkin_ws/src
 catkin_init_workspace
~~~

 * 使用`wstool`[^6]配置代码仓库,将`humanoid_navigation`包加入:

~~~ sh
 wstool init
 wstool set humanoid_msgs --git https://github.com/ahornung/humanoid_msgs
 wstool set humanoid_navigation --git https://github.com/ahornung/humanoid_navigation -v hydro-devel
 wstool update
~~~

 * 安装`humanoid_navigation`依赖的相关库:

~~~ sh
 sudo apt-get install ros-hydro-humanoid-*
 sudo apt-get install ros-hydro-octomap-*
~~~

 * 编译工作目录:

~~~ sh
 source ~/catkin_ws/devel/setup.bash
 cd ~/catkin_ws
 catkin_make
~~~

### 使用humanoid_navigation包
使用步骤参考[^7][^8].
编译好之后就可以使用`humanoid_navigation`下面的`footstep_planner`进行路径规划了.\\
其提供了3种规划算法和3种启发式,分别由`/footstep_planner/planner_type`和`/footstep_planner/heuristic_type`这两个参数控制,如下:

 1. **"ARAPlanner"**: A* (ARA*)
 2. **ADPlanner**: Anytime Dynamic A* (AD*)
 3. **RSTARPlanner**: Randomized A* (R*)

启发式:

 1. **"EuclideanHeuristic"**: Straight-line distance to the goal
 2. **"EuclStepCostHeuristic"**: Straight-line distance to the goal with added footstep costs
 3. **"PathCostHeuristic"**: Distance along 2D path pre-planned with A* (preferred). This heuristic works best in most cases, as it is most informed of the environment. Note that it is potentially inadmissible in the case of stepping over obstacles.

使用这个包进行一些模拟演示:

~~~ sh
roslaunch footstep_planner footstep_planner_complete.launch
~~~

演示时使用`2D Pose Estimate`按钮设置开始点以及方向.\\
使用`2D Nav Goal`设置目标点以及朝向.\\
选择之后需要等一会才会产生结果.\\
演示结果类似下图:\\
![](/images/footstep_planner.png)


控制参数改变路径规划算法[^8]:

~~~ sh
rosparam set /footstep_planner/planner_type ADPlanner
~~~


### 参考文献
[^1]: [Ubuntu install of ROS Hydro](http://wiki.ros.org/hydro/Installation/Ubuntu)
[^2]: [humanoid_navigation](http://wiki.ros.org/humanoid_navigation?distro=hydro)
[^3]: [Creating a workspace for catkin](http://wiki.ros.org/catkin/Tutorials/create_a_workspace)
[^4]: [Overlaying with catkin workspaces](http://wiki.ros.org/catkin/Tutorials/workspace_overlaying)
[^5]: [catkin:Low-level build system macros and infrastructure for ROS](http://wiki.ros.org/catkin)
[^6]: [wstool provides commands to manage several local SCM repositories](http://wiki.ros.org/wstool)
[^7]: [footstep_planner](http://wiki.ros.org/footstep_planner?distro=hydro)
[^8]: [Understanding ROS Services and Parameters](http://wiki.ros.org/ROS/Tutorials/UnderstandingServicesParams)
