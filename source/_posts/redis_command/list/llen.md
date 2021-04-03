---

title: LLEN(llen)
copyright: true
date: 2020-03-24 10:30:24
categories: 
- Redis命令大全
- List
keywords: Redis命令,llen
aside: list

---
## LLEN key 
>起始版本：1.0.0<br/>时间复杂度：O(1)  


#### 说明:
* 返回存储在 key 里的list的长度。 如果 key 不存在，那么就被看作是空list，并且返回长度为 0。 当存储在 key 里的值不是一个list的话，会返回error。

#### 返回值


**integer-reply**: key对应的list的长度。


#### 示例

```c
redis> LPUSH mylist "World"
(integer) 1
redis> LPUSH mylist "Hello"
(integer) 2
redis> LLEN mylist
(integer) 2
redis> 
```