---

title: HSCAN(hscan)
copyright: true
date: 2020-03-18 18:09:18
categories: 

- Redis命令大全
- Hash
keywords: Redis命令,hscan
aside: Hash
---
## HSCAN key cursor [MATCH pattern] [COUNT count] 
>起始版本：2.8.0<br/>时间复杂度：O(1) for every call. O(N) for a complete iteration, including enough command calls for the cursor to return back to 0. N is the number of elements inside the collection..  


#### 说明:
* 请参考 SCAN命令， HSCAN与之类似 。

