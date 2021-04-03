---

title: ZSCORE(zscore)
copyright: true
date: 2020-03-31 13:20:31
categories: 
- Redis命令大全
- ZSet
keywords: Redis命令,zscore
aside: sorted_set

---
## ZSCORE key member 
>起始版本：1.2.0<br/>时间复杂度：O(1)  


#### 说明:
* 返回有序集key中，成员member的score值。
* 如果member元素不是有序集key的成员，或key不存在，返回nil。

#### 返回值


**bulk-string-reply**: member成员的score值（double型浮点数），以字符串形式表示。


#### 示例

```c
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZSCORE myzset "one"
"1"
redis> 
```