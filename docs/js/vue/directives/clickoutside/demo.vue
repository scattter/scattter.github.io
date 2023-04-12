<template>
  <div class="view-demo-component">
    <div class="wrapper">
      <button v-click-outside="handleOutsideClick" class="trigger" @click="handleClick">click me</button>
      <div ref="popoverRef" v-show="show" class="popper">this is popper area</div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import ClickOutside from './clickoutside.ts'

const vClickOutside = ClickOutside
const show = ref(false)
const popoverRef = ref()

const handleClick = () => {
  show.value = true
}

const handleOutsideClick = () => {
  show.value = false
}
</script>
<style lang="scss" scoped>
.view-demo-component {
  display: flex;
  justify-content: center;
  align-items: center;

  .wrapper {
    width: 50%;
    height: 50%;
    background-color: #89DDFF;

    .trigger {
      width: 200px;
      height: 50px;
      background-color: #3A71A8;
    }

    .popper {
      width: 60%;
      height: 30%;
      margin-top: 20px;
      background-color: white;
    }
  }
}
</style>