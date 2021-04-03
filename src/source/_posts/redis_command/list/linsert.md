---

title: LINSERT(linsert)
copyright: true
date: 2020-03-24 10:31:24
categories: 
- Redis命令大全
- List
keywords: Redis命令,linsert
aside: list

---
## LINSERT key BEFORE|AFTER pivot value 
>起始版本：2.2.0<br/>时间复杂度：O(N) N是要遍历的元素数  


#### 说明:
* 把 value 插入存于 key 的列表中在基准值 pivot 的前面或后面。
* 当 key 不存在时，这个list会被看作是空list，任何操作都不会发生。
* 当 key 存在，但保存的不是一个list的时候，会返回error。

#### 返回值

**integer-reply**: 经过插入操作后的list长度，或者当 pivot 值找不到的时候返回 -1。


#### 示例

```c
redis> RPUSH mylist "Hello"
(integer) 1
redis> RPUSH mylist "World"
(integer) 2
redis> LINSERT mylist BEFORE "World" "There"
(integer) 3
redis> LRANGE mylist 0 -1
1) "Hello"
2) "There"
3) "World"
redis> 
```