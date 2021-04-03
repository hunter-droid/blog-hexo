---

title: LREM(lrem)
copyright: true
date: 2020-03-24 10:25:24
categories: 
- Redis命令大全
- List
keywords: Redis命令,lrem
aside: list

---
## LREM key count value 
>起始版本：1.0.0<br/>时间复杂度：O(N) N是链表的长度 


#### 说明:
* 从存于 key 的列表里移除前 count 次出现的值为 value 的元素。 这个 count 参数通过下面几种方式影响这个操作：

  - count > 0: 从头往尾移除值为 value 的元素。
  - count < 0: 从尾往头移除值为 value 的元素。
  - count = 0: 移除所有值为 value 的元素。

  比如， LREM list -2 “hello” 会从存于 list 的列表里移除最后两个出现的 “hello”。

  需要注意的是，如果list里没有存在key就会被当作空list处理，所以当 key 不存在的时候，这个命令会返回 0。

#### 返回值


**integer-reply**: 被移除的元素个数。


#### 示例

```c
redis> RPUSH mylist "hello"
(integer) 1
redis> RPUSH mylist "hello"
(integer) 2
redis> RPUSH mylist "foo"
(integer) 3
redis> RPUSH mylist "hello"
(integer) 4
redis> LREM mylist -2 "hello"
(integer) 2
redis> LRANGE mylist 0 -1
1) "hello"
2) "foo"
redis> 
```