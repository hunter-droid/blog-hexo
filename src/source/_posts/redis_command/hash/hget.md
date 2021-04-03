---

title: HGET(hget)
copyright: true
date: 2020-03-18 18:21:18
categories: 
- Redis命令大全
- Hash
keywords: Redis命令,hget
aside: Hash
---
## HGET key field 
>起始版本：2.0.0<br/>时间复杂度：O(1)  


#### 说明:
* 返回 key 指定的哈希集中该字段所关联的值

#### 返回值

**bulk-string-reply**：该字段所关联的值。当字段不存在或者 key 不存在时返回nil。


#### 示例

```
redis> HSET myhash field1 "foo"
(integer) 1
redis> HGET myhash field1
"foo"
redis> HGET myhash field2
(nil)
redis> 
```