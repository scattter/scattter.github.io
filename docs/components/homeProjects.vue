<template>
  <div ref="projectList" class="project-grid" :class="{ 'is-dialog': idPrefix === 'dialog' }">
    <article v-for="(project, index) in projectItems" :key="project.name" class="project" :class="[`project-${project.cover}`, { 'has-open-story': activeStory === project.name, 'project-has-wide-cover': project.screenshot?.wide }]">
      <div class="project-cover" :class="{ 'has-screenshot': project.screenshot, 'is-wide': project.screenshot?.wide }" :aria-hidden="project.screenshot ? undefined : true">
        <div v-if="project.screenshot" class="screenshot-trigger" :class="{ 'is-wide': project.screenshot.wide }" :style="project.screenshot.style" :data-screenshot-ratio="project.screenshot.aspect" @pointerenter="openScreenshot" @pointerleave="closeHoveredScreenshot">
          <button class="screenshot-button" type="button" :aria-label="`放大查看${project.name}的完整截图`" :aria-expanded="screenshotPreview?.id === `${idPrefix}-project-screenshot-${index}`" :aria-controls="`${idPrefix}-project-screenshot-${index}`" @click="openScreenshot">
            <span class="project-screenshot">
              <img :src="withBase(project.screenshot.src)" :alt="`${project.name}界面截图`" :width="project.screenshot.width" :height="project.screenshot.height" loading="lazy" decoding="async">
            </span>
            <span class="screenshot-zoom" aria-hidden="true">+</span>
          </button>
          <div :id="`${idPrefix}-project-screenshot-${index}`" class="screenshot-preview" popover="auto" role="region" :aria-label="`${project.name}完整页面截图`" @toggle="onScreenshotToggle">
            <div class="project-screenshot">
              <img :src="withBase(project.screenshot.src)" :alt="`${project.name}完整界面截图`" :width="project.screenshot.width" :height="project.screenshot.height" loading="lazy" decoding="async">
            </div>
          </div>
        </div>
        <template v-else-if="project.cover === 'journal'"><div class="notebook">心意</div><div class="flower cover-flower"></div></template>
        <template v-else-if="project.cover === 'photo'"><div class="photo-print"><div class="photo-landscape"></div><div class="photo-caption"></div></div><div class="flower cover-flower"></div></template>
        <template v-else-if="project.cover === 'air'"><div class="air-waves"><i></i><i></i><i></i></div><div class="air-sensor"><span>CO₂</span><div class="air-indicator"></div><div class="air-vents"></div></div></template>
        <template v-else-if="project.cover === 'console'"><div class="circuit-line"></div><div class="device"><div class="device-screen"><i></i><i></i><i></i><i></i></div><div class="device-buttons"><i></i><i></i><i></i></div></div></template>
        <template v-else-if="project.cover === 'chart'"><div class="chart-grid"></div><div class="chart-coin"></div><div class="fund-bars"><i></i><i></i><i></i></div></template>
        <template v-else-if="project.cover === 'camera'"><div class="viewfinder"><i></i><i></i><i></i><i></i></div><div class="camera"><div class="camera-lens"></div><div class="camera-stand"></div></div></template>
        <template v-else-if="project.cover === 'browser'"><div class="browser-sheet"><div class="browser-dots"><i></i><i></i><i></i></div><span>&lt;/&gt;</span><div class="browser-lines"><i></i><i></i></div></div><div class="flower cover-flower"></div></template>
        <div v-else class="tool-pieces"><span>{ }</span><span>&lt;/&gt;</span><span>+</span></div>
        <div v-if="project.screenshot" class="flower cover-flower" aria-hidden="true"></div>
      </div>
      <div class="project-content">
        <p class="project-category">{{ project.category }}</p>
        <h3>{{ project.name }}</h3>
        <p class="project-desc">{{ project.desc }}</p>
        <p class="project-language"><span :class="project.language.toLowerCase()" aria-hidden="true"></span>{{ project.language === 'Cpp' ? 'C++' : project.language }}</p>
        <div class="project-story" :class="{ 'is-open': activeStory === project.name }" @keydown.esc="closeStoryOnEscape">
          <button class="story-trigger" type="button" :aria-expanded="activeStory === project.name" :aria-controls="`${idPrefix}-project-story-${index}`" @click="activeStory = activeStory === project.name ? null : project.name">为什么做它 <span aria-hidden="true">+</span></button>
          <Transition name="story-bubble">
            <div v-show="activeStory === project.name" :id="`${idPrefix}-project-story-${index}`" class="story-popover" role="region" :aria-label="`${project.name}：为什么做它`">
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
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  projects: { type: Array, required: true },
  idPrefix: { type: String, required: true },
})

// 小程序截图顶部带有系统状态栏，裁掉后再按页面区域展示。
const DEFAULT_SCREENSHOT_WIDTH = 1272
const DEFAULT_SCREENSHOT_HEIGHT = 2772
const DEFAULT_SCREENSHOT_CROP = 11.3207547
const WIDE_PREVIEW_MAX_WIDTH = 1040
const NARROW_PREVIEW_MAX_WIDTH = 340

function getScreenshotMeta(project) {
  const width = Number(project.screenshotWidth) || DEFAULT_SCREENSHOT_WIDTH
  const height = Number(project.screenshotHeight) || DEFAULT_SCREENSHOT_HEIGHT
  // 裁剪值以图片宽度为基准，与 margin-top 的百分比计算保持一致。
  const crop = Number(project.screenshotCrop ?? (height > width ? DEFAULT_SCREENSHOT_CROP : 0))
  const visibleHeight = height - width * (crop / 100)
  return {
    src: project.screenshot,
    width,
    height,
    crop,
    aspect: width / visibleHeight,
    wide: width > visibleHeight,
    style: {
      '--screenshot-aspect': `${width} / ${visibleHeight}`,
      '--screenshot-crop': `${-crop}%`,
    },
  }
}

const projectItems = computed(() => props.projects.map(project => ({
  ...project,
  screenshot: project.screenshot ? getScreenshotMeta(project) : null,
})))

const projectList = ref(null)
const activeStory = ref(null)
const screenshotPreview = ref(null)
let screenshotOpenedByHover = false

function openScreenshot(event) {
  const isHover = event.type === 'pointerenter'
  if (isHover && event.pointerType !== 'mouse') return
  const trigger = event.currentTarget.closest('.screenshot-trigger')
  const preview = trigger.querySelector('.screenshot-preview')
  if (screenshotPreview.value === preview) return
  closeScreenshot()

  const rect = trigger.getBoundingClientRect()
  const ratio = Number(trigger.dataset.screenshotRatio) || DEFAULT_SCREENSHOT_WIDTH / (DEFAULT_SCREENSHOT_HEIGHT - DEFAULT_SCREENSHOT_WIDTH * DEFAULT_SCREENSHOT_CROP / 100)
  const maxWidth = ratio >= 1 ? WIDE_PREVIEW_MAX_WIDTH : NARROW_PREVIEW_MAX_WIDTH
  const width = Math.min(maxWidth, window.innerWidth - 32, (window.innerHeight - 32) * ratio)
  const height = width / ratio
  preview.style.width = `${width}px`
  preview.style.left = `${Math.max(16, Math.min(rect.left + rect.width / 2 - width / 2, window.innerWidth - width - 16))}px`
  preview.style.top = `${Math.max(16, Math.min(rect.top + rect.height / 2 - height / 2, window.innerHeight - height - 16))}px`
  screenshotOpenedByHover = isHover
  screenshotPreview.value = preview
  // 原生 popover 位于顶层，避免完整截图被项目弹窗的滚动区域裁切。
  preview.showPopover()
}

function closeScreenshot() {
  screenshotPreview.value?.hidePopover()
  screenshotPreview.value = null
}

function closeHoveredScreenshot(event) {
  if (event.pointerType === 'mouse' && screenshotOpenedByHover) closeScreenshot()
}

function onScreenshotToggle(event) {
  if (event.newState === 'closed' && screenshotPreview.value === event.currentTarget) screenshotPreview.value = null
}

function closeProjectStory(event) {
  activeStory.value = null
  event.currentTarget.closest('.project-story')?.querySelector('.story-trigger')?.focus({ preventScroll: true })
}

function closeStoryOnEscape(event) {
  if (!activeStory.value) return
  event.preventDefault()
  event.stopPropagation()
  closeProjectStory(event)
}

function closeOutsideStories(event) {
  const story = projectList.value?.querySelector('.project-story.is-open')
  if (story && !story.contains(event.target)) activeStory.value = null
}

onMounted(() => {
  document.addEventListener('pointerdown', closeOutsideStories)
  document.addEventListener('scroll', closeScreenshot, true)
  window.addEventListener('resize', closeScreenshot)
})
onBeforeUnmount(() => {
  closeScreenshot()
  document.removeEventListener('pointerdown', closeOutsideStories)
  document.removeEventListener('scroll', closeScreenshot, true)
  window.removeEventListener('resize', closeScreenshot)
})
</script>

<style scoped>
.project h3, .project p { margin: 0; }
.project button { font: inherit; cursor: pointer; }
.project button:focus-visible { outline: 2px solid var(--home-accent); outline-offset: 5px; border-radius: 4px; }
.flower { width: 100%; height: 100%; background: #efb69c; clip-path: polygon(50% 0,61% 25%,85% 15%,75% 39%,100% 50%,75% 61%,85% 85%,61% 75%,50% 100%,39% 75%,15% 85%,25% 61%,0 50%,25% 39%,15% 15%,39% 25%); }
.project-grid { display: grid; grid-template-columns: 1fr 1.06fr .98fr; align-items: start; gap: 34px 26px; padding-top: 10px; }
.project { --project-art-scale: 1; --project-angle: 0deg; position: relative; z-index: 0; display: flex; flex-direction: column; min-width: 0; padding: 20px 22px 17px; }
/* 只裁切背景，文字与气泡保留独立且可溢出的空间。 */
.project::before { content: ''; position: absolute; z-index: -1; inset: 0; background: var(--home-green-surface); transform: rotate(var(--project-angle)); transition: transform .4s ease; pointer-events: none; }
.project::after { position: absolute; pointer-events: none; }
.project:focus-within { z-index: 2; }
.project.has-open-story { z-index: 3; }
.project-content { display: flex; flex: 1; flex-direction: column; min-width: 0; }
.project-cover { position: relative; display: flex; flex-shrink: 0; justify-content: center; align-items: center; height: 156px; margin-bottom: 18px; }
.project-cover.has-screenshot::before { content: ''; position: absolute; left: 50%; top: 12%; width: 76%; max-width: 180px; height: 78%; border: 1px solid #c6d8c9; border-radius: 28px 12px 32px 10px; background: #d4e3d5; box-shadow: 7px 6px 0 #e0e9dd; transform: translateX(-50%) rotate(8deg); transition: transform .4s ease; pointer-events: none; }
.project-cover.has-screenshot::after { content: ''; position: absolute; top: 10%; left: 20%; width: 35px; height: 13px; background: #e6d49dbb; clip-path: polygon(3% 0,97% 4%,100% 91%,96% 100%,2% 97%,0 5%); transform: rotate(-18deg); pointer-events: none; }
.project-photo .project-cover.has-screenshot::before { border-color: #e1d9cb; border-radius: 12px 30px 14px 26px; background: #eeddd0; box-shadow: 7px 6px 0 #e9d9ca; transform: translateX(-50%) rotate(-8deg); }
.project-photo .project-cover.has-screenshot::after { background: #c6d8c9bb; transform: rotate(12deg); }
.project-cover.has-screenshot > .cover-flower { pointer-events: none; }
/* 桌面端截图比例更宽，换成一页纸的衬底和一条胶带，不抢截图里的信息。 */
.project-cover.is-wide.has-screenshot::before { content: ''; position: absolute; left: 50%; top: 5%; width: 100%; max-width: 100%; height: 90%; border: 1px solid #c6d8c9; border-radius: 9px 4px 12px 5px; background: #dfeadd; box-shadow: 5px 5px 0 #e0e9dd; transform: translateX(-50%) rotate(2.2deg); transition: transform .4s ease; pointer-events: none; }
.project-cover.is-wide.has-screenshot::after { content: ''; position: absolute; top: 2%; left: 15%; width: 42px; height: 13px; background: #e6d49dbb; clip-path: polygon(3% 0,97% 4%,100% 91%,96% 100%,2% 97%,0 5%); transform: rotate(-7deg); pointer-events: none; }
.project-cover.is-wide > .cover-flower { display: none; }
.screenshot-trigger { position: relative; z-index: 1; height: 100%; max-width: 100%; aspect-ratio: var(--screenshot-aspect, 1272 / 2628); }
.screenshot-trigger.is-wide { width: 100%; height: auto; }
.project .screenshot-button { position: relative; display: block; width: 100%; height: 100%; padding: 0; border: 0; border-radius: 8px; background: var(--home-paper); box-shadow: 0 0 0 4px var(--home-paper), 0 8px 18px #29312c26; transform: rotate(-7deg) scale(.9); transition: transform .4s ease; cursor: zoom-in; }
.project .screenshot-trigger.is-wide .screenshot-button { height: auto; aspect-ratio: var(--screenshot-aspect, 1806 / 959); border-radius: 10px; transform: rotate(-1.2deg) scale(.97); }
.project-photo .screenshot-button { transform: rotate(7deg) scale(.9); }
.project-screenshot { display: block; width: 100%; aspect-ratio: var(--screenshot-aspect, 1272 / 2628); overflow: hidden; border-radius: inherit; }
/* 截图可通过 --screenshot-crop 裁掉顶部状态栏，默认两张小程序原图各裁掉 144px。 */
.project-screenshot img { display: block; width: 100%; height: auto; margin-top: var(--screenshot-crop, -11.3207547%); }
.screenshot-zoom { position: absolute; right: 4px; bottom: 4px; display: grid; place-items: center; width: 20px; height: 20px; border-radius: 50%; background: var(--home-paper); color: var(--home-accent); box-shadow: 0 2px 6px #18251d26; font-size: 17px; line-height: 1; }
.screenshot-preview { position: fixed; inset: auto; max-width: none; max-height: none; margin: 0; padding: 0; border: 0; border-radius: 14px; background: var(--home-paper); color: var(--home-text); box-shadow: 0 18px 60px #18251d40, 0 0 0 1px var(--home-line); }
.screenshot-preview:popover-open { animation: screenshot-enter .16s ease-out; }
@keyframes screenshot-enter { from { opacity: 0; transform: scale(.97); } to { opacity: 1; transform: scale(1); } }
.project-journal { --project-angle: -1.2deg; }
.project-journal::before { border-radius: 9px 13px 2px 5px; clip-path: polygon(0 0,100% 0,100% 98%,93% 99%,86% 98%,79% 100%,71% 98%,64% 99%,56% 98%,49% 100%,41% 98%,33% 99%,25% 98%,17% 100%,9% 98%,0 99%); }
.project-journal::after { content: ''; top: -7px; left: 31%; width: 64px; height: 20px; background: #e6d49d99; transform: rotate(-6deg); clip-path: polygon(3% 0,97% 4%,100% 91%,96% 100%,2% 97%,0 5%); }
.project-photo { --project-angle: 1deg; margin-top: 20px; }
.project-photo::before { background: var(--home-peach-surface); border-radius: 10px 32px 12px 24px; }
.project-air { --project-angle: -.7deg; margin-top: 8px; }
.project-air::before { background: var(--home-blue-surface); border-radius: 42px 16px 32px 12px; }
.project-drink { --project-angle: -.7deg; margin-top: 8px; }
.project-drink::before { background: var(--home-green-surface); border-radius: 48px 14px 36px 16px / 32px 14px 26px 16px; }
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
.photo-print { flex-shrink: 0; width: 102px; height: 118px; padding: 8px; border: 1px solid #e1d9cb; background: #fffefb; box-shadow: 7px 6px 0 #e9d9ca; transform: rotate(-9deg) scale(var(--project-art-scale)); transition: transform .4s ease; }
.photo-landscape { position: relative; height: 78px; overflow: hidden; background: #d8e6e9; }
.photo-landscape::before { content: ''; position: absolute; width: 19px; height: 19px; top: 12px; right: 12px; border-radius: 50%; background: #ebcf86; }
.photo-landscape::after { content: ''; position: absolute; inset: 25px -5px 0; background: #99b7a2; clip-path: polygon(0 75%,32% 12%,58% 64%,77% 35%,100% 77%,100% 100%,0 100%); }
.photo-caption { width: 53%; height: 3px; margin: 12px auto 0; border-radius: 2px; background: #d9cbb7; }
.air-waves { position: absolute; display: grid; gap: 9px; width: 75%; transform: rotate(-7deg); }
.air-waves i { height: 16px; border-top: 2px solid #b4cecf; border-radius: 50%; }
.air-waves i:nth-child(2) { width: 90%; margin-left: 10%; }
.air-sensor { position: relative; display: flex; flex-shrink: 0; flex-direction: column; align-items: center; width: 87px; height: 108px; padding-top: 20px; border: 3px solid #c5d3d3; border-radius: 23px; background: #f3f6f1; box-shadow: 5px 5px 0 #dbe5e6; transform: rotate(7deg) scale(var(--project-art-scale)); transition: transform .4s ease; }
.air-sensor span { color: #536f65; font-family: var(--vp-font-family-mono); font-size: 22px; line-height: 1.4; }
.air-indicator { width: 24px; height: 4px; margin-top: 7px; border-radius: 3px; background: #96b99f; }
.air-vents { width: 35px; height: 8px; margin-top: 12px; background: repeating-linear-gradient(90deg,#becdca 0 2px,transparent 2px 6px); }
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


/* 弹窗的滚动容器会裁切悬浮气泡，因此初衷在卡片内展开。 */
.is-dialog .story-popover { position: static; margin-top: 8px; transform-origin: top; }
.is-dialog .story-popover::after { display: none; }
.is-dialog .story-body { max-height: none; overflow: visible; }
.is-dialog .story-bubble-enter-active, .is-dialog .story-bubble-leave-active { transition: opacity .18s ease; }
.is-dialog .story-bubble-enter-from, .is-dialog .story-bubble-leave-to { transform: none; }

@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .project:hover::before { transform: rotate(0); }
  .project:hover .project-cover.has-screenshot::before { transform: translateX(-50%) rotate(0) scale(1.03); }
  .project:hover .screenshot-button { transform: rotate(-2deg) translateY(-4px) scale(.94); }
  .project:hover .project-cover.is-wide .screenshot-button { transform: rotate(0) translateY(-4px) scale(1); }
  .project-photo:hover .screenshot-button { transform: rotate(2deg) translateY(-4px) scale(.94); }
  .project:hover .notebook { transform: rotate(-6deg) translateY(-5px) scale(var(--project-art-scale)); }
  .project:hover .cover-flower { transform: rotate(50deg); }
  .project:hover .photo-print { transform: rotate(-3deg) translateY(-4px) scale(var(--project-art-scale)); }
  .project:hover .air-sensor { transform: rotate(2deg) translateY(-4px) scale(var(--project-art-scale)); }
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
  .project-grid { gap: 25px 20px; }
  .project { padding-right: 17px; padding-left: 17px; }
}

@media (max-width: 700px) {
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
}

@media (max-width: 480px) {
  .is-dialog .project { --project-art-scale: .55; grid-template-columns: 72px minmax(0, 1fr); gap: 12px; padding-right: 14px; padding-left: 14px; }
  .is-dialog .project .project-cover { height: 111px; }
}

@media (max-width: 380px) {
  .project { --project-art-scale: .55; grid-template-columns: 72px minmax(0, 1fr); gap: 14px; padding-right: 14px; padding-left: 14px; }
  .project .project-cover { height: 111px; }
  .project .project-desc { font-size: 13px; }
  .project-story { --story-offset: 86px; }
}

/* 宽截图在窄屏上横跨整张卡片，避免缩进 96px 的封面栏后看不清内容。 */
@media (max-width: 700px) {
  .project.project-has-wide-cover { grid-template-columns: minmax(0, 1fr); gap: 14px; }
  .project.project-has-wide-cover .project-cover { height: auto; margin-bottom: 0; }
  .project.project-has-wide-cover .project-story { --story-offset: 0px; }
}

@media (prefers-reduced-motion: reduce) {
  .project-grid *, .project-grid *::before, .project-grid *::after { animation: none !important; transition: none !important; }
}
</style>
