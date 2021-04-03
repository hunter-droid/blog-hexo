---

title: SMOVE(smove)
copyright: true
date: 2020-03-30 14:38:30
categories: 
- Redis命令大全
- Set
keywords: Redis命令,smove
aside: set

---
## SMOVE source destination member 
>起始版本：1.0.0<br/>时间复杂度：O(1)  


#### 说明:
* 将member从source集合移动到destination集合中. 对于其他的客户端,在特定的时间元素将会作为source或者destination集合的成员出现.
* 如果source 集合不存在或者不包含指定的元素,这smove命令不执行任何操作并且返回0.否则对象将会从source集合中移除，并添加到destination集合中去，如果destination集合已经存在该元素，则smove命令仅将该元素充source集合中移除. 如果source 和destination不是集合类型,则返回错误.

#### 返回值

**integer-reply:**

* 如果该元素成功移除,返回1

* 如果该元素不是 source集合成员,无任何操作,则返回0.

```c
redis> SADD myset "one"
  (integer) 1
  redis> SADD myset "two"
  (integer) 1
  redis> SADD myotherset "three"
  (integer) 1
  redis> SMOVE myset myotherset "two"
  (integer) 1
  redis> SMEMBERS myset
  1) "one"
  redis> SMEMBERS myotherset
  1) "three"
  2) "two"
  redis> 
```