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