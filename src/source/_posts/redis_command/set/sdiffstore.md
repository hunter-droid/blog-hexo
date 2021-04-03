---

title: SDIFFSTORE(sdiffstore)
copyright: true
date: 2020-03-30 14:43:30
categories: 
- Redis命令大全
- Set
keywords: Redis命令,sdiffstore
aside: set

---
## SDIFFSTORE destination key [key ...] 
>起始版本：1.0.0<br/>时间复杂度：O(N) N是所有给定集合中元素的总数


#### 说明:
* 该命令类似于 SDIFF, 不同之处在于该命令不返回结果集，而是将结果存放在destination集合中.
* 如果destination已经存在, 则将其覆盖重写.

#### 返回值

**integer-reply**: 结果集元素的个数.


#### 示例

```c
redis> SADD key1 "a"
(integer) 1
redis> SADD key1 "b"
(integer) 1
redis> SADD key1 "c"
(integer) 1
redis> SADD key2 "c"
(integer) 1
redis> SADD key2 "d"
(integer) 1
redis> SADD key2 "e"
(integer) 1
redis> SDIFFSTORE key key1 key2
(integer) 2
redis> SMEMBERS key
1) "b"
2) "a"
redis> 
```