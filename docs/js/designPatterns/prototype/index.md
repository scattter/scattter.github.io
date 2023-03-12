# Prototype

> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
>
> http://fangwenzheng.top/article/%2FWEB%2F%E5%8E%9F%E5%9E%8B%E4%B8%8E%E5%8E%9F%E5%9E%8B%E9%93%BE.md



原型模式其实就是原型链. 在日常开发中会遇到许多高频词的变量操作, 如获取变量的长度, 类型, 这些如果自己实现会十分繁琐, 而原型链就将这些公共的操作抽取到了一个成为原型链的链上. 具体来说, 我们在新建一个对象/变量后, 其会自动继承原型链上的方法和属性, 比如每一个变量都可以通过原型链上的`Object.prototype.toString.call(xx)` 方法准确得到其类型.

MDN上关于原型和原型链的说法为:

> 每个实例对象（object）都有一个私有属性（称之为 __proto__）指向它的构造函数的原型对象（**prototype**）。该原型对象也有一个自己的原型对象（__proto__），层层向上直到一个对象的原型对象为 `null`。根据定义，`null` 没有原型，并作为这个**原型链**中的最后一个环节。
>
> 几乎所有 JavaScript 中的对象都是位于原型链顶端的 [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 的实例。

> JavaScript 对象是动态的属性“包”（指其自己的属性）。JavaScript 对象有一个指向一个原型对象的链。当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。

构造函数、原型和实例之间的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个原型对象的指针。



## 1. 具体例子

### 1.1 简单例子

```javascript
class Dog {
  constructor(name) {
    this.name = name
  }

  bark() {
    console.log('Woof')
  }
}

const dog = new Dog('root dog')

// Error
// dog.play()

Dog.prototype.play = () => {
  console.log('begin play')
}
dog.play() // 'begin play'

// instance's proto equal Class' prototype
// any type has proto, but only function has prototype
dog.__proto__ === Dog.prototype // true
```

在上面的例子中, 我们可以看到, 使用`Dog` class创建了一个实例`dog`, `dog` 继承了class上的方法, 可以正常调用. 而调用class上不存在的`play` 方法就会报错, 因为并没有该方法的定义.

但是在该class的原型对象上新定义该`play` 方法, 再次使用`dog` 实例去调用`play` 方法, 就能正常调用了. 也就是`dog` 实例去执行一个方法的时候, 如果自身没有该方法, 就会去其原型链上寻找. 它的原型指向的是`Dog.prototype`, 该原型上有对应方法的定义, 就执行该方法.



### 1.2 原型链的示例

```javascript
class SuperDog extends Dog {
  constructor(name) {
    super(name);
  }

  fly() {
    return "Flying!";
  }
}

const dog1 = new SuperDog("Daisy");
dog1.fly() // Flying!
```

在上面的代码中, 我们又新定义了一个类`SuperDog`, 该类继承`Dog`, 同时新建了一个实例`dog1`, 那他们的原型链就可以表示为下图所示:

![Flow](https://www.patterns.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddxwdqwkr%2Fimage%2Fupload%2Ff_auto%2Fv1609056523%2Fpatterns.dev%2FScreen_Shot_2020-12-24_at_1.09.36_PM_isgkmt.png&w=3840&q=75)

实例的`proto` 指向类的原型对象, 类的原型对象又指向父类的原型对象, 依次向上寻找, 到`Object.prototype`, 最后到`null`.



### 1.3 原型链的继承

ECMAScript 5 中引入了一个新方法：[`Object.create()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)。可以调用这个方法来创建一个新对象。新对象的原型就是调用 create 方法时传入的第一个参数. 如下所示

```Javascript
var a = {a: 1};
// a ---> Object.prototype ---> null

var b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
console.log(b.a); // 1 (继承而来)

var c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null

var d = Object.create(null);
// d ---> null
console.log(d.hasOwnProperty); // undefined，因为 d 没有继承 Object.prototype
```



### 1.4 原型链的副作用

正如上文所说, 原型链的特性导致了我们在获取具体对象上的某个属性时, 会自动在原型链上去寻找, 这就导致开发不能正常判断该对象本身是否含有这个属性, 所以原型链提供了一个继承自Object.prototype的 hasOwnProperty` 方法用来判断对象自身是否有该属性.



**总结**

- `js`分为**函数对象**和**普通对象**，每个对象都有`__proto__`属性，但是只有**函数对象**才有`prototype`属性
- `Object`、`Function`都是`js`内置的函数, 类似的还有我们常用到的`Array`、`RegExp`、`Date`、`Boolean`、`Number`、`String`
- 属性`__proto__`是一个对象，它有两个属性，`constructor`和`__proto__`；
- 原型对象`prototype`有一个默认的`constructor`属性，用于记录实例是由哪个构造函数创建；



除此之外, 还需要注意到的两个点为

- js之父在设计js原型、原型链的时候遵从以下两个准则

```
1. Person.prototype.constructor == Person 
// **准则1：原型对象（即Person.prototype）的constructor指向构造函数本身**
2. person01.__proto__ == Person.prototype 
// **准则2：实例（即person01）的__proto__和原型对象指向同一个地方**
```

- `JavaScript`中的继承实际上通过`__proto__`属性实现的

```
Array.constructor ===  Function // true
// 在 JavaScript 中, constructor 属性返回对象的构造函数。
// Array上没有constructor，实际访问的是Array.__proto__.constructor
```



```
    __proto__                       __proto__                          __proto__
f----------------->Foo.prototype----------------->Object.prototype----------------->null


       __proto__                           __proto__                          __proto__
Foo----------------->Function.prototype----------------->Object.prototype----------------->null
```

更详细的图

构造函数、原型和实例之间的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个原型对象的指针。

![1691fc878b9beefa](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/1691fc878b9beefa.png)



## 2. 原型链的相关扩展

### 2.1 基于原型链实现继承

这种方式会继承原型链上的属性, 但是不会继承实例上的

构造函数、原型和实例之间的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个原型对象的指针。

缺点: 继承的本质就是复制，即重写原型对象，代之以一个新类型的实例. 即如果原型上的是引用类型, 那么其他子类继承后对原型属性进行修改会影响到其他子类和父类的原型属性

```Javascript
function Parent2() {
  this.name = 'parent2'
}
Parent2.prototype.size = 2
Parent2.prototype.ages = [18]

function Child2() {
  this.height = 100
}
// 这里如果直接使用Parent2.prototype 那么子类和父类的prototype指向一个地址
// 如果子类prototype新增属性  父类也会存在
// 使用new操作符创建一个新的对象 该对象将会被[[Prototype]]链接到这个函数的prototype对象上
Child2.prototype = new Parent2()
// 构造函数指向自身
Child2.prototype.constructor = Child2
```

在上面原型链的继承上, 还有另外一种写法

```Javascript
Child2.prototype.__proto__ = Parent2.prototype
```



### 2.2 保留原型链的浅拷贝

```Javascript
function shallowCopy(src) {
  if (!src) return src
  const resProto = Object.getPrototypeOf(src);
  return Object.assign( Object.create(resProto),  src);
}
```

在上面的代码中, 先使用`Object.getPrototypeOf` 获取对象的原型对象, 然后使用`Object.create` 创建一个继承该原型对象的对象, 再通过`Object.assign` 方法将源对象赋值到目标对象并返回.

> **`Object.assign()`** 方法将所有[可枚举](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)（`Object.propertyIsEnumerable()` 返回 true）的自有（`Object.hasOwnProperty()` 返回 true）属性从一个或多个源对象复制到目标对象，返回修改后的对象