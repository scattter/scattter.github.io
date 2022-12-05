# 07-ts泛型中的keyof

在做自己项目的时候用到了中在`template` 中使用`v-for` 遍历渲染, ts编译会报一些变量没有定义的问题, 这就可以定义一个函数使用`keyof`
```typescript
function pluck<DataType, Key extends keyof DataType>(data: DataType, key: Key): DataType[Key] {
  return data[key]
}
const pluck1 = {
  time: '2022',
  name: 'pluck'
}
console.log(pluck(pluck1, 'name'))
console.log(pluck(pluck1, 'time'))


interface BaseEvent {
  name: string
  age: number
}
interface EventMap {
  addToCard: BaseEvent & { old: boolean },
  check: BaseEvent
}
function sendEvent<Key extends keyof EventMap>(key: Key, data: EventMap[Key]): void {
  console.log(key, data)
}
sendEvent('addToCard', {
  name: 'pp',
  age: 12,
  old: false
})
sendEvent('check', {
  name: 'aa',
  age: 62,
})
```