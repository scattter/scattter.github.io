<template>
  <div class="view-demo-component">
    <div v-for="(item, index) in state.numbers" :key="item.id" v-tooltip="item" v-placeholder:[tip]="item.name" class="item">
      {{ item.name }}
    </div>
<!--    <div class="item" v-placeholder="state.numbers[0].name">{{ state.numbers[0].name }}</div>-->
<!--    <div class="item" v-placeholder="state.numbers[1].name">{{ state.numbers[1].name }}</div>-->
<!--    <div class="item" v-placeholder="state.numbers[2].name">{{ state.numbers[2].name }}</div>-->
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { placeholder as vPlaceholder } from './placeholder.ts'
import {tooltip as vTooltip} from '../tooltip/tooltip.ts'

const tip = '暂无数据'
const state = reactive({
  numbers: [{}, {}, {}, {}]
})
setTimeout(() => {
  state.numbers = [
    {
      id: 10,
      name: 'test1'
    },
    {
      id: 20,
      name: ''
    },
    {
      id: 30,
      name: 'test3'
    },
  ]
}, 3000)
</script>
<style scoped lang="scss">
.view-demo-component {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;

  .item {
    width: 100px;
    height: 24px;
    text-align: center;
  }
}
</style>