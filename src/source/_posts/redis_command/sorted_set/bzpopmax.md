---

title: BZPOPMAX(bzpopmax)
copyright: true
date: 2020-03-31 13:40:31
categories: 

- Redis命令大全
- ZSet
keywords: Redis命令,bzpopmax
aside: sorted_set

---
# BZPOPMAX key [key ...] timeout

>**起始版本：5.0.0**
>
>**时间复杂度：**O(log(N)) N是已排序集合中元素的个数。


#### 说明:
* `BZPOPMAX` 是有序集合命令 `ZPOPMAX`带有阻塞功能的版本。
* 在参数中的所有有序集合均为空的情况下，阻塞连接。参数中包含多个有序集合时，按照参数中key的顺序，返回第一个非空key中分数最大的成员和对应的分数
* 参数 `timeout` 可以理解为客户端被阻塞的最大秒数值，0 表示永久阻塞。
* `BZPOPMAX`返回非空有序集合 key中分数最大的成员，而`BZPOPMIN`返回该key中分数最小的成员，除此之外，两条命令无其他差别。

#### 返回值

**array-reply**:当有序集合无结果返回且超时设置过期时返回 `nil`

返回三元素multi-bulk结果，第一元素key名称，第二元素成员名称，第三元素分数


#### 示例

```c
redis> DEL zset1 zset2
(integer) 0
redis> ZADD zset1 0 a 1 b 2 c
(integer) 3
redis> BZPOPMAX zset1 zset2 0
1) "zet1"
2) "2"
2) "c"
```