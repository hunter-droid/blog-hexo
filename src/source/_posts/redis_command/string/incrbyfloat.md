---

title: INCRBYFLOAT(incrbyfloat)
copyright: true
date: 2020-04-02 12:58:02
categories: 
- Redis命令大全
- String
keywords: Redis命令,incrbyfloat
aside: string

---
## INCRBYFLOAT key increment 
>起始版本：2.6.0<br/>时间复杂度：O(1)  


#### 说明:
* 通过指定浮点数`key`来增长浮点数(存放于string中)的值. 当键不存在时,先将其值设为0再操作.下面任一情况都会返回错误:
  - key 包含非法值(不是一个string).
  - 当前的key或者相加后的值不能解析为一个双精度的浮点值.(超出精度范围了)
* 如果操作命令成功, 相加后的值将替换原值存储在对应的键值上, 并以string的类型返回. string中已存的值或者相加参数可以任意选用指数符号,但相加计算的结果会以科学计数法的格式存储. 无论各计算的内部精度如何, 输出精度都固定为小数点后17位.

#### 返回值

**Bulk-string-reply**: 当前key增加increment后的值。


#### 示例

```c
redis> SET mykey 10.50
OK
redis> INCRBYFLOAT mykey 0.1
"10.6"
redis> SET mykey 5.0e3
OK
redis> INCRBYFLOAT mykey 2.0e2
"5200"
redis> 
```