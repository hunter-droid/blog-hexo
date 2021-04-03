---

title: LSET(lset)
copyright: true
date: 2020-03-24 10:24:24
categories: 
- Redis命令大全
- List
keywords: Redis命令,lset
aside: list

---
## LSET key index value 
>起始版本：1.0.0<br/>时间复杂度：O(N) N是链表的长度。设置列表的第一个或最后一个元素为O(1)。


#### 说明:
* 设置 index 位置的list元素的值为 value。 更多关于 index 参数的信息，详见 LINDEX。
* 当index超出范围时会返回一个error。

#### 返回值


**simple-string-reply**


#### 示例

```c
redis> RPUSH mylist "one"
(integer) 1
redis> RPUSH mylist "two"
(integer) 2
redis> RPUSH mylist "three"
(integer) 3
redis> LSET mylist 0 "four"
OK
redis> LSET mylist -2 "five"
OK
redis> LRANGE mylist 0 -1
1) "four"
2) "five"
3) "three"
redis> 
```