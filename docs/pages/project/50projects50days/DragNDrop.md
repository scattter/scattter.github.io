# Drag N Drop

## 1. 实现效果
<MouseEventDrag />

## 2. 具体实现
### 2.1 使用Mouseevent实现
> 该方案的关键是`elementFromPoint` 方法
该方案主要是用了比较基础的mouseevent, 动画也算是比较流畅, 使用的时候需要自己进行一些调整, 代码如下
```vue
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
        // 设置temp的位置
        temp.style.left = e.pageX - dragWrapper.getBoundingClientRect().left - dragWrapper.getBoundingClientRect().width * 0.05 + 'px'
        temp.style.top = e.pageY - dragWrapper.getBoundingClientRect().top - dragWrapper.getBoundingClientRect().height * 0.05 + 'px'

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
```
在上面这段代码中最关键的是`elementFromPoint`这个方法, 该方法返回给定坐标点下最上层的元素, 同时配合下段代码
```vue
// 这里通过先隐藏后展示, 来获取被temp遮挡的下层元素
        temp.hidden = true
        let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
        temp.hidden = false
```
这样就可以定位到当前鼠标的target元素.


### 2.2 使用drag事件实现
> 这里有篇关于setTimout和拖拽优化相关的文章也推荐读下, https://segmentfault.com/a/1190000039267035
该方案无疑是更简单的方案, 也是原项目的使用方案. 在这个方案中主要是处理不同的拖拽事件.
```vue
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
```
<script setup>
import MouseEventDrag from './viewComponent/DragNDrop/MouseEventDrag.vue'
</script>