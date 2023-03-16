<template>
  <div class="calendar-wrapper" :class="{'extra-wrapper': hasExtraSlot}">
    <div class="wrapper">
      <slot v-if="hasHeaderSlot" name="header" :data="{ year, month, handlePrevMonth, handleNextMonth }"></slot>
      <div v-else class="header">
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
              :class="{ 'header-item': index === 0 }"
              v-for="day in totalDays.slice(index * WEEKDAYS, (index + 1) * WEEKDAYS)"
          >
            <span v-if="!hasDaySlot" :class="{ today: isToday({ year, month, day }) }">{{ day }}</span>
            <slot v-else name="day" :data="{ year, month, day }" />
          </div>
        </div>
      </div>
    </div>
    <slot name="extra" :data="{year, month}"></slot>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed, useSlots } from "vue";
import { isToday } from '@/utils/time'
import { setupDays } from './calc';

const WEEKDAYS = 7
const BEGIN_DAYS = 0
const prev = '<<'
const next = '>>'

const now = new Date()
const month = ref(now.getMonth())
const year = ref(now.getFullYear())
const hasDaySlot = !!useSlots().day
const hasHeaderSlot = !!useSlots().header
const hasExtraSlot = !!useSlots().extra

let totalDays = ref<(string | number)[]>([])
const totalRows = computed(() => Math.ceil(totalDays.value.length / WEEKDAYS))

onMounted(() => {
  totalDays.value = setupDays(BEGIN_DAYS, now)
})

const emit = defineEmits(['handlePrevMonth', 'handleNextMonth'])

const handlePrevMonth = () => {
  if (month.value === 0) {
    year.value -= 1
  }
  month.value = month.value === 0 ? 11 : --month.value
  totalDays.value = setupDays(BEGIN_DAYS, new Date(year.value, month.value))
  emit('handlePrevMonth', year.value, month.value)
}

const handleNextMonth = () => {
  if (month.value === 11) {
    year.value += 1
  }
  month.value = month.value === 11 ? 0 : ++month.value
  totalDays.value = setupDays(BEGIN_DAYS, new Date(year.value, month.value))
  emit('handleNextMonth', year.value, month.value)
}

</script>
<style lang="scss" scoped>
@import "docs/.vitepress/theme/scss/variables.scss";
@import "docs/.vitepress/theme/scss/mixin.scss";

.calendar-wrapper {
  color: rgb(96, 98, 102);
  @include commonCardWrapper
}

.extra-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .wrapper {
    border-right: 1px solid $boxBorderColor;
  }
}

.wrapper {
  width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  height: 280px;
  padding: 0 12px 12px;
  .calendar-row {
    display: flex;
    .calendar-item {
      display: inline-block;
      width: calc((100% - 28px) / 7);
      height: 30px;
      line-height: 30px;
      text-align: center;
      box-sizing: border-box;
      cursor: pointer;
      margin: 4px 2px;
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