<template>
  <div class="view-demo-component main-area">
    <button class="ripple-button" @click="handleClick">
      single click
      <span v-show="state.visible" class="ripple-bg"></span>
    </button>
    <button class="ripple-button multiple-button" @click="handleMultipleClick">multiple click</button>
    <span class="ripple-bg multiple-ripple"></span>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'

const state = reactive({
  visible: ref(false)
})

const handleClick = (e) => {
  if (state.visible === true) return
  const btn = document.querySelector('.ripple-button')
  const ripple = document.querySelector('.ripple-bg')
  const rect = btn.getBoundingClientRect()
  const { left: leftEle, top: topEle } = rect
  const left = e.clientX  - leftEle
  const top = e.clientY  - topEle

  ripple.style.left = left + 'px'
  ripple.style.top = top + 'px'
  state.visible = true

  setTimeout(() => state.visible = false, 800)
}

const handleMultipleClick = (e) => {
  const btn = document.querySelector('.multiple-button')
  const rect = btn.getBoundingClientRect()
  const { left: leftEle, top: topEle } = rect
  const left = e.clientX  - leftEle
  const top = e.clientY  - topEle

  const ripple = document.querySelector('.multiple-ripple').cloneNode(true)
  ripple.style.left = left + 'px'
  ripple.style.top = top + 'px'
  btn.appendChild(ripple)

  setTimeout(() => btn.removeChild(ripple), 800)
}

</script>
<style lang="scss" scoped>
.main-area {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .ripple-button {
    position: relative;
    background-color: purple;
    color: #fff;
    border: 1px purple solid;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 20px 30px;
    overflow: hidden;
    margin: 10px 0;
  }

  .ripple-bg {
    position: absolute;
    background-color: currentColor;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    animation: scale 0.8s ease-out;
  }

  .multiple-ripple {
    left: -100vh;
    top: -100vh;
  }
}
button:focus {
  outline: none;
}
@keyframes scale {
  to {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
  }
}
</style>