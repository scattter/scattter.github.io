

# Github常用api

> github接口详细文档地址为: https://docs.github.com/en/rest?apiVersion=2022-11-28
>
> 持续更新...



## 1. commit相关

- 获取具体仓库的commit信息
  - `https://api.github.com/repos/OWNER/REPO/commits`
  - 例子: `https://api.github.com/repos/scattter/common-utils/commits` 
- 获取具体仓库的event信息, , 包括push, merge等
  - `https://api.github.com/repos/OWNER/REPO/events`
  - 例子: `https://api.github.com/repos/scattter/common-utils/events` , 可以通过判断event类型提取commit信息





## 2. 用户相关

- 获取具体用户的event信息
  - `https://api.github.com/users/USERNAME/events`
- 获取某个用户public的event信息
  - `https://api.github.com/users/USERNAME/events/public`





## 3. 公共参数

- `per_page`
  - The number of results per page (max 100).
  - Default: 30
- `page`
  - Page number of the results to fetch.
  - Default: 1

