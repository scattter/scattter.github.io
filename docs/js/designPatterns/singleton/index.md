# 单例模式

单例模式主要是用来确保全局有有唯一一个实例. 在ES6之前, js里面都是用的var, es6引入了let, const以及module, 这能够很好的去解决全局变量的污染问题.

和**React**生态中的**Redux** 和 **React Context** 不一样的是, 单例模式可以更改, 其有内部方法进行数据更新, 而**Redux** 和 **React Context** 是只读的, 只能通过纯函数**dispatcher** 进行替换更新.


单例模式的Ts代码

```typescript
class Counter {
  // 唯一实例, 仅可当前类自己调用, 同时由于是static, 所以直接调用
  private static instance: Counter
  // 实例信息
  private static count: number

  // 初始化实例信息
  private constructor() {
    Counter.count = 0
  }

  // 获取当前实例
  public static getInstance() {
    if (!Counter.instance) {
      Counter.instance = new Counter();
    }

    return Counter.instance;
  }

  public static increment() {
    Counter.count++
  }

  public static decrement() {
    Counter.count--
  }

  public static getCount() {
    return Counter.count;
  }
}

console.log(Counter.getInstance())
console.log(Counter.getCount())

Counter.increment()
Counter.increment()
console.log(Counter.getCount())
```



Js代码

```javascript
let instance;
let counter = 0;

// 单例模式
class Counter {
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

// 确保消费代码不能修改实例
const singletonCounter = Object.freeze(new Counter());
module.exports = singletonCounter
```



