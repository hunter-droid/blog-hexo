---

title: LINDEX(lindex)
copyright: true
date: 2020-03-24 10:32:24
categories: 
- Redis命令大全
- List
keywords: Redis命令,lindex
aside: list
---
## LINDEX key index 
>起始版本：1.0.0<br/>时间复杂度：O(N) N是要遍历的元素数


#### 说明:
* 返回列表里的元素的索引 index 存储在 key 里面。 下标是从0开始索引的，所以 0 是表示第一个元素， 1 表示第二个元素，并以此类推。 负数索引用于指定从列表尾部开始索引的元素。在这种方法下，-1 表示最后一个元素，-2 表示倒数第二个元素，并以此往前推。
* 当 key 位置的值不是一个列表的时候，会返回一个error。

#### 返回值

**bulk-reply**：请求的对应元素，或者当 index 超过范围的时候返回 nil。


#### 示例

```c
redis> LPUSH mylist "World"
(integer) 1
redis> LPUSH mylist "Hello"
(integer) 2
redis> LINDEX mylist 0
"Hello"
redis> LINDEX mylist -1
"World"
redis> LINDEX mylist 3
(nil)
redis> 
```