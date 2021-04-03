---

title: ZCOUNT(zcount)
copyright: true
date: 2020-03-31 13:38:31
categories: 
- Redis命令大全
- ZSet
keywords: Redis命令,zcount
aside: sorted_set

---
## ZCOUNT key min max 
>起始版本：2.0.0<br/>时间复杂度：O(log(N)) N是已排序集合中的元素个数。


#### 说明:
* 返回有序集key中，score值在min和max之间(默认包括score值等于min或max)的成员。 关于参数min和max的详细使用方法，请参考ZRANGEBYSCORE命令。

#### 返回值

**integer-reply**: 指定分数范围的元素个数。


#### 示例

```c
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZADD myzset 2 "two"
(integer) 1
redis> ZADD myzset 3 "three"
(integer) 1
redis> ZCOUNT myzset -inf +inf
(integer) 3
redis> ZCOUNT myzset (1 3
(integer) 2
redis> 
```