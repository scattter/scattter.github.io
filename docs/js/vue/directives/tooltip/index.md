# Tooltip指令

这个指令是在工作中经常用到的, 组内的大佬基于`element` 组件的 `el-tooltip` 实现的, 由于这个博客没有增加UI库(增加后博客仓库也有点笨重), 所以我暂时添加一个手写的简单指令, 后续再研究下`popper` 这个库, 基于这个库看能不能再写一个.

## 1. 手写简易版

能实现基本的功能, 但是还有功能简单, 渲染优化问题

```javascript
let tooltipEle = null
export const tooltip = {
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding) {
    const initEle = () => {
      if (tooltipEle) tooltipEle = null
      el.parentNode.style.position = 'relative'
      const { left, top, width } = el.getBoundingClientRect()
      tooltipEle = document.createElement('span')
      tooltipEle.innerHTML = binding.value
      tooltipEle.style.position = 'absolute'
      tooltipEle.style.width = width + 'px'
      tooltipEle.style.height = el.scrollHeight + 'px'
      tooltipEle.style.bottom = 30 + 'px'
      tooltipEle.style.left = 10 + 'px'
      tooltipEle.style.boxShadow = '0px 4px 8px 0px rgba(41,48,64,0.4)'
      tooltipEle.style.borderRadius = '4px'
      tooltipEle.style.backgroundColor = '#fff'
      tooltipEle.style.padding = '4px 8px'
      el.parentNode.appendChild(tooltipEle)
    }
    el.addEventListener('mouseenter', () => {
      if (
        el.scrollWidth > el.offsetWidth ||
        binding.modifiers.show ||
        el.scrollHeight > el.offsetHeight
      ) {
        el.style.cursor = 'pointer'
        initEle()
      }
    })
    el.addEventListener('mouseleave', () => {
      tooltipEle && tooltipEle.remove()
    })
  },
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding) {
    tooltipEle.innerHTML = binding.value
  },
}

```



## 2. vue2的版本

这个版本主要是参考组内大佬写的, 自己加了一些注释, 代码源文件在[这里](https://github.com/scattter/common-utils)

```javascript
import Vue from '../source/vue.js'

const state = Vue.observable({ visible: true, content: '' })
let tooltip = null

Vue.directive('tool', {
  // 指令初始化
  bind(el, binding) {
    // 初始化tooltip组件
    if (!tooltip) {
      // 使用extend创建vue组件, 平时用的更多的是vue.component
      const Instance = Vue.extend({
        render(h) {
          h('el-tooltip', {
            ref: 'tooltip',
            props: {
              effect: 'light',
              placement: 'top',
              value: state.visible,
              content: state.content
            }
          })
        }
      })
      tooltip = new Instance().$mount()
      document.body.appendChild(tooltip)
    }
    
    el.addEventListener('mouseenter', function(e) {
      if (el.scrollWidth > el.offsetWidth || el.scrollHeight > el.offsetHeight) {
        const tip = tooltip.$refs.tooltip;
        // 每次建新的tooltip的时候销毁前一个, 防止速度过快出现闪烁
        tip.$refs.popper && (tip.$refs.popper.style.display = 'none');
        tip.doDestroy();
        tip.setExpectedState(true);
        // tooltip每次渲染的时候都需要有一个基本元素, 这里是为其赋值
        tip.referenceElm = e.srcElement;
        // 更新全局状态state
        state.visible = true;
        state.content = binding.value;
      }
    })
    
    el.addEventListener('mouseleave', function(e) {
      tooltip.$refs.tooltip.referenceElm = e.srcElement;
      state.visible = false;
    })
  }
})
```