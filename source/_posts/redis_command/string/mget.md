---

title: MGET(mget)
copyright: true
date: 2020-04-02 12:57:02
categories: 
- Redis命令大全
- String
keywords: Redis命令,mget
aside: string

---
## MGET key [key ...] 
>起始版本：1.0.0<br/>时间复杂度：O(N) N是要检索的键的数量。


#### 说明:
* 返回所有指定的key的value。对于每个不对应string或者不存在的key，都返回特殊值nil。正因为此，这个操作从来不会失败。

#### 返回值

**array-reply**: 指定的key对应的values的list


#### 示例

```c
redis> SET key1 "Hello"
OK
redis> SET key2 "World"
OK
redis> MGET key1 key2 nonexisting
1) "Hello"
2) "World"
3) (nil)
redis> 
```