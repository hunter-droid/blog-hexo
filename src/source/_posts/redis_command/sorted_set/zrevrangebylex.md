---

title: ZREVRANGEBYLEX(zrevrangebylex)
copyright: true
date: 2020-03-31 13:30:31
categories: 
- Redis命令大全
- ZSet
keywords: Redis命令,zrevrangebylex
aside: sorted_set
---
## ZREVRANGEBYLEX key max min [LIMIT offset count] 
>起始版本：2.8.9<br/>时间复杂度：O(log(N)+M) N为已排序集合中的元素数，M为返回的元素数。如果M是常数(比如总是要求前10个元素有极限)，你可以认为它是O(log(N))。 


#### 说明:
* ZREVRANGEBYLEX 返回指定成员区间内的成员，按成员字典倒序排序, 分数必须相同。
* 在某些业务场景中,需要对一个字符串数组按名称的字典顺序进行倒序排列时,可以使用Redis中SortSet这种数据结构来处理。

```c
ZREVRANGEBYLEX key max min [LIMIT offset count]
```

| 指令           | 是否必须 | 说明                                                         |
| -------------- | -------- | ------------------------------------------------------------ |
| ZREVRANGEBYLEX | 是       | 指令                                                         |
| key            | 是       | 有序集合键名称                                               |
| max            | 是       | 字典中排序位置较大的成员,必须以"["开头,或者以"("开头,可使用"+"代替 |
| min            | 是       | 字典中排序位置较小的成员,必须以"["开头,或者以"("开头,可使用"-"代替 |
| LIMIT          | 否       | 返回结果是否分页,指令中包含LIMIT后offset、count必须输入      |
| offset         | 否       | 返回结果起始位置                                             |
| count          | 否       | 返回结果数量                                                 |

- 分数必须相同! 如果有序集合中的成员分数有不一致的,返回的结果就不准。
- 成员字符串作为二进制数组的字节数进行比较。
- 默认是以ASCII字符集的顺序进行排列。如果成员字符串包含utf-8这类字符集的内容,就会影响返回结果,所以建议不要使用。
- 源码中采用C语言中` memcmp() `函数, 从字符的第0位到最后一位进行排序,如果前面部分相同,那么较长的字符串比较短的字符串排序靠前。
- 默认情况下, “max” 和 “min” 参数前必须加 “[” 符号作为开头。”[” 符号与成员之间不能有空格, 返回成员结果集会包含参数 “max”和 “min”
- “max” 和 “min” 参数前可以加 “(“ 符号作为开头表示小于, “(“ 符号与成员之间不能有空格。返回成员结果集不会包含 “max” 和 “min” 成员。
- 可以使用 “-“ 和 “+” 表示得分最小值和最大值
- “max”和 “min” 不能反, “max” 放后面 “min”放前面会导致返回结果为空
- 与ZREVRANGEBYLEX获取顺序相反的指令是ZREVRANGEBYLEX

#### 返回值

指定成员范围的元素列表。

#### 示例

不要在分数不一致的SortSet集合中去使用 ZREVRANGEBYLEX 指令,因为获取的结果并不准确。
1. 获取所有值

可以使用 “-“ 和 “+” 表示最小值和最大值
```c
redis> zadd zset 0 a 0 aa 0 abc 0 apple 0 b 0 c 0 d 0 d1 0 dd 0 dobble 0 z 0 z1
(integer) 12
redis> ZREVRANGEBYLEX zset + -
 1) "z1"
 2) "z"
 3) "dobble"
 4) "dd"
 5) "d1"
 6) "d"
 7) "c"
 8) "b"
 9) "apple"
10) "abc"
11) "aa"
12) "a"
```
2. 获取分页数据

```c
redis> ZREVRANGEBYLEX zset + - LIMIT 0 3
1) "z1"
2) "z"
3) "dobble"
redis> ZREVRANGEBYLEX zset + - LIMIT 3 3
1) "dd"
2) "d1"
3) "d"
```
3. 获取成员之间的元素

默认情况下, “max” 和 “min” 参数前必须加 “[” 符号作为开头。
“[” 符号与成员之间不能有空格, 返回成员结果集会包含参数 “min” 和 “max” 。
```c
redis> ZREVRANGEBYLEX zset [c [aa
1) "c"
2) "b"
3) "apple"
4) "abc"
5) "aa"
```
“min” 和 “max” 不能反, “min” 放前面 “max”放后面会导致返回结果为空
```c
redis> ZREVRANGEBYLEX zset [aa [c
(empty list or set)
```
4. 使用 “(“ 小于号获取成员之间的元素

“max” 和 “min” 参数前可以加 “(“ 符号作为开头表示小于, “(“ 符号与成员之间不能有空格。
返回成员结果集不会包含 “max” 和 “min” 成员。
```c
redis> ZREVRANGEBYLEX zset (c [aa
1) "b"
2) "apple"
3) "abc"
4) "aa"
```
5. ASCII码的影响

成员字符串作为二进制数组的字节数进行比较。
默认是以ASCII字符集的顺序进行排列。
如果成员字符串包含utf-8这类字符集的内容,就会影响返回结果,所以建议不要使用。
```c
redis> zadd zset 0 dB
(integer) 1
redis> ZREVRANGEBYLEX zset + -
 1) "z1"
 2) "z"
 3) "dobble"
 4) "dd"
 5) "dB"
 6) "d1"
 7) "d"
 8) "c"
 9) "b"
10) "apple"
11) "abc"
12) "aa"
13) "a"
redis> ZREVRANGEBYLEX zset + - limit 0 3
1) "z1"
2) "z"
3) "dobble"
redis> ZREVRANGEBYLEX zset + - limit 3 3
1) "dd"
2) "dB"
3) "d1"
```
#### 使用场景示例
1. 电话号码排序

我们可以将电话号码存储到SortSet中,然后根据需要来获取号段:
```c
redis> zadd phone 0 13100111100 0 13110114300 0 13132110901 
(integer) 3
redis> zadd phone 0 13200111100 0 13210414300 0 13252110901 
(integer) 3
redis> zadd phone 0 13300111100 0 13310414300 0 13352110901 
(integer) 3
```
从大到小获取所有号码:
```c
redis> ZREVRANGEBYLEX phone + -
1) "13352110901"
2) "13310414300"
3) "13300111100"
4) "13252110901"
5) "13210414300"
6) "13200111100"
7) "13132110901"
8) "13110114300"
9) "13100111100"
```
获取132号段:
```c
redis> ZREVRANGEBYLEX phone (133 [132
1) "13252110901"
2) "13210414300"
3) "13200111100"
```
获取132、133号段:
```c
redis> ZREVRANGEBYLEX phone (134 [132
1) "13352110901"
2) "13310414300"
3) "13300111100"
4) "13252110901"
5) "13210414300"
6) "13200111100"
```
2. 姓名排序

将名称存储到SortSet中:

```c
redis> zadd names 0 Toumas 0 Jake 0 Bluetuo 0 Gaodeng 0 Aimini 0 Aidehua 
(integer) 6
```
获取所有人的名字倒序排列:
```c
redis> ZREVRANGEBYLEX names + -
1) "Toumas"
2) "Jake"
3) "Gaodeng"
4) "Bluetuo"
5) "Aimini"
6) "Aidehua"
```
获取名字中大写字母A开头的所有人:
```c
redis> ZREVRANGEBYLEX names (B [A
1) "Aimini"
2) "Aidehua"
```
获取名字中大写字母C到Z的所有人:
```c
redis> ZREVRANGEBYLEX names [Z [C
1) "Toumas"
2) "Jake"
3) "Gaodeng"
```