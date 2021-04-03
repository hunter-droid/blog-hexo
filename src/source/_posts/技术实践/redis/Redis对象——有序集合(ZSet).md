---
title: Redis对象——有序集合(ZSet)
copyright: true
date: 2020-03-30 10:45:38
tags: 
- Redis
categories: Redis
keywords: Redis,ZSet,Redis有序集合
aside: redis
---

有序集合类型 (Sorted Set或ZSet) 相比于集合类型多了一个排序属性 score（分值），对于有序集合 ZSet 来说，每个存储元素相当于有两个值组成的，一个是有序结合的元素值，一个是排序值。有序集合保留了集合不能有重复成员的特性(分值可以重复)，但不同的是，有序集合中的元素可以排序。

<!--more-->

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/%E5%AF%B9%E8%B1%A1%E7%AF%87/%E6%9C%89%E5%BA%8F%E9%9B%86%E5%90%88/%E6%9C%89%E5%BA%8F%E9%9B%86%E5%90%88.png)

### 一、内部实现

有序集合是由 [ziplist (压缩列表)](http://blog.laoyu.site/2019/redis/Redis%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E2%80%94%E2%80%94%E5%8E%8B%E7%BC%A9%E5%88%97%E8%A1%A8/) 或 [skiplist (跳跃表)](https://blog.laoyu.site/2019/redis/Redi%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E2%80%94%E2%80%94%E8%B7%B3%E8%B7%83%E8%A1%A8/) 组成的。

当数据比较少时，有序集合使用的是 ziplist 存储的，有序集合使用 ziplist 格式存储必须满足以下两个条件：

- 有序集合保存的元素个数要小于 128 个；
- 有序集合保存的所有元素成员的长度都必须小于 64 字节。

如果不能满足以上两个条件中的任意一个，有序集合将会使用 skiplist 结构进行存储。

有关ziplist 和skiplist 这两种redis底层数据结构的具体实现可以参考我的另外两篇文章。

[Redis数据结构——压缩列表](http://blog.laoyu.site/2019/redis/Redis%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E2%80%94%E2%80%94%E5%8E%8B%E7%BC%A9%E5%88%97%E8%A1%A8/)

[Redis数据结构——跳跃表](https://blog.laoyu.site/2019/redis/Redi%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E2%80%94%E2%80%94%E8%B7%B3%E8%B7%83%E8%A1%A8/)。

### 二、常用命令

Redis列表对象常用命令如下表(点击命令可查看命令详细说明)。

| 命令 | 说明 | 时间复杂度 |
| ---- | ---- | ---------- |
| [BZPOPMAX key [key ...] timeout](https://blog.laoyu.site/2020/redis_command/sorted_set/bzpopmax/) | 从一个或多个排序集中删除并返回得分最高的成员，或阻塞，直到其中一个可用为止 | O(log(N)) |
| [BZPOPMIN key [key ...] timeout](https://blog.laoyu.site/2020/redis_command/sorted_set/bzpopmin/) | 从一个或多个排序集中删除并返回得分最低的成员，或阻塞，直到其中一个可用为止 | O(log(N)) |
| [ZADD key [NXXX] [CH] [INCR] score member [score member ...]](http://blog.laoyu.site/2020/redis_command/sorted_set/zadd/) |添加到有序set的一个或多个成员，或更新的分数，如果它已经存在 | O(log(N)) |
| [ZCARD key](http://blog.laoyu.site/2020/redis_command/sorted_set/zcard/) | 获取一个排序的集合中的成员数量   | O(1)         |
| [ZCOUNT key min max](http://blog.laoyu.site/2020/redis_command/sorted_set/zcount/) | 返回分数范围内的成员数量   | O(log(N))         |
| [ZINCRBY key increment member](http://blog.laoyu.site/2020/redis_command/sorted_set/zincrby/) | 增量的一名成员在排序设置的评分   | O(log(N))         |
| [ZINTERSTORE](http://blog.laoyu.site/2020/redis_command/sorted_set/zinterstore/) |相交多个排序集，导致排序的设置存储在一个新的关键|O(N*K)+O(M*log(M)) |
| [ZLEXCOUNT key min max](http://blog.laoyu.site/2020/redis_command/sorted_set/zlexcount/) | 返回成员之间的成员数量   | O(log(N))         |
| [ZPOPMAX key [count]](http://blog.laoyu.site/2020/redis_command/sorted_set/zpopmax/) | 删除并返回排序集中得分最高的成员 | O(log(N)*M)         |
| [ZPOPMIN key [count]](http://blog.laoyu.site/2020/redis_command/sorted_set/zpopmin/) | 删除并返回排序集中得分最低的成员 | O(log(N)*M)         |
| [ZRANGE key start stop [WITHSCORES]](http://blog.laoyu.site/2020/redis_command/sorted_set/zrange/) | 根据指定的index返回，返回sorted set的成员列表   | O(log(N)+M)         |
| [ZRANGEBYLEX key min max [LIMIT offset count]](http://blog.laoyu.site/2020/redis_command/sorted_set/zrangebylex/) | 返回指定成员区间内的成员，按字典正序排列, 分数必须相同。   | O(log(N)+M)         |
| [ZREVRANGEBYLEX key max min [LIMIT offset count]](http://blog.laoyu.site/2020/redis_command/sorted_set/zrevrangebylex/) | 返回指定成员区间内的成员，按字典倒序排列, 分数必须相同   | O(log(N)+M)         |
| [ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]](http://blog.laoyu.site/2020/redis_command/sorted_set/zrangebyscore/) | 返回有序集合中指定分数区间内的成员，分数由低到高排序。   | O(log(N)+M)         |
| [ZRANK key member](http://blog.laoyu.site/2020/redis_command/sorted_set/zrank/) | 确定在排序集合成员的索引   | O(log(N))         |
| [ZREM key member [member ...]](http://blog.laoyu.site/2020/redis_command/sorted_set/zrem/) | 从排序的集合中删除一个或多个成员   | O(M*log(N))         |
| [ZREMRANGEBYLEX key min max](http://blog.laoyu.site/2020/redis_command/sorted_set/zremrangebylex/) | 删除名称按字典由低到高排序成员之间所有成员。   | O(log(N)+M)         |
| [ZREMRANGEBYRANK key start stop](http://blog.laoyu.site/2020/redis_command/sorted_set/zremrangebyrank/) | 在排序设置的所有成员在给定的索引中删除   | O(log(N)+M)         |
| [ZREMRANGEBYSCORE key min max](http://blog.laoyu.site/2020/redis_command/sorted_set/zremrangebyscore/) | 删除一个排序的设置在给定的分数所有成员   | O(log(N)+M)         |
| [ZREVRANGE key start stop [WITHSCORES]](http://blog.laoyu.site/2020/redis_command/sorted_set/zrevrange/) | 在排序的设置返回的成员范围，通过索引，下令从分数高到低   | O(log(N)+M)         |
| [ZREVRANGEBYSCORE key max min [WITHSCORES] [LIMIT offset count]](http://blog.laoyu.site/2020/redis_command/sorted_set/zrevrangebyscore/) | 返回有序集合中指定分数区间内的成员，分数由高到低排序。   | O(log(N)+M)         |
| [ZREVRANK key member](http://blog.laoyu.site/2020/redis_command/sorted_set/zrevrank/) | 确定指数在排序集的成员，下令从分数高到低   | O(log(N))         |
| [ZSCORE key member](http://blog.laoyu.site/2020/redis_command/sorted_set/zscore/) | 获取成员在排序设置相关的比分   | O(1)         |
| [ZUNIONSTORE](http://blog.laoyu.site/2020/redis_command/sorted_set/zunionstore/) |添加多个排序集和导致排序的设置存储在一个新的关键|O(N)+O(M log(M)) |
| [ZSCAN key cursor [MATCH pattern] [COUNT count]](http://blog.laoyu.site/2020/redis_command/sorted_set/zscan/) | 迭代sorted sets里面的元素   | O(1)         |

### 三、使用场景

#### 3.1 排行榜系统

有序集合比较典型的使用场景就是排行榜系统。例如学生成绩的排名。某视频(博客等)网站的用户点赞、播放排名、电商系统中商品的销量排名等。我们以博客点赞为例。

1. 添加用户赞数

例如小编Tom发表了一篇博文，并且获得了10个赞。

```c
zadd user:ranking arcticle1 10
```

2. 取消用户赞数

这个时候有一个读者又觉得Tom写的不好，又取消了赞，此时需要将文章的赞数从榜单中减去1，可以使用zincrby。

```c
zincrby user:ranking arcticle1 -1
```

3. 查看某篇文章的赞数

```c
ZSCORE user:ranking arcticle1
```

4. 展示获取赞数最多的十篇文章

此功能使用zrevrange命令实现：

```c
zrevrangebyrank user:ranking  0 9
```

#### 3.2 电话号码(姓名)排序

使用有序集合的[ZRANGEBYLEX(点击可查看该命令详细说明)](https://blog.laoyu.site/2020/redis_command/sorted_set/zrangebylex/)或[ZREVRANGEBYLEX](https://blog.laoyu.site/2020/redis_command/sorted_set/zrevrangebylex/)可以帮助我们实现电话号码或姓名的排序,我们以ZRANGEBYLEX为例
**注意：不要在分数不一致的SortSet集合中去使用 ZRANGEBYLEX和 ZREVRANGEBYLEX 指令,因为获取的结果会不准确。**

1. 电话号码排序

我们可以将电话号码存储到SortSet中,然后根据需要来获取号段:

```c
redis> zadd phone 0 13100111100 0 13110114300 0 13132110901 
(integer) 3
redis> zadd phone 0 13200111100 0 13210414300 0 13252110901 
(integer) 3
redis> zadd phone 0 13300111100 0 13310414300 0 13352110901 
(integer) 3
```

获取所有号码:

```c
redis> ZRANGEBYLEX phone - +
1) "13100111100"
2) "13110114300"
3) "13132110901"
4) "13200111100"
5) "13210414300"
6) "13252110901"
7) "13300111100"
8) "13310414300"
9) "13352110901"
```

获取132号段:

```c
redis> ZRANGEBYLEX phone [132 (133
1) "13200111100"
2) "13210414300"
3) "13252110901"
```

获取132、133号段:

```c
redis> ZRANGEBYLEX phone [132 (134
1) "13200111100"
2) "13210414300"
3) "13252110901"
4) "13300111100"
5) "13310414300"
6) "13352110901"
```

2. 姓名排序

将名称存储到SortSet中:

```c
redis> zadd names 0 Toumas 0 Jake 0 Bluetuo 0 Gaodeng 0 Aimini 0 Aidehua 
(integer) 6
```

获取所有人的名字:

```c
redis> ZRANGEBYLEX names - +
1) "Aidehua"
2) "Aimini"
3) "Bluetuo"
4) "Gaodeng"
5) "Jake"
6) "Toumas"
```

获取名字中大写字母A开头的所有人:

```c
redis> ZRANGEBYLEX names [A (B
1) "Aidehua"
2) "Aimini"
```

获取名字中大写字母C到Z的所有人:

```c
redis> ZRANGEBYLEX names [C [Z
1) "Gaodeng"
2) "Jake"
3) "Toumas"
```

### 小结

本篇文章我们总结了Redis 有序集合对象的内部实现、常用命令以及常用的一些场景，有序集合提供了获取指定分数和元素范围查询、计算成员排名等功能，合理的利用有序集合，能帮助我们在实际开发中解决很多问题。那么大家在项目中对Redis有序集合对象的使用都有哪些场景呢，欢迎在评论区给我留言和分享，我会第一时间反馈！我们共同学习与进步！

### 参考

《Redis设计与实现》

《Redis开发与运维》

《Redis官方文档》

### -----END-----

