---

title: HSTRLEN(hstrlen)
copyright: true
date: 2020-03-18 18:11:18
categories: 
- Redis命令大全
- Hash
keywords: Redis命令,hstrlen
aside: Hash
---
## HSTRLEN key field 
>起始版本：3.2.0<br/>时间复杂度：O(1)  


#### 说明:
* 返回hash指定field的value的字符串长度，如果hash或者field不存在，返回0.

#### 返回值

**integer-reply**:返回hash指定field的value的字符串长度，如果hash或者field不存在，返回0.


#### 示例

```
redis> HMSET myhash f1 HelloWorld f2 99 f3 -256
OK
redis> HSTRLEN myhash f1
(integer) 10
redis> HSTRLEN myhash f2
(integer) 2
redis> HSTRLEN myhash f3
(integer) 4
redis> 
```