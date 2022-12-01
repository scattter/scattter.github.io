# More Context Tip Animation

## 1. 实现效果
<MoreContextTipAnimation />

## 2. 具体实现一
该组件主要是为了在内容过多的时候提示用户进行下拉, 第一版是使用简单的ts代码和html标签进行硬处理, 考虑后面使用vue指令实现

原理是监听最后一个元素的可见度来控制动画的展示

html代码
```html
<div class="wrapper view-demo-component">
  <div class="main">
    <div class="card">1</div>
    <div class="card">2</div>
    <div class="card">3</div>
    <div class="card">4</div>
    <div class="card">5</div>
    <div class="card">6</div>
    <div class="card">7</div>
  </div>
  <div class="tip">
    <div class="tip-text">more</div>
    <div class="tip-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
           class="bi bi-chevron-double-down" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
              d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
        <path fill-rule="evenodd"
              d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
      </svg>
    </div>
  </div>
</div>
```
ts代码
```typescript
const cards: HTMLCollectionOf<Element> = document.getElementsByClassName('card')
let card: Element = cards.item(cards.length - 1)
const tipEle = document.querySelector('.tip')
const ob = new IntersectionObserver(function(entries) {
    if (entries[0].intersectionRatio < 0.8) {
      tipEle.classList.contains('tip-hidden') && tipEle.classList.remove('tip-hidden')
    } else if (entries[0].intersectionRatio === 1) {
      !tipEle.classList.contains('tip-hidden') && tipEle.classList.add('tip-hidden')
    }
  }, {
    root: document.querySelector('.main'),
    threshold: [0.8, 1]
  }
)
ob.observe(card)
```

<script setup>
import MoreContextTipAnimation from './viewComponent/MoreContextTipAnimation.vue'
</script>