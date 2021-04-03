---

title: ZPOPMIN(zpopmin)
copyright: true
date: 2020-03-31 13:33:31
categories: 
- Redis命令大全
- ZSet
keywords: Redis命令,zpopmin
aside: sorted_set

---
## ZPOPMIN key [count] 
>起始版本：5.0.0<br/>时间复杂度：O(log(N)*M) N是已排序集合中的元素数，M是弹出的元素数。  


#### 说明:
* 删除并返回有序集合key中的最多count个具有最低得分的成员。
* 如未指定，count的默认值为1。指定一个大于有序集合的基数的count不会产生错误。 当返回多个元素时候，得分最低的元素将是第一个元素，然后是分数较高的元素。

#### 返回值

**array-reply**: 弹出的元素和分数列表。


#### 示例

```c
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZADD myzset 2 "two"
(integer) 1
redis> ZADD myzset 3 "three"
(integer) 1
redis> ZPOPMIN myzset
1) "1"
2) "one"
redis> 
```