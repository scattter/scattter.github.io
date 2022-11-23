<template>
  <div class="main-area view-component">
    <h1 style="text-align: center">Scroll Animation</h1>
    <div class="contexts">
      <div class="context">Node 1</div>
      <div class="context">Node 2</div>
      <div class="context">Node 3</div>
      <div class="context">Node 4</div>
      <div class="context">Node 5</div>
      <div class="context">Node 6</div>
      <div class="context">Node 7</div>
      <div class="context">Node 8</div>
      <div class="context">Node 9</div>
      <div class="context">Node 10</div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  const mainArea = document.getElementsByClassName('main-area').item(0)
  const contexts = document.getElementsByClassName('context')
  const viewHeight = mainArea.getBoundingClientRect().height
  let contextMargin = getComputedStyle(contexts.item(0))
  const CONTEXT_HEIGHT = contexts.item(0).clientHeight + parseInt(contextMargin.marginTop.split('px')[0]) * 2
  let curHeight = 0
  // 初始化展示context
  for (let i = 0; i < contexts.length; i++) {
    if (curHeight > viewHeight) break
    // 因为i从0开始, 所以+1  类似向上取整
    curHeight = (i + 1) * CONTEXT_HEIGHT
    contexts.item(i).classList.add('show')
  }
  let beforeScrollHeight = mainArea.scrollTop
  const animation = () => {
    const allScrollHeight = viewHeight + mainArea.scrollTop - CONTEXT_HEIGHT / 2
    const nextIndex = Math.min(Math.floor(curHeight / CONTEXT_HEIGHT), contexts.length - 1)
    // 判断页面是上滑还是下滑
    let scrollUp = false
    // 如果下一个scrollTop小于上一个scrollTop  那么说明是页面上滑
    if (beforeScrollHeight > mainArea.scrollTop) scrollUp = true
    beforeScrollHeight = mainArea.scrollTop
    // 处理下滑 判断当前节点的总高度是否大于视窗高度和滑动高度
    if (!scrollUp && curHeight < allScrollHeight) {
      contexts.item(nextIndex).classList.add('show')
      // 如果处理到最后一个card  不再进行后续处理
      nextIndex !== contexts.length - 1 && (curHeight += CONTEXT_HEIGHT)
    } else if (scrollUp && curHeight >= allScrollHeight) {
      contexts.item(nextIndex).classList.remove('show')
      nextIndex > Math.floor(viewHeight / CONTEXT_HEIGHT) + 1 && (curHeight -= CONTEXT_HEIGHT)
    }
  }
  mainArea.addEventListener('scroll', animation)
})
</script>
<style lang="scss" scoped>
.main-area {
  width: 100%;
  height: 60vh;
  background-color: antiquewhite;
  overflow: auto;
}
.contexts {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.context {
  width: 300px;
  height: 200px;
  border-radius: 10px;
  margin: 30px 0;
  background-color: steelblue;
  color: white;
  font-size: 30px;
  line-height: 200px;
  text-align: center;
  transition: transform 0.4s linear;
}
.contexts :nth-child(2n) {
  transform: translateX(400%);
}
.contexts :nth-child(2n - 1) {
  transform: translateX(-400%);
}
.show.context {
  transform: translateX(0);
}
</style>