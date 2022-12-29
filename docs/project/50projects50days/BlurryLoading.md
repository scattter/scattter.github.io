# Blurry Loading

## 1. 实现效果
<BlurryLoading />

## 2. 具体实现
在上面的demo中, 主要使用了css的`filter` 和 `opacity` 属性进行动画的控制. 然后通过js的`setInterval` 进行间隔渲染, 从而实现上面demo效果.

下面的代码是基于vue的响应式写法, 在原生html, js中可以自己再修改下
html代码
```html
<div class="blurry-pic"></div>
<div class="blurry-text">{{ process }}%</div>
```

js代码
```javascript
import { onMounted, ref } from 'vue'
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}

const process = ref(0)

onMounted(() => {
  const text = document.querySelector('.blurry-text')
  const pic = document.querySelector('.blurry-pic')
  const inter = setInterval(() => {
    process.value += 1
    if (process.value > 99) {
      clearInterval(inter)
    }
    text.style.opacity = scale(process.value, 0, 100, 1, 0)
    pic.style.filter = `blur(${scale(process.value, 0, 100, 20, 0)}px)`
  }, 30)
})
```
在上面代码中, 每间隔一定的时间(30ms)调用一次函数, 更新文字的`opacity` 以及 背景图片的`blur`, 当读条到100的时候, 此时`blur` 和`opacity` 为0, 停止循环 

<script setup>
import BlurryLoading from './viewComponent/BlurryLoading.vue'
</script>