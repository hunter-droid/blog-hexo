---

title: LPOP(lpop)
copyright: true
date: 2020-03-24 09:57:24
categories: 
- Redis命令大全
- List
keywords: Redis命令,lpop
aside: list

---
## LPOP key 
>起始版本：1.0.0<br/>时间复杂度：O(1)  


#### 说明:
* 移除并且返回 key 对应的 list 的第一个元素。

#### 返回值

**bulk-string-reply**: 返回第一个元素的值，或者当 key 不存在时返回 nil。


#### 示例

```c
redis> RPUSH mylist "one"
(integer) 1
redis> RPUSH mylist "two"
(integer) 2
redis> RPUSH mylist "three"
(integer) 3
redis> LPOP mylist
"one"
redis> LRANGE mylist 0 -1
1) "two"
2) "three"
redis> 
```

