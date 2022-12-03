import{_ as l,o as s,c as e,a}from"./app.e7d93f92.js";const g=JSON.parse('{"title":"\u7269\u7406\u673A\u5B89\u88C5Linux\u540C\u65F6\u5B9E\u73B0\u5185\u7F51\u7A7F\u900F","description":"","frontmatter":{},"headers":[{"level":2,"title":"1. \u5B89\u88C5Centos","slug":"_1-\u5B89\u88C5centos","link":"#_1-\u5B89\u88C5centos","children":[]},{"level":2,"title":"2. \u83B7\u53D6\u514D\u8D39\u57DF\u540D(\u975E\u5FC5\u987B)","slug":"_2-\u83B7\u53D6\u514D\u8D39\u57DF\u540D-\u975E\u5FC5\u987B","link":"#_2-\u83B7\u53D6\u514D\u8D39\u57DF\u540D-\u975E\u5FC5\u987B","children":[]},{"level":2,"title":"3. Cloudflare\u914D\u7F6E","slug":"_3-cloudflare\u914D\u7F6E","link":"#_3-cloudflare\u914D\u7F6E","children":[]},{"level":2,"title":"4. \u5185\u7F51\u7A7F\u900F(web\u548Cssh)","slug":"_4-\u5185\u7F51\u7A7F\u900F-web\u548Cssh","link":"#_4-\u5185\u7F51\u7A7F\u900F-web\u548Cssh","children":[]}],"relativePath":"devops/others/\u7269\u7406\u673A\u5B89\u88C5Linux\u540C\u65F6\u5B9E\u73B0\u5185\u7F51\u7A7F\u900F.md","lastUpdated":1670080292000}'),n={name:"devops/others/\u7269\u7406\u673A\u5B89\u88C5Linux\u540C\u65F6\u5B9E\u73B0\u5185\u7F51\u7A7F\u900F.md"},o=a(`<h1 id="\u7269\u7406\u673A\u5B89\u88C5linux\u540C\u65F6\u5B9E\u73B0\u5185\u7F51\u7A7F\u900F" tabindex="-1">\u7269\u7406\u673A\u5B89\u88C5Linux\u540C\u65F6\u5B9E\u73B0\u5185\u7F51\u7A7F\u900F <a class="header-anchor" href="#\u7269\u7406\u673A\u5B89\u88C5linux\u540C\u65F6\u5B9E\u73B0\u5185\u7F51\u7A7F\u900F" aria-hidden="true">#</a></h1><p>\u53BB\u5E74\u6362\u5DE5\u4F5C(2021)\u540E, \u7531\u4E8E\u4E00\u76F4\u5BF9\u524D\u516C\u53F8\u7684mac\u7CFB\u7EDF\u5FF5\u5FF5\u4E0D\u5FD8, \u6240\u4EE5\u81EA\u5DF1\u5728\u7F51\u4E0A\u4E70\u4E86\u4E00\u4E2A\u5C0F\u4E3B\u673A, \u642D\u5EFA\u4E86\u4E00\u4E2A\u9ED1\u82F9\u679C\u73A9\u4E86\u73A9, \u540E\u9762\u56E0\u4E3A\u65B0\u516C\u53F8\u6709\u7B14\u8BB0\u672C\u7535\u8111, \u7136\u540E\u56E0\u4E3A\u5C0F\u4E3B\u673A\u786E\u5B9E\u4E0D\u65B9\u4FBF\u5B9E\u7528, \u6240\u4EE5\u81EA\u5DF1\u4E5F\u4E70\u4E86\u65B0\u7535\u8111, \u8FD9\u4E2A\u4E3B\u673A\u5C31\u7A7A\u7F6E\u5728\u8FD9\u91CC\u4E86.</p><p>\u6700\u8FD1\u60F3\u7740\u8BE5\u7535\u8111\u653E\u7740\u4E5F\u662F\u653E\u7740, \u800C\u6B63\u597D\u73B0\u5728\u81EA\u5DF1\u641E\u4E86\u4E00\u4E2A\u9879\u76EE, \u9700\u8981\u90E8\u7F72\u5F88\u5360\u7528\u5185\u5B58\u7684gitlab, \u6240\u4EE5\u5C31\u60F3\u7740\u5148\u5C06\u5176\u505A\u6210\u4E00\u4E2A\u670D\u52A1\u5668, \u5728\u4E0A\u9762\u8DD1\u4E00\u4E9B\u81EA\u5DF1\u7684\u670D\u52A1\u5229\u7528\u8D77\u6765, \u540E\u9762\u6709\u81EA\u5DF1\u623F\u5B50\u4E86\u518D\u8BF4\u642D\u5EFA\u8F6F\u8DEF\u7531\u7684\u4E8B\u60C5.</p><blockquote><p>\u672C\u6587\u5185\u5BB9\u53C2\u8003UP\u4E3B: <strong><a href="https://space.bilibili.com/326987957" target="_blank" rel="noreferrer">\u96F6\u590F\u7684\u5929\u7A7A </a></strong> \u89C6\u9891\u5B9E\u6218\u6574\u7406\u800C\u6210</p><p>\u5176\u4ED6\u53C2\u8003\u8D44\u6599</p><p><a href="https://blog.csdn.net/klo220/article/details/114251913" target="_blank" rel="noreferrer">https://blog.csdn.net/klo220/article/details/114251913</a></p><p><a href="https://learnku.com/articles/39879" target="_blank" rel="noreferrer">https://learnku.com/articles/39879</a></p><p><a href="https://lxnchan.cn/cf-tunnel.html" target="_blank" rel="noreferrer">https://lxnchan.cn/cf-tunnel.html</a></p><p><a href="https://www.modb.pro/db/523813" target="_blank" rel="noreferrer">https://www.modb.pro/db/523813</a></p></blockquote><h2 id="_1-\u5B89\u88C5centos" tabindex="-1">1. \u5B89\u88C5Centos <a class="header-anchor" href="#_1-\u5B89\u88C5centos" aria-hidden="true">#</a></h2><ol><li>\u4E0B\u8F7D\u7CFB\u7EDF</li></ol><p>\u955C\u50CF\u53EF\u4EE5\u53BB\u7F51\u4E0A\u641C\u7D22, \u963F\u91CC\u4E91\u7684\u548C\u6E05\u534E\u955C\u50CF\u90FD\u53EF\u4EE5, \u6211\u81EA\u5DF1\u5C1D\u8BD5\u5982\u679C\u4F7F\u75285G\u70ED\u70B9(4G\u5957\u9910)\u4E0B\u8F7D\u6E05\u534E\u955C\u50CF\u53EF\u4EE5\u8FBE\u5230\u6050\u6016\u768432M/s\u7684\u901F\u5EA6. \u4EE5<code>CentOS-7-x86_64-DVD-2207-02</code> \u4E3A\u4F8B, \u6211\u4E0B\u8F7D\u4E0B\u6765\u53EA\u7528\u4E86\u4E24\u5206\u949F</p><ul><li>\u6E05\u534E\u6E90 <ul><li><a href="https://mirrors.tuna.tsinghua.edu.cn/centos/7/isos/x86_64/" target="_blank" rel="noreferrer">https://mirrors.tuna.tsinghua.edu.cn/centos/7/isos/x86_64/</a></li></ul></li><li>\u963F\u91CC\u4E91\u6E90 <ul><li><a href="https://mirrors.aliyun.com/centos/7/isos/x86_64/" target="_blank" rel="noreferrer">https://mirrors.aliyun.com/centos/7/isos/x86_64/</a></li></ul></li></ul><ol start="2"><li>\u5236\u4F5C\u542F\u52A8\u76D8</li></ol><p>\u8BB8\u591A\u4EBA\u63A8\u835032G\u4EE5\u4E0A\u5927\u5C0FU\u76D8, \u5B9E\u6D4B\u4F7F\u752816G\u4E5F\u80FD\u6B63\u5E38\u5B89\u88C5, \u53C8\u56E0\u4E3A\u6709windows\u548Cmac os\u4E0D\u540C\u7CFB\u7EDF, \u6240\u4EE5\u5206\u4E3A\u4E24\u79CD\u5236\u4F5C\u65B9\u6CD5</p><ul><li><p>windows</p><ul><li>\u4F7F\u7528<code>UrtaISO</code>\u8F6F\u4EF6\u8FDB\u884C\u64CD\u4F5C, \u8FD9\u91CC\u7684\u8BE6\u7EC6\u64CD\u4F5C\u53EF\u4EE5\u76F4\u63A5\u641C\u7D22, GUI\u5F0F\u64CD\u4F5C</li></ul></li><li><p>mac os (\u4F7F\u7528\u547D\u4EE4\u884C\u8FDB\u884C\u64CD\u4F5C)</p><ul><li><p>\u9996\u5148\u4F7F\u7528<code>diskutil list</code>\u547D\u4EE4\u67E5\u770B\u5206\u533A, \u786E\u5B9A\u81EA\u5DF1\u7684U\u76D8\u662F\u54EA\u4E2A, \u5982<code>/dev/disk4</code></p></li><li><p>\u786E\u5B9A\u540E\u4F7F\u7528\u547D\u4EE4 <code>diskutil unmountDisk</code> \u5378\u8F7D U \u76D8\u7684\u6302\u8F7D</p></li><li><p>\u8FDB\u5165\u5230 iso \u6587\u4EF6\u6240\u5728\u7684\u76EE\u5F55\uFF0C\u4F7F\u7528\u547D\u4EE4 <code>dd</code> \u628A CentOS ISO \u5199\u5165\u5230 U \u76D8, \u6BD4\u5982\u6211\u5C06\u955C\u50CF\u4E0B\u8F7D\u5230\u684C\u9762\u4E0A, name\u6267\u884C\u547D\u4EE4\u5C31\u662F<code>/Users/zhangke/Desktop</code> \u548C <code>sudo dd if=CentOS-7-x86_64-DVD-2207-02.iso of=/dev/rdisk4 bs=2m</code> . \u5728\u5DE6\u8FB9\u7684\u547D\u4EE4\u884C\u91CC\u9762<code>if</code> \u548C<code>of</code> \u662F\u8F93\u5165\u548C\u8F93\u51FA, <code>bs</code> \u662F\u5757\u7684\u5927\u5C0F, \u548C\u955C\u50CF\u8BFB\u53D6\u901F\u5EA6\u6709\u5173, \u4F46\u662F\u4E5F\u4E0D\u80FD\u592A\u5927, <code>/dev/rdisk4</code> \u91CC\u9762\u591A\u4E86\u4E00\u4E2A<code>r</code> \u662F\u4F7F\u7528\u4E86U\u7684\u539F\u59CB\u8BFB\u53D6\u6A21\u5F0F, \u6CA1\u6709\u4F7F\u7528\u7F13\u5B58, \u8FD9\u6837\u901F\u5EA6\u4F1A\u66F4\u5FEB</p><blockquote><p><em>\u5199\u5165\u9700\u8981\u82B1\u8D39\u51E0\u5206\u949F\u65F6\u95F4\uFF0C\u671F\u95F4\u53EF\u4EE5\u4F7F\u7528 CTRL + T \u6765\u67E5\u770B\u5199\u5165\u8FDB\u5EA6</em></p></blockquote></li><li><p>\u4E0A\u9762\u547D\u4EE4\u6267\u884C\u5B8C\u540E, \u4F7F\u7528\u547D\u4EE4 <code>diskutil eject</code> \u5F39\u51FA U \u76D8, \u8FDB\u884C\u540E\u7EED\u6B65\u9AA4</p></li></ul></li></ul><ol start="3"><li>\u5B89\u88C5\u7CFB\u7EDF</li></ol><ul><li>\u6839\u636E\u4E3B\u677F\u7684\u4E0D\u540C\u6309\u76F8\u5E94\u7684\u952E\u8FDBbois\u7CFB\u7EDF, \u8BBE\u7F6E\u4F7F\u7528U\u76D8\u542F\u52A8</li><li>\u8FDB\u53BBU\u76D8\u542F\u52A8\u9875\u9762\u540E\u9009\u62E9<code>Centos 7...</code> \u7684\u9009\u9879\u8FDB\u884C\u5B89\u88C5</li><li>\u8FDB\u5165\u5B89\u88C5\u9875\u9762 <ul><li>\u8BBE\u7F6E\u65F6\u95F4</li><li>\u8BBE\u7F6E\u7F51\u7EDC</li><li>\u8BBE\u7F6E\u5B89\u88C5\u78C1\u76D8</li><li>\u8BBE\u7F6E\u5B89\u88C5\u6A21\u5F0F(\u53EF\u4EE5\u9009\u62E9\u684C\u9762\u6A21\u5F0F)</li><li>\u8BBE\u7F6E\u5B8C\u4E0A\u9762\u6B65\u9AA4\u540E\u4F1A\u8FDB\u5165\u6309\u7167\u6D41\u7A0B, \u5728\u5B89\u88C5\u6D41\u7A0B\u4E2D\u53EF\u4EE5\u8BBE\u7F6E\u9ED8\u8BA4\u7528\u6237\u548C\u5BC6\u7801</li></ul></li><li>\u5B89\u88C5\u8BFB\u6761\u5B8C\u6BD5, \u62D4\u6389U\u76D8, \u4E3B\u673A\u91CD\u542F\u8F7D\u5165\u7CFB\u7EDF, \u8FDB\u884C\u540E\u7EED\u6B65\u9AA4</li></ul><h2 id="_2-\u83B7\u53D6\u514D\u8D39\u57DF\u540D-\u975E\u5FC5\u987B" tabindex="-1">2. \u83B7\u53D6\u514D\u8D39\u57DF\u540D(\u975E\u5FC5\u987B) <a class="header-anchor" href="#_2-\u83B7\u53D6\u514D\u8D39\u57DF\u540D-\u975E\u5FC5\u987B" aria-hidden="true">#</a></h2><p>\u8FD9\u91CC\u4F7F\u7528\u4E86<code>freenom</code> \u57DF\u540D\u5546\u63D0\u4F9B\u7684\u514D\u8D39\u57DF\u540D</p><p><img src="https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221203214500791.png" alt="image-20221203214500791"></p><ul><li>\u57DF\u540D\u8D2D\u4E70 <ul><li>\u68C0\u67E5\u610F\u5411\u57DF\u540D\u6709\u65E0\u88AB\u5360\u7528\u4EE5\u53CA\u662F\u5426\u53EF\u4EE5\u514D\u8D39\u83B7\u53D6, \u7B26\u5408\u6761\u4EF6\u5C31\u53EF\u4EE5\u70B9\u51FB<code>Get it now!</code> \u6309\u94AE\u52A0\u5165\u8D2D\u7269\u8F66\u8FDB\u884C\u767B\u5F55\u8D2D\u4E70(\u8D2D\u4E70\u8FC7\u7A0B\u4E2D\u9700\u8981\u8FDB\u884C\u767B\u5F55\u548C\u90AE\u7BB1\u9A8C\u8BC1, \u8D2D\u4E70\u6210\u529F\u540E\u6709\u4E00\u5B9A\u7684\u5EF6\u65F6)</li></ul></li></ul><p><img src="https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221203214640228.png" alt="image-20221203214640228"></p><ul><li><p>\u57DF\u540D\u8BBE\u7F6E</p><ul><li>\u57DF\u540D\u8D2D\u4E70\u6210\u529F\u540E\u8FDB\u5165\u7BAD\u5934\u5904\u7684\u57DF\u540D\u7BA1\u7406\u9875\u9762\u8FDB\u884C\u914D\u7F6E</li></ul><p><img src="https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221203215516544.png" alt="image-20221203215516544"></p><p>\u57DF\u540D\u5217\u8868, \u70B9\u51FB\u7BAD\u5934\u5904\u8FDB\u884C\u914D\u7F6E</p><p><img src="https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221203215649420.png" alt="image-20221203215649420"></p><p>\u8BBE\u7F6Edns(\u8FD9\u91CC\u662F\u548C\u540E\u7EED<code>Cloudflare</code> \u914D\u7F6E\u4F7F\u7528\u7684, \u5C06\u57DF\u540D\u7684dns\u4EE3\u7406\u5230<code>Cloudflare</code> \u4E0A)</p><p><img src="https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221203220009190.png" alt="image-20221203220009190"></p></li></ul><h2 id="_3-cloudflare\u914D\u7F6E" tabindex="-1">3. Cloudflare\u914D\u7F6E <a class="header-anchor" href="#_3-cloudflare\u914D\u7F6E" aria-hidden="true">#</a></h2><ul><li>\u6CE8\u518C\u767B\u5F55</li></ul><p><img src="https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221203222638693.png" alt="image-20221203222638693"></p><ul><li>\u914D\u7F6E\u7AD9\u70B9, \u5C06\u4E0A\u4E00\u6B65\u83B7\u53D6\u7684\u57DF\u540D\u6DFB\u52A0\u8FDB\u6765, \u9009\u62E9\u514D\u8D39\u5957\u9910, \u7136\u540E\u5C06\u4E0B\u9762\u7684\u670D\u52A1\u5668\u5730\u5740\u7C98\u8D34\u5230\u5230freenom\u7684\u57DF\u540D\u914D\u7F6E<code>Nameserver</code> \u4E0A</li></ul><p><img src="https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221203221314540.png" alt="image-20221203221314540"></p><p><code>Cloudflare</code> \u7684\u89E3\u6790\u670D\u52A1\u5668</p><p><img src="https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20221203223123106.png" alt="image-20221203223123106"></p><h2 id="_4-\u5185\u7F51\u7A7F\u900F-web\u548Cssh" tabindex="-1">4. \u5185\u7F51\u7A7F\u900F(web\u548Cssh) <a class="header-anchor" href="#_4-\u5185\u7F51\u7A7F\u900F-web\u548Cssh" aria-hidden="true">#</a></h2><ol><li>\u670D\u52A1\u7AEF\u542F\u52A8\u4E00\u4E2Aweb\u670D\u52A1</li></ol><p>\u542F\u52A8\u8BE5\u670D\u52A1\u4E3B\u8981\u662F\u4E3A\u4E86\u9A8C\u8BC1\u540E\u9762\u662F\u5426\u53EF\u4EE5\u5728\u5916\u7F51\u6B63\u5E38\u8BBF\u95EE, \u542F\u52A8web\u670D\u52A1\u6709\u4E24\u79CD\u65B9\u5F0F</p><ul><li>\u5B9D\u5854\u9762\u677F\u542F\u52A8 <ul><li>\u5728\u5B9D\u5854\u5B98\u7F51\u4F7F\u7528\u914D\u7F6E\u547D\u4EE4\u8FDB\u884C\u9762\u677F\u5B89\u88C5, \u7136\u540E\u5728\u7AD9\u70B9\u5904\u4F7F\u7528PHP\u65B0\u5EFA\u4E00\u4E2A\u7AD9\u70B9, \u7AEF\u53E3\u53EF\u81EA\u884C\u8BBE\u7F6E</li><li>\u8BBE\u7F6E\u7AD9\u70B9\u540E\u4F7F\u7528\u5185\u7F51\u8BBF\u95EE, \u5982\u679C\u8BBF\u95EE\u6210\u529F\u5373\u90E8\u7F72\u6210\u529F, \u53EF\u4F9B\u540E\u9762\u8FDB\u884C\u5185\u7F51\u7A7F\u900F\u9A8C\u8BC1</li></ul></li><li>\u81EA\u884C\u642D\u5EFA <ul><li>\u624B\u52A8\u5B89\u88C5nginx\u6216\u8005docker\u542F\u52A8nginx</li></ul></li></ul><ol start="2"><li>\u670D\u52A1\u7AEF\u5B89\u88C5<code>Cloudflare</code></li></ol><ul><li><p>\u9996\u5148\u8FDB\u5165root\u8D26\u6237\uFF0C\u80FD\u591F\u83B7\u53D6root\u6743\u9650\u5B89\u88C5</p></li><li><p>\u914D\u7F6Eyum-utils</p><ul><li><code>yum install yum-utils</code></li></ul></li><li><p>\u6DFB\u52A0 <code>cloudflared.repo</code> \u5230 <code>config-manager</code></p><ul><li><code>yum-config-manager --add-repo https://pkg.cloudflare.com/cloudflared-ascii.repo</code></li></ul></li><li><p>\u5B89\u88C5 <code>cloudflared</code></p><ul><li><code>yum install cloudflared</code></li></ul></li></ul><ol start="3"><li>\u767B\u5F55<code>Cloudflare</code></li></ol><ul><li>\u8FD0\u884C\u547D\u4EE4\u884C\u767B\u5F55 <ul><li>\u8FD0\u884C<code>cloudflared tunnel login</code></li></ul></li><li>\u9A8C\u8BC1 <ul><li>\u6267\u884C\u4E0A\u9762\u547D\u4EE4\u540E\u4F1A\u5F39\u51FA\u6765\u4E00\u4E2AURL\uFF0C\u7528\u6D4F\u89C8\u5668\u6253\u5F00\uFF0C\u767B\u5F55\u6210\u529F\u540E\u5173\u95ED\u6D4F\u89C8\u5668\uFF0C\u518D\u6B21\u6253\u5F00URL\uFF0C\u8FD9\u65F6\u5019\u4F1A\u51FA\u73B0\u6388\u6743\u9875\u9762\uFF0C\u7136\u540E\u9009\u62E9\u4F60\u60F3\u7528\u6765\u505A\u5185\u7F51\u7A7F\u900F\u7684\u57DF\u540D\u6388\u6743\u5373\u53EF\u3002</li><li>\u6210\u529F\u540E\u4F1A\u751F\u6210\u8BC1\u4E66\uFF0C\u653E\u7F6E\u4E8E<code>~/cloudflared/cert.pem</code>\u4E2D\u3002</li></ul></li></ul><ol start="4"><li>\u5EFA\u7ACB\u96A7\u9053</li></ol><ul><li><p>\u521B\u5EFA\u96A7\u9053(\u540D\u5B57\u53EF\u4EE5\u968F\u610F\u8D77)</p><ul><li>cloudflared tunnel create &lt;\u96A7\u9053\u540D\u79F0&gt;</li><li>\u4F8B\u5B50\uFF1A<code>cloudflared tunnel create test</code></li><li>\u6210\u529F\u540E\u4F1A\u63D0\u793A\uFF0C\u76F8\u5173\u51ED\u8BC1\u5DF2\u653E\u7F6E\u4E8E<code>~/.cloudflared/&lt;Tunnel-UUID&gt;.json</code>\u4E2D\u3002</li></ul></li><li><p>\u9A8C\u8BC1\u662F\u5426\u5DF2\u7ECF\u521B\u5EFA\u6210\u529F</p><ul><li><code>cloudflared tunnel list</code></li><li>\u8BE5\u547D\u4EE4\u884C\u4F1A\u5C55\u793A\u6240\u6709\u672C\u673A\u7684\u96A7\u9053</li></ul></li></ul><ol start="5"><li>\u65B0\u5EFA Tunnel \u5BF9\u5E94\u7684 DNS \u8BB0\u5F55, \u5728\u8FDC\u7AEF\u65B0\u589E\u89E3\u6790</li></ol><blockquote><p>\u6210\u529F\u540E\u4F1A\u521B\u5EFACNAME\u8BB0\u5F55\u5C06\u57DF\u540D\u6307\u5411\u96A7\u9053\uFF0C\u56DE\u5230Cloudflare\u7F51\u7AD9\uFF0C\u70B9\u51FB\u57DF\u540D\uFF0C\u70B9\u51FB\u5DE6\u8FB9\u7684DNS\uFF0C\u80FD\u770B\u5230\u51FA\u73B0\u4E00\u6761\u65B0\u7684CNAME\u7684DNS\u8BB0\u5F55\uFF0C\u6B64\u65F6\u8BC1\u660E\u89E3\u6790\u6210\u529F</p></blockquote><ul><li>\u5728\u8FDC\u7AEF\u589E\u52A0dns\u89E3\u6790 <ul><li>\u8FD0\u884C<code>cloudflared tunnel route dns &lt;\u96A7\u9053\u540D\u79F0&gt; &lt;\u57DF\u540D&gt;</code></li><li>\u4F8B\u5982: <code>cloudflared tunnel route dns test cloudfreed.tk</code></li></ul></li></ul><ol start="6"><li>\u65B0\u589E\u914D\u7F6E\u6587\u4EF6</li></ol><ul><li>\u65B0\u589E\u914D\u7F6E\u6587\u4EF6(\u5305\u62EC\u666E\u901Aweb\u548Cssh) <ul><li>\u8FD0\u884C<code>nano ~/.cloudflared/config.yml</code></li><li>\u6DFB\u52A0\u4E0B\u9762\u4EE3\u7801(\u6CE8\u610F\u4E0D\u8981\u586B\u9519), \u96A7\u9053ID\u662F\u521A\u624D\u521B\u5EFA\u7684\u96A7\u9053id, \u57DF\u540D\u5C31\u662F\u81EA\u5DF1\u60F3\u8981\u89E3\u6790\u7684\u57DF\u540D</li></ul></li></ul><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki"><code><span class="line"><span style="color:#F07178;">tunnel</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">&lt;\u96A7\u9053ID&gt;</span></span>
<span class="line"><span style="color:#F07178;">credentials-file</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/root/.cloudflared/&lt;\u96A7\u9053ID&gt;.json</span></span>
<span class="line"><span style="color:#F07178;">protocol</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">http2</span></span>
<span class="line"><span style="color:#F07178;">originRequest</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">connectTimeout</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">30s</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">noTLSVerify</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#F07178;">ingress</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">hostname</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">&lt;\u57DF\u540D&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;"># \u81EA\u5DF1\u8D2D\u4E70\u7684\u57DF\u540D</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">service</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">http://localhost:85</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;"># \u670D\u52A1\u7AEF\u542F\u52A8web\u670D\u52A1\u7684\u7AEF\u53E3</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">hostname</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ssh.xxx.xxx</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;"># \u8FD9\u91CC\u662F\u914D\u7F6Essh\u7684</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">service</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ssh://localhost:22</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">service</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">http_status:404</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><ul><li>\u6CE8\u610F\u5982\u679C\u662F\u60F3\u4F7F\u7528ssh\u670D\u52A1, \u5BA2\u6237\u7AEF\u4E5F\u9700\u8981\u767B\u5F55<code>cloudflare</code></li></ul><p>\u5728host\u91CC\u9762\u8FDB\u884C\u76F8\u5E94\u7684\u914D\u7F6E</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">Host ssh.xxx.xxx</span></span>
<span class="line"><span style="color:#A6ACCD;">  ProxyCommand /root/cloudflared access ssh --hostname %h</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>ssh\u767B\u5F55\u5C31\u53EF\u4EE5\u4F7F\u7528</p><p><code>ssh root@default.xxx.xxx </code>\u5BC6\u7801\u767B\u5F55</p><ol start="7"><li>\u914D\u7F6E\u4E3A\u7CFB\u7EDF\u670D\u52A1\u4E14\u8BBE\u7F6E\u81EA\u542F\u52A8</li></ol><ul><li>\u6CE8\u518C <ul><li><code>cloudflared service install</code> \u6CE8\u518C\u4E3A\u7CFB\u7EDF\u670D\u52A1</li></ul></li><li>\u81EA\u542F\u52A8 <ul><li><code>systemctl enable cloudflared --now</code></li></ul></li><li>\u505C\u6B62\u4E0E\u4FEE\u6539\u914D\u7F6E <ul><li>\u5982\u679C\u4FEE\u6539\u4E86\u914D\u7F6E\u9879\u6216\u8005\u589E\u52A0\u4E86\u65B0\u7684\u89E3\u6790\u6620\u5C04, name\u5C31\u9700\u8981\u505C\u6B62\u540E\u91CD\u65B0\u542F\u52A8</li><li>\u505C\u6B62\u547D\u4EE4\u4E3A<code>systemctl stop cloudflared</code></li><li>\u91CD\u65B0\u542F\u52A8</li></ul></li></ul><ol start="8"><li>\u6D4B\u8BD5\u7A7F\u900F \u8BBF\u95EE\u81EA\u5DF1\u5728\u4E0A\u9762\u914D\u7F6E\u7684\u57DF\u540D, \u9A8C\u8BC1\u662F\u5426\u53EF\u4EE5\u5F97\u5230\u6B63\u5E38\u54CD\u5E94</li></ol>`,50),t=[o];function i(p,c,r,d,u,h){return s(),e("div",null,t)}const b=l(n,[["render",i]]);export{g as __pageData,b as default};
