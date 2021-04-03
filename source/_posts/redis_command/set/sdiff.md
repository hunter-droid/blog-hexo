---

title: SDIFF(sdiff)
copyright: true
date: 2020-03-30 14:44:30
categories: 
- Redis命令大全
- Set
keywords: Redis命令,sdiff
aside: set
---
## SDIFF key [key ...] 
>起始版本：1.0.0<br/>时间复杂度：O(N) N是所有给定集合中元素的总数。


#### 说明:
* 返回一个集合与给定集合的差集的元素.

#### 返回值

**array-reply**:结果集的元素.

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
redis> SDIFF key1 key2
1) "a"
2) "b"
redis> 
```