import { VitePressConfig, VitePressNav } from '@/types/common'

const SOFT_WORK_PATH = '/pages/project/mr-notice'
const _50_PROJECTS_50_DAYS = '/pages/project/50projects50days'
const TYPESCRIPT_STUDY = '/pages/project/typescript-study'

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
  {
    text: 'Drawing Board',
    link: `${_50_PROJECTS_50_DAYS}/DrawingBoard.md`
  },
  {
    text: 'Scratch Ticket',
    link: `${_50_PROJECTS_50_DAYS}/ScratchTicket.md`
  },
  {
    text: 'Kinetic Loader',
    link: `${_50_PROJECTS_50_DAYS}/KineticLoader.md`
  },
  {
    text: 'Placeholder',
    link: `${_50_PROJECTS_50_DAYS}/Placeholder.md`
  },
  {
    text: 'Print Text',
    link: `${_50_PROJECTS_50_DAYS}/PrintText.md`
  },
  {
    text: 'Cursor Hover',
    link: `${_50_PROJECTS_50_DAYS}/CursorHover.md`
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
  {
    text: '18-ts中装饰器的一些应用',
    link: `${TYPESCRIPT_STUDY}/18-ts中装饰器的一些应用`
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
      collapsed: true,
      items: typescriptStudyItems,
    },
  ]
}

export const navProject: VitePressNav = {
  text: 'Projects',
  items: [
    {
      text: 'soft-work',
      link: '/pages/project/mr-notice/auto-deploy',
      activeMatch: '/pages/project/'
    },
    {
      text: '50projects50days',
      link: '/pages/project/50projects50days/scrollAnimation',
      activeMatch: '/pages/project/'
    },
    {
      text: 'Typescript study',
      link: '/pages/project/typescript-study/home',
      activeMatch: '/pages/project/'
    }
  ]
}