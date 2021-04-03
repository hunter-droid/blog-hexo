---

title: SETRANGE(setrange)
copyright: true
date: 2020-04-02 12:49:02
categories: 
- Redis命令大全
- String
keywords: Redis命令,setrange
aside: string

---
## SETRANGE key offset value 
>起始版本：2.2.0<br/>时间复杂度：O(1) 不计算复制新字符串所需的时间。通常，这个字符串很小所以平摊复杂度是O(1)否则，复杂度为O(M)， M是值参数的长度。


#### 说明:
* 这个命令的作用是覆盖key对应的string的一部分，从指定的offset处开始，覆盖value的长度。如果offset比当前key对应string还要长，那这个string后面就补0以达到offset。不存在的keys被认为是空字符串，所以这个命令可以确保key有一个足够大的字符串，能在offset处设置value。
* 注意，offset最大可以是229-1(536870911),因为redis字符串限制在512M大小。如果你需要超过这个大小，你可以用多个keys。
* 当set最后一个字节并且key还没有一个字符串value或者其value是个比较小的字符串时，Redis需要立即分配所有内存，这有可能会导致服务阻塞一会。在一台2010MacBook Pro上，set536870911字节（分配512MB）需要～300ms，set134217728字节(分配128MB)需要～80ms，set33554432比特位（分配32MB）需要～30ms，set8388608比特（分配8MB）需要8ms。注意，一旦第一次内存分配完，后面对同一个key调用SETRANGE就不会预先得到内存分配。
* 正因为有了SETRANGE命令，你可以把Redis的字符串当成线性数组，随机访问只要O(1)复杂度。这在很多真实场景应用里非常快和高效。

#### 返回值

**integer-reply**：该命令修改后的字符串长度


#### 示例

```c
//基本使用方法:
redis> SET key1 "Hello World"
OK
redis> SETRANGE key1 6 "Redis"
(integer) 11
redis> GET key1
"Hello Redis"
redis> 
//补0的例子:
redis> SETRANGE key2 6 "Redis"
(integer) 11
redis> GET key2
"\x00\x00\x00\x00\x00\x00Redis"
redis> 
```