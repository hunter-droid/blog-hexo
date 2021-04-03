---

title: HDEL(hdel)
copyright: true
date: 2020-03-18 18:23:18
categories: 
- Redis命令大全
- Hash
keywords: Redis命令,hdel
aside: Hash
---
## HDEL key field [field ...] 
>起始版本：2.0.0<br/>时间复杂度：O(N) N是被删除的字段数量。  


#### 说明:
* 从 key 指定的哈希集中移除指定的域。在哈希集中不存在的域将被忽略。
* 如果 key 指定的哈希集不存在，它将被认为是一个空的哈希集，该命令将返回0。

#### 返回值

**integer-reply**： 返回从哈希集中成功移除的域的数量，不包括指出但不存在的那些域


#### 历史


在 2.4及以上版本中 ：可接受多个域作为参数。小于 2.4版本 的 Redis 每次调用只能移除一个域 要在早期版本中以原子方式从哈希集中移除多个域，可考虑 MULTI/EXEC。


#### 示例

```
redis> HSET myhash field1 "foo"
(integer) 1
redis> HDEL myhash field1
(integer) 1
redis> HDEL myhash field2
(integer) 0
redis> 
```