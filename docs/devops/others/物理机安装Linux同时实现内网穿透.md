# 物理机安装Linux同时实现内网穿透

去年换工作(2021)后, 由于一直对前公司的mac系统念念不忘, 所以自己在网上买了一个小主机, 搭建了一个黑苹果玩了玩, 后面因为新公司有笔记本电脑, 然后因为小主机确实不方便实用, 所以自己也买了新电脑, 这个主机就空置在这里了.

最近想着该电脑放着也是放着, 而正好现在自己搞了一个项目, 需要部署很占用内存的gitlab, 所以就想着先将其做成一个服务器, 在上面跑一些自己的服务利用起来, 后面有自己房子了再说搭建软路由的事情.

> 本文内容参考UP主: **[零夏的天空 ]( https://space.bilibili.com/326987957)** 视频实战整理而成
>
> 其他参考资料
>
> https://blog.csdn.net/klo220/article/details/114251913
>
> https://learnku.com/articles/39879
>
> https://lxnchan.cn/cf-tunnel.html
>
> https://www.modb.pro/db/523813



## 1. 安装Centos

1. 下载系统

镜像可以去网上搜索, 阿里云的和清华镜像都可以, 我自己尝试如果使用5G热点(4G套餐)下载清华镜像可以达到恐怖的32M/s的速度. 以`CentOS-7-x86_64-DVD-2207-02` 为例, 我下载下来只用了两分钟

- 清华源
  - https://mirrors.tuna.tsinghua.edu.cn/centos/7/isos/x86_64/
- 阿里云源
  - https://mirrors.aliyun.com/centos/7/isos/x86_64/



2. 制作启动盘

许多人推荐32G以上大小U盘, 实测使用16G也能正常安装, 又因为有windows和mac os不同系统, 所以分为两种制作方法

- windows
  - 使用`UrtaISO`软件进行操作, 这里的详细操作可以直接搜索, GUI式操作
  
- mac os (使用命令行进行操作)
  - 首先使用`diskutil list`命令查看分区, 确定自己的U盘是哪个, 如`/dev/disk4`
  
  - 确定后使用命令 `diskutil unmountDisk` 卸载 U 盘的挂载
  
  - 进入到 iso 文件所在的目录，使用命令 `dd` 把 CentOS ISO 写入到 U 盘, 比如我将镜像下载到桌面上, name执行命令就是`/Users/zhangke/Desktop` 和 `sudo dd if=CentOS-7-x86_64-DVD-2207-02.iso of=/dev/rdisk4 bs=2m` . 在左边的命令行里面`if` 和`of` 是输入和输出, `bs` 是块的大小, 和镜像读取速度有关, 但是也不能太大, `/dev/rdisk4` 里面多了一个`r` 是使用了U的原始读取模式, 没有使用缓存, 这样速度会更快
  
    > *写入需要花费几分钟时间，期间可以使用 CTRL + T 来查看写入进度*
  
  - 上面命令执行完后, 使用命令 `diskutil eject` 弹出 U 盘, 进行后续步骤



3. 安装系统

- 根据主板的不同按相应的键进bois系统, 设置使用U盘启动
- 进去U盘启动页面后选择`Centos 7...` 的选项进行安装
- 进入安装页面
  - 设置时间
  - 设置网络
  - 设置安装磁盘
  - 设置安装模式(可以选择桌面模式)
  - 设置完上面步骤后会进入按照流程, 在安装流程中可以设置默认用户和密码
- 安装读条完毕, 拔掉U盘, 主机重启载入系统, 进行后续步骤



## 2. 获取免费域名(非必须)

这里使用了`freenom` 域名商提供的免费域名

![image-20221203214500791](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221203214500791.png)

- 域名购买
  - 检查意向域名有无被占用以及是否可以免费获取, 符合条件就可以点击`Get it now!` 按钮加入购物车进行登录购买(购买过程中需要进行登录和邮箱验证, 购买成功后有一定的延时)

![image-20221203214640228](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221203214640228.png)

- 域名设置

  - 域名购买成功后进入箭头处的域名管理页面进行配置

  ![image-20221203215516544](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221203215516544.png)

  域名列表, 点击箭头处进行配置

  ![image-20221203215649420](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221203215649420.png)

  设置dns(这里是和后续`Cloudflare` 配置使用的, 将域名的dns代理到`Cloudflare` 上)

  ![image-20221203220009190](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221203220009190.png)



## 3. Cloudflare配置

- 注册登录

![image-20221203222638693](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221203222638693.png)



- 配置站点, 将上一步获取的域名添加进来, 选择免费套餐, 然后将下面的服务器地址粘贴到到freenom的域名配置`Nameserver` 上

![image-20221203221314540](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221203221314540.png)

`Cloudflare` 的解析服务器

![image-20221203223123106](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221203223123106.png)





## 4. 内网穿透(web和ssh)

1. 服务端启动一个web服务

启动该服务主要是为了验证后面是否可以在外网正常访问, 启动web服务有两种方式

- 宝塔面板启动
  - 在宝塔官网使用配置命令进行面板安装, 然后在站点处使用PHP新建一个站点, 端口可自行设置
  - 设置站点后使用内网访问, 如果访问成功即部署成功, 可供后面进行内网穿透验证
- 自行搭建
  - 手动安装nginx或者docker启动nginx



2. 服务端安装`Cloudflare` 

- 首先进入root账户，能够获取root权限安装
- 配置yum-utils
  - `yum install yum-utils`

- 添加 `cloudflared.repo` 到 `config-manager`
  - `yum-config-manager --add-repo https://pkg.cloudflare.com/cloudflared-ascii.repo`

- 安装 `cloudflared`
  - `yum install cloudflared`



3. 登录`Cloudflare` 

- 运行命令行登录
  - 运行`cloudflared tunnel login`
- 验证
  - 执行上面命令后会弹出来一个URL，用浏览器打开，登录成功后关闭浏览器，再次打开URL，这时候会出现授权页面，然后选择你想用来做内网穿透的域名授权即可。
  - 成功后会生成证书，放置于`~/cloudflared/cert.pem`中。



4. 建立隧道

- 创建隧道(名字可以随意起)
  - cloudflared tunnel create <隧道名称>
  - 例子：`cloudflared tunnel create test`
  - 成功后会提示，相关凭证已放置于`~/.cloudflared/<Tunnel-UUID>.json`中。

- 验证是否已经创建成功
  - `cloudflared tunnel list` 
  - 该命令行会展示所有本机的隧道



5. 新建 Tunnel 对应的 DNS 记录, 在远端新增解析

> 成功后会创建CNAME记录将域名指向隧道，回到Cloudflare网站，点击域名，点击左边的DNS，能看到出现一条新的CNAME的DNS记录，此时证明解析成功

- 在远端增加dns解析
  - 运行`cloudflared tunnel route dns <隧道名称> <域名>`
  - 例如: `cloudflared tunnel route dns test cloudfreed.tk`



6. 新增配置文件

- 新增配置文件(包括普通web和ssh)
  - 运行`nano ~/.cloudflared/config.yml`
  - 添加下面代码(注意不要填错), 隧道ID是刚才创建的隧道id, 域名就是自己想要解析的域名

```yaml
tunnel: <隧道ID>
credentials-file: /root/.cloudflared/<隧道ID>.json
protocol: http2
originRequest:
 connectTimeout: 30s
 noTLSVerify: false
ingress:
  - hostname: <域名> # 自己购买的域名
    service: http://localhost:85  # 服务端启动web服务的端口
  - hostname: ssh.xxx.xxx # 这里是配置ssh的
    service: ssh://localhost:22
  - service: http_status:404
  
```



- 注意如果是想使用ssh服务, 客户端也需要登录`cloudflare`

在host里面进行相应的配置

```
Host ssh.xxx.xxx
  ProxyCommand /root/cloudflared access ssh --hostname %h
```

ssh登录就可以使用

`ssh root@default.xxx.xxx `密码登录



7. 配置为系统服务且设置自启动

- 注册
  - `cloudflared service install` 注册为系统服务
- 自启动
  - `systemctl enable cloudflared --now`
- 停止与修改配置
  - 如果修改了配置项或者增加了新的解析映射, name就需要停止后重新启动
  - 停止命令为`systemctl stop cloudflared`
  - 重新启动



8. 测试穿透
访问自己在上面配置的域名, 验证是否可以得到正常响应