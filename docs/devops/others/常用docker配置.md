# 常用docker配置

## 1. 青龙面板

>  主要是用来跑京东

### 1.1 compose脚本

```yaml
version: '2'
services:
  web:
    # alpine 基础镜像版本
    image: whyour/qinglong:latest
    # debian-slim 基础镜像版本
    # image: whyour/qinglong:debian  
    volumes:
      - ./data:/ql/data
    ports:
      - "0.0.0.0:5700:5700"
    environment:
      # 部署路径非必须，以斜杠开头和结尾，比如 /test/
      QlBaseUrl: '/'
    restart: unless-stopped
```



### 1.2 新增订阅

docker启动后需要自己手动订阅镜像库, 设置定时拉取时间;

常用的仓库为: `https://git.metauniverse-cn.com/https://github.com/shufflewzc/faker2.git`

可以参考的订阅面板设置如下

![image-20230707155536243](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20230707155536243.png)

其中定时拉取时间为: 每周的星期三的早上 6 点（即 06:00）执行定时任务.

添加完成后, 手动执行一次, 然后去定时任务菜单检查是否成功拉取.



### 1.3 增加环境变量JD_COOKIE

![image-20230707155825344](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20230707155825344.png)

京东cookie可以通过在手机上下载`Alook` 浏览器获取, 主要使用里面的`pt_key` 和 `pt_pin` 两个属性.

添加完成后, 在`定时任务` 列表随便找一个任务执行, 查看是否能正常执行.



### 1.4 添加执行依赖

因为定时任务依赖许多库, 如`python` 库, `nodejs` 库, `linux` 库, 所以需要自己手动添加上去, 页面如下

![image-20230707160257476](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20230707160257476.png)

一种方式是手动添加, 还有一种是官网上的方法, 地址为: `https://github.com/FlechazoPh/QLDependency`

**Node依赖**

```
crypto-js
prettytable
dotenv
jsdom
date-fns
tough-cookie
tslib
ws@7.4.3
ts-md5
jsdom -g
jieba
fs
form-data
json5
global-agent
png-js
@types/node
require
typescript
js-base64
axios
moment
ds
```

**Python依赖**

```
requests
canvas  
ping3
jieba
aiohttp
```

**linux依赖**

```
bizCode
bizMsg  
lxml
```



## 2. 可道云

>个人/企业云存储方案, 可以作为云端备份使用, 类似的有cloudreve和seafile



### 2.1 compose脚本

```yaml
version: "3.5"

services:
  db:
    image: mariadb
    command: --transaction-isolation=READ-COMMITTED --binlog-format=ROW
    volumes:
      - "./db:/var/lib/mysql"
    environment:
      - "TZ=Asia/Shanghai"
      - "MYSQL_DATABASE_FILE=/run/secrets/mysql_db"
      - "MYSQL_USER_FILE=/run/secrets/mysql_user"
      - "MYSQL_PASSWORD_FILE=/run/secrets/mysql_user_password"
      - "MYSQL_ROOT_PASSWORD_FILE=/run/secrets/mysql_root_password"
    restart: always
    secrets:
      - mysql_db
      - mysql_user
      - mysql_user_password
      - mysql_root_password

  app:
    image: kodcloud/kodbox:latest
    ports:
      - 8081:80
    links:
      - db
      - redis
    volumes:
      - "../../mystore/kod_box:/var/www/html"
    environment:
      - "MYSQL_SERVER=db"
      - "MYSQL_DATABASE_FILE=/run/secrets/mysql_db"
      - "MYSQL_USER_FILE=/run/secrets/mysql_user"
      - "MYSQL_PASSWORD_FILE=/run/secrets/mysql_user_password"
      - "CACHE_HOST=redis"
#      - "PUID=1050"
#      - "PGID=1051"
    restart: always
    secrets:
      - mysql_db
      - mysql_user
      - mysql_user_password

  redis:
    image: redis:alpine3.17
    environment:
      - "TZ=Asia/Shanghai"
    restart: always

secrets:
  mysql_db:
    file: "./sql-config/mysql_db.txt"
  mysql_user:
    file: "./sql-config/mysql_user.txt"
  mysql_user_password:
    file: "./sql-config/mysql_user_password.txt"
  mysql_root_password:
    file: "./sql-config/mysql_root_password.txt"
```

除了上述脚本, 还需要在当前文件夹内新增`sql-config` 文件夹, 里面添加一些`mysql` 的配置



### 2.2 挂载宿主机资源

由于我自己想要的是一个操作一致的网盘, 即我上传上去是什么样的文件组织, 那么在真实宿主机上查看文件夹的时候也是什么样的文件组织.

目前上传文件后, 在可道云的面板上是有组织的, 但是在宿主机上查看的时候文件组织就乱了, 不支持上传后文件组织映射到宿主机上相应的地址(这里可能是做文件管理的时候有缓存, 使用了sql的原因).

为了实现这个功能, 我使用了曲线道路

#### 2.2.1 可道云设置

- 首先在宿主机打开默认挂载的文件夹, 在下面新建一个文件夹`copy-store` (该文件夹虽然不是在可道云上创建的, 但是也能在上面看到)
- 新增一个本地挂载, 挂载刚才新增的`copy-store` 目录, 同时在该目录下搭建自己的目录结构
- 在可道云上将上一步自己新建的文件夹进行收藏, 便于后续查看

![image-20230707165408575](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20230707165408575.png)

#### 2.2.2 客户端设置

- 可道云

客户端(安卓, ios)可以下载可道云, 然后使用客户端的**自动备份**功能

在备份选项中选择所需要上传的文件夹, 即可将自己的招照片视频等上传到在宿主机上可以访问的文件夹里, 进而实现上述目的.

- es文件浏览器

这里依然也是使用app的备份功能, 但是这个app备份功能更强大, 可以把自己手机的文件夹自动整理出来供你选择, 不用你自己去一个个查(安卓手机可以去酷安上下载破解版)



### 2.3 其他使用设置

当docker成功启动后, 通过相应ip访问面板即可进入配置页面, 默认一路选下去就行.

- webdav

![image-20230707163217470](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20230707163217470.png)

打开webdav开关即可, 连接地址为: `http://{ip地址}:{端口}/index.php/dav/`

- 内网穿透

该功能是`1.41.04` 版本之后通过官方插件实现的, 打开该插件后会在可道云的主域名下为用户分配一个二级域名, 每月有免费流量可以使用, 超过后想要继续使用需要联系客服.

![image-20230707163639427](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20230707163639427.png)

