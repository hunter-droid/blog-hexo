---

title: SETEX(setex)
copyright: true
date: 2020-04-02 12:51:02
categories: 
- Redis命令大全
- String
keywords: Redis命令,setex
aside: string

---
## SETEX key seconds value 
>起始版本：2.0.0<br/>时间复杂度：O(1)  


#### 说明:
* 设置key对应字符串value，并且设置key在给定的seconds时间之后超时过期。这个命令等效于执行下面的命令：

  ```c
  SET mykey value
  EXPIRE mykey seconds
  ```

* SETEX是原子的，也可以通过把上面两个命令放到[MULTI](http://www.redis.cn/commands/multi.html)/[EXEC](http://www.redis.cn/commands/exec.html)块中执行的方式重现。相比连续执行上面两个命令，它更快，因为当Redis当做缓存使用时，这个操作更加常用。

#### 返回值

**simple-string-reply**


#### 示例

```c
redis> SETEX mykey 10 "Hello"
OK
redis> TTL mykey
(integer) 10
redis> GET mykey
"Hello"
redis> 
```