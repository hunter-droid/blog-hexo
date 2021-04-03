---

title: RPUSH(rpush)
copyright: true
date: 2020-03-24 10:20:24
categories: 
- Redis命令大全
- List
keywords: Redis命令,rpush
aside: list

---
## RPUSH key value [value ...] 
>起始版本：1.0.0<br/>时间复杂度：O(1)  


#### 说明:
* 向存于 key 的列表的尾部插入所有指定的值。如果 key 不存在，那么会创建一个空的列表然后再进行 push 操作。 当 key 保存的不是一个列表，那么会返回一个错误。
* 可以使用一个命令把多个元素打入队列，只需要在命令后面指定多个参数。元素是从左到右一个接一个从列表尾部插入。 比如命令 RPUSH mylist a b c 会返回一个列表，其第一个元素是 a ，第二个元素是 b ，第三个元素是 c。

#### 返回值

**integer-reply**: 在 push 操作后的列表长度。


#### 历史


2.4版本以上（包括2.4）: 接受多个 value 参数。 在小于 2.4 的 Redis 版本中，一条命令只能 push 单一个值。


#### 示例

```c
redis> RPUSH mylist "hello"
(integer) 1
redis> RPUSH mylist "world"
(integer) 2
redis> LRANGE mylist 0 -1
1) "hello"
2) "world"
redis> 
```