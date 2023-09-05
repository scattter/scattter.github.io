# Centos分区合并

> 本文根据UP主[左左经验](https://space.bilibili.com/253977174)视频整理而成

在`物理机安装Linux同时...` 一节为了搭建自己的服务器, 所以我在自己的小主机上装了一个新的Centos系统. 装完系统后发现默认的硬盘分成了两个区, 一个是root, 一个是home. 这就导致root空间过小, 需要将home区合并到root区.

![image-20221204212357967](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221204212357967.png)

可以看到, 上面root分区是 50G, home分区是61G(这个硬盘是128G的垃圾固态).


1. 删除home分区
使用`nano /etc/fstab` 命令
![image-20221204213104007](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221204213104007.png)

2. 卸载home分区
`umount /home`
卸载后如下所示
![image-20221204213314364](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221204213314364.png)

3. 查看有哪些lv分区
`lvscan`
![image-20221204213453675](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221204213453675.png)

4. 卸载home分区
`lvremove /dev/mapper/centos-home`
![image-20221204213622124](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221204213622124.png)

5. 查看当前剩余空间
`vgdisplay`
![image-20221204213816271](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221204213816271.png)

6. 将空闲的空间扩容到root
`lvextend -l +100%free /dev/mapper/centos-root`
![image-20221204214013919](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221204214013919.png)
此时空间还没有变大
![image-20221204214049819](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221204214049819.png)

7. 再执行命令刷新
`xfs_growfs /dev/mapper/centos-root`
此时可以看到容量更新成功了
![image-20221204214307953](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221204214307953.png)

