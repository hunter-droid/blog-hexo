---

title: ZREMRANGEBYSCORE(zremrangebyscore)
copyright: true
date: 2020-03-31 13:24:31
categories: 
- Redis命令大全
- ZSet
keywords: Redis命令,zremrangebyscore
aside: sorted_set

---
## ZREMRANGEBYSCORE key min max 
>起始版本：1.2.0<br/>时间复杂度：O(log(N)+M) N为已排序集合中的元素数，M为操作移除的元素数。


#### 说明:
* 移除有序集key中，所有score值介于min和max之间(包括等于min或max)的成员。 自版本2.1.6开始，score值等于min或max的成员也可以不包括在内，语法请参见ZRANGEBYSCORE命令。

#### 返回值

**integer-reply**: 删除的元素的个数。


#### 示例

```c
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZADD myzset 2 "two"
(integer) 1
redis> ZADD myzset 3 "three"
(integer) 1
redis> ZREMRANGEBYSCORE myzset -inf (2
(integer) 1
redis> ZRANGE myzset 0 -1 WITHSCORES
1) "two"
2) "2"
3) "three"
4) "3"
redis> 
```