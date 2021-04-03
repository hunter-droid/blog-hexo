---

title: BRPOPLPUSH(brpoplpush)
copyright: true
date: 2020-03-24 10:33:24
categories: 
- Redis命令大全
- List
keywords: Redis命令,brpoplpush
aside: list

---
## BRPOPLPUSH source destination timeout 
>起始版本：2.2.0<br/>时间复杂度：O(1)  


#### 说明:
* BRPOPLPUSH 是 RPOPLPUSH 的阻塞版本。 当 source 包含元素的时候，这个命令表现得跟 RPOPLPUSH 一模一样。 当 source 是空的时候，Redis将会阻塞这个连接，直到另一个客户端 push 元素进入或者达到 timeout 时限。 timeout 为 0 能用于无限期阻塞客户端。

#### 返回值


**批量回复(bulk-reply)**: 元素从 source 中弹出来，并压入 destination 中。 如果达到 timeout 时限，会返回一个空的多批量回复(nil-reply)。

更多信息请参考RPOPLPUSH 命令文档。

