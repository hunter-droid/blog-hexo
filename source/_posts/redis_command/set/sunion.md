---

title: SUNION(sunion)
copyright: true
date: 2020-03-30 14:34:30
categories: 
- Redis命令大全
- Set
keywords: Redis命令,sunion
aside: set

---
## SUNION key [key ...] 
>起始版本：1.0.0<br/>时间复杂度：O(N) N是所有给定集合中元素的总数。


#### 说明:
* 返回给定的多个集合的并集中的所有成员.

* 例如:

  ```
  key1 = {a,b,c,d}
  key2 = {c}
  key3 = {a,c,e}
  SUNION key1 key2 key3 = {a,b,c,d,e}
  ```


#### 返回值


**array-reply**:并集的成员列表
### 示例
```c
redis> SADD key1 "a"
(integer) 1
redis> SADD key1 "b"
(integer) 1
redis> SADD key1 "c"
(integer) 1
redis> SADD key2 "c"
(integer) 1
redis> SADD key2 "d"
(integer) 1
redis> SADD key2 "e"
(integer) 1
redis> SUNION key1 key2
1) "a"
2) "b"
3) "c"
4) "d"
5) "e"
redis> 
```