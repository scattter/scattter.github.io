<template>
  <div class="home">
    <section class="hero" aria-labelledby="home-title">
      <div class="hero-copy">
        <p class="eyebrow"><span class="status-dot" aria-hidden="true"></span>一站式开发者 · AI 高强度使用者</p>
        <h1 id="home-title">把想法写下来，<br>把<span class="highlight">好奇</span>做出来。</h1>
        <p class="intro">你好，我是 scatter，点子比票子多，兴趣比时间多。<br class="desktop-break">日常和 AI 搭伙，把「要不试试」折腾成能用的小东西。</p>
        <div class="hero-actions">
          <a class="primary-link" href="#home-articles">读读最近的文章 <span class="arrow diagonal" aria-hidden="true">↗</span></a>
          <a class="text-link" href="#home-projects">逛逛我的项目 <span class="arrow" aria-hidden="true">→</span></a>
        </div>
      </div>
      <div class="collage" aria-hidden="true">
        <div class="mint-cutout floating"><div></div></div>
        <div class="blue-chip floating"><div></div></div>
        <div class="paper floating">
          <div class="paper-body">
            <span class="paper-number">NO. 001</span>
            <p class="paper-title">一些灵感，<br>正在发生。</p>
            <div class="paper-rule"></div>
            <span class="paper-caption">日常观察 / 持续创造</span>
          </div>
        </div>
        <div class="collage-flower floating"><div class="flower"></div></div>
        <div class="tiny-ring floating"></div>
        <div class="code-note floating">
          <div class="code-body">
            <div class="code-dots"><i></i><i></i><i></i></div>
            <code>const life = {<br>&nbsp; curiosity: <em>true</em><br>};</code>
          </div>
        </div>
      </div>
    </section>

    <section id="home-projects" class="projects" aria-labelledby="projects-title">
      <div class="section-heading">
        <div class="heading-label"><h2 id="projects-title">折腾出的小东西</h2><span class="section-meta">{{ projects.length }} 个项目</span></div>
        <button class="text-link more-link" type="button" :aria-expanded="showAllProjects" aria-controls="project-list" @click="showAllProjects = !showAllProjects; activeStory = null">
          {{ showAllProjects ? '收起项目' : '全部项目' }} <span class="arrow" aria-hidden="true">{{ showAllProjects ? '↑' : '↓' }}</span>
        </button>
      </div>
      <div id="project-list" ref="projectList" class="project-grid">
        <article v-for="(project, index) in visibleProjects" :key="project.name" class="project" :class="[`project-${project.cover}`, { 'has-open-story': activeStory === project.name }]">
          <div class="project-cover" aria-hidden="true">
            <template v-if="project.cover === 'journal'"><div class="notebook">随礼</div><div class="flower cover-flower"></div></template>
            <template v-else-if="project.cover === 'console'"><div class="circuit-line"></div><div class="device"><div class="device-screen"><i></i><i></i><i></i><i></i></div><div class="device-buttons"><i></i><i></i><i></i></div></div></template>
            <template v-else-if="project.cover === 'chart'"><div class="chart-grid"></div><div class="chart-coin"></div><div class="fund-bars"><i></i><i></i><i></i></div></template>
            <template v-else-if="project.cover === 'camera'"><div class="viewfinder"><i></i><i></i><i></i><i></i></div><div class="camera"><div class="camera-lens"></div><div class="camera-stand"></div></div></template>
            <template v-else-if="project.cover === 'browser'"><div class="browser-sheet"><div class="browser-dots"><i></i><i></i><i></i></div><span>&lt;/&gt;</span><div class="browser-lines"><i></i><i></i></div></div><div class="flower cover-flower"></div></template>
            <div v-else class="tool-pieces"><span>{ }</span><span>&lt;/&gt;</span><span>+</span></div>
          </div>
          <div class="project-content">
            <p class="project-category">{{ project.category }}</p>
            <h3>{{ project.name }}</h3>
            <p class="project-desc">{{ project.desc }}</p>
            <p class="project-language"><span :class="project.language.toLowerCase()" aria-hidden="true"></span>{{ project.language === 'Cpp' ? 'C++' : project.language }}</p>
            <div class="project-story" :class="{ 'is-open': activeStory === project.name }" @keydown.esc.stop.prevent="closeProjectStory">
              <button class="story-trigger" type="button" :aria-expanded="activeStory === project.name" :aria-controls="`project-story-${index}`" @click="activeStory = activeStory === project.name ? null : project.name">为什么做它 <span aria-hidden="true">+</span></button>
              <Transition name="story-bubble">
                <div v-show="activeStory === project.name" :id="`project-story-${index}`" class="story-popover" role="region" :aria-label="`${project.name}：为什么做它`">
                  <div class="story-body">
                    <div class="story-heading"><strong>做它的初衷</strong><button type="button" @click="closeProjectStory">收起</button></div>
                    <p>{{ project.why }}</p>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </article>
      </div>
    </section>

    <div class="lower">
      <section id="home-articles" class="articles" aria-labelledby="articles-title">
        <div class="section-heading"><div class="heading-label"><h2 id="articles-title">最近写下的</h2><span class="section-meta">{{ articles.length }} 篇积累</span></div></div>
        <p v-if="articles.length === 0" class="empty">还没有文章，灵感正在路上。</p>
        <ul v-else id="article-list" class="article-list" :class="{ 'is-expanded': showAllArticles }">
          <li v-for="article in visibleArticles" :key="article.link">
            <a class="article-link" :href="withBase(article.link)" target="_blank" rel="noopener">
              <time class="article-date" :datetime="article.createTime.slice(0, 10)" :title="format(article.createTime, 'zh_CN')">{{ article.createTime.slice(0, 10).replaceAll('-', '.') }}</time>
              <span class="article-title">{{ article.name.replace(/\.md$/, '') }}</span>
              <span class="arrow diagonal" aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
        <button v-if="articles.length > ARTICLE_PREVIEW_COUNT" class="text-link more-link archive-toggle" type="button" :aria-expanded="showAllArticles" aria-controls="article-list" @click="showAllArticles = !showAllArticles">
          {{ showAllArticles ? '收起文章' : `查看全部 ${articles.length} 篇文章` }} <span class="arrow" aria-hidden="true">{{ showAllArticles ? '↑' : '↓' }}</span>
        </button>
      </section>
      <aside class="about-note" aria-labelledby="about-title">
        <div class="about-mark"><img :src="withBase('/logo.jpeg')" alt="scatter 的头像" width="48" height="48" loading="lazy"><div class="flower" aria-hidden="true"></div></div>
        <h2 id="about-title">预算有限，好奇心管够。</h2>
        <p>一站式开发者，AI 高强度使用者。喜欢写代码、做小工具，也常常一脚迈进软硬件的坑里。</p>
        <p>记不住人情往来，就做随礼册；想给电脑加实体按键，就折腾 ESP32；基金和家里的摄像头，也想用自己的工具管起来。</p>
        <p>这里记录做出来的小东西、踩过的坑，以及还没来得及实现的下一堆点子。</p>
        <a class="text-link more-link" :href="withBase('/about')">更多关于我 <span class="arrow" aria-hidden="true">→</span></a>
      </aside>
    </div>
    <footer class="home-footer"><span>© {{ year }} scatter</span><span>写一点代码，留一点生活。<span class="footer-star" aria-hidden="true">✳</span></span></footer>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import { format } from 'timeago.js'
import articles from '@/public/asserts/articles.json'

const ARTICLE_PREVIEW_COUNT = 4
const showAllProjects = ref(false)
const showAllArticles = ref(false)
const projectList = ref(null)
const activeStory = ref(null)
const year = new Date().getFullYear()

function closeProjectStory(event) {
  activeStory.value = null
  event.currentTarget.closest('.project-story')?.querySelector('.story-trigger')?.focus({ preventScroll: true })
}

function closeOutsideStories(event) {
  const story = projectList.value?.querySelector('.project-story.is-open')
  if (story && !story.contains(event.target)) activeStory.value = null
}

onMounted(() => document.addEventListener('pointerdown', closeOutsideStories))
onBeforeUnmount(() => document.removeEventListener('pointerdown', closeOutsideStories))

const projects = [
  {
    name: '随礼册',
    cover: 'journal',
    category: '人情与生活',
    language: 'TypeScript',
    desc: '记录人情往来的微信小程序：随礼、收礼都能随手记，婚礼、满月、乔迁等宴席支持按礼单集中管理',
    why: '每次随礼都不知道记哪里，靠记忆和翻聊天记录，时间一长就乱。想做一个打开就能记一笔的地方，送出去的、收回来的都有据可查',
  },
  {
    name: 'LCD-1.47',
    cover: 'console',
    category: '桌面硬件实验',
    language: 'Cpp',
    desc: '基于 ESP32-S3 + 1.47 寸屏幕的桌面控制台：显示电脑状态，三个实体按键通过 BLE 控制 Mac 的音量、快捷键、启动 App 和脚本',
    why: '想给电脑加一块带实体按键和小屏幕的控制台，软硬件都自己动手，把想法做成能跑的东西',
  },
  {
    name: 'FundDig',
    cover: 'chart',
    category: '投资与记录',
    language: 'TypeScript',
    desc: '基金计划与组合回测工具，管理持仓与加减仓记录，按比例构建组合回测',
    why: '用纪律管理投资，让每一次买卖都有记录可查',
  },
  {
    name: 'EasyOnvif',
    cover: 'camera',
    category: '家庭与网络',
    language: 'TypeScript',
    desc: '家庭摄像头管理系统，部署在 NAS 上，支持实时预览、云台控制、事件录制与回放',
    why: '摆脱云平台限制，自己掌控家庭监控的存储与查看',
  },
  {
    name: 'scattter.github.io',
    cover: 'browser',
    category: '自己的数字花园',
    language: 'Vue',
    desc: '基于 VitePress 的个人博客，记录前端学习、工程化与性能优化实践',
    why: '把学习和踩坑过程沉淀成文档，同时作为个人作品展示窗口',
  },
  {
    name: 'common-utils',
    cover: 'tools',
    category: '代码工具箱',
    language: 'JavaScript',
    desc: '前端工具与学习实验合集：手写 JS 工具函数、Vue 指令、设计模式，以及云盘下载、语音识别等小实验',
    why: '工作中的常用代码与笔记统一沉淀，避免重复造轮子',
  },
]

const visibleProjects = computed(() => showAllProjects.value ? projects : projects.slice(0, 3))
const visibleArticles = computed(() => showAllArticles.value ? articles : articles.slice(0, ARTICLE_PREVIEW_COUNT))
</script>

<style scoped>
.home {
  --home-text: #29312c;
  --home-muted: #67736b;
  --home-project-copy: #59675e;
  --home-line: #e5ebe6;
  --home-accent: #426b53;
  --home-button: #ffe36c;
  --home-button-text: #34301f;
  --home-paper: #fff;
  --home-highlight: #f3e4ac;
  --home-green-surface: #f3f7f3;
  --home-blue-surface: #f3f6f9;
  --home-yellow-surface: #faf8f0;
  --home-peach-surface: #faf4f0;
  --home-lilac-surface: #f5f2f9;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 40px;
  color: var(--home-text);
  font-size: 14px;
  line-height: 1.8;
}

.dark .home {
  --home-text: #e3e9e3;
  --home-muted: #a6b2a8;
  --home-project-copy: #b4c1b8;
  --home-line: #343d37;
  --home-accent: #b2d4bb;
  --home-button: #ffe58a;
  --home-button-text: #34301f;
  --home-paper: #282e2b;
  --home-highlight: #645c39;
  --home-green-surface: #262e29;
  --home-blue-surface: #282e36;
  --home-yellow-surface: #302e26;
  --home-peach-surface: #342c28;
  --home-lilac-surface: #2e2a36;
}

.home h1, .home h2, .home h3, .home p { margin: 0; }
.home a { color: inherit; text-decoration: none; }
.home button { font: inherit; }
.home button { cursor: pointer; }
.home :is(a, button):focus-visible { outline: 2px solid var(--home-accent); outline-offset: 5px; border-radius: 4px; }
.home section[id] { scroll-margin-top: calc(var(--vp-nav-height) + 24px); }
.hero { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); align-items: center; gap: 30px; padding: 72px 0 64px; }
.eyebrow { display: flex; align-items: center; gap: 9px; color: var(--home-muted); font-size: 12px; letter-spacing: 1.4px; }
.status-dot { width: 6px; height: 6px; flex-shrink: 0; border-radius: 50%; background: #8caf97; }
.hero h1 { margin: 22px 0; font-size: clamp(36px, 4.3vw, 52px); font-weight: 650; line-height: 1.4; letter-spacing: -1.8px; }
.highlight { position: relative; display: inline-block; isolation: isolate; }
.highlight::after { content: ''; position: absolute; z-index: -1; left: -3px; right: -3px; bottom: 9px; height: 15px; background: var(--home-highlight); border-radius: 53% 32% 48% 24%; transform: rotate(-3deg); }
.intro { color: var(--home-muted); line-height: 1.95; }
.hero-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 24px; margin-top: 29px; }
.primary-link { display: inline-flex; align-items: center; justify-content: space-between; gap: 24px; padding: 12px 19px; border-radius: 6px; background: var(--home-button); transition: transform .25s ease, box-shadow .25s ease; }
.home .primary-link { color: var(--home-button-text); }
.primary-link:active { transform: translateY(1px) scale(.98); }
.text-link { display: inline-flex; align-items: center; gap: 9px; padding: 7px 0; position: relative; }
.text-link::after { content: ''; height: 1px; position: absolute; left: 0; right: 23px; bottom: 4px; background: currentColor; transform: scaleX(0); transform-origin: left; transition: transform .25s ease; }
.arrow { display: inline-block; flex-shrink: 0; transition: transform .25s ease; }
.home .more-link { color: var(--home-muted); font-size: 12px; }
.primary-link:focus-visible .arrow, .text-link:focus-visible .arrow, .article-link:focus-visible .arrow { transform: translateX(3px); }
.text-link:focus-visible::after { transform: scaleX(1); }

.collage { position: relative; width: 100%; max-width: 380px; aspect-ratio: 355 / 330; justify-self: end; isolation: isolate; }
.floating { position: absolute; animation: float 7s ease-in-out infinite; }
.mint-cutout { width: 63%; height: 71%; top: 10%; right: 9%; animation-duration: 9s; animation-delay: -3s; }
.mint-cutout > div { width: 100%; height: 100%; border-radius: 48% 52% 69% 31% / 35% 54% 46% 65%; background: #dfede4; transform: rotate(14deg); }
.blue-chip { width: 23%; height: 31%; right: 3%; bottom: 5%; animation-duration: 8s; animation-delay: -4s; }
.blue-chip > div { width: 100%; height: 100%; border-radius: 48px 48px 15px 15px; background: #b8ceec; transform: rotate(24deg); transition: transform .7s ease; }
.paper { width: 59%; left: 14%; top: 12%; animation-delay: -1s; }
.paper-body { position: relative; aspect-ratio: 205 / 224; padding: 12%; border: 1px solid #e7e9e2; background: #fff; color: #29312c; box-shadow: 0 13px 30px #28332a0a; transform: rotate(-8deg); transition: transform .7s cubic-bezier(.2,.7,.2,1); }
.paper-body::before { content: ''; position: absolute; width: 37%; height: 12%; top: -6%; left: 31%; background: #f1dfa7c9; transform: rotate(4deg); clip-path: polygon(3% 0,97% 4%,100% 91%,96% 100%,2% 97%,0 5%); }
.paper-number { font-family: Georgia, serif; font-size: 12px; letter-spacing: 3px; color: #7c877b; }
.paper .paper-title { margin-top: 17px; font-family: 'Songti SC', STSong, Georgia, serif; font-size: clamp(22px, 2.5vw, 30px); line-height: 1.5; white-space: nowrap; }
.paper-rule { width: 60%; height: 9px; border-top: 2px solid #a5c5b0; border-radius: 50%; transform: rotate(-3deg); margin: 9px 0 13px; }
.paper-caption { color: #737e73; font-size: 11px; white-space: nowrap; }
.flower { width: 100%; height: 100%; background: #efb69c; clip-path: polygon(50% 0,61% 25%,85% 15%,75% 39%,100% 50%,75% 61%,85% 85%,61% 75%,50% 100%,39% 75%,15% 85%,25% 61%,0 50%,25% 39%,15% 15%,39% 25%); }
.collage-flower { width: 20%; aspect-ratio: 1; right: 1%; top: 7%; animation-duration: 6s; animation-delay: -2s; }
.collage-flower .flower { transform: rotate(13deg); transition: transform 1.1s cubic-bezier(.2,.7,.2,1); }
.tiny-ring { width: 9%; aspect-ratio: 1; left: 8%; top: 2%; border: 5px solid #e4cd79; border-radius: 50%; animation-duration: 6s; animation-delay: -4s; }
.code-note { left: 0; bottom: -7%; width: 53%; animation-duration: 8s; animation-delay: -2s; }
.code-body { padding: 13px 16px; border: 1px solid #e1e7ed; border-radius: 5px; background: #eff3f7; color: #526b81; transform: rotate(5deg); transition: transform .7s ease; }
.code-dots { display: flex; gap: 5px; margin-bottom: 8px; }
.code-dots i { width: 5px; height: 5px; border-radius: 50%; background: #b3c1c9; }
.code-body code { display: block; font-family: var(--vp-font-family-mono); font-size: 12px; line-height: 1.8; }
.code-body em { font-style: normal; color: #8c713f; }

.section-heading { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 23px; }
.heading-label { display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px; }
.home h2 { font-size: 23px; font-weight: 600; line-height: 1.5; letter-spacing: -.6px; }
.section-meta { color: var(--home-muted); font-size: 12px; white-space: nowrap; }
.project-grid { display: grid; grid-template-columns: 1fr 1.06fr .98fr; align-items: start; gap: 34px 26px; padding-top: 10px; }
.project { --project-art-scale: 1; --project-angle: 0deg; position: relative; z-index: 0; display: flex; flex-direction: column; min-width: 0; padding: 20px 22px 17px; }
/* 只裁切背景，文字与气泡保留独立且可溢出的空间。 */
.project::before { content: ''; position: absolute; z-index: -1; inset: 0; background: var(--home-green-surface); transform: rotate(var(--project-angle)); transition: transform .4s ease; pointer-events: none; }
.project::after { position: absolute; pointer-events: none; }
.project:focus-within { z-index: 2; }
.project.has-open-story { z-index: 3; }
.project-content { display: flex; flex: 1; flex-direction: column; min-width: 0; }
.project-cover { position: relative; display: flex; flex-shrink: 0; justify-content: center; align-items: center; height: 156px; margin-bottom: 18px; }
.project-journal { --project-angle: -1.2deg; }
.project-journal::before { border-radius: 9px 13px 2px 5px; clip-path: polygon(0 0,100% 0,100% 98%,93% 99%,86% 98%,79% 100%,71% 98%,64% 99%,56% 98%,49% 100%,41% 98%,33% 99%,25% 98%,17% 100%,9% 98%,0 99%); }
.project-journal::after { content: ''; top: -7px; left: 31%; width: 64px; height: 20px; background: #e6d49d99; transform: rotate(-6deg); clip-path: polygon(3% 0,97% 4%,100% 91%,96% 100%,2% 97%,0 5%); }
.project-console { margin-top: 27px; }
.project-console::before { background: var(--home-blue-surface); clip-path: polygon(0 18px,18px 0,calc(100% - 28px) 0,100% 28px,100% calc(100% - 17px),calc(100% - 17px) 100%,12px 100%,0 calc(100% - 12px)); }
.project-console::after { content: ''; width: 28px; height: 7px; top: 19px; right: 32px; background: repeating-linear-gradient(90deg,#aabdc7 0 2px,transparent 2px 6px); }
.project-chart { --project-angle: 1.3deg; margin-top: 8px; }
.project-chart::before { background: var(--home-yellow-surface); border-radius: 60px 15px 42px 16px / 40px 15px 29px 16px; }
.project-chart .project-cover { height: 170px; }
.project-camera { --project-angle: .7deg; }
.project-camera::before { background: var(--home-blue-surface); border-radius: 30px 62px 22px 45px / 22px 50px 24px 40px; }
.project-browser { --project-angle: -1deg; margin-top: 20px; }
.project-browser::before { background: var(--home-peach-surface); border-radius: 8px; clip-path: polygon(0 0,calc(100% - 25px) 0,100% 25px,100% 100%,0 100%); }
.project-browser::after { content: ''; top: 0; right: 0; width: 25px; height: 25px; background: #dcbba970; clip-path: polygon(0 0,100% 100%,0 100%); transform: rotate(-1deg); }
.project-tools { margin-top: 7px; padding-top: 30px; }
.project-tools::before { background: var(--home-lilac-surface); border-radius: 15px 34px 26px 15px; clip-path: polygon(0 17px,37% 17px,37% 0,64% 0,64% 17px,100% 17px,100% 100%,0 100%); }
.project .project-category { margin-bottom: 7px; color: var(--home-accent); font-size: 11px; font-weight: 500; letter-spacing: 1.2px; }
.notebook { display: flex; flex-shrink: 0; justify-content: center; align-items: center; width: 64px; height: 85px; border-left: 5px solid #8eb79a; border-radius: 4px 10px 10px 4px; background: #b4cdbb; color: #354f3d; font-family: 'Songti SC', serif; font-size: 17px; letter-spacing: 3px; box-shadow: 7px 6px 0 #e0e9dd; transform: rotate(-12deg) scale(var(--project-art-scale)); transition: transform .4s ease; }
.cover-flower { position: absolute; width: 31px; height: 31px; top: 25px; right: 24%; background: #e9c36f; transition: transform .6s ease; }
.circuit-line { position: absolute; width: 72%; height: 58%; border: 1px dashed #a7bec280; border-radius: 10px 32px 8px 20px; transform: rotate(-6deg); }
.device { position: relative; flex-shrink: 0; width: 124px; height: 71px; border: 6px solid #4c5a61; border-bottom-width: 14px; border-radius: 10px; background: #dce8e5; box-shadow: 4px 5px 0 #d6dde2; transform: rotate(8deg) scale(var(--project-art-scale)); transition: transform .4s ease; }
.device-screen { display: flex; align-items: end; gap: 5px; height: 100%; padding: 9px 15px; }
.device-screen i { width: 9px; height: 45%; border-radius: 2px; background: #8dab9e; transform-origin: bottom; transition: transform .4s ease; }
.device-screen i:nth-child(2) { height: 78%; }
.device-screen i:nth-child(3) { height: 55%; }
.device-screen i:nth-child(4) { height: 92%; background: #c2b17e; }
.device-buttons { position: absolute; bottom: -10px; left: 0; right: 0; display: flex; justify-content: center; gap: 10px; }
.device-buttons i { width: 4px; height: 4px; border-radius: 50%; background: #d3d9dd; }
.chart-grid { position: absolute; width: 75%; height: 71%; background-image: linear-gradient(#c8be9e2b 1px,transparent 1px),linear-gradient(90deg,#c8be9e2b 1px,transparent 1px); background-size: 18px 18px; border-radius: 36px 12px 25px 8px; transform: rotate(5deg); }
.chart-coin { position: absolute; top: 21px; right: 17%; width: 25px; height: 25px; border: 6px solid #e4ca81; border-radius: 50%; }
.fund-bars { position: relative; display: flex; flex-shrink: 0; align-items: end; gap: 7px; height: 77px; transform: rotate(-7deg) scale(var(--project-art-scale)); transition: transform .4s ease; }
.fund-bars i { width: 25px; height: 34px; border-radius: 7px 7px 2px 2px; background: #d4e3d5; transform-origin: bottom; transition: transform .4s ease; }
.fund-bars i:nth-child(2) { height: 52px; background: #b6cfbd; transition-delay: 40ms; }
.fund-bars i:nth-child(3) { height: 77px; background: #ebd18e; transition-delay: 80ms; }
.viewfinder { position: absolute; width: 73%; height: 76%; }
.viewfinder i { position: absolute; width: 17px; height: 17px; border: solid #a5bfc8; border-width: 2px 0 0 2px; border-radius: 4px 0 0; }
.viewfinder i:nth-child(2) { right: 0; transform: rotate(90deg); }
.viewfinder i:nth-child(3) { right: 0; bottom: 0; transform: rotate(180deg); }
.viewfinder i:nth-child(4) { bottom: 0; transform: rotate(-90deg); }
.camera { position: relative; flex-shrink: 0; width: 85px; height: 73px; border: 4px solid #c3d1d7; border-radius: 27px 27px 23px 23px; background: #e4ecec; transform: rotate(-7deg) scale(var(--project-art-scale)); transition: transform .4s ease; }
.camera-lens { position: absolute; width: 40px; height: 40px; left: 18px; top: 10px; border: 6px solid #53676c; border-radius: 50%; background: radial-gradient(circle at 35% 30%,#d4e5df 0 14%,#799b99 16% 38%,#334e55 40%); transition: transform .4s ease; }
.camera-stand { position: absolute; width: 43px; height: 7px; border-radius: 50% 50% 3px 3px; background: #93a9b2; bottom: -15px; left: 17px; }
.camera-stand::before { content: ''; position: absolute; width: 11px; height: 12px; bottom: 5px; left: 16px; background: #b6c7ce; }
.browser-sheet { position: relative; flex-shrink: 0; width: 124px; height: 91px; padding: 12px; border: 1px solid #d7dcd3; border-radius: 8px; background: #fffefb; box-shadow: 6px 6px 0 #e9d9ca; transform: rotate(-8deg) scale(var(--project-art-scale)); transition: transform .4s ease; }
.browser-dots { display: flex; gap: 4px; }
.browser-dots i { width: 4px; height: 4px; border-radius: 50%; background: #bdd0c0; }
.browser-sheet > span { display: block; margin-top: 8px; color: #7a9580; font-family: var(--vp-font-family-mono); font-size: 20px; line-height: 1.4; }
.browser-lines { display: grid; gap: 4px; margin-top: 7px; }
.browser-lines i { width: 76%; height: 3px; border-radius: 2px; background: #e0e6dc; }
.browser-lines i:last-child { width: 49%; }
.project-browser .cover-flower { right: 15%; top: 15px; width: 25px; height: 25px; background: #d9b9a4; }
.tool-pieces { position: relative; flex-shrink: 0; width: 125px; height: 100px; transform: scale(var(--project-art-scale)); }
.tool-pieces span { position: absolute; display: grid; place-items: center; width: 63px; height: 56px; border-radius: 11px 20px 11px 16px; background: #d2c5e3; color: #615472; font-family: var(--vp-font-family-mono); font-size: 20px; transform: rotate(-12deg); transition: transform .4s ease; }
.tool-pieces span:nth-child(2) { right: 0; top: 28px; background: #c2d7d3; color: #486c61; transform: rotate(11deg); }
.tool-pieces span:nth-child(3) { width: 39px; height: 37px; left: 16px; bottom: -1px; background: #eddbb3; color: #8a784a; border-radius: 50% 50% 11px 50%; transform: rotate(7deg); }
.project h3 { color: var(--home-text); font-size: 22px; font-weight: 650; line-height: 1.4; letter-spacing: -.4px; overflow-wrap: anywhere; }
.project .project-desc { flex: 1; margin-top: 10px; color: var(--home-project-copy); font-size: 14px; line-height: 1.9; }
.project .project-language { display: inline-flex; align-self: start; align-items: center; gap: 7px; margin-top: 14px; padding: 4px 9px; border: 1px solid var(--home-line); border-radius: 5px; color: var(--home-muted); background: var(--home-green-surface); font-family: var(--vp-font-family-mono); font-size: 11px; font-weight: 500; line-height: 1.4; }
.project-language span { width: 6px; height: 6px; border-radius: 50%; background: #98b4ce; }
.project-language .cpp { background: #dba58f; }
.project-language .vue { background: #92b69f; }
.project-language .javascript { background: #d4bd79; }
.project-story { --story-offset: 0px; position: relative; z-index: 1; margin-top: 11px; font-size: 12px; }
.project-story .story-trigger { display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%; min-height: 40px; padding: 7px 0; color: var(--home-accent); font-size: 12px; font-weight: 600; }
.story-trigger span { transition: transform .25s ease; }
.project-story.is-open { z-index: 2; }
.project-story.is-open .story-trigger span { transform: rotate(45deg); }
/* 向上浮出并脱离文档流，展开不会撑高卡片或页面。 */
.story-popover { position: absolute; left: calc(0px - var(--story-offset)); right: 0; bottom: calc(100% + 12px); border: 1px solid var(--home-line); border-radius: 18px; background: var(--home-paper); box-shadow: 0 12px 30px #18251d1a, 0 3px 8px #18251d0a; transform-origin: calc(var(--story-offset) + 32px) bottom; }
.story-popover::after { content: ''; position: absolute; left: calc(var(--story-offset) + 26px); bottom: -7px; width: 12px; height: 12px; border-right: 1px solid var(--home-line); border-bottom: 1px solid var(--home-line); background: var(--home-paper); transform: rotate(45deg); pointer-events: none; }
.story-body { max-height: min(280px, 50vh); overflow-y: auto; padding: 16px 18px; border-radius: inherit; }
.story-bubble-enter-active { transition: transform .28s cubic-bezier(.18,.85,.32,1.2), opacity .18s ease; }
.story-bubble-leave-active { transition: transform .16s ease-in, opacity .16s ease-in; pointer-events: none; }
.story-bubble-enter-from, .story-bubble-leave-to { opacity: 0; transform: translateY(9px) scale(.92); }
.story-heading { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 9px; }
.story-heading strong { color: var(--home-text); font-size: 14px; font-weight: 600; }
.story-heading button { flex-shrink: 0; padding: 5px 0 5px 8px; color: var(--home-accent); font-size: 12px; }
.story-popover p { color: var(--home-project-copy); font-size: 13px; line-height: 1.9; }

.lower { display: grid; grid-template-columns: minmax(0, 1.85fr) minmax(0, 1fr); align-items: start; gap: 48px; margin-top: 56px; }
.article-list { list-style: none; padding: 0; margin: 0; }
.article-list.is-expanded { max-height: min(480px, 60vh); margin: -8px -8px 0; padding: 8px; overflow-y: auto; overscroll-behavior-y: contain; scrollbar-gutter: stable; scrollbar-width: thin; scrollbar-color: var(--home-muted) transparent; }
.article-link { display: grid; grid-template-columns: 82px minmax(0, 1fr) 16px; align-items: center; gap: 15px; padding: 18px 0; border-bottom: 1px solid var(--home-line); }
.article-date { color: var(--home-muted); font-size: 11px; font-variant-numeric: tabular-nums; }
.article-title { font-size: 14px; overflow-wrap: anywhere; transition: color .2s ease, transform .25s ease; }
.article-link > .arrow { color: var(--home-muted); }
.archive-toggle { margin-top: 19px; }
.empty { padding: 28px 0; color: var(--home-muted); }
.about-note { padding: 26px; border: 1px solid var(--home-line); border-radius: 46% 6px 6px 6px / 18px 6px 6px 6px; background: var(--home-paper); }
.about-mark { display: flex; align-items: center; justify-content: space-between; margin-bottom: 17px; }
.about-mark img { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; }
.about-mark .flower { width: 29px; height: 29px; background: #b9d2c1; }
.about-note h2 { font-size: 19px; }
.about-note p { color: var(--home-muted); font-size: 13px; line-height: 2; margin-top: 12px; }
.about-note .text-link { margin-top: 15px; }
.home-footer { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px; padding: 29px 0; margin-top: 49px; border-top: 1px solid var(--home-line); color: var(--home-muted); font-size: 12px; }
.footer-star { display: inline-block; margin-left: 9px; color: #92b29b; }

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-9px); }
}

@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .primary-link:hover { transform: translateY(-3px); box-shadow: 0 8px 17px #e4b82e33; }
  .primary-link:hover:active { transform: translateY(0) scale(.98); }
  .text-link:hover { color: var(--home-accent); }
  .text-link:hover::after { transform: scaleX(1); }
  .text-link:hover .arrow { transform: translateX(4px); }
  .primary-link:hover .diagonal, .article-link:hover .diagonal { transform: translate(3px, -3px); }
  .article-link:hover .article-title { color: var(--home-accent); transform: translateX(3px); }
  .collage:hover .paper-body { transform: rotate(-3deg) translateY(-4px); }
  .collage:hover .collage-flower .flower { transform: rotate(103deg); }
  .collage:hover .blue-chip > div { transform: rotate(34deg); }
  .collage:hover .code-body { transform: rotate(0); }
  .project:hover::before { transform: rotate(0); }
  .project:hover .notebook { transform: rotate(-6deg) translateY(-5px) scale(var(--project-art-scale)); }
  .project:hover .cover-flower { transform: rotate(50deg); }
  .project:hover .device { transform: rotate(3deg) translateY(-4px) scale(var(--project-art-scale)); }
  .project:hover .device-screen i { transform: scaleY(.8); }
  .project:hover .fund-bars { transform: rotate(-3deg) scale(var(--project-art-scale)); }
  .project:hover .fund-bars i { transform: scaleY(1.1); }
  .project:hover .camera { transform: rotate(-2deg) scale(var(--project-art-scale)); }
  .project:hover .camera-lens { transform: translateX(3px); }
  .project:hover .browser-sheet { transform: rotate(-3deg) translateY(-4px) scale(var(--project-art-scale)); }
  .project:hover .tool-pieces span:first-child { transform: rotate(-5deg) translateY(-4px); }
  .project:hover .tool-pieces span:nth-child(2) { transform: rotate(5deg) translateX(3px); }
  .story-trigger:hover { color: var(--home-accent); }
}

@media (max-width: 900px) {
  .home { padding: 0 32px; }
  .hero { gap: 15px; padding: 53px 0; }
  .hero h1 { font-size: 38px; }
  .intro { font-size: 13px; }
  .desktop-break { display: none; }
  .hero-actions { gap: 18px; font-size: 12px; }
  .collage { aspect-ratio: 355 / 370; }
  .paper .paper-title { font-size: 25px; }
  .paper-caption { font-size: 10px; }
  .project-grid { gap: 25px 20px; }
  .project { padding-right: 17px; padding-left: 17px; }
  .lower { gap: 29px; grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr); }
  .home h2 { font-size: 21px; }
  .about-note { padding: 21px; }
  .about-note h2 { font-size: 18px; }
  .article-link { grid-template-columns: 77px minmax(0, 1fr) 14px; gap: 10px; }
}

@media (max-width: 700px) {
  .home { padding: 0 24px; }
  .hero { grid-template-columns: minmax(0, 1fr); gap: 25px; padding: 37px 0 35px; }
  .hero h1 { font-size: clamp(32px, 6vw, 44px); letter-spacing: -1px; }
  .collage { max-width: 320px; justify-self: center; margin-bottom: 4px; }
  .paper .paper-title { font-size: 26px; }
  .hero-actions { gap: 22px; font-size: 13px; }
  .eyebrow { font-size: 11px; letter-spacing: .8px; }
  .project-grid { grid-template-columns: minmax(0, 1fr); gap: 27px; }
  .project { --project-art-scale: .72; display: grid; grid-template-columns: 96px minmax(0, 1fr); gap: 18px; align-items: start; margin-top: 0; padding: 20px 16px; }
  .project .project-cover { height: 126px; margin-bottom: 0; }
  .cover-flower { width: 25px; height: 25px; top: 13px; right: 7px; }
  .project-console::after { top: 12px; right: 20px; width: 22px; height: 5px; }
  .project-browser .cover-flower { right: 0; top: 8px; width: 22px; height: 22px; }
  .chart-coin { width: 20px; height: 20px; right: 7%; top: 14px; border-width: 5px; }
  .viewfinder { width: 94%; }
  .project h3 { font-size: 20px; }
  .project .project-desc { margin-top: 6px; }
  .project .project-language { margin-top: 9px; }
  .project-story { margin-top: 5px; }
  .project-story { --story-offset: 114px; }
  .lower { grid-template-columns: minmax(0, 1fr); gap: 35px; margin-top: 38px; }
  .article-link { grid-template-columns: 82px minmax(0, 1fr) 14px; }
  .about-note { padding: 24px; }
  .about-mark { justify-content: start; gap: 18px; }
  .home-footer { margin-top: 34px; font-size: 11px; }
}

@media (max-width: 380px) {
  .home { padding: 0 20px; }
  .hero-actions { gap: 15px; font-size: 12px; }
  .primary-link { padding: 11px 13px; gap: 11px; }
  .paper .paper-title { font-size: 23px; }
  .paper .paper-rule { margin-bottom: 8px; }
  .code-body { padding: 10px 12px; }
  .code-body code { font-size: 11px; }
  .project { --project-art-scale: .55; grid-template-columns: 72px minmax(0, 1fr); gap: 14px; padding-right: 14px; padding-left: 14px; }
  .project .project-cover { height: 111px; }
  .project .project-desc { font-size: 13px; }
  .project-story { --story-offset: 86px; }
  .section-meta { font-size: 11px; }
  .heading-label { gap: 5px 8px; }
  .article-link { grid-template-columns: 72px minmax(0, 1fr) 12px; gap: 9px; }
  .article-date { font-size: 10px; }
  .article-title { font-size: 13px; }
}

@media (prefers-reduced-motion: reduce) {
  .home *, .home *::before, .home *::after { animation: none !important; transition: none !important; }
  .home .arrow { transform: none !important; }
  .home :is(a, button):active { transform: none; }
}
</style>
