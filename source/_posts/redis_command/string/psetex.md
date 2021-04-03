---

title: PSETEX(psetex)
copyright: true
date: 2020-04-02 12:54:02
categories: 
- Redis命令大全
- String
keywords: Redis命令,psetex
aside: string

---
## PSETEX key milliseconds value 
>起始版本：2.6.0<br/>时间复杂度：O(1)  


#### 说明:
* PSETEX和SETEX一样，唯一的区别是到期时间以毫秒为单位,而不是秒。

#### 示例

```c
redis> PSETEX mykey 1000 "Hello"
OK
redis> PTTL mykey
(integer) 999
redis> GET mykey
"Hello"
redis> 
```