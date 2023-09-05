# Centos挂载硬盘
今天买了个2T的固态硬盘, 又重新装了下之前的小主机. 本来想搞个软路由爱快系统, 但是搜了下看到可以用docker部署`OpenWrt`, 然后构建网络使用旁路由使用, 所以还是装了Centos.

在根据上一篇`Centos分区合并`合并硬盘后, 小主机里面还有一个机械硬盘, 所以就找方案把机械硬盘也挂载起来了.

## 1. 查看linux下的硬盘：

```bash
df -h
```
看有没有要挂载的硬盘。

## 2. 查看系统检测的硬盘：

```bash
lsblk
```

![image-20230216224851297](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20230216224851297.png)

我这里是已经挂载后的硬盘结构, 如果没有挂载的话, `sda -> sda2`的 `MOUNTPOINT` 这一列就不会有`/source`挂载文件夹.

## 3. 挂载硬盘

- 格式化

```bash
sudo mkfs -t ext4 /dev/sda2  # 如果你的硬盘是sda1, 那么就是sudo mkfs -t ext4 /dev/sda2
```

- 创建挂载目录

```bash
sudo mkdir /source	# 这里是你想挂载到的文件夹, 如果挂在到data, 那么就是sudo mkdir /data
```

- 把空间挂在文件夹下

```bash
sudo mount /dev/sda2 /source
```

- 使用`df -h` 查看是否挂载成功

## 4. 刷新磁盘配置

- fstab新增该磁盘

```bash
/dev/sda2    /source    ext4    defaults    0    0
```

- 立即执行 fstab 的内容

```bash
sudo mount -a
```

如果没有报错就挂载成功

## 5. 如果没有权限

- 修改文件权限

```bash
sudo chmod 777 /media/sda2
```

## 6. 其他挂载相关

- 解除挂载

```bash
sudo umount /dev/sda2
```

- 临时挂载

```bash
# 只是把硬盘插上，开机时可能会自动挂载硬盘，但是这样硬盘无法使用，需要先解除挂载
sudo umount /dev/sda2
# 重新挂载
sudo mount /dav/sda1 /snowstorm
```







