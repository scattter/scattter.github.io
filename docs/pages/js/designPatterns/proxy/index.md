# 代理模式

代理模式是我们不直接与目标变量进行交互, 而是与目标变量的代理进行交互. 这里的交互方向有点类似单例模式, 但是代理模式相比于单例模式可以增加许多自定义功能, 比如一些属性的校验, 额外信息的返回等. 这里我们讲的代理模式主要是基于`Proxy` 实现(如Vue3的响应式).



## 1. 基本的代理模式

在这里我们先展示最基本的代理模式

```javascript
const foo = {
  name: 'foo',
  get value() {
    return this.name
  }
}

const proxy = new Proxy(foo, {
  get(target, p, receiver) {
    console.log(`proxy value is ----- ${target[p]}`)
    return target[p]
  }
})

// proxy value is ----- foo
proxy.value

const bar = {
  name: 'bar'
}
Object.setPrototypeOf(bar, proxy)

// proxy value is ----- foo
bar.value
```

在上面代码我们可以看到, 设定`bar` 对象的proxy为上面定义的, 进而`bar` 继承`foo` 函数里面的`value` 属性. 但是这样设定后, `bar.value` 的值却指向了`foo` 的`name` 属性.

我们可以关注到`proxy` 的`get` 方法有一个`receiver` 参数, 而这也就是下面更严谨的写法的关键点.



## 2. 严谨的代理模式

> 参考部分文章: https://www.zhihu.com/question/460133198

```javascript
const foo = {
  name: 'foo',
  get value() {
    return this.name
  }
}

const proxy = new Proxy(foo, {
  get(target, p, receiver) {
    console.log(`proxy value is ----- ${Reflect(target, p, receiver)}`)
    return Reflect(target, p, receiver)
  }
})

// proxy value is ----- foo
proxy.value

const bar = {
  name: 'bar'
}
Object.setPrototypeOf(bar, proxy)

// proxy value is ----- bar
bar.value
```

可以看到, 在上面的`get` 方法中我们使用了`Reflect` 反射进行数据的获取. 虽然上面代码中只劫持了数据的`get` 方法, 但是开发中可能有许多其他的方法, 比如`ownKeys`, `has`, `Reflect` 中已经帮我们定义好了这些方法, 我们不用再自己写, 所以更推荐统一用`Reflect` 方法进行数据的获取.

除此之外, 我们观察到`Reflect` 后面传入了第三个参数`receiver` , 正是这个参数使得我们获取到了`bar` 对象自己的`value` 值. 加上这个参数, `Reflect` 方法才知道`this` 的指向, 找到正确的属性值.

在MDN上对`receiver` 是这么描述的([原文这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get))

> 如果`target`对象中指定了`getter`，`receiver`则为`getter`调用时的`this`值。

由此我们可以知道, `bar` 对象继承了`foo` 对象的方法, 在获取`value` 值的时候`this` 指向的是调用的地方, 即`bar` 本身, 进而得到正确的值.