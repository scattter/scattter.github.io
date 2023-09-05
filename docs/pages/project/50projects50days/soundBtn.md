# Sound Board

## 1. 实现效果
<SoundBoard />

## 2. 具体实现
我感觉这个demo更多的是扩展开发对音频播放的了解, 因为在做这个demo之前, 我自己是没有接触过`audio` 这个组件的, 更不用说音频的播放和暂停了, 所以这里更新了自己的知识范围, 代码比较简单.

html代码

```html

<audio class="tada" src="viewComponent/SoundBtn/tada.mp3"></audio>
<audio class="wrong" src="viewComponent/SoundBtn/wrong.mp3"></audio>
<button class="btn btn1" value="tada">click me listen tada music</button>
<button class="btn btn2" value="wrong">click me listen wrong music</button>
```
在上面代码中src里面的就是源音频文件, 两个按钮用来触发音频的播放

js代码
```javascript
let curSound;
const btns = document.querySelectorAll('.btn')

btns.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    if (curSound) {
      curSound.pause()
      curSound.currentTime = 0
    }
    curSound = document.querySelector(`.${event.target.value}`)
    curSound.play()
  })
})
```
在上面的代码中, 使用一个全局变量来控制当前播放哪个音乐, 以及暂停重播等.

<script setup>
import SoundBoard from './viewComponent/SoundBtn/SoundBtn.vue'
</script>
