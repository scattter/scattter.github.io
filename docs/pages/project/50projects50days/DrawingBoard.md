# Drawing Board

## 1. 实现效果
<DrawingBoard />

## 2. 具体实现
这个主要是基于`canvas` 实现的. 正巧昨天中午看b站看到一个关于`canvas` 的入门视频, 然后想到之前看到这个项目里有这个白板, 所以就根据视频里面的知识把这个实现出来了.

在实现的过程中, 主要是找到`canvas` 元素, 获取上面的`ctx` 也就是画笔, 然后对其进行监听, 随后调用`canvas` 的内置方法进行路径描绘. 如下代码所示
```javascript
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
ctx.fillStyle = '#fff'

// 主要绘画方法
function draw(startX, startY, endX, endY) {
  // 开始绘画
  ctx.beginPath()
  // 设置起点: 由于是连续绘画, 所以设置起点为上次落点
  ctx.moveTo(startX, startY)
  ctx.strokeStyle = color
  ctx.lineWidth = width.value || 5
  // 这里主要是为了画出来的线条是平滑的
  ctx.lineCap = 'round'
  ctx.lineTo(endX, endY)
  // 描边
  ctx.stroke()
  // 结束绘画
  ctx.closePath()
}

// 监听是否按下鼠标: 开始绘画
canvas.onmousedown = (e) => {
  startX = e.offsetX
  startY = e.offsetY
  paining = true
}

// 监听是否抬起鼠标: 结束绘画
canvas.onmouseup = () => {
  paining = false
}

// 监听鼠标是否移动: 根据移动路径进行绘画, 同时更新鼠标路径
canvas.onmousemove = (e) => {
  if (paining) {
    draw(startX, startY, e.offsetX, e.offsetY)
    startX = e.offsetX
    startY = e.offsetY
  }
}
```


<script setup>
import DrawingBoard from './viewComponent/DrawingBoard.vue'
</script>