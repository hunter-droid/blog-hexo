---
title: Redis数据结构——简单动态字符串SDS
copyright: true
date: 2018-07-14 14:38:45
tags: 
- Redis
- 数据结构
categories: Redis
keywords: Redis,数据结构,SDS,简单动态字符串
aside: redis
---

### 前言

&nbsp;&nbsp;&nbsp;&nbsp;相信用过Redis的人都知道，Redis提供了一个逻辑上的对象系统构建了一个键值对数据库以供客户端用户使用。这个对象系统包括字符串对象，哈希对象，列表对象，集合对象，有序集合对象等。但是Redis面向内存并没有直接使用这些对象。而是使用了简单动态字符串，链表，字典(散列表),跳跃表,整数集合,压缩列表这些数据结构来操作内存。

<!--more-->

![Redis对象结构](http://hunter-image.oss-cn-beijing.aliyuncs.com/18-11-20/28083089.jpg)

### 系列文章

[图解Redis之数据结构篇——简单动态字符串SDS](http://blog.loading.ink/2018/11/14/%E5%9B%BE%E8%A7%A3Redis%E4%B9%8B%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E7%AF%87%E2%80%94%E2%80%94%E7%AE%80%E5%8D%95%E5%8A%A8%E6%80%81%E5%AD%97%E7%AC%A6%E4%B8%B2SDS/)

[图解Redis之数据结构篇——链表](http://blog.loading.ink/2018/11/15/%E5%9B%BE%E8%A7%A3Redis%E4%B9%8B%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E7%AF%87%E2%80%94%E2%80%94%E9%93%BE%E8%A1%A8/)

### 一、简单动态字符串(SDS)

&nbsp;&nbsp;&nbsp;&nbsp;Redis默认并未直接使用C字符串(C字符串仅仅作为字符串字面量，用在一些无需对字符串进行修改的地方，如打印日志)。而是以Struct的形式构造了一个SDS的抽象类型。当Redis需要一个可以被修改的字符串时，就会使用SDS来表示。在Redis数据库里，包含字符串值的键值对都是由SDS实现的(Redis中所有的键都是由字符串对象实现的即底层是由SDS实现，Redis中所有的值对象中包含的字符串对象底层也是由SDS实现)。

#### 1.1 SDS

![Redis简单动态字符串](http://hunter-image.oss-cn-beijing.aliyuncs.com/18-11-14/79800085.jpg)

```c
struct sdshdr{
    //int 记录buf数组中未使用字节的数量 如上图free为0代表未使用字节的数量为0
    int free;
    //int 记录buf数组中已使用字节的数量即sds的长度 如上图len为5代表未使用字节的数量为5
    int len;
    //字节数组用于保存字符串 sds遵循了c字符串以空字符结尾的惯例目的是为了重用c字符串函数库里的函数
    char buf[];
}
```

### 二、为什么要使用SDS

![SDS与C字符串](http://hunter-image.oss-cn-beijing.aliyuncs.com/18-11-14/84760041.jpg)

&nbsp;&nbsp;&nbsp;&nbsp;上图表示了SDS与C字符串的区别，关于为什么Redis要使用SDS而不是C字符串，我们可以从以下几个方面来分析。

#### 2.1 缓冲区溢出

![C字符串内存溢出](http://hunter-image.oss-cn-beijing.aliyuncs.com/18-11-14/95803102.jpg)

&nbsp;&nbsp;&nbsp;&nbsp;C字符串，如果程序员在字符串修改的时候如果忘记给字符串重新分配足够的空间，那么就会发生内存溢出，如上图所示，忘记给s1分配足够的内存空间, s1的数据就会溢出到s2的空间, 导致s2的内容被修改.。而Redis提供的SDS其内置的空间分配策略则可以完全杜绝这种事情的发生。当API需要对SDS进行修改时,  API会首先会检查SDS的空间是否满足条件, 如果不满足, API会自动对它动态扩展, 然后再进行修改。

![Redis SDS字符串拼接](http://hunter-image.oss-cn-beijing.aliyuncs.com/18-11-14/78147668.jpg)

#### 2.2 内存重分配

##### 2.2.1 C字符串内存重分配

&nbsp;&nbsp;&nbsp;&nbsp;在C字符串中，如果对字符串进行修改，那么我们就不得不面临内存重分配。因为C字符串是由一个N+1长度的数组组成，如果字符串的长度变长，我们就必须对数组进行扩容，否则会产生内存溢出。而如果字符串长度变短，我们就必须释放掉不再使用的空间，否则会发生内存泄漏。

##### 2.2.2 SDS空间分配策略

&nbsp;&nbsp;&nbsp;&nbsp;对于Redis这种具有高性能要求的内存数据库，如果每次修改字符串都要进行内存重分配，无疑是巨大的性能损失。而Redis的SDS提供了两种空间分配策略来解决这个问题。

1. 空间预分配

   我们知道在数组进行扩容的时候，往往会申请一个更大的数组，然后把数组复制过去。为了提升性能，我们在分配空间的时候并不是分配一个刚刚好的空间，而是分配一个更大的空间。Redis同样基于这种策略提供了空间预分配。当执行字符串增长操作并且需要扩展内存时，程序不仅仅会给SDS分配必需的空间还会分配额外的未使用空间，其长度存到free属性中。其分配策略如下:

   * 如果修改后len长度将小于1M,这时分配给free的大小和len一样,例如修改过后为10字节, 那么给free也是10字节，buf实际长度变成了10+10+1 = 21byte
   * 如果修改后len长度将大于等于1M,这时分配给free的长度为1M,例如修改过后为30M,那么给free是1M.buf实际长度变成了30M+1M+1byte

   ![](http://hunter-image.oss-cn-beijing.aliyuncs.com/18-11-14/45779204.jpg)

2. 惰性空间释放

   惰性空间释放用于字符串缩短的操作。当字符串缩短是，程序并不是立即使用内存重分配来回收缩短出来的字节，而是使用free属性记录起来，并等待将来使用。

   ![Redis 惰性空间释放](http://hunter-image.oss-cn-beijing.aliyuncs.com/18-11-14/46610277.jpg)

Redis通过空间预分配和惰性空间释放策略在字符串操作中一定程度上减少了内存重分配的次数。但这种策略同样会造成一定的内存浪费，因此Redis SDS API提供相应的API让我们在有需要的时候真正的释放SDS的未使用空间。

#### 2.3 二进制安全

&nbsp;&nbsp;&nbsp;&nbsp;C字符串中的字符必须符合某种编码（比如ASCII），并且除了字符串的末尾之外，字符串里面不能包含空字符，否则最先被程序读入的空字符将被误认为是字符串结尾，这些限制使得C字符串只能保存文本数据，而不能保存像图片、音频、视频、压缩文件这样的二进制数据。如果有一种使用空字符来分割多个单词的特殊数据格式，就不能用C字符串来表示，如"Redis\0String"，C字符串的函数会把'\0'当做结束符来处理，而忽略到后面的"String"。而SDS的buf字节数组不是在保存字符，而是一系列二进制数组，SDS API都会以二进制的方式来处理buf数组里的数据，使用len属性的值而不是空字符来判断字符串是否结束。

#### 2.4 时间复杂度

&nbsp;&nbsp;&nbsp;&nbsp;我们来看几个Redis常见操作的时间复杂度。

1. 获取SDS长度: 由于SDS中提供了len属性，因此我们可以直接获取时间复杂度为O(1).
2. 获取SDS未使用空间长度: 时间复杂度为0(1),原因同1。
3. 清除SDS保存的内容:由于惰性空间分配策略，复杂度为O(1)。
4. 创建一个长度为N的字符串:时间复杂度为O(n)。
5. 拼接一个长度为N的C字符串:时间复杂度为O(n)。
6. 拼接一个长度为N的SDS字符串:时间复杂度为O(n)。

Redis在获取字符串长度上的时间复杂度为常数级O(1)。

#### 2.5 为什么要使用SDS

&nbsp;&nbsp;&nbsp;&nbsp;通过以上分析，我们可以得到，SDS这种数据结构相对于C字符串有以下优点:

* 杜绝缓冲区溢出
* 减少字符串操作中的内存重分配次数
* 二进制安全
* 由于SDS遵循以空字符结尾的惯例，因此兼容部门C字符串函数

Redis定位于一个高性能的内存数据库，其面向的就是大数据量，大并发，频繁读写，高响应速度的业务。因此在保证安全稳定的情况下，性能的提升非常重要。而SDS这种数据结构屏蔽了C字符串的一些缺点，可以提供安全高性能的字符串操作。

### 三、小结

&nbsp;&nbsp;&nbsp;&nbsp;Redis在互联网项目中的应用越来越广泛，会用只是学习Redis中最简单的一步，要想真正的成为Redis高手，了解其底层的实现必不可少。本篇文章简单介绍了Redis中SDS数据结构及其特性，分析了Redis SDS的空间分配策略和其与C字符串相比的优势，后续的文章将继续分享Redis底层实现的其它数据结构。未完待续......

### 四、参考

《Redis设计与实现》

《Redis开发与运维》

《Redis官方文档》