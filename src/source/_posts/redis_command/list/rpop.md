---

title: RPOP(rpop)
copyright: true
date: 2020-03-24 10:22:24
categories: 
- Redis命令大全
- List
keywords: Redis命令,rpop
aside: list

---
## RPOP key 
>起始版本：1.0.0<br/>时间复杂度：O(1)  


#### 说明:
* 移除并返回存于 key 的 list 的最后一个元素。

#### 返回值

**bulk-string-reply**: 最后一个元素的值，或者当 key 不存在的时候返回 nil。


#### 示例

```c
redis> RPUSH mylist "one"
(integer) 1
redis> RPUSH mylist "two"
(integer) 2
redis> RPUSH mylist "three"
(integer) 3
redis> RPOP mylist
"three"
redis> LRANGE mylist 0 -1
1) "one"
2) "two"
redis> 
```