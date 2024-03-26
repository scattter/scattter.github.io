<template>
  <div class="wrapper view-demo-component">
    <div class="inner"></div>
    <div class="outer"></div>

    <div class="area-wrapper">
      <div class="area">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </div>

      <div class="area">
        Magnam officiis sapiente laboriosam aut earum.
      </div>

      <div class="area">
        Ut porro officiis accusamus perferendis labore.
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 定义常量, 减少计算
  // hover效果时边框宽度/内部圆半径/外部圆半径
  const HOVER_WIDTH = 4
  const INNER_RADIUS = 4
  const OUTER_RADIUS = 15

  const wrapper = document.querySelector(".wrapper");
  const inner = document.querySelector(".inner")
  const outer = document.querySelector(".outer")
  const areas = document.querySelectorAll(".area")
  // let isHover = false

  /**
   * 处理初始鼠标渲染动画
   */
  function appear() {
    inner.style.opacity = 1
    outer.style.opacity = 1
  }
  wrapper.addEventListener('mouseover', appear, { once: true })

  /**
   * 处理鼠标移动动画
   */
  wrapper.addEventListener('mousemove', (e) => {
    window.requestAnimationFrame(function() {
      const { x: wrapperX, y: wrapperY } = wrapper.getBoundingClientRect()
      const target = e.target
      inner.style.left = `${e.clientX - INNER_RADIUS - wrapperX}px`
      inner.style.top = `${e.clientY - INNER_RADIUS - wrapperY}px`
      // 如果hover到目标元素
      if (target.classList.contains('area')) {
        const { left, top, width, height } = target.getBoundingClientRect()
        // 如果已经有hover类名, 说明已经变换过了, 后续就不需要再进行样式设置了
        if (outer.classList.contains('cursor-hover')) {
          return;
        }
        outer.style.left = `${left - HOVER_WIDTH - wrapperX}px`
        outer.style.top = `${top - HOVER_WIDTH - wrapperY}px`
        outer.style.width = `${width + HOVER_WIDTH * 2}px`
        outer.style.height = `${height + HOVER_WIDTH * 2}px`
        const style = window.getComputedStyle(target)
        outer.style.borderRadius = `${style.borderRadius}`
        outer.classList.add('cursor-hover')
      } else {
        // 如果没有hover类名, 且当前没有hover到元素上 & 不是首次渲染 => 不进行后面操作
        if (!outer.classList.contains('cursor-hover') && !outer.style.opacity) {
          return;
        }
        outer.style.width = `${OUTER_RADIUS * 2}px`
        outer.style.height = `${OUTER_RADIUS * 2}px`
        outer.style.borderRadius = '50%'
        outer.style.left = `${e.clientX - OUTER_RADIUS - wrapperX}px`
        outer.style.top = `${e.clientY - OUTER_RADIUS - wrapperY}px`
        outer.classList.remove('cursor-hover')
      }
    })
  })
})
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.wrapper {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin: 0;
  padding: 0;
  cursor: none;
}
.inner, .outer {
  position: absolute;
  border-radius: 50%;
  background: #4caf50;
  z-index: 1;
  opacity: 0;
  mix-blend-mode: exclusion;
  pointer-events: none;
}
.inner {
  width: 8px;
  height: 8px;
}
.outer {
  width: 30px;
  height: 30px;
  background: #fff;
  transition: .1s ease-out;
}

.area-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.area {
  width: 100px;
  height: 100px;
  overflow: auto;
  border: 2px solid #000;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  line-height: 1.5;
  background-color: #4caf50;
  color: #fff;
}
.area:nth-child(2) {
  width: 80px;
  height: 80px;
  border-radius: 24px;
  background-color: darkgray;
}
.area:nth-child(3) {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: aqua;
}
</style>