<template>
  <div class="view-demo-component">
    <div class="animation"></div>
  </div>
</template>
<style scoped>
.view-demo-component {
  display: flex;
  justify-content: center;
  align-items: center;
}
.animation {
  position: relative;
  width: 100px;
  height: 100px;
}
.animation::before,
.animation::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border: 50px solid transparent;
  border-bottom-color: #89DDFF;
  animation: rotateA 2s linear infinite 0.5s;
}
.animation::before {
  transform: rotate(90deg);
  animation: rotateB 2s linear infinite;
}
@keyframes rotateA {
  0%,
  25% {
    transform: rotate(0deg);
  }

  50%,
  75% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
@keyframes rotateB {
  0%,
  25% {
    transform: rotate(90deg);
  }

  50%,
  75% {
    transform: rotate(270deg);
  }

  100% {
    transform: rotate(450deg);
  }
}
</style>