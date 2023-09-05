# Kinetic loader

## 1. 实现效果
<KineticLoader />

## 2. 具体实现
在这个例子中, 虽然是基于css的动画实现的, 但里面还是有一些逻辑的, 如怎么设计动画可以正好实现这个慢半拍的效果, 怎么设计`html`标签.

### 2.1 html标签

在写标签的时候, 我一开始用的是简单的`div`元素然后进行分别添加样式, 但是这样无疑增加了无用的`html` 标签, 后面看了别人的实现, 才知道用伪元素才是更好的方案, 然后再对伪元素设置样式.
```vue
<template>
  <div class="view-demo-component">
    <div class="animation"></div>
  </div>
</template>
<style scoped>
.view-demo-component {
  display: flex;
  justify-content: center;
  align-items: center;
}
.animation {
  position: relative;
  width: 100px;
  height: 100px;
}
/* 设置伪元素样式 */
.animation::before,
.animation::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border: 50px solid transparent;
  border-bottom-color: #89DDFF;
}
.animation::before {
  transform: rotate(90deg);
}
</style>
```

### 2.2 css动画

在动画这里我一开始想的是两个伪元素使用同一个动画, 然后使用动画的`delay` 属性以及元素初始旋转角度来实现这个效果. 但是实践后发现使用同一个动画是不行的, 因为两个元素初始旋转角度是不同的, 用同一个动画就破坏了这个初始态.

此外, 在动画设计方面, 我一开始想的是如下代码
```css
@keyframes rotateB { 
    0% {
      transform: rotate(90deg);
    }

    25%,
    50% {
      transform: rotate(270deg);
    }

    75%,
    100% {
      transform: rotate(450deg);
    }
}
```
在`270deg` 的时候停顿一下, 然后在`90deg` 也就是初始位置的时候停顿一下, 但是这样的话另一个元素的动画就不好利用时间差了, 实现不了实例中的效果, 于是还是使用了别人的样式代码

```css
@keyframes rotateA {
    0%,
    25% {
        transform: rotate(0deg);
    }

    50%,
    75% {
        transform: rotate(180deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
@keyframes rotateB {
    0%,
    25% {
      transform: rotate(90deg);
    }
  
    50%,
    75% {
      transform: rotate(270deg);
    }
  
    100% {
      transform: rotate(450deg);
    }
  }
```
其中`rotateA` 和`rotateB` 是给两个不同伪元素before(A), after(B)使用的.

具体流程为:

- A元素的动画延迟0.5s, 在这一段时间内B元素动画到25%处, 依然是保持原状不变;

- 继续进行0.5s, 此时B元素动画到50%处, 旋转到270deg处, 同时A动画开始生效到25%, 保持旋转角度0deg不变;

- 继续进行0.5s, 此时B元素动画到75%处, 依然在270deg处, 同时A动画到50%, 旋转到180deg;

- 继续进行0.5s, 此时B元素动画到100%处, 旋转到450deg处, 也就是初始位置, 同时A动画到75%, 角度180deg不变;

- 继续进行0.5s, 此时B元素动画到50%处, 旋转到270deg处, 同时A动画到100%, 旋转到360deg, 也就是原位置;

- ...


此后两个伪元素就按照上面流程进行不断旋转, 两者其一回到原始状态时, 旋转角度的绝对差始终为90deg

<script setup>
import KineticLoader from './viewComponent/KineticLoader.vue'
</script>