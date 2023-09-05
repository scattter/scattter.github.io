<template>
  <div class="main-area view-demo-component">
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
  const boxes = document.querySelectorAll('.context')

  document.querySelector('.main-area').addEventListener('scroll', checkBoxes)

  // 初始化
  checkBoxes()

  function checkBoxes() {
    // 这里是视图窗口高度 / 5 * 4是一个冗余
    const mainArea = document.querySelector('.main-area')
    const { height: viewHeight, top: viewTop} = mainArea.getBoundingClientRect()
    const triggerBottom = (viewHeight + viewTop) / 5 * 4

    boxes.forEach(box => {
      const boxTop = box.getBoundingClientRect().top

      if(boxTop < triggerBottom) {
        box.classList.add('show')
      } else {
        box.classList.remove('show')
      }
    })
  }
})
</script>
<style lang="scss" scoped>
.main-area {
  overflow-x: hidden;
  overflow-y: auto;
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