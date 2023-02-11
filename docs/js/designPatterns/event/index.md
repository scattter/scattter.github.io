# 发布订阅

> https://juejin.cn/post/7185451392994115645

这里的逻辑主要是发布者和订阅者之间中介的处理逻辑, 它负责对接发布者(发布者触发后调用`emit` 函数), 和订阅者(通过`on` 函数进行添加)

上面引用链接是之前在掘金上比较热门的<前端如何进行更新>的文章, 里面就是使用了发布订阅模式.

```typescript
class Event {
  constructor() {
    this._cache = {}
  }

  on(eventName: string, cb: () => void) {
    // 添加事件与回调
    const cbs = (this._cache[eventName] = this._cache[eventName] || [])
    if (cbs.indexOf(cb) === -1) {
      cbs.push(cb)
    }
    return this
  }

  emit(eventName: string, data: unknown) {
    const cbs = this._cache[eventName]
    if (Array.isArray(cbs)) {
      cbs.forEach(fn => {
        fn(data)
      })
    }
    return this
  }

  off(eventName: string, cb: () => void) {
    const cbs = this._cache[eventName]
    if (Array.isArray(cbs)) {
      // 如果指定移除哪个回调, 那么就移除指定回调
      // 否则移除所有回调
      if (cb) {
        const index = cbs.indexOf(cb)
        if (index !== -1) cbs.splice(index, 1)
      } else {
        cbs.length = 0
      }
    }
    return this
  }
}
```