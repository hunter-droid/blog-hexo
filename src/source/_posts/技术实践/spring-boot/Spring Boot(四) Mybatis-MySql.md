---
title: Spring Boot(四) Mybatis-MySql
copyright: true
date: 2020-03-20 18:23:18
categories: 
- Spring Boot
keywords: Spring Boot
aside: SpringBoot
---
### 0.准备数据库表

<!--more-->

```mysql

-- ----------------------------
-- Table structure for person
-- ----------------------------
DROP TABLE IF EXISTS `person`;
CREATE TABLE `person` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` char(255) DEFAULT NULL,
  `remark` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of person
-- ----------------------------
INSERT INTO `person` VALUES ('1', '法师', '25', '男', null);
INSERT INTO `person` VALUES ('2', '锤子', '28', '男', null);
INSERT INTO `person` VALUES ('3', '土豆', '18', '女', null);
INSERT INTO `person` VALUES ('4', '甜心', '19', '女', null);
```

### 一.pom.xml文件添加maven依赖

```xml
 	    <!--mybatis-->
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
        </dependency>
        <!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.17</version>
        </dependency>
        <!--集成druid，使用连接池-->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.1.0</version>
        </dependency>
    
```

注意：[druid](https://druid.apache.org/)是阿里巴巴开源平台上一个数据库连接池实现，它结合了C3P0、DBCP、PROXOOL等DB池的优点，同时加入了日志监控，可以很好的监控DB池连接和SQL的执行情况，可以说是针对监控而生的DB连接池，据说是“目前最好的连接池”。

### 二.修改配置文件`application.properties`

```java
server.port=9997
# 数据库连接配置
spring.datasource.name=spring-boot-mybatis-mysql
spring.datasource.url=jdbc:mysql://47.105.66.132:3307/demo
spring.datasource.username=root
spring.datasource.password=xingying
# mybatis 配置
mybatis.mapper-locations=classpath:mapping/*.xml
mybatis.type-aliases-package=spring.boot.mybatis.mysql.model
# 使用druid数据源
spring.datasource.type=com.alibaba.druid.pool.DruidDataSource
spring.datasource.driver-class-name=com.mysql.jdbc.Driver

```

### 三.MyBatis配置

1. 在resources目录下面新建2个目录：generator和mapping，用于存放mybatis的配置文件和映射文件

2. 在包`spring.boot.mybatis.mysql`下新建包mapper和model，用于存放mybatis生成的代码

3. 在generator目录下，新建文件generatorConfig.xml，代码如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
<generatorConfiguration>
    <!-- 数据库驱动:选择你的本地硬盘上面的数据库驱动包-->
    <classPathEntry  location="D:\Software\apache-maven-3.6.0-bin\repository\mysql\mysql-connector-java\8.0.17\mysql-connector-java-8.0.17.jar"/>
    <context id="DB2Tables"  targetRuntime="MyBatis3">
        <commentGenerator>
            <property name="suppressDate" value="true"/>
            <!-- 是否去除自动生成的注释 true：是 ： false:否 -->
            <property name="suppressAllComments" value="true"/>
        </commentGenerator>
        <!--数据库链接URL，用户名、密码 -->
        <jdbcConnection driverClass="com.mysql.jdbc.Driver" connectionURL="jdbc:mysql://127.0.0.1:3306/demo" userId="root" password="xingying">
        </jdbcConnection>
        <javaTypeResolver>
            <property name="forceBigDecimals" value="false"/>
        </javaTypeResolver>
        <!-- 生成模型的包名和位置-->
        <javaModelGenerator targetPackage="spring.boot.mybatis.mysql.model" targetProject="src/main/java">
            <property name="enableSubPackages" value="true"/>
            <property name="trimStrings" value="true"/>
        </javaModelGenerator>
        <!-- 生成映射文件的包名和位置-->
        <sqlMapGenerator targetPackage="mapping" targetProject="src/main/resources">
            <property name="enableSubPackages" value="true"/>
        </sqlMapGenerator>
        <!-- 生成DAO的包名和位置-->
        <javaClientGenerator type="XMLMAPPER" targetPackage="spring.boot.mybatis.mysql.mapper" targetProject="src/main/java">
            <property name="enableSubPackages" value="true"/>
        </javaClientGenerator>
        <!-- 要生成的表 tableName是数据库中的表名或视图名 domainObjectName是实体类名-->
        <table tableName="person" domainObjectName="Person" enableCountByExample="false" enableUpdateByExample="false" enableDeleteByExample="false" enableSelectByExample="false" selectByExampleQueryId="false"></table>
    </context>
</generatorConfiguration>修改pom添加mybatis的maven插件
```

```xml
  <!-- mybatis generator 自动生成代码插件 -->
            <plugin>
                <groupId>org.mybatis.generator</groupId>
                <artifactId>mybatis-generator-maven-plugin</artifactId>
                <version>1.3.2</version>
                <configuration>
                    <configurationFile>                        				  	 ${basedir}/src/main/resources/generator/generatorConfig.xml
                    </configurationFile>
                    <overwrite>true</overwrite>
                    <verbose>true</verbose>
                </configuration>
            </plugin>
```

4. 添加并导入包后打开View->Tool Windows->Maven Projects可看到如下插件

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/spring-boot/Spring%20Boot%28%E5%9B%9B%29%20Mybatis-MySql/1.png)

5. 双击运行，运行完后项目目录将会自动生成如下几个文件：

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/spring-boot/Spring%20Boot%28%E5%9B%9B%29%20Mybatis-MySql/2.png)

6. 打开`PersonMapper.xml`就是Mybatis的映射文件，里面的内容其实就是Sql。

   **注意：使用这个插件的时候,生成的的映射文件可能会有多个ResultMap，导致启动的时候会报错**

   `Result Maps collection already contains value for...`

   这是因为数据库中可能有多个schema中都有同样名字的一张表。这个时候简单的办法就是打开这个文件删除掉多余的配置即可。

   打开`PersonMapper`

```java
//自动生成的没有下面这个注解，如果在依赖注入的时候报错，记得加上这个注解
//@Component
public interface PersonMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Person record);

    int insertSelective(Person record);

    Person selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Person record);

    int updateByPrimaryKey(Person record);
}
```

7. 添加我们的service和controller

```java
/*
Service 接口
 */
public interface IPerson {
    int deleteByPrimaryKey(Integer id);

    int insert(Person record);

    int insertSelective(Person record);

    Person selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Person record);

    int updateByPrimaryKey(Person record);
}

/*
Person Service
 */
@Service
public class PersonImpl implements IPerson {

    /*
    注入 personMapper
     */
    @Autowired
    private PersonMapper personMapper;

    @Override
    public int deleteByPrimaryKey(Integer id) {
        return personMapper.deleteByPrimaryKey(id);
    }

    @Override
    public int insert(Person record) {
        return personMapper.insert(record);
    }

    @Override
    public int insertSelective(Person record) {
        return personMapper.insertSelective(record);
    }

    @Override
    public Person selectByPrimaryKey(Integer id) {
        return personMapper.selectByPrimaryKey(id);
    }

    @Override
    public int updateByPrimaryKeySelective(Person record) {
        return personMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(Person record) {
        return personMapper.updateByPrimaryKey(record);
    }
}

@RestController
@RequestMapping("/person")
public class PersonController {

    @Autowired
    public IPerson person;

    @RequestMapping(method = RequestMethod.GET)
    public Person get(@RequestParam Integer id) {
        return person.selectByPrimaryKey(id);
    }
}
```

注意：如果personMapper下方红线报错，是因为PersonMapper没有配置依赖注入扫描注解，可在类上方增加`@Component`注解。当然也可以修改idea的错误提示，降低Autowired检测的级别，将Severity的级别由之前的error改成warning或其它可以忽略的级别。

8. 启动类新增注解`@MapperScan("spring.boot.mybatis.mysql.mapper")`

9. 测试运行

![](https://hunter-image.oss-cn-beijing.aliyuncs.com/spring-boot/Spring%20Boot%28%E5%9B%9B%29%20Mybatis-MySql/3.png)

### 四、更优雅的方式

&nbsp;&nbsp;&nbsp;&nbsp;通过上面的过程，可以发现又出现了一系列的配置文件，如果我们想更优雅一点的编码，Mybatis为此也提供了，不需要配置文件的方式。注意，是更优雅一些不是更好一些，至于哪种方式更好要结合实际。

只需要在`PersonMapper`接口的方法上添加相应的SQL注解即可

```java
package spring.boot.mybatis.mysql.annotate.mapper;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;
import spring.boot.mybatis.mysql.annotate.model.Person;

@Component
public interface PersonMapper {

    @Delete("DELETE FROM person WHERE id =#{id}")
    int deleteByPrimaryKey(Integer id);

    @Insert("INSERT INTO person(name,age,gender,remark) VALUES(#{name}, #{age}, #{gender},#{remark})")
    int insert(Person record);

    @Select("SELECT * FROM person WHERE id = #{id}")
    @Results({
            @Result(property = "id",  column = "id"),
            @Result(property = "name", column = "name"),
            @Result(property = "age", column = "age"),
            @Result(property = "gender", column = "gender"),
            @Result(property = "remark", column = "remark")
    })
    Person selectByPrimaryKey(Integer id);

    @Update("UPDATE person SET name=#{name},age=#{age} WHERE id =#{id}")
    int updateByPrimaryKey(Person record);
}

```

- @Select 是查询类的注解，所有的查询均使用这个
- @Result 修饰返回的结果集，关联实体类属性和数据库字段一一对应，如果实体类属性和数据库属性名保持一致，就不需要这个属性来修饰。
- @Insert 插入数据库使用，直接传入实体类会自动解析属性到对应的值
- @Update 负责修改，也可以直接传入对象
- @delete 负责删除

想要了解更多特性，可以参考[Mybatis官网](https://mybatis.org/mybatis-3/zh/java-api.html)

### 五、踩坑记

1. Service中注入personMapper报错

   PersonMapper类上加注解`@Component`

2. 启动的时候报错

   `Result Maps collection already contains value for...`

   这是因为数据库中可能有多个schema中都有同样名字的一张表。这个时候简单的办法就是打开这个文件删除掉多余的配置即可。



**[示例代码](https://github.com/hunter-droid/spring-boot-examples)**