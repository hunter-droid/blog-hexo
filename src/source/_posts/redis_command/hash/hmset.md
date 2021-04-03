---

title: HMSET(hmset)
copyright: true
date: 2020-03-18 18:14:18
categories: 
- Redis命令大全
- Hash
keywords: Redis命令,hmset
aside: Hash
---
## HMSET key field value [field value ...] 
>起始版本：2.0.0<br/>时间复杂度：O(N) 其中N是设置的字段数


#### 说明:
* 设置 key 指定的哈希集中指定字段的值。该命令将重写所有在哈希集中存在的字段。如果 key 指定的哈希集不存在，会创建一个新的哈希集并与 key 关联

#### 返回值

**simple-string-reply**


#### 示例

```
redis> HMSET myhash field1 "Hello" field2 "World"
OK
redis> HGET myhash field1
"Hello"
redis> HGET myhash field2
"World"
redis> 
```