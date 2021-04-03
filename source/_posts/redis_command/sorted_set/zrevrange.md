---

title: ZREVRANGE(zrevrange)
copyright: true
date: 2020-03-31 13:23:31
categories: 
- Redis命令大全
- ZSet
keywords: Redis命令,zrevrange
aside: sorted_set

---
## ZREVRANGE key start stop [WITHSCORES] 
>起始版本：1.2.0<br/>时间复杂度：O(log(N)+M) N为已排序集合中的元素数，M为操作移除的元素数。


#### 说明:
* 返回有序集key中，指定区间内的成员。其中成员的位置按score值递减(从大到小)来排列。具有相同score值的成员按字典序的反序排列。 除了成员按score值递减的次序排列这一点外，ZREVRANGE命令的其他方面和ZRANGE命令一样。

#### 返回值


**array-reply**: 指定范围的元素列表(可选是否含有分数)。


#### 示例

```c
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZADD myzset 2 "two"
(integer) 1
redis> ZADD myzset 3 "three"
(integer) 1
redis> ZREVRANGE myzset 0 -1
1) "three"
2) "two"
3) "one"
redis> ZREVRANGE myzset 2 3
1) "one"
redis> ZREVRANGE myzset -2 -1
1) "two"
2) "one"
redis> 
```