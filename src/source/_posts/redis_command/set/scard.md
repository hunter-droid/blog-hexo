---

title: SCARD(scard)
copyright: true
date: 2020-03-30 14:45:30
categories: 
- Redis命令大全
- Set
keywords: Redis命令,scard
aside: set

---
## SCARD key 
>起始版本：1.0.0<br/>时间复杂度：O(1)  


#### 说明:
* 返回集合存储的key的基数 (集合元素的数量).

#### 返回值


**integer-reply**: 集合的基数(元素的数量),如果key不存在,则返回 0.
#### 示例
```c
redis> SADD myset "Hello"
(integer) 1
redis> SADD myset "World"
(integer) 1
redis> SCARD myset
(integer) 2
redis> 
```
