# 模块模式

> https://juejin.cn/post/6994224541312483336
>
> 其实上面文章对于`CommonJS`和`Es Module`的讲解已经很详细了, 所以可以看上面文章即可. 下面是一些简单的记录.



在前端方面, 这个设计模式可以说是属于ES6+的一个特性, 即将不同功能的代码拆分到不同的模块中, 在使用的时候再进行导入, 实现业务与基础组件的解耦.
在参考的网站上只对`Es Module` 进行了讲解, 内容不是很多, 所以这里增加了`CommonJS` 的内容.

## 1. 两者的起源

### 1.1 `CommonJS`

`CommonJS` 是一个项目，其目标是为JavaScript在网页浏览器之外创建模块约定。创建这个项目的主要原因是当时缺乏普遍可接受形式的JavaScript脚本模块单元，模块在与运行JavaScript脚本的常规网页浏览器所提供的不同的环境下可以重复使用。

早期`nodejs` 借鉴了`CommonJS` , 实现了良好的模块化管理. 不过由于`CommonJS` 的一些特性, `CommonJS` 更多是运用在服务端, 比如:

- `Node` 是 CommonJS 在服务器端一个具有代表性的实现；
- `Browserify` 是 CommonJS 在浏览器中的一种实现；
- `webpack` 打包工具对 CommonJS 的支持和转换；也就是前端应用也可以在编译之前，尽情使用 CommonJS 进行开发。



### 1.2 `Es Module`

从 `ES6` 开始,  `JavaScript` 才真正意义上有自己的模块化规范.

`Es Module` 带有许多优势，比如:

- 借助 `Es Module` 的静态导入导出的优势，实现了 `tree shaking`。
- `Es Module` 还可以 `import()` 懒加载方式实现代码分割 (路由懒加载等)。



## 2. Commonjs

### 2.1 简单例子

`hello.js` 文件

```javascript
let name = 'scatter'
module.exports = function sayName(){
  console.log(name)
  return name
}
```

`home.js` 文件

```javascript
const sayName = require('./hello.js')
sayName() // 'scatter'
```

上面是`commonjs` 的简单实现. 在`commonjs`的工作机制下, 每个文件都可以通过`module.exports = xxx` 导出变量, 通过`require` 关键字来引入变量.

上面的变量分别表示

- `module` 记录当前模块信息。
- `require` 引入模块的方法。
- `exports` 当前模块导出的属性



### 2.2 导入和导出

#### 2.2.1 模块的导出

- 导出一

```javascript
const name = 's'
const age = 12
module.exports = {
	name,
  age
}
```

- 导出二

```javascript
exports.name = 's'
exports.age = 12
```

上面两种导出方式都是比较支持的, 使用的时候没有大的区别. 但是不能同时使用这两种方式, 否则会出现变量覆盖的情况.

> 两者的细微之处可能就是`module.exports` 当导出一些函数等非对象属性的时候，也有一些风险，就比如循环引用的情况下。对象会保留相同的内存地址，就算一些属性是后绑定的，也能间接通过异步形式访问到。但是如果 module.exports 为一个非对象其他属性类型，在循环引用的时候，就容易造成属性丢失的情况发生了. 



除此之外, 不能使用`exports = {xxx}` 的写法, 因为这样写只相当于在模块内部新定义了一个变量, 而上面两种写法可以理解为是在外部传入的形参上新增属性, 能够正确导出和正确引入.



#### 2.2.2 模块的导入

```javascript
// a.js
const name = 's'
const age = 12
module.exports = {
	name,
  age
}
```

- 导入一

```javascript
const { name, age } = require('./a.js')
// const obj = require('./a.js')
```

- 导入二

```javascript
const pathName = 'a'
const { name, age } = require(`./${pathName}.js`)
```

导入一是最常见的模块导入, 导入二是`commonjs` 支持动态导入路径.

除此之外, `commomjs` 还可以根据导入的文件类型不同进行分类. 这些在上面掘金文章中有更详细的介绍, 这里只增加个第三方自定义模块的查找.

```javascript
const fs =      require('fs')      // ①核心模块
const sayName = require('./hello.js')  //② 文件模块
const crypto =  require('crypto-js')   // ③第三方自定义模块
```

下图是第三方自定义模块的依赖查找.

![4.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cfb7a91998774fc78a9813e3b0db8199~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)



### 2.3 模块的循环引用

这里指的是在文件`a` 中导入文件`b`, 同时在文件`b` 中导入文件`a`, 这就涉及到一个循环引用的问题. 

`commonjs` 因为加载模块的时候有一个缓存机制, 通过该机制在循环引用的时候导入的是一个空对象, 进而解决了这个循环引用的问题. 下图是掘金作者画的加载流程图.

![15.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a2084aa55764fa493a7b82dfe2f2d50~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)



如果想使用循环引用, 同时能够导入想要的值, 可以使用异步操作或者是在对应模块的作用域内进行动态加载, 如下所示.

```javascript
// 在这里因为有缓存, 所以只会加载一次模块.
const say = require('./b')

console.log('我是 a 文件')
// 动态加载
exports.say = function(){
    const getMes = require('./b')
    const message = getMes()
    console.log(message)
}

// 异步引入
setTimeout(()=>{
    console.log('异步打印 a 模块' , say)
},0)
```





## 3. Es Module

`Es Module` 是在`ES6` 后引入到前端, 从此`js` 才真正意义上有了自己的模块.

### 3.1 简单例子

`a.js` 

```javascript
export const name = 'scatter'
```

`b.js`

```javascript
import { name } from './a.js'
```

在`Es Module` 中使用`export` 和 `import` 关键字来导出和导入. 这两个关键字之间有许多组合, 比如常规导出, 默认导出; 常规导入, 默认导入, 重命名导入, 导出式导入, 动态导入.



### 3.2 导入和导出

#### 3.2.1 模块的导出

- 导出一

```javascript
export const name = 'scatter'
```

- 导出二

```javascript
const name = 'scatter'
export default {
  name
}
```

上面两个导出一个是默认导出, 一个是变量名导出, 两者的差异主要是导入时候有些许不同, 如下面导入部分.



#### 3.2.2 模块的导入

- 常规导入

```javascript
import { name } from 'a.js'
```

- 默认导入

```javascript
import obj from 'a.js'
```

- 重命名导入

```javascript
import { name as myName } from 'a.js'
```

- 混合式导入

```javascript
import obj, { name as myName } from 'a.js'
```

- 导出式导入

```javascript
export { name } from 'a.js'
```

- 动态导入

```javascript
const a = () => import('a.js')
```

上面四个导入是最常见的导入, 下面的导出式导入在一些第三方库中会存在, 而动态导入一般用在路由懒加载中.



### 3.3 模块的静态加载

ES6 module 的引入和导出是静态的，`import` 会自动提升到代码的顶层 ，`import` , `export` 不能放在块级作用域或条件语句中。

同时, ES6 module的导入是地址的导入, 即在新的模块中虽然不能直接修改导入变量的值, 但是如果通过模块内置的方法进行修改, 导入变量的值也会随之发生变化.

也因为ES6 module会预加载模块, 所以其更可以更简单的找到真正使用哪些变量, 进而配合`webpack` 等工具进行`tree shaking`.



## 4. 总结

> 这里的总结引用了掘金文章内的

### Commonjs 总结

`Commonjs` 的特性如下：

- CommonJS 模块由 JS 运行时实现。
- CommonJs 是单个值导出，本质上导出的就是 exports 属性。
- CommonJS 是可以动态加载的，对每一个加载都存在缓存，可以有效的解决循环引用问题。
- CommonJS 模块同步加载并执行模块文件。

### Es Module 总结

`Es module` 的特性如下：

- ES6 Module 静态的，不能放在块级作用域内，代码发生在编译时。
- ES6 Module 的值是动态绑定的，可以通过导出方法修改，可以直接访问修改结果。
- ES6 Module 可以导出多个属性和方法，可以单个导入导出，混合导入导出。
- ES6 模块提前加载并执行模块文件，
- ES6 Module 导入模块在严格模式下。
- ES6 Module 的特性可以很容易实现 Tree Shaking 和 Code Splitting。

