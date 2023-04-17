# 骨架屏加载

## 1. 实现效果
<Placeholder />



## 2. 具体实现
实现的主要逻辑是在页面没有数据的时候元素上有动画类, 当有数据后移除掉元素上的动画类, 其中关键的就是动画类的内部实现.

这里主要是用到了css的一些样式动画, 有几个关键的属性

- background-image
- linear-gradient
- background-size
- background-position

```css
.demo {
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 10%,
    #f6f7f8 20%,
    #f6f7f8 100%
  );
  background-size: 200% 100%;
  animation: loading 1s linear infinite;
}
@keyframes loading {
  from {
    background-position: 50% 0;
  }
  to {
    background-position: -150% 0;
  }
}
```
`background-image` 主要是用来设置loading动画的背景, 这里用了`linear-gradient` 去实现一个渐变色的背景.

其中`to right` 指的是颜色渐变从左到右渐变, 上面的代码中, 元素的0% - 10% - 20% 之间为`#f6f7f8` 到`#edeef1`.

`background-size` 用来设置背景图的大小, 如果想要实现loading的动画效果, 那么需要有一个背景图的移动, 背景图放大后, 才能配合背景图的位置, 也就是`background-position` 来实现这个动画, 所以这里你完全可以把这个背景大小设为400%甚至更大(别忘了调整下其他参数, 否则动画就是闪烁的了).  

`background-position` 用来设置背景图的哪一部分用来作为背景, 上面例子中的两个参数表示: 一个定义 x 坐标，另一个定义 y 坐标. 那么这里为什么是50%和-150%呢? 记得上面我们设置了线性渐变的范围是0 - 20%, 同时我们还设置了200% 的背景大小, 把这个背景给拉宽了, 如果我们想要实现渐变色移动的效果, 那么肯定有一个渐变色从无到有的动画, 也就是position只要在大于`40%` 的时候才能隐藏初始渐变色, 如下所示, 在position为33%(这里和`33% 0` 的样式效果一样)的时候还是能看到渐变色. 所以这里只要你设置的初始position大于40%即可, 不一定是50%.

![image-20230403223647304](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20230403223647304.png)

至于后面的-150%, 因为我们一般加载的动画是从左到右的, 如果设置后面的position为正数, 那么就会出现渐变色向左移动的效果, 类似于拿一张纸从右向左移动(**纸相当于背景**).所以如果想要实现渐变色右移的动画, 也就是拿一张纸从左向右移动的效果, 那么就需要设置position为负值, 如下所示, 当设置为-93%还是能看到一些渐变色, 只有设置的值小于-100%的时候才能完全隐藏, 实现上面例子中的效果, 所以这里不一定非要是-150% , 小于-100%即可.

![image-20230403224630882](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20230403224630882.png)



## 3. 进阶

目前看这个加载的效果无疑是能够提高很多用户体验的, 所以如果能够中项目里面轻松集成就再好不过了.

我目前的想法是通过指令去进行项目的集成, 但是在这两天的实践过程中发现做到指令中很难和请求做到关联起来, 而关联不起来的话就不知道何时请求结束, 这就实现不了加载效果. 最容易的方法可能需要做一些入侵业务代码的逻辑, 但是回过来再想想, 如果真的要这么做还不如写一个组件去进行封装, 类似于`table` 的`loading` 配置.

后续有时间了解下其他骨架屏的框架实现, 有进展了就再持续更新尝试下.


**更新:** 
目前实现了简单的vue指令, 具体可以参考`Js -> 指令 -> placeholder` 章节


<script setup>
import Placeholder from './viewComponent/Placeholder/index.vue'
</script>