---

title: SINTER(sinter)
copyright: true
date: 2020-03-30 14:42:30
categories: 
- Redis命令大全
- Set
keywords: Redis命令,sinter
aside: set
---
## SINTER key [key ...] 
>起始版本：1.0.0<br/>时间复杂度：O(N*M) 最坏情况下，N是最小集合的基数,M是集合的个数 


#### 说明:
* 返回指定所有的集合的成员的交集.

* 例如:

  ```
  key1 = {a,b,c,d}
  key2 = {c}
  key3 = {a,c,e}
  SINTER key1 key2 key3 = {c}
  ```

#### 返回值

**array-reply**: 结果集成员的列表.


#### 示例

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
redis> SINTER key1 key2
1) "c"
redis> 
```