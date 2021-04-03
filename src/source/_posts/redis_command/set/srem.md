---

title: SREM(srem)
copyright: true
date: 2020-03-30 14:35:30
categories: 
- Redis命令大全
- Set
keywords: Redis命令,srem
aside: set

---
## SREM key member [member ...] 
>起始版本：1.0.0<br/>时间复杂度：O(N) N是要删除的成员数


#### 说明:
* 在key集合中移除指定的元素. 如果指定的元素不是key集合中的元素则忽略 如果key集合不存在则被视为一个空的集合，该命令返回0.
* 如果key的类型不是一个集合,则返回错误.

#### 返回值

**integer-reply**:从集合中移除元素的个数，不包括不存在的成员.


#### 历史

\>= 2.4: 接受多个 member 元素参数. Redis 2.4 之前的版本每次只能移除一个元素.

### 示例

```c
redis> SADD myset "one"
(integer) 1
redis> SADD myset "two"
(integer) 1
redis> SADD myset "three"
(integer) 1
redis> SREM myset "one"
(integer) 1
redis> SREM myset "four"
(integer) 0
redis> SMEMBERS myset
1) "three"
2) "two"
redis> 
```