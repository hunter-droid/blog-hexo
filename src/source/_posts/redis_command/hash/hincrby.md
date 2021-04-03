---

title: HINCRBY(hincrby)
copyright: true
date: 2020-03-18 18:19:18
categories: 
- Redis命令大全
- Hash
keywords: Redis命令,hincrby
aside: Hash
---
## HINCRBY key field increment 
>起始版本：2.0.0<br/>时间复杂度：O(1)  


#### 说明:
* 增加 key 指定的哈希集中指定字段的数值。如果 key 不存在，会创建一个新的哈希集并与 key 关联。如果字段不存在，则字段的值在该操作执行前被设置为 0
* HINCRBY 支持的值的范围限定在 64位 有符号整数

#### 返回值

**integer-reply**：增值操作执行后的该字段的值。


#### 示例

```
redis> HSET myhash field 5
(integer) 1
redis> HINCRBY myhash field 1
(integer) 6
redis> HINCRBY myhash field -1
(integer) 5
redis> HINCRBY myhash field -10
(integer) -5
redis> 
```