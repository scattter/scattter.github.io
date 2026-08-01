<template>
  <div class="home">
    <div class="cards code">
      <cardWrapper class="home-card" :data="context['recentProject']">
        <template v-slot:contextSlot>
          <div class="recent-project">
            <div v-for="project in projects" :key="project.name" class="project">
              <div class="project-title">
                <span class="project-name">{{ project.name }}</span>
                <div class="project-language">
                  <div class="language-tag" :class="project.language.toLowerCase()"></div>
                  {{ project.language }}
                </div>
              </div>
              <p class="project-desc">{{ project.desc }}</p>
              <p class="project-why"><span class="why-label">初衷：</span>{{ project.why }}</p>
            </div>
          </div>
        </template>
      </cardWrapper>
    </div>
    <div class="cards intro">
      <cardWrapper class="home-card about-me" :data="context['aboutMe']">
        <template v-slot:contextSlot>
          <div class="about-context">
            <img class="about-img" src="/logo.jpeg" alt="" />
            <div class="about-text">
              <span class="about-intro">
                前端开发者, 主要关注 Vue、TypeScript、工程化和性能优化, 也会把工作里遇到的埋点、部署、资源治理、浏览器通信等问题沉淀成文章.
              </span>
              <div class="about-intro-more">
                Github 上会做一些小工具和实验项目, 比如个人站点、前端 utils、Vue/React 模板、ONVIF 工具、基金工具、AI 爬虫和组件库模板. 平时也会折腾家用网络、软硬件产品、AI 应用和自动化脚本, 更偏向把想法做成可以运行的东西.
              </div>
            </div>
          </div>
        </template>
      </cardWrapper>
      <cardWrapper class="home-card" :data="context['recentWork']">
        <template v-slot:contextSlot>
          <div class="recent-work">
            <div class="recent-work-empty" v-if="articles.length === 0">
              暂无数据
            </div>
            <ul class="recent-work-list">
              <li v-for="article in articles" :key="article.createTime" class="recent-work-item">
                <a v-tooltip="article.name" class="recent-work-msg" :href="article.link" target="_blank" rel="noopener">
                  ⏺ {{ article.name }}
                </a>
                <div class="recent-work-date">{{ format(article.createTime, 'zh_CN') }}</div>
              </li>
            </ul>
          </div>
        </template>
      </cardWrapper>
    </div>
  </div>
</template>
<script setup>
import cardWrapper from './cardWrapper.vue'
import { tooltip } from "@/pages/js/vue/directives/tooltip/tooltip";
import articles from '@/public/asserts/articles.json';
import { format } from "timeago.js";

const vTooltip = tooltip

const projects = [
  {
    name: '随礼册',
    language: 'TypeScript',
    desc: '记录人情往来的微信小程序：随礼、收礼都能随手记，婚礼、满月、乔迁等宴席支持按礼单集中管理',
    why: '每次随礼都不知道记哪里，靠记忆和翻聊天记录，时间一长就乱。想做一个打开就能记一笔的地方，送出去的、收回来的都有据可查',
  },
  {
    name: 'LCD-1.47',
    language: 'Cpp',
    desc: '基于 ESP32-S3 + 1.47 寸屏幕的桌面控制台：显示电脑状态，三个实体按键通过 BLE 控制 Mac 的音量、快捷键、启动 App 和脚本',
    why: '想给电脑加一块带实体按键和小屏幕的控制台，软硬件都自己动手，把想法做成能跑的东西',
  },
  {
    name: 'FundDig',
    language: 'TypeScript',
    desc: '基金计划与组合回测工具，管理持仓与加减仓记录，按比例构建组合回测',
    why: '用纪律管理投资，让每一次买卖都有记录可查',
  },
  {
    name: 'EasyOnvif',
    language: 'TypeScript',
    desc: '家庭摄像头管理系统，部署在 NAS 上，支持实时预览、云台控制、事件录制与回放',
    why: '摆脱云平台限制，自己掌控家庭监控的存储与查看',
  },
  {
    name: 'scattter.github.io',
    language: 'Vue',
    desc: '基于 VitePress 的个人博客，记录前端学习、工程化与性能优化实践',
    why: '把学习和踩坑过程沉淀成文档，同时作为个人作品展示窗口',
  },
  {
    name: 'common-utils',
    language: 'JavaScript',
    desc: '前端工具与学习实验合集：手写 JS 工具函数、Vue 指令、设计模式，以及云盘下载、语音识别等小实验',
    why: '工作中的常用代码与笔记统一沉淀，避免重复造轮子',
  },
]

const context = {
  'aboutMe': {
    title: '关于我',
    subTitle: 'about',
  },
  'recentWork': {
    title: '本站文章',
    subTitle: `total ${articles.length} articles`,
    titleLink: articles[0]?.link,
  },
  'recentProject': {
    title: '我的项目',
    subTitle: `${projects.length} projects`,
  }
}
</script>
<style lang="scss" scoped>
@import "docs/.vitepress/theme/scss/mixin.scss";
@import "docs/.vitepress/theme/scss/variables.scss";

.home {
  padding: 5px 10px;
  .about-me,
  .about-text,
  .recent-work,
  .recent-project {
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
  .cards {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    margin: 0 -10px;
    @media screen and (max-width: 600px) {
      flex-direction: column;
      .home-card {
        width: auto;
      }
    }
    @media screen and (min-width: 600px) {
      flex-direction: row;
      .about-me {
        width: 40%;
        overflow-y: auto;
      }
    }
    .home-card {
      height: auto;
    }

    &.intro {
      --intro-height: 320px;

      @media screen and (max-width: 800px) {
        --intro-height: 400px;
      }

      .home-card {
        flex: 1 1 0;
        min-width: 0;
      }

      @media screen and (min-width: 600px) {
        .about-me {
          flex: 0 1 28%;
          width: auto;
          overflow: hidden;
        }
      }

      :deep(.wrapper-context) {
        flex: 1;
        min-height: 0;
      }

      .about-context,
      .recent-work {
        height: var(--intro-height);
        max-height: var(--intro-height);
      }
    }

    .about-context {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
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
      .about-text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        margin-top: 20px;
        //max-height: 150px;
        overflow-y: auto;
      }
      .about-intro-more {
        margin-top: 2px;
        font-size: 14px;
        color: var(--vp-c-text-4);
      }
    }

    .recent-work {
      width: 100%;
      max-height: 320px;
      //padding-left: 4px;
      //margin-left: 20px;
      padding-right: 15px;
      overflow-y: auto;
      .recent-work-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .recent-work-empty {
        margin-top: 50%;
        text-align: center;
        font-size: 32px;
        line-height: 32px;
        color: var(--vp-c-text-4);
      }
      .recent-work-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 30px;
        margin: 10px 0 10px 6px;
        .recent-work-msg {
          @include multiLineOverflow;
          flex: 1;
          height: 30px;
          line-height: 30px;
          margin-right: 10px;
          color: inherit;
          &:hover {
            @include commonHover;
          }
        }
        .recent-work-date {
          width: auto;
          color: var(--vp-c-text-2);
          padding: 2px 4px;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
      }
    }

    .recent-project {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
      grid-auto-rows: 180px;
      gap: 12px;
      width: 100%;
      max-height: 380px;
      overflow-y: auto;
      .project {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 12px 14px;
        border: 1px solid var(--vp-c-bg-mute);
        border-radius: 8px;
        .project-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .project-name {
            font-weight: 600;
          }
        }
        .project-desc,
        .project-why {
          height: 42px;
          margin: 6px 0;
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          &::-webkit-scrollbar {
            width: 0;
          }
        }
        .project-desc {
          font-size: 14px;
          color: var(--vp-c-text-2);
        }
        .project-why {
          font-size: 12px;
          color: var(--vp-c-text-3);
          .why-label {
            font-weight: 600;
          }
        }
        .project-language {
          display: flex;
          align-items: center;
          font-size: 12px;
          color: var(--vp-c-text-2);
          .language-tag {
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 5px;
            border-radius: 50%;
            background-color: var(--vp-c-text-4);
          }
          .language-tag.vue {
            background-color: $vueTag;
          }
          .language-tag.javascript {
            background-color: $jsTag;
          }
          .language-tag.typescript {
            background-color: $tsTag;
          }
          .language-tag.cpp {
            background-color: #f34b7d;
          }
        }
      }
    }
  }
}
</style>
