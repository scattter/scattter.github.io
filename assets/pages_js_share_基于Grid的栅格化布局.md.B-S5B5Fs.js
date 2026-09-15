import{_ as n,o as a,c as p,a3 as i}from"./chunks/framework.d6OaePA7.js";const k=JSON.parse('{"title":"基于Grid的栅格化布局","description":"","frontmatter":{"head":[["link",{"rel":"canonical","href":"https://scattter.github.io/pages/js/share/%E5%9F%BA%E4%BA%8EGrid%E7%9A%84%E6%A0%85%E6%A0%BC%E5%8C%96%E5%B8%83%E5%B1%80.html"}]]},"headers":[],"relativePath":"pages/js/share/基于Grid的栅格化布局.md","filePath":"pages/js/share/基于Grid的栅格化布局.md","lastUpdated":1712630553000}'),l={name:"pages/js/share/基于Grid的栅格化布局.md"};function e(r,s,t,c,h,b){return a(),p("div",null,[...s[0]||(s[0]=[i(`<h1 id="基于grid的栅格化布局" tabindex="-1">基于Grid的栅格化布局 <a class="header-anchor" href="#基于grid的栅格化布局" aria-label="Permalink to &quot;基于Grid的栅格化布局&quot;">​</a></h1><h2 id="_1-背景" tabindex="-1">1. 背景 <a class="header-anchor" href="#_1-背景" aria-label="Permalink to &quot;1. 背景&quot;">​</a></h2><p>最近有个需求, 需要在网站首页做一个栅格区, 该区域可以被运营用来展示一些活动/宣传等. 由于其定位是营销位, 因此其必须要满足可配置, 自由度高, 可以自由排列. 类似下图</p><p><img src="https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20240328111720284.png" alt="image-20240328111720284"></p><h2 id="_2-具体实现" tabindex="-1">2. 具体实现 <a class="header-anchor" href="#_2-具体实现" aria-label="Permalink to &quot;2. 具体实现&quot;">​</a></h2><p>刚接手这个需求的时候, 整理了下这个布局的一些特性</p><ul><li>有基础栅格</li><li>每个栅格的大小都是以基础栅格为单位进行增减, 且均为圆角矩形</li><li>每个栅格的位置都能随意变化</li></ul><p>依据上面特性, 有了下面的开发</p><h3 id="_2-1-栅格位置和大小的确认" tabindex="-1">2.1 栅格位置和大小的确认 <a class="header-anchor" href="#_2-1-栅格位置和大小的确认" aria-label="Permalink to &quot;2.1 栅格位置和大小的确认&quot;">​</a></h3><p>一开始我想的是使用瀑布流进行栅格的布局, 这样能保证每个栅格的宽度是自适应的, 但是瀑布流一般是单向的, 且也不支持固定位置; 其次是给两套固定的模板, 根据数据模板类型使用不同的模板进行数据渲染, 但是这样自由度不能保证, 每次新增模板就要新增代码.</p><p>后来, 我想到很多路径规划的算法会经常用到 <code>[x, y]</code> 来控制元素的位置, 然后由于我们这里的栅格均是基于基础栅格进行定位渲染的, 那我完全可以使用坐标轴来数字化栅格区. 即: 使用<code>[x, y]</code> 定位栅格位置, 然后使用 <code>row</code> 和 <code>column</code> 控制栅格占据的行和列, 进而确定栅格的大小.</p><p>这样一来, 栅格的位置和大小可以确定了, 但是页面的布局应该怎么处理?</p><h3 id="_2-2-栅格布局处理" tabindex="-1">2.2 栅格布局处理 <a class="header-anchor" href="#_2-2-栅格布局处理" aria-label="Permalink to &quot;2.2 栅格布局处理&quot;">​</a></h3><p>我初始想的是使用 <code>js</code> 来判断栅格的渲染位置, 但是想了下没有好的实现方式, 因此也只能想有没有其他方法可以更改元素位置. 于是, 我想到了 <code>grid</code> 布局, 由 <code>css</code> 来控制每个栅格的布局. 由于之前用的少, 所以查了下文档, 发现其确实符合需求:</p><ul><li><code>grid-template-columns</code> 和 <code>grid-template-rows</code> 用来确定 <code>grid</code> 布局区域的行和列 <ul><li>如 <code>grid-template-columns = repeat(5, 1fr)</code> 均等分为5列, <code>grid-template-rows = repeat(2, 86.8px) repeat(1, 76px)</code> 分为三行, 其中前两行高度为 <code>86.8px</code> , 后一行为 <code>76px</code> . 这两个属性便将基础的栅格划分出来了.</li></ul></li><li><code>grid-area</code> 属性可以用来确定栅格所处的位置 (栅格虚拟坐标轴起始位置为 <code>[1, 1]</code> ) <ul><li>如 <code>grid-area = 1 / 1 / 3 / 4</code> 表示此元素从 <code>[1, 1]</code> 开始, 横跨两行三列</li></ul></li><li><code>grid-gap</code> 属性可以用来确定栅格的间距</li></ul><p>经过上面三个属性的设置, 我们就解决了元素布局的问题.</p><p>至此, 整个栅格布局的方案就明确了: <strong>坐标轴定位 + <code>grid</code> 布局</strong></p><h3 id="_2-3-配置后台参数" tabindex="-1">2.3 配置后台参数 <a class="header-anchor" href="#_2-3-配置后台参数" aria-label="Permalink to &quot;2.3 配置后台参数&quot;">​</a></h3><p>由于栅格布局经常会变动, 运营有很灵活的需求, 所以需要一个配置后台. 运营更新布局后将数据传给前端, 前端就可以根据数据进行布局的渲染.</p><p>其对应的参数如下:</p><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> IConfigGridProps</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  data</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> IGridConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[];</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  /**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   * 默认间距</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  gutter</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  /**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   * 设置总栅格列</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  totalColumn</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  /**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   * 设置总栅格行</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   */</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  totalRow</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> IGridConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 栅格开始的位置 [x轴, y轴]</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  start</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">];</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 栅格占据的行数</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  row</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 栅格占据的列数</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  column</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 栅格类型</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> GRID_TYPE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 栅格具体内容</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  payload</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> IGridInfo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h3 id="_2-4-前台实现" tabindex="-1">2.4 前台实现 <a class="header-anchor" href="#_2-4-前台实现" aria-label="Permalink to &quot;2.4 前台实现&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// mock数据</span></span>
<span class="line"><span>const gridInfo = {</span></span>
<span class="line"><span>	gutter: 24,</span></span>
<span class="line"><span>  totalColumn: 3,</span></span>
<span class="line"><span>  totalRow: 2,</span></span>
<span class="line"><span>  data: [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      start: [0,0],</span></span>
<span class="line"><span>      row: 2,</span></span>
<span class="line"><span>      column: 2,</span></span>
<span class="line"><span>      payload: {</span></span>
<span class="line"><span>        title: &#39;first&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      start: [0,2],</span></span>
<span class="line"><span>      row: 1,</span></span>
<span class="line"><span>      column: 1,</span></span>
<span class="line"><span>      payload: {</span></span>
<span class="line"><span>        title: &#39;second&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      start: [1,2],</span></span>
<span class="line"><span>      row: 1,</span></span>
<span class="line"><span>      column: 1,</span></span>
<span class="line"><span>      payload: {</span></span>
<span class="line"><span>        title: &#39;third&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 组件</span></span>
<span class="line"><span>const GridArea: React.FC = () =&gt; {</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div</span></span>
<span class="line"><span>      style={{</span></span>
<span class="line"><span>        display: &#39;grid&#39;,</span></span>
<span class="line"><span>        gridTemplateRows: \`repeat(\${gridInfo.totalRow}, 1fr)\`,</span></span>
<span class="line"><span>        gridTemplateColumns: \`repeat(\${gridInfo.totalColumn}, 1fr)\`,</span></span>
<span class="line"><span>        gridGap: gridInfo.gutter ?? &#39;24px&#39;,</span></span>
<span class="line"><span>      }}</span></span>
<span class="line"><span>    &gt;</span></span>
<span class="line"><span>      {(gridInfo.data ?? []).map((value) =&gt; {</span></span>
<span class="line"><span>        const { payload, start, column, row } = value;</span></span>
<span class="line"><span>        return (</span></span>
<span class="line"><span>          &lt;div</span></span>
<span class="line"><span>            key={start.join(&#39;-&#39;)}</span></span>
<span class="line"><span>            styleName=&quot;main&quot;</span></span>
<span class="line"><span>            style={{</span></span>
<span class="line"><span>              gridArea: \`\${start[0] + 1} / \${start[1] + 1} / \${start[0] + row + 1} / \${start[1] + column + 1}\`,</span></span>
<span class="line"><span>            }}</span></span>
<span class="line"><span>          &gt;</span></span>
<span class="line"><span>            {payload.title}</span></span>
<span class="line"><span>          &lt;/div&gt;</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span>      })}</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br></div></div><p>上面代码实现的效果如下所示</p><p><img src="https://cdn.jsdelivr.net/gh/scattter/blogweb/images/%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_36cc4a5b-fe4a-4037-a37d-9639939b6b1f.png" alt="77_36cc4a5b-fe4a-4037-a37d-9639939b6b1f"></p>`,25)])])}const o=n(l,[["render",e]]);export{k as __pageData,o as default};
