---

title: INCRBY(incrby)
copyright: true
date: 2020-04-02 12:59:02
categories: 
- Redis命令大全
- String
keywords: Redis命令,incrby
aside: string

---
## INCRBY key increment 
>起始版本：1.0.0<br/>时间复杂度：O(1)  


#### 说明:
* 将key对应的数字加decrement。如果key不存在，操作之前，key就会被置为0。如果key的value类型错误或者是个不能表示成数字的字符串，就返回错误。这个操作最多支持64位有符号的正型数字。
* 查看命令INCR了解关于增减操作的额外信息。

#### 返回值

**integer-reply**： 增加之后的value值。


#### 示例

```c
redis> SET mykey "10"
OK
redis> INCRBY mykey 5
(integer) 15
redis> 
```