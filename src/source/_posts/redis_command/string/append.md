---

title: APPEND(append)
copyright: true
date: 2020-04-02 13:11:02
categories: 
- Redis命令大全
- String
keywords: Redis命令,append
aside: string

---
## APPEND key value 
>起始版本：2.0.0<br/>时间复杂度：O(1)。均摊时间复杂度是O(1)， 因为redis用的动态字符串的库在每次分配空间的时候会增加一倍的可用空闲空间，所以在添加的value较小而且已经存在的 value是任意大小的情况下，均摊时间复杂度是O(1) 。  


#### 说明:
* 如果 key 已经存在，并且值为字符串，那么这个命令会把 value 追加到原来值（value）的结尾。 如果 key 不存在，那么它将首先创建一个空字符串的key，再执行追加操作，这种情况 APPEND 将类似于 SET 操作。

#### 返回值

**Integer reply**：返回append后字符串值（value）的长度。


#### 示例

```c
redis> EXISTS mykey
(integer) 0
redis> APPEND mykey "Hello"
(integer) 5
redis> APPEND mykey " World"
(integer) 11
redis> GET mykey
"Hello World"
redis>
```
