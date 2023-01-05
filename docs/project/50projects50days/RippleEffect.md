# Ripple Effect
## 1. 实现效果
<RippleEffect />

## 2. 具体实现
在这里有两种实现, 一种是单次点击, 即无论点击多少次, 都是在一段时间内只触发一次动画, 如第一个区域; 另一种就可以重复点击, 一直触发, 如第二个区域

这两种效果的主要区别在于, 第一种单击是控制button里面子元素的展示与否, 从前到尾都是一个元素; 但是第二种则是添加新元素, 即点击一次添加一个元素, 具体代码为
HTML结构
```vue
<template>
  <div class="view-demo-component main-area">
    <button class="ripple-button" @click="handleClick">
      single click
      <span v-show="state.visible" class="ripple-bg"></span>
    </button>
    <button class="ripple-button multiple-button" @click="handleMultipleClick">multiple click</button>
    <span class="ripple-bg multiple-ripple"></span>
  </div>
</template>
```

第一种触发方法
```javascript
const handleClick = (e) => {
  if (state.visible === true) return
  const btn = document.querySelector('.ripple-button')
  const ripple = document.querySelector('.ripple-bg')
  const rect = btn.getBoundingClientRect()
  const { left: leftEle, top: topEle } = rect
  const left = e.clientX  - leftEle
  const top = e.clientY  - topEle

  ripple.style.left = left + 'px'
  ripple.style.top = top + 'px'
  state.visible = true

  setTimeout(() => state.visible = false, 800)
}
```

第二种触发方法
```javascript
const handleMultipleClick = (e) => {
  const btn = document.querySelector('.multiple-button')
  const rect = btn.getBoundingClientRect()
  const { left: leftEle, top: topEle } = rect
  const left = e.clientX  - leftEle
  const top = e.clientY  - topEle

  const ripple = document.querySelector('.multiple-ripple').cloneNode(true)
  ripple.style.left = left + 'px'
  ripple.style.top = top + 'px'
  btn.appendChild(ripple)

  setTimeout(() => btn.removeChild(ripple), 800)
}
```

<script setup>
import RippleEffect from './viewComponent/RippleEffect.vue'
</script>