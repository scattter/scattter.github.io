import{_ as n,o as a,c as e,a3 as p}from"./chunks/framework.d6OaePA7.js";const d=JSON.parse('{"title":"前端部署方案","description":"","frontmatter":{"head":[["link",{"rel":"canonical","href":"https://scattter.github.io/pages/explore/frontend/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE%E9%83%A8%E7%BD%B2%E6%96%B9%E6%A1%88.html"}]]},"headers":[],"relativePath":"pages/explore/frontend/前端项目部署方案.md","filePath":"pages/explore/frontend/前端项目部署方案.md","lastUpdated":1693917276000}'),l={name:"pages/explore/frontend/前端项目部署方案.md"};function i(r,s,c,t,b,o){return a(),e("div",null,[...s[0]||(s[0]=[p(`<h1 id="前端部署方案" tabindex="-1">前端部署方案 <a class="header-anchor" href="#前端部署方案" aria-label="Permalink to &quot;前端部署方案&quot;">​</a></h1><h2 id="一-触发方式" tabindex="-1">一. 触发方式 <a class="header-anchor" href="#一-触发方式" aria-label="Permalink to &quot;一. 触发方式&quot;">​</a></h2><h3 id="_1-1-自动触发" tabindex="-1">1.1 自动触发 <a class="header-anchor" href="#_1-1-自动触发" aria-label="Permalink to &quot;1.1 自动触发&quot;">​</a></h3><p>使用<code>Jenkins/Gitlab runner</code> 等仓库监控工具去设置触发条件, 触发后执行开发自己设置的相应脚本, 如下面是我之前设置的一个gitlab脚本, 该脚本只对 <code>feature/zk</code> 分支生效, 即如果该分支有合入或者推送就会触发下面的命令, 替换Nginx的静态资源</p><blockquote><p>后面会补充gitlab runner的相关部署经历</p></blockquote><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>image: node:14.7.0</span></span>
<span class="line"><span>cache:</span></span>
<span class="line"><span>  key: \${CI_BUILD_REF_NAME}</span></span>
<span class="line"><span>  paths:</span></span>
<span class="line"><span>    - node_modules/  #缓存node_modules</span></span>
<span class="line"><span>stages:</span></span>
<span class="line"><span>  #- test</span></span>
<span class="line"><span>  - deploy</span></span>
<span class="line"><span>MES-deploy:</span></span>
<span class="line"><span>  stage: deploy</span></span>
<span class="line"><span>  script:</span></span>
<span class="line"><span>    - echo &#39;***************************&#39;</span></span>
<span class="line"><span>    - cd ./product</span></span>
<span class="line"><span>    - npm install --registry=https://registry.npm.taobao.org</span></span>
<span class="line"><span>    - npm run build</span></span>
<span class="line"><span>    - rm -rf /usr/local/nginx/html/dist/product</span></span>
<span class="line"><span>    - cp -r /home/gitlab-runner/builds/hh4QSqNh/0/cdp/cdp-web/dist/product/ /usr/local/nginx/html/dist/product/</span></span>
<span class="line"><span>    - echo &#39;deploy success&#39;</span></span>
<span class="line"><span>    - cd ..</span></span>
<span class="line"><span>    - echo &#39;***************************&#39;</span></span>
<span class="line"><span>    - cd ./productGroup</span></span>
<span class="line"><span>    - npm install --registry=https://registry.npm.taobao.org</span></span>
<span class="line"><span>    - npm run build</span></span>
<span class="line"><span>    - ls</span></span>
<span class="line"><span>    - rm -rf /usr/local/nginx/html/dist/productGroup</span></span>
<span class="line"><span>    - cp -r /home/gitlab-runner/builds/hh4QSqNh/0/cdp/cdp-web/dist/productGroup/ /usr/local/nginx/html/dist/productGroup/</span></span>
<span class="line"><span>    - echo &#39;deploy success&#39;</span></span>
<span class="line"><span>    - echo &#39;***************************&#39;</span></span>
<span class="line"><span>  tags:</span></span>
<span class="line"><span>    - v1</span></span>
<span class="line"><span>  only:</span></span>
<span class="line"><span>    - feature/zk</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><h3 id="_1-2-手动触发" tabindex="-1">1.2 手动触发 <a class="header-anchor" href="#_1-2-手动触发" aria-label="Permalink to &quot;1.2 手动触发&quot;">​</a></h3><p>这种方式有点原始</p><ol><li>一个是自己登陆服务器然后运行里面的构建脚本</li><li>开发在自己电脑上使用脚本去直连服务器, 然后跑一些脚本</li></ol><p>对于方式1, 就不说了. 如果是使用方式2, 那么需要直连服务器, 解决方案在下面</p><blockquote><p>服务器A连接服务器B, 并运行服务器B中的shell命令(不用输入密码) 将服务器A的 id_rsa.pub 复制到B服务器的 .ssh/authorized_keys 中, 如果B中没有该文件, 创建一个就可以 如 ssh root@10.253.xx.xx &quot;pwd&quot; , 即可 或者也可以使用下面的命令 <code>scp -r id_rsa.pub root@10.253.xx.xx:/root/.ssh/authorized_keys</code> 比如, 可以像下面这样去配置</p></blockquote><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ssh root@10.253.xx.xx &quot;pwd&quot;</span></span>
<span class="line"><span>cd /xxx/project/</span></span>
<span class="line"><span>npm run build</span></span>
<span class="line"><span>cp dist /usr/share/nginx/html</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="二-部署方式" tabindex="-1">二. 部署方式 <a class="header-anchor" href="#二-部署方式" aria-label="Permalink to &quot;二. 部署方式&quot;">​</a></h2><p>这里有两种部署方式</p><h3 id="_2-1-使用docker部署" tabindex="-1">2.1 使用Docker部署 <a class="header-anchor" href="#_2-1-使用docker部署" aria-label="Permalink to &quot;2.1 使用Docker部署&quot;">​</a></h3><p>先提供相关文件(Dockerfile: 镜像打包, 这里使用了多阶段镜像打包, 即基于node生成的文件打包生成nginx镜像)</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>FROM node:16.13-alpine as node</span></span>
<span class="line"><span># Install app dependencies</span></span>
<span class="line"><span># A wildcard is used to ensure both package.json AND package-lock.json are copied</span></span>
<span class="line"><span># where available (npm@5+)</span></span>
<span class="line"><span>COPY . .</span></span>
<span class="line"><span># 安装依赖</span></span>
<span class="line"><span>RUN yarn install</span></span>
<span class="line"><span># 打包</span></span>
<span class="line"><span>RUN yarn build</span></span>
<span class="line"><span></span></span>
<span class="line"><span>FROM nginx:latest</span></span>
<span class="line"><span># 将上一步打包后的文件copy到nginx里面</span></span>
<span class="line"><span>COPY --from=node dist /usr/share/nginx/html</span></span>
<span class="line"><span>EXPOSE 80</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>镜像可以选择在服务器上打包, 然后直接重启或者在本地或者另一台服务器上打包, 再上传部署</p><ul><li>服务器上打包</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// example: 之前运行的容器是web</span></span>
<span class="line"><span>// 基于Dockerfile打包镜像</span></span>
<span class="line"><span>docker build -t web-img .</span></span>
<span class="line"><span># 由于经常重复打包, 所以使用下面的命令删除无用的镜像</span></span>
<span class="line"><span>docker rmi $(docker images -f &quot;dangling=true&quot; -q)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>docker rm -f web</span></span>
<span class="line"><span>// 将nginx的配置文件挂载出来</span></span>
<span class="line"><span>docker run -d -it -p 80:80 -v /root/nginx/conf:/etc/nginx/conf.d --name web web-img /bin/bash</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><ul><li>本地其他服务器打包镜像</li></ul><p>这种情况需要把打包的镜像上传到私库, 然后部署服务器再去拉取最新镜像重新部署. 听起来又要上传又要去重新拉取很麻烦, 但是这里可以使用一个镜像 <code>watchtower</code> 去帮助我们自动检测镜像是否变化, 是否需要重新部署, 具体如下Dokcerfile文件类似, 主要是打包上传脚本</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span># 本地build镜像(指定dockerfile文件)</span></span>
<span class="line"><span>docker build -t vite . --no-cache</span></span>
<span class="line"><span># 本地打tag</span></span>
<span class="line"><span>docker tag vite 10.253.xx.xx:5000/vite:latest</span></span>
<span class="line"><span># 删除无用的镜像</span></span>
<span class="line"><span># 由于经常重复打包, 所以使用下面的命令删除无用的镜像</span></span>
<span class="line"><span>docker rmi $(docker images -f &quot;dangling=true&quot; -q)</span></span>
<span class="line"><span># 推送到私有仓库, 私有仓库</span></span>
<span class="line"><span>docker push 10.253.xx.xx:5000/vite:latest</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="_2-2-普通部署" tabindex="-1">2.2 普通部署 <a class="header-anchor" href="#_2-2-普通部署" aria-label="Permalink to &quot;2.2 普通部署&quot;">​</a></h3><p>普通部署没什么好说的, 打包好后替换nginx html里面的静态资源即可, 使用一些简单的cp, rm命令</p><h2 id="三-补充" tabindex="-1">三. 补充 <a class="header-anchor" href="#三-补充" aria-label="Permalink to &quot;三. 补充&quot;">​</a></h2><h3 id="_3-1-gitlab-runner" tabindex="-1">3.1 Gitlab runner <a class="header-anchor" href="#_3-1-gitlab-runner" aria-label="Permalink to &quot;3.1 Gitlab runner&quot;">​</a></h3><p>相关配置可以直接搜索gitlab官网, 下面是一些之前配置普通版踩过的坑, Docker版的后面我再补充</p><ul><li><p>新建一个gitlab runner用户, 这里最好最好新建为root, 否则后面会有很多麻烦的权限问题, 导致CI/CD不能拉去代码</p><p><code>gitlab-runner install --working-directory /home/gitlab-runner --user root</code></p></li><li><p>证书问题</p><p>由于一些gitlab使用https证书, 导致我们注册gtilab的时候会在中间报错<code>X 509...</code> 这种</p></li></ul><p>解决方案就是将gitlab的证书注册到服务器上, 证书放在 <code>/etc/pki/ca-trust/source/anchors/</code> 文件夹里面, 然后更新证书</p><p>或者在注册gitlab runner的时候使用</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>xxx register --tls-ca-file xxxx</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>指定证书</p><ul><li><p>gitlab runner拉取代码报错</p><p>原因是gitlab runner连接的时候也需要有自己的ssh密钥 它走的不是服务器的ssh key</p></li></ul><p>我们需要先在/home/gitlab-runner目录下生成gitlab runner自己的ssh-key, 然后将这个key复制到目录服务器的 <code>/root/.ssh/authorized_keys</code> 文件中, 同时, 我们还需要在gitlab-runner服务器上使用gitlab-runner用户去ssh连接下, 输入确认, 然后CI才能正常访问, 如下所示:</p><p><img src="https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image2.png" alt="image2"></p><p>或者可以尝试在runner的配置中添加下面的</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>environment = [&quot;GIT_SSL_NO_VERIFY=true&quot;]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>配置完类似于下面这样</p><p><img src="https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image1.png" alt="image1"></p><h3 id="_3-2-私有仓库创建和watchtower运行的命令" tabindex="-1">3.2 私有仓库创建和<code>watchtower</code>运行的命令 <a class="header-anchor" href="#_3-2-私有仓库创建和watchtower运行的命令" aria-label="Permalink to &quot;3.2 私有仓库创建和\`watchtower\`运行的命令&quot;">​</a></h3><ul><li>私有仓库</li></ul><p>私有仓库相关知识链接: <a href="https://yeasy.gitbook.io/docker_practice/repository/registry" target="_blank" rel="noreferrer">https://yeasy</a> <a href="https://yeasy.gitbook.io/docker_practice/repository/registry" target="_blank" rel="noreferrer">.gitbook.io/docker_practice/repository/registry</a></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 搭建私有仓库 </span></span>
<span class="line"><span>$ docker run -d -p 5000:5000 --restart=always --name registry registry</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>本地/服务器想要将镜像推送到私有仓库, 有时还需要在本地配置私有仓库的地址, 否则docker不允许你通过非HTTPS的方式推送, 如下</p><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;registry-mirror&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;https://hub-mirror.c.163.com&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;https://mirror.baidubce.com&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;insecure-registries&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;10.253.xx.xx:5000&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><ul><li>watchtower</li></ul><p>watchtower相关中文网站链接: <a href="https://p3terx.com/archives/docker-watchtower.html" target="_blank" rel="noreferrer">https://p3terx.com/archives/docker-watchtower.html</a></p><p><code>watchtower </code> 支持自定义监测容器对象, 但是有一点, 其目前只支持定时监测容器变化, 不能像Jenkins这种实时触发</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker run -d \\</span></span>
<span class="line"><span>    --name watchtower \\</span></span>
<span class="line"><span>    --restart unless-stopped \\</span></span>
<span class="line"><span>    -v /var/run/docker.sock:/var/run/docker.sock \\</span></span>
<span class="line"><span>    containrrr/watchtower -c \\</span></span>
<span class="line"><span>    &lt;容器名字&gt; --interval 3600</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span># 或者</span></span>
<span class="line"><span> docker run -d --name watchtower --restart unless-stopped</span></span>
<span class="line"><span> -v /var/run/docker.sock:/var/run/docker.sock </span></span>
<span class="line"><span> containrrr/watchtower -c </span></span>
<span class="line"><span>$(cat ~/zk/.watchtower.list) </span></span>
<span class="line"><span>--interval 3600</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="_3-3-docker部署" tabindex="-1">3.3 Docker部署 <a class="header-anchor" href="#_3-3-docker部署" aria-label="Permalink to &quot;3.3 Docker部署&quot;">​</a></h3><p>Nginx的容器部署命令一般为</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 后台 交互 暴漏端口 挂载目录 名字 镜像名 交互shell</span></span>
<span class="line"><span>docker run -d -it -p 80:80 -v /root/nginx/conf:/etc/nginx/conf.d --name nginx /bin/bash</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>上面这种挂载如果conf里面没有文件, 那么也会把nginx镜像里面相对文件夹里面本来存在的文件给冲掉.</p><p>这里可以使用单个容器部署, 也可以使用docker-compose去部署, compose是配置型的文件, 所以会简单一些</p><h2 id="四-推荐方案" tabindex="-1">四. 推荐方案 <a class="header-anchor" href="#四-推荐方案" aria-label="Permalink to &quot;四. 推荐方案&quot;">​</a></h2><blockquote><p>简单的才是最好用的!此处的示例是基于自搭建的gitlab仓库实现的，示例基于下面的文章调试完成</p><p><a href="https://juejin.cn/post/6967972435064782879" target="_blank" rel="noreferrer">https://juejin.cn/post/6967972435064782879</a></p><p><a href="https://juejin.cn/post/7074780794459258917#heading-9" target="_blank" rel="noreferrer">https://juejin.cn/post/7074780794459258917#heading-9</a></p></blockquote><p>Gitlab runner(Docker) + Nginx(Docker)部署仓库地址: <a href="http://124.221.123.79:8084/" target="_blank" rel="noreferrer">http://124.221.123.79:8084/</a></p><h3 id="_4-1-搭建自己的gitlab仓库" tabindex="-1">4.1 搭建自己的gitlab仓库 <a class="header-anchor" href="#_4-1-搭建自己的gitlab仓库" aria-label="Permalink to &quot;4.1 搭建自己的gitlab仓库&quot;">​</a></h3><p>因为仓库搭建起来很占内存，所以此处服务器最好是4G内存+</p><p>此处搭建使用docker中文版, docker compose运行</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>version: &#39;3&#39;</span></span>
<span class="line"><span>services:</span></span>
<span class="line"><span>   web:</span></span>
<span class="line"><span>     image: &#39;twang2218/gitlab-ce-zh&#39;   #gitlab镜像</span></span>
<span class="line"><span>     restart: always</span></span>
<span class="line"><span>     privileged: true  #权限</span></span>
<span class="line"><span>     hostname: &#39;&#39;       #主机名, 即虚拟机的IP, 这里可以是纯IP</span></span>
<span class="line"><span>     environment:</span></span>
<span class="line"><span>        TZ: &#39;Asia/Shanghai&#39;</span></span>
<span class="line"><span>        GITLAB_OMNIBUS_CONFIG: |</span></span>
<span class="line"><span>            external_url &#39;&#39; #主机名,即虚拟机的IP, 这里需要添加http前缀</span></span>
<span class="line"><span>            gitlab_rails[&#39;gitlab_shell_ssh_port&#39;] = 2222</span></span>
<span class="line"><span>            nginx[&#39;listen_port&#39;] = 8084</span></span>
<span class="line"><span>     ports:</span></span>
<span class="line"><span>        - &#39;8084:8084&#39;</span></span>
<span class="line"><span>        - &#39;8443:443&#39;</span></span>
<span class="line"><span>        - &#39;2222:22&#39;</span></span>
<span class="line"><span>     volumes:</span></span>
<span class="line"><span>        - &#39;./config:/etc/gitlab&#39;</span></span>
<span class="line"><span>        - &#39;./logs:/var/log/gitlab&#39;</span></span>
<span class="line"><span>        - &#39;./data:/var/opt/gitlab&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>配置解析</p><ul><li>external_url: 该参数是指定外部访问仓库的地址</li><li>gitlab_shell_ssh_port: ssh拉取代码的端口</li><li>nginx[&#39;listen_port&#39;]: nginx监听端口, 不设置的话就是external_url: 80或者443</li></ul><p>更多镜像配置可以参考: <a href="https://docs.gitlab.com/ee/administration/environment_variables.html" target="_blank" rel="noreferrer">https://docs.gitlab.com/ee/administration/environment_variables.html</a></p><h3 id="_4-2-配置gitlab-runner" tabindex="-1">4.2 配置Gitlab runner <a class="header-anchor" href="#_4-2-配置gitlab-runner" aria-label="Permalink to &quot;4.2 配置Gitlab runner&quot;">​</a></h3><ul><li>启动容器</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>docker run -d --name gitlab-runner --restart always</span></span>
<span class="line"><span>-v /home/gitlab-runner/config:/etc/gitlab-runner </span></span>
<span class="line"><span>-v /var/run/docker.sock:/var/run/docker.sock </span></span>
<span class="line"><span>gitlab/gitlab-runner:latest</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>映射<code>/var/run/docker.sock</code>这个文件是为了让容器可以通过<code>/var/run/docker.sock</code>与<code>Docker</code>守护进程通信，管理其他<code>Docker</code>容器 <code>-v /home/gitlab-runner/config:/etc/gitlab-runner</code>是将runner的配置文件映射到宿主机<code>/home/gitlab-runner/config</code>方便调整和查看配置</p><ul><li>注册runner</li></ul><p>可以进入容器进行注册, 也可以在外面进行注册, 这里可以使用 <code>gtilab-runner register</code> 进行交互式注册, 按照上面提示填写信息(信息可以在下图所示位置找到)即可</p><p><img src="https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image.png" alt="image"></p><p>其中exector可以选docker. 注册完毕后我们可以在宿主机的<code>/home/gitlab-runner/config</code> 文件夹里面看见runner的配置信息, 如下所示</p><p><img src="https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image3.png" alt="image3"></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>concurrent = 1</span></span>
<span class="line"><span>check_interval = 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[session_server]</span></span>
<span class="line"><span>  session_timeout = 1800</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[[runners]]</span></span>
<span class="line"><span>  name = &quot;first-register-runner&quot;</span></span>
<span class="line"><span>  url = &quot;http://xxx:8084/&quot;</span></span>
<span class="line"><span>  token = &quot;xxx&quot;</span></span>
<span class="line"><span>  executor = &quot;docker&quot;</span></span>
<span class="line"><span>  clone_url = &quot;http://xxx:8084/&quot;</span></span>
<span class="line"><span>  [runners.custom_build_dir]</span></span>
<span class="line"><span>  [runners.cache]</span></span>
<span class="line"><span>    [runners.cache.s3]</span></span>
<span class="line"><span>    [runners.cache.gcs]</span></span>
<span class="line"><span>    [runners.cache.azure]</span></span>
<span class="line"><span>  [runners.docker]</span></span>
<span class="line"><span>    tls_verify = false</span></span>
<span class="line"><span>    image = &quot;alpine:latest&quot;</span></span>
<span class="line"><span>    privileged = false</span></span>
<span class="line"><span>    disable_entrypoint_overwrite = false</span></span>
<span class="line"><span>    oom_kill_disable = false</span></span>
<span class="line"><span>    disable_cache = false</span></span>
<span class="line"><span>    volumes = [&quot;/cache&quot;,&quot;/usr/bin/docker:/usr/bin/docker&quot;,&quot;/var/run/docker.sock:/var/run/docker.sock&quot;]</span></span>
<span class="line"><span>    shm_size = 0</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>后续有修改也可以直接在这里进行修改, 大部分配置修改不用手动重启runner 容器</p><p><strong>注意:</strong></p><ul><li>由于上面我们配置了nginx监听端口, 而runner执行的时候默认是从80等默认端口获取仓库文件的, 所以我们要在上面runner配置config.toml中增加一个属性: <code>clone_url</code>, 其值就是主机地址和nginx监听的端口</li><li>volumes里面添加docker的一些配置, 这样就可以在runner的docker里面创建基于宿主机的新docker(nginx)</li></ul><h3 id="_4-3-创建-gitlab-ci-yml文件" tabindex="-1">4.3 创建.gitlab-ci.yml文件 <a class="header-anchor" href="#_4-3-创建-gitlab-ci-yml文件" aria-label="Permalink to &quot;4.3 创建.gitlab-ci.yml文件&quot;">​</a></h3><blockquote><p>如果是使用https, 那么需要寻找自签证书 <a href="https://docs.gitlab.com/runner/configuration/tls-self-signed.html#supported-options-for-self-signed-certificates-targeting-the-gitlab-server" target="_blank" rel="noreferrer">https://docs.gitlab.com/runner/configuration/tls-self-signed.html#supported-options-for-self-signed-certificates-targeting-the-gitlab-server</a> 其他的一些runner配置可以去gitlab上搜索一下, 我之前配置公司的runner失败了, 找不到完整证书 ci配置文件</p></blockquote><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>image: node:alpine</span></span>
<span class="line"><span>stages: # 分段</span></span>
<span class="line"><span>  - install</span></span>
<span class="line"><span>  - build</span></span>
<span class="line"><span>  - deploy</span></span>
<span class="line"><span>cache: # 缓存</span></span>
<span class="line"><span>  paths:</span></span>
<span class="line"><span>    - node_modules</span></span>
<span class="line"><span>job_install:</span></span>
<span class="line"><span>  tags:</span></span>
<span class="line"><span>    - v2</span></span>
<span class="line"><span>  stage: install</span></span>
<span class="line"><span>  script:</span></span>
<span class="line"><span>    - npm install</span></span>
<span class="line"><span>  only:</span></span>
<span class="line"><span>    - master</span></span>
<span class="line"><span>job_build:</span></span>
<span class="line"><span>  tags:</span></span>
<span class="line"><span>    - v2</span></span>
<span class="line"><span>  stage: build</span></span>
<span class="line"><span>  script:</span></span>
<span class="line"><span>    - npm run build</span></span>
<span class="line"><span>  artifacts:</span></span>
<span class="line"><span>    paths:</span></span>
<span class="line"><span>      - dist/</span></span>
<span class="line"><span>    expire_in: 3 mins</span></span>
<span class="line"><span>  only:</span></span>
<span class="line"><span>    - master</span></span>
<span class="line"><span>job_deploy:</span></span>
<span class="line"><span>  tags:</span></span>
<span class="line"><span>    - v2</span></span>
<span class="line"><span>  image: docker</span></span>
<span class="line"><span>  stage: deploy</span></span>
<span class="line"><span>  dependencies:</span></span>
<span class="line"><span>    - job_build</span></span>
<span class="line"><span>  script:</span></span>
<span class="line"><span>    - docker build . -t app-images</span></span>
<span class="line"><span>    - if [ $(docker ps -aq --filter name=app-container) ]; then docker rm -f app-container;fi</span></span>
<span class="line"><span>    - docker run -d -p 8082:80 --name app-container app-images</span></span>
<span class="line"><span>  only:</span></span>
<span class="line"><span>    - master</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><p>dockerfile配置</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>FROM nginx:latest</span></span>
<span class="line"><span>COPY  ./dist /usr/share/nginx/html</span></span>
<span class="line"><span>EXPOSE 80</span></span>
<span class="line"><span># nginx的官方镜像Dockerfile 已经指定 nginx -g &quot;daemon off;&quot;</span></span>
<span class="line"><span>CMD [&quot;/usr/sbin/nginx&quot;, &quot;-g&quot;, &quot;daemon off;&quot;]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>这里对原文的配置进行了一些改造, 去掉了无用的东西, 最后结果是配置了三个job, 分别为安装依赖和打包, 最后使用打包job生成的dist文件夹进行nginx docker构建与部署</p><h2 id="五-扩展-使用github-action" tabindex="-1">五. 扩展 - 使用Github action <a class="header-anchor" href="#五-扩展-使用github-action" aria-label="Permalink to &quot;五. 扩展 - 使用Github action&quot;">​</a></h2><p>仓库地址: <a href="https://github.com/scattter/template-react" target="_blank" rel="noreferrer">https://github.com/scattter/template-react</a></p><p>github给每个用户默认提供了服务器来跑流水线, 所以只需要通过github仓库的action仓库配置流水线即可</p><p>配置文件(不同项目可以设置不同的action)</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># This is a basic workflow to help you get started with Actions</span></span>
<span class="line"><span>name: Auto deploy</span></span>
<span class="line"><span># Controls when the workflow will run</span></span>
<span class="line"><span>on:</span></span>
<span class="line"><span>  # Triggers the workflow on push or pull request events but only for the main branch</span></span>
<span class="line"><span>  push:</span></span>
<span class="line"><span>    branches: [ main, dev ]</span></span>
<span class="line"><span>  pull_request:</span></span>
<span class="line"><span>    branches: [ main, dev ]</span></span>
<span class="line"><span># A workflow run is made up of one or more jobs that can run sequentially or in parallel</span></span>
<span class="line"><span>jobs:</span></span>
<span class="line"><span>  # This workflow contains a single job called &quot;build&quot;</span></span>
<span class="line"><span>  build:</span></span>
<span class="line"><span>    # The type of runner that the job will run on</span></span>
<span class="line"><span>    runs-on: ubuntu-latest</span></span>
<span class="line"><span>    # Steps represent a sequence of tasks that will be executed as part of the job</span></span>
<span class="line"><span>    steps:</span></span>
<span class="line"><span>      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it</span></span>
<span class="line"><span>      - uses: actions/checkout@v3</span></span>
<span class="line"><span>      - name: Setup Node.js environment</span></span>
<span class="line"><span>        uses: actions/setup-node@v3.1.1</span></span>
<span class="line"><span>        with:</span></span>
<span class="line"><span>          node-version: &quot;14.X&quot;</span></span>
<span class="line"><span>      - name: install deps</span></span>
<span class="line"><span>        run: npm install</span></span>
<span class="line"><span>      - name: build app</span></span>
<span class="line"><span>        run: npm run build</span></span>
<span class="line"><span>      - name: deploy build file with scp</span></span>
<span class="line"><span>        uses: appleboy/scp-action@master</span></span>
<span class="line"><span>        with:</span></span>
<span class="line"><span>          host: \${{ secrets.REMOTE_HOST }}</span></span>
<span class="line"><span>          username: &#39;root&#39;</span></span>
<span class="line"><span>          password: \${{ secrets.REMOTE_PASSWORD }}</span></span>
<span class="line"><span>          port: 22</span></span>
<span class="line"><span>          source: &quot;dist/&quot;</span></span>
<span class="line"><span>          target: \${{ secrets.REMOTE_WORK_DIR }}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><p>上面的 <code>secrets.REMOTE_HOST</code> 等是用户自己配置在github仓库的, 这样就避免了私密信息的泄露 高阶的一些action配置(如docker部署)我暂时还没有去看</p>`,90)])])}const m=n(l,[["render",i]]);export{d as __pageData,m as default};
