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
                A Boy, 前端开发工程师, 工作经验2年+, 近期技术栈主要为vue, 也有react项目实战经验, 有用vue3实现自己构想的项目<strong>《soft work》</strong>.
              </span>
              <div class="about-intro-more">本站内容为自己学习过程中文档的记录!</div>
            </div>
          </div>
        </template>
      </cardWrapper>
      <cardWrapper class="home-card" :data="context['recentUpdate']">
        <template v-slot:contextSlot>
          <div class="recent-update">
            <li v-for="commit in state.recentCommits" :key="commit.sha" class="recent-update-item">
              <div class="recent-work-item-wrapper">
                <strong>⏺ Repo: {{ commit.repoName }}</strong>
                <div class="recent-work-msg" v-tooltip="commit.message">{{ commit.message }}</div>
                <div class="commit-date">{{ commit.committer.date }}</div>
              </div>
              <div class="recent-work-date">{{ calcTimeToDiffDayLabel(commit.committer.date) }}</div>
            </li>
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
                <div v-tooltip="article.name" class="recent-work-msg">⏺ {{ article.name }}</div>
                <div class="recent-work-date">{{ calcTimeToDiffDayLabel(article.createTime) }}</div>
              </li>
            </div>
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
import { calcTimeToDiffDayLabel } from '@/utils/time'
import { tooltip } from "@/pages/js/vue/directives/tooltip/tooltip";
import { getAllCommitsByMultiRepo, getRepoInfo } from '@/api/github';
import articles from '@/public/asserts/articles.json';

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
  },
  'recentUpdate': {
    title: 'Github更新',
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
        height: 100%;
        .recent-work-item-wrapper {
          height: 80px;
          margin-right: 10px;
          flex: 1;
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
          width: auto;
          color: var(--vp-c-text-2);
          padding: 2px 4px;
          border: 1px solid #ccc;
          border-radius: 6px;
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