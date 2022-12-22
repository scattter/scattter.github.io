



其他可能用到的参数

`per_page`
The number of results per page (max 100).

Default: 30

`page`
Page number of the results to fetch.

Default: 1



获取某个仓库的commit信息
https://api.github.com/repos/OWNER/REPO/commits

例如
https://api.github.com/repos/scattter/common-utils/commits



获取某个仓库的event信息, 包括push, merge等

https://api.github.com/repos/OWNER/REPO/events

例如
https://api.github.com/repos/scattter/common-utils/events



获取某个用户的event信息
https://api.github.com/users/USERNAME/events

获取某个用户public的event信息
https://api.github.com/users/USERNAME/events/public