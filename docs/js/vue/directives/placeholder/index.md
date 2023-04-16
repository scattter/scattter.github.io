# Placeholder指令

## 1. 实现效果
<Placeholder />

## 2. 具体实现

> 目前只做了简单单行纯文本的展示, 还没做其他的功能

指令代码: `placeholder.ts`

```typescript
import { DirectiveBinding } from "@/types/common";

interface BindingElType extends HTMLElement {}

export const placeholder = {
  beforeMount(el: BindingElType, binding: DirectiveBinding, vnode: any) {
    // 找到在vnode上和当前指令更新后值相等的指令, 只要是找到了, 就说明肯定有这个数据(使用的时候绑定的是后端返回值), 即使是其他指令也没关系
    const targetDir = vnode.dirs.find((dir: DirectiveBinding) => dir.value === binding.value && dir.value !== undefined)
    // 这里主要是用来处理动态渲染的懒加载逻辑
    if (targetDir) {
      // 支持空数据的默认处理: 优先级为绑定值 > 手动赋值 > 指令默认展示值 '- -' > ''
      el.innerHTML = targetDir.value || binding.arg || (binding.modifiers.empty && '- -')
      el.classList.remove('v-animation-bg')
      el.classList.remove('v-animated-bg-text')
    } else {
      // 初始的时候都添加动画
      el.classList.add('v-animation-bg')
      el.classList.add('v-animated-bg-text')
    }
  },
  updated(el: BindingElType, binding: DirectiveBinding) {
    el.classList.remove('v-animation-bg')
    el.classList.remove('v-animated-bg-text')
    // 支持空数据的默认处理: 优先级为绑定值 > 手动赋值 > 指令默认展示值 '- -' > ''
    el.innerHTML = binding.value || binding.arg || (binding.modifiers.empty && '- -') || ''
  }
}
```

这种方案有一个不好的地方就是需要提前将这个元素定好长宽.

目前支持: 

- 静态节点渲染动画

这种是事先写好节点, 然后在指令内部监听绑定值的变化. 在节点更新前为节点添加动画样式类, 在指令绑定的值发生变化后再将这个动画样式类名移除, 进而实现懒加载loading的效果.

- 动态节点渲染动画

对于动态渲染数据的情况, 因为加载到数据后节点会重新渲染, 所以这里用了vnode进行查找vnode节点, 然后根据初始数据肯定为undefined, 后端请求数据不为undefined的逻辑来判断是否请求到数据, 进而移除动画.

这里不用准确找到当前指令, 只要指令的值是相等的且不为undefined就可以确定请求结束了.

- 当返回数据为空的时候展示文本

  这里有两种展示文本(因为动画的实现原理是添加背景, 所以不能使用 `a || '暂无数据'` 的格式写默认文本, 否则loading 的时候就会出现文字)

  - 一种是使用者定义的, 这里用了指令上的`arg` 参数来获取文本.
  - 另一种就是指令自置的, 使用的时候添加`empty` 的`modifiers` 即可





vue文件代码: `placeholder.vue`, 其中注释代码是静态渲染部分

```vue
<template>
  <div class="view-demo-component">
    <div v-for="(item, index) in state.numbers" :key="item.id" v-tooltip="item" v-placeholder:[tip]="item.name" class="item">
      {{ item.name || '暂无数据' }}
    </div>
<!--    <div class="item" v-placeholder="state.numbers[0].name">{{ state.numbers[0].name }}</div>-->
<!--    <div class="item" v-placeholder="state.numbers[1].name">{{ state.numbers[1].name }}</div>-->
<!--    <div class="item" v-placeholder="state.numbers[2].name">{{ state.numbers[2].name }}</div>-->
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { placeholder as vPlaceholder } from './placeholder.ts'
import {tooltip as vTooltip} from '../tooltip/tooltip.ts'

const tip = '暂无数据'
const state = reactive({
  numbers: [{}, {}, {}, {}]
})
setTimeout(() => {
  state.numbers = [
    {
      id: 10,
      name: 'test1'
    },
    {
      id: 20,
      name: ''
    },
    {
      id: 30,
      name: 'test3'
    },
  ]
}, 3000)
</script>
<style scoped lang="scss">
.view-demo-component {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;

  .wrapper {
    width: 200px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding: 0 10px;
    border-radius: 4px;
  }
  .item {
    width: 100px;
    height: 24px;
    text-align: center;
  }
}
</style>
```



<script setup>
import Placeholder from './placeholder.vue'
</script>