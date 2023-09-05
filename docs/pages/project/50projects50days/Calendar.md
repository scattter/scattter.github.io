# Calendar

## 1. 实现效果
<div class="view-demo-component">
  <Calendar>
    <template v-slot:day="{data}">
      <span>{{ data.day }}</span>    
    </template>
    <template v-slot:extra="{data}">
      <div class="extra-context">
        <div class="context">
          <span>Month: </span>
          <span class="month">{{ data.month + 1 }}</span>
        </div>
        <div>
          <span>Year: </span>
          <span class="year">{{ data.year }}</span>
        </div>
      </div>    
    </template>
  </Calendar>
</div>

## 2. 具体实现
做该组件的目的主要是想实现类似于`github` 个人提交记录的类似效果, 通过日历可以直观的看到提交频次.

目前组件的支持的`slot` 包括日历头, 日历上每一天的`dom`节点, 以及额外的补充信息. 具体的使用可以看上面的代码, 后面会在站点首页进行使用.



<script setup>
import Calendar from './viewComponent/Calendar/index.vue'
</script>
<style scoped>
.view-demo-component {
  display: flex;
  justify-content: center;
  align-items: center;
}
.extra-context {
  font-size: 14px;
  text-align: center;
  padding: 0 12px;
}
.context {
  margin-bottom: 10px;
}
.month, .year {
  font-size: 30px;
}
</style>