# Cloudflare Pages 与碎碎念配置

博客使用 VitePress，代码继续放在 GitHub；Cloudflare Pages 构建和托管网站；Supabase 保存碎碎念并处理 GitHub 登录。访客可以阅读，只有指定账号可以发布。

## 当前官方项目配置

2026-09-29 已通过 Supabase 插件完成以下配置：

- 项目：[blob](https://supabase.com/dashboard/project/dycpzdoyybpbqlittocw)，区域为首尔。
- API 地址：`https://dycpzdoyybpbqlittocw.supabase.co`。
- 已创建 `public.moments`、分页索引和公开读取策略，启用 RLS；未绑定博主前禁止所有账号发布。
- 公开密钥已写入本地 `.env.local`，该文件不会提交到 Git。Cloudflare 环境变量仍需单独配置。
- 已验证 REST 读取返回 200，安全检查无告警。当前 GitHub 登录尚未启用，项目还没有 Auth 用户。

正式地址已确定为 **`https://blob.suilice.xyz`**。代码的默认站点地址和本地 `.env.local` 已采用该地址；Cloudflare Pages 部署、域名绑定和 DNS 解析仍需在控制台完成。本地代码和环境文件配置好，不代表域名已经上线。

已确认现有 Cloudflare Pages 项目为 [scattter-github-io](https://dash.cloudflare.com/56439f8e08d9eebe36282d56abded78d/pages/view/scattter-github-io)，已连接 `scattter/scattter.github.io`，分配的地址是 `scattter-github-io.pages.dev`。2026-09-29 检查时尚无成功的生产部署，生产分支仍为 `gh-pages`；后续使用下方源码构建配置时应改为 `master`。

当前 Supabase 项目不需要再次创建或建表，可从第 2 步继续。GitHub OAuth App 的回调地址为 `https://dycpzdoyybpbqlittocw.supabase.co/auth/v1/callback`；完成首次登录后再绑定博主 UID。

按下面顺序操作。首次部署时可以先不填写博主 UID，登录一次取得 UID 后再开放发布。

## 1. 创建 Supabase 项目并建表

1. 在 [Supabase](https://supabase.com/dashboard) 创建项目，妥善保存数据库密码。
2. 在 SQL Editor 中运行 [supabase/schema.sql](./supabase/schema.sql)。
3. 在项目的 Connect / API 配置中复制 **Project URL** 和 **Publishable key**。旧项目的 `anon` key 也可以使用。

这里只需要公开的 Publishable / anon key。不要把 `service_role`、`sb_secret_...`、数据库密码或 GitHub Client Secret 填入 `VITE_` 环境变量，这些变量会进入前端产物。

这一步完成后，`moments` 表可以公开读取，但所有账号都还不能发布。

## 2. 在 Cloudflare Pages 连接现有仓库

将这次代码提交并推送到 GitHub，然后进入 Cloudflare 的 **Workers & Pages → scattter-github-io → Settings**，修改现有项目配置即可，无需重复创建项目。

| 设置 | 值 |
| --- | --- |
| Production branch | `master` |
| Framework preset | VitePress |
| Root directory | 仓库根目录，留空 |
| Build command | `yarn docs:build` |
| Build output directory | `docs/.vitepress/dist` |
| Node 版本 | `22`，仓库已包含 `.node-version`；也可设置 `NODE_VERSION=22` |

不要直接使用框架预设的默认产物目录：本项目的文档在 `docs` 下。

在 **Settings → Variables and Secrets** 中配置 Production 环境变量：

| 名称 | 示例 / 来源 |
| --- | --- |
| `SITE_URL` | `https://blob.suilice.xyz` |
| `YARN_VERSION` | `1.22.22`，避免 Cloudflare 默认使用 Yarn 4 |
| `VITE_SUPABASE_URL` | `https://dycpzdoyybpbqlittocw.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | 本地 `.env.local` 中同名配置，或项目 Connect / API 配置中的 Publishable key |
| `VITE_SUPABASE_OWNER_ID` | 首次部署可留空，第 5 步再填 |

保存后部署。以后推送 `master` 会自动触发部署；只发布碎碎念不需要重新部署。修改任何环境变量后都需要重新部署才会生效。

项目使用 Yarn 1 和仓库中的 `yarn.lock`。Cloudflare 当前构建镜像默认使用 Yarn 4，且不会从锁文件格式识别 Yarn 版本，因此需要显式设置 `YARN_VERSION=1.22.22`。不需要另写 GitHub Actions 来上传到 Cloudflare。原 GitHub Pages 工作流仍然保留，正式迁移完成后可在 GitHub Actions 中停用旧的 Deploy 工作流。

## 3. 绑定阿里云域名 blob.suilice.xyz

2026-09-29 查询时，`suilice.xyz` 使用 `dns1.hichina.com` / `dns2.hichina.com`，`blob.suilice.xyz` 尚无 DNS 记录。这个子域名可以继续使用阿里云 DNS，无需迁移主域名的 NS。

1. 本项目实际分配的 Pages 地址为 `scattter-github-io.pages.dev`，先确认该地址能打开成功部署的博客。
2. 在该 Pages 项目的 **Custom domains → Set up a custom domain** 中填写 `blob.suilice.xyz`，按提示进行域名关联。
3. 到阿里云 **云解析 DNS → 权威域名解析 → suilice.xyz → 解析设置 → 添加记录**，填写：

| 字段 | 值 |
| --- | --- |
| 记录类型 | `CNAME` |
| 主机记录 | `blob` |
| 解析请求来源 / 线路 | 默认 |
| 记录值 | `scattter-github-io.pages.dev`，不含 `https://` 或路径 |
| TTL | 默认即可 |

4. 回到 Cloudflare 完成检查，等待 Custom domain 状态为 Active、HTTPS 证书就绪。
5. 确认 `https://blob.suilice.xyz/` 和 `https://blob.suilice.xyz/moments` 都能打开，再检查 sitemap 和 robots.txt。

先在 Pages 中关联域名，再添加 CNAME；只有 DNS 记录不算完成绑定。只操作 `blob` 记录，保留主域名和其他子域名的原有解析。`SITE_URL` 必须为 `https://blob.suilice.xyz`；`scattter.github.io` 是 GitHub 分配的地址，不能作为自己的域名搬到 Cloudflare。

当前使用 Cloudflare Pages 国际网络，无需为了这次托管办理中国大陆 ICP 备案。阿里云域名实名认证仍需完成；以后若使用中国大陆服务器或大陆 CDN，再按相应服务要求办理备案。

## 4. 配置 GitHub 登录

1. 打开 [GitHub OAuth Apps](https://github.com/settings/developers)，选择 **OAuth Apps → New OAuth App**，填写：

| GitHub 字段 | 值 |
| --- | --- |
| Application name | `Scatter Blog`，也可以填自己喜欢的名字 |
| Homepage URL | `https://blob.suilice.xyz` |
| Authorization callback URL | `https://dycpzdoyybpbqlittocw.supabase.co/auth/v1/callback` |

2. 注册后复制 Client ID，点击 **Generate a new client secret** 生成并复制 Client Secret。
3. 打开 [Supabase blob 项目](https://supabase.com/dashboard/project/dycpzdoyybpbqlittocw)，进入 **Authentication → Sign In / Providers → GitHub**，启用 GitHub，填入 Client ID 和 Client Secret 并保存。Client Secret 只填在 Supabase，不写入代码或 Cloudflare 前端变量。
4. 在 Supabase **Authentication → URL Configuration** 中设置并保存：

| Supabase 字段 | 值 |
| --- | --- |
| Site URL | `https://blob.suilice.xyz` |
| Redirect URLs | `https://blob.suilice.xyz/moments` |

5. 确保 **Allow new users to sign up** 在首次登录时开启，才能创建你的 Supabase Auth 用户。

登录使用 PKCE。请在同一个浏览器中完成跳转；不要把登录回调地址复制到另一个设备。生产登录回跳地址需要精确匹配实际域名。

## 5. 指定只有你能发布

1. 打开 `https://blob.suilice.xyz/moments`，点击“博主登录”，用自己的 GitHub 账号登录。
2. 在 Supabase **Authentication → Users** 中找到刚创建的账号，复制 **User UID**。这是 Supabase 的 UUID，不是 GitHub 用户名或数字 ID。
3. 打开 [supabase/set-owner.sql](./supabase/set-owner.sql)，将全零 UUID 替换成你的 User UID，再到 SQL Editor 执行。
4. 在 Cloudflare Pages 项目的 Production 环境变量中，把 `VITE_SUPABASE_OWNER_ID` 设为同一个 User UID，重新部署。需要本地使用时，也更新 `.env.local` 中的同名配置。
5. 重新打开 `/moments`，登录后会出现输入框，可以发布文字。
6. 个人博客无需其他人注册时，可在 Supabase 关闭 **Allow new users to sign up**。已创建的博主账号仍可以登录。

数据库的 RLS 策略才决定实际写入权限。即使有人修改浏览器里的博主 UID、绕过页面直接调用接口，也不能以其他账号发帖。发布时间由数据库生成；前端没有修改或删除历史记录的权限。

如果未来换账号，需要同时修改 SQL 中的 UID 和 Cloudflare 环境变量。`set-owner.sql` 可重新执行，不会删除帖子。

## 6. 迁移网址和 Google Search Console

`SITE_URL` 会用于 sitemap、canonical 和构建时生成的 robots.txt；不需要手动改源文件里的域名。未配置时默认使用 `https://blob.suilice.xyz`。

Cloudflare Pages 会把 `.html` 地址跳转到无后缀地址，因此本项目已统一启用 `cleanUrls`，canonical 和 sitemap 同样使用无后缀地址。

部署后检查：

1. `https://blob.suilice.xyz/robots.txt` 中的 Sitemap 指向正式域名。
2. `https://blob.suilice.xyz/sitemap.xml` 中的网址都使用正式域名。
3. 任意旧文章的新域名地址能打开，中文路径和图片正常，`.html` 地址能跳转到无后缀地址。
4. 在 Search Console 添加并验证新域名资源，提交 `https://blob.suilice.xyz/sitemap.xml`，再对首页做实时网址测试。

先保留旧站，逐页规划旧地址到新地址的对应关系。旧的 `scattter.github.io` 跳转必须在 GitHub 一侧处理，Cloudflare 的重定向规则无法接管不属于它的旧域名。确认旧站跳转方案可用后再停用旧部署；不要先删除旧站。

Cloudflare 分配的 `pages.dev` 地址会与正式域名展示同一份内容。可以按 [官方说明](https://developers.cloudflare.com/pages/configuration/custom-domains/#redirect-a-pagesdev-subdomain-to-a-custom-domain) 将该地址跳转到正式域名。分支预览默认带有禁止索引的响应头，保留它。

原有文章由 VitePress 输出静态 HTML。当前碎碎念在浏览器中加载，发布立即可见，但没有为每条内容生成独立静态页面，因此不承诺每条短帖都会被搜索收录。迁移托管、站点地图提交成功也不等于 Google 已经收录。

## 7. 备份与日常使用

- 每条记录最多 2000 字，支持换行，按纯文字展示。
- 登录后点击“导出备份”，会下载包含**全部记录**的 JSON，不局限于当前已加载的分页。
- 导出包含帖子 ID、正文、发布时间、备份时间和格式版本，可用于日后恢复或迁移。
- 定期把 JSON 保存到自己的电脑或其他独立存储。它是内容备份；完整数据库和权限配置可另用 Supabase CLI 的 `supabase db dump` 保存。
- 免费项目的服务和备份规则以 Supabase 当前方案为准；不要把数据库中的唯一副本当作独立备份。

发布失败时输入内容会保留在当前页面，在该页面原样重试同一内容不会重复写入。此处没有本地草稿持久化，刷新或关闭页面前请先确认发布成功。

## 本地环境与排查

需要本地开发时，将根目录 `.env.example` 复制为 `.env.local` 并填写配置。环境文件已加入 `.gitignore`；`SITE_URL` 只接受站点根地址。`.env.local` 在本地生效，不会自动同步到 Cloudflare。

如果需要本地测试登录，在 Supabase Redirect URLs 中额外添加实际使用的地址，例如 `http://localhost:5173/moments`。测试结束后可移除。预览域名也必须逐个加入允许的回跳地址后才能登录，不建议对生产项目开放任意域名。

| 现象 | 检查位置 |
| --- | --- |
| 显示“碎碎念暂未开放” | URL / Publishable key 是否配置，以及修改后是否已重新部署 |
| 无法加载记录 | `schema.sql` 是否执行、Supabase 项目是否正常、浏览器网络请求是否成功 |
| 登录回跳失败 | GitHub Callback URL 是否填 Supabase 地址；Supabase Redirect URLs 是否包含正式域名 `/moments` |
| 登录后提示没有发布权限 | Cloudflare 中的 Owner ID 是否等于当前 Supabase User UID |
| 能看到输入框，但发布失败 | `set-owner.sql` 中的 UID、RLS 策略、账号会话和网络状态 |
| sitemap 仍指向旧站 | Production 的 `SITE_URL` 是否正确，是否重新部署 |

官方参考：[Cloudflare VitePress](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vitepress-site/)、[域名绑定](https://developers.cloudflare.com/pages/configuration/custom-domains/)、[Supabase GitHub 登录](https://supabase.com/docs/guides/auth/social-login/auth-github)、[数据库备份](https://supabase.com/docs/guides/platform/backups)、[阿里云 ICP 备案适用范围](https://www.alibabacloud.com/help/en/icp-filing/basic-icp-service/product-overview/what-is-an-icp-filing)。
