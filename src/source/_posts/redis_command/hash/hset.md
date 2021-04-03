---

title: HSET(hset)
copyright: true
date: 2020-03-18 18:13:18
categories: 
- Redis命令大全
- Hash
keywords: Redis命令,hset
aside: Hash
---
## HSET key field value 
>起始版本：2.0.0<br/>时间复杂度：O(1)  


#### 说明:
* 设置 key 指定的哈希集中指定字段的值。
* 如果 key 指定的哈希集不存在，会创建一个新的哈希集并与 key 关联。
* 如果字段在哈希集中存在，它将被重写。

#### 返回值

**integer-reply**：含义如下
1 如果field是一个新的字段
0 如果field原来在map里面已经存在


#### 示例

```
redis> HSET myhash field1 "Hello"
(integer) 1
redis> HGET myhash field1
"Hello"
redis> 
```