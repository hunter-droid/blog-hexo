---

title: LRANGE(lrange)
copyright: true
date: 2020-03-24 10:26:24
categories: 
- Redis命令大全
- List
keywords: Redis命令,lrange
aside: list

---
## LRANGE key start stop 
>起始版本：1.0.0<br/>时间复杂度：O(S+N) 其中S为小链表从头开始偏移的距离，大链表从最近的头或尾开始偏移的距离;N是指定范围内元素的个数。 


#### 说明:
* 返回存储在 key 的列表里指定范围内的元素。 start 和 end 偏移量都是基于0的下标，即list的第一个元素下标是0（list的表头），第二个元素下标是1，以此类推。
* 偏移量也可以是负数，表示偏移量是从list尾部开始计数。 例如， -1 表示列表的最后一个元素，-2 是倒数第二个，以此类推。

#### 注意

* 当下标超过list范围的时候不会产生error。 如果start比list的尾部下标大的时候，会返回一个空列表。 如果stop比list的实际尾部大的时候，Redis会当它是最后一个元素的下标。

#### 返回值

**array-reply**: 指定范围里的列表元素。


#### 示例

```c
redis> RPUSH mylist "one"
(integer) 1
redis> RPUSH mylist "two"
(integer) 2
redis> RPUSH mylist "three"
(integer) 3
redis> LRANGE mylist 0 0
1) "one"
redis> LRANGE mylist -3 2
1) "one"
2) "two"
3) "three"
redis> LRANGE mylist -100 100
1) "one"
2) "two"
3) "three"
redis> LRANGE mylist 5 10
(empty list or set)
redis> 
```