# Scroll Animation

## 1. 实现效果
<ScrollAnimation />


## 2. 实现方案一
该方案是一个简单的实现, 使用了`scroll`事件监听屏幕滚动, 比较耗性能(下面有类似原理, 但是更简单的实现)

html
```html
<div class="main-area view-component">
  <h1 style="text-align: center">Scroll Animation</h1>
  <div class="contexts">
    <div class="context">Node 1</div>
    <div class="context">Node 2</div>
    <div class="context">Node 3</div>
    <div class="context">Node 4</div>
    <div class="context">Node 5</div>
    <div class="context">Node 6</div>
    <div class="context">Node 7</div>
    <div class="context">Node 8</div>
    <div class="context">Node 9</div>
    <div class="context">Node 10</div>
  </div>
</div>
```

js代码
```javascript
const mainArea = document.getElementsByClassName('main-area').item(0)
const contexts = document.getElementsByClassName('context')
const viewHeight = mainArea.getBoundingClientRect().height
let contextMargin = getComputedStyle(contexts.item(0))
const CONTEXT_HEIGHT = contexts.item(0).clientHeight + parseInt(contextMargin.marginTop.split('px')[0]) * 2
let curHeight = 0
// 初始化展示context
for (let i = 0; i < contexts.length; i++) {
if (curHeight > viewHeight) break
// 因为i从0开始, 所以+1  类似向上取整
curHeight = (i + 1) * CONTEXT_HEIGHT
contexts.item(i).classList.add('show')
}
let beforeScrollHeight = mainArea.scrollTop
const animation = () => {
const allScrollHeight = viewHeight + mainArea.scrollTop - CONTEXT_HEIGHT / 2
const nextIndex = Math.min(Math.floor(curHeight / CONTEXT_HEIGHT), contexts.length - 1)
// 判断页面是上滑还是下滑
let scrollUp = false
// 如果下一个scrollTop小于上一个scrollTop  那么说明是页面上滑
if (beforeScrollHeight > mainArea.scrollTop) scrollUp = true
beforeScrollHeight = mainArea.scrollTop
// 处理下滑 判断当前节点的总高度是否大于视窗高度和滑动高度
if (!scrollUp && curHeight < allScrollHeight) {
  contexts.item(nextIndex).classList.add('show')
  // 如果处理到最后一个card  不再进行后续处理
  nextIndex !== contexts.length - 1 && (curHeight += CONTEXT_HEIGHT)
} else if (scrollUp && curHeight >= allScrollHeight) {
  contexts.item(nextIndex).classList.remove('show')
  nextIndex > Math.floor(viewHeight / CONTEXT_HEIGHT) + 1 && (curHeight -= CONTEXT_HEIGHT)
}
}
mainArea.addEventListener('scroll', animation)
```

## 3. 实现方案一的简洁版本
这里的实现代码是github上的
js代码
```javascript
  const boxes = document.querySelectorAll('.context')
  
  document.querySelector('.main-area').addEventListener('scroll', checkBoxes)
  
  checkBoxes()
  
  function checkBoxes() {
    // 这里是视图窗口高度 / 5 * 4是一个冗余
    const triggerBottom = window.innerHeight / 5 * 4
    
    boxes.forEach(box => {
      const boxTop = box.getBoundingClientRect().top
      console.log(boxTop)
      
      if(boxTop < triggerBottom) {
        box.classList.add('show')
      } else {
        box.classList.remove('show')
      }
    })
  }
```

## 4. 实现方案二
该方案是使用了`IntersectionObserver` 接口来实现, 监听下一个要处理的context

这里也可以考虑监听所有的context, 然后根据handleIndex进行下一步处理
```javascript
const contexts = document.getElementsByClassName('context')
const viewHeight = document.body.clientHeight -50
const CONTEXT_HEIGHT = 260
let curHeight = 0
let handleIndex = 0

// 初始化展示context
for (let i = 0; i < contexts.length; i++) {
  if (curHeight > viewHeight) {
    break
  }
  // 因为i从0开始, 所以+1  类似向上取整
  curHeight = (i + 1) * CONTEXT_HEIGHT
  contexts.item(i).classList.add('show')
  handleIndex += 1
}

// 动态改变监听的元素
let showContextsCount = document.getElementsByClassName('show').length
const io = new IntersectionObserver(entries => {
  // 处理可视化
  if (entries[0].intersectionRatio >= 0.8 && !entries[0].target.classList.contains('show')) {
    // 取消上一个监听
    io.unobserve(contexts.item(Math.min(handleIndex, contexts.length - 1)))
    entries[0].target.classList.add('show')
    showContextsCount += 1
    handleIndex = Math.min(handleIndex + 1, contexts.length - 1)
    // 监听下一个
    io.observe(contexts.item(Math.min(handleIndex, contexts.length - 1)))
  } else if (entries[0].intersectionRatio < 0.8 && handleIndex === showContextsCount - 1) {
    // 这里只监听上滑的时候最后一个show的元素
    io.unobserve(contexts.item(Math.min(handleIndex, contexts.length - 1)))
    // 处理滑动到初始位置的逻辑
    if ((handleIndex) * CONTEXT_HEIGHT < viewHeight) {
      handleIndex = Math.min(handleIndex + 1, contexts.length - 1)
      io.observe(contexts.item(Math.min(handleIndex, contexts.length - 1)))
      return
    }
    entries[0].target.classList.remove('show')
    showContextsCount -= 1
    handleIndex = Math.max(handleIndex - 1, 0)
    io.observe(contexts.item(Math.min(handleIndex, contexts.length - 1)))
  }
})
io.observe(contexts.item(Math.min(handleIndex, contexts.length - 1)))
```




<script setup>
import ScrollAnimation from './viewComponent/ScrollAnimation.vue'
</script>
