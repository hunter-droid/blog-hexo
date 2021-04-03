---

title: SSCAN(sscan)
copyright: true
date: 2020-03-30 14:32:30
categories: 
- Redis命令大全
- Set
keywords: Redis命令,sscan
aside: set

---
## SSCAN key cursor [MATCH pattern] [COUNT count] 
>起始版本：2.8.0<br/>时间复杂度：O(1) for every call. O(N) for a complete iteration, including enough command calls for the cursor to return back to 0. N is the number of elements inside the collection..  


#### 说明:
* 请参考SCAN

