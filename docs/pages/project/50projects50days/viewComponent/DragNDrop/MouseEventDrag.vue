<template>
  <div class="mouse-drag-wrapper view-demo-component">
    <div class="wrapper">
      <div class="area target"></div>
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
  const wrapper = document.querySelector('.wrapper')
  const dragWrapper = document.querySelector('.mouse-drag-wrapper')

  // 我们当前正在飞过的潜在的 droppable 的元素
  let currentDroppable = null;
  // 当前元素
  let curTarget = areas[0]

  const handleEleLeave = () => {
    if (currentDroppable) {
      // 处理“飞出” droppable 的元素时的处理逻辑（移除高亮）
      currentDroppable.classList.contains('active') && currentDroppable.classList.remove('active')
    }
  }

  const handleEleEnter = (elemBelow) => {
    if (currentDroppable) {
      // 处理“飞入” droppable 的元素时的逻辑
      !elemBelow.classList.contains('active') && elemBelow.classList.add('active')
    }
  }

  areas.forEach(area => {
    area.addEventListener('mousedown', (e) => {
      // 如果当前元素不是默认拖拽元素, return
      if (!area.classList.contains('target')) return
      area.classList.remove('target')

      // 设置temp元素, 添加动画
      const { offsetX, offsetY, layerX, layerY } = e
      const temp = document.createElement('div')
      temp.style.position = 'absolute'
      temp.style.left = layerX - offsetX + 'px'
      temp.style.top = layerY - offsetY + 'px'
      temp.style.width = area.offsetWidth + 'px'
      temp.style.height = area.offsetHeight + 'px'
      temp.style.opacity = '0.3'
      temp.style.border = '4px solid #000'
      temp.style.background = 'background: #4E5969 url("../../../../public/logo.jpeg") center/cover no-repeat'

      // 监听temp元素移动
      temp.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = dragWrapper.getBoundingClientRect()
        // 设置temp的位置 (这里根据自己情况调整, 当前鼠标距离屏幕的边距 - dragWrapper距离屏幕的边距 - dragWrapper的内边距)
        temp.style.left = e.pageX - left - width * 0.05 + 'px'
        temp.style.top = e.pageY - top - height * 0.05 + 'px'

        // 这里通过先隐藏后展示, 来获取被temp遮挡的下层元素
        temp.hidden = true
        let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
        temp.hidden = false

        // 移除上一个可拖拽元素的样式
        handleEleLeave()

        // 如果当前鼠标移动过的元素是null 或者 不符合拖拽, return
        if (!elemBelow || !elemBelow.classList.contains('area')) return

        // 更新新的可拖拽元素
        currentDroppable = elemBelow;

        // 为新的可拖拽元素添加样式
        handleEleEnter(elemBelow)
      })

      // 监听temp元素上鼠标抬起
      temp.addEventListener('mouseup', (e) => {
        // temp元素作用完成, 移除
        temp.remove()

        // 获取当前鼠标弹起时下方的元素
        let elemBelow = document.elementFromPoint(e.clientX, e.clientY);

        // 判断是否是可拖拽元素, 不是的话就保持之前状态
        if (!elemBelow.classList.contains('area')) {

          // 保持之前状态
          curTarget.classList.add('target')
          // 移除拖拽样式
          curTarget.classList.contains('active') && curTarget.classList.remove('active')

          // 处理“飞出” droppable 的元素时的处理逻辑（移除高亮
          handleEleLeave()
          return
        }

        // 当前元素是可拖拽元素, 进行更新
        curTarget = elemBelow
        elemBelow.classList.add('target')
        elemBelow.classList.contains('active') && elemBelow.classList.remove('active')
      })

      // 父元素添加temp
      wrapper.append(temp)
    })
  })
})

</script>
<style lang="scss" scoped>
.mouse-drag-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
}
.wrapper {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 90%;
  height: 100%;
}
.area {
  border: 4px solid #000;
  width: 18%;
  height: 18%;
  background-color: white;
}
.move-area {
  width: 18%;
  height: 18%;
  opacity: 0.3;
  border: 4px solid #000;
  background: #4E5969 url("../../../../../public/logo.jpeg") center/cover no-repeat;
}
.active {
  border: 4px dashed white;
  background: #4E5969 center/cover no-repeat;
}
.target {
  background: url("../../../../../public/logo.jpeg") center/cover no-repeat;
}
</style>