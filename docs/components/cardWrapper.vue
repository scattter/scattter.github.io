<template>
  <div class="card-wrapper">
    <div class="wrapper-header">
      <slot v-if="$slots.headerSlot" name="headerSlot"></slot>
      <div v-else class="wrapper-header-title">
        <span class="main-title">{{ title }}</span>
        <span class="sub-title">{{ subTitle }}</span>
      </div>
      <slot name="extendTitleSlot"></slot>
    </div>
    <div class="wrapper-context">
      <slot v-if="$slots.contextSlot" name="contextSlot"></slot>
      <div v-else class="text-context">{{ context }}</div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(['data'])
const { title, subTitle, context } = props.data
</script>
<style lang="scss" scoped>
.card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  border: 2px solid var(--vp-c-bg-mute);
  border-radius: 10px;
  margin: 10px;
  padding: 24px;
  font-size: 16px;
  .wrapper-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 8px;
    margin-bottom: 8px;
    width: 100%;
    border-bottom: 1px solid var(--vp-c-bg-mute);
    .wrapper-header-title {
      .main-title {
        font-size: 24px;
        font-weight: 600;
        margin-right: 4px;
      }
      .sub-title {
        font-size: 14px;
        color: var(--vp-c-text-4);
      }
    }
  }
  .wrapper-context {
    width: 100%;
    height: 100%;
    .text-context {
      flex-grow: 1;
      padding-top: 8px;
      line-height: 24px;
      font-size: 14px;
      font-weight: 500;
      color: var(--vp-c-text-2);
    }
  }
}
</style>