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