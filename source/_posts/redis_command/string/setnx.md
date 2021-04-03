---

title: SETNX(setnx)
copyright: true
date: 2020-04-02 12:50:02
categories: 
- Redis命令大全
- String
keywords: Redis命令,setnx
aside: string

---
## SETNX key value 
>起始版本：1.0.0<br/>时间复杂度：O(1)  


#### 说明:
* 将key设置值为value，如果key不存在，这种情况下等同SET命令。 当key存在时，什么也不做。SETNX是“SET if Not eXists”的简写。

#### 返回值

**Integer reply**, 特定值:
1 如果key被设置了
0 如果key没有被设置


#### 示例

```c
redis> SETNX mykey "Hello"
(integer) 1
redis> SETNX mykey "World"
(integer) 0
redis> GET mykey
"Hello"
redis> 
```

