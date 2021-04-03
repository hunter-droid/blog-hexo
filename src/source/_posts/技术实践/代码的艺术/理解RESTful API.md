---
title: 理解RESTful API
copyright: true
date: 2020-04-14 11:29:26
tags: 
- 代码的艺术
- RESTful
categories: 代码的艺术
keywords: RESTful API
---

近日妹子向我求助RESTful API到底是个什么东西。原因是她们公司一个新启动的项目因为RESTful API起了争执。服务端同学坚持要用RESTful API，而前端同学则认为服务端用RESTful API就会让前端的调用变得更麻烦。最终争议了一下午还是不了了之。有趣的是他们组的大部分人都不太了解REST是个什么东西。

<!--more-->

实际上一些抽象的东西是不如一些具体的技术好讲解的，就像你给新人讲面向对象一样，这东西得靠时间，靠悟。我之前做过开放平台API的项目。对于RESTful API还算有些了解。万幸没有丢人，口干舌燥之后总算讲明白一些。但这东西真正理解还得多悟、多思考、多练习。当然，如果你有更好的理解，可在评论区与我留言分享！我会第一时间反馈！

### 一、REST

REST，即Representational State Transfer的缩写，翻译过来就是"表现层状态转化"。不得不承认，我在刚开始看到这个名词的时候是一脸懵逼。好了，现在我们放弃对这个名词的理解。

实际上，REST只是一种软件架构风格。注意了，它并不是一种具体的技术。而更像是一种约束与规范性的东西，它包含了很多原则与限制。而如果一个架构符合REST的原则，就可以称它为RESTful架构。

#### 1.1 资源

在REST中最重要的一个概念就是**资源**。在面向对象的世界里，我们提倡万物皆对象，而在REST的世界里则是万物皆资源。**所谓"资源"，就是网络上的一个实体，或者说是网络上的一个具体信息。**它可以是一段文本、一张图片、一首歌曲、一种服务，总之就是一个具体的存在。

#### 1.2 表现层

"资源"是一种信息实体，它可以有多种外在表现形式。**我们把"资源"具体呈现出来的形式，叫做它的"表现层"**

比如，文本可以用txt格式表现，也可以用HTML格式、XML格式、JSON格式表现，甚至可以采用二进制格式；图片可以用JPG格式表现，也可以用PNG格式表现。

#### 1.3 状态转化

访问一个网站，就代表了客户端和服务器的一个互动过程。在这个过程中，势必涉及到数据和状态的变化。

当下的互联网通信协议HTTP协议，是一个无状态协议。这意味着，所有的状态都保存在服务器端。因此，**如果客户端想要操作服务器，必须通过某种手段，让服务器端发生"状态转化"（State Transfer）。而这种转化是建立在表现层之上的，所以就是"表现层状态转化"。**

在HTTP协议里面，就可以使用HTTP动词来对服务器端资源进行操作，实现“表现层状态转化”。如：GET、POST、PUT、DELETE。它们分别对应四种基本操作：GET用来获取资源，POST用来新建资源（也可以用于更新资源），PUT用来更新资源，DELETE用来删除资源。

以网站中常见的用户CRUD操作为例：

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/REST/RESTful%20API.png)

现在，我们再回过头来理解REST(表现层状态转化)——REST是一种通过**表现层**来操作改变**资源**的**状态**的软件架构**风格**。

### 二、RESTful API

RESTful API 就是REST风格的API。它**使用URI来描述资源，使用Html、Json、XML等格式表现，通过HTTP动词来操作资源来实现状态转化，使用HTTP状态码反映处理结果**。

#### 2.1 URI

URI通常由三部分组成：

1. 访问资源的命名机制；

2. 存放资源的主机名；

3. 资源自身的名称。

例如:https://localhost/post/1 (对应URLhttps://localhost/post/1.html)

我们可以这样解释它：

1. 这是一个可以通过https协议访问的资源，

2. 位于主机 localhost上，

3. 通过“post/1”可以对该资源进行唯一标识（注意，这个不一定是完整的路径）

注意：以上三点只不过是对实例的解释，以上三点并不是URI的必要条件，URI只是一种概念，怎样实现无所谓，只要它唯一标识一个资源就可以了。URI只代表资源的实体，不代表它的形式。严格地说，如上面网址最后的".html"后缀名是不必要的，因为这个后缀名表示格式，属于"表现层"范畴，而URI应该只代表"资源"的位置。

#### 2.2 HTTP动词

常用的HTTP动词有下面这些

 - GET：从服务器取出资源（一项或多项）。——幂等
 - POST：在服务器新建一个资源。——非幂等
 - PUT：在服务器更新资源（客户端提供改变后的完整资源）。——幂等
 - PATCH：在服务器更新资源（客户端提供改变的属性）。——幂等
 - DELETE：从服务器删除资源。——幂等

- HEAD：获取资源的元数据。
- OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的。

#### 2.3 HTTP状态码

HTTP协议本身就给我们提供了丰富的状态码，以用来反映服务器端处理的结果。而在真正使用中绝大对数人仅仅了解会使用200,404,500之流。这就好比36板斧，你始终是会那三板斧。而RESTful Api规范的HTTP状态码的使用，使HTTP协议的优点发挥到了极致。

例如:

* 200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
* 201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
* 202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
* 204 NO CONTENT - [DELETE]：用户删除数据成功。
* 406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
* 410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
* 422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
* 500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。

注意:当状态码是4或5开头的时候就应该像用户返回错误信息。一般来说，返回的信息中将error作为键名，出错信息作为键值即可。

```
{
    error: "Invalid API key"
}
```

如下表是常用的HTTP状态码和描述

| CODE | HTTP Operation            | Body Contents  | Decription                         |
| ---- | ------------------------- | -------------- | ---------------------------------- |
| 200  | GET,PUT                   | 资源           | 操作成功                           |
| 201  | POST                      | 资源,元数据    | 对象创建成功                       |
| 202  | POST,PUT,DELETE,PATCH     | N/A            | 请求已被接受                       |
| 204  | DELETE,PUT,PATCH          | N/A            | 操作已经执行成功，但是没有返回结果 |
| 301  | GET                       | link           | 资源已被移除                       |
| 303  | GET                       | link           | 重定向                             |
| 304  | GET                       | N/A            | 资源没有被修改                     |
| 400  | GET,POST,PUT,DELETE,PATCH | 错误提示(消息) | 参数列表错误(缺少，格式不匹配)     |
| 401  | GET,POST,PUT,DELETE,PATCH | 错误提示(消息) | 未授权                             |
| 403  | GET,POST,PUT,DELETE,PATCH | 错误提示(消息) | 访问受限，授权过期                 |
| 404  | GET,POST,PUT,DELETE,PATCH | 错误提示(消息) | 资源，服务未找到                   |
| 405  | GET,POST,PUT,DELETE,PATCH | 错误提示(消息) | 不允许的HTTP方法                   |
| 409  | GET,POST,PUT,DELETE,PATCH | 错误提示(消息) | 资源冲突，或资源被锁定             |
| 415  | GET,POST,PUT,DELETE,PATCH | 错误提示(消息) | 不支持的数据(媒体)类型             |
| 429  | GET,POST,PUT,DELETE,PATCH | 错误提示(消息) | 请求过多被限制                     |
| 500  | GET,POST,PUT,DELETE,PATCH | 错误提示(消息) | 系统内部错误                       |
| 501  | GET,POST,PUT,DELETE,PATCH | 错误提示(消息) | 接口未实现                         |

#### 2.4.示例

我们以Web网站中常用的用户增删查改为例。设计普通的API接口完成增删查改大致如下:

```
//添加用户
http://localhost/createuser
//删除id为1的用户
http://localhost/deleteuser?userid=1
//获取用户列表
http://localhost/getuser
//获取id为1的用户
http://localhost/getuser?userid=1
//更新id为1的用户
http://localhost/updateuser?userid=1
```

我们通过调用上面不同的url传递响应的参数来完成用户的增删查改。

而使用RESTful 风格的api该如何完成呢？

在这个例子中很明显，用户就是我们的资源，使用uri来描述资源就是

```
http://localhost/user
```

表现层可以是Json也可以是xml或者其它。

我们使用HTTP的动词来操作用户这个资源。

* 使用GET的方式请求`http://localhost/user`代表查询用户列表
* 使用GET的方式请求`http://localhost/user/1`代表查询id为1的用户
* 使用POST的方式请求`http://localhost/user`代表创建一个用户
* 使用PUT的方式请求`http://localhost/user/1`代表修改id为1的用户
* 使用DELETE的方式请求`http://localhost/user/1`代表删除id为1的用户。

可以看到这种风格看起来要更为优雅与简洁，面向资源，一目了然，具有自解释性，充分的发挥了HTTP协议的优点。

#### 2.5 设计上的难点和误区

##### 2.5.1 URI 包含动词

因为"资源"表示一种实体，所以应该是名词，URI不应该有动词，动词应该放在HTTP协议中。

举例来说，某个URI是/posts/show/1，其中show是动词，这个URI就设计错了，正确的写法应该是/posts/1，然后用GET方法表示show。

如果某些动作是HTTP动词表示不了的，你就应该把动作做成一种资源。比如网上汇款，从账户1向账户2汇款500元，错误的URI是：

```
POST /accounts/1/transfer/500/to/2
```

正确的写法是把动词transfer改成名词transaction，资源不能是动词，但是可以是一种服务：
```
POST /transaction HTTP/1.1
Host: 127.0.0.1
 　　
from=1&to=2&amount=500.00
```
##### 2.5.2 URI中加入版本号

**另一个设计误区，就是在URI中加入版本号**：
```
http://localhost/app/1.0/foo

http://localhost/app/1.1/foo

http://localhost/app/2.0/foo
```
因为不同的版本，可以理解成同一种资源的不同表现形式，所以应该采用同一个URI。版本号可以在HTTP请求头信息的Accept字段中进行区分（参见[Versioning REST Services](http://www.informit.com/articles/article.aspx?p=1566460)）：
```
Accept: localhost.foo+json; version=1.0

Accept: localhost.foo+json; version=1.1

Accept: localhostfoo+json; version=2.0
```
##### 2.5.3 面向资源≠面向单表操作

注意,面向资源不等于面向单表操作。不知道为什么很多人会把资源对应到数据库里的单张表。其实他们没有任何关系。资源可以是一个文件，可以是缓存里的数据，也可以是数据库里多张表聚合的结果。比如用户这个资源。通常我们设计数据库的时候出于性能或范式的考虑用户的信息不会放在一张表里。但是在API设计的时候用户就是一个资源，这个资源的数据有可能来自一张表也有可能是多张表，甚至缓存。

##### 2.5.4 复杂与特殊的场景如何设计

跟万物皆对象一样，使用「万物皆资源」的思想设计实际项目中的API时，经常会遇到一个问题就是「这玩意到底是个什么资源？………………算了，我就直接写吧，不管什么风格了」 

- 比如，登录(login)和登出(logout)应该怎么REST化？ 
- 比如，多条件复合搜索条件太多在GET里写不下怎么办？ 
- 比如，批量资源的操作id躲到URL都写不下，难道要写几千个UPDATE或DELETE？  

其实在真正理解了REST后，这些都不是什么无解的难题，如果无解，那只能说明你还没真正理解，抽象成资源的能力还不到家： 

- 登录(login)和登出(logout)其实本质上只是对session资源的创建和删除； 

  ```
  //登录——使用HTTP POST请求
  POST /localhost/session
  //登出——使用HTTP DELETE请求
  DELETE /localhost/session
  ```

- 我们可以把search本身抽象成资源，使用POST创建，如果不需持久化，可以直接在Response中返回结果，如果需要（如翻页、长期缓存等），直接保存搜索结果并303跳转到资源地址就行了；

   ```
  //HTTP POST创建资源search
  POST /localhost/search
  ```

- 批量操作id多到连url都写不下的请求，应该创建task，用GET返回task状态甚至执行进度；

  ```
  //HTTP POST创建Task 
  POST /localhost/task
  
  //HTTP GET获取TASK执行结果
  GET /localhost/task
  ```

#### 2.6 优缺点与适用场景

任何一门技术或者思想都有其优缺点，虽然其诞生的初衷都是为了解决我们的问题，而不是带来更大的灾难。REST同样如此。它的优点很明显，优雅、规范，行为和资源分离，更容易理解。

但是也有其缺点，它面向资源，这种设计思路是反程序员直觉的，因为在本地业务代码中仍然是一个个的函数，是动作，但表现在接口形式上则完全是资源的形式，对于后端开发人员要求高，有些业务逻辑难以被抽象为资源的增删改查。甚至有些时候RESTful其实是个效率很低的东西，为了实现一个资源，你需要定义它的一套方式，如果要联合查询又会要求对其衍生或定义一个新的资源。它提供的接口一般是“粗”粒度的，它通常返回的都是完整的数据模型，难以查询符合特殊要求的数据，有些特殊的业务要比普通的API需要更多次HTTP请求。

REST面对的疑问跟当年刚开始流行面向对象时的情况是一样的。它适合很多情况，但并不适合所有情况。它更适合与一些开放平台API，如新浪微博、GitHub、京东、淘宝开放平台等，开放API之所以开放，就是因为它不知道你到底需要什么返回结果，既然不知道，那么我干脆都返回给你，有客户端自由组合成自己想要的数据。而对于内部开发，有其局限性，内部开发由于需求非常明确，有些时候出于性能或灵活性的考虑，服务端简单粗暴的丢出来完整的数据模型由客户端自己处理显然是不合适的。

对于一些内部的开发，适合用RESTful API的我们仍然可以用，对于一些不合适的，我们仍然可以借鉴一些RESTFul中的优点，来设计我们的API。比如简洁的URI(每个人看到一坨超长的API地址，内心都是拒绝的)，充分利用HTTP状态码等。

### 最后

RESTful API是REST风格的API，它是一种API设计风格，规范了API设计中的一些原则。它让我们的API更加优雅、规范。但也尤其缺点，在实际使用过程中我们应该充分的取理解它，综合考量其使用场景。

如果大家想要取学习并使用它，建议可以参考[Github开放API](https://developer.github.com/v3/) 或者[Elasticsearch API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs.html),看一看他们是如何设计的API，对于自己项目中的每一个场景多思考，去网上一些开源RESTful API找一找有没有相同场景的例子。

很多人会盲目追新，又对REST的概念和理念一知半解，最后搞出一个半吊子的怪胎，不仅没有设计出优雅规范的API，甚至还引起了更大的麻烦，最后还自我标榜用了流行的RESTful API。

其实REST规范最终还是为了开发者和软件产品服务的，如果它能带来便利、减少混乱，就值得用；反之，如果带来的麻烦比解决的还多，跟风追流行就不可取了。其它任何技术也是如此！









