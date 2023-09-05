# 12-ts中的mapped types

## 1. 简单的动态对象属性

```typescript
// easy case 1
type FlexibleDog = {
  name: string
  [key: string]: string | number
}

const myFlexibleDog: FlexibleDog = {
  name: 'jack',
  age: 12,
  email: 'no-no-no'
}
console.log(myFlexibleDog)
```



## 2. 复杂的动态对象属性

```typescript
// difficult case 2
interface DogInfo {
  name: string,
  age: number
}

type OptionsFlags<Type> = {
  [Property in keyof Type as `on${Capitalize<string & Property>}Change`]: (newValue: Type[Property]) => void
}

type Listeners = OptionsFlags<DogInfo>

function listenToObject<T>(obj: T, listens: Listeners): void {
  console.log('----', obj)
}
const dog2: DogInfo = {
  name: 'lucy',
  age: 18
}

listenToObject(dog2, {
  onNameChange: (v: string) => {
    console.log('update to', v)
  },
  onAgeChange: (v: number) => {
    console.log('update to', v)
  }
})
```

在上面的代码中, 首先定义了一个type: `OptionsFlags` , 该type传入一个自定义类型, 然后对该自定义类型进行解析, 使用`keyof` 关键字解析其`key` , 随后通过`as` 关键字将其转换为`onXxxChange` 的格式; type: `OptionsFlags` 解析后再定义给一个新的Type: `Listeners` .