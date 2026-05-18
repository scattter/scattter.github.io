<template>
  <div class="home">
    <div class="banner">WELCOME</div>
    <mapContainer />
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
          <div class="recent-work-wrapper">
<!--            <Calendar @handlePrevMonth="handleChangeMonth" @handleNextMonth="handleChangeMonth">-->
<!--              <template v-slot:day="{ data }">-->
<!--                <div-->
<!--                    v-if="isNeedRenderDay(data)"-->
<!--                    v-tooltip.force="findCurDayCommit(data)"-->
<!--                    class="has-commit"-->
<!--                >-->
<!--                  <span class="commit-day" :class="{ today: isToday(data, 1) }">-->
<!--                    {{ data.day }}-->
<!--                  </span>-->
<!--                </div>-->
<!--                <span v-else :class="{ today: isToday(data, 1) }">{{ data.day }}</span>-->
<!--              </template>-->
<!--            </Calendar>-->
            <div class="recent-work">
              <div class="recent-work-empty" v-if="state.articles && state.articles.length === 0">
                暂无数据
              </div>
              <li v-for="article in state.articles" :key="article.createTime" class="recent-work-item">
                <a v-tooltip="article.name" class="recent-work-msg" :href="article.link" target="_blank" rel="noopener">
                  ⏺ {{ article.name }}
                </a>
                <div class="recent-work-date">{{ format(article.createTime, 'zh_CN') }}</div>
              </li>
            </div>
          </div>
        </template>
      </cardWrapper>
      <cardWrapper class="home-card" :data="context['recentUpdate']">
        <template v-slot:contextSlot>
          <div class="recent-update">
            <li v-for="commit in state.recentCommits" :key="commit.sha" class="recent-update-item">
              <a class="recent-work-item-wrapper" :href="commit.html_url" target="_blank" rel="noopener">
                <strong>⏺ Repo: {{ commit.repoName }}</strong>
                <div class="recent-work-msg" v-tooltip="commit.message">{{ commit.message }}</div>
                <div class="commit-date">{{ commit.committer.date }}</div>
              </a>
              <div class="recent-work-date">{{ format(commit.committer.date, 'zh_CN') }}</div>
            </li>
          </div>
        </template>
      </cardWrapper>
    </div>
    <div class="cards code">
      <cardWrapper v-if="false" class="home-card" :data="context['recentProject']">
        <template v-slot:contextSlot>
          <div class="recent-project">
            <div v-for="repo in repos" :key="repo" class="project">
              <strong class="recent-project-title">
                <a :href="'https://github.com/scattter/' + repo" target="_blank">{{ repo }}</a>
              </strong>
              <p class="project-desc">{{ state.reposInfo[repo]?.description }}</p>
              <div class="project-language">
                <div class="language-tag" :class="state.reposInfo[repo]?.language?.toString().toLowerCase()" />
                {{ state.reposInfo[repo]?.language || '' }}
              </div>
            </div>
          </div>
        </template>
        <template v-slot:extendTitleSlot>
          <a class="recent-project-more" href="https://github.com/scattter" target="_blank">查看更多</a>
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
<script lang="jsx" setup>
import { onMounted, reactive, defineComponent } from 'vue'
import dayjs from "dayjs"
import _ from 'lodash'

import Calendar from '@/pages/project/50projects50days/viewComponent/Calendar/index.vue'
import { isToday } from '@/utils/time'

import cardWrapper from './cardWrapper.vue'
import mapContainer from './amap/mapContainer.vue'
import { tooltip } from "@/pages/js/vue/directives/tooltip/tooltip";
import { getAllCommitsByMultiRepo, getRepoInfo } from '@/api/github';
import articles from '@/public/asserts/articles.json';
import { format } from "timeago.js";

const vTooltip = tooltip
const state = reactive({
  recentCommits: [],
  curSiteCommits: [],
  curSiteCommitDays: [],
  reposInfo: {},
  articles,
})

const MAX_PER_PAGE = 100
const context = {
  'aboutMe': {
    title: '关于我',
    subTitle: 'about',
  },
  'recentWork': {
    title: '本站文章',
    subTitle: `total ${state.articles.length} articles`,
    titleLink: state.articles[0]?.link,
  },
  'recentUpdate': {
    title: 'Github更新',
    subTitle: 'last 30 commits',
    titleLink: 'https://github.com/scattter',
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

const isNeedRenderDay = ({ year, month, day }) =>
    state.curSiteCommitDays.includes(dayjs(`${year}-${month + 1}-${day}`).format('YYYY-MM-DD'))

const findCurDayCommit = ({ year, month, day }) => {
  return state.curSiteCommits
      .filter(
          commit => {
            return dayjs(commit.committer.date).isSame(dayjs(`${year}-${month + 1}-${day}`), 'day')
          }
      ).length
}

const getCurSiteMonthCommits = (year, month) => {
  const initTimeFormat = `${year}-${month}-01`
  const since = dayjs(initTimeFormat).format('YYYY-MM-DDTHH:MM:SSZ')
  const util = dayjs(initTimeFormat).add(1, 'month').format('YYYY-MM-DDTHH:MM:SSZ')
  // 因为比较少见, 所以暂时未处理当月commit超过100条的情况, 此处可以使用递归处理
  getAllCommitsByMultiRepo(
      ['scattter.github.io'],
      {
        since,
        util,
        per_page: MAX_PER_PAGE,
      }
  ).then(res => {
    // 过滤满足条件的commits
    state.curSiteCommits = _.orderBy(res, 'committer.date', 'desc')
        .filter(commit => {
          return dayjs(commit.committer.date).isBefore(dayjs(initTimeFormat).add(1, 'month'), 'day')
        })
    state.curSiteCommitDays = state.curSiteCommits.map(commit => dayjs(commit.committer.date).format('YYYY-MM-DD'))
  })
}

const handleChangeMonth = (year, month) => {
  getCurSiteMonthCommits(year, month + 1)
}

onMounted(() => {
  // 查询当前站点当月commits
  const cur = dayjs()
  getCurSiteMonthCommits(cur.year(), cur.month() + 1)
  // 各个仓库最近10条commit
  getAllCommitsByMultiRepo(repos).then(res => {
    // 根据提交时间倒序排列
    state.recentCommits = _.orderBy(res, 'committer.date', 'desc')
  })
  getRepoInfo(repos).then(res => {
    // 根据提交时间倒序排列
    state.reposInfo = res
  })
})
</script>
<style lang="scss" scoped>
@import "docs/.vitepress/theme/scss/mixin.scss";
@import "docs/.vitepress/theme/scss/variables.scss";

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
      .recent-work-wrapper,
      .recent-work,
      .recent-update {
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

    .recent-work-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;

      @media screen and (max-width: 970px) {
        flex-direction: column;
        margin-left: 0;
      }

      :deep(.calendar-wrapper) {
        box-shadow: none;
        .v-tooltip {
          margin-bottom: 5px;
        }
      }
      .today {
        display: inline-block;
        width: 32px;
        font-weight: bolder;
        color: $white;
        border-radius: 50%;
        background-color: $linkColor;
      }
      .has-commit {
        .commit-day {
          display: inline-block;
          width: 32px;
          border: 1px solid $linkColor;
          border-radius: 50%;
        }
      }
    }

    .recent-work {
      width: 100%;
      max-height: 320px;
      //padding-left: 4px;
      //margin-left: 20px;
      padding-right: 15px;
      overflow-y: auto;
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
      display: flex;
      justify-content: space-between;
      align-content: space-between;
      flex-wrap: wrap;
      @media screen and (min-width: 800px) {
        height: 300px;
      }
      @media screen and (max-width: 800px) {
        height: 400px;
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
          }
          .language-tag.vue {
            background-color: $vueTag;
          }
          .language-tag.javascript {
            background-color: $jsTag;
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
      @media screen and (min-width: 800px) {
        max-height: 300px;
      }
      @media screen and (max-width: 800px) {
        max-height: 400px;
      }
      overflow-y: auto;
      .recent-update-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 80px;
        .recent-work-item-wrapper {
          min-width: 0;
          height: 80px;
          margin-right: 10px;
          flex: 1;
          color: inherit;
          &:hover {
            @include commonHover;
          }
          .recent-work-msg {
            @include multiLineOverflow;
          }
          div {
            margin-left: 20px;
          }
          .commit-date {
            font-size: 12px;
            color: var(--vp-c-text-2);
          }
        }
        .recent-work-date {
          flex-shrink: 0;
          width: auto;
          white-space: nowrap;
          color: var(--vp-c-text-2);
          padding: 2px 4px;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
      }

      @media screen and (max-width: 1100px) {
        .recent-update-item {
          flex-direction: column;
          align-items: flex-start;
          padding: 8px 0;
          .recent-work-item-wrapper {
            width: 100%;
            height: auto;
            margin-right: 0;
          }
          .recent-work-date {
            margin-top: 4px;
            margin-left: 20px;
          }
        }
      }
      .commits {
        margin-bottom: 8px;
      }
    }
  }
}

.dark .banner {
  border: 1px solid var(--vp-c-bg-mute);
  color: $white;
  background-color: $darkModeColor;
}
</style>
