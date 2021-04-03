---

title: ZREVRANGEBYSCORE(zrevrangebyscore)
copyright: true
date: 2020-03-31 13:22:31
categories: 
- Redis命令大全
- ZSet
keywords: Redis命令,zrevrangebyscore
aside: sorted_set

---
## ZREVRANGEBYSCORE key max min [WITHSCORES] [LIMIT offset count] 
>起始版本：2.2.0<br/>时间复杂度：O(log(N)+M) N为已排序集合中的元素数，M为返回的元素数。如果M是常数(比如总是要求前10个元素有极限)，你可以认为它是O(log(N))。 


#### 说明:
* ZREVRANGEBYSCORE 返回有序集合中指定分数区间内的成员，分数由高到低排序。

```c
ZREVRANGEBYSCORE key max min WITHSCORES LIMIT offset count
```

| 指令             | 是否必须 | 说明                                                    |
| ---------------- | -------- | ------------------------------------------------------- |
| ZREVRANGEBYSCORE | 是       | 指令                                                    |
| key              | 是       | 有序集合键名称                                          |
| max              | 是       | 最大分数值,可使用"+inf"代替                             |
| min              | 是       | 最小分数值,可使用"-inf"代替                             |
| WITHSCORES       | 否       | 将成员分数一并返回                                      |
| LIMIT            | 否       | 返回结果是否分页,指令中包含LIMIT后offset、count必须输入 |
| offset           | 否       | 返回结果起始位置                                        |
| count            | 否       | 返回结果数量                                            |

**提示:**

- `"max"` 和 `"min"`参数前可以加 `"("` 符号作为开头表示小于, `"("` 符号与成员之间不能有空格
- 可以使用 `"+inf"` 和 `"-inf"` 表示得分最大值和最小值
- `"max"` 和 `"min"` 不能反, `"max"` 放后面 `"min"`放前面会导致返回结果为空
- 计算成员之间的成员数量不加 `"("` 符号时,参数 `"min"` 和 `"max"` 的位置也计算在内。
- `ZREVRANGEBYSCORE`集合中按得分从高到底排序,所以`"max"`在前面,`"min"`在后面, `ZRANGEBYSCORE`集合中按得分从底到高排序,所以`"min"`在前面,`"max"`在后面。

#### 返回值

指定分数范围的元素列表。

#### 示例

1. 按分数倒序返回成员

"+inf" 或者 "-inf" 来表示记录中最大值和最小值。 "(" 左括号来表示小于某个值。目前只支持小于操作的 "(" 左括号, 右括号(大于)目前还不能支持。
```c
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZADD myzset 2 "two"
(integer) 1
redis> ZADD myzset 3 "three"
(integer) 1
redis> ZREVRANGEBYSCORE myzset +inf -inf
1) "three"
2) "two"
3) "one"
redis> ZREVRANGEBYSCORE myzset 2 1
1) "two"
2) "one"
redis> ZREVRANGEBYSCORE myzset 2 (1
1) "two"
redis> ZREVRANGEBYSCORE myzset (2 (1
(empty list or set)
redis> 
```
2. 按分数倒序返回成员以及分数

ZREVRANGEBYSCORE 指令中, 还可以使用WITHSCORES 关键字来要求返回成员列表以及分数。
```c
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZADD myzset 2 "two"
(integer) 1
redis> ZADD myzset 3 "three"
(integer) 1
redis> ZREVRANGEBYSCORE myzset +inf -inf WITHSCORES
1) "three"
2) "3"
3) "two"
4) "2"
5) "three"
6) "1"
redis> ZREVRANGEBYSCORE myzset 2 1 WITHSCORES
1) "two"
2) "2"
3) "one"
4) "1"
redis> ZREVRANGEBYSCORE myzset 2 (1
1) "two"
redis> ZREVRANGEBYSCORE myzset (2 (1
(empty list or set)
redis> 
```
3. 分页返回数据

可以通过 LIMIT 对满足条件的成员列表进行分页。一般会配合 "+inf" 或者 "-inf" 来表示最大值和最小值。 下面的
```c
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZADD myzset 2 "two"
(integer) 1
redis> ZADD myzset 3 "three"
(integer) 1
redis> ZREVRANGEBYSCORE myzset +inf (2 WITHSCORES LIMIT 0 1 
1) "three"
2) "3"
redis> ZREVRANGEBYSCORE myzset +inf (2 WITHSCORES LIMIT 2 3
(empty list or set)
redis> 
```