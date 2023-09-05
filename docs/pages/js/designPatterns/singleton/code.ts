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