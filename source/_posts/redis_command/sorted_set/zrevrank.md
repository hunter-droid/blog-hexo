---

title: ZREVRANK(zrevrank)
copyright: true
date: 2020-03-31 13:21:31
categories: 
- Redis命令大全
- ZSet
keywords: Redis命令,zrevrank
aside: sorted_set

---
## ZREVRANK key member 
>起始版本：2.0.0<br/>时间复杂度：O(log(N))  


#### 说明:
* 返回有序集key中成员member的排名，其中有序集成员按score值从大到小排列。排名以0为底，也就是说，score值最大的成员排名为0。
* 使用ZRANK命令可以获得成员按score值递增(从小到大)排列的排名。

#### 返回值

如果member是有序集key的成员，返回**integer-reply**:member的排名。
如果member不是有序集key的成员，返回**bulk-string-reply**: nil。


#### 示例

```c
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZADD myzset 2 "two"
(integer) 1
redis> ZADD myzset 3 "three"
(integer) 1
redis> ZREVRANK myzset "one"
(integer) 2
redis> ZREVRANK myzset "four"
(nil)
redis> 
```