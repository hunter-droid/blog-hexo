---

title: HLEN(hlen)
copyright: true
date: 2020-03-18 18:16:18
categories: 
- Redis命令大全
- Hash
keywords: Redis命令,hlen
aside: Hash
---
## HLEN key 
>起始版本：2.0.0<br/>时间复杂度：O(1)  


#### 说明:
* 返回 key 指定的哈希集包含的字段的数量。

#### 返回值


**integer-reply**： 哈希集中字段的数量，当 key 指定的哈希集不存在时返回 0


#### 示例

```
redis> HSET myhash field1 "Hello"
(integer) 1
redis> HSET myhash field2 "World"
(integer) 1
redis> HLEN myhash
(integer) 2
redis> 
```