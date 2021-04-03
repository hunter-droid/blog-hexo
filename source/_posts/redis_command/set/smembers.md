---

title: SMEMBERS(smembers)
copyright: true
date: 2020-03-30 14:39:30
categories: 
- Redis命令大全
- Set
keywords: Redis命令,smembers
aside: set

---
## SMEMBERS key 
>起始版本：1.0.0<br/>时间复杂度：O(N) N是集合的基数。  


#### 说明:
* 返回key集合所有的元素.
* 该命令的作用与使用一个参数的SINTER 命令作用相同.

#### 返回值

**array-reply**:集合中的所有元素.

### 示例

```c
redis> SADD myset "Hello"
(integer) 1
redis> SADD myset "World"
(integer) 1
redis> SMEMBERS myset
1) "World"
2) "Hello"
redis> 
```