# 14-ts中class的abstract

抽象类有下面特点

- 只能被继承, 不能被实例化的类, 是ts对es的扩展
- 在新建抽象类的时候必须有`abstract` 前缀, 同时如果想在抽象类里面定义抽象方法, 那么也需要有`abstract` 前缀



如在下面的代码中, 定义了一个抽象类`MyStreetFlight` , 该类含有一个抽象方法, 同时不能被实例化, 只能继承. 类`Ryu`继承了抽象类, 拥有了抽象类的所有非抽象方法, 同时还需要实现自己的抽象方法, 这里和`implement [interface]`有点类似.类`Chn` 也继承了抽象类, 同时实现了自己的抽象方法.

在分别`new` 两个类的时候, 类调用同一个抽象方法名, 实现的都是类自己的方法.

因此, 使用抽象类的好处就是**可以抽离出事物的共性，有利于代码的复用和扩展**

```typescript
abstract class MyStreetFlight {
  // 共同方法
  flight() {
    console.log(`${this.name} attacks to ${this.getSpecialAttack()}`)
  }
  // 抽象方法, 每个子类自己实现
  abstract getSpecialAttack(): string
  abstract get name(): string
}

class Ryu extends MyStreetFlight {
  getSpecialAttack(): string {
    return "Hadoop";
  }

  get name(): string {
    return "Ryu";
  }
}

class Chn extends MyStreetFlight {
  getSpecialAttack(): string {
    return "Spark";
  }

  get name(): string {
    return "Chn";
  }
}

const ryu = new Ryu()
// 内部调用了Ryu的getSpecialAttack进行字符拼接
ryu.flight()

const chn = new Chn()
// 内部调用了Chn的getSpecialAttack进行字符拼接
chn.flight()
```

