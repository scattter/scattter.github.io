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