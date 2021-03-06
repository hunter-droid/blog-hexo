---
title: Redis数据结构——压缩列表
copyright: true
date: 2019-08-06 07:45:04
tags:
- Redis
- 数据结构
categories: Redis
keywords: Redis,数据结构,压缩列表
aside: redis
---

### 前言

&nbsp;&nbsp;&nbsp;&nbsp;同整数集合一样压缩列表也不是基础数据结构，而是 Redis 自己设计的一种数据存储结构。它有点儿类似数组，通过一片连续的内存空间，来存储数据。不过，它跟数组不同的一点是，它允许存储的数据大小不同。

<!--more-->

### 一、压缩列表

&nbsp;&nbsp;&nbsp;&nbsp;听到“压缩”两个字，直观的反应就是节省内存。之所以说这种存储结构节省内存,是相较于数组的存储思路而言的。我们知道,数组要求每个元素的大小相同,如果我们要存储不同长度的字符串,那我们就需要用最大长度的字符串大小作为元素的大小(假设是20个字节)。存储小于 20 个字节长度的字符串的时候，便会浪费部分存储空间。

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/ziplist/%E6%95%B0%E7%BB%84.png)

&nbsp;&nbsp;&nbsp;&nbsp;数组的优势占用一片连续的空间可以很好的利用CPU缓存访问数据。如果我们想要保留这种优势，又想节省存储空间我们可以对数组进行压缩。

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/ziplist/%E6%95%B0%E7%BB%84%E5%8E%8B%E7%BC%A9.png)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;但是这样有一个问题，我们在遍历它的时候由于不知道每个元素的大小是多少，因此也就无法计算出下一个节点的具体位置。这个时候我们可以给每个节点增加一个lenght的属性。

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/ziplist/%E5%8E%8B%E7%BC%A9%E5%88%97%E8%A1%A8.png)

&nbsp;&nbsp;&nbsp;&nbsp;如此。我们在遍历节点的之后就知道每个节点的长度(占用内存的大小)，就可以很容易计算出下一个节点再内存中的位置。这种结构就像一个简单的压缩列表了。

### 二、Redis压缩列表

&nbsp;&nbsp;&nbsp;&nbsp;压缩列表(zip1ist)是列表和哈希的底层实现之一。

&nbsp;&nbsp;&nbsp;&nbsp;当一个列表只包含少量列表项,并且每个列表项要么就是小整数值,要么就是长度比较短的字符串,那么Redis就会使用压缩列表来做列表的底层实现。

&nbsp;&nbsp;&nbsp;&nbsp;当一个哈希只包含少量键值对,比且每个键值对的键和值要么就是小整数值,要么就是长度比较短的字符串,那么Redis就会使用压缩列表来做哈希的底层实现。

#### 2.1 Redis压缩列表的构成

&nbsp;&nbsp;&nbsp;&nbsp;压缩列表是Redis为了节约内存而开发的,是由一系列特殊编码的连续内存块组成的顺序型(sequential)数据结枃。一个压缩列表可以包含任意多个节点(entry),每个节点可以保存一个字节数组或者一个整数值，如下图。

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/ziplist/Redis%E5%8E%8B%E7%BC%A9%E5%88%97%E8%A1%A8%E7%BB%93%E6%9E%84.png)

示例：

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/ziplist/Redis%E5%8E%8B%E7%BC%A9%E5%88%97%E8%A1%A8%E7%BB%93%E6%9E%84-Example.png)

&nbsp;&nbsp;&nbsp;&nbsp;如上图，展示了一个总长为80字节，包含3个节点的压缩列表。如果我们有一个指向压缩列表起始地址的指针p，那么表为节点的地址就是P+60。

#### 2.2 Redis压缩列表节点的构成

&nbsp;&nbsp;&nbsp;&nbsp;每个压缩列表节点可以保存一个字节数组或者一个整数值。其中，字节数组可以是以下三种长度中的一种。

- 长度小于等于63(2^6-1)字节的字节数组;
- 长度小于等于16383(2^14-1)字节的字节数组
- 长度小于等于4294967295(2^32-1)字节的字节数组

整数值可以是以下6种长度中的一种

- 4位长,介于0至12之间的无符号整数
- 1字节长的有符号整数
- 3字节长的有符号整数
- int16_t类型整数
- int32_t类型整数
- int64_t类型整数

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/ziplist/%E5%8E%8B%E7%BC%A9%E5%88%97%E8%A1%A8%E8%8A%82%E7%82%B9.png)

&nbsp;&nbsp;&nbsp;&nbsp;节点的 previous_entry_length属性以字节为单位,记录了压缩列表中前一个节点的长度。 previous_entry_length属性的长度可以是1字节或者5字节。

- 如果前一节点的长度小于254字节,那么 previous_entry_length属性的长度为1字节，前一节点的长度就保存在这一个字节里面。
- 如果前一节点的长度大于等于254字节,那么 previous_entry_length属性的长度为5字节:其中属性的第一字节会被设置为0xFE(十进制值254),而之后的四个字节则用于保存前一节点的长度.

&nbsp;&nbsp;&nbsp;&nbsp;节点的encoding属性记录了节点的content属性所保存数据的类型以及长度。

- 一字节、两字节或者五字节长,值的最高位为00、01或者10的是字节数组编码这种编码表示节点的 content属性保存着字节数组,数组的长度由编码除去最高两位之后的其他位记录。
- 一字节长,值的最高位以11开头的是整数编码:这种编码表示节点的content属性保存着整数值,整数值的类型和长度由编码除去最高两位之后的其他位记录。

&nbsp;&nbsp;&nbsp;&nbsp;节点的content属性负责保存节点的值,节点值可以是一个字节数组或者整数,值的类型和长度由节点的encoding属性决定。

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/ziplist/%E5%8E%8B%E7%BC%A9%E5%88%97%E8%A1%A8%E8%8A%82%E7%82%B9%E7%A4%BA%E4%BE%8B1.png)

- 编码的最高两位00表示节点保存的是一个字节数组。
- 编码的后六位001011记录了字节数组的长度11。
- content属性保存着节点的值"hello world"。
- 编码11000000表示节点保存的是一个int16_t类型的整数值;
- content属性保存着节点的值10086

#### 2.3 常用操作的时间复杂度

| 操作                                                         | 时间复杂度                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 创建一个新的压缩列表                                         | O(1)                                                         |
| 创建一个包含给定值的新节点,并将这个新节点添加到压缩列表的表头或者表尾 | 平均O(N)，最坏O(N^2)(可能发生连锁更新)                       |
| 将包含给定值的新节点插人到给定节点之后                       | 平均O(N)，最坏O(N^2)(可能发生连锁更新)                       |
| 返回压缩列表给定索引上的节点                                 | O(N)                                                         |
| 在压缩列表中査找并返回包含了给定值的节点                     | 因为节点的值可能是一个字节数组,所以检查节点值和给定值是否相同的复杂度为O(N),而查找整个列表的复杂度则为(N^2) |
| 返回给定节点的下一个节点                                     | O(1)                                                         |
| 返回给定节点的前一个节点                                     | O(1)                                                         |
| 获取给定节点所保存的值                                       | O(1)                                                         |
| 从压缩列表中删除给定的节点                                   | 平均O(N)，最坏O(N^2)(可能发生连锁更新)                       |
| 删除压缩列表在给定索引上的连续多个                           | 平均O(N)，最坏O(N^2)(可能发生连锁更新)                       |
| 返回压缩列表目前占用的内存字节数                             | O(1)                                                         |
| 返回压缩列表目前包含的节点数量                               | 点数量小于65535时为O(1),大于65535时为O(N)                    |

### 本文重点

- 压缩列表是Redis为节约内存自己设计的一种顺序型数据结构。
- 压缩列表被用作列表键和哈希键的底层实现之一。
- 压缩列表可以包含多个节点,每个节点可以保存一个字节数组或者整数值。
- 添加新节点到压缩列表,或者从压缩列表中删除节点,可能会引发连锁更新操作,但这种操作出现的几率并不高。

### 参考

《Redis设计与实现》

《Redis开发与运维》

《Redis官方文档》



### -----END-----

