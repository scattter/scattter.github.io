# 15-ts中实现Mixin函数

Mixin 类是某种实现了特定功能的类。其他的类可以引入 mixin，并可以访问它的方法和属性。如此，mixin 提供了一种基于组合行为的代码重用方式。

Mixin的定义:

1. 接收一个构造函数
2. 声明一个继承于这个类的构造函数
3. 给这个新类添加成员
4. 然后返回这个类 

(这里我自己感觉好像和装饰器模式有点像, 至于具体的差别后面开一个装饰器模块文档再搞清楚)



Mixin 类的模板代码为:

```typescript
type Constructor<T> = new (...args: any[]) => T;

function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}
```

- 首先定义一个类型`Constructor` , 该类型返回的是一个类似于any类型的构造函数, 任何其他构造函数都可以继承`Constructor`.  

- 其次定义一个Mixin 类函数.
  - 该函数返回一个类表达式, 可以是匿名的, 也可以是具名的, 同时其继承Mixin 类函数的入参
  - 函数的入参是其他你任意想要修饰的类
  - 在返回的类表达式里面实现Mixin函数想要 实现的功能(比如上面代码就是定义了一个timestamp属性)

更多详细的可以参考这篇文章: [<[译]Typescript 中的 Mixin 类——TypeScript Evolution 系列第二十篇>](https://juejin.cn/post/7026524800973537287)



在下面代码中, 则是定义了一个名为DumpInfo的Mixin函数, 该函数返回一个类继承传入的类, 同时新增一个`dump` 方法, 该方法再调用入参类的`getObject` 方法.

```typescript
function CreateMemoryDataBase<T>() {
  return class CreateMemoryDataBase<T> {
    private db: Record<string, T> = {}

    set(id: string, value: T) {
      this.db[id] = value
    }

    get(id: string): T {
      return this.db[id]
    }

    getObject(): object {
      return this.db
    }
  }
}

const StringMemoryDatabase = CreateMemoryDataBase<string>()
const stb1 = new StringMemoryDatabase()
stb1.set('a', 'hello a')
console.log(stb1.getObject())


// use mixin to complete getObject fun
type Construct<T> = new (...args: any[]) => T

function DumpInfo<T extends Construct<{
  getObject(): object
}>>(Base: T) {
  return class DumpInfo extends Base {
    dump() {
      console.log(this.getObject())
    }
  }
}
const DumpInfoDatabase = DumpInfo(StringMemoryDatabase)
const stb2 = new DumpInfoDatabase()
stb2.set('b', 'hello b')
stb2.dump()

```