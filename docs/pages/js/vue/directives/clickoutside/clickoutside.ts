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
    // 判断是否被当前元素所包含
    const isContainedByEl =
      el.contains(mouseupElm) || el.contains(mousedownElm)
    // 如果想自定义不触发outside的逻辑  可以自己在上下文里面添加popoverRef属性进行相应控制
    const popoverElm = binding.instance?.$refs.popoverRef as HTMLElement
    const isContainedByPopper =
      popoverElm &&
      (popoverElm.contains(mouseupElm) || popoverElm.contains(mousedownElm))
    // 如果满足下面条件之一, 那么就不触发指令绑定的函数
    if (isBound ||
      isTargetExists ||
      isContainedByEl ||
      isClickSelf ||
      isContainedByPopper
    ) return

    el[ctx]?.documentFn && el[ctx]?.documentFn()
  }
}

// 用来挂载和卸载节点的时候初始化节点
const ClickOutside = {
  beforeMount() {
    // 全局监听鼠标行为
    // 记录触发元素
    on(document, 'mousedown', (e: Event) => (startClick = e))
    // 初始化当前节点的触发函数(如popoverElm这种, 将其绑定在指令节点上)
    on(document, 'mouseup', (e: Event) => {
      nodeLists.forEach(node => node[ctx]!.documentHandler(e, startClick))
    })
  },
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