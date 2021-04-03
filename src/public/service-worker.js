/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/2018/jenkins/NET实现持续集成与自动化部署1-Jenkins/index.html","2cb5cae6554cbaebeb0cca4300449d64"],["/2018/jenkins/NET实现持续集成与自动化部署2-NuGet/index.html","ceb5abfbaf612c508fd2d7970b649b79"],["/2018/jenkins/NET实现持续集成与自动化部署3-测试环境到生产环境策略/index.html","6d8a2a40a6b79bdd126cebe7d24883ce"],["/2018/log/NET下日志系统的搭建—log4net-kafka-elk/index.html","78c053218725660e5f7eee00e98af9c7"],["/2018/log/NET日志记录-log4net/index.html","b58a24e4809b2d2a3c15f2f843947559"],["/2018/技术实践/rabbitmq/RabbitMQ的使用基础篇/index.html","eaaeda2c97c1986621543cd26fa0bc38"],["/2018/技术实践/rabbitmq/RabbitMQ的使用思考篇/index.html","0c9e520560daa88b62d4f5f38747dcef"],["/2018/技术实践/rabbitmq/RabbitMQ的使用进阶篇/index.html","95d31289cfed920e12dbe888f926fe48"],["/2018/技术实践/redis/Redis数据结构——字典/index.html","0249a9f495e4298793f2060301662802"],["/2018/技术实践/redis/Redis数据结构——简单动态字符串SDS/index.html","52421e30854cd4ad18c107e598a7614c"],["/2018/技术实践/redis/Redis数据结构——链表/index.html","fa016379ba776d7d6176a2f76c4a09c5"],["/2018/效能管理/团队方法论/软件-敏捷-开发中工作量工时评估方法/index.html","6ce9e99044b44e5ab9ca4c527f9b616d"],["/2019/技术实践/redis/Redis对象——Redis对象系统简介/index.html","83089f97d2618049d539b14de52cabdf"],["/2019/技术实践/redis/Redis对象——字符串(String)/index.html","732628835e4494329a8bfbf9c30101bc"],["/2019/技术实践/redis/Redis数据结构——压缩列表/index.html","2bcc53720eefe1ce6a0b9bca4cb14c1a"],["/2019/技术实践/redis/Redis数据结构——整数集合/index.html","c218b762008e9ad3eca0daf81213461a"],["/2019/技术实践/redis/Redi数据结构——跳跃表/index.html","f7d34fb83d9fffd81046a0a52779bc98"],["/2020/notes/大型网站技术架构/大型网站架构(一)大型网站的特点/index.html","3cd683e0b0ef733966596e7d4bb7ed1c"],["/2020/notes/大型网站技术架构/大型网站架构(三)大型网站的演化下/index.html","956ce46a60bc08e911f63209a4a71e16"],["/2020/notes/大型网站技术架构/大型网站架构(二)大型网站的演化上/index.html","98b347f6629a7ec55e26976c940e3101"],["/2020/notes/大型网站技术架构/大型网站架构(四)大型网站的模式/index.html","d6ebd360109ec2f57b87e6b74cef378d"],["/2020/redis_command/bitmap/bitcount/index.html","bbd058d8fa05ff5f711f4ceb32ca9019"],["/2020/redis_command/bitmap/bitfield/index.html","4f55b4dd6c159d42eb8d3c6f16b51f14"],["/2020/redis_command/bitmap/bitop/index.html","7a7fafdcb106fa68e09f3143b68fb517"],["/2020/redis_command/bitmap/bitpos/index.html","cce85b7e60c8dd62b90bf7d836329aad"],["/2020/redis_command/bitmap/getbit/index.html","6323fcf59fb54e902f147ecf54a52344"],["/2020/redis_command/bitmap/setbit/index.html","0d55a289a64aff962dc0632a2b501697"],["/2020/redis_command/hash/hdel/index.html","cf1ed25e926c2961caa93784c3b69f4d"],["/2020/redis_command/hash/hexists/index.html","7bb8236e15c08d537f915368d84fe85d"],["/2020/redis_command/hash/hget/index.html","1d73e881ecdcbd18e60284a115b037fa"],["/2020/redis_command/hash/hgetall/index.html","df9554364e76055746fa49d86c571e86"],["/2020/redis_command/hash/hincrby/index.html","3b7febeac93c9c311132bc2197311508"],["/2020/redis_command/hash/hincrbyfloat/index.html","e71c117fc93c151aa99cb9dbb06a01c6"],["/2020/redis_command/hash/hkeys/index.html","f6ca53b8b158183194528b158dce306f"],["/2020/redis_command/hash/hlen/index.html","a5824c2d5c204f51d4a99e1a9c8c67ac"],["/2020/redis_command/hash/hmget/index.html","cab3db4521a8fb077a0fb7c383921cb4"],["/2020/redis_command/hash/hmset/index.html","b5f856b0565aff53248bff39ef06907d"],["/2020/redis_command/hash/hscan/index.html","22892f8b35af90e132dae2e80399774f"],["/2020/redis_command/hash/hset/index.html","5630c23b552099de2764a54520bd5977"],["/2020/redis_command/hash/hsetnx/index.html","0021b597ddd7d1197b03b8cfca3f94f0"],["/2020/redis_command/hash/hstrlen/index.html","c9a1b03d34b12475d9a80fa030e8f76e"],["/2020/redis_command/hash/hvals/index.html","5db87f4eed52e748b88eca099d6312f9"],["/2020/redis_command/list/blpop/index.html","e0c3ebd0ba480f8c8bd174b8a842245d"],["/2020/redis_command/list/brpop/index.html","9219ddf2e52129a0d7d790157728c75d"],["/2020/redis_command/list/brpoplpush/index.html","71b1b297d6f4c6164a1e92770cfe9413"],["/2020/redis_command/list/lindex/index.html","2861c0125c16d24decb3c850bd104cf1"],["/2020/redis_command/list/linsert/index.html","52e87894b5fbfb9e5a3eb6374b3c57cb"],["/2020/redis_command/list/llen/index.html","ffb0e05c67ff08cccd8e0d8729d246af"],["/2020/redis_command/list/lpop/index.html","c8c51a9977def59c602cdd38cf1972b5"],["/2020/redis_command/list/lpush/index.html","3e1b718360976149410e131082cfb5e6"],["/2020/redis_command/list/lpushx/index.html","80547fa9154316d476675444e5fd79da"],["/2020/redis_command/list/lrange/index.html","bde2ca62b451cd902b0bb0a241a74dd0"],["/2020/redis_command/list/lrem/index.html","3a09d16488df0d2937406228e45b935e"],["/2020/redis_command/list/lset/index.html","cd76d56f8ca1ff7ad32c04e4cc6fe582"],["/2020/redis_command/list/ltrim/index.html","c6a4c14b163954e94b56358ac0896bcc"],["/2020/redis_command/list/rpop/index.html","35de5240fee446d6493336fa77d61ea0"],["/2020/redis_command/list/rpoplpush/index.html","0b352974f42a8f514aedd1358a7c43fd"],["/2020/redis_command/list/rpush/index.html","e034dd91d9a05d93bf0a66a8001ca262"],["/2020/redis_command/list/rpushx/index.html","f8e43434a61a13bf1a7ab6fc8d7cc566"],["/2020/redis_command/set/sadd/index.html","67e437d544838536120de7e8505c7775"],["/2020/redis_command/set/scard/index.html","a9b6afaa1d83159c0dc5af9497a2be4b"],["/2020/redis_command/set/sdiff/index.html","40547812a167f077a311ab4551d411e9"],["/2020/redis_command/set/sdiffstore/index.html","9794dbb4430d1e0118589627172e879b"],["/2020/redis_command/set/sinter/index.html","96f96f69d81ee9ab59761841e7fb7c1b"],["/2020/redis_command/set/sinterstore/index.html","53c1a2cf526fb90cc782a6fe3603d6bf"],["/2020/redis_command/set/sismember/index.html","1a482c3b2599e04e39139afd417aa77e"],["/2020/redis_command/set/smembers/index.html","2b33bc1ff7723a562ddb549ec8a1e9e1"],["/2020/redis_command/set/smove/index.html","f1156b171b756e19b9fa140f9e6431b1"],["/2020/redis_command/set/spop/index.html","1a95e861e9bee16465a326fa5ff6ae23"],["/2020/redis_command/set/srandmember/index.html","a846294a8ffba2a5607231defd51bf3a"],["/2020/redis_command/set/srem/index.html","e29c0011e9748af493fcc4965bb46df3"],["/2020/redis_command/set/sscan/index.html","2605de5e01d35e83a2e16ed8149dd8c0"],["/2020/redis_command/set/sunion/index.html","9e5630b5be3c07ce1ee0e7852dbc089e"],["/2020/redis_command/set/sunionstore/index.html","9feb65e158e6418f43ca9a6ea7a981da"],["/2020/redis_command/sorted_set/bzpopmax/index.html","251f623f50168e13a9a34b5afa8db0eb"],["/2020/redis_command/sorted_set/bzpopmin/index.html","afaffd6b27ae642514d8de2b06e50b0c"],["/2020/redis_command/sorted_set/zadd/index.html","8c085dd02808514cabf136cebd40c08f"],["/2020/redis_command/sorted_set/zcard/index.html","29588e4b838b21964a20b69a790b9259"],["/2020/redis_command/sorted_set/zcount/index.html","a82c50237dffae3a1fbaeedd3a6bef91"],["/2020/redis_command/sorted_set/zincrby/index.html","6b7cd76052ad2267caadb71dc24e5b97"],["/2020/redis_command/sorted_set/zinterstore/index.html","5b3cb36d3f213f8be387c594a0a5efa0"],["/2020/redis_command/sorted_set/zlexcount/index.html","bde8a07b8c9f559217fa460a5c0828f3"],["/2020/redis_command/sorted_set/zpopmax/index.html","3a4cade31d2d8112457f1d2c31560b6c"],["/2020/redis_command/sorted_set/zpopmin/index.html","9b4bbdec304e54c35bcfee69df03353c"],["/2020/redis_command/sorted_set/zrange/index.html","32b6477f7babf7cb30d88f5ce96fb027"],["/2020/redis_command/sorted_set/zrangebylex/index.html","8cb2324db8753d5ae6e9f505445f5cb0"],["/2020/redis_command/sorted_set/zrangebyscore/index.html","85094b2a64b652b0acd5899c0948003b"],["/2020/redis_command/sorted_set/zrank/index.html","00886c50162378b039adcffd192d5af6"],["/2020/redis_command/sorted_set/zrem/index.html","8322b87d02ac80b250dc35abe7af02cb"],["/2020/redis_command/sorted_set/zremrangebylex/index.html","3342ef7d87d025436bc3c64122e4464b"],["/2020/redis_command/sorted_set/zremrangebyrank/index.html","c5952616fb6fefdaf314da20a624ef29"],["/2020/redis_command/sorted_set/zremrangebyscore/index.html","0f270add6c2719876ecfcb98eb833b90"],["/2020/redis_command/sorted_set/zrevrange/index.html","c42287db07c85a082b9a3bbfb4c0ceea"],["/2020/redis_command/sorted_set/zrevrangebylex/index.html","a084b7dbbe85205209f5376c9c4ed99f"],["/2020/redis_command/sorted_set/zrevrangebyscore/index.html","800d0ce18323ae9db30f30e0897a052f"],["/2020/redis_command/sorted_set/zrevrank/index.html","70fa33c9768447cbafbef52145f7f7ac"],["/2020/redis_command/sorted_set/zscan/index.html","8a905a573a0df509ba3698f597e0b739"],["/2020/redis_command/sorted_set/zscore/index.html","b8f3727f6509492f974dbe1eaec044cb"],["/2020/redis_command/sorted_set/zunionstore/index.html","a9860ffae7de7f26ec1886c2dafa3234"],["/2020/redis_command/string/append/index.html","9ae76b650fe5a504fd826d64ab129b48"],["/2020/redis_command/string/decr/index.html","a2037a21e58cf2294fcf2734b86f5d99"],["/2020/redis_command/string/decrby/index.html","45a1b8fda04208c505d036384337fa34"],["/2020/redis_command/string/get/index.html","b570d6c48758f5f3f3c138eb47d85aa5"],["/2020/redis_command/string/getrange/index.html","80ecfe25fcc5cb8a87ace0784a983419"],["/2020/redis_command/string/getset/index.html","799a7a4a1cd39a47d739dde1e460049d"],["/2020/redis_command/string/incr/index.html","c2e076d808cf7b6f469be85dcfdd18cf"],["/2020/redis_command/string/incrby/index.html","2ac4bfa09a709f6b627c8bd65e047028"],["/2020/redis_command/string/incrbyfloat/index.html","d7defba2bbb96eb83d1f1cacc8155348"],["/2020/redis_command/string/mget/index.html","1c06b2cfbde78dfccda6862a6491f5c6"],["/2020/redis_command/string/mset/index.html","de07424921207fdedc6bc3cf3acac710"],["/2020/redis_command/string/msetnx/index.html","dfd6e55645baf3baf74ce714c0d52685"],["/2020/redis_command/string/psetex/index.html","f6f3b71bbdd92eb8d68bd47d81aba7e4"],["/2020/redis_command/string/set/index.html","0013dac604d9f4ab99b8a38b9bc16080"],["/2020/redis_command/string/setex/index.html","fe9a3716b4d5e57bf5a1c0092d7c1858"],["/2020/redis_command/string/setnx/index.html","fd3968be325df7e71cfd09fadab8b7ea"],["/2020/redis_command/string/setrange/index.html","ee319e76a9fdff88b84266204ac75076"],["/2020/redis_command/string/strlen/index.html","13de6ff95171acbb6bcb3c646cf771c0"],["/2020/技术实践/redis/Redis对象——列表(List)/index.html","9c750ed82321df61685c26d4dca2be31"],["/2020/技术实践/redis/Redis对象——哈希(Hash)/index.html","bef21ea86522ec6e81c1b1cee32281b4"],["/2020/技术实践/redis/Redis对象——有序集合(ZSet)/index.html","2b149fe7f426170075e5561302d4a8e3"],["/2020/技术实践/redis/Redis对象——集合(Set)/index.html","f5b05a650b25de4c15d791edda6891a0"],["/2020/技术实践/redis/Redis数据结构——quicklist/index.html","fedf8b4060c29a7c2a45ccec44f94314"],["/2020/技术实践/redis/一文回顾Reids五大对象(数据类型)/index.html","c7b45e084232ae13b2c637fc65f588a5"],["/2020/技术实践/spring-boot/Spring Boot(一) Hello World/index.html","722ebae04ff6cffae6f2a9f42e87fab2"],["/2020/技术实践/spring-boot/Spring Boot(三) 使用Lombok/index.html","8fb1fbbfa89d0fc4524298994f69e2c1"],["/2020/技术实践/spring-boot/Spring Boot(二) 读取配置文件/index.html","8445a65b157e57f9d93beca76d26d842"],["/2020/技术实践/spring-boot/Spring Boot(四) Mybatis-MySql/index.html","32280ef189ef8a53ff673f437b6b462c"],["/2020/技术实践/代码的艺术/理解RESTful API/index.html","af7c7e16f0012049b2bb928a38513992"],["/2020/效能管理/团队方法论/两种Web开发中常用的分层架构及其代码模型/index.html","a20d654f5d53dd498fdcde177d670bb0"],["/2021/技术实践/redis/Redis持久化——AOF日志/index.html","c02ac728eb191d61b9b55011e293beb1"],["/2021/技术实践/redis/Redis持久化——内存快照(RDB)/index.html","d90515ee4da2f80e0967723225b8838b"],["/2021/技术实践/redis/Redis持久化——如何选择合适的持久化方式/index.html","fb760fe90e4ca38e501915a29d448898"],["/2021/技术实践/代码的艺术/恪尽职守，行分内之事——高质量代码/index.html","e220401873ca1e01c3bc7e4ed5beda00"],["/2021/技术实践/代码的艺术/设计原则_单一职责(SRP)/index.html","c740d45685796f13b6ed79092b2768e5"],["/2021/技术实践/单元测试/伪对象、桩对象、模拟对象/index.html","f1c40bec77c8c93e8d6edff12bf22048"],["/2021/技术实践/单元测试/单元测试基础/index.html","650533db8165fd82f62fa85b51811773"],["/2021/技术实践/单元测试/如何提高代码的可测试性/index.html","09485c9764509d6dae7a6c9827344d73"],["/2021/技术实践/单元测试/如何编写优秀的测试代码/index.html","aeedba2e61406912c6089bd2a5141b11"],["/2021/效能管理/团队方法论/2020年工作上的最大收获——监控告警体系/index.html","3f64075fe990560f9fd0b1a32104088e"],["/2021/效能管理/团队方法论/蓝绿红黑灰常用的发布方式/index.html","615704ffb5e21ba8bc964455316b8f70"],["/about/index.html","01759289138083047963743972ebe463"],["/archives/2018/07/index.html","05df5f056a9af774d8610a93e6dbf010"],["/archives/2018/11/index.html","7b768c0e266b00de0eb5e79bf9ce817b"],["/archives/2018/index.html","e6e24bfa7a104f89f3dae54e3db9c07b"],["/archives/2019/07/index.html","a6e1c56b7a6f8c328bf26f37f86c4079"],["/archives/2019/08/index.html","10e2d27a2fe0002081ced5ddc197a440"],["/archives/2019/11/index.html","2eab0093457f1df4edc179de553af32f"],["/archives/2019/12/index.html","cb08d9740de50c38e278adac5db080df"],["/archives/2019/index.html","b1b97566c5d335949f5101c5d33ab4a8"],["/archives/2020/03/index.html","4d37a330274659829b6f9f5f94e6852e"],["/archives/2020/03/page/2/index.html","268e6400b5cd267b80322a1824318d75"],["/archives/2020/03/page/3/index.html","edf65e495e5b2aee99f2574998afc456"],["/archives/2020/03/page/4/index.html","a10567e32becfbec2d0579ed4737a4be"],["/archives/2020/03/page/5/index.html","886b7260a691af0a4ad89b06a18a4c2c"],["/archives/2020/04/index.html","1141c91993bbb2cbd14ab0c0a3e32972"],["/archives/2020/04/page/2/index.html","11a25813a07483ee64b94600f7583654"],["/archives/2020/05/index.html","63042c2e6f9cc7797b22a1e7cbd455ca"],["/archives/2020/index.html","2aaa7164e470dc69ecfd98239b15b71d"],["/archives/2020/page/2/index.html","0fb070223a8fe4b81a32b29a9df1a4df"],["/archives/2020/page/3/index.html","59cba6f12cce0d2649689ebc78f30449"],["/archives/2020/page/4/index.html","895293dab466eec69bc6784490fe9925"],["/archives/2020/page/5/index.html","622ef4ea040d710a6ae071b63181b740"],["/archives/2020/page/6/index.html","d1e46f8de2ae5081f68c2a64e7e47e7c"],["/archives/2021/01/index.html","d086592bdbd6b4e14d96f9ae51d4cc21"],["/archives/2021/02/index.html","a6569d9ffc30162c92aac65bf2b9186a"],["/archives/2021/03/index.html","cb578a7bd943b7b54d78ae9fd8737a0a"],["/archives/2021/04/index.html","5aab315db069f3873ab2cb5b215c2ed1"],["/archives/2021/index.html","97ca5f11a5549e60d8f56dc90a8b5b74"],["/archives/index.html","bb09241a485727b8a0d21dbb866206ac"],["/archives/page/2/index.html","95f0ebbe9e287a886a14eb5f3f65337c"],["/archives/page/3/index.html","76d00afebb59e6ac974d237d4ece97ce"],["/archives/page/4/index.html","4cf30fbb6d228096b170ffd1d43be4d3"],["/archives/page/5/index.html","b7bcba1094767cc1bd9c3e6a95d30b61"],["/archives/page/6/index.html","a1eab31b0b70d9563f7376874d3f176c"],["/archives/page/7/index.html","22b9f06083ebc7a058d0693c43c555bb"],["/atom.xml","7f9170c3de9f16ea5ad02d3ad779aac8"],["/baidu_verify_Us10aoTC4p.html","b9649415016428bd94e40c0f5812da5c"],["/baidu_verify_XBpkZYVjlD.html","4fe4b4f05f6c28607842bded61c0dc21"],["/baidusitemap.xml","998c09880d69dc49b9d3015394e18f7f"],["/categories/Redis/index.html","ceb6d000ec2a81980424cdb838981931"],["/categories/Redis命令大全/Bitmap/index.html","5424792aa21bf3f62c47907de18170c1"],["/categories/Redis命令大全/Hash/index.html","f4f4f1058ed5d1d76e39c8ac19a692ad"],["/categories/Redis命令大全/List/index.html","c6fd2f0c08f50a6943d543e52a1b66ed"],["/categories/Redis命令大全/Set/index.html","5f3a6c3d8d0ddc7b79b1258b5eb37f06"],["/categories/Redis命令大全/String/index.html","1bb8164c897205ca0120441d4f416fa8"],["/categories/Redis命令大全/ZSet/index.html","e1e7aac90970c39ab41837b4ae1c872c"],["/categories/Redis命令大全/ZSet/page/2/index.html","24814032f064c67c18f8fb4c7306b20d"],["/categories/Redis命令大全/index.html","44d8f5cd05e60a1a1f0ced5cf046f45e"],["/categories/Redis命令大全/page/2/index.html","450bc9180bb3f711eece60534a36bb52"],["/categories/Redis命令大全/page/3/index.html","5a8df0954bd892a1d66f7a09c38fcbf0"],["/categories/Redis命令大全/page/4/index.html","6a1fee0841114fda060914d09d41f8ac"],["/categories/Redis命令大全/page/5/index.html","40a6e1f36314cc4b96a43c16280c5f2c"],["/categories/Spring-Boot/index.html","553337bbcb798b51bab33146801951f9"],["/categories/index.html","ea28c76bada5666d5e6cf6f279dcfdee"],["/categories/代码的艺术/index.html","e99a7c1b9677701ccf8747fbdfacf5d2"],["/categories/分层架构/index.html","23cacddb4b8d9e81f817afce59a9687a"],["/categories/单元测试/index.html","349f3bad43329d90c11073376c4ca144"],["/categories/团队方法论/index.html","69fbe294b3e6da26529c82676069a0fb"],["/categories/团队方法论/发布方式/index.html","da692adbad1870993caca4922cbec048"],["/categories/团队方法论/监控告警体系/index.html","2d3a7adf6627157e60f5d498b263d457"],["/categories/持续集成-Jenkins-自动化发布/index.html","63a2e171307d1b8c54bdb21ec2c3706f"],["/categories/日志/index.html","c44190c3eebab086226a423fd7bc122f"],["/categories/消息队列/index.html","26955f05c2392bad3d9488286cede1ae"],["/categories/读书笔记/index.html","f071af023ba84e28b97525532352b31f"],["/categories/读书笔记/大型网站技术架构/index.html","489c0f9ed785794c61a975a6049eda95"],["/categories/项目管理/index.html","fb086a4a7df861ddee03c83912d602e3"],["/css/blog-encrypt.css","ee21c7086a59d52b97a9e7b6240a9414"],["/css/main.css","e44cf6a55bd89837225cdb83a17af66f"],["/fonts/fonts.css","ec48ec71b9aa9b422467416c99ec8613"],["/fonts/原始.css","3589cea34c8dcf1e9eb8252b4ce4de93"],["/google9015e32577ccc55d.html","1a66d1b1d4799371384d638b79afd614"],["/images/algolia_logo.svg","fd40b88ac5370a5353a50b8175c1f367"],["/images/alipay.jpg","a11d12532900ee6a4b1945fce08fa362"],["/images/apple-touch-icon-next.jpg","92fa7f2b36c27f37d8e30656154ba16e"],["/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/images/avatar.gif","2bed513bc5f13733cf9a8a12c4e1a971"],["/images/avatar.jpg","c3a9c609717a39977ab41c7f66699ee5"],["/images/cc-by-nc-nd.svg","1c681acc4a150e7236254c464bb5a797"],["/images/cc-by-nc-sa.svg","12b4b29e8453be5b7828b524d3feabce"],["/images/cc-by-nc.svg","dd9cfe99ed839a4a548114f988d653f4"],["/images/cc-by-nd.svg","2d80546af20128215dc1e23ef42d06c2"],["/images/cc-by-sa.svg","c696b3db81cbbfba32f66c1dc88b909a"],["/images/cc-by.svg","6c4f8422b3725cb9f26b6c00e95fc88b"],["/images/cc-zero.svg","79deee77a07fcb79ff680ac0125eacb9"],["/images/favicon-16x16-next.jpg","4be1237f01612081c79718d013dd18d6"],["/images/favicon-16x16-next.png","4be1237f01612081c79718d013dd18d6"],["/images/favicon-192x192.png","2da8fcbe03268a75d4f35fd0ae35de50"],["/images/favicon-32x32-next.jpg","f1fa6997cdcd5d13d6506d4711a775d8"],["/images/favicon-32x32-next.png","f1fa6997cdcd5d13d6506d4711a775d8"],["/images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/logo.svg","ddad9027e42111ccd5b466bc18188970"],["/images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/quote-l.svg","1238a4baccd02c6025ec85b58f4282d4"],["/images/quote-r.svg","85787c6fa27965c81f7be70252b43bed"],["/images/searchicon.png","3d6b5c9d6d6c26a2b76a14b8fdf3438a"],["/images/wechatpay.png","0d9bd06eb6d98913e097482a1dfdd8f2"],["/index.html","7800a56dfb1b77d02724d38457ac954b"],["/js/src/affix.js","f117a3586e463c75c61fde98e5c71770"],["/js/src/algolia-search.js","62d7d2b452944aad3f1253836d36bba4"],["/js/src/bootstrap.js","a2cfd6b2cecb9f6fadd47a8ad3c4a8c4"],["/js/src/exturl.js","ffb4519829fbd408d2666ddfad5fa8cc"],["/js/src/js.cookie.js","6e9eb1f53afb135aedaf90739c867738"],["/js/src/motion.js","4ea1fa65f7956f939e55965bb813688f"],["/js/src/post-details.js","4b105aaa8b2a64283d31b80304a1673d"],["/js/src/schemes/pisces.js","5c7c0c99f5f2eed8d74ed6318091419e"],["/js/src/scroll-cookie.js","3f0a99d7b74dd63bc2382eb28c4de003"],["/js/src/scrollspy.js","a319bd0a0a374a2d2cd239c1eb1c16c2"],["/js/src/utils.js","1038efd68f455a85479c6e5b507eb66c"],["/lib/Han/dist/han.css","cfcc552e7aebaef5e2f34aee030b956b"],["/lib/Han/dist/han.js","575b6c1667c01798730fbd972e959c9c"],["/lib/Han/dist/han.min.css","cab466d758269b437167422c4a16b364"],["/lib/Han/dist/han.min.js","96482c9c2b3c5ea9bf5a40db162c7f34"],["/lib/algolia-instant-search/instantsearch.min.css","029a13b44e6807955106ff3c075a02f9"],["/lib/algolia-instant-search/instantsearch.min.js","0db46eba0c8133693ee839507b1612f2"],["/lib/blog-encrypt.js","f1c932790ec55934e04634fd752a3d8e"],["/lib/canvas-nest/canvas-nest.min.js","36e103d2a05bc706bac40f9ab8881eb7"],["/lib/canvas-ribbon/canvas-ribbon.js","16dc214240913551986593808c2efcfc"],["/lib/fancybox/source/blank.gif","325472601571f31e1bf00674c368d335"],["/lib/fancybox/source/fancybox_loading.gif","328cc0f6c78211485058d460e80f4fa8"],["/lib/fancybox/source/fancybox_loading@2x.gif","f92938639fa894a0e8ded1c3368abe98"],["/lib/fancybox/source/fancybox_overlay.png","77aeaa52715b898b73c74d68c630330e"],["/lib/fancybox/source/fancybox_sprite.png","783d4031fe50c3d83c960911e1fbc705"],["/lib/fancybox/source/fancybox_sprite@2x.png","ed9970ce22242421e66ff150aa97fe5f"],["/lib/fancybox/source/helpers/fancybox_buttons.png","b448080f8615e664b7788c7003803b59"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.css","cac75538c2e3ddfadef839feaca8e356"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.js","f53c246661fb995a3f12e67fa38e0fa0"],["/lib/fancybox/source/helpers/jquery.fancybox-media.js","c017067f48d97ec4a077ccdf056e6a2e"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.css","52ddd84a9f42c1d4cd86d518a7f7e8bc"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.js","cf1fc1df534eede4cb460c5cbd71aba6"],["/lib/fancybox/source/jquery.fancybox.css","6c55951ce1e3115711f63f99b7501f3a"],["/lib/fancybox/source/jquery.fancybox.js","921e9cb04ad6e2559869ec845c5be39b"],["/lib/fancybox/source/jquery.fancybox.pack.js","cc9e759f24ba773aeef8a131889d3728"],["/lib/fastclick/README.html","850b3ed1dec8a5b76173c517dd5b5a62"],["/lib/fastclick/bower.json","50ebebf43ccc629c814281e60fd049f0"],["/lib/fastclick/lib/fastclick.js","6e9d3b0da74f2a4a7042b494cdaa7c2e"],["/lib/fastclick/lib/fastclick.min.js","a0fc6c24d1f3ff9ac281887c92b24acd"],["/lib/font-awesome/bower.json","188dd1a7583ffab4da32757242993f36"],["/lib/font-awesome/css/font-awesome.css","c495654869785bc3df60216616814ad1"],["/lib/font-awesome/css/font-awesome.min.css","269550530cc127b6aa5a35925a7de6ce"],["/lib/font-awesome/fonts/fontawesome-webfont.svg","912ec66d7572ff821749319396470bde"],["/lib/jquery/index.js","32015dd42e9582a80a84736f5d9a44d7"],["/lib/jquery_lazyload/CONTRIBUTING.html","2bb91f504aff31896f37ba49a9471870"],["/lib/jquery_lazyload/README.html","9d9505357b111d988a9a73c39d6a048b"],["/lib/jquery_lazyload/bower.json","5f8449c87f33671904615bb63d8283cf"],["/lib/jquery_lazyload/jquery.lazyload.js","8b427f9e86864ee3aaf1ae33e6e14263"],["/lib/jquery_lazyload/jquery.scrollstop.js","f163fd8f02361928853668a96f8a1249"],["/lib/needsharebutton/font-embedded.css","dd8861d10d1ed6b5e0c0011adfb39be9"],["/lib/needsharebutton/needsharebutton.css","30f2f800e13f7b6b83629a4cbd9749ef"],["/lib/needsharebutton/needsharebutton.js","6c6f855f7d50f4bc3c804f52b03bbfbb"],["/lib/pace/pace-theme-barber-shop.min.css","e8dc66cf2d88abc25fbc89b8a0529abb"],["/lib/pace/pace-theme-big-counter.min.css","db2b8fe31e60f19021545277d2f6e05e"],["/lib/pace/pace-theme-bounce.min.css","ad954aa0bace4b213eeb19d6e89a0bda"],["/lib/pace/pace-theme-center-atom.min.css","8f6bc803acefc6f93afc98fb38201456"],["/lib/pace/pace-theme-center-circle.min.css","93c72298781226a80a9c66b27b21a57d"],["/lib/pace/pace-theme-center-radar.min.css","f0099bdd1cd42e9476bd7abc417c0328"],["/lib/pace/pace-theme-center-simple.min.css","eddff4756dbf21dbbff1c543bd894dde"],["/lib/pace/pace-theme-corner-indicator.min.css","776826157cb28ac1ee5e78771292b9ba"],["/lib/pace/pace-theme-fill-left.min.css","965859b39001da08e1e92327fe3d8e12"],["/lib/pace/pace-theme-flash.min.css","aab39b436e1fa0fdc51df06f2d53c38a"],["/lib/pace/pace-theme-loading-bar.min.css","4e05877f1f9efb9c1e7dd75cb78c764f"],["/lib/pace/pace-theme-mac-osx.min.css","29ae030ceaa8158352c5472218375b91"],["/lib/pace/pace-theme-minimal.min.css","f48f04d370993b55a2745e548cc82743"],["/lib/pace/pace.min.js","24d2d5e3e331c4efa3cda1e1851b31a7"],["/lib/three/canvas_lines.min.js","1324174ae6190fbf63b7bf0ad0a8a5bd"],["/lib/three/canvas_sphere.min.js","5c6bc45b137448b5b9df152ccfb2659c"],["/lib/three/three-waves.min.js","41059bd5e5c7aa520b1b411919e5121f"],["/lib/three/three.min.js","3298078bce82bdb1afadf5b1a280915e"],["/lib/ua-parser-js/dist/ua-parser.min.js","a6e833266c4b41fabb9ba94a145322d8"],["/lib/ua-parser-js/dist/ua-parser.pack.js","6b627e4d61a7135952824bb9c1a4a134"],["/lib/velocity/bower.json","76d1e61a2f857128f671328183bcc9aa"],["/lib/velocity/velocity.js","0361fa6dcf4cf4d19c593cdab0937dd0"],["/lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["/lib/velocity/velocity.ui.js","f55d22cc592c9f8d4ffd3b41a6b90081"],["/lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["/manifest.json","5907de04501d516daeab497862a4b973"],["/page/10/index.html","f88d8e38a4267e7b6dea5114e04c2cfb"],["/page/11/index.html","dd489000e10054b387b38e07feceb729"],["/page/12/index.html","e0919100208d75d98d12ede028fcee08"],["/page/13/index.html","fbd2bca25c4adfc672be4f4be2b86c61"],["/page/14/index.html","141dadb695ab7c254846153bec3571a7"],["/page/2/index.html","bbbbe36185f45db0df71884a802bc384"],["/page/3/index.html","6697cda74aec33ac228d469c68932a70"],["/page/4/index.html","5d34cb0b40288d9d331798421d796467"],["/page/5/index.html","036557a76082147ee1f1f4f548b16db9"],["/page/6/index.html","857644a085aeab05a00c446ee88d9156"],["/page/7/index.html","3f0c826b49186417fde60bf1f76a5dbe"],["/page/8/index.html","9a5929565ce4be4f2b910c06f9d5060e"],["/page/9/index.html","d128cd49914ffa8797457ee5239f75aa"],["/sitemap.xml","7218662070550d5179de0f69ca1765d5"],["/sw.js","5bcd11dce4dcc42909b3218f4135bbb9"],["/tags/Jenkins/index.html","78ed3be91032452b4c1fe1536a322b03"],["/tags/NuGet/index.html","a35b3b9f74528466e785d4c73530ec63"],["/tags/RESTful/index.html","a1dac2a4603b2de4cd3422075c06d89f"],["/tags/RabbitMQ/index.html","359e31effac654cc713994897065f7c7"],["/tags/Redis/index.html","a149bfe9762fce85caab5ef0914e8670"],["/tags/elk/index.html","7f08cfa750279297e43fdd1f885d36be"],["/tags/index.html","5cf1bc243490094ddf53370ac660b16c"],["/tags/kafka/index.html","6764226b4f970cf6f34bc8a75ec135d4"],["/tags/log4net/index.html","4d3b7d6a05e59da24d8494faf2005b0d"],["/tags/代码的艺术/index.html","10981d7be0d2261dad12aae3610e2312"],["/tags/分层架构、DDD/index.html","e079b2bcb9b266f9208675a628b65df8"],["/tags/单元测试/index.html","ffc87798ccba4ff8891581e38791a034"],["/tags/团队方法论/index.html","1d4f8ec9768cf184c559c5122c6b5c8f"],["/tags/大型网站技术架构/index.html","9c241439657c7b29abc236231a422750"],["/tags/工时评估/index.html","33c02b54a66aba4f9d8bb10b8aafe7a9"],["/tags/持续集成/index.html","d9503e86d243c3c63492f30ff5747458"],["/tags/敏捷开发/index.html","861d9d6687368674105773b54875bc43"],["/tags/散列表/index.html","f0c008329cb578ca9c710aa2a0d3b0df"],["/tags/数据结构/index.html","43d5926bea687298d76364d748f7def8"],["/tags/日志/index.html","8c95c2107cd8c9b810905bbb5e9d5726"],["/tags/消息队列/index.html","e8039160a5123b1d2aab1e4483433263"],["/tags/监控告警体系/index.html","ee52de27a87c25a12c4e037d216ebc98"],["/tags/自动化发布/index.html","20f4128b13fef4affec97bdd6597c776"],["/tags/设计原则/index.html","3c6712d42fe46e3def1dc9235f0d53f8"],["/tags/读书笔记/index.html","2d12c1f6c1e5493975e71f436f46a592"],["/tags/项目管理/index.html","48ccbedf42be3045df59c8e6a423ab0e"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get("/*", toolbox.cacheFirst, {"origin":"cdn.example.com"});
toolbox.router.get("/*", toolbox.cacheFirst, {"origin":"cdn.another-example.org"});




