# 观察者模式

观察者模式和发布订阅模式很像, 这里的像我觉得更多是代码上像. 可能很多人都知道观察者模式相当于直接和公司签约, 发布订阅相当于外包, 但是两个模式写起来感觉差不多, 我之前也一直搞不清他们的区别.

后来再看文章, 然后明白了为什么他们的代码那么像, 但是模式又是不一样的模式的原因了.

观察者模式的代码是在**发布者和订阅者之间**的逻辑处理, 发布订阅的代码是**中介**的逻辑处理.

下面是观察者模式的代码

```typescript
interface ObserverType {
  update: () => void
}

interface SubjectType {
  subscribe: (ob: ObserverType) => void
  unsubscribe: (targetOb: ObserverType) => void
  notify: () => void
}

class Observe implements ObserverType{
  constructor(name: string, subject: SubjectType) {
    this.name = name
    if (subject) {
      subject.subscribe(this)
    }
  }

  // 观察者捕获到更新后, 进行具体更新
  update() {
    console.log('update current')
  }
}

class Subject implements SubjectType{
  constructor() {
    this.observes = []
  }

  // 添加观察者
  subscribe(ob: ObserverType) {
    this.observes.push(ob)
  }

  // 移除观察者
  unsubscribe(targetOb: ObserverType) {
    this.observes = this.observes.filter(ob => ob !== targetOb)
  }

  // 通知所有观察者
  notify() {
    this.observes.forEach((ob: ObserverType) => {
      ob.update()
    })
  }
}
```