# 13-ts中的readonly和static

Ts中的修饰符包括访问修饰符, 只读修饰符, 静态修饰符, 访问修饰符在**11节**中有描述, 这里就不讲了

- 只读修饰符 `readonly`

```typescript
class Person{
  readonly name = 'Alice';
}
```

- 静态修饰符 static

`static`, 静态的. 通过`static`修饰的成员叫**静态成员**，静态成员无需实例化，直接通过类名调用

```ts
class Person{
  static a = 98;
}
console.log(person.a)
```

静态成员通常用于整个类所共有的一些东西,



下面是一些具体的代码

```typescript
class DogInfo12 {
  constructor(public readonly name: string, public readonly age: number) {
  }
}

const myDog1 = new DogInfo12('jack', 18)
console.log(myDog1.name)
// myDog1.name = '009'

// need to learn static, public, private in class
class DogInfoList {
  private constructor() {
  }

  private doggs: DogInfo12[] = []

  static instance: DogInfoList = new DogInfoList()

  static addDog(dog: DogInfo12) {
    DogInfoList.instance.doggs.push(dog)
  }

  getDogList() {
    return this.doggs
  }
}

DogInfoList.addDog(myDog1)

console.log(DogInfoList.instance.getDogList())

```