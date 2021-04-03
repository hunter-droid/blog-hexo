---

title: BRPOP(brpop)
copyright: true
date: 2020-03-24 10:34:24
categories: 
- Redis命令大全
- List
keywords: Redis命令,brpop
aside: list

---
## BRPOP key [key ...] timeout 
>起始版本：2.0.0<br/>时间复杂度：O(1)  


#### 说明:
* BRPOP 是一个阻塞的列表弹出原语。 它是 RPOP 的阻塞版本，因为这个命令会在给定list无法弹出任何元素的时候阻塞连接。 该命令会按照给出的 key 顺序查看 list，并在找到的第一个非空 list 的尾部弹出一个元素。
* 请在 BLPOP 文档 中查看该命令的准确语义，因为 BRPOP 和 BLPOP 基本是完全一样的，除了它们一个是从尾部弹出元素，而另一个是从头部弹出元素。

#### 返回值

**多批量回复(multi-bulk-reply)**: 具体来说:当没有元素可以被弹出时返回一个 nil 的多批量值，并且 timeout 过期。当有元素弹出时会返回一个双元素的多批量值，其中第一个元素是弹出元素的 key，第二个元素是 value。


#### 示例

```c
redis> DEL list1 list2
(integer) 0
redis> RPUSH list1 a b c
(integer) 3
redis> BRPOP list1 list2 0
1) "list1"
2) "c"
```

