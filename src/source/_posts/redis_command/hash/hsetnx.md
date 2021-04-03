---

title: HSETNX(hsetnx)
copyright: true
date: 2020-03-18 18:12:18
categories: 
- Redis命令大全
- Hash
keywords: Redis命令,hsetnx
aside: Hash
---
## HSETNX key field value 
>起始版本：2.0.0<br/>时间复杂度：O(1)  


#### 说明:
* 只在 key 指定的哈希集中不存在指定的字段时，设置字段的值。如果 key 指定的哈希集不存在，会创建一个新的哈希集并与 key 关联。如果字段已存在，该操作无效果。

#### 返回值

**integer-reply**：含义如下
1：如果字段是个新的字段，并成功赋值
0：如果哈希集中已存在该字段，没有操作被执行


#### 示例

```
redis> HSETNX myhash field "Hello"
(integer) 1
redis> HSETNX myhash field "World"
(integer) 0
redis> HGET myhash field
"Hello"
redis> 
```