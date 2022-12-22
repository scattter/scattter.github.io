<template>
  <div class="home">
    <div class="banner">WELCOME</div>
    <div class="cards intro">
      <cardWrapper class="home-card" :data="context['aboutMe']">
        <template v-slot:contextSlot>
          <div class="about-context">
            <img class="about-img" src="../public/logo.jpeg" />
            <span class="about-intro">
              A Boy, 前端开发工程师, 工作经验2年+, 技术栈主要为vue2, 在用vue3实现自己构想的项目<strong>《soft work》</strong>,
              目前主要在学Typescript, 对Koa, docker, 自动部署, 项目工程化等都有相应实践;
              同时我也在关注Solidity, Rust等技术, 有任何文档我会及时更新到本站.
            </span>
            <div class="about-intro-more">本站内容为自己学习过程中文档的记录, 再次欢迎大家!</div>
          </div>
        </template>
      </cardWrapper>
      <cardWrapper class="home-card" :data="context['recentWork']">
        <template v-slot:contextSlot>
          <li>Typescript study</li>
          <li>50 days 50 projects</li>
          <li>soft work</li>
          <li>common utils repo</li>
          <li>solidity study (low-level)</li>
        </template>
      </cardWrapper>
      <cardWrapper class="home-card" :data="context['recentUpdate']">
        <template v-slot:contextSlot>
          <li>Typescript 最新学习章节</li>
          <li>实现简单的脚本记录生成项目</li>
          <li>服务器搭建和内网穿透实践</li>
          <li>实现More text tip animation样式</li>
        </template>
      </cardWrapper>
    </div>
    <div class="cards code">
      <cardWrapper class="home-card" :data="context['recentProject']">
        <template v-slot:contextSlot>
          待更新
        </template>
      </cardWrapper>
      <cardWrapper class="home-card" :data="context['recentCommit']">
        <template v-slot:contextSlot>
          待更新
        </template>
      </cardWrapper>
    </div>
  </div>
</template>
<script setup>
import cardWrapper from './cardWrapper.vue'

const context = {
  'aboutMe': {
    title: '关于我',
    subTitle: 'about',
  },
  'recentWork': {
    title: '最近在做',
    subTitle: 'work',
  },
  'recentUpdate': {
    title: '最近更新',
    subTitle: 'update'
  },
  'recentProject': {
    title: '最近项目',
    subTitle: 'projects',
  },
  'recentCommit': {
    title: 'Github提交',
    subTitle: 'commits'
  }
}
</script>
<style lang="scss" scoped>
.home {
  padding: 5px 10px;
  .banner {
    width: 100%;
    height: 100px;
    background-color: bisque;
    border-radius: 10px;
    text-align: center;
    line-height: 100px;
    color: brown;
    font-size: 30px;
    font-weight: bold;
    font-family: Menlo,serif;
  }
  .cards {
    display: flex;
    justify-content: space-between;
    margin: 0 -10px;
    @media  screen and (max-width: 400px) {
      flex-direction: column;
      .home-card {
        width: auto;
      }
    }
    @media  screen and (min-width: 400px) {
      flex-direction: row;
    }
    .home-card {
      height: auto;
    }
    .about-context {
      .about-img {
        float: left;
        // 设置该值可以让图片和右侧文字在同一水平线
        width: 114px;
        object-fit: cover;
        object-position: center;
        border-radius: 50%;
        margin-top: 2px;
        margin-right: 6px;
      }
      .about-intro-more {
        margin-top: 2px;
        font-size: 14px;
        color: var(--vp-c-text-4);
      }
    }
  }
}
</style>