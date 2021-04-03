---

title: DECR(decr)
copyright: true
date: 2020-04-02 13:06:02
categories: 
- Redis命令大全
- String
keywords: Redis命令,decr
aside: string

---
## DECR key 
>起始版本：1.0.0<br/>时间复杂度：O(1)  


#### 说明:
* 对key对应的数字做减1操作。如果key不存在，那么在操作之前，这个key对应的值会被置为0。如果key有一个错误类型的value或者是一个不能表示成数字的字符串，就返回错误。这个操作最大支持在64位有符号的整型数字。
* 查看命令INCR了解关于增减操作的额外信息。

#### 返回值

**integer-reply**：减小之后的value


#### 示例

```c
redis> SET mykey "10"
OK
redis> DECR mykey
(integer) 9
redis> SET mykey "234293482390480948029348230948"
OK
redis> DECR mykey
ERR value is not an integer or out of range
redis> 
```