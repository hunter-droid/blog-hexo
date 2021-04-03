---

title: SINTERSTORE(sinterstore)
copyright: true
date: 2020-03-30 14:41:30
categories: 
- Redis命令大全
- Set
keywords: Redis命令,sinterstore
aside: set

---
## SINTERSTORE destination key [key ...] 
>起始版本：1.0.0<br/>时间复杂度：O(N*M) 最坏情况下，N是最小集合的基数,M是集合的个数 


#### 说明:
* 这个命令与SINTER命令类似, 但是它并不是直接返回结果集,而是将结果保存在 destination集合中.
* 如果destination 集合存在, 则会被重写.

#### 返回值

**integer-reply**: 结果集中成员的个数.


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
redis> SINTERSTORE key key1 key2
(integer) 1
redis> SMEMBERS key
1) "c"
redis> 
```