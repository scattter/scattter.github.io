import{_ as s,o as n,c as a,d as l}from"./app.105f3cc6.js";const C=JSON.parse('{"title":"\u4EE3\u7406\u6A21\u5F0F","description":"","frontmatter":{},"headers":[{"level":2,"title":"1. \u57FA\u672C\u7684\u4EE3\u7406\u6A21\u5F0F","slug":"_1-\u57FA\u672C\u7684\u4EE3\u7406\u6A21\u5F0F","link":"#_1-\u57FA\u672C\u7684\u4EE3\u7406\u6A21\u5F0F","children":[]},{"level":2,"title":"2. \u4E25\u8C28\u7684\u4EE3\u7406\u6A21\u5F0F","slug":"_2-\u4E25\u8C28\u7684\u4EE3\u7406\u6A21\u5F0F","link":"#_2-\u4E25\u8C28\u7684\u4EE3\u7406\u6A21\u5F0F","children":[]}],"relativePath":"js/designPatterns/proxy/index.md","lastUpdated":1677068719000}'),p={name:"js/designPatterns/proxy/index.md"},e=l(`<h1 id="\u4EE3\u7406\u6A21\u5F0F" tabindex="-1">\u4EE3\u7406\u6A21\u5F0F <a class="header-anchor" href="#\u4EE3\u7406\u6A21\u5F0F" aria-hidden="true">#</a></h1><p>\u4EE3\u7406\u6A21\u5F0F\u662F\u6211\u4EEC\u4E0D\u76F4\u63A5\u4E0E\u76EE\u6807\u53D8\u91CF\u8FDB\u884C\u4EA4\u4E92, \u800C\u662F\u4E0E\u76EE\u6807\u53D8\u91CF\u7684\u4EE3\u7406\u8FDB\u884C\u4EA4\u4E92. \u8FD9\u91CC\u7684\u4EA4\u4E92\u65B9\u5411\u6709\u70B9\u7C7B\u4F3C\u5355\u4F8B\u6A21\u5F0F, \u4F46\u662F\u4EE3\u7406\u6A21\u5F0F\u76F8\u6BD4\u4E8E\u5355\u4F8B\u6A21\u5F0F\u53EF\u4EE5\u589E\u52A0\u8BB8\u591A\u81EA\u5B9A\u4E49\u529F\u80FD, \u6BD4\u5982\u4E00\u4E9B\u5C5E\u6027\u7684\u6821\u9A8C, \u989D\u5916\u4FE1\u606F\u7684\u8FD4\u56DE\u7B49. \u8FD9\u91CC\u6211\u4EEC\u8BB2\u7684\u4EE3\u7406\u6A21\u5F0F\u4E3B\u8981\u662F\u57FA\u4E8E<code>Proxy</code> \u5B9E\u73B0(\u5982Vue3\u7684\u54CD\u5E94\u5F0F).</p><h2 id="_1-\u57FA\u672C\u7684\u4EE3\u7406\u6A21\u5F0F" tabindex="-1">1. \u57FA\u672C\u7684\u4EE3\u7406\u6A21\u5F0F <a class="header-anchor" href="#_1-\u57FA\u672C\u7684\u4EE3\u7406\u6A21\u5F0F" aria-hidden="true">#</a></h2><p>\u5728\u8FD9\u91CC\u6211\u4EEC\u5148\u5C55\u793A\u6700\u57FA\u672C\u7684\u4EE3\u7406\u6A21\u5F0F</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> foo </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">foo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">get</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">value</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">name</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> proxy </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Proxy</span><span style="color:#A6ACCD;">(foo</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">get</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">target</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">p</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">receiver</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">proxy value is ----- </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">target[p]</span><span style="color:#89DDFF;">}\`</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">target</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">p</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// proxy value is ----- foo</span></span>
<span class="line"><span style="color:#A6ACCD;">proxy</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> bar </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">bar</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">Object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setPrototypeOf</span><span style="color:#A6ACCD;">(bar</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> proxy)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// proxy value is ----- foo</span></span>
<span class="line"><span style="color:#A6ACCD;">bar</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>\u5728\u4E0A\u9762\u4EE3\u7801\u6211\u4EEC\u53EF\u4EE5\u770B\u5230, \u8BBE\u5B9A<code>bar</code> \u5BF9\u8C61\u7684proxy\u4E3A\u4E0A\u9762\u5B9A\u4E49\u7684, \u8FDB\u800C<code>bar</code> \u7EE7\u627F<code>foo</code> \u51FD\u6570\u91CC\u9762\u7684<code>value</code> \u5C5E\u6027. \u4F46\u662F\u8FD9\u6837\u8BBE\u5B9A\u540E, <code>bar.value</code> \u7684\u503C\u5374\u6307\u5411\u4E86<code>foo</code> \u7684<code>name</code> \u5C5E\u6027.</p><p>\u6211\u4EEC\u53EF\u4EE5\u5173\u6CE8\u5230<code>proxy</code> \u7684<code>get</code> \u65B9\u6CD5\u6709\u4E00\u4E2A<code>receiver</code> \u53C2\u6570, \u800C\u8FD9\u4E5F\u5C31\u662F\u4E0B\u9762\u66F4\u4E25\u8C28\u7684\u5199\u6CD5\u7684\u5173\u952E\u70B9.</p><h2 id="_2-\u4E25\u8C28\u7684\u4EE3\u7406\u6A21\u5F0F" tabindex="-1">2. \u4E25\u8C28\u7684\u4EE3\u7406\u6A21\u5F0F <a class="header-anchor" href="#_2-\u4E25\u8C28\u7684\u4EE3\u7406\u6A21\u5F0F" aria-hidden="true">#</a></h2><blockquote><p>\u53C2\u8003\u90E8\u5206\u6587\u7AE0: <a href="https://www.zhihu.com/question/460133198" target="_blank" rel="noreferrer">https://www.zhihu.com/question/460133198</a></p></blockquote><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> foo </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">foo</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">get</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">value</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">name</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> proxy </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Proxy</span><span style="color:#A6ACCD;">(foo</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">get</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">target</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">p</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">receiver</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">proxy value is ----- </span><span style="color:#89DDFF;">\${</span><span style="color:#82AAFF;">Reflect</span><span style="color:#A6ACCD;">(target</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> p</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> receiver)</span><span style="color:#89DDFF;">}\`</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Reflect</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">target</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">p</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">receiver</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// proxy value is ----- foo</span></span>
<span class="line"><span style="color:#A6ACCD;">proxy</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> bar </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">bar</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">Object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setPrototypeOf</span><span style="color:#A6ACCD;">(bar</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> proxy)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// proxy value is ----- bar</span></span>
<span class="line"><span style="color:#A6ACCD;">bar</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>\u53EF\u4EE5\u770B\u5230, \u5728\u4E0A\u9762\u7684<code>get</code> \u65B9\u6CD5\u4E2D\u6211\u4EEC\u4F7F\u7528\u4E86<code>Reflect</code> \u53CD\u5C04\u8FDB\u884C\u6570\u636E\u7684\u83B7\u53D6. \u867D\u7136\u4E0A\u9762\u4EE3\u7801\u4E2D\u53EA\u52AB\u6301\u4E86\u6570\u636E\u7684<code>get</code> \u65B9\u6CD5, \u4F46\u662F\u5F00\u53D1\u4E2D\u53EF\u80FD\u6709\u8BB8\u591A\u5176\u4ED6\u7684\u65B9\u6CD5, \u6BD4\u5982<code>ownKeys</code>, <code>has</code>, <code>Reflect</code> \u4E2D\u5DF2\u7ECF\u5E2E\u6211\u4EEC\u5B9A\u4E49\u597D\u4E86\u8FD9\u4E9B\u65B9\u6CD5, \u6211\u4EEC\u4E0D\u7528\u518D\u81EA\u5DF1\u5199, \u6240\u4EE5\u66F4\u63A8\u8350\u7EDF\u4E00\u7528<code>Reflect</code> \u65B9\u6CD5\u8FDB\u884C\u6570\u636E\u7684\u83B7\u53D6.</p><p>\u9664\u6B64\u4E4B\u5916, \u6211\u4EEC\u89C2\u5BDF\u5230<code>Reflect</code> \u540E\u9762\u4F20\u5165\u4E86\u7B2C\u4E09\u4E2A\u53C2\u6570<code>receiver</code> , \u6B63\u662F\u8FD9\u4E2A\u53C2\u6570\u4F7F\u5F97\u6211\u4EEC\u83B7\u53D6\u5230\u4E86<code>bar</code> \u5BF9\u8C61\u81EA\u5DF1\u7684<code>value</code> \u503C. \u52A0\u4E0A\u8FD9\u4E2A\u53C2\u6570, <code>Reflect</code> \u65B9\u6CD5\u624D\u77E5\u9053<code>this</code> \u7684\u6307\u5411, \u627E\u5230\u6B63\u786E\u7684\u5C5E\u6027\u503C.</p><p>\u5728MDN\u4E0A\u5BF9<code>receiver</code> \u662F\u8FD9\u4E48\u63CF\u8FF0\u7684(<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get" target="_blank" rel="noreferrer">\u539F\u6587\u8FD9\u91CC</a>)</p><blockquote><p>\u5982\u679C<code>target</code>\u5BF9\u8C61\u4E2D\u6307\u5B9A\u4E86<code>getter</code>\uFF0C<code>receiver</code>\u5219\u4E3A<code>getter</code>\u8C03\u7528\u65F6\u7684<code>this</code>\u503C\u3002</p></blockquote><p>\u7531\u6B64\u6211\u4EEC\u53EF\u4EE5\u77E5\u9053, <code>bar</code> \u5BF9\u8C61\u7EE7\u627F\u4E86<code>foo</code> \u5BF9\u8C61\u7684\u65B9\u6CD5, \u5728\u83B7\u53D6<code>value</code> \u503C\u7684\u65F6\u5019<code>this</code> \u6307\u5411\u7684\u662F\u8C03\u7528\u7684\u5730\u65B9, \u5373<code>bar</code> \u672C\u8EAB, \u8FDB\u800C\u5F97\u5230\u6B63\u786E\u7684\u503C.</p>`,15),o=[e];function c(r,t,D,y,F,i){return n(),a("div",null,o)}const b=s(p,[["render",c]]);export{C as __pageData,b as default};
