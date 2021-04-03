---

title: SUNIONSTORE(sunionstore)
copyright: true
date: 2020-03-30 14:33:30
categories: 
- Redis命令大全
- Set
keywords: Redis命令,sunionstore
aside: set

---
## SUNIONSTORE destination key [key ...] 
>起始版本：1.0.0<br/>时间复杂度：O(N) N是所有给定集合中元素的总数。


#### 说明:
* 该命令作用类似于SUNION命令,不同的是它并不返回结果集,而是将结果存储在destination集合中.
* 如果destination 已经存在,则将其覆盖.

#### 返回值

**integer-reply**:结果集中元素的个数.

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
redis> SUNIONSTORE key key1 key2
(integer) 5
redis> SMEMBERS key
1) "c"
2) "e"
3) "b"
4) "a"
5) "d"
redis>
```