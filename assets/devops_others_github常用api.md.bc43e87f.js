import{_ as e,o as t,c as i,a as l}from"./app.eb1a6199.js";const _=JSON.parse('{"title":"Github\u5E38\u7528api","description":"","frontmatter":{},"headers":[{"level":2,"title":"1. commit\u76F8\u5173","slug":"_1-commit\u76F8\u5173","link":"#_1-commit\u76F8\u5173","children":[]},{"level":2,"title":"2. \u7528\u6237\u76F8\u5173","slug":"_2-\u7528\u6237\u76F8\u5173","link":"#_2-\u7528\u6237\u76F8\u5173","children":[]},{"level":2,"title":"3. \u516C\u5171\u53C2\u6570","slug":"_3-\u516C\u5171\u53C2\u6570","link":"#_3-\u516C\u5171\u53C2\u6570","children":[]}],"relativePath":"devops/others/github\u5E38\u7528api.md","lastUpdated":1672154620000}'),a={name:"devops/others/github\u5E38\u7528api.md"},o=l('<h1 id="github\u5E38\u7528api" tabindex="-1">Github\u5E38\u7528api <a class="header-anchor" href="#github\u5E38\u7528api" aria-hidden="true">#</a></h1><blockquote><p>github\u63A5\u53E3\u8BE6\u7EC6\u6587\u6863\u5730\u5740\u4E3A: <a href="https://docs.github.com/en/rest?apiVersion=2022-11-28" target="_blank" rel="noreferrer">https://docs.github.com/en/rest?apiVersion=2022-11-28</a></p><p>\u6301\u7EED\u66F4\u65B0...</p></blockquote><h2 id="_1-commit\u76F8\u5173" tabindex="-1">1. commit\u76F8\u5173 <a class="header-anchor" href="#_1-commit\u76F8\u5173" aria-hidden="true">#</a></h2><ul><li>\u83B7\u53D6\u5177\u4F53\u4ED3\u5E93\u7684commit\u4FE1\u606F <ul><li><code>https://api.github.com/repos/OWNER/REPO/commits</code></li><li>\u4F8B\u5B50: <code>https://api.github.com/repos/scattter/common-utils/commits</code></li></ul></li><li>\u83B7\u53D6\u5177\u4F53\u4ED3\u5E93\u7684event\u4FE1\u606F, , \u5305\u62ECpush, merge\u7B49 <ul><li><code>https://api.github.com/repos/OWNER/REPO/events</code></li><li>\u4F8B\u5B50: <code>https://api.github.com/repos/scattter/common-utils/events</code> , \u53EF\u4EE5\u901A\u8FC7\u5224\u65ADevent\u7C7B\u578B\u63D0\u53D6commit\u4FE1\u606F</li></ul></li></ul><h2 id="_2-\u7528\u6237\u76F8\u5173" tabindex="-1">2. \u7528\u6237\u76F8\u5173 <a class="header-anchor" href="#_2-\u7528\u6237\u76F8\u5173" aria-hidden="true">#</a></h2><ul><li>\u83B7\u53D6\u5177\u4F53\u7528\u6237\u7684event\u4FE1\u606F <ul><li><code>https://api.github.com/users/USERNAME/events</code></li></ul></li><li>\u83B7\u53D6\u67D0\u4E2A\u7528\u6237public\u7684event\u4FE1\u606F <ul><li><code>https://api.github.com/users/USERNAME/events/public</code></li></ul></li></ul><h2 id="_3-\u516C\u5171\u53C2\u6570" tabindex="-1">3. \u516C\u5171\u53C2\u6570 <a class="header-anchor" href="#_3-\u516C\u5171\u53C2\u6570" aria-hidden="true">#</a></h2><ul><li><code>per_page</code><ul><li>The number of results per page (max 100).</li><li>Default: 30</li></ul></li><li><code>page</code><ul><li>Page number of the results to fetch.</li><li>Default: 1</li></ul></li></ul>',8),c=[o];function s(r,h,u,d,n,p){return t(),i("div",null,c)}const b=e(a,[["render",s]]);export{_ as __pageData,b as default};
