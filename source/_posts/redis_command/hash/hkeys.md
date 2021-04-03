---

title: HKEYS(hkeys)
copyright: true
date: 2020-03-18 18:17:18
categories: 
- Redis命令大全
- Hash
keywords: Redis命令,hkeys
aside: Hash
---
## HKEYS key 
>起始版本：2.0.0<br/>时间复杂度：O(N) N是Hash的长度


#### 说明:
* 返回 key 指定的哈希集中所有字段的名字。

#### 返回值

**array-reply**：哈希集中的字段列表，当 key 指定的哈希集不存在时返回空列表。


#### 示例

```
redis> HSET myhash field1 "Hello"
(integer) 1
redis> HSET myhash field2 "World"
(integer) 1
redis> HKEYS myhash
1) "field1"
2) "field2"
redis> 
```