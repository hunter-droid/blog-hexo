---

title: HVALS(hvals)
copyright: true
date: 2020-03-18 18:10:18
categories: 
- Redis命令大全
- Hash
keywords: Redis命令,hvals
aside: Hash
---
## HVALS key 
>起始版本：2.0.0<br/>时间复杂度：O(N) where N is the size of the hash.  


#### 说明:
* 返回 key 指定的哈希集中所有字段的值。

#### 返回值


array-reply：哈希集中的值的列表，当 key 指定的哈希集不存在时返回空列表。


#### 示例

```
redis> HSET myhash field1 "Hello"
(integer) 1
redis> HSET myhash field2 "World"
(integer) 1
redis> HVALS myhash
1) "Hello"
2) "World"
redis> 
```