---

title: RPUSHX(rpushx)
copyright: true
date: 2020-03-24 10:19:24
categories: 
- Redis命令大全
- List
keywords: Redis命令,rpushx
aside: list

---
## RPUSHX key value 
>起始版本：2.2.0<br/>时间复杂度：O(1)  


#### 说明:
* 将值 value 插入到列表 key 的表尾, 当且仅当 key 存在并且是一个列表。 和 RPUSH 命令相反, 当 key 不存在时，RPUSHX 命令什么也不做。

#### 返回值

**integer-reply**: RPUSHX 命令执行之后，表的长度。


#### 示例

```c
redis> RPUSH mylist "Hello"
(integer) 1
redis> RPUSHX mylist "World"
(integer) 2
redis> RPUSHX myotherlist "World"
(integer) 0
redis> LRANGE mylist 0 -1
1) "Hello"
2) "World"
redis> LRANGE myotherlist 0 -1
(empty list or set)
redis> 
```