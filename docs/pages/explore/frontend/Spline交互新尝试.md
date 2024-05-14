# Spline交互新尝试

在了解 `Spline` 这个产品之前, 我对于页面动画的实现认知只有下面三种:

1. 视觉提供gif图/视频
2. 前端使用css实现简单的旋转动画等
3. 复杂专业一些的使用canvas实现



这三种实现方式都有一定的局限性, 如

1. 依赖于视觉进度, 以及需要一直对接确保效果, 还需要考虑页面性能和适配
2. 实现的效果比较简单
3. 耗费精力, 成本高, 需要自己想动画线条的实现



而最近在和设计师一起做需求的时候发现了第四种选择: `Spline` , 本文也是对这种方案的简单介绍.



## 1. 实现效果

<SplineDemo />

<script setup>
import SplineDemo from './components/spline.vue'
</script>



## 2. 前端接入

接入大体原理/流程(未包括具体调参等):

1. 前端和设计师确定动画尺寸
2. 设计师使用该平台开发动画, 设定尺寸(可以先不用设计内容), 随后生成导入链接(当然也可以生成静态文件等)
   1. <img src="https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20240514103534520.png" alt="image-20240514103534520" style="zoom:30%;" />

3. 原生dom接入:

```javascript
// yarn add @splinetool/runtime
import { Application } from '@splinetool/runtime';

const canvas = document.getElementsByClassName('wrapper-spline-demo')[0];
const app = new Application(canvas);
app.load('https://prod.spline.design/AwfEL3ZEffCfSTbL/scene.splinecode');
```

4. 设计师完善设计内容, 增加交互, 如click/mouse move触发动画效果, 重复第二步的更新操作, 前端动画页面会实时生效



从上面的流程可以看到, 这一方法的好处有:

1. 将前端开发和设计师的工作耦合进行了拆分, 两者不用相互依赖;
2. 设计师有任何修改只需要修改`Spline` 文件即可, 前端不需要做额外的支持;
3. 使用该种方法设计师可以自由设计鼠标事件等, 减少传统设计互相沟通调整的问题
4. 充分发挥了设计师的专业能力, 对前端开发的技能要求也有所降低

当然, 其局限性也是存在的:

1. 该种实现方式依赖于产品能力, 如果该产品下线或出现问题(如商用必须要付费), 链接失效, 页面的动画也就会随之失效
2. 设计师需要了解/学习一个新的平台
3. 该种方法适合场景可能不是很多
   1. 目前个人感觉其对无js交互的场景增效会比较明显, 这种场景只是一个动效, 设计师和前端无耦合, 同时即使链接失效, 前端可以使用静态文件作为保底
   2. 如果是存在js交互的场景, 如抽奖, 前端依然要和设计师一起沟通动画结束后页面的js动效, 增效可能没那么明显, 同时链接失效时也不好做保底方案



## 3. 其他

目前在官网看是可以免费使用的, 没找到禁止商用的标记

<img src="https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20240514104122134.png" alt="image-20240514104122134" style="zoom:50%;" />