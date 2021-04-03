---

title: Redis数据结构——quicklist
copyright: true
date: 2020-03-23 10:45:38
tags: 
- Redis
categories: Redis
keywords: Redis,quicklist
aside: redis
---
### 前言

之前的文章我们曾总结到了[Redis数据结构——链表](http://blog.laoyu.site/2018/redis/Redis%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E2%80%94%E2%80%94%E9%93%BE%E8%A1%A8/)和[Redis数据结构——压缩列表](http://blog.laoyu.site/2019/redis/Redis%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E2%80%94%E2%80%94%E5%8E%8B%E7%BC%A9%E5%88%97%E8%A1%A8/)这两种数据结构，他们是Redis List(列表)对象的底层实现方式。但是考虑到链表的附加空间相对太高，prev 和 next 指针就要占去 16 个字节 (64bit 系统的指针是 8 个字节)，另外每个节点的内存都是单独分配，会加剧内存的碎片化，影响内存管理效率。因此Redis3.2版本开始对列表数据结构进行了改造，使用 quicklist 代替了 ziplist 和 linkedlist.

<!--more-->

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/quicklist/%E9%93%BE%E8%A1%A8%26%E5%8E%8B%E7%BC%A9%E5%88%97%E8%A1%A8.png)

### 一、基本结构

&nbsp;&nbsp;&nbsp;&nbsp;quicklist 实际上是 zipList 和 linkedList 的混合体，它将 linkedList 按段切分，每一段使用 zipList 来紧凑存储，多个 zipList 之间使用双向指针串接起来。

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/quicklist/QuickList.png)

```c
typedef struct quicklistNode {
    struct quicklistNode *prev; //上一个node节点
    struct quicklistNode *next; //下一个node
    unsigned char *zl;            //保存的数据 压缩前ziplist 压缩后压缩的数据
    unsigned int sz;             /* ziplist size in bytes */
    unsigned int count : 16;     /* count of items in ziplist */
    unsigned int encoding : 2;   /* RAW==1 or LZF==2 */
    unsigned int container : 2;  /* NONE==1 or ZIPLIST==2 */
    unsigned int recompress : 1; /* was this node previous compressed? */
    unsigned int attempted_compress : 1; /* node can't compress; too small */
    unsigned int extra : 10; /* more bits to steal for future usage */
} quicklistNode;
```
- prev: 指向链表前一个节点的指针。
- next: 指向链表后一个节点的指针。
- zl: 数据指针。如果当前节点的数据没有压缩，那么它指向一个ziplist结构；否则，它指向一个quicklistLZF结构。
- sz: 表示zl指向的ziplist的总大小（包括`zlbytes`, `zltail`, `zllen`, `zlend`和各个数据项）。需要注意的是：如果ziplist被压缩了，那么这个sz的值仍然是压缩前的ziplist大小。
- count: 表示ziplist里面包含的数据项个数。这个字段只有16bit。稍后我们会一起计算一下这16bit是否够用。
- encoding: 表示ziplist是否压缩了（以及用了哪个压缩算法）。目前只有两种取值：2表示被压缩了（而且用的是LZF压缩算法），1表示没有压缩。
- container: 是一个预留字段。本来设计是用来表明一个quicklist节点下面是直接存数据，还是使用ziplist存数据，或者用其它的结构来存数据（用作一个数据容器，所以叫container）。但是，在目前的实现中，这个值是一个固定的值2，表示使用ziplist作为数据容器。
- recompress: 当我们使用类似lindex这样的命令查看了某一项本来压缩的数据时，需要把数据暂时解压，这时就设置recompress=1做一个标记，等有机会再把数据重新压缩。
- attempted_compress: 这个值只对Redis的自动化测试程序有用。我们不用管它。
- extra: 其它扩展字段。目前Redis的实现里也没用上。

```c
typedef struct quicklistLZF {
    unsigned int sz; /* LZF size in bytes*/
    char compressed[];
} quicklistLZF;
```
quicklistLZF结构表示一个被压缩过的ziplist。其中：

- sz: 表示压缩后的ziplist大小。
- compressed: 是个柔性数组（[flexible array member](https://en.wikipedia.org/wiki/Flexible_array_member)），存放压缩后的ziplist字节数组。

```c
typedef struct quicklist {
    quicklistNode *head;
    quicklistNode *tail;
    unsigned long count;        /* total count of all entries in all ziplists */
    unsigned long len;          /* number of quicklistNodes */
    int fill : QL_FILL_BITS;              /* fill factor for individual nodes */
    unsigned int compress : QL_COMP_BITS; /* depth of end nodes not to compress;0=off */
    unsigned int bookmark_count: QL_BM_BITS;
    quicklistBookmark bookmarks[];
} quicklist;
```

- head: 指向头节点（左侧第一个节点）的指针。
- tail: 指向尾节点（右侧第一个节点）的指针。
- count: 所有ziplist数据项的个数总和。
- len: quicklist节点的个数。
- fill: 16bit，ziplist大小设置，存放`list-max-ziplist-size`参数的值。
- compress: 16bit，节点压缩深度设置，存放`list-compress-depth`参数的值。

### 二、常用操作

#### 2.1 插入

quicklist可以选择在头部或者尾部进行插入(`quicklistPushHead`和`quicklistPushTail`)，而不管是在头部还是尾部插入数据，都包含两种情况：

- 如果头节点（或尾节点）上ziplist大小没有超过限制（即`_quicklistNodeAllowInsert`返回1），那么新数据被直接插入到ziplist中（调用`ziplistPush`）。
- 如果头节点（或尾节点）上ziplist太大了，那么新创建一个quicklistNode节点（对应地也会新创建一个ziplist），然后把这个新创建的节点插入到quicklist双向链表中。

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/quicklist/%E6%B7%BB%E5%8A%A0%E6%93%8D%E4%BD%9C%20%284%29.png)

也可以从任意指定的位置插入。`quicklistInsertAfter`和`quicklistInsertBefore`就是分别在指定位置后面和前面插入数据项。这种在任意指定位置插入数据的操作，要比在头部和尾部的进行插入要复杂一些。

- 当插入位置所在的ziplist大小没有超过限制时，直接插入到ziplist中就好了；
- 当插入位置所在的ziplist大小超过了限制，但插入的位置位于ziplist两端，并且相邻的quicklist链表节点的ziplist大小没有超过限制，那么就转而插入到相邻的那个quicklist链表节点的ziplist中；
- 当插入位置所在的ziplist大小超过了限制，但插入的位置位于ziplist两端，并且相邻的quicklist链表节点的ziplist大小也超过限制，这时需要新创建一个quicklist链表节点插入。
- 对于插入位置所在的ziplist大小超过了限制的其它情况（主要对应于在ziplist中间插入数据的情况），则需要把当前ziplist分裂为两个节点，然后再其中一个节点上插入数据。

#### 2.2 查找

list的查找操作主要是对index的我们的quicklist的节点是由一个一个的ziplist构成的每个ziplist都有大小。所以我们就只需要先根据我们每个node的个数，从而找到对应的ziplist，调用ziplist的index就能成功找到。

#### 2.3 删除

区间元素删除的函数是 quicklistDelRange

quicklist 在区间删除时，会先找到 start 所在的 quicklistNode，计算删除的元素是否小于要删除的 count，如果不满足删除的个数，则会移动至下一个 quicklistNode 继续删除，依次循环直到删除完成为止。

quicklistDelRange 函数的返回值为 int 类型，当返回 1 时表示成功的删除了指定区间的元素，返回 0 时表示没有删除任何元素。

#### 2.4 其它

除了上面介绍的基本操作之外还有一些其它操作，大家可以尝试着根据链表和压缩列表的数据结构来分析一些quicklist这些操作的时间复杂度。

| 操作                                            | 时间复杂度 |
| ----------------------------------------------- | ---------- |
| quicklistCreate:创建 quicklist                  | ？         |
| quicklistInsertAfter：在某个元素的后面添加数据  | ？         |
| quicklistInsertBefore：在某个元素的前面添加数据 | ？         |
| quicklistReplaceAtIndex：替换某个元素           | ？         |
| quicklistDelEntry：删除单个元素                 | ？         |
| quicklistDelRange：删除区间元素                 | ？         |
| quicklistPushHead:头部插入元素                  | ？         |
| quicklistPushTail:尾部插入元素                  | ？         |

### 小结

&nbsp;&nbsp;&nbsp;&nbsp;Redis quicklist是Redis 3.2版本以后针对链表和压缩列表进行改造的一种数据结构，是 zipList 和 linkedList 的混合体，相对于链表它压缩了内存。进一步的提高了效率。

如果你有什么疑问，欢迎在评论区给我留言和分享，我会第一时间反馈！我们一起共同学习与进步！

### 参考

《Redis设计与实现》

《Redis开发与运维》

《Redis官方文档》



### -----END-----

