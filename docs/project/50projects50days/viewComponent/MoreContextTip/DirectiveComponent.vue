<template>
  <div ref="tip" class="v-tip">
    <div class="v-tip-text">more</div>
    <div class="v-tip-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-down" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
        <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
      </svg>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
const props = defineProps({
  parent: {
    type: Object,
    default: null,
    required: false
  },
  target: {
    type: Object,
    default: null,
    required: false
  }
})

const tip = ref()

onMounted(() => {
  const tipEle = tip.value
  const ob = new IntersectionObserver(function(entries) {
    if (entries[0].intersectionRatio < 0.8) {
      tipEle.classList.contains('v-tip-hidden') && tipEle.classList.remove('v-tip-hidden')
    } else if (entries[0].intersectionRatio === 1) {
      !tipEle.classList.contains('v-tip-hidden') && tipEle.classList.add('v-tip-hidden')
    }
  }, {
    root: props.parent,
    threshold: [0.8, 1]
  })
  ob.observe(props.target)
})
</script>
<style lang="scss" scoped>
.v-tip {
  opacity: 1;
  transition: opacity 0.5s linear;
  .v-tip-text, .v-tip-icon {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-weight: bold;
    color: #4E5969;
  }
  .v-tip-text {
    bottom: 40px;
  }
  .v-tip-icon {
    bottom: 15px;
    animation: v-tip-bounce 2s linear 0s infinite;
  }
}
.v-tip-hidden {
  opacity: 0;
}
@keyframes v-tip-bounce {
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