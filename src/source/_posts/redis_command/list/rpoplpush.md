---

title: RPOPLPUSH(rpoplpush)
copyright: true
date: 2020-03-24 10:21:24
categories: 
- Redis命令大全
- List
keywords: Redis命令,rpoplpush
aside: list

---
## RPOPLPUSH source destination 
>起始版本：1.2.0<br/>时间复杂度：O(1)  


#### 说明:
* 原子性地返回并移除存储在 source 的列表的最后一个元素（列表尾部元素）， 并把该元素放入存储在 destination 的列表的第一个元素位置（列表头部）。

  例如：假设 source 存储着列表 a,b,c， destination存储着列表 x,y,z。 执行 RPOPLPUSH 得到的结果是 source 保存着列表 a,b ，而 destination 保存着列表 c,x,y,z。

  如果 source 不存在，那么会返回 nil 值，并且不会执行任何操作。 如果 source 和 destination 是同样的，那么这个操作等同于移除列表最后一个元素并且把该元素放在列表头部， 所以这个命令也可以当作是一个旋转列表的命令。

#### 返回值

**bulk-string-reply**: 被移除和放入的元素


#### 示例

```c
redis> RPUSH mylist "one"
(integer) 1
redis> RPUSH mylist "two"
(integer) 2
redis> RPUSH mylist "three"
(integer) 3
redis> RPOPLPUSH mylist myotherlist
"three"
redis> LRANGE mylist 0 -1
1) "one"
2) "two"
redis> LRANGE myotherlist 0 -1
1) "three"
redis> 
```

#### 使用场景

1. 消息队列中的备份队列(类似于RabbitMQ中的备份交换机的功能)

   Redis列表通常会被用作消息队列:生产者把消息放入一个列表中，等待消息的消费者用 [RPOP](http://www.redis.cn/commands/rpop.html) 命令（用轮询方式）或者用 BRPOP 命令（如果客户端使用阻塞操作会更好）来得到这个消息。因为消息有可能会丢失，所以这种队列并是不安全的。例如，当接收到消息后，出现了网络问题或者消费者端崩溃了， 那么这个消息就丢失了。

   RPOPLPUSH (或者其阻塞版本的BRPOPLPUSH） 可以避免这个问题：消费者端取到消息的同时把该消息放入一个正在处理中的列表。 当消息被处理了之后，可以使用 LREM 命令来移除正在处理中列表中的对应消息。也可以添加一个客户端来监控这个正在处理中列表，如果有某些消息已经在这个列表中存在很长时间了（即超过一定的处理时限）， 那么这个客户端会把这些超时消息重新加入到队列中。

2. 循环列表

   RPOPLPUSH 命令的 source 和 destination 是相同的话， 那么客户端在访问一个拥有n个元素的列表时，可以在 O(N) 时间里一个接一个获取列表元素， 而不用像 LRANGE那样需要把整个列表从服务器端传送到客户端。

   这个模式让我们可以很容易地实现这样一个系统：有 N 个客户端，需要连续不断地对一批元素进行处理，而且处理的过程必须尽可能地快。 一个典型的例子就是服务器上的监控程序：它们需要在尽可能短的时间内，并行地检查一批网站，确保它们的可访问性。

   值得注意的是，使用这个模式的客户端是易于扩展（scalable）且安全的（reliable），因为即使客户端把接收到的消息丢失了， 这个消息依然存在于队列中，等下次迭代到它的时候，可以由其他客户端进行处理。