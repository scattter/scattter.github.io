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
