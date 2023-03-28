# 混入模式

>https://vue3js.cn/interview/vue/mixin.html
>
>https://www.patterns.dev/posts/mixin-pattern
>
>https://juejin.cn/post/6984586793987342366



这个属于前端框架的一种特殊处理模式, 即在框架的组件中将公共方法/生命周期配置提取出来, 然后统一注入到具体组件中, 有利于代码复用又避免了多继承的复杂.

从模式的结果上来说, 我理解其和`装饰器模式` 有一些相似, 有点类似于基于`装饰器模式` 的扩展

- 装饰器模式更加通用一些, 混入模式掺杂了组件的生命周期和api; 
- 与`装饰器模式` 的装饰行为不一样的是, 混入模式还涉及到同名变量的合并问题(这个就是框架的设置)

`Vue` 中的官方定义为:

> `mixin`（混入），提供了一种非常灵活的方式，来分发 `Vue` 组件中的可复用功能。

本质其实就是一个`js`对象，它可以包含我们组件中任意功能选项，如`data`、`components`、`methods`、`created`、`computed`等等



## 1. 具体例子

在我现在开发的项目中有许多fu咋的功能实现, 比如属性更新.

在业务上, 每一个工作项都有许多属性, 比如创建人, 指派人, 状态, 工时, 标签等. 不同的属性有不同的类型, 如单选, 多选, 时间选择器. 

进行属性更新的时候可以对单个属性进行监听然后控制更新, 但是这样的话代码就会很麻烦, 所以可以进行`mixin` 的抽取, 使用全局的组件进行劫持, 统一控制更新, 这样代码也会更简洁. 如下图所示

![image-20230328222413786](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20230328222413786.png)



## 2. 使用方式

在`vue` 中混入包括`局部混入` 和 `全局混入` 两种, 上一部分展示的是局部混入的方式.

> 下面代码部分使用网上的代码进行展示

- 局部混入

定义一个`mixin`对象，有组件`options`的`data`、`methods`属性

```javascript
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}
```

组件通过`mixins`属性调用`mixin`对象

```javascript
Vue.component('componentA',{
  mixins: [myMixin]
})
```

该组件在使用的时候，混合了`mixin`里面的方法，在自动执行`created`生命钩子，执行`hello`方法

- 全局混入

通过`Vue.mixin()`进行全局的混入

```javascript
Vue.mixin({
  created: function () {
      console.log("全局混入")
    }
})
```

使用全局混入需要特别注意，因为它会影响到每一个组件实例（包括第三方组件）

PS：全局混入常用于插件的编写



## 3. Vue中mixin源码简单探索

在组件渲染过程中调用`mixins`

![image-20230328223250236](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20230328223250236.png)

进入此方法后, 可以看到具体的merge处理

![image-20230328223613927](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20230328223613927.png)

在上图可以看到, 函数首先去获取实例上的`mixins` 选项, 获取对应的配置, 如果`mixins` 有值, 且有多个的话, 那就依次进行配置的合并(1009行). 



具体的`mergeOptions` 的代码为:

```typescript
export function mergeOptions(
  to: any,
  from: any,
  strats: Record<string, OptionMergeFunction>,
  asMixin = false
) {
  if (__COMPAT__ && isFunction(from)) {
    from = from.options
  }

  const { mixins, extends: extendsOptions } = from

  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true)
  }
  if (mixins) {
    mixins.forEach((m: ComponentOptionsMixin) =>
      mergeOptions(to, m, strats, true)
    )
  }

  for (const key in from) {
    if (asMixin && key === 'expose') {
      __DEV__ &&
        warn(
          `"expose" option is ignored when declared in mixins or extends. ` +
            `It should only be declared in the base component itself.`
        )
    } else {
      const strat = internalOptionMergeStrats[key] || (strats && strats[key])
      to[key] = strat ? strat(to[key], from[key]) : from[key]
    }
  }
  return to
}

// 根据属性的不同进行相应的属性合并操作
export const internalOptionMergeStrats: Record<string, Function> = {
  data: mergeDataFn,
  props: mergeObjectOptions, // TODO
  emits: mergeObjectOptions, // TODO
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
}
```

其包括五种合并策略

- mergeDataFn
- mergeObjectOptions
- mergeWatchOptions
- mergeInject
- mergeAsArray

具体的实现也在上图所在的文件下面, 可以具体去查看, 这里就不再进行粘贴了.
