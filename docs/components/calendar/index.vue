<template>
  <div class="calendar-wrapper">
    <slot name="header"></slot>
    <div class="header">
      <div class="switch">
        <button class="btn" @click="handlePrevMonth">{{ prev }}</button>
        <span>{{ year }} - {{ month + 1 }}</span>
        <button class="btn" @click="handleNextMonth">{{ next }}</button>
      </div>
    </div>
    <div class="calendar">
      <div class="calendar-row" v-for="(item, index) in Array(totalRows)">
        <div
          class="calendar-item"
          :class="{'header-item': index === 0, today: isToday(item, month, year)}"
          v-for="item in totalDays.slice(index * WEEKDAYS, (index + 1) * WEEKDAYS)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { setupDays } from './calc.ts';

const now = new Date()
const month = ref(now.getMonth())
const year = ref(now.getFullYear())

const prev = '<<'
const next = '>>'
const WEEKDAYS = 7
let totalDays = ref([])
const totalRows = computed(() => Math.ceil(totalDays.value.length / WEEKDAYS))

onMounted(() => {
  totalDays.value = setupDays(0, now)
})

const handlePrevMonth = () => {
  if (month.value === 0) {
    year.value -= 1
  }
  month.value = month.value === 0 ? 11 : --month.value
  totalDays.value = setupDays(0, new Date(year.value, month.value))
}

const handleNextMonth = () => {
  if (month.value === 11) {
    year.value += 1
  }
  month.value = month.value === 11 ? 0 : ++month.value
  totalDays.value = setupDays(0, new Date(year.value, month.value))
}

const isToday = (day: number | undefined | string, month: number, year: number) => {
  if (typeof day !== 'number') return false
  const cur = new Date()
  return day === cur.getDate() && month === cur.getMonth() && year === cur.getFullYear()
}

</script>
<style lang="scss" scoped>
@import "docs/.vitepress/theme/scss/variables.scss";
@import "docs/.vitepress/theme/scss/mixin.scss";

.calendar-wrapper {
  width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgb(96, 98, 102);
  @include commonCardWrapper
}

.header {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  .switch {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn {
      padding: 2px 6px;
      border: 1px solid $boxBorderColor;
      border-radius: 4px;
      &:hover {
        @include commonBtnHover
      }
    }
  }
}

.calendar {
  width: 100%;
  padding: 0 12px 12px;
  .calendar-row {
    display: flex;
    .calendar-item {
      display: inline-block;
      width: calc(100% / 7);
      height: 30px;
      line-height: 30px;
      text-align: center;
      box-sizing: border-box;
      cursor: pointer;
      margin: 4px 0;
    }
    .header-item {
      border-bottom: 1px solid rgb(235, 238, 245);
    }
    .today {
      color: $linkColor;
      font-weight: bolder;
    }
  }
}
</style>