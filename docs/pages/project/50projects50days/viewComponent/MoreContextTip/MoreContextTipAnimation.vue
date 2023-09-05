<template>
  <div class="wrapper view-demo-component">
    <div class="main">
      <div class="card">1</div>
      <div class="card">2</div>
      <div class="card">3</div>
      <div class="card">4</div>
      <div class="card">5</div>
      <div class="card">6</div>
      <div class="card">7</div>
    </div>
    <div class="tip">
      <div class="tip-text">more</div>
      <div class="tip-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-down" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
        </svg>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  const cards: HTMLCollectionOf<Element> = document.getElementsByClassName('card')
  let card: Element = cards.item(cards.length - 1)
  const tipEle = document.querySelector('.tip')
  const ob = new IntersectionObserver(function(entries) {
    if (entries[0].intersectionRatio < 0.8) {
      tipEle.classList.contains('tip-hidden') && tipEle.classList.remove('tip-hidden')
    } else if (entries[0].intersectionRatio === 1) {
      !tipEle.classList.contains('tip-hidden') && tipEle.classList.add('tip-hidden')
    }
  }, {
    root: document.querySelector('.main'),
    threshold: [0.8, 1]
  })
  ob.observe(card)
})
</script>
<style lang="scss" scoped>
.wrapper {
  position: relative;
}
.main {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow-y: auto;
  .card {
    display: inline-block;
    width: 90%;
    margin: 20px 5%;
    height: 120px;
    line-height: 120px;
    text-align: center;
    background-color: steelblue;
    font-size: 30px;
    color: #eafbff;
  }
}
.tip {
  opacity: 1;
  transition: opacity 0.5s linear;
  .tip-text, .tip-icon {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-weight: bold;
    color: #4E5969;
  }
  .tip-text {
    bottom: 40px;
  }
  .tip-icon {
    bottom: 15px;
    animation: bounce 2s linear 0s infinite;
  }
}
.tip-hidden {
  opacity: 0;
}
@keyframes bounce {
  0%,50% {
    bottom: 15px;
  }
  70% {
    bottom: 20px;
  }
  85% {
    bottom: 15px;
  }
  93% {
    bottom: 18px;
  }
  100% {
    bottom: 15px;
  }
}
</style>