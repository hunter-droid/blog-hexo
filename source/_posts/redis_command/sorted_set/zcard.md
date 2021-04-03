---

title: ZCARD(zcard)
copyright: true
date: 2020-03-31 13:39:31
categories: 
- Redis命令大全
- ZSet
keywords: Redis命令,zcard
aside: sorted_set

---
## ZCARD key 
>起始版本：1.2.0<br/>时间复杂度：O(1)  


#### 说明:
* 返回key的有序集元素个数。

#### 返回值


**integer-reply**: key存在的时候，返回有序集的元素个数，否则返回0。


#### 示例

```c
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZADD myzset 2 "two"
(integer) 1
redis> ZCARD myzset
(integer) 2
redis> 
```