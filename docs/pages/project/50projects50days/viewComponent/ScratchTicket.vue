<template>
  <div class="wrapper view-demo-component">
    <img src="../../../../public/logo.jpeg" width="500" height="500" alt="" style="position: absolute; z-index: 1; top: 180px">
    <canvas id="scratch" width="500" height="500" style="z-index: 2"></canvas>
    <div class="opera">
      <div class="width">
        <span>宽度</span>
        <button class="scratch-minus"> - </button>
        <input class="scratch-width-input" type="number" value="15" readonly>
        <button class="scratch-add"> + </button>
      </div>
      <div class="color">
        <input type="color" class="scratch-color-input">
      </div>
      <button class="scratch-clear">clear</button>
      <button class="scratch-save">save</button>
      <button class="scratch-repaint">repaint</button>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const canvas = document.querySelector('#scratch')
  const ctx = canvas.getContext('2d')
  const width = document.querySelector('.scratch-width-input')
  const clear = document.querySelector('.scratch-clear')
  const save = document.querySelector('.scratch-save')
  const repaint = document.querySelector('.scratch-repaint')
  const colorEle = document.querySelector('.scratch-color-input')

  let paining = false
  let startX = undefined
  let startY = undefined
  let begin = {
    startX,
    startY
  }
  colorEle.value = 'black'
  let color = colorEle.value
  let done = false
  let alpha = 1
  let rsfs = []
  init()

  clear.onclick = fadeOut
  repaint.onclick = init

  // 满足一定条件后 淡化canvas
  function fadeOut() {
    // 跳出循环 同时移除副作用
    if (alpha <= 0) {
      rsfs.forEach(rsf => cancelAnimationFrame(rsf))
      return
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.globalAlpha = alpha -= 0.01;
    ctx.save();
    ctx.fillStyle = `rgba(255, 255, 255, 1)`
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    rsfs.push(requestAnimationFrame(fadeOut))
  }

  function init() {
    if (alpha <= 0) {
      alpha = 1
    }
    ctx.globalAlpha = alpha
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'black';
    ctx.font = "48px serif";
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText("刮出土豆", canvas.width/2, canvas.height/2);
    ctx.restore();
  }

  // 获取当前刮开的比例 如刮开50%
  function getScratchedPercentage() {
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparentPixels = 0;
    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] < 128) {
        transparentPixels++;
      }
    }
    return (transparentPixels / pixels.length * 4 * 100).toFixed(2);
  }


  document.querySelector('.scratch-minus').onclick = () => {
    width.value = Math.max(parseInt(width.value) - 5, 5)
  }
  document.querySelector('.scratch-add').onclick = () => {
    width.value = Math.min(parseInt(width.value) + 5, 50)
  }

  colorEle.onchange = (e) => color = e.target.value

  canvas.onmousedown = (e) => {
    begin.startX = e.offsetX
    begin.startY = e.offsetY
    paining = true
  }

  canvas.onmouseup = () => {
    paining = false
  }

  canvas.onmousemove = (e) => {
    if (paining) {
      draw(begin.startX, begin.startY, e.offsetX, e.offsetY)
      begin.startX = e.offsetX
      begin.startY = e.offsetY
    }
  }

  save.onclick = () => {
    const url = canvas.toDataURL()
    const a = document.createElement('a')
    a.href = url
    a.download = '画板'
    a.target = '_blank'
    a.click()
    a.remove()
  }

  function draw(startX, startY, endX, endY) {
    // 使用额外变量减少下面刮开比例的计算开销
    if (done) return
    if (getScratchedPercentage() >= 50) {
      done = true
      fadeOut()
      return
    }
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.strokeStyle = color
    ctx.lineWidth = width.value || 15
    ctx.lineCap = 'round'
    ctx.lineTo(endX, endY)
    ctx.stroke()
    ctx.closePath()
  }
})
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#scratch {
  margin: auto;
  border: 2px solid #5290f9;
}
.opera {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  z-index: 2;
}
.width {
  display: inline-block;
}
.scratch-width-input {
  text-align: center;
}
.scratch-minus, .scratch-add {
  display: inline-block;
  width: 30px;
  cursor: pointer;
}
.color {
  display: inline-block;
}
button, input {
  margin-left: 10px;
}
</style>