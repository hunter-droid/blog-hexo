---

title: MSET(mset)
copyright: true
date: 2020-04-02 12:56:02
categories: 
- Redis命令大全
- String
keywords: Redis命令,mset
aside: string

---
## MSET key value [key value ...] 
>起始版本：1.0.1<br/>时间复杂度：O(N) N是要设置的键数。


#### 说明:
* 对应给定的keys到他们相应的values上。MSET会用新的value替换已经存在的value，就像普通的SET命令一样。如果你不想覆盖已经存在的values，请参看命令MSETNX。
* MSET是原子的，所以所有给定的keys是一次性set的。客户端不可能看到这种一部分keys被更新而另外的没有改变的情况。

#### 返回值

**simple-string-reply**：总是OK，因为MSET不会失败。


#### 示例

```c
redis> MSET key1 "Hello" key2 "World"
OK
redis> GET key1
"Hello"
redis> GET key2
"World"
redis> 
```