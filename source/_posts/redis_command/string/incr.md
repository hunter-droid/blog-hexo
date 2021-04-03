---

title: INCR(incr)
copyright: true
date: 2020-04-02 13:00:02
categories: 
- Redis命令大全
- String
keywords: Redis命令,incr
aside: string

---
## INCR key 
>起始版本：1.0.0<br/>时间复杂度：O(1)  


#### 说明:
* 对存储在指定key的数值执行原子的加1操作。
* 如果指定的key不存在，那么在执行incr操作之前，会先将它的值设定为0。

#### 返回值


**integer-reply**:执行递增操作后key对应的值。


#### 示例

```c
redis> SET mykey "10"
OK
redis> INCR mykey
(integer) 11
redis> GET mykey
"11"
redis> 
```