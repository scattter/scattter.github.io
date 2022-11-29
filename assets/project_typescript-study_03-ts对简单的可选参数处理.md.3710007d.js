import{_ as s,o as n,c as a,a as l}from"./app.02370840.js";const i=JSON.parse('{"title":"03-ts\u5BF9\u7B80\u5355\u7684\u53EF\u9009\u53C2\u6570\u5904\u7406","description":"","frontmatter":{},"headers":[{"level":2,"title":"1. \u7B80\u5355\u7684\u53EF\u9009\u53C2\u6570\u5904\u7406","slug":"_1-\u7B80\u5355\u7684\u53EF\u9009\u53C2\u6570\u5904\u7406","link":"#_1-\u7B80\u5355\u7684\u53EF\u9009\u53C2\u6570\u5904\u7406","children":[]},{"level":2,"title":"2. \u5F53\u76F8\u5173\u5BF9\u8C61\u53EF\u80FD\u4E3A\u7A7A\u65F6\u7684\u4E00\u4E9B\u5904\u7406","slug":"_2-\u5F53\u76F8\u5173\u5BF9\u8C61\u53EF\u80FD\u4E3A\u7A7A\u65F6\u7684\u4E00\u4E9B\u5904\u7406","link":"#_2-\u5F53\u76F8\u5173\u5BF9\u8C61\u53EF\u80FD\u4E3A\u7A7A\u65F6\u7684\u4E00\u4E9B\u5904\u7406","children":[]}],"relativePath":"project/typescript-study/03-ts\u5BF9\u7B80\u5355\u7684\u53EF\u9009\u53C2\u6570\u5904\u7406.md","lastUpdated":1669725595000}'),p={name:"project/typescript-study/03-ts\u5BF9\u7B80\u5355\u7684\u53EF\u9009\u53C2\u6570\u5904\u7406.md"},o=l(`<h1 id="_03-ts\u5BF9\u7B80\u5355\u7684\u53EF\u9009\u53C2\u6570\u5904\u7406" tabindex="-1">03-ts\u5BF9\u7B80\u5355\u7684\u53EF\u9009\u53C2\u6570\u5904\u7406 <a class="header-anchor" href="#_03-ts\u5BF9\u7B80\u5355\u7684\u53EF\u9009\u53C2\u6570\u5904\u7406" aria-hidden="true">#</a></h1><h2 id="_1-\u7B80\u5355\u7684\u53EF\u9009\u53C2\u6570\u5904\u7406" tabindex="-1">1. \u7B80\u5355\u7684\u53EF\u9009\u53C2\u6570\u5904\u7406 <a class="header-anchor" href="#_1-\u7B80\u5355\u7684\u53EF\u9009\u53C2\u6570\u5904\u7406" aria-hidden="true">#</a></h2><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">logger3</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">arg1</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">arg2</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">arg3</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">this is </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">arg1</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">arg2</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">arg3 </span><span style="color:#89DDFF;">??</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;&#39;}\`</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">logger3</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">123</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">456</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#82AAFF;">logger3</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">123</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">456</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">789</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="_2-\u5F53\u76F8\u5173\u5BF9\u8C61\u53EF\u80FD\u4E3A\u7A7A\u65F6\u7684\u4E00\u4E9B\u5904\u7406" tabindex="-1">2. \u5F53\u76F8\u5173\u5BF9\u8C61\u53EF\u80FD\u4E3A\u7A7A\u65F6\u7684\u4E00\u4E9B\u5904\u7406 <a class="header-anchor" href="#_2-\u5F53\u76F8\u5173\u5BF9\u8C61\u53EF\u80FD\u4E3A\u7A7A\u65F6\u7684\u4E00\u4E9B\u5904\u7406" aria-hidden="true">#</a></h2><blockquote><p>\u8865\u5145: \u53EF\u9009\u64CD\u4F5C\u7B26 ?? \u548C || \u7684\u533A\u522B</p><p>?? \u4E0D\u4F1A\u9690\u5F0F\u8F6C\u6362\u524D\u9762\u7684\u503C, \u53EA\u6709\u524D\u4E00\u4E2A\u503C\u4E3Anull\u548Cundefined, \u624D\u4F1A\u4F7F\u7528\u540E\u4E00\u4E2A\u503C</p><p>|| \u4F1A\u5BF9\u524D\u4E00\u4E2A\u503C\u8FDB\u884C\u9690\u5F0F\u8F6C\u6362, \u53EA\u8981\u8F6C\u6362\u540E\u7684\u5E03\u5C14\u503C\u4E3Afalse, \u5C31\u4F1A\u4F7F\u7528\u540E\u4E00\u4E2A\u503C</p></blockquote><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">User</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">info</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">email</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// \u5F53\u53EF\u4EE5\u786E\u5B9A\u8BE5\u503C\u4E0D\u4E3A\u7A7A\u65F6\u7684\u5904\u7406</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">getEmail</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">user</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">User</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">user</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">info</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">user</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">info</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">email</span><span style="color:#89DDFF;">!</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">no email</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// \u4F7F\u7528\u53EF\u9009\u64CD\u4F5C\u7B26\u8FDB\u884C\u76F8\u5173\u5C5E\u6027\u5224\u65AD</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">getEasyEmail</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">user</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">User</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">user</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">info</span><span style="color:#89DDFF;">?.</span><span style="color:#A6ACCD;">email</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">??</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">no email</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> user</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">User</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">ts</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">info</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#82AAFF;">getEmail</span><span style="color:#A6ACCD;">(user))</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#82AAFF;">getEasyEmail</span><span style="color:#A6ACCD;">(user))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// \u5BF9\u51FD\u6570\u53C2\u6570\u4F7F\u7528\u53EF\u9009\u64CD\u4F5C\u7B26</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">addCallback</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">x</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">y</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">callback</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">([</span><span style="color:#A6ACCD;">x</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">y</span><span style="color:#F07178;">])</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">callback</span><span style="color:#89DDFF;">?.</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div>`,6),e=[o];function r(c,t,D,F,y,C){return n(),a("div",null,e)}const b=s(p,[["render",r]]);export{i as __pageData,b as default};
