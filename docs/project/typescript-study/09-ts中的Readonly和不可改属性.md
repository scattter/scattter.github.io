09-ts中的Readonly和不可改属性

一种readonly是直接对接口进行包裹, 一种则是使用`as` 关键字实现数组中每个元素的不能更改, 还有一种是类里面的只读修饰符

- 对接口readonly
在下面的代码中, `makeCat` 函数返回的是`MyCat` 类型, 该类型的每一个属性都是可以更改的, 所以`myCat.age = 10` 是可以正常执行的; `makeReadonlyCat` 函数则对返回类型进行了`Readonly` 限制, 所以`myReadonlyCat.age = 10` 不能正常执行
```typescript
interface MyCat {
  name: string
  age: number
}

const makeCat = (name: string, age: number): MyCat => {
  return {
    name,
    age
  }
}
const myCat = makeCat('wws', 4)
myCat.age = 10

const makeReadonlyCat = (name: string, age: number): Readonly<MyCat> => {
  return {
    name,
    age
  }
}
const myReadonlyCat = makeReadonlyCat('wws', 4)
// myReadonlyCat.age = 10

type MyReadonlyCat = Readonly<MyCat>
```

- 对数组readonly处理
```typescript
const falseConst = [0, 1, 2]
falseConst[0] = 1

const reallyConst = [0, 1, 2] as const
// reallyConst[0] = 3
```

- 类的只读修饰符

```typescript
class Person{
  readonly name = 'Alice';
}
```

但需要注意的时，即使是`readonly`的东西，在初始化之前是可以写，即在`constructor`中可以初始化或更改

```typescript
class Person{
  readonly name:string;
  constructor(name:string){
    this.name =  name;
  }
}
```

所以，我们知道了，`readonly`的属性，仅两个地方可以写：

1. 在声明同时赋予初始值
2. 在构造函数中赋值或者修改初始值



