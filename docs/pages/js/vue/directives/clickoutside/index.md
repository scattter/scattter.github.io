# Clickoutside指令

## 1. 实现效果

在`popper` 节点展示后点击蓝色区域后`popper` 节点才会消失

<Demo />

## 2. 具体实现
`demo.vue`

```vue
<template>
  <div class="view-demo-component">
    <div class="wrapper">
      <button v-click-outside="handleOutsideClick" class="trigger" @click="handleClick">click me</button>
      <div ref="popoverRef" v-show="show" class="popper">this is popper area</div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import ClickOutside from './clickoutside.ts'

const vClickOutside = ClickOutside
const show = ref(false)
const popoverRef = ref()

const handleClick = () => {
  show.value = true
}

const handleOutsideClick = () => {
  show.value = false
}
</script>
<style lang="scss" scoped>
</style>
```

在上面的代码中, 我们将当前实例设置了一个`popoverRef` 属性, 该属性就是配合`ClickOutside` 指令来使用的, 即如果我们点击`trigger` 节点展示`popper` 节点, 那么只要后续鼠标点击区域在`popoverRef` 节点和`trigger` 节点上, 那么`popper` 节点就永远不会消失; 而如果点击区域是在这两个节点外, 那么就会触发指令对应的函数.



具体指令代码: `clickoutside.ts`

```typescript
import {DirectiveBinding} from "@/types/common";

// 定义相关类型
interface ClickOutsideInterface {
  id: number
  documentHandler: (e1: Event, e2: Event) => void
  documentFn: () => void
}

interface CustomHTML extends HTMLElement {
  '@@clickOutsideZK'?: ClickOutsideInterface
}

// 设置监听函数
const on = (function () {
  return function<K extends keyof HTMLElementEventMap> (element: HTMLElement | Document, event: K, handler: (ev: Event) => void) {
    element.addEventListener(event, handler, false)
  }
})()

const ctx = '@@clickOutsideZK'

// 用来卸载相应的监听节点
let seed = 0
// 用来记录触发元素
let startClick: Event
// 保存监听节点
let nodeLists: CustomHTML[] = []

// 全局监听鼠标行为
// 记录触发元素
on(document, 'mousedown', (e: Event) => (startClick = e))
// 初始化当前节点的触发函数(如popoverElm这种, 将其绑定在指令节点上)
on(document, 'mouseup', (e: Event) => {
  nodeLists.forEach(node => node[ctx]!.documentHandler(e, startClick))
})

// 指令处理函数, 即判断什么情况去触发函数执行
const createDocumentHandler = (el: CustomHTML, binding: DirectiveBinding) => {
  // 返回闭包 在mouseup的时候传入相应事件
  return function (mouseup: Event, mousedown: Event) {
    // 这里可以对popoverRef进行操作, 来处理特殊元素的clickOutside事件
    const mouseupElm = mouseup.target as Node
    const mousedownElm = mousedown.target as Node
    // 是否绑定相应函数
    const isBound = !binding || !binding.instance
    // 是否点击到元素
    const isTargetExists = !mouseupElm || !mousedownElm
    // el是当前DOM元素
    const isClickSelf = el === mouseupElm
    // 如果想自定义不触发outside的逻辑  可以自己在上下文里面添加popoverRef属性进行相应控制
    const popoverElm = binding.instance?.$refs.popoverRef as HTMLElement
    const isContainedByPopper =
      popoverElm &&
      (popoverElm.contains(mouseupElm) || popoverElm.contains(mousedownElm))
    // 如果满足下面条件之一, 那么就不触发指令绑定的函数
    if (isBound ||
      isTargetExists ||
      el.contains(mouseupElm) ||
      el.contains(mousedownElm) ||
      el === mouseupElm ||
      isContainedByPopper
    ) return

    el[ctx]?.documentFn && el[ctx]?.documentFn()
  }
}

// 用来挂载和卸载节点的时候初始化节点
const ClickOutside = {
  mounted(el: CustomHTML, binding: DirectiveBinding) {
    // 加入对应的数组中, handle多个outside情况
    nodeLists.push(el)
    const id = seed++
    el[ctx] = {
      id,
      documentHandler: createDocumentHandler(el, binding),
      documentFn: binding.value
    }
  },
  updated(el: CustomHTML, binding: DirectiveBinding) {
    el[ctx]!.documentHandler = createDocumentHandler(el, binding)
    el[ctx]!.documentFn = binding.value
  },
  unmounted(el: CustomHTML) {
    const len = nodeLists.length
    // 移除当前组件的监听
    for (let i = 0; i < len; i++) {
      if (nodeLists[i][ctx]!.id === el[ctx]!.id) {
        nodeLists.splice(i, 1)
        break
      }
    }
  }
}
export default ClickOutside
```

该部分代码可以分为三部分, 大致为下, 详细的可以看上面代码中的注释

- 全局监听和节点处理

在此部分使用`nodeList` 数组进行监听节点的保存; 使用全局`id` 来控制监听节点的唯一性, 同时也便于后期卸载该节点的监听; 使用`startClick` 来保存初始的触发节点

```typescript
// 用来卸载相应的监听节点
let seed = 0
// 用来记录触发元素
let startClick: Event
// 保存监听节点
let nodeLists: CustomHTML[] = []
```

- 初始化指令绑定的节点

在此部分初始化指令节点, 添加唯一id, 添加该节点触发函数的函数(`trigger`这里使用了闭包),添加触发函数(`fn`). 

同时在节点更新和卸载的时候执行相应的节点属性更新和卸载操作.

- 指令触发条件函数的编写

首先是全局监听鼠标事件, 当`mouseup` 和 `mousedown` 被触发后就去初始化指令绑定节点上**触发函数的函数`trigger`,

在`mousedown` 被触发后就会执行该触发函数, 如果满足触发函数的条件, 那么就运行`fn` , 否则就不执行.



## 3. element-plus 的实现

`element-plus` 支持了`arg`的输入, 即可以通过在指令后添加`arg` 来增加函数的触发逻辑, 这样可以添加多个元素去扩大`outside` 的范围; 同时另一个差异是其采用元素本身作为对象的`key` 来维护`nodeList` 数组.

```typescript
import { isClient } from '@vueuse/core'
import { isElement } from '@element-plus/utils'

import type {
  ComponentPublicInstance,
  DirectiveBinding,
  ObjectDirective,
} from 'vue'

type DocumentHandler = <T extends MouseEvent>(mouseup: T, mousedown: T) => void
type FlushList = Map<
  HTMLElement,
  {
    documentHandler: DocumentHandler
    bindingFn: (...args: unknown[]) => unknown
  }[]
>

const nodeList: FlushList = new Map()

let startClick: MouseEvent

if (isClient) {
  document.addEventListener('mousedown', (e: MouseEvent) => (startClick = e))
  document.addEventListener('mouseup', (e: MouseEvent) => {
    for (const handlers of nodeList.values()) {
      for (const { documentHandler } of handlers) {
        documentHandler(e as MouseEvent, startClick)
      }
    }
  })
}

function createDocumentHandler(
  el: HTMLElement,
  binding: DirectiveBinding
): DocumentHandler {
  let excludes: HTMLElement[] = []
  if (Array.isArray(binding.arg)) {
    excludes = binding.arg
  } else if (isElement(binding.arg)) {
    // due to current implementation on binding type is wrong the type casting is necessary here
    excludes.push(binding.arg as unknown as HTMLElement)
  }
  return function (mouseup, mousedown) {
    const popperRef = (
      binding.instance as ComponentPublicInstance<{
        popperRef: HTMLElement
      }>
    ).popperRef
    const mouseUpTarget = mouseup.target as Node
    const mouseDownTarget = mousedown?.target as Node
    const isBound = !binding || !binding.instance
    const isTargetExists = !mouseUpTarget || !mouseDownTarget
    const isContainedByEl =
      el.contains(mouseUpTarget) || el.contains(mouseDownTarget)
    const isSelf = el === mouseUpTarget

    const isTargetExcluded =
      (excludes.length &&
        excludes.some((item) => item?.contains(mouseUpTarget))) ||
      (excludes.length && excludes.includes(mouseDownTarget as HTMLElement))
    const isContainedByPopper =
      popperRef &&
      (popperRef.contains(mouseUpTarget) || popperRef.contains(mouseDownTarget))
    if (
      isBound ||
      isTargetExists ||
      isContainedByEl ||
      isSelf ||
      isTargetExcluded ||
      isContainedByPopper
    ) {
      return
    }
    binding.value(mouseup, mousedown)
  }
}

const ClickOutside: ObjectDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    // there could be multiple handlers on the element
    if (!nodeList.has(el)) {
      nodeList.set(el, [])
    }

    nodeList.get(el)!.push({
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value,
    })
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    if (!nodeList.has(el)) {
      nodeList.set(el, [])
    }

    const handlers = nodeList.get(el)!
    const oldHandlerIndex = handlers.findIndex(
      (item) => item.bindingFn === binding.oldValue
    )
    const newHandler = {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value,
    }

    if (oldHandlerIndex >= 0) {
      // replace the old handler to the new handler
      handlers.splice(oldHandlerIndex, 1, newHandler)
    } else {
      handlers.push(newHandler)
    }
  },
  unmounted(el: HTMLElement) {
    // remove all listeners when a component unmounted
    nodeList.delete(el)
  },
}

export default ClickOutside
```




<script setup>
import Demo from './demo.vue'
</script>