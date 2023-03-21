interface ObserverType {
  name: string
  subject: SubjectType | undefined
  update: () => void
}

interface SubjectType {
  subscribe: (ob: ObserverType) => void
  unsubscribe: (targetOb: ObserverType) => void
  notify: () => void
}


// 发布者和观察者的逻辑处理
class Observe implements ObserverType {
  public name: string;
  public subject: SubjectType | undefined;
  constructor(name: string, subject: SubjectType) {
    this.name = name
    if (subject) {
      subject.subscribe(this)
    }
  }

  update() {
    console.log('update current')
  }
}

class Subject implements SubjectType{
  public observes: ObserverType[];
  constructor() {
    this.observes = []
  }

  subscribe(ob: ObserverType) {
    this.observes.push(ob)
  }

  unsubscribe(targetOb: ObserverType) {
    this.observes = this.observes.filter(ob => ob !== targetOb)
  }

  notify() {
    this.observes.forEach((ob: ObserverType) => {
      ob.update()
    })
  }
}