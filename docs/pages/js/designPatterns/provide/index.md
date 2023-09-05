# 广播模式

> Provide design暂时想不到更好的命名方法, 就先使用广播模式吧[捂脸]
>
> 参考文章: https://www.patterns.dev/posts/provider-pattern/

这个模式在常见的框架`React`, `Vue` 中经常起很大的作用, 这一节也主要是基于这两个框架的实现来展开.

由于我自己目前深度不够, 还没琢磨透这两个框架, 所以这里也是浅浅记录下.



## 1. 应用场景

在我们日常的开发中, 经常出现父子组件传值的问题, 这时候我们可以使用`props` 来进行信息传递, 但是如果子组件的子组件, 也就是孙组件也想要使用父组件的值怎么办? 如果只有三个层级, 可能使用`props` 也是可以接受的, 但是如果层级很深, 那无疑就不适用了. 一层一层的`props` 传递会是一个很耗费精力, 同时在父组件有修改时, 很容易出现修改不全出现bug的事情. 所以`provide` 模式应运而生, 其**在很多不同层级中的组件可以轻松访问同样的一些数据**, 比较突出的为: **孙子组件获取父组件中相应的数据**.



在`vue` 中, 表现形式是`provide` 和`inject` API, 前者负责提供数据的定义, 后者负责在具体的深层级组件中进行注入使用; 在`react` 中的表现形式则是`createContext` 和 `useContext` API, 同样是前者定义数据, 后者获取数据.



这种模式虽然很好用, 但是也不能滥用, 否则的话会导致组件挂在数据过多, 如果有重名的`provide` 还可能会出现一些未知的bug(`react` 的文档中说其会**使得组件的复用性变差**). 我个人理解这种模式更适合用于大型业务组件中, 比如我现在开发的项目有工作项详情页面, 一些逻辑在下面引用中大致说下.

> 工作项详情页面为C1组件; 然后详情页面分为标题, 描述, 文件上传区, 评论日志区, 侧边属性区, 这些可以称为C组件; 然后中评论日志区又有具体的评论组件C3, 日志组件C3;  评论组件有新增和回复组件C4. 
>
> 即组件结构为C1 -> C2 -> C3 -> C4
>
> 数据的获取是在C1组件中, 如工作项id等, 同时C4组件会用到工作项id, 所以使用provide进行参数传递无疑是更好的选择.(全局状态管理有些太大了, 不适用)

![image-20230227225720754](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20230227225720754.png)



## 2. Vue中的实现

> https://vuejs.org/guide/components/provide-inject.html
>
> https://juejin.cn/post/7064904368730374180

vue中的实现比较容易看懂, 写起来也比较简单.

### 2.1 demo

```vue
// vue2
export default {
	// ...
	// use function syntax so that we can access `this`
	provide() {
		return {
      staticId: this.staticId,						// 静态传递
      dynamatic: () => this.dynamaticId,	// 动态传递(这里vue2不用包裹computed就可实现, 官网上说vue3.3以后也默认不需要)
    }
	},
}
export default {
	// ...
	inject: ['staticId', 'dynamatic'],
	mounted() {
		console.log(this.staticId)		// 静态数据
		console.log(this.dynamatic()) // 动态数据
	},
}
```



```vue
// vue3
<script setup>
import { ref, provide } from 'vue'

const count = ref(0)
provide('key', count)
</script>
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```



```vue
// vue3响应式
<!-- inside provider component -->
<script setup>
import { provide, ref } from 'vue'

const location = ref('North Pole')

// define update function
function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation
})
</script>

<!-- in injector component -->
<script setup>
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>

// vue3 只能在provide组件中修改
<script setup>
import { ref, provide, readonly } from 'vue'

const count = ref(0)
provide('read-only-count', readonly(count))
</script>

```



### 2.2 实现原理

下面主要是根据上面掘金文章进行的一个总结.

`vue3` 中的主要实现是基于原型链实现的, 可以理解为当父组件提供了`provide` 数据, 那么该对象会在实例上的`provide` 属性上进行赋值. 如果该元素有子组件, 那么在子组件里面会调用相应的方法去继承父组件上的`provide` 数据, 同时挂载其本身的`provide` 数据(如果有), 同理后续组件依次进行继承和挂载`provide`数据.

通过这一系列操作后, 后续需要使用该数据的组件就可以基于原型链依次向上查找,通过`inject` API获取对应数据.

两者的源码地址都在packages/runtime-core/src/apiInject.ts文件中.

```typescript
export function provide<T>(key: InjectionKey<T> | string | number, value: T) {
  if (!currentInstance) {
    if (__DEV__) {
      warn(`provide() can only be used inside setup().`)
    }
  } else {
    let provides = currentInstance.provides
    // by default an instance inherits its parent's provides object
    // but when it needs to provide values of its own, it creates its
    // own provides object using parent provides object as prototype.
    // this way in `inject` we can simply look up injections from direct
    // parent and let the prototype chain do the work.
    const parentProvides =
      currentInstance.parent && currentInstance.parent.provides
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides)
    }
    // TS doesn't allow symbol as index type
    provides[key as string] = value
  }
}

export function inject<T>(key: InjectionKey<T> | string): T | undefined
export function inject<T>(
  key: InjectionKey<T> | string,
  defaultValue: T,
  treatDefaultAsFactory?: false
): T
export function inject<T>(
  key: InjectionKey<T> | string,
  defaultValue: T | (() => T),
  treatDefaultAsFactory: true
): T
export function inject(
  key: InjectionKey<any> | string,
  defaultValue?: unknown,
  treatDefaultAsFactory = false
) {
  // fallback to `currentRenderingInstance` so that this can be called in
  // a functional component
  const instance = currentInstance || currentRenderingInstance
  if (instance) {
    // #2400
    // to support `app.use` plugins,
    // fallback to appContext's `provides` if the instance is at root
    const provides =
      instance.parent == null
        ? instance.vnode.appContext && instance.vnode.appContext.provides
        : instance.parent.provides

    if (provides && (key as string | symbol) in provides) {
      // TS doesn't allow symbol as index type
      return provides[key as string]
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue)
        ? defaultValue.call(instance.proxy)
        : defaultValue
    } else if (__DEV__) {
      warn(`injection "${String(key)}" not found.`)
    }
  } else if (__DEV__) {
    warn(`inject() can only be used inside setup() or functional components.`)
  }
}
```



### 2.3 两个API的渲染时机

vue2中注入inject是执行`data` 前, 这是为了可以在`data` 里可以访问; 提供数据`provide` 是在`data`, `computed`, `watch` 之后, 这是为了可以使用其中的一些数据.

![image-20230228000752389](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20230228000752389.png)



在vue3这里的处理时机/顺序我找了好久, 包括搜索和询问组内大佬, 发现vue3应该是不存在这个渲染时机/变量覆盖问题的, 因为`setup` 中变量的名字都是唯一的, 所以不存在优先级问题.

下面是初始化时`setup`的调用地址, 以及合并options的地方.

`setup`的调用

![image-20230228214848078](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20230228214848078.png)

合并options

![image-20230228215151233](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20230228215151233.png)





## 3. React中的实现

> https://zh-hans.reactjs.org/docs/context.html

在react的官方文档`Context` 章节中, 不是完全推荐使用这种模式进行开发的. 其中提到了`组件组合` 的解决方案, 这种解决方案相当于把组件当做`props` 进行传递, 使用到了`React` 中的`props.children`, 这和vue的`slot` 概念很像, 但是这种解决方案也是需要依次传递的. 

所以综上所述, 在具体的开发中是使用`provide` 还是 `props.children`, 亦或是`Redux` 这种全局管理插件, 需要按需分析.



### 3.1 demo

- 标准写法

父组件中提供数据

```
// parent.tsx
const MyContext = React.createContext(defaultValue);

// 一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。
<MyContext.Provider value={/* 某个值(如MyContext) */}>
```

class类型的子组件获取数据

```
// children.tsx
// Class.contextType
// 可以使用 this.context 来获取最近 Context 上的值
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* 基于 MyContext 组件的值进行渲染 */
  }
}
MyClass.contextType = MyContext;

// 实验性的 public class fields 语法
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* 基于这个值进行渲染工作 */
  }
}
```

function类型的子组件获取数据

```
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```



- 使用`Hook` 钩子的写法

```
// parent.tsx
export const ThemeContext = React.createContext();

// children.tsx
import React, { useContext } from "react";
import { ThemeContext } from "./App";

export function children() {
	const theme = useContext(ThemeContext);
}
```

这种写法省去了标签, 但是每次到了新的页面都需要导入`ThemeContext` , 所以这里可以再提取一个自定义的`Hook` 出来, 具体如下

```
function useThemeContext() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return theme;
}
```

在这个自定义的`Hook` 里面导入`ThemeContext`, 然后其他页面统一导入该`Hook` 进行数据读取, 少了`import { ThemeContext } from "./App"` 的步骤, 也将业务和数据获取做了拆分.



在组件中更新`Context`

**theme-context.js**

```
// 确保传递给 createContext 的默认值数据结构是调用的组件（consumers）所能匹配的！
export const ThemeContext = React.createContext({
  theme: themes.dark,  toggleTheme: () => {},}
);
```

**theme-toggler-button.js**

```
import {ThemeContext} from './theme-context';

function ThemeTogglerButton() {
  // Theme Toggler 按钮不仅仅只获取 theme 值，
  // 它也从 context 中获取到一个 toggleTheme 函数
  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (
        <button
          onClick={toggleTheme}
          style={{backgroundColor: theme.background}}>
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemeTogglerButton;
```

**app.js**

```
// 定义初始状态和更新函数
import {ThemeContext, themes} from './theme-context';
import ThemeTogglerButton from './theme-toggler-button';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };

    // State 也包含了更新函数，因此它会被传递进 context provider。
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    // 整个 state 都被传递进 provider
    return (
      <ThemeContext.Provider value={this.state}>
        <Content />
      </ThemeContext.Provider>
    );
  }
}

function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(<App />);
```



### 3.2 实现原理

> https://juejin.cn/post/7157935408498606094

createContext` 的内部实现如下(主要是依据上面的链接总结下)

```
// createContext 可以让我们实现状态管理
// 还能够解决传递 Props drilling 的问题
// 假如一个子组件需要父组件的一个属性，但是中间间隔了好几层，这就会出现开发和维护的一个成本。这时候就可以通过这个 API 来解决
function createContext(defaultValue, calculateChangedBits) {
  var context = {
    ?typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    // As a workaround to support multiple concurrent renderers, we categorize
    // some renderers as primary and others as secondary. We only expect
    // there to be two concurrent renderers at most: React Native (primary) and
    // Fabric (secondary); React DOM (primary) and React ART (secondary).
    // Secondary renderers store their context values on separate fields.
    // 以下两个属性是为了适配多平台
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    // Used to track how many concurrent renderers this context currently
    // supports within in a single renderer. Such as parallel server rendering.
    _threadCount: 0,
    // These are circular
    Provider: null,
    Consumer: null
  };

  // 以下的代码很简单，就是在 context 上挂载 Provider 和 Consumer，让外部去使用
  context.Provider = {
    ?typeof: REACT_PROVIDER_TYPE,
    _context: context
  };

  var Consumer = {
    ?typeof: REACT_CONTEXT_TYPE,
    _context: context,
    _calculateChangedBits: context._calculateChangedBits
  };

  context.Consumer = Consumer;
  context._currentRenderer = null;
  context._currentRenderer2 = null;
  return context;
}
```

其他更多的后面看完再更新, 它的源码我还没开始看过.





## 4. 其他

最近越来越有一种感觉, vue和react就像是自动挡的车和手动挡的车.

 vue是开箱即用, 什么都给你配置优化好, 不用管什么几档几档, react就是需要自己去挂离合换挡, 可操纵性高. 虽然手动档的react省油(性能高), 但是自动挡的vue省心啊(优化负担小, 比较现在生活水平上来了). vue写起来, 包括看文档还是比较轻松一些的.
