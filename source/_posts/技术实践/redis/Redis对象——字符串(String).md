---
title: Redis对象——字符串(String)
copyright: true
date: 2019-12-24 14:38:45
tags: 
- Redis
categories: Redis
keywords: Redis String
aside: redis
---
### 前言

&nbsp;&nbsp;&nbsp;&nbsp;上一篇文章简单介绍了`Redis`的对象系统。`Redis`使用对象来表示数据库中的键和值每个对象都由一个`redisObject`结构表示,该结构中和保存数据有关的三个属性分别是`type`属性、 `encoding`属性和`ptr`属性。

<!--more-->

```c
typedef struct redisObiect{
	//类型
	unsigned type:4;
	//编码
	unsigned encoding:4;
	//指向底层数据结构的指针
	void *ptr;
}
```

&nbsp;&nbsp;&nbsp;&nbsp;字符串对象是 Redis 中最基本的数据类型,也是我们工作中最常用的数据类型。redis中的键都是字符串对象，而且其他几种数据结构都是在字符串对象基础上构建的。字符串对象的值实际可以是字符串、数字、甚至是二进制，最大不能超过512MB 。

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/%E5%AF%B9%E8%B1%A1%E7%AF%87/%E5%AD%97%E7%AC%A6%E4%B8%B2/Redis%E5%AD%97%E7%AC%A6%E4%B8%B2.png)

### 一、内部实现

&nbsp;&nbsp;&nbsp;&nbsp;Redis字符串对象底层的数据结构实现主要是int和简单动态字符串SDS(这个字符串，和我们认识的C字符串不太一样，了解具体请看[图解Redis之数据结构篇——简单动态字符串SDS](https://www.cnblogs.com/hunternet/p/9957913.html))，其通过不同的编码方式映射到不同的数据结构。

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/%E5%AF%B9%E8%B1%A1%E7%AF%87/%E5%AD%97%E7%AC%A6%E4%B8%B2/Redis%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%AF%B9%E8%B1%A1.png)

字符串对象的内部编码有3种 ：`int`、`raw`和`embstr`。Redis会根据当前值的类型和长度来决定使用哪种编码来实现。

1. 如果一个字符串对象保存的是整数值,并且这个整数值可以用`long`类型来表示,那么字符串对象会将整数值保存在字符串对象结构的`ptr`属性里面(将`void*`转换成`1ong`),并将字符串对象的编码设置为`int`。

   ![](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/%E5%AF%B9%E8%B1%A1%E7%AF%87/%E5%AD%97%E7%AC%A6%E4%B8%B2/Redis%E5%AD%97%E7%AC%A6%E4%B8%B2-int.png)

2. 如果字符串对象保存的是一个字符串值,并且这个字符串值的长度大于32字节,那么字符串对象将使用一个简单动态字符串(SDS)来保存这个字符串值,并将对象的编码设置为`raw`。

   ![](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/%E5%AF%B9%E8%B1%A1%E7%AF%87/%E5%AD%97%E7%AC%A6%E4%B8%B2/Redis%E5%AD%97%E7%AC%A6%E4%B8%B2-raw.png)

3. 如果字符串对象保存的是一个字符串值,并且这个字符申值的长度小于等于32字节，那么字符串对象将使用一个简单动态字符串(SDS)来保存这个字符串值，并将对象的编码设置为`embstr`

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/%E5%AF%B9%E8%B1%A1%E7%AF%87/%E5%AD%97%E7%AC%A6%E4%B8%B2/Redis%E5%AD%97%E7%AC%A6%E4%B8%B2-embstr.png)

&nbsp;&nbsp;&nbsp;&nbsp;`embstr`编码是专门用于保存短字符串的一种优化编码方式，我们可以看到`embstr`和`raw`编码都会使用`SDS`来保存值，但不同之处在于`embstr`会通过一次内存分配函数来分配一块连续的内存空间来保存`redisObject`和`SDS`。而`raw`编码会通过调用两次内存分配函数来分别分配两块空间来保存`redisObject`和`SDS`。Redis这样做会有很多好处。

* `embstr`编码将创建字符串对象所需的内存分配次数从raw编码的两次降低为一次
* 释放 `embstr`编码的字符串对象同样只需要调用一次内存释放函数
* 因为`embstr`编码的字符串对象的所有数据都保存在一块连续的内存里面可以更好的利用CPU缓存提升性能。

&nbsp;&nbsp;&nbsp;&nbsp;Redis中根据数据类型和长度来使用不同的编码和数据结构存储存在于Redis中的每一种对象类型上。其这种小细节上的优化令我叹服不止，后续我们会看到Redis中到处都是这种内存与性能上的小细节优化！

### 二、常用命令

&nbsp;&nbsp;&nbsp;&nbsp;字符串类型的命令比较多 ,我们先来了解几个日常开发中常用的。

#### 1 设置值

```shell
redis> set testKey testValue
OK
```
```shell
set key value [ex seconds] [px milliseconds] [nx|xx]
```

* `ex seconds`：为键设置秒级过期时间。

  如命令:`set username xiaoming ex 100`相当于执行下面两条命令

  ```shell
  SET username xiaoming 
  EXPIRE username 100
  ```

  `set key value [ex seconds]`操作是原子性的，相比连续执行上面两个命令，它更快。

* `px milliseconds`：为键设置毫秒级过期时间。

* `nx`：键必须不存在，才可以设置成功，用于添加。

  ```shell
  //mykey 不存在
  redis> set mykey "Hello" nx
  (integer) 1
  //mykey 已经存在
  redis> set mykey "World" nx
  (integer) 0
  redis> GET mykey
  "Hello"
  redis> 
  ```

  由于`set key value nx`同样是原子性的操作，因此可以作为分布式锁的一种实现方案。

* `xx`：与nx相反，键必须存在，才可以设置成功，用于更新 


以上几个命令的替代命令是`SETNX`, `SETEX`,`PSETEX`，但是由于`SET`命令加上选项已经可以完全取代`SETNX`, `SETEX`,`PSETEX`的功能，所以在将来的版本中，redis可能会不推荐使用并且最终抛弃这几个命令。

#### 2 获取值

```shell
get key
```

返回`key`的`value`。如果key不存在，返回特殊值`nil`。如果`key`的`value`不是string，就返回错误，因为`GET`只处理string类型的`values`。

```shell
redis> GET nokey
(nil)
redis> SET mykey "Hello World"
OK
redis> GET mykey
"Hello World"
```

#### 3 批量设置值

&nbsp;&nbsp;&nbsp;&nbsp;由于Redis目前的应用非常广泛，目前大多数公司对Redis的调用基本都会有一层自己的封装，看起来就像是在调用本地缓存一样，对于批量性的操作，一些对于Redis不太了解的可能就像使用本地缓存一样进行循环set。这样对性能是有很大的损耗的。实际上Redis提供了批量操作的命令。

```shell
MSET key value [key value ...]
```

对应给定的keys到他们相应的values上。`MSET`会用新的value替换已经存在的value，就像普通的`SET`命令一样。如果不想覆盖已经存在的values，可以使用`MSETNX key value [key value ...]`

注意:`MSET`是原子的，所以所有给定的keys是一次性set的。客户端不可能看到这种一部分keys被更新而另外的没有改变的情况。

```shell
redis> MSET key1 "Hello" key2 "World"
OK
redis> GET key1
"Hello"
redis> GET key2
"World"
```

#### 4 批量获取值

```powershell
MGET key [key ...]
```

结果是按照传入键的顺序返回所有指定的key的value。对于每个不对应string或者不存在的key，都返回特殊值nil。

```powershell
redis> SET key1 "Hello"
OK
redis> SET key2 "World"
OK
redis> MGET key1 key2 nokey
1) "Hello"
2) "World"
3) (nil)
```

&nbsp;&nbsp;&nbsp;&nbsp;Redis可以支撑每秒数万的读写操作，但是这指的是Redis服务端的处理能力，对于客户端来说，一次命令除了命令时间还是有网络时间，如n次get操作

使用`get`命令

```n次get时间 = n次网络时间 + n次命令时间 ```

而`mget`操作

```n次get时间 = 1次网络时间 + n次命令时间 ```

而在实际开发中因为Redis的处理能力已经足够高，性能瓶颈的因素往往是网络。 

学会使用批量操作，有助于提高效率，但是要掌握一个平衡的度，每次批量操作所发送的命令数并不是无节制的由于Redis是**单线程架构**，如果数量过多可能造成Redis阻塞或者网络拥塞。 

#### 5 计数

```powershell
incr key
```

对存储在指定`key`的数值执行原子的加1操作。

如果指定的key不存在，那么在执行incr操作之前，会先将它的值设定为`0`。

如果指定的key中存储的值不是字符串类型（fix：）或者存储的字符串类型不能表示为一个整数，

那么执行这个命令时服务器会返回一个错误(eq:(error) ERR value is not an integer or out of range)。

这个操作仅限于64位的有符号整型数据。

**注意**: 由于redis并没有一个明确的类型来表示整型数据，所以这个操作是一个字符串操作。

执行这个操作的时候，key对应存储的字符串被解析为10进制的**64位有符号整型数据**。

事实上，Redis 内部采用整数形式（Integer representation）来存储对应的整数值，所以对该类字符串值实际上是用整数保存，也就不存在存储整数的字符串表示（String representation）所带来的额外消耗。

```
redis> SET mykey "1"
OK
redis> INCR mykey
(integer) 2
redis> GET mykey
"3"
redis> 
```

除了`incr`命令， Redis提供了`decr（自减）` 、 `incrby（自增指定数字）` 、`decrby（自减指定数字）` 、 `incrbyfloat（自增浮点数）`  

```
decr key
incrby key increment
decrby key decrement
incrbyfloat key increment
```

#### 6 其它

&nbsp;&nbsp;&nbsp;&nbsp;对于常用的redis字符串命令和一些其它的命令我们列一个表格以便来更直观的看到。

| 命令                                               | 描述 | 时间复杂度 |
| -------------------------------------------------- | ---- | ---------- |
| `set key value [ex seconds] [px milliseconds] [nx|xx]`| 设置值 | O(1) |
| `get key` | 获取值 | O(1) |
| `del key [key ...]` | 删除key | O(N)(N是键的个数) |
| `mset key [key value ...]` | 批量设置值 | O(N)(N是键的个数) |
| `mget key [key ...]` | 批量获取值 | O(N)(N是键的个数) |
| `incr key` | 将 key 中储存的数字值增一 | O(1) |
| `decr key` | 将 key 中储存的数字值减一 | O(1) |
| `incrby key increment` | 将 key 所储存的值加上给定的增量值（increment） | O(1) |
| `decrby key increment` | key 所储存的值减去给定的减量值（decrement） | O(1) |
| `incrbyfloat key increment` | 将 key 所储存的值加上给定的浮点增量值（increment） | O(1) |
| `append key value` | 如果 key 已经存在并且是一个字符串， APPEND 命令将指定的 value 追加到该 key 原来值（value）的末尾 | O(1) |
| `strlen key` | 返回 key 所储存的字符串值的长度。 | O(1) |
| `setrange key offset value` | 用 value 参数覆写给定 key 所储存的字符串值，从偏移量 offset 开始 | O(1) |
| `getrange key start end` | 返回 key 中字符串值的子字符 | O(N)(N是字符串的长度) |

### 三、常用场景

&nbsp;&nbsp;&nbsp;&nbsp;reids字符串的使用场景应该是最为广泛的，甚至有些对redis其它几种对象不太熟悉的人，基本所有场景都会使用字符串(序列化一下直接扔进去)。在众多的使用场景中总结一下大概分以下几种。

#### 1. 作为缓存层

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/%E5%AF%B9%E8%B1%A1%E7%AF%87/%E5%AD%97%E7%AC%A6%E4%B8%B2/Redis%E5%AD%97%E7%AC%A6%E4%B8%B2%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF--%E7%BC%93%E5%AD%98%E5%B1%82.png)

&nbsp;&nbsp;&nbsp;&nbsp;如上图，Redis经常作为缓存层，来缓存一些热点数据。来加速读写性能从而降低后端的压力。一般在读取数据的时候会先从Redis中读取，如果Redis中没有，再从数据库中读取。在Redis作为缓存层使用的时候，必须注意一些问题，如：缓存穿透、雪崩以及缓存更新问题......

#### 2. 计数器\限速器\分布式系统ID

&nbsp;&nbsp;&nbsp;&nbsp;计数器\限速器\分布式ID等主要是利用Redis字符串自增自减的特性。

* 计数器：经常可以被用来做计数器，如微博的评论数、点赞数、分享数，抖音作品的收藏数，京东商品的销售量、评价数等。
* 限速器：如验证码接口访问频率限制，用户登陆时需要让用户输入手机验证码，从而确定是否是用户本人，但是为了短信接口不被频繁访问，会限制用户每分钟获取验证码的频率，例如一分钟不能超过5次。
* 分布式ID：由于Redis自增自减的操作是原子性的因此也经常在分布式系统中用来生成唯一的订单号、序列号等。

#### 3. 分布式系统共享session

&nbsp;&nbsp;&nbsp;&nbsp;通常在单体系统中，Web服务将会用户的Session信息（例如用户登录信息）保存在自己的服务器中。但是在分布式系统中，这样做会有问题。因为分布式系统通常有很多个服务，每个服务又会同时部署在多台机器上，通过负载均衡机制将将用户的访问均衡到不同服务器上。这个时候用户的请求可能分发到不同的服务器上，从而导致用户登录保存Session是在一台服务器上，而读取Session是在另一台服务器上因此会读不到Session。

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/%E5%AF%B9%E8%B1%A1%E7%AF%87/%E5%AD%97%E7%AC%A6%E4%B8%B2/%E6%AF%8F%E4%B8%AA%E6%9C%8D%E5%8A%A1%E5%8F%AA%E8%83%BD%E8%AF%BB%E5%86%99%E8%87%AA%E5%B7%B1%E7%9A%84Session.png)

&nbsp;&nbsp;&nbsp;&nbsp;这种问题通常的做法是把Session存到一个公共的地方，让每个Web服务，都去这个公共的地方存取Session。而Redis就可以是这个公共的地方。(数据库、memecache等都可以各有优缺点)。

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/%E5%AF%B9%E8%B1%A1%E7%AF%87/%E5%AD%97%E7%AC%A6%E4%B8%B2/Redis%20Session%E5%85%B1%E4%BA%AB.png)

#### 4. 二进制存储

&nbsp;&nbsp;&nbsp;&nbsp;由于Redis字符串可以存储二进制数据的特性，因此也可以用来存储一些二进制数据。如图片、 音频、 视频等。


### 参考

《Redis设计与实现》

《Redis开发与运维》

《Redis官方文档》

### -----END-----

