---

title: HGETALL(hgetall)
copyright: true
date: 2020-03-18 18:20:18
categories: 
- Redis命令大全
- Hash
keywords: Redis命令,hgetall
aside: Hash
---
## HGETALL key 
>起始版本：2.0.0<br/>时间复杂度：O(N)  N是Hash的长度


#### 说明:
* 返回 key 指定的哈希集中所有的字段和值。返回值中，每个字段名的下一个是它的值，所以返回值的长度是哈希集大小的两倍。


#### 返回值

**array-reply**：哈希集中字段和值的列表。当 key 指定的哈希集不存在时返回空列表。

#### 示例

```
redis> HSET myhash field1 "Hello"
(integer) 1
redis> HSET myhash field2 "World"
(integer) 1
redis> HGETALL myhash
1) "field1"
2) "Hello"
3) "field2"
4) "World"
redis> 
```