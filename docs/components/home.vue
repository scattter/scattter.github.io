<template>
  <div class="home">
    <div class="banner">WELCOME</div>
    <mapContainer />
    <div class="cards intro">
      <cardWrapper class="home-card" :data="context['aboutMe']">
        <template v-slot:contextSlot>
          <div class="about-context">
            <img class="about-img" src="../public/logo.jpeg" alt="" />
            <span class="about-intro">
              A Boy, 前端开发工程师, 工作经验2年+, 技术栈主要为vue2, 在用vue3实现自己构想的项目<strong>《soft work》</strong>,
              目前主要在学Typescript, 对Koa, docker, 自动部署, 项目工程化等都有相应实践;
              同时我也在关注Solidity, Rust等各种新奇技术, 有任何文档我会及时更新到本站.
            </span>
            <div class="about-intro-more">本站内容为自己学习过程中文档的记录!</div>
          </div>
        </template>
      </cardWrapper>
      <cardWrapper class="home-card" :data="context['recentWork']">
        <template v-slot:contextSlot>
          <li v-for="commit in state.curSiteCommits" :key="commit.sha">
            {{ commit.message }}
          </li>
        </template>
      </cardWrapper>
    </div>
    <div class="cards code">
      <cardWrapper class="home-card" :data="context['recentProject']">
        <template v-slot:contextSlot>
          <div class="recent-project">
            <div v-for="repo in repos" :key="repo" class="project">
              <strong class="recent-project-title">
                <a :href="'https://github.com/scattter/' + repo" target="_blank">{{ repo }}</a>
              </strong>
              <p class="project-desc">{{ state.reposInfo[repo]?.description }}</p>
              <div class="project-language">
                <div class="language-tag" />
                {{ state.reposInfo[repo]?.language || 'Nothing' }}
              </div>
            </div>
          </div>
        </template>
        <template v-slot:extendTitleSlot>
          <a class="recent-project-more" href="https://github.com/scattter" target="_blank">查看更多</a>
        </template>
      </cardWrapper>
      <cardWrapper class="home-card" :data="context['recentUpdate']">
        <template v-slot:contextSlot>
          <div class="recent-update">
            <li v-for="commit in state.recentCommits" :key="commit.sha">
              <strong>Repo: {{ commit.repoName }}</strong>
              <p class="commit-message">{{ commit.message }}</p>
              <p class="commit-date">{{ commit.committer.date }}</p>
            </li>
          </div>
        </template>
      </cardWrapper>
      <cardWrapper v-if="false" class="home-card" :data="context['recentCommit']">
        <template v-slot:contextSlot>
          <div class="recent-commit">
            <li v-for="commit in state.recentCommits" :key="commit.sha" class="commits">
              <strong>Repo: {{ commit.repoName }}</strong>
              <p class="commit-message">{{ commit.message }}</p>
              <p class="commit-date">{{ commit.committer.date }}</p>
            </li>
          </div>
        </template>
      </cardWrapper>
    </div>
  </div>
</template>
<script setup>
import cardWrapper from './cardWrapper.vue'
import mapContainer from './amap/mapContainer.vue'
import { getAllCommitsByMultiRepo, getRepoInfo } from '../api/github.ts'
import { onMounted, reactive } from 'vue'
import _ from 'lodash'

const state = reactive({
  recentCommits: [],
  curSiteCommits: [],
  reposInfo: {}
})

const context = {
  'aboutMe': {
    title: '关于我',
    subTitle: 'about',
  },
  'recentWork': {
    title: '本站更新',
    subTitle: 'work',
  },
  'recentUpdate': {
    title: '所有更新',
    subTitle: 'last 30 commits'
  },
  'recentProject': {
    title: '最近项目',
    subTitle: '4 projects',
  },
  'recentCommit': {
    title: 'Github提交',
    subTitle: 'last 30 commits'
  }
}
const repos = ['common-utils', 'soft-work-frontend', 'soft-work-backend', 'scattter.github.io']

onMounted(() => {
  // 各个仓库最近10条commit
  getAllCommitsByMultiRepo(repos).then(res => {
    // 根据提交时间倒序排列
    state.recentCommits = _.orderBy(res, 'committer.date', 'desc')
    state.curSiteCommits = res.filter(commit => commit.repoName === 'scattter.github.io').slice(0, 5)
  })
  getRepoInfo(repos).then(res => {
    // 根据提交时间倒序排列
    state.reposInfo = res
  })
})
</script>
<style lang="scss" scoped>
@import "docs/.vitepress/theme/scss/mixin.scss";

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
    @media screen and (max-width: 400px) {
      flex-direction: column;
      .home-card {
        width: auto;
      }
    }
    @media screen and (min-width: 400px) {
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

    .recent-project {
      display: flex;
      justify-content: space-between;
      align-content: space-between;
      flex-wrap: wrap;
      @media screen and (min-width: 300px) {
        height: 300px;
      }
      @media screen and (max-width: 300px) {
        height: 100%;
      }
      .project {
        //width: 48%;
        //height: 45%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        border-radius: 8px;
        padding: 4px 8px;
        border: 2px solid var(--vp-c-text-4);
        @media screen and (min-width: 800px) {
          width: 48%;
          height: 45%;
        }
        @media screen and (max-width: 800px) {
          width: 100%;
          height: 20%;
        }
        .project-language {
          display: flex;
          align-items: center;
          color: var(--vp-c-text-2);
          .language-tag {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 5px;
            border-radius: 50%;
            background-color: #f1e05a;
          }
        }
      }
      .recent-project-title {
        &:hover {
          @include commonHover;
          border-bottom: 1px solid $hoverColor;
        }
      }
    }

    .recent-project-more {
      color: var(--vp-c-text-4);
      &:hover {
        @include commonHover;
      }
    }

    .recent-update {
      max-height: 300px;
      overflow-y: auto;
      .commits {
        margin-bottom: 8px;
      }
      p {
        margin-left: 22px;
      }
      .commit-date {
        font-size: 12px;
        color: var(--vp-c-text-2);
      }
    }
  }
}
</style>