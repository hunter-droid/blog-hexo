---

title: LPUSH(lpush)
copyright: true
date: 2020-03-24 09:56:24
categories: 
- Redis命令大全
- List
keywords: Redis命令,lpush
aside: list

---
## LPUSH key value [value ...] 
>起始版本：1.0.0<br/>时间复杂度：O(1)  


#### 说明:
* 将所有指定的值插入到存于 key 的列表的头部。如果 key 不存在，那么在进行 push 操作前会创建一个空列表。 如果 key 对应的值不是一个 list 的话，那么会返回一个错误。
* 可以使用一个命令把多个元素 push 进入列表，只需在命令末尾加上多个指定的参数。元素是从最左端的到最右端的、一个接一个被插入到 list 的头部。 所以对于这个命令

#### 返回值

 LPUSH mylist a b c，返回的列表是 c 为第一个元素， b 为第二个元素， a 为第三个元素。


#### 历史


版本2.4: 接受多个 value 参数。版本老于 2.4 的 Redis 只能每条命令 push 一个值。


#### 示例

```c
redis> LPUSH mylist "world"
(integer) 1
redis> LPUSH mylist "hello"
(integer) 2
redis> LRANGE mylist 0 -1
1) "hello"
2) "world"
redis> 
```