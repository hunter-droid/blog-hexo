---

title: 一文回顾Reids五大对象(数据类型)
copyright: true
date: 2020-04-07 10:45:38
tags: 
- Redis
categories: Redis
keywords: Redis,String,Hash,List,Set,ZSet
aside: redis
---
Redis 是一个高性能的分布式内存型数据库，在国内外各大互联网公司中都有着广泛的使用，即使是一些非互联网公司中也有着非常重要的适用场景，所以对 Redis 的掌握也成为后端工程师必备的基础技能，在面试中，Redis早已成为老生常谈的话题，而在实际工作中，我们更是每时每刻都需要和 Redis 打交道。因此熟练的掌握Redis技术栈的各种武功秘籍至关重要！

<!--more-->

Redis提供了五种主要的对象(数据类型)供开发者使用，它提供了强大且实用的功能。然而实际开发中有大多数的开发者仅简单会用Redis String的Get与Set。这就好比降龙十八掌，你只学会了一掌。在真正实战对敌之时不免略显单薄！这篇文章我们将回顾Redis这五大对象，以便于我们能够在实战中真正做到游刃有余。

### 一、字符串(终究是我扛下了所有)

字符串类型是Redis最基础的数据结构，其他几种数据结构都是在字符串类型基础上构建的。字符串类型的值是字符串（简单的字符串、复杂的字符串（例如JSON、XML））、数字（整数、浮点数），甚至是二进制（图片、音频、视频）等

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/%E5%AF%B9%E8%B1%A1%E7%AF%87/%E5%AD%97%E7%AC%A6%E4%B8%B2/Redis%E5%AD%97%E7%AC%A6%E4%B8%B2.png)

字符串对象的内部编码有3种 ：`int`、`raw`和`embstr`。Redis会根据当前值的类型和长度来决定使用哪种编码来实现。

* int:如果一个字符串对象保存的是整数值,并且这个整数值可以用`long`类型来表示
* raw:如果字符串对象保存的是一个字符串值,并且这个字符串值的长度大于32字节
* embstr:如果字符串对象保存的是一个字符串值,并且这个字符申值的长度小于等于32字节

&nbsp;reids字符串的使用场景是最为广泛的，甚至有些对redis其它几种对象不太熟悉的人，基本所有场景都会使用字符串(序列化一下直接扔进去),这让本身很单纯的字符串承受了它这个年纪本不该承受的重量。其实Redis的主要使用场景主要有以下几种:

1. 作为缓存层,缓存热点数据
2. Redis字符串可以自增自减的特性可以用来做计数器、限速器、自增ID生成等
3. 分布式系统的Session共享
4. 二进制数据的存储

有关Redis字符串的更详细的介绍，可以查看我的这篇文章。

[Redis对象——字符串(String)](https://blog.laoyu.site/2019/redis/Redis%E5%AF%B9%E8%B1%A1%E2%80%94%E2%80%94%E5%AD%97%E7%AC%A6%E4%B8%B2(String)/)

### 二、哈希(存储对象我也行)

哈希对象用来存储一组数据对。每个数据对又包含键值两部分。

![Redis-Hash](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/%E5%AF%B9%E8%B1%A1%E7%AF%87/%E5%93%88%E5%B8%8C/Redis-Hash.png)

哈希对象也有两种实现方式。[ziplist(压缩列表)](http://blog.laoyu.site/2019/redis/Redis%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E2%80%94%E2%80%94%E5%8E%8B%E7%BC%A9%E5%88%97%E8%A1%A8/),[hashtable(哈希表)](http://blog.laoyu.site/2018/redis/Redis%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E2%80%94%E2%80%94%E5%AD%97%E5%85%B8/)

同样，只有当存储的数据量比较小的情况下，Redis 才使用压缩列表来实现哈希对象。具体需要满足两个条件：

* 字典中保存的键和值的大小都要小于 64 字节；
* 字典中键值对的个数要小于 512 个。

当不能同时满足上面两个条件的时候，Redis 就使用哈希表来实现哈希对象。

当存储的内容是对象的时候，Redis 字符串对象的很多功能使用Redis 哈希对象也可以实现。如缓存用户信息的时候，使用Redis哈希对象存储，简单直观，如果使用合理可以减少内存空间的使用。但也有其缺点，就是要要控制哈希在ziplist和hashtable两种内部编码的转换，hashtable会消耗更多内存。

此外，Redis 哈希对象还可以实现购物车、计数器等功能。

有关Redis哈希对象的更详细的介绍，可以查看我的这篇文章。

[Redis对象——哈希(Hash)](https://blog.laoyu.site/2020/redis/Redis%E5%AF%B9%E8%B1%A1%E2%80%94%E2%80%94%E5%93%88%E5%B8%8C(Hash)/)

### 三、列表(栈和队列我都行)

列表这种对象支持存储一组有序的、不重复的数据。因为其有序性，它可以获取指定范围的元素列表、可以在O(1)的时间复杂度获取指定索引下标的元素等。

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/%E5%AF%B9%E8%B1%A1%E7%AF%87/%E5%88%97%E8%A1%A8/Redis%20List.png)

在Redis3.2版本以前列表类型的内部编码有两种。当满足下面两个条件的时候，Redis 列表对象使用ziplist（压缩列表）来实现。

* 当列表的元素个数小于list-max-ziplist-entries配置（默认512个）

* 当列表中每个元素的值都小于list-max-ziplist-value配置时（默认64字节）

当列表类型无法满足ziplist的条件时，Redis会使用linkedlist作为列表的内部实现。

而在Redis3.2版本开始对列表数据结构进行了改造，使用 quicklist 代替了 ziplist 和 linkedlist.

由于列表对象的有序且不可重复的特性，它比较适合用来做文章、商品等列表的存储。

列表类型可以 lpush (左侧push)，同时又可以使用 rpop (右侧弹出)（查询并删除）第一个元素，所以列表类型具有先进先出的特性，可以用来实现消息队列。也可以lpush(左侧push)->lpop(左侧弹出)，具有后进先出的特性，因此开发中需要使用栈的时候，我们也可以借助列表对象来实现。
有关Redis列表对象的更详细的介绍，可以查看我的这篇文章。

[Redis对象——列表(List)](https://blog.laoyu.site/2020/redis/Redis%E5%AF%B9%E8%B1%A1%E2%80%94%E2%80%94%E5%88%97%E8%A1%A8(List)/)
### 四、集合(标签系统我在行)

集合对象 (Set) 是一个无序并唯一的键值集合。它的存储顺序不会按照插入的先后顺序进行存储。与列表所不同的是它存储的数据是无序且不重复的。

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/%E5%AF%B9%E8%B1%A1%E7%AF%87/%E9%9B%86%E5%90%88/%E9%9B%86%E5%90%88.png)

集合对象的内部编码也有两种：intset(整数集合)与hashtable(哈希表)。当满足下面两个条件的时候集合对象使用intset来实现。

* 集合中的元素都是整数
* 集合中的元素个数小于set-maxintset-entries配置（默认512个）

不满足上面两个条件时集合对象使用hashtable来实现。

集合对象的主要几个特性就是，无序、不可重复、支持并交差，因此可以用来做标签系统。

而集合的 [SPOP(随机移除并返回集合中一个或多个元素)](https://blog.laoyu.site/2020/redis_command/set/spop/) 和 [SRANDMEMBER(随机返回集合中一个或多个元素)](https://blog.laoyu.site/2020/redis_command/set/srandmember/) 命令可以帮助我们实现一个抽奖系统。

有关Redis集合对象的更详细的介绍，可以查看我的这篇文章。

[Redis对象——集合(Set)](https://blog.laoyu.site/2020/redis/Redis%E5%AF%B9%E8%B1%A1%E2%80%94%E2%80%94%E9%9B%86%E5%90%88(Set)/)

### 五、有序集合(排起名来我最棒)

有序集合类型 (Sorted Set或ZSet) 相比于集合类型多了一个排序属性 score（分值），对于有序集合 ZSet 来说，每个存储元素相当于有两个值组成的，一个是有序结合的元素值，一个是排序值。有序集合保留了集合不能有重复成员的特性(分值可以重复)，但不同的是，有序集合中的元素可以排序。

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/%E5%AF%B9%E8%B1%A1%E7%AF%87/%E6%9C%89%E5%BA%8F%E9%9B%86%E5%90%88/%E6%9C%89%E5%BA%8F%E9%9B%86%E5%90%88.png)

有序集合是由 [ziplist (压缩列表)](http://blog.laoyu.site/2019/redis/Redis%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E2%80%94%E2%80%94%E5%8E%8B%E7%BC%A9%E5%88%97%E8%A1%A8/) 或 [skiplist (跳跃表)](https://blog.laoyu.site/2019/redis/Redi%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E2%80%94%E2%80%94%E8%B7%B3%E8%B7%83%E8%A1%A8/) 组成的。

当数据比较少时，有序集合使用的是 ziplist 存储的，有序集合使用 ziplist 格式存储必须满足以下两个条件：

- 有序集合保存的元素个数要小于 128 个；
- 有序集合保存的所有元素成员的长度都必须小于 64 字节。

如果不能满足以上两个条件中的任意一个，有序集合将会使用 skiplist 结构进行存储。

有序集合比较典型的使用场景就是排行榜系统例如学生成绩的排名。某视频(博客等)网站的用户点赞、播放排名、电商系统中商品的销量排名等

有关Redis有序集合对象的更详细的介绍，可以查看我的这篇文章。

[Redis对象——有序集合(ZSet)](https://blog.laoyu.site/2020/redis/Redis%E5%AF%B9%E8%B1%A1%E2%80%94%E2%80%94%E6%9C%89%E5%BA%8F%E9%9B%86%E5%90%88(ZSet)/)

### 小结

Redis提供了五种最基础也是最常用的对象(数据类型)：String、Hash、List、Set、ZSet。了解这五种对象的有助于我们更好的在日常开发中对Redis进行使用。而通过这篇文章我们可以看到每种对象都是通过多种数据结构来实现的，大家可以思考一下为什么。

### -----END-----

