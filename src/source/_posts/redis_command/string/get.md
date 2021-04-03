---

title: GET(get)
copyright: true
date: 2020-04-02 13:04:02
categories: 
- Redis命令大全
- String
keywords: Redis命令,get
aside: String

---
## GET key 
>起始版本：1.0.0<br/>时间复杂度：O(1)  


#### 说明:
* 返回key的value。如果key不存在，返回特殊值nil。如果key的value不是string，就返回错误，因为GET只处理string类型的values。

#### 返回值

**simple-string-reply**:key对应的value，或者nil（key不存在时）


#### 示例

```c
redis> GET nonexisting
(nil)
redis> SET mykey "Hello"
OK
redis> GET mykey
"Hello"
redis> 
```