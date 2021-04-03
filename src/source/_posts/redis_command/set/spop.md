---

title: SPOP(spop)
copyright: true
date: 2020-03-30 14:37:30
categories: 
- Redis命令大全
- Set
keywords: Redis命令,spop
aside: set

---
## SPOP key [count] 
>起始版本：1.0.0<br/>时间复杂度：O(1)  


#### 说明:
* 从存储在key的集合中移除并返回一个或多个随机元素。
* 此操作与SRANDMEMBER类似，它从一个集合中返回一个或多个随机元素，但不删除元素。
* 如果count大于集合内部的元素数量，此命令将会返回整个集合，不会有额外的元素。

#### 历史

\>=3.2版本 `count`参数可用。

#### 返回值

**bulk-string-reply**：被删除的元素，或者当key不存在时返回nil。


#### 示例

```c
SADD myset "one"
SADD myset "two"
SADD myset "three"
SPOP myset
SMEMBERS myset
SADD myset "four"
SADD myset "five"
SPOP myset 3
SMEMBERS myset
```