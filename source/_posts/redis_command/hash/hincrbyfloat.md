---

title: HINCRBYFLOAT(hincrbyfloat)
copyright: true
date: 2020-03-18 18:18:18
categories: 
- Redis命令大全
- Hash
keywords: Redis命令,hincrbyfloat
aside: Hash
---
## HINCRBYFLOAT key field increment 
>起始版本：2.6.0<br/>时间复杂度：O(1)  


#### 说明:
* 为指定key的hash的field字段值执行float类型的increment。如果field不存在，则在执行该操作前设置为0.如果出现下列情况之一，则返回错误：
* field的值包含的类型错误(不是字符串)。

#### 返回值

**bulk-string-reply**： field执行increment后的值


#### 示例

```
redis> HSET mykey field 10.50
(integer) 1
redis> HINCRBYFLOAT mykey field 0.1
"10.6"
redis> HSET mykey field 5.0e3
(integer) 0
redis> HINCRBYFLOAT mykey field 2.0e2
"5200"
redis> 
```