import{_ as s,o as n,c as a,a as l}from"./app.0e1db28a.js";const A=JSON.parse('{"title":"11-ts\u4E2Dclass\u7684implement\u4E0E\u5C5E\u6027\u53EF\u89C1\u6027","description":"","frontmatter":{},"headers":[{"level":2,"title":"1. \u7C7B\u7684\u63A5\u53E3\u5B9E\u73B0","slug":"_1-\u7C7B\u7684\u63A5\u53E3\u5B9E\u73B0","link":"#_1-\u7C7B\u7684\u63A5\u53E3\u5B9E\u73B0","children":[]},{"level":2,"title":"2. \u7C7B\u7684\u63A5\u53E3\u5B9E\u73B0\u548C\u7EE7\u627F\u533A\u522B","slug":"_2-\u7C7B\u7684\u63A5\u53E3\u5B9E\u73B0\u548C\u7EE7\u627F\u533A\u522B","link":"#_2-\u7C7B\u7684\u63A5\u53E3\u5B9E\u73B0\u548C\u7EE7\u627F\u533A\u522B","children":[]}],"relativePath":"project/typescript-study/11-ts\u4E2Dclass\u7684implement\u4E0E\u5C5E\u6027\u53EF\u89C1\u6027.md","lastUpdated":1671638334000}'),p={name:"project/typescript-study/11-ts\u4E2Dclass\u7684implement\u4E0E\u5C5E\u6027\u53EF\u89C1\u6027.md"},o=l(`<h1 id="_11-ts\u4E2Dclass\u7684implement\u4E0E\u5C5E\u6027\u53EF\u89C1\u6027" tabindex="-1">11-ts\u4E2Dclass\u7684implement\u4E0E\u5C5E\u6027\u53EF\u89C1\u6027 <a class="header-anchor" href="#_11-ts\u4E2Dclass\u7684implement\u4E0E\u5C5E\u6027\u53EF\u89C1\u6027" aria-hidden="true">#</a></h1><h2 id="_1-\u7C7B\u7684\u63A5\u53E3\u5B9E\u73B0" tabindex="-1">1. \u7C7B\u7684\u63A5\u53E3\u5B9E\u73B0 <a class="header-anchor" href="#_1-\u7C7B\u7684\u63A5\u53E3\u5B9E\u73B0" aria-hidden="true">#</a></h2><p><code>interface</code> \u4E0D\u4EC5\u53EF\u4EE5\u7528\u4E8E\u5B9A\u4E49\u6570\u636E\u7C7B\u578B, \u8FD8\u53EF\u4EE5\u7528\u4E8E\u5728\u7C7B\u91CC\u9762\u5B9E\u73B0\u5176\u5B9A\u4E49\u7684\u76F8\u5173\u65B9\u6CD5.</p><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Database</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">get</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">set</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">InMemoryDataBase</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">implements</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Database</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">protected</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">db</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Record</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">get</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">db</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">id</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">set</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">db</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">id</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">value</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> myDb1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">InMemoryDataBase</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">myDb1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">lucy</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#676E95;">// because protected attribute so can&#39;t set db</span></span>
<span class="line"><span style="color:#676E95;">// myDb1.db[&#39;name&#39;] = &#39;jack&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(myDb1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">))</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>\u5982\u4E0A\u4EE3\u7801, <code>Database</code> \u91CC\u9762\u5B9A\u4E49\u4E86\u4E24\u4E2A\u65B9\u6CD5, \u4F46\u662F\u6CA1\u6709\u5177\u4F53\u5B9E\u73B0, <code>InMemoryDataBase</code> \u4F7F\u7528\`\`implements<code>\u5173\u952E\u5B57\u7EE7\u627F\u4E86</code>Database\` \u63A5\u53E3\u91CC\u9762\u7684\u65B9\u6CD5, \u968F\u540E\u5176\u8FDB\u884C\u5177\u4F53\u7684\u65B9\u6CD5\u5B9E\u73B0.</p><p>\u53EF\u4EE5\u770B\u5230, \u5728\u4E0A\u9762\u7684\u4EE3\u7801\u4E2D\u6709<code>protected db: Record&lt;string, string&gt; = {}</code> \u8FD9\u4E48\u4E00\u53E5, <code>protected</code> \u8868\u793A\u8BE5\u5C5E\u6027\u7684\u8BBF\u95EE\u4FEE\u9970\u7B26, Ts class\u4E2D\u7684\u8BBF\u95EE\u4FEE\u9970\u7B26\u6709\u4E0B\u9762\u4E09\u79CD</p><ul><li><code>public</code>\uFF1A\u516C\u5F00\u7684\uFF0C\u8C01\u90FD\u80FD\u7528\uFF08\u9ED8\u8BA4\u5C31\u662F <code>public</code>\uFF09</li><li><code>private</code>\uFF1A\u79C1\u6709\u7684\uFF0C\u4EC5\u7C7B\u81EA\u5DF1\u80FD\u4F7F\u7528\uFF0C\u5B50\u7C7B\u4E0E\u5916\u90E8\u90FD\u4E0D\u80FD\u4F7F\u7528</li><li><code>protected</code>\uFF1A\u53D7\u4FDD\u62A4\u7684\uFF0C\u4EC5\u7C7B\u548C\u7C7B\u7684\u5B50\u7C7B\u80FD\u4F7F\u7528\uFF0C\u5916\u90E8\u4E0D\u80FD\u4F7F\u7528</li></ul><p>\u56E0\u6B64, \u5728\u4E0A\u9762\u7684\u4F8B\u5B50\u4E2D, \u56E0\u4E3A<code>db</code> \u4F7F\u7528\u4E86 <code>protected</code> \u4FEE\u9970\u7B26, \u6240\u4EE5 <code>myDb1.db[&#39;name&#39;] = &#39;jack&#39;</code> \u4E0D\u80FD\u6B63\u5E38\u6267\u884C, \u53EA\u80FD\u901A\u8FC7\u7C7B\u672C\u8EAB\u6216\u8005\u5B50\u7C7B\u5185\u90E8\u8C03\u7528.</p><p>\u6269\u5C55:</p><p>Ts\u4E2D\u7684\u4FEE\u9970\u7B26\u9664\u4E86\u8BBF\u95EE\u4FEE\u9970\u7B26, \u8FD8\u6709\u53EA\u8BFB\u4FEE\u9970\u7B26, \u9759\u6001\u4FEE\u9970\u7B26, \u8FD9\u4E09\u4E2A\u7EDF\u79F0\u4E3A\u4FEE\u9970\u7B26.</p><ul><li>\u53EA\u8BFB\u4FEE\u9970\u7B26 <code>readonly</code></li></ul><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Person</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">readonly</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Alice</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul><li>\u9759\u6001\u4FEE\u9970\u7B26 static</li></ul><p><code>static</code>, \u9759\u6001\u7684. \u901A\u8FC7<code>static</code>\u4FEE\u9970\u7684\u6210\u5458\u53EB<strong>\u9759\u6001\u6210\u5458</strong>\uFF0C\u9759\u6001\u6210\u5458\u65E0\u9700\u5B9E\u4F8B\u5316\uFF0C\u76F4\u63A5\u901A\u8FC7\u7C7B\u540D\u8C03\u7528</p><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Person</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">static</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">98</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(person</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">a)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u9759\u6001\u6210\u5458\u901A\u5E38\u7528\u4E8E\u6574\u4E2A\u7C7B\u6240\u5171\u6709\u7684\u4E00\u4E9B\u4E1C\u897F, \u8BE5\u9759\u6001\u4FEE\u9970\u7B26\u5728\u540E\u9762\u6587\u7AE0<strong>13\u8282</strong>\u91CC\u9762\u6709\u793A\u4F8B\u4EE3\u7801</p><h2 id="_2-\u7C7B\u7684\u63A5\u53E3\u5B9E\u73B0\u548C\u7EE7\u627F\u533A\u522B" tabindex="-1">2. \u7C7B\u7684\u63A5\u53E3\u5B9E\u73B0\u548C\u7EE7\u627F\u533A\u522B <a class="header-anchor" href="#_2-\u7C7B\u7684\u63A5\u53E3\u5B9E\u73B0\u548C\u7EE7\u627F\u533A\u522B" aria-hidden="true">#</a></h2><p>\u5728\u7B2C\u4E00\u90E8\u5206\u7C7B\u4F7F\u7528\u4E86<code>implements</code> \u8FDB\u884C<code>interface</code> \u7684\u5B9E\u73B0, \u672C\u90E8\u5206\u4F7F\u7528\u4E86<code>extends</code> \u548C <code>implements</code> \u4E00\u8D77\u65B0\u5EFA\u4E00\u4E2A\u7C7B.</p><p>\u5173\u4E8E<code>extends</code> \u548C <code>implements</code>\u7684\u5B9A\u4E49</p><ul><li><p><code>implements</code> : \u5B9E\u73B0\uFF0C\u4E00\u4E2A\u65B0\u7684\u7C7B\uFF0C\u4ECE\u7236\u7C7B\u6216\u8005\u63A5\u53E3\u5B9E\u73B0\u6240\u6709\u7684\u5C5E\u6027\u548C\u65B9\u6CD5\uFF0C\u540C\u65F6\u53EF\u4EE5\u91CD\u5199\u5C5E\u6027\u548C\u65B9\u6CD5\uFF0C\u5305\u542B\u4E00\u4E9B\u65B0\u7684\u529F\u80FD</p></li><li><p><code> extends</code> : \u7EE7\u627F\uFF0C\u4E00\u4E2A\u65B0\u7684\u63A5\u53E3\u6216\u8005\u7C7B\uFF0C\u4ECE\u7236\u7C7B\u6216\u8005\u63A5\u53E3\u7EE7\u627F\u6240\u6709\u7684\u5C5E\u6027\u548C\u65B9\u6CD5\uFF0C\u4E0D\u53EF\u4EE5\u91CD\u5199\u5C5E\u6027\uFF0C\u4F46\u53EF\u4EE5\u91CD\u5199\u65B9\u6CD5</p></li></ul><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Persistable</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">saveToString</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">restoreFromString</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">storeState</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MyDB</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">InMemoryDataBase</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">implements</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Persistable</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">saveToString</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">JSON</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">stringify</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">db</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">restoreFromString</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">storeState</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">db</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">JSON</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">parse</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">storeState</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> myDb2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">MyDB</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">myDb2</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">lucy-2</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(myDb2</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">saveToString</span><span style="color:#A6ACCD;">())</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">myDb2</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">restoreFromString</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{&quot;name&quot;:&quot;lucy-3&quot;}</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(myDb2</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">saveToString</span><span style="color:#A6ACCD;">())</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>\u5728\u4E0A\u9762\u7684\u5177\u4F53\u4EE3\u7801\u4E2D, <code>MyDB</code> \u9996\u5148\u7EE7\u627F\u4E86\u7C7B<code>InMemoryDataBase</code> \u4E2D\u7684\u6240\u6709\u5C5E\u6027\u548C\u65B9\u6CD5, \u5982<code>set</code> , <code>get</code>, \u548C<code>db</code>, \u540C\u65F6\u5176\u81EA\u8EAB\u4E5F\u5305\u542B\u65B0\u7684\u65B9\u6CD5.</p><p>\u6269\u5C55:</p><ul><li><p>\u63A5\u53E3\u4E0D\u80FD\u5B9E\u73B0\u63A5\u53E3\u6216\u8005\u7C7B\uFF0C\u6240\u4EE5\u5B9E\u73B0\u53EA\u80FD\u7528\u4E8E\u7C7B\u8EAB\u4E0A, \u5373\u7C7B\u53EF\u4EE5\u5B9E\u73B0\u63A5\u53E3\u6216\u7C7B (\u5982\u4E0A\u6240\u793A)</p></li><li><p>\u63A5\u53E3\u53EF\u4EE5\u7EE7\u627F\u63A5\u53E3\u6216\u7C7B</p></li></ul><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// \u7EE7\u627F\u7C7B</span></span>
<span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">NewDBInterface1</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MyDB</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#676E95;">// \u7EE7\u627F\u63A5\u53E3</span></span>
<span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">NewDBInterface2</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Persistable</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ul><li>\u7C7B\u4E0D\u53EF\u4EE5\u7EE7\u627F\u63A5\u53E3\uFF0C\u7C7B\u53EA\u80FD\u7EE7\u627F\u7C7B</li><li>\u53EF\u591A\u7EE7\u627F\u6216\u8005\u591A\u5B9E\u73B0</li></ul>`,26),e=[o];function c(r,t,y,D,F,C){return n(),a("div",null,e)}const d=s(p,[["render",c]]);export{A as __pageData,d as default};
