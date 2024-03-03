# JS内置深拷贝函数介绍

> 参考资料
>
> https://www.builder.io/blog/structured-clone
>
> https://developer.mozilla.org/en-US/docs/Web/API/structuredClone



## 背景

一直以来, 无论是工作还是前端面试, 对象的浅/深拷贝都是大家不可避免会遇到的一个知识点. 浅拷贝自然很简单, 简单的赋值即可; 而对于深拷贝来说, 在日常工作中, 大家可能会使用`loadsh` 的方法去实现具体功能, 面试中可能会手写递归去实现, 这两个实现方式虽然都很有效, 但是都有些繁琐, 不够简洁. 幸运的是在NODE 17+, 浏览器2022.3 + 的新版本中内置了一个原生的深拷贝API: `structuredClone` , 开发者可以直接调用该API进行深拷贝.



## 不同实现方式的比较

### 1. JSON.parse(JSON.stringify(Obj))

这种方式主要是

1. 首先使用 `JSON.stringify()` 方法将对象转换为 JSON 字符串。JSON.stringify() 方法会将对象的所有可枚举属性及其值递归地转换为 JSON 字符串(在转换的过程中会进行一些隐式转换, 这也是其中的一个陷阱)。
2. 将上述转换后的字符串使用`JSON.parse()` 方法将 JSON 字符串解析为对象。

对于大部分简单对象这种方法很奏效, 但是别忘了第一步序列化的时候会对一些类型进行隐式转换, 比如时间格式会直接转换为字符串, 具体如下:

```javascript
const calendarEvent = {
  title: "calendar",
  date: new Date(123),
  attendees: ["Steve"]
}

const problematicCopy = JSON.parse(JSON.stringify(calendarEvent))
console.log(problematicCopy)
```

期望的输出为

```javascript
{
  title: "calendar",
  date: new Date(123),
  attendees: ["Steve"]
}
```

实际的输出为

```
{
  title: "calendar",
  date: "1970-01-01T00:00:00.123Z"
  attendees: ["Steve"]
}
```

其他还有`Set` 格式的数据会被简单转换为`{}` 等, 因此其有很大局限性.

其无法深拷贝的主要类型如下:

- **无法复制不可枚举属性**：JSON.stringify() 方法只会将对象的**可枚举属性**转换为 JSON 字符串。因此，使用 JSON.parse(JSON.stringify(Obj)) 方法无法复制对象的不可枚举属性。
- **无法复制函数、Symbol 值和正则表达式**：JSON.stringify() 方法无法将函数、Symbol 值和正则表达式转换为 JSON 字符串。因此，使用 JSON.parse(JSON.stringify(Obj)) 方法无法复制对象的这些属性。
- **会改变日期对象的格式**：JSON.stringify() 方法会将日期对象转换为字符串格式。因此，使用 JSON.parse(JSON.stringify(Obj)) 方法会改变日期对象的格式。





### 2. 手写深拷贝

这种方式主要是开发自己手写一个深拷贝函数, 遍历深拷贝对象的属性, 然后根据不同的类型做针对性的处理, 其优点是:

- 方法的实现灵活全面, 可以自己决定怎么进行深拷贝
- 调用简单, 不用其他依赖

缺点是:

- 边缘情况可能考虑不全
- 增加工作量, 且每当有新项目可能都需要进行维护



### 3. _.deepClone

这种方式是直接调用`lodash` 库进行处理, 优点是

- `lodash` 官方为开发者考虑了各种边缘情况
- `lodash` 还有另一个类似的API `cloneDeepWith` , 支持开发者自定义深拷贝方式

缺点(用不完美来形容可能更好)则是:

- 需要依赖第三库, 项目要进行一些tree shaking防止引入额外资源造成打包体积过大



### 4. structuredClone

该方法是2022年后的新API, 使用起来也很简单, 直接调用即可, MDN上对其的介绍为:

> 全局的 **`structuredClone()`** 方法使用[结构化克隆算法](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)将给定的值进行[深拷贝](https://developer.mozilla.org/zh-CN/docs/Glossary/Deep_copy)。

其基础的使用如下:

```javascript
const calendarEvent = {
  title: "Builder.io Conf",
  date: new Date(123),
  attendees: ["Steve"]
}

// 😍
const copied = structuredClone(calendarEvent)

copied.attendees // ["Steve"]
copied.date // Date: Wed Dec 31 1969 16:00:00
cocalendarEvent.attendees === copied.attendees // false
```

除此之外, 该方法还支持第二个参数 `structuredClone(value, { transfer })`

第二个参数`transfer`是一个[可转移对象](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Transferable_objects)的数组，里面的 `值` 并没有被克隆，而是被转移到被拷贝对象上。MDN上的说明如下(这里涉及到知识盲区了, 就看了下没继续深究):

![image-20240303163539788](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20240303163539788.png)

那么该API是否有缺点呢? 答案是肯定的

1. 由于该API较新, 所以一些旧的浏览器(2022.3前)和`NODE 17-` 可能不会支持, 不过`core-js` 有对其的polyfill
   1. 虽然该API对于一些特殊类型(如Date)也能完美复制, 但是还是存在一些特殊类型不能完美深拷贝(当然 `loadsh` 也不支持), 具体如下
   2. 函数
   3. DOM 元素
   4. Symbol 值
   5. WeakMap 和 WeakSet
   6. 循环引用
   7. 原型链



## 总结

可以看到上面四种深拷贝的方式各有优劣, 具体为:

|                                   | 优势                                   | 劣势                                |
| --------------------------------- | -------------------------------------- | ----------------------------------- |
| `JSON.parse(JSON.stringify(Obj))` | 简单方便                               | 不支持的数据类型太多                |
| `手写深拷贝`                      | 实现灵活, 可控, 支持的类型可以做到最全 | 麻烦, 边缘情况可能考虑不充分        |
| `_.deepClone`                     | 靠谱, 省心, 边缘情况考虑充分           | 需要进行打包优化                    |
| `structuredClone`                 | 调用简单方便, 没有负担                 | API较新, 依然有一些不支持的特殊类型 |

综上所看, 工作中`_.deepClone`还是其中最靠谱/省心的方式, `structuredClone` 是一种新的API, 在深拷贝需求不复杂时可以尝试使用.

