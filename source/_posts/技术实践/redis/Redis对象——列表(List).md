---
title: Redis对象——列表(List)
copyright: true
date: 2020-03-30 10:45:38
tags: 
- Redis
categories: Redis
keywords: Redis,List
aside: redis
---
&nbsp;&nbsp;&nbsp;&nbsp;列表（list）类型是用来存储多个有序的字符串，列表中的每个字符串称为元素(element)，一个列表最多可以存储232-1个元素。在Redis中，可以对列表两端插入（push）和弹出（pop），还可以获取指定范围的元素列表、获取指定索引下标的元素等。列表是一种比较灵活的数据结构，它可以充当栈和队列的角色，在实际开发上有很多应用场景。

<!--more-->

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/%E5%AF%B9%E8%B1%A1%E7%AF%87/%E5%88%97%E8%A1%A8/Redis%20List.png)

列表类型有两个特点：

1. 列表中的元素是有序的，这就意味着可以通过索引下标获取某个元素或者某个范围内的元素列表。
2. 列表中的元素可以是重复的.

### 一、内部实现

在Redis3.2版本以前列表类型的内部编码有两种。

* `ziplist（压缩列表）`：当列表的元素个数小于list-max-ziplist-entries配置（默认512个），同时列表中每个元素的值都小于list-max-ziplist-value配置时（默认64字节），Redis会选用ziplist来作为列表的内部实现来减少内存的使用。
* `linkedlist（链表）`：当列表类型无法满足ziplist的条件时，Redis会使用linkedlist作为列表的内部实现。

而在Redis3.2版本开始对列表数据结构进行了改造，使用 quicklist 代替了 ziplist 和 linkedlist.

关于这三种底层数据结构可以查看我的另外三篇文章

[Redis数据结构——链表](http://blog.laoyu.site/2018/redis/Redis%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E2%80%94%E2%80%94%E9%93%BE%E8%A1%A8/)

[Redis数据结构——压缩列表](http://blog.laoyu.site/2019/redis/Redis%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E2%80%94%E2%80%94%E5%8E%8B%E7%BC%A9%E5%88%97%E8%A1%A8/)

[Redis数据结构——quicklist]([https://blog.laoyu.site/2020/redis/Redis%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E2%80%94%E2%80%94quicklist/](https://blog.laoyu.site/2020/redis/Redis数据结构——quicklist/))

### 二、常用命令

Redis列表对象常用命令如下表(点击命令可查看命令详细说明)。


| 命令 | 说明 | 时间复杂度 |
| ---- | ---- | ---------- |
| [BLPOP key [key ...] timeout](http://blog.laoyu.site/2020/redis_command/list/blpop/) | 删除，并获得该列表中的第一元素，或阻塞，直到有一个可用   | O(1)         |
| [BRPOP key [key ...] timeout](http://blog.laoyu.site/2020/redis_command/list/brpop/) | 删除，并获得该列表中的最后一个元素，或阻塞，直到有一个可用   | O(1)         |
| [BRPOPLPUSH source destination timeout](http://blog.laoyu.site/2020/redis_command/list/brpoplpush/) | 弹出一个列表的值，将它推到另一个列表，并返回它;或阻塞，直到有一个可用   | O(1)         |
| [LINDEX key index](http://blog.laoyu.site/2020/redis_command/list/lindex/) | 获取一个元素，通过其索引列表   | O(N) |
| [LINSERT key BEFORE](http://blog.laoyu.site/2020/redis_command/list/linsert/) |AFTER pivot value在列表中的另一个元素之前或之后插入一个元素 | O(N) |
| [LLEN key](http://blog.laoyu.site/2020/redis_command/list/llen/) | 获得队列(List)的长度   | O(1)         |
| [LPOP key](http://blog.laoyu.site/2020/redis_command/list/lpop/) | 从队列的左边出队一个元素   | O(1)         |
| [LPUSH key value [value ...]](http://blog.laoyu.site/2020/redis_command/list/lpush/) | 从队列的左边入队一个或多个元素   | O(1)         |
| [LPUSHX key value](http://blog.laoyu.site/2020/redis_command/list/lpushx/) | 当队列存在时，从队到左边入队一个元素   | O(1)         |
| [LRANGE key start stop](http://blog.laoyu.site/2020/redis_command/list/lrange/) | 从列表中获取指定返回的元素   | O(S+N) |
| [LREM key count value](http://blog.laoyu.site/2020/redis_command/list/lrem/) | 从列表中删除元素   | O(N)         |
| [LSET key index value](http://blog.laoyu.site/2020/redis_command/list/lset/) | 设置队列里面一个元素的值   | O(N)         |
| [LTRIM key start stop](http://blog.laoyu.site/2020/redis_command/list/ltrim/) | 修剪到指定范围内的清单   | O(N)         |
| [RPOP key](http://blog.laoyu.site/2020/redis_command/list/rpop/) | 从队列的右边出队一个元   | O(1)         |
| [RPOPLPUSH source destination](http://blog.laoyu.site/2020/redis_command/list/rpoplpush/) | 删除列表中的最后一个元素，将其追加到另一个列表   | O(1)         |
| [RPUSH key value [value ...]](http://blog.laoyu.site/2020/redis_command/list/rpush/) | 从队列的右边入队一个元素   | O(1)         |
| [RPUSHX key value](http://blog.laoyu.site/2020/redis_command/list/rpushx/) | 从队列的右边入队一个元素，仅队列存在时有效   | O(1)         |
### 三、使用场景

#### 3.1 消息队列

列表类型可以使用 rpush 实现先进先出的功能，同时又可以使用 lpop 轻松的弹出（查询并删除）第一个元素，所以列表类型可以用来实现消息队列

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/%E5%AF%B9%E8%B1%A1%E7%AF%87/%E5%88%97%E8%A1%A8/%E6%B6%88%E6%81%AF%E9%98%9F%E5%88%97.png)

#### 3.2 文章(商品等)列表

我们以博客站点为例，当用户和文章都越来越多时，为了加快程序的响应速度，我们可以把用户自己的文章存入到 List 中，因为 List 是有序的结构，所以这样又可以完美的实现分页功能，从而加速了程序的响应速度。

1. 每篇文章我们使用**哈希**结构存储，例如每篇文章有3个属性title、timestamp、content

   ```c
   hmset acticle:1 title xx timestamp 1476536196 content xxxx
   ...
   hmset acticle:k title yy timestamp 1476512536 content yyyy
   ...
   ```

2. 向用户文章列表添加文章，user：{id}：articles作为用户文章列表的键：

   ```c
   lpush user:1:acticles article:1 article3
   ...
   lpush
   ...
   ```

3. 分页获取用户文章列表，例如下面伪代码获取用户id=1的前10篇文章

   ```c
   articles = lrange user:1:articles 0 9
   for article in {articles}
   {
   	hgetall {article}
   }
   ```

**注意:**使用列表类型保存和获取文章列表会存在两个问题。

* 如果每次分页获取的文章个数较多，需要执行多次hgetall操作，此时可以考虑使用Pipeline批量获取，或者考虑将文章数据序列化为字符串类型，使用mget批量获取。
* 分页获取文章列表时，lrange命令在列表两端性能较好，但是如果列表较大，获取列表中间范围的元素性能会变差，此时可以考虑将列表做二级拆分，或者使用Redis3.2的quicklist内部编码实现，它结合ziplist和linkedlist的特点，获取列表中间范围的元素时也可以高效完成。

关于列表的使用场景可参考以下几个命令组合：

* lpush+lpop=Stack（栈）
* lpush+rpop=Queue（队列）
* lpush+ltrim=Capped Collection（有限集合）
* lpush+brpop=Message Queue（消息队列）

### 小结

本篇文章我们总结了Redis 列表对象的内部实现、常用命令以及常用的一些场景，那么大家在项目中对Redis列表对象的使用都有哪些场景呢，欢迎在评论区给我留言和分享，我会第一时间反馈！我们共同学习与进步！

### 参考

《Redis设计与实现》

《Redis开发与运维》

《Redis官方文档》

### -----END-----

