# 打字机动画

## 1. 实现效果
<PrintText />

## 2. 具体实现
> https://developer.mozilla.org/zh-CN/docs/Web/API/Element/innerHTML

这里的实现其实比较简单, 就是一个css动画即可. 但也做了一些额外的优化:
- 支持范围限制
  - 在做文本填充的时候加了一些判断, 即只支持纯文本的节点
- 添加文本方法优化
  - 一开始我使用的是`innerHtml` 来修改节点内容的, 但是由于改api存在一些风险, 所以采取了更保险的`textContent`
  
```vue
<template>
  <div class="view-demo-component">
    <div class="print-text-demo">this is 打字机</div>
  </div>
</template>
<script setup>
import {onMounted} from "vue";

onMounted(() => {
  const textElm = document.querySelector('.print-text-demo')
  const childNodes = textElm.childNodes
  if (childNodes.length === 1 && childNodes[0].nodeType === 3) {
    const texts = childNodes[0].textContent.split('').reverse()
    textElm.textContent = ''
    setInterval(() => {
      if (texts.length === 0) {
        return
      }
      textElm.textContent += texts.pop()
    }, 200)
  } else {
    throw new Error('target element is not a text node')
  }
})
</script>
<style lang="scss" scoped>
.view-demo-component {
  display: flex;
  justify-content: center;
  align-items: center;
  .print-text-demo {
    width: 200px;
    height: 40px;
    line-height: 40px;
    font-size: 24px;
    text-align: center;
    background-color: aqua;
    border-radius: 20px;
  }
  .print-text-demo::after {
    content: '_';
    margin-left: 4px;
    opacity: 1;
    animation: flash 0.7s infinite;
  }
  @keyframes flash {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
}
</style>
```

这里也可以封装为vue的指令来进行使用

<script setup>
import PrintText from './viewComponent/PrintText.vue'
</script>