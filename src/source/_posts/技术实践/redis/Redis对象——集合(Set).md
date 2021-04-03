---
title: Redis对象——集合(Set)
copyright: true
date: 2020-03-30 10:45:38
tags: 
- Redis
categories: Redis
keywords: Redis,Set,Redis集合
aside: redis
---
集合类型 (Set) 是一个无序并唯一的键值集合。它的存储顺序不会按照插入的先后顺序进行存储。

集合类型和列表类型的区别如下：

- 列表可以存储重复元素，集合只能存储非重复元素；
- 列表是按照元素的先后顺序存储元素的，而集合则是无序方式存储元素的。

一个集合最多可以存储232-1个元素。Redis除了支持集合内的增删改查，同时还支持多个集合取交集、并集、差集，合理地使用好集合类型，能在实际开发中解决很多实际问题。

<!--more-->

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/%E5%AF%B9%E8%B1%A1%E7%AF%87/%E9%9B%86%E5%90%88/%E9%9B%86%E5%90%88.png)

### 一、内部实现

集合类型的内部编码有两种：

* [intset(整数集合)]([https://blog.laoyu.site/2019/redis/Redis%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E2%80%94%E2%80%94%E6%95%B4%E6%95%B0%E9%9B%86%E5%90%88/](https://blog.laoyu.site/2019/redis/Redis数据结构——整数集合/)):当集合中的元素都是整数且元素个数小于set-maxintset-entries配置（默认512个）时，Redis会选用intset来作为集合的内部实现，从而减少内存的使用。

* [hashtable(哈希表)](http://blog.laoyu.site/2018/redis/Redis%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E2%80%94%E2%80%94%E5%AD%97%E5%85%B8/):当集合类型无法满足intset的条件时，Redis会使用hashtable作为集合的内部实现。

有关intset和hashtable这两种redis底层数据结构的具体实现可以参考我的另外两篇文章。

[Redis数据结构——整数集合](https://blog.laoyu.site/2019/redis/Redis%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E2%80%94%E2%80%94%E6%95%B4%E6%95%B0%E9%9B%86%E5%90%88/)

[Redis数据结构——字典](http://blog.laoyu.site/2018/redis/Redis%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E2%80%94%E2%80%94%E5%AD%97%E5%85%B8/)。

### 二、常用命令

Redis列表对象常用命令如下表(点击命令可查看命令详细说明)。


| 命令 | 说明 | 时间复杂度 |
| ---- | ---- | ---------- |
| [SADD key member [member ...]](http://blog.laoyu.site/2020/redis_command/set/sadd/) | 添加一个或者多个元素到集合(set)里   | O(N)         |
| [SCARD key](http://blog.laoyu.site/2020/redis_command/set/scard/) | 获取集合里面的元素数量   | O(1)         |
| [SDIFF key [key ...]](http://blog.laoyu.site/2020/redis_command/set/sdiff/) | 获得队列不存在的元素   | O(N)         |
| [SDIFFSTORE destination key [key ...]](http://blog.laoyu.site/2020/redis_command/set/sdiffstore/) | 获得队列不存在的元素，并存储在一个关键的结果集   | O(N)         |
| [SINTER key [key ...]](http://blog.laoyu.site/2020/redis_command/set/sinter/) | 获得两个集合的交集   | O(N*M)         |
| [SINTERSTORE destination key [key ...]](http://blog.laoyu.site/2020/redis_command/set/sinterstore/) | 获得两个集合的交集，并存储在一个关键的结果集   | O(N*M)         |
| [SISMEMBER key member](http://blog.laoyu.site/2020/redis_command/set/sismember/) | 确定一个给定的值是一个集合的成员   | O(1)         |
| [SMEMBERS key](http://blog.laoyu.site/2020/redis_command/set/smembers/) | 获取集合里面的所有元素   | O(N)         |
| [SMOVE source destination member](http://blog.laoyu.site/2020/redis_command/set/smove/) | 移动集合里面的一个元素到另一个集合   | O(1)         |
| [SPOP key [count]](http://blog.laoyu.site/2020/redis_command/set/spop/) | 删除并获取一个集合里面的元素   | O(1)         |
| [SRANDMEMBER key [count]](http://blog.laoyu.site/2020/redis_command/set/srandmember/) | 从集合里面随机获取一个元素   |            |
| [SREM key member [member ...]](http://blog.laoyu.site/2020/redis_command/set/srem/) | 从集合里删除一个或多个元素   | O(N)         |
| [SUNION key [key ...]](http://blog.laoyu.site/2020/redis_command/set/sunion/) | 添加多个set元素   | O(N)         |
| [SUNIONSTORE destination key [key ...]](http://blog.laoyu.site/2020/redis_command/set/sunionstore/) | 合并set元素，并将结果存入新的set里面   | O(N)         |
| [SSCAN key cursor [MATCH pattern] [COUNT count]](http://blog.laoyu.site/2020/redis_command/set/sscan/) | 迭代set里面的元素   | O(1)         |

### 三、使用场景

通过上文，我们可以知道集合的主要几个特性，无序、不可重复、支持并交差等操作。因此集合类型比较适合用来数据去重和保障数据的唯一性，还可以用来统计多个集合的交集、错集和并集等，当我们存储的数据是无序并且需要去重的情况下，比较适合使用集合类型进行存储。

#### 3.1 标签系统

集合类型比较典型的使用场景是标签（tag）。

1. 给用户添加标签。

   ```c
   sadd user:1:tags tag1 tag2 tag5
   sadd user:2:tags tag2 tag3 tag5
   ...
   sadd user:k:tags tag1 tag2 tag4
   ...
   ```
   
2. 给标签添加用户

   ```c
   sadd tag1:users user:1 user:3
   sadd tag2:users user:1 user:2 user:3
   ...
   sadd tagk:users user:1 user:2
   ...
   ```
3. 使用sinter命令，可以来计算用户共同感兴趣的标签

   ```c
   sinter user:1:tags user:2:tags
   ```

这种标签系统在电商系统、社交系统、视频网站，图书网站，旅游网站等都有着广泛的应用。例如一个用户可能对娱乐、体育比较感兴趣，另一个用户可能对历史、新闻比较感兴趣，这些兴趣点就是标签。有了这些数据就可以得到喜欢同一个标签的人，以及用户的共同喜好的标签，这些数据对于用户体验以及增强用户黏度比较重要。例如一个社交系统可以根据用户的标签进行好友的推荐，已经用户感兴趣的新闻的推荐等，一个电子商务的网站会对不同标签的用户做不同类型的推荐，比如对数码产品比较感兴趣的人，在各个页面或者通过邮件的形式给他们推荐最新的数码产品，通常会为网站带来更多的利益。

#### 3.2 抽奖系统

Redis集合的 [SPOP(随机移除并返回集合中一个或多个元素)](https://blog.laoyu.site/2020/redis_command/set/spop/) 和 [SRANDMEMBER(随机返回集合中一个或多个元素)](https://blog.laoyu.site/2020/redis_command/set/srandmember/) 命令可以帮助我们实现一个抽奖系统

如果允许重复中奖，可以使用SRANDMEMBER 命令

```c
//添加抽奖名单
127.0.0.1:6379> SADD lucky:1 Tom
(integer) 1
127.0.0.1:6379> SADD lucky:1 Jerry
(integer) 1
127.0.0.1:6379> SADD lucky:1 John
(integer) 1
127.0.0.1:6379> SADD lucky:1 Marry
(integer) 1
127.0.0.1:6379> SADD lucky:1 Sean
(integer) 1
127.0.0.1:6379> SADD lucky:1 Lindy
(integer) 1
127.0.0.1:6379> SADD lucky:1 Echo
(integer) 1

//抽取三等奖3个
127.0.0.1:6379> SRANDMEMBER lucky:1 3
1) "John"
2) "Echo"
3) "Lindy"
//抽取二等奖2个
127.0.0.1:6379> SRANDMEMBER lucky:1 2
1) "Sean"
2) "Lindy"
//抽取一等奖1个
127.0.0.1:6379> SRANDMEMBER lucky:1 1
1) "Tom"    
```

如果不允许重复中奖，可以使用 SPOP 命令

```c
//添加抽奖名单
127.0.0.1:6379> SADD lucky:1 Tom
(integer) 1
127.0.0.1:6379> SADD lucky:1 Jerry
(integer) 1
127.0.0.1:6379> SADD lucky:1 John
(integer) 1
127.0.0.1:6379> SADD lucky:1 Marry
(integer) 1
127.0.0.1:6379> SADD lucky:1 Sean
(integer) 1
127.0.0.1:6379> SADD lucky:1 Lindy
(integer) 1
127.0.0.1:6379> SADD lucky:1 Echo
(integer) 1

//抽取三等奖3个
127.0.0.1:6379> SPOP lucky:1 3
1) "John"
2) "Echo"
3) "Lindy"
//抽取二等奖2个
127.0.0.1:6379> SPOP lucky:1 2
1) "Sean"
2) "Marry"
//抽取一等奖1个
127.0.0.1:6379> SPOP lucky:1 1
1) "Tom"   
```

**注意:**

Redis 2.6版本开始SRANDMEMBER命令支持Count参数。

Redis 3.2版本开始SRANDMEMBER命令支持Count参数。

其余低版本一次只能获取一个随机元素。

### 小结

本篇文章我们总结了Redis 集合对象的内部实现、常用命令以及常用的一些场景，那么大家在项目中对Redis集合对象的使用都有哪些场景呢，欢迎在评论区给我留言和分享，我会第一时间反馈！我们共同学习与进步！

### 参考

《Redis设计与实现》

《Redis开发与运维》

《Redis官方文档》

### -----END-----

