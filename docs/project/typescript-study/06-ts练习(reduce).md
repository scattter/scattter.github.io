# 06-ts练习(reduce)
这一部分是使用reduce实现filter和map函数, reduce函数是一个很厉害的高阶函数
有两种实现的方式

## 1. 自己实现的
```typescript
function myReduce<T>(array: T[], callback: (total: T[], cur: T) => T[]): T[] {
  return array.reduce(callback, [])
}

const myMap = myReduce([1, 2, 3], (total: number[], cur: number) => {
  total.push(cur * 10)
  return total
})
console.log(myMap)

const myFilter = myReduce(['s1', 'b2', 's3'], (total: string[], cur: string) => {
  if (cur.startsWith('s')) {
    total.push(cur)
  }
  return total
})
console.log(myFilter)
```

## 2. 博主实现的
博主是直接把函数传进去处理, 看起来更简洁一点, 耦合性更低(返回的数据不必须是T)
```typescript
// other solution
function myMapWithReduce<T, K>(items: T[], mapFunc: (v: T) => K): K[] {
  return items.reduce((total: K[], cur: T) => [...total, mapFunc(cur)], [])
}
console.log(myMapWithReduce([1, 2, 3], (v: number) => (v * 100).toString()))

function myFilterWithReduce<T>(items: T[], filterFunc: (v: T) => boolean): T[] {
  return items.reduce((total: T[], cur: T) => filterFunc(cur) ? [...total, cur] : total, [])
}

console.log(myFilterWithReduce(['s1', 'b2', 's3'], (s: string) => s.startsWith('s')))
```