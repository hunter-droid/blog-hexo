---

title: ZREM(zrem)
copyright: true
date: 2020-03-31 13:27:31
categories: 
- Redis命令大全
- ZSet
keywords: Redis命令,zrem
aside: sorted_set

---
## ZREM key member [member ...] 
>起始版本：1.2.0<br/>时间复杂度：O(M*log(N)) N为已排序集合中的元素数，M为要删除的元素数。  


#### 说明:
* 删除集合元素，当key存在，但是其不是有序集合类型，就返回一个错误。

#### 返回值

**integer-reply**：返回的是从有序集合中删除的成员个数，不包括不存在的成员。


#### 历史

\>= 2.4: 接受多个元素。在2.4之前的版本中，每次只能删除一个成员。


#### 示例

```c
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZADD myzset 2 "two"
(integer) 1
redis> ZADD myzset 3 "three"
(integer) 1
redis> ZREM myzset "two"
(integer) 1
redis> ZRANGE myzset 0 -1 WITHSCORES
1) "one"
2) "1"
3) "three"
4) "3"
redis> 
```