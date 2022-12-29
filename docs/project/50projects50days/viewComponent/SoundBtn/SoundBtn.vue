<template>
  <div class="main-area view-demo-component">
    <audio class="tada" src="./viewComponent/SoundBtn/tada.mp3"></audio>
    <audio class="wrong" src="./viewComponent/SoundBtn/wrong.mp3"></audio>
    <button class="btn btn1" value="tada">click me listen tada music</button>
    <button class="btn btn2" value="wrong">click me listen wrong music</button>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  let curSound;
  const btns = document.querySelectorAll('.btn')

  btns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      if (curSound) {
        curSound.pause()
        curSound.currentTime = 0
      }
      curSound = document.querySelector(`.${event.target.value}`)
      curSound.play()
    })
  })
})
</script>
<style lang="scss" scoped>
.main-area {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .btn {
    width: 180px;
    height: 50px;
    border-radius: 10px;
  }
  .btn1 {
    background-color: #89DDFF;
  }
  .btn2 {
    background-color: red;
  }
}
</style>