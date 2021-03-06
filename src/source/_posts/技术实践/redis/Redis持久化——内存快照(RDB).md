---
title:  Redis持久化——内存快照(RDB)
copyright: true
date: 2021-02-22 08:15:45
tags: 
- Redis
categories: Redis
keywords: Redis,持久化
password: 1234qwer
aside: redis
---

我们都知道Redis是内存数据库，它将自己的数据存储的内存中。这样一旦服务器进程退出(断电、重启等原因)，那么数据将会丢失。为了解决这个问题，Redis提供两种持久化的方式来将数据持久化到硬盘上，即内存快照(RDB)与AOF日志。
<!--more-->

### 1 什么是内存快照

所谓内存快照，顾名思义就是给内存拍个照，在某个时刻把内存中的数据记录下来，以文件的形式保存到硬盘上，这样即使宕机，数据依然存在。在服务器重启后只需要把“照片”中的数据恢复即可。

RDB持久化就是把当前进程的数据在某个时刻生成快照(一个压缩的二进制文件)保存到硬盘的过程，触发RDB持久化过程分为手动触发和自动触发。

#### 1.1 RDB文件的创建

RDB文件的创建可以手动触发，也可以自动触发。

#### 1.1 手动触发

手动触发分别对应save和bgsave命令：

##### 1.1.1 save命令

save命令会阻塞当前Redis服务器，直到RDB过程完成为止。在服务器进程阻塞期间，服务器不能处理任何命令请求。因此，当save命令正在执行时，客户端发送的所有命令都会被拒绝，知道save命令执行完毕。

```c
redis>save //等待，直到RDB文件创建完毕
ok
```

**注意:**

**Redis的单线程模型就决定了，我们要尽量避免所有会阻塞主线程的操作，由于Save命令执行期间阻塞服务器进程，对于内存比较大的实例会造成长时间阻塞，因此线上环境不建议使用。**

##### 1.1.2 bgsave命令

bgsave命令会派生出一个子进程(而不是线程)，由子进程进行RDB文件创建，而父进程继续处理命令。

```
redis>bgsave
Background saving started   //直接返回，由子进程进行RDB文件创建
redis>					  	//继续处理其它命令
```

![Redis 持久化bgsave流程](https://hunter-picgos.oss-cn-shanghai.aliyuncs.com/picgo/Redis%20%E6%8C%81%E4%B9%85%E5%8C%96bgsave%E6%B5%81%E7%A8%8B.png)

**注意:**

1. **在bgsave命令执行的时候，为了避免父进程与子进程同时执行两个rdbSave的调用而产生竞争条件，客户端发送的save命令会被服务器拒绝。**
2. **如果bgsave命令正在执行，bgrewriteaof（aof重写）命令会被延迟到bgsave命令之后执行，如果bgrewriteaof命令正在执行，那么客户端发送的bgsave命令会被服务器拒绝。**
3. **虽然bgsave命令是由子进程进行RDB文件的生成，但是fork()创建子进程的时候会阻塞父进程（详情请往下看）。**

#### 1.2 自动触发

因为bgsave命令可以在不阻塞服务器进程的情况下保存，所以redis可以通过设置服务器配置的save选项，让服务器每隔一段时间自动执行一次bgsave命令。如：我们向服务器设置如下配置(这也是redis默认的配置):

```c
save 900 1
save 300 10
save 60  10000
```

那么只要满足如下条件中的一个bgsave命令就会被执行：

* 服务器在900秒内对数据库进行了至少1次修改
* 服务器在300秒内对数据库进行了至少10次修改
* 服务器在60秒内对数据库进行了至少10000次修改

#### 1.2 RDB文件的载入

在Redis启动的时候，只要检测到RDB文件的存在，就会自动加载RDB文件。需要注意的是

* 因为AOF文件的更新频率通常比RDB文件的更新频率高,所以口如果服务器开启了AOF持久化功能,那么服务器会优先使用AOF文件来还原数据库状态。

* 只有在AOF持久化功能处于关闭状态时,服务器才会使用RDB文件来还原数据库状态。

**注意:服务器在载入RDB文件期间,会一直处于阻塞状态,直到载入工作完成为止**

### 2 内存快照的问题

了解了什么是Redis的RDB持久化，我们来思考两个问题。

#### 2.1 快照的时候数据可以修改吗

Redis RDB持久化是对`某一时刻`的内存中的`全量数据`进行拍照。这让我们不得不思考，快照的时候数据可以修改吗？

首先，如果我们使用`save`命令做持久化，那么由于Redis单线程模型的原因，在持久化的过程中会阻塞，是不能执行其它命令的。也许有人会说可以使用`bgave`命令，但使用`bgsave`就没有问题了吗？

我们在拍照的时候，通常摄影师是不让我们动的，因为一动可能照片就模糊了。在Redis 进行内存快照的时候也会如此。如果我们持久化的过程中，有些数据被修改了。那么就会破坏快照的正确性与完整性。

比如在t时刻,我们对内存进行快照，此时我们希望的是记录下来t时刻内存中所有的数据，假设我们的RDB操作需要10s的时间，而t+2s我们执行了一个修改操作把`Key1`的值由A修改成了B，而此时RDB操作却还没有把`Key1`的值写入磁盘。在t+5s的时候读取到`key1`的值写入磁盘。那么此次快照记录的`Key1`的值就是B，而不是t时刻的A。这样就破坏了RDB文件的正确性。

RDB文件的生成是需要时间的，如果快照执行期间数据不能被修改，对于业务系统来说不能接受的。那么Redis 是如何解决这个问题的呢？

![Redis写时复制](https://hunter-picgos.oss-cn-shanghai.aliyuncs.com/picgo/Redis%E5%86%99%E6%97%B6%E5%A4%8D%E5%88%B6.png)

Redis 借助了操作系统提供的写时复制技术（Copy-On-Write, COW），可以让在执行快照的同时，正常处理写操作。简单来说，bgsave  fork子进程的时候，并不会完全复制主进程的内存数据，而是只复制必要的虚拟数据结构，并不为其分配真实的物理空间，它与父进程共享同一个物理内存空间。bgsave 子进程运行后，开始读取主线程的内存数据，并把它们写入 RDB 文件。此时，如果主线程对这些数据也都是读操作，那么，主线程和 bgsave 子进程相互不影响。但是，如果主线程要修改一块数据，此时会给子进程分配一块物理内存空间，把要修改的数据复制一份，生成该数据的副本到子进程的物理内存空间。然后，bgsave 子进程会把这个副本数据写入 RDB 文件，而在这个过程中，主线程仍然可以直接修改原来的数据。

#### 2.2 可以频繁进行快照操作吗

假设我们在t 时刻做了一次快照，然后又在 t+n 时刻做了一次快照，而在这期间，发生了数据修改。而此时宕机了，那么，只能按照 t 时刻的快照进行恢复。那么这n秒的数据就彻底丢失无法恢复了。

所以，要想尽可能恢复数据，就只能缩短快照执行的时间间隔，间隔的时间越小，丢失数据也就越少。那么可以频繁的执行快照操作吗？

我们知道bgsave 执行时并不阻塞主线程，但是这不代表可以频繁执行快照操作。

一方面，持久化是一个写入磁盘的过程，频繁将全量数据写入磁盘，会给磁盘带来很大压力，频繁执行快照也容易导致前一个快照还没有执行完，后一个又开始了，这样多个快照竞争有限的磁盘带宽，容易造成恶性循环。

再者，bgsave所fork出来的子进程执行操作虽然并不会阻塞父进程的操作，但是`fork`出子进程的操作却是由主进程完成的，会阻塞主进程，fork子进程需要拷贝进程必要的数据结构，其中有一项就是拷贝内存页表（虚拟内存和物理内存的映射索引表），这个拷贝过程会消耗大量CPU资源，拷贝完成之前整个进程是会阻塞的，阻塞时间取决于整个实例的内存大小，实例越大，内存页表越大，fork阻塞时间也就越久。

也许有人会想到是否可以做增量快照呢？也就是只对上一次快照之后的数据做快照。

首先思路肯定是可以，但是增量快照要求记住哪些数据上一次快照之后产生的。这就需要额外的元数据来记录这些信息，会引入额外的空间消耗。这对于内存资源宝贵的 Redis 来说，并不是一个很好的方案。

如果不能频繁执行快照操作，那么该如何解决两次快照之间的数据丢失的问题呢？Redis 还提供了另外一种持久化方式——AOF(append to file)日志。关于AOF日志会在下一篇文章中进行总结！






































