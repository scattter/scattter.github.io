# 装饰器模式
> https://juejin.cn/post/6984586793987342366


装饰器模式（Decorator Pattern）允许向一个现有的对象添加新的功能，同时又不改变其结构。这种类型的设计模式属于结构型模式，它是作为现有的类的一个包装。



## 1. 模式介绍

如果平时我们想对一个对象增加新的功能, 可能使用原型/扩展运算符/class扩展继承实现, 比如下面这样

```javascript
// 原型
const Parent = function() {
	this.name = 'is parent'
}
Parent.prototype.age = 60

// 扩展运算符
const params = {
  id: 123
}
const newParams = {
	...params,
  name: 'module'
}

// class继承实现
class Shape {
  constructor(name) {
    this.name = name
  }

  draw() {
    console.log(`draw ${this.name}`)
  }
}

class ShapeColor extends Shape {
  constructor(name) {
    super(name)
  }

  setColor(color) {
    console.log(`color the ${this.name} ${color}`)
  }
}
```

上面的三种实现方式都有一定的局限性

- `prototype` 方式是永久性扩展, 更改了原对象
- 扩展运算符是简单的扩展, 单次使用
- `class` 继承如果父类改变, 子类无疑也会改变



如果使用装饰器模式进行封装, 那么就会变成下面这样

```javascript
class Shape {
  constructor(name) {
    this.name = name
  }

  draw() {
    console.log(`draw ${this.name}`)
  }
}

class ColorDecorator {
  constructor(shape) {
    this.shape = shape
  }

  draw() {
    this.setColor()
    this.shape.draw()
  }

  setColor() {
    console.log(`color the ${this.shape.name}`)
  }
}

let circle = new Shape('circle');
circle.draw();

let decorator = new ColorDecorator(circle);
decorator.draw();
```

装饰器模式将对象的实例作为实参传入到新的class构造函数中, 在装饰器里面重写想扩展的方法, 里面可以添加自己的方法, 也不影响调用实参的方法.



## 2. 具体应用

在现在做的项目中没有用到装饰模式, 但是想了想弹窗可能属于一种.

比如使用class去写一个弹窗组件, 基础组件可能只支持弹窗的关闭, 但是扩展弹窗可能需要支持关闭后进行页面的刷新. 那么这里就可以使用装饰器模式去装饰基础弹窗组件, 我试着写了下, 具体如下面所示.

`Dialog.vue` 组件

```vue
<template>
  <dialog open>this is dialog</dialog>
</template>
<script setup></script>
```

`Dialog.ts` 基础对象

```typescript
import { createVNode, render } from 'vue'
import Demo from './dialog.vue'

export class Dialog {
  public $el: HTMLElement
  public wrapper: HTMLElement
  constructor(el: HTMLElement) {
    this.$el = el
    this.wrapper = document.createElement('div')
  }

  open() {
    const instance = createVNode(Demo, {})
    render(instance, this.wrapper)
    this.$el.appendChild(this.wrapper)
  }

  close() {
    this.wrapper.remove()
  }
}
```

`Decorator.ts` 装饰器装饰后的对象 

```typescript
import { Dialog } from "./dialog.ts";

export class Decorator {
  private dialog: { open: () => void, close: () => void }
  constructor(dialog: { open: () => void, close: () => void }) {
    this.dialog = dialog
  }

  open() {
    this.dialog.open()
    this.log()
  }

  close() {
    this.dialog.close()
    this.refresh()
  }

  log() {
    console.log('record open count')
  }

  refresh() {
    console.log('refresh after close')
  }
}

export const decoratorDialog = (ele: HTMLElement) => {
  const dialog = new Dialog(ele)
  return new Decorator(dialog)
}
```

`app.vue` 使用页面 

```vue
<template>
	<div>
    <p @click="handleOpen">open dialog</p>
    <p @click="handleClose">close dialog</p>
  </div>
</template>
<script setup>
import { decoratorDialog } from './decorator.ts'
const add = decoratorDialog(document.querySelector('#app'))
const handleOpen = () => {
  add.open()
}

const handleClose = () => {
  add.close()
}
</script>
```

上面的示例代码就是使用`Decorator.ts` 装饰器后, 在业务界面可以实现对应的额外功能; 后期想实现其他的功能, 也可以按照上面的方式写新的装饰器进行扩展.





## 3. 其他扩展

下面代码均是从掘金链接copy过来的, 仅做为扩展了解

- 简单的装饰器

借助于`babel-plugin-transform-decorators-legacy babel-register` 插件可以实现下面的语法糖效果

```javascript
@addSkill
class Person { }

function addSkill(target) {
    target.say = "hello world"; //直接添加到类中
    target.prototype.eat = "apple"; //添加到类的原型对象中
}
var personOne = new Person();

console.log(Person['say']); // 'hello world'
console.log(personOne['eat']); // 'apple'
```

- 如果装饰器带有参数, 那么就是下面的代码

```javascript
@addSkill('I love')
class Person { }

function addSkill(msg) {
    return function(target){
        target.prototype.eat = msg + ' ' + "apple";
    }
}
var personOne = new Person();

console.log(personOne.eat);
```

- 装饰器还可以用在类的某个方法上，成为方法装饰器。

```javascript
class Person { 
    constructor(name){
        this.name = name;
    }

    @MyName
    getName(){
        console.log(this.name);
        return this.name;
    }
}

function MyName(target, key, descriptor){
    // console.log(target, key, descriptor);
    const fn = descriptor.value;

    descriptor.value = function(...args){
        console.log(`${key} is called...` );

        // fn && fn(...args);
        fn && fn.apply(this, args);
    }
}

let person = new Person('Tom');
person.getName();
```

上面各参数含义为:

target: 类的原型对象，上例是**Person**.**prototype** 

key: 所要修饰的属性名  name 

descriptor: 该属性的描述对象

**@装饰器只能用于类和类的方法**。 

装饰器第一个参数是类的原型对象，上例是Person.prototype，装饰器的本意是要“装饰”类的实例，但是这个时候实例还没生成，所以只能去装饰原型（这不同于类的装饰，那种情况时target参数指的是类本身）；第二个参数是所要装饰的属性名，第三个参数是该属性的描述对象。



- 多装饰器

如果同一个方法有多个装饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行。

```javascript
class Person { 
    constructor(name){
        this.name = name;
    }

    @myName(1)
    @myName(2)
    getName(){
        console.log(this.name);
        return this.name;
    }
}

function myName(msg) {
    console.log('装饰器: ' + msg);
    
    return (target, key, descriptor) => {
        console.log('装饰器执行: ' + msg);
    }
}

let person = new Person('Tom');
person.getName();
```

结果为:

```
装饰器: 1
装饰器: 2
装饰器执行: 2
装饰器执行: 1
Tom
```

