---

title: SET(set)
copyright: true
date: 2020-04-02 12:53:02
categories: 
- Redis命令大全
- String
keywords: Redis命令,set
aside: string

---
## SET key value [EX seconds] [PX milliseconds] [NX|XX] 
>起始版本：1.0.0<br/>时间复杂度：O(1)  


#### 说明:
* 将键key设定为指定的“字符串”值。

* 如果 key 已经保存了一个值，那么这个操作会直接覆盖原来的值，并且忽略原始类型。

* 当`set`命令执行成功之后，之前设置的过期时间都将失效

* 从2.6.12版本开始，redis为`SET`命令增加了一系列选项:

  - `EX` *seconds* – 设置键key的过期时间，单位时秒
  - `PX` *milliseconds* – 设置键key的过期时间，单位时毫秒
  - `NX` – 只有键key不存在的时候才会设置key的值
  - `XX` – 只有键key存在的时候才会设置key的值

  **注意:** 由于`SET`命令加上选项已经可以完全取代SETNX, SETEX, PSETEX的功能，所以在将来的版本中，redis可能会不推荐使用并且最终抛弃这几个命令。

#### 返回值

**simple-string-reply**:如果SET命令正常执行那么回返回OK，否则如果加了NX 或者 XX选项，但是没有设置条件。那么会返回nil。


#### 示例

```c
redis> SET mykey "Hello"
OK
redis> GET mykey
"Hello"
redis> 
```