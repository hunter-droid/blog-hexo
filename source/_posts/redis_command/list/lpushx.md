---

title: LPUSHX(lpushx)
copyright: true
date: 2020-03-24 10:27:24
categories: 
- Redis命令大全
- List
keywords: Redis命令,lpushx
aside: list

---
## LPUSHX key value 
>起始版本：2.2.0<br/>时间复杂度：O(1)  


#### 说明:
* 只有当 key 已经存在并且存着一个 list 的时候，在这个 key 下面的 list 的头部插入 value。 与 LPUSH 相反，当 key 不存在的时候不会进行任何操作。

#### 返回值

**integer-reply**: 在 push 操作后的 list 长度。


#### 示例

```c
redis> LPUSH mylist "World"
(integer) 1
redis> LPUSHX mylist "Hello"
(integer) 2
redis> LPUSHX myotherlist "Hello"
(integer) 0
redis> LRANGE mylist 0 -1
1) "Hello"
2) "World"
redis> LRANGE myotherlist 0 -1
(empty list or set)
redis> 
```