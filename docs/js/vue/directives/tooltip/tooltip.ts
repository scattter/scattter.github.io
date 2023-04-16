import { DirectiveBinding } from '@/types/common'

interface BindingElType extends HTMLElement {
  parentNode: HTMLElement
  __tip?: any
}

let tooltipEle: null | HTMLElement = null
export const tooltip = {
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el: BindingElType, binding: DirectiveBinding) {
    el.__tip = binding.value
    const initEle = () => {
      if (tooltipEle) tooltipEle = null
      const { width, left, top } = el.getBoundingClientRect()
      tooltipEle = document.createElement('div')
      tooltipEle.innerHTML = el.__tip
      tooltipEle.classList.add('v-tooltip')
      tooltipEle.style.width = `${width}px`
      tooltipEle.style.left = `${left}px`
      // 判断是否超出页面上边界 超出上边界那么就在下面展示 (视图很小的极端情况暂不考虑)
      // 下面的数字20和数字40都是为了更好展示tooltip的buffer
      if (top - el.scrollHeight - 20 < 0) {
        tooltipEle.style.top = top + 40 + 'px'
      } else {
        tooltipEle.style.top = top - el.scrollHeight - 20 + 'px'
      }
      // 适配暗色模式
      if (document.documentElement.classList.contains('dark')) {
        tooltipEle.style.backgroundColor = '#9ea0a5'
        tooltipEle.style.color = '#242424'
      } else {
        tooltipEle.style.backgroundColor = '#fff'
      }
      document.body.appendChild(tooltipEle)
    }
    if (
      el.scrollWidth > el.offsetWidth ||
      binding.modifiers.show ||
      el.scrollHeight > el.offsetHeight ||
      binding.modifiers.force
    ) {
      el.addEventListener('mouseenter', () => {
        el.style.cursor = 'pointer'
        initEle()
        const removeELe = () => {
          tooltipEle && tooltipEle.remove()
        }
        const scrollParent = findScrollParent(el)
        scrollParent && scrollParent.addEventListener('scroll', removeELe)
      })
      el.addEventListener('mouseleave', () => {
        tooltipEle && tooltipEle.remove()
      })
    }
  },
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el: BindingElType, binding: DirectiveBinding) {
    el.__tip = binding.value
  },
  beforeUnmount() {
    tooltipEle && tooltipEle.remove()
  }
}

const findScrollParent = (el: HTMLElement) => {
  if (!el || !el.parentElement) return null
  const parent = el.parentElement
  const overflow = window.getComputedStyle(parent, null)["overflow"]
  if (parent.scrollWidth > parent.clientHeight && (overflow === 'auto' || overflow === 'scroll')) {
    return parent
  } else {
    findScrollParent(parent)
  }
}
