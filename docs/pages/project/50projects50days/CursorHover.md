# Cursor Hover

> 参考链接: https://juejin.cn/post/7347626854617202724
>
> 原效果链接: https://vueflow.dev/

## 1. 实现效果
<CursorHover />


## 2. 具体实现

最开始看到这个动画的时候我先自己想了下, 主要的链路就是:

1. 全局监听鼠标位置, 使用绝对定位进行鼠标原有样式的替换
2. 鼠标hover元素时元素背景使用动画进行切换

可以看到, 第一步还是比较简单的, 但是第二步就比较复杂, 因为demo中每一个被hover的元素背景颜色和字体颜色都不同, 如何维护这个不同成为了难题.

看了参考链接的文档才知道 `CSS` 还有一个 `混合模式` , 使用这个模式可以很好的解决第二步中不同hover元素背景和字体颜色不同的问题. 该模式的具体介绍在[这里](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mix-blend-mode). 

回到实现上, 具体的代码如下所示

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Cursor Hover</title>
</head>
<body>
<div class="inner"></div>
<div class="outer"></div>

<div class="wrapper">
  <div class="area">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    Magnam officiis sapiente laboriosam aut earum, nostrum
    culpa facilis quidem, dolorum aliquid quos rerum consectetur
    quisquam. Ut porro officiis accusamus perferendis labore.
  </div>
  
  <div class="area">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  </div>
  
  <div class="area">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  </div>
</div>

</body>
</html>
<script>
  // 定义常量, 减少计算
  // hover效果时边框宽度/内部圆半径/外部圆半径
  const HOVER_WIDTH = 4
  const INNER_RADIUS = 5
  const OUTER_RADIUS = 20
  
  const body = document.querySelector("body");
  const inner = document.querySelector(".inner")
  const outer = document.querySelector(".outer")
  const areas = document.querySelectorAll(".area")
  // let isHover = false

  /**
   * 处理初始鼠标渲染动画
   */
  function appear() {
    inner.style.opacity = 1
    outer.style.opacity = 1
  }
  body.addEventListener('mouseover', appear, { once: true })

  /**
   * 处理鼠标移动动画
   */
  body.addEventListener('mousemove', (e) => {
    window.requestAnimationFrame(function() {
      const target = e.target
      inner.style.left = `${e.clientX - INNER_RADIUS}px`
      inner.style.top = `${e.clientY - INNER_RADIUS}px`
      // 如果hover到目标元素
      if (target.classList.contains('area')) {
        const { left, top, width, height } = target.getBoundingClientRect()
        // 如果已经有hover类名, 说明已经变换过了, 后续就不需要再进行样式设置了
        if (outer.classList.contains('cursor-hover')) {
          return;
        }
        outer.style.left = `${left - HOVER_WIDTH}px`
        outer.style.top = `${top - HOVER_WIDTH}px`
        outer.style.width = `${width + HOVER_WIDTH * 2}px`
        outer.style.height = `${height + HOVER_WIDTH * 2}px`
        const style = window.getComputedStyle(target)
        outer.style.borderRadius = `${style.borderRadius}`
        outer.classList.add('cursor-hover')
      } else {
        // 如果没有hover类名, 且当前没有hover到元素上 & 不是首次渲染 => 不进行后面操作
        if (!outer.classList.contains('cursor-hover') && !outer.style.opacity) {
          return;
        }
        outer.style.width = `${OUTER_RADIUS * 2}px`
        outer.style.height = `${OUTER_RADIUS * 2}px`
        outer.style.borderRadius = '50%'
        outer.style.left = `${e.clientX - OUTER_RADIUS}px`
        outer.style.top = `${e.clientY - OUTER_RADIUS}px`
        outer.classList.remove('cursor-hover')
      }
    })
  })
</script>
<style>
    * {
        box-sizing: border-box;
    }
    
    body {
        position: relative;
        width: 100vw;
        height: 100vh;
        background: #fff;
        overflow: hidden;
        margin: 0;
        padding: 0;
        cursor: none;
    }
    .inner, .outer {
        position: absolute;
        border-radius: 50%;
        background: #4caf50;
        z-index: 1;
        opacity: 0;
        mix-blend-mode: exclusion;
        pointer-events: none;
    }
    .inner {
        width: 10px;
        height: 10px;
    }
    .outer {
        width: 40px;
        height: 40px;
        background: #fff;
        transition: .1s ease-out;
    }
    
    .wrapper {
        width: 100vw;
        display: flex;
        justify-content: space-evenly;
        padding-top: 100px;
    }
    
    .area {
        width: 300px;
        height: 300px;
        overflow: auto;
        border: 2px solid #000;
        border-radius: 8px;
        padding: 20px;
        font-size: 24px;
        line-height: 1.5;
        background-color: #4caf50;
        color: #fff;
    }
    .area:nth-child(2) {
        width: 200px;
        height: 200px;
        border-radius: 24px;
        background-color: darkgray;
    }
    .area:nth-child(3) {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background-color: aqua;
    }
</style>
```

这里相比于原分享链接做了两个优化

1. 使用 `left` 和 `right` 替换 `transform` 属性, 解决初始进入页面时鼠标会出现跳动的问题
2. 增加 `opacity` 属性, 优化刚进入页面时鼠标浮现的动画
3. 减少全局监听事件, 增加css更新缓存, 减少浏览器可能存在的更新css操作


<script setup>
import CursorHover from './viewComponent/CursorHover.vue'
</script>