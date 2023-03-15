import { VitePressConfig, VitePressNav } from '@/types/common'

const SOFT_WORK_PATH = '/project/mr-notice'
const _50_PROJECTS_50_DAYS = '/project/50projects50days'
const TYPESCRIPT_STUDY = '/project/typescript-study'
const OTHER_PROJECTS = '/project/others'

const softWorkItems = [
  { text: '项目部署', link: `${SOFT_WORK_PATH}/auto-deploy` }
]

const _50ProjectsItems = [
  {
    text: 'Scroll Animation',
    link: `${_50_PROJECTS_50_DAYS}/scrollAnimation`
  },
  {
    text: 'More Context Tip Animation',
    link: `${_50_PROJECTS_50_DAYS}/moreContextTipAnimation.md`
  },
  {
    text: 'Sound btn',
    link: `${_50_PROJECTS_50_DAYS}/soundBtn.md`
  },
  {
    text: 'Blurry Loading',
    link: `${_50_PROJECTS_50_DAYS}/BlurryLoading.md`
  },
  {
    text: 'Ripple Effect',
    link: `${_50_PROJECTS_50_DAYS}/RippleEffect.md`
  },
  {
    text: 'Drag N Drop',
    link: `${_50_PROJECTS_50_DAYS}/DragNDrop.md`
  },
  {
    text: 'Calendar',
    link: `${_50_PROJECTS_50_DAYS}/Calendar.md`
  },
]

const typescriptStudyItems = [
  {
    text: 'Typescript学习与记录',
    link: `${TYPESCRIPT_STUDY}/home`
  },
  {
    text: '01-函数间ts的交互使用',
    link: `${TYPESCRIPT_STUDY}/01-函数间ts的交互使用`
  },
  {
    text: '02-ts实现函数重载',
    link: `${TYPESCRIPT_STUDY}/02-ts实现函数重载`
  },
  {
    text: '03-ts对简单的可选参数处理',
    link: `${TYPESCRIPT_STUDY}/03-ts对简单的可选参数处理`
  },
  {
    text: '04-ts中元组的简单使用',
    link: `${TYPESCRIPT_STUDY}/04-ts中元组的简单使用`
  },
  {
    text: '05-ts中泛型的简单使用',
    link: `${TYPESCRIPT_STUDY}/05-ts中泛型的简单使用`
  },
  {
    text: '06-ts练习(reduce)',
    link: `${TYPESCRIPT_STUDY}/06-ts练习(reduce)`
  },
  {
    text: '07-ts泛型中的keyof',
    link: `${TYPESCRIPT_STUDY}/07-ts泛型中的keyof`
  },
  {
    text: '08-ts中的utility-types',
    link: `${TYPESCRIPT_STUDY}/08-ts中的utility-types`
  },
  {
    text: '09-ts中的Readonly和不可改属性',
    link: `${TYPESCRIPT_STUDY}/09-ts中的Readonly和不可改属性`
  },
  {
    text: '10-ts中的Enum和literal',
    link: `${TYPESCRIPT_STUDY}/10-ts中的Enum和literal`
  },
  {
    text: '11-ts中class的implement与属性可见性',
    link: `${TYPESCRIPT_STUDY}/11-ts中class的implement与属性可见性`
  },
  {
    text: '12-ts中的mapped types',
    link: `${TYPESCRIPT_STUDY}/12-ts中的mapped types.md`
  },
  {
    text: '13-ts中的readonly和static',
    link: `${TYPESCRIPT_STUDY}/13-ts中的readonly和static`
  },
  {
    text: '14-ts中class的abstract',
    link: `${TYPESCRIPT_STUDY}/14-ts中class的abstract`
  },
  {
    text: '15-ts中实现Mixin函数',
    link: `${TYPESCRIPT_STUDY}/15-ts中实现Mixin函数`
  },
  {
    text: '16-ts中的条件类型',
    link: `${TYPESCRIPT_STUDY}/16-ts中的条件类型`
  },
  {
    text: '17-ts中的相关操作符',
    link: `${TYPESCRIPT_STUDY}/17-ts中的相关操作符`
  },
]

const otherProjectItems = [
  {
    text: '生成脚本执行记录并发布npm包',
    link: `${OTHER_PROJECTS}/生成脚本执行记录并发布npm包`
  },
  {
    text: '前端语音识别探索',
    link: `${OTHER_PROJECTS}/前端语音识别探索`
  },
  {
    text: '24小时直播推流探索',
    link: `${OTHER_PROJECTS}/24小时直播推流`
  },
  {
    text: '软路由探索',
    link: `${OTHER_PROJECTS}/软路由探索`
  },
  {
    text: '家用摄像头本地存储和查看',
    link: `${OTHER_PROJECTS}/家用摄像头本地存储和查看`
  },
]

export function sidebarProject(): VitePressConfig[] {
  return [
    {
      text: 'Self projects',
      collapsible: true,
      items: [
        {
          text: 'soft work',
          collapsible: true,
          items: softWorkItems
        },
      ]
    },
    {
      text: '50projects50days',
      collapsible: true,
      items: _50ProjectsItems,
    },
    {
      text: 'Typescript study',
      collapsible: true,
      items: typescriptStudyItems,
    },
    {
      text: '其他项目相关',
      collapsible: true,
      items: otherProjectItems,
    },
  ]
}

export const navProject: VitePressNav = {
  text: 'Projects',
  items: [
    {
      text: 'soft-work',
      link: '/project/mr-notice/auto-deploy',
      activeMatch: '/project/'
    },
    {
      text: '50projects50days',
      link: '/project/50projects50days/scrollAnimation',
      activeMatch: '/project/'
    },
    {
      text: 'Typescript study',
      link: '/project/typescript-study/home',
      activeMatch: '/project/'
    },
    {
      text: '其他项目相关',
      link: '/project/others/生成脚本执行记录并发布npm包',
      activeMatch: '/project/'
    }
  ]
}