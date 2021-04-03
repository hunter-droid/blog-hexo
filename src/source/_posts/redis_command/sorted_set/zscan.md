---

title: ZSCAN(zscan)
copyright: true
date: 2020-03-31 13:18:31
categories: 
- Redis命令大全
- ZSet
keywords: Redis命令,zscan
aside: sorted_set

---
## ZSCAN key cursor [MATCH pattern] [COUNT count] 
>起始版本：2.8.0<br/>时间复杂度：O(1) 对于一个完整的迭代，包括足够的命令调用，使光标返回到0。N是集合中元素的数量。.  


#### 说明:
* 请参考SCAN

