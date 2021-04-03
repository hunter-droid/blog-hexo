---

title: BITFIELD(bitfield)
copyright: true
date: 2020-03-19 20:02:19
categories: 
- Redis命令大全
- Bitmap
keywords: Redis命令,bitfield
aside: bitmap
---
## BITFIELD key 
**BITFIELD key [GET type offset] [SET type offset value] [INCRBY type offset increment] [OVERFLOW WRAP|SAT|FAIL] **

>起始版本：3.2.0<br/>时间复杂度：O(1)  对于指定的每个子命令


#### 说明:
* 本命令会把Redis字符串当作位数组，并能对变长位宽和任意未字节对齐的指定整型位域进行寻址。在实践中，可以使用该命令对一个有符号的5位整型数的1234位设置指定值，也可以对一个31位无符号整型数的4567位进行取值。类似地，在对指定的整数进行自增和自减操作，本命令可以提供有保证的、可配置的上溢和下溢处理操作。
* BITFIELD命令能操作多字节位域，它会执行一系列操作，并返回一个响应数组，在参数列表中每个响应数组匹配相应的操作。
例如，下面的命令是对一个8位有符号整数偏移100位自增1，并获取4位无符号整数的值：
```
> BITFIELD mykey INCRBY i5 100 1 GET u4 0
1) (integer) 1
2) (integer) 0
```
**提示：**
* 用GET指令对超出当前字符串长度的位（含key不存在的情况）进行寻址，执行操作的结果会对缺失部分的位（bits）赋值为0。
* 用SET或INCRBY指令对超出当前字符串长度的位（含key不存在的情况）进行寻址，将会扩展字符串并对扩展部分进行补0，扩展方式包括：按需扩展、按最小长度扩展和按最大寻址能力扩展。

#### 支持子命令和整型
下面是已支持的命令列表：
* `GET <type> <offset>` – 返回指定的位域
* `SET <type> <offset> <value>` – 设置指定位域的值并返回它的原值
* `INCRBY <type> <offset> <increment>` – 自增或自减（如果increment为负数）指定位域的值并返回它的新值
还有一个命令通过设置溢出行为来改变调用INCRBY指令的后序操作：
`OVERFLOW [WRAP|SAT|FAIL]`
* 当需要一个整型时，有符号整型需在位数前加i，无符号在位数前加u。例如，u8是一个8位的无符号整型，i16是一个16位的有符号整型。
* 有符号整型最大支持64位，而无符号整型最大支持63位。对无符号整型的限制，是由于当前Redis协议不能在响应消息中返回64位无符号整数。
#### 位和位偏移
bitfield命令有两种方式来指定位偏移。如果未定带数字的前缀，将会以字符串的第0位作为起始位。
不过，如果偏移量带有#前缀，那么指定的偏移量需要乘以整型宽度，例如：
`BITFIELD mystring SET i8 #0 100 i8 #1 200`

将会在第1个i8整数的偏移0位和第2个整数的偏移8位进行设值。如果想得到一个给定长度的普通整型数组，则不一定要在客户端进行计算。

#### 溢出控制

使用`OVERFLOW`命令，用户可以通过指定下列其中一种行为来调整自增或自减操作溢出（或下溢）后的行为：

- **WRAP**: 回环算法，适用于有符号和无符号整型两种类型。对于无符号整型，回环计数将对整型最大值进行取模操作（C语言的标准行为）。对于有符号整型，上溢从最负的负数开始取数，下溢则从最大的正数开始取数，例如，如果i8整型的值设为127，自加1后的值变为-128。
- **SAT**: 饱和算法，下溢之后设为最小的整型值，上溢之后设为最大的整数值。例如，i8整型的值从120开始加10后，结果是127，继续增加，结果还是保持为127。下溢也是同理，但量结果值将会保持在最负的负数值。
- **FAIL**: 失败算法，这种模式下，在检测到上溢或下溢时，不做任何操作。相应的返回值会设为NULL，并返回给调用者。

注意每种溢出（`OVERFLOW`）控制方法，仅影响紧跟在`INCRBY`命令后的子命令，直到重新指定溢出（`OVERFLOW`）控制方法。

如果没有指定溢出控制方法，默认情况下，将使用**WRAP**算法。
```
> BITFIELD mykey incrby u2 100 1 OVERFLOW SAT incrby u2 102 1
1) (integer) 1
2) (integer) 1
> BITFIELD mykey incrby u2 100 1 OVERFLOW SAT incrby u2 102 1
1) (integer) 2
2) (integer) 2
> BITFIELD mykey incrby u2 100 1 OVERFLOW SAT incrby u2 102 1
1) (integer) 3
2) (integer) 3
> BITFIELD mykey incrby u2 100 1 OVERFLOW SAT incrby u2 102 1
1) (integer) 0
2) (integer) 3
```
#### 返回值
本命令返回一个针对子命令给定位置的处理结果组成的数组。OVERFLOW子命令在响应消息中，不会统计结果的条数。
下面是OVERFLOW FAIL返回NULL的样例：
```
> BITFIELD mykey OVERFLOW FAIL incrby u2 102 1
1) (nil)
```

#### 动机（Motivations）
本命令的动机是为了能够在单个大位图（large bitmap）中高效地存储多个小整数（或对键分成多个key，避免出现超大键），同时开放Redis提供的新使用案例，尤其是在实时分析领域。这种使用案例可以通过指定的溢出控制方法来支持。

#### 性能考虑（Performance considerations）
通常，BITFIELD是一个非常快的命令，但是注意，对短字符串的远地址（fat bits）寻址，将会比在存在的位执行命令更加耗时。

#### 字节序（Orders of bits）
BITFIELD命令使用的位图表现形式，可看作是从0位开始的，例如：把一个5位的无符号整数23，对一个所有位事先置0的位图，从第7位开始赋值，其结果如下所示：
```
+--------+--------+
|00000001|01110000|
+--------+--------+
```
当偏移量和整型大小是字节边界对齐时，此时与大端模式（big endian）相同，但是，当字节边界未对齐时，那么理解字节序将变得非常重要。

