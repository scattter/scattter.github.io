<template>
  <div class="mouse-drag-wrapper view-demo-component">
    <div class="wrapper">
      <div class="area">
        <div class="target" draggable="true"></div>
      </div>
      <div class="area"></div>
      <div class="area"></div>
      <div class="area"></div>
      <div class="area"></div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  const areas = document.querySelectorAll('.area')
  const target = document.querySelectorAll('.target')

  // 对可拖拽目标添加对应的事件监听
  target.addEventListener('dragstart', dragStart)
  target.addEventListener('dragend', dragEnd)

  // 对可拖放区域添加对应的事件监听
  areas.forEach(area => {
    area.addEventListener('dragover', dragOver)
    area.addEventListener('dragenter', dragEnter)
    area.addEventListener('dragleave', dragLeave)
    area.addEventListener('drop', dragDrop)
  })

  // 设置无意义类名, 隐藏可拖放区域的背景
  // 这里使用异步回调, 因为同步的话会导致不能进行拖拽等后续操作(因为没有target这个可拖拽目标)
  function dragStart() {
    this.classList.add('hold')
    setTimeout(() => this.className = 'invisible', 0)
  }

  // 重置类名
  // 如果拖拽到非可拖拽区域, 也是将dragStart里面的历史元素重置类名进行展示
  function dragEnd() {
    this.className = 'target'
  }

  function dragOver(e) {
    e.preventDefault()
  }

  // 移进可拖拽区域
  function dragEnter(e) {
    e.preventDefault()
    this.classList.add('active')
  }

  // 移出可拖拽区域
  function dragLeave() {
    this.classList.remove('active')
  }

  // 松手后设置背景(因为只有可拖拽区域添加这个监听了)
  function dragDrop() {
    this.append(target)
    this.classList.remove('active')
  }
})
</script>
<style lang="scss" scoped>
body {
  display: flex;
  justify-content: center;
  margin: 0;
  width: 100vw;
  height: 100vh;
  background-color: aqua;
}
.wrapper {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
}
.area {
  border: 4px solid #000;
  width: 18%;
  height: 18%;
  background-color: white;
}
.active {
  border: 4px dashed white;
  background: #4E5969 center/cover no-repeat;
}
.target {
  width: 100%;
  height: 100%;
  background: url("../../../../../public/logo.jpeg") center/cover no-repeat;
}
.hold {
  border: solid 4px #000;
}
</style>