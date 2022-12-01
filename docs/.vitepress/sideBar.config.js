const MR_NOTICE_PATH = '/project/mr-notice'
const _50_PROJECTS_50_DAYS = '/project/50projects50days'
const TYPESCRIPT_STUDY = '/project/typescript-study'

function sidebarProject() {
  return [
    {
      text: 'Self projects',
      collapsible: true,
      items: [
        {
          text: 'mr-notice',
          collapsible: true,
          items: [
            { text: '项目部署', link: `${MR_NOTICE_PATH}/auto-deploy` }
          ]
        },
      ]
    },
    {
      text: '50projects50days',
      collapsible: true,
      items: [
        {
          text: 'Scroll Animation',
          link: `${_50_PROJECTS_50_DAYS}/scrollAnimation`
        },
        {
          text: 'More Context Tip Animation',
          link: `${_50_PROJECTS_50_DAYS}/moreContextTipAnimation.md`
        },
      ]
    },
    {
      text: 'Typescript study',
      collapsible: true,
      items: [
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
      ]
    },
  ]
}

const DEVOPS_FRONT_PATH = '/devops/frontend'
const DEVOPS_OTHERS_PATH = '/devops/others'

function sidebarDevops() {
  return [
    {
      text: 'Devops',
      collapsible: true,
      items: [
        {
          text: '前端配置',
          collapsible: true,
          items: [
            { text: 'eslint和prettier配置', link: `${DEVOPS_FRONT_PATH}/eslint和prettier配置` },
            { text: 'arco-design简单使用记录', link: `${DEVOPS_FRONT_PATH}/arco-design简单使用记录` }
          ]
        },
        {
          text: '其他配置相关',
          collapsible: true,
          items: [
            { text: 'express中配置log4js', link: `${DEVOPS_OTHERS_PATH}/express中配置log4js` },
          ]
        }
      ]
    },
  ]
}

module.exports = {
  sidebarProject,
  sidebarDevops
}