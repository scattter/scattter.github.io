<template>
  <div class="main-area view-demo-component">
    <div class="blurry-pic"></div>
    <div class="blurry-text">{{ process }}%</div>
  </div>
</template>
<script setup>
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
</script>
<style lang="scss" scoped>
.main-area {
  position: relative;
}
.blurry-pic {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('https://images.unsplash.com/photo-1576161787924-01bb08dad4a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2104&q=80')
  no-repeat center center/cover;
  z-index: 1;
  filter: blur(5px);
}
.blurry-text {
  position: absolute;
  left: 50%;
  top: 50%;
  color: #eafbff;
  font-size: 30px;
  transform: translate(-50%, -50%);
  opacity: 1;
  z-index: 2;
}
</style>