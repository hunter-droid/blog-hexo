---

title: HEXISTS(hexists)
copyright: true
date: 2020-03-18 18:22:18
categories: 
- Redis命令大全
- Hash
keywords: Redis命令,hexists
aside: Hash
---
## HEXISTS key field 
>起始版本：2.0.0<br/>时间复杂度：O(1)  


#### 说明:
* 返回hash里面field是否存在

#### 返回值


**integer-reply**, 含义如下：
1 hash里面包含该field。
0 hash里面不包含该field或者key不存在。


#### 示例

```
redis> HSET myhash field1 "foo"
(integer) 1
redis> HEXISTS myhash field1
(integer) 1
redis> HEXISTS myhash field2
(integer) 0
redis> 
```