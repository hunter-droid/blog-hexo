---

title: ZREMRANGEBYRANK(zremrangebyrank)
copyright: true
date: 2020-03-31 13:25:31
categories: 
- Redis命令大全
- ZSet
keywords: Redis命令,zremrangebyrank
aside: sorted_set

---
## ZREMRANGEBYRANK key start stop 
>起始版本：2.0.0<br/>时间复杂度：O(log(N)+M) N为已排序集合中的元素数，M为操作移除的元素数。


#### 说明:
* 移除有序集key中，指定排名(rank)区间内的所有成员。下标参数start和stop都以0为底，0处是分数最小的那个元素。这些索引也可是负数，表示位移从最高分处开始数。例如，-1是分数最高的元素，-2是分数第二高的，依次类推。

#### 返回值

**integer-reply**: 被移除成员的数量。

#### 示例

```c
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZADD myzset 2 "two"
(integer) 1
redis> ZADD myzset 3 "three"
(integer) 1
redis> ZREMRANGEBYRANK myzset 0 1
(integer) 2
redis> ZRANGE myzset 0 -1 WITHSCORES
1) "three"
2) "3"
redis>
```