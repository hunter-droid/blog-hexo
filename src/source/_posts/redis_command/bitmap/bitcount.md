---

title: BITCOUNT(bitcount)
copyright: true
date: 2020-03-19 20:03:19
categories: 
- Redis命令大全
- Bitmap
keywords: Redis命令,bitcount
aside: bitmap
---
## BITCOUNT key [start end] 
>起始版本：2.6.0<br/>时间复杂度：O(N)  


#### 说明:
* 统计字符串被设置为1的bit数.
* 一般情况下，给定的整个字符串都会被进行计数，通过指定额外的 start 或 end 参数，可以让计数只在特定的位上进行。

#### 返回值

**Integer reply**:被设置为 1 的位的数量。


#### 示例

```
redis> SET mykey "foobar"
OK
redis> BITCOUNT mykey
(integer) 26
redis> BITCOUNT mykey 0 0
(integer) 4
redis> BITCOUNT mykey 1 1
(integer) 6
redis>
```