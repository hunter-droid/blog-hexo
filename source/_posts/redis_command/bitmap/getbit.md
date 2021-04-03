---
title: GETBIT(getbit)
copyright: true
date: 2020-03-19 19:56:19
categories: 
- Redis命令大全
- Bitmap
keywords: Redis命令,getbit
aside: bitmap
---
## GETBIT key offset 
>起始版本：2.2.0<br/>时间复杂度：O(1)  


#### 说明:
* 返回key对应的string在offset处的bit值 当offset超出了字符串长度的时候，这个字符串就被假定为由0比特填充的连续空间。当key不存在的时候，它就认为是一个空字符串，所以offset总是超出范围，然后value也被认为是由0比特填充的连续空间。到内存分配。

#### 返回值


**integer-reply：**在offset处的bit值


#### 示例

```
redis> SETBIT mykey 7 1
(integer) 0
redis> GETBIT mykey 0
(integer) 0
redis> GETBIT mykey 7
(integer) 1
redis> GETBIT mykey 100
(integer) 0
redis> 
```