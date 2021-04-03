---

title: SISMEMBER(sismember)
copyright: true
date: 2020-03-30 14:40:30
categories: 
- Redis命令大全
- Set
keywords: Redis命令,sismember
aside: set
---
## SISMEMBER key member 
>起始版本：1.0.0<br/>时间复杂度：O(1)  


#### 说明:
* 返回成员 member 是否是存储的集合 key的成员.

#### 返回值

**integer-reply**:

* 如果member元素是集合key的成员，则返回1

* 如果member元素不是key的成员，或者集合key不存在，则返回0


#### 示例
```c
  redis> SADD myset "one"
  (integer) 1
  redis> SISMEMBER myset "one"
  (integer) 1
  redis> SISMEMBER myset "two"
  (integer) 0
  redis> 
```