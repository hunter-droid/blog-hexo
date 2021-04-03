---

title: ZREMRANGEBYLEX(zremrangebylex)
copyright: true
date: 2020-03-31 13:26:31
categories: 
- Redis命令大全
- ZSet
keywords: Redis命令,zremrangebylex
aside: sorted_set

---
## ZREMRANGEBYLEX key min max 
>起始版本：2.8.9<br/>时间复杂度：O(log(N)+M) N为已排序集合中的元素数，M为操作移除的元素数。


#### 说明:
* ZREMRANGEBYLEX 删除名称按字典由低到高排序成员之间所有成员。
* 不要在成员分数不同的有序集合中使用此命令, 因为它是基于分数一致的有序集合设计的,如果使用,会导致删除的结果不正确。
* 待删除的有序集合中,分数最好相同,否则删除结果会不正常。

```c
ZREMRANGEBYLEX key min max
```

| 指令           | 是否必须 | 说明                                                         |
| -------------- | -------- | ------------------------------------------------------------ |
| ZREMRANGEBYLEX | 是       | 指令                                                         |
| key            | 是       | 有序集合键名称                                               |
| min            | 是       | 字典中排序位置较小的成员,必须以"["开头,或者以"("开头,可使用"-"代替 |
| max            | 是       | 字典中排序位置较大的成员,必须以"["开头,或者以"("开头,可使用"+"代替 |

- 有序集合中分数必须相同! 如果有序集合中的成员分数有不一致的,结果就不准。
- 成员顺序是按成员字符串作为二进制数组的字节数进行比较。
- 默认是以ASCII字符集的顺序进行排列。如果成员字符串包含utf-8这类字符集的内容,就会影响返回结果,所以建议不要使用。
- 源码中采用C语言中` memcmp() `函数, 从字符的第0位到最后一位进行排序,如果前面部分相同,那么较长的字符串比较短的字符串排序靠后。
- 默认情况下, “max” 和 “min” 参数前必须加 “[” 符号作为开头。”[” 符号与成员之间不能有空格, 返回成员结果集会包含参数 “max”和 “min”
- “max” 和 “min” 参数前可以加 “(“ 符号作为开头表示小于, “(“ 符号与成员之间不能有空格。返回成员结果集不会包含 “max” 和 “min” 成员。
- 可以使用 “-“ 和 “+” 表示得分最小值和最大值
- “max”和 “min” 不能反, “max” 放后面 “min”放前面会删除不了元素

#### 返回值

删除元素的个数。
#### 示例
**注意：**不要在分数不一致的SortSet集合中去使用 ZREMRANGEBYLEX 指令,因为获取的结果并不准确。

1. 删除所有元素
可以使用 “-“ 和 “+” 表示最小值和最大值
```c
redis> zadd zset 0 a 0 aa 0 abc 0 apple 0 b 0 c 0 d 0 d1 0 dd 0 dobble 0 z 0 z1
   (integer) 12
   redis> ZRANGEBYLEX zset + -
    1) "a"
    2) "aa"
    3) "abc"
    4) "apple"
    5) "b"
    6) "c"
    7) "d"
    8) "d1"
    9) "dd"
   10) "dobble"
   11) "z"
   12) "z1"
   redis> ZREMRANGEBYLEX zset - +
   (integer) 7
   redis> ZRANGEBYLEX zset - +
   (empty list or set)
```
2. 按名称删除某个元素

下面是删除d1这个元素
```c
redis> zadd zset 0 a 0 aa 0 abc 0 apple 0 b 0 c 0 d 0 d1 0 dd 0 dobble 0 z 0 z1
(integer) 12
redis> ZRANGEBYLEX zset - +
1) "a"
2) "aa"
3) "abc"
4) "apple"
5) "b"
6) "c"
7) "d"
8) "d1"
9) "dd"
10) "dobble"
11) "z"
12) "z1"
redis> ZREMRANGEBYLEX zset [d1 (dd
(integer) 1
redis> ZRANGEBYLEX zset - +
1) "a"
2) "aa"
3) "abc"
4) "apple"
5) "b"
6) "c"
7) "d"
8) "dd"
9) "dobble"
10) "z"
11) "z1"
```
3. 按名称删除成员之间的元素,包含”max” 和 “min”成员

默认情况下, “max” 和 “min” 参数前必须加 “[” 符号作为开头。“[” 符号与成员之间不能有空格, 删除成员包含参数 “min” 和 “max” 。
```c
redis> ZRANGEBYLEX zset - +
 1) "a"
 2) "aa"
 3) "abc"
 4) "apple"
 5) "b"
 6) "c"
 7) "d"
 8) "dd"
 9) "dobble"
10) "z"
11) "z1"
redis> ZREMRANGEBYLEX zset [a [apple
(integer) 4
redis> ZRANGEBYLEX zset - +
1) "b"
2) "c"
3) "d"
4) "dd"
5) "dobble"
6) "z"
7) "z1"
```
“min” 和 “max” 不能反, “min” 放前面 “max”放后面会导致无法删除元素
```c
redis> ZREMRANGEBYLEX zset [dobble [d
(integer) 0
```
4. 按名称删除成员之间的元素,不包含”max” 和 “min”成员

“max” 和 “min” 参数前可以加 “(“ 符号作为开头表示小于, “(“ 符号与成员之间不能有空格。
删除成员不会包含 “max” 和 “min” 成员。
```c
redis> ZRANGEBYLEX zset - +
1) "b"
2) "c"
3) "d"
4) "dd"
5) "dobble"
6) "z"
7) "z1"     
redis> ZREMRANGEBYLEX zset (d (dobble
(integer) 1
redis> ZRANGEBYLEX zset - +
1) "b"
2) "c"
3) "d"
4) "dobble"
5) "z"
6) "z1"
```