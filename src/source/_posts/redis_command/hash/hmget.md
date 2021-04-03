---

title: HMGET(hmget)
copyright: true
date: 2020-03-18 18:15:18
categories: 
- Redis命令大全
- Hash
keywords: Redis命令,hmget
aside: Hash
---
## HMGET key field [field ...] 
>起始版本：2.0.0<br/>时间复杂度：O(N) 其中N是请求的字段数


#### 说明:
* 返回 key 指定的哈希集中指定字段的值。
* 对于哈希集中不存在的每个字段，返回 nil 值。因为不存在的keys被认为是一个空的哈希集，对一个不存在的 key 执行 HMGET 将返回一个只含有 nil 值的列表

#### 返回值

**array-reply**：含有给定字段及其值的列表，并保持与请求相同的顺序。


#### 示例

```
redis> HSET myhash field1 "Hello"
(integer) 1
redis> HSET myhash field2 "World"
(integer) 1
redis> HMGET myhash field1 field2 nofield
1) "Hello"
2) "World"
3) (nil)
redis> 
```