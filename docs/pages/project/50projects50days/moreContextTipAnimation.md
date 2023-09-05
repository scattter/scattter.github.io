# More Context Tip Animation

## 1. 实现效果
<MoreContextTipAnimation />

## 2. 具体实现一(单文件应用)
该组件主要是为了在内容过多的时候提示用户进行下拉, 第一版是使用简单的ts代码和html标签进行硬处理, 考虑后面使用vue指令实现

原理是监听最后一个元素的可见度来控制动画的展示

html代码
```html
<div class="wrapper view-demo-component">
  <div class="main">
    <div class="card">1</div>
    <div class="card">2</div>
    <div class="card">3</div>
    <div class="card">4</div>
    <div class="card">5</div>
    <div class="card">6</div>
    <div class="card">7</div>
  </div>
  <div class="tip">
    <div class="tip-text">more</div>
    <div class="tip-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
           class="bi bi-chevron-double-down" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
        <path fill-rule="evenodd"
              d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
      </svg>
    </div>
  </div>
</div>
```
ts代码
```typescript
const cards: HTMLCollectionOf<Element> = document.getElementsByClassName('card')
let card: Element = cards.item(cards.length - 1)
const tipEle = document.querySelector('.tip')
const ob = new IntersectionObserver(function(entries) {
    if (entries[0].intersectionRatio < 0.8) {
      tipEle.classList.contains('tip-hidden') && tipEle.classList.remove('tip-hidden')
    } else if (entries[0].intersectionRatio === 1) {
      !tipEle.classList.contains('tip-hidden') && tipEle.classList.add('tip-hidden')
    }
  }, {
    root: document.querySelector('.main'),
    threshold: [0.8, 1]
  }
)
ob.observe(card)
```

## 3. 具体实现二(基于creatApp添加指令)
在上一部分的末尾, 计划使用指令实现该功能, 因为之前研究不够深入, 经过一番搜索发现很难实现, 问了组内的大佬, 说这种需求的话不如写一个组件, 使用`slot`实现, 但是想着写就写了, 就当尝试下
所以就用了一些不太正常的方法写了下, 后面再把组件方式更新下
> 实现这里的时候找了许多方法, 但是都卡在了vnode创建后不能在编译父组件的时候插入这里, 使用了h函数, SFC编译等...  许多vue的底层原理还是要看一下才行
> 这里的实现有一些蠢, 其实差不多就是新写一个组件

demo组件
该组件绑定了`v-more-context-tip` 指令, 该指令需要传入两个参数, 以帮助指令内部判断对哪些元素进行监听
```vue
<template>
  <div v-more-context-tip="{ parentRef: 'main', targetRef: 'card' }" class="wrapper view-demo-component">
    <div class="main">
      <div class="card">1</div>
      <div class="card">2</div>
      <div class="card">3</div>
      <div class="card">4</div>
      <div class="card">5</div>
      <div class="card">6</div>
      <div class="card">7</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { createApp } from "vue";
import MoreContextTip from './DirectiveComponent.vue'
const vMoreContextTip = {
  beforeMount: (el, binding) => {
    // 由于实例挂载的时候会把根节点下的子元素替换掉, 所以这里先保存下
    const oldEle = el.children[0]
    // 获取需要监听的元素
    const { parentRef, targetRef } = binding.value
    const items: HTMLCollectionOf<Element> = el.getElementsByClassName(targetRef)
    const target: Element = items.item(items.length - 1)
    const parent = el.getElementsByClassName(parentRef).item(0)
    // 创建实例, 将需要监听的元素传给实例
    const tip = createApp(MoreContextTip, { parent, target })
    // 目标元素挂载实例
    tip.mount(el)
    // 添加旧节点
    el.appendChild(oldEle)
  }
}

</script>
<style lang="scss" scoped>
.wrapper {
  position: relative;
}
.main {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow-y: auto;
  .card {
    display: inline-block;
    width: 90%;
    margin: 20px 5%;
    height: 120px;
    line-height: 120px;
    text-align: center;
    background-color: steelblue;
    font-size: 30px;
    color: #eafbff;
  }
}
</style>
```

指令的dom结构和样式组成的vue文件
该组件接受两个props, 一个表示监听的包裹元素, 另一个是具体监听的元素
```vue
<template>
  <div ref="tip" class="v-tip">
    <div class="v-tip-text">more</div>
    <div class="v-tip-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-down" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
        <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
      </svg>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
const props = defineProps({
  parent: {
    type: Object,
    default: null,
    required: false
  },
  target: {
    type: Object,
    default: null,
    required: false
  }
})

// 如果不用ref获取元素的话, 首次加载会取不到tip元素
const tip = ref()

onMounted(() => {
  const tipEle = tip.value
  const ob = new IntersectionObserver(function(entries) {
    if (entries[0].intersectionRatio < 0.8) {
      tipEle.classList.contains('v-tip-hidden') && tipEle.classList.remove('v-tip-hidden')
    } else if (entries[0].intersectionRatio === 1) {
      !tipEle.classList.contains('v-tip-hidden') && tipEle.classList.add('v-tip-hidden')
    }
  }, {
    root: props.parent,
    threshold: [0.8, 1]
  })
  ob.observe(props.target)
})
</script>
<style lang="scss" scoped>
.v-tip {
  opacity: 1;
  transition: opacity 0.5s linear;
  .v-tip-text, .v-tip-icon {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-weight: bold;
    color: #4E5969;
  }
  .v-tip-text {
    bottom: 40px;
  }
  .v-tip-icon {
    bottom: 15px;
    animation: v-tip-bounce 2s linear 0s infinite;
  }
}
.v-tip-hidden {
  opacity: 0;
}
@keyframes v-tip-bounce {
  0%,50% {
    bottom: 15px;
  }
  70% {
    bottom: 20px;
  }
  85% {
    bottom: 15px;
  }
  93% {
    bottom: 18px;
  }
  100% {
    bottom: 15px;
  }
}
</style>
```

## 4. 具体实现三(新建组件)
...


<script setup>
import MoreContextTipAnimation from './viewComponent/MoreContextTip/MoreContextTipAnimation.vue'
</script>