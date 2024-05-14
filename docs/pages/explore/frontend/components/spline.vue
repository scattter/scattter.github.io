<template>
  <div class="mouse-drag-wrapper view-demo-component">
    <div class="wrapper">
      <canvas class="wrapper-spline-demo" />
    </div>
  </div>
</template>

<script setup>
import { Application } from '@splinetool/runtime';
import {onMounted} from "vue";

onMounted(() => {
  const canvas = document.getElementsByClassName('wrapper-spline-demo')[0];
  const app = new Application(canvas);
  app.load('https://prod.spline.design/AwfEL3ZEffCfSTbL/scene.splinecode');
})

</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>