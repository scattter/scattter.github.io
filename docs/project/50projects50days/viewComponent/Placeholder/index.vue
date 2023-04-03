<template>
  <div class="view-demo-component">
    <div class="wrapper">
      <div class="image animation-bg"></div>
      <div class="content">
        <div class="intro">
          <strong class="title animation-bg">&nbsp;</strong>
          <div class="text animation-bg">&nbsp;</div>
        </div>
        <div class="detail">
          <div class="image animation-bg"></div>
          <div class="info">
            <strong class="title animation-bg animation-bg-text">&nbsp;</strong>
            <div class="text animation-bg animation-bg-text">&nbsp;</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  let text = []
  const introEle = document.querySelector('.intro')
  const infoEle = document.querySelector('.info')
  const animationEles = document.querySelectorAll('.animation-bg')
  const imgEles = document.querySelectorAll('.image')

  setTimeout(() => {
    animationEles.forEach(ele => {
      ele.classList.remove('animation-bg')
      ele.classList.remove('.animation-bg-text')
    })
    imgEles.forEach(ele => {
      ele.style.background = "url('../../../../public/bird.jpg') center no-repeat"
      ele.style.backgroundSize = 'cover'
    })
    text = [
      'first line',
      'second line'
    ]
    introEle.children.item(0).innerHTML = text[0]
    introEle.children.item(1).innerHTML = text[1]
    infoEle.children.item(0).innerHTML = text[0]
    infoEle.children.item(1).innerHTML = text[1]
  }, 2000)
})
</script>
<style scoped lang="scss">
.view-demo-component {
  display: flex;
  align-items: center;
  justify-content: center;
}
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 300px;
  height: 360px;
  background-color: white;
  overflow: hidden;

  .image {
    width: 100%;
    height: 100%;
  }

  .content {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-direction: column;
    width: calc(100% - 20px);
    height: 100%;
    .intro {
      width: calc(100% - 20px);
      margin-left: 10px;
    }

    .detail {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .image {
        width: 50px;
        height: 50px;
        margin-left: 10px;
        margin-right: 20px;
        border-radius: 50%;
      }
      .info {
        flex: 1;
        margin-right: 10px;
      }
    }
  }
}

.title,
.text {
  display: block;
  margin: 10px 0;
}

.animation-bg {
  display: block;
  width: 100%;
  background-image: linear-gradient(
          to right,
          #f6f7f8 0%,
          #edeef1 10%,
          #f6f7f8 20%,
          #f6f7f8 100%
  );
  background-size: 200% 100%;
  animation: loading 1s linear infinite;
}
.animation-bg-text {
  margin: 10px 0;
}
@keyframes loading {
  from {
    background-position: 50% 0;
  }
  to {
    background-position: -150% 0;
  }
}
</style>