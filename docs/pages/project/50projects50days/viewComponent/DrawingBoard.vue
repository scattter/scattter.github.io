<template>
  <div class="wrapper view-demo-component">
    <canvas id="canvas" width="500px" height="500px"></canvas>
    <div class="opera">
      <div class="width">
        <span>宽度</span>
        <button class="minus"> - </button>
        <input class="width-input" type="number" value="5" readonly>
        <button class="add"> + </button>
      </div>
      <div class="color">
        <input type="color" class="color-input">
      </div>
      <button class="clear">clear</button>
      <button class="save">save</button>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#fff'
  const width = document.querySelector('.width-input')
  const clear = document.querySelector('.clear')
  const save = document.querySelector('.save')
  const colorEle = document.querySelector('.color-input')

  let paining = false
  let startX = undefined
  let startY = undefined
  colorEle.value = 'black'
  let color = colorEle.value

  document.querySelector('.minus').onclick = () => {
    if (width.value < 6) return
    width.value = parseInt(width.value) - 5
  }
  document.querySelector('.add').onclick = () => {
    if (width.value >= 50) return
    width.value = parseInt(width.value) + 5
  }

  colorEle.onchange = (e) => color = e.target.value

  canvas.onmousedown = (e) => {
    startX = e.offsetX
    startY = e.offsetY
    paining = true
  }

  canvas.onmouseup = () => {
    paining = false
  }

  canvas.onmousemove = (e) => {
    if (paining) {
      draw(startX, startY, e.offsetX, e.offsetY)
      startX = e.offsetX
      startY = e.offsetY
    }
  }

  clear.onclick = () => {
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  function draw(startX, startY, endX, endY) {
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.strokeStyle = color
    ctx.lineWidth = width.value || 5
    ctx.lineCap = 'round'
    ctx.lineTo(endX, endY)
    ctx.stroke()
    ctx.closePath()
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
})
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#canvas {
  background-color: white;
  margin: auto;
  border: 2px solid #5290f9;
}
.opera {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.width {
  display: inline-block;
}
.width-input {
  text-align: center;
}
.minus, .add {
  display: inline-block;
  width: 30px;
  cursor: pointer;
}
.color {
  display: inline-block;
}
button, input {
  margin-left: 10px;
  background-color: #EFEFEF;
  border: 1px solid rgb(118, 118, 118);
  border-radius: 2px;
}
button {
  padding: 0 4px;
}
</style>