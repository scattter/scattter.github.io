const MR_NOTICE_PATH = '/project/mr-notice'
const _50_PROJECTS_50_DAYS = '/project/50projects50days'
const TYPESCRIPT_STUDY = '/project/typescript-study'
const OTHER_PROJECTS = '/project/others'

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
      ]
    },
    {
      text: '其他项目相关',
      collapsible: true,
      items: [
        {
          text: '生成脚本执行记录并发布npm包',
          link: `${OTHER_PROJECTS}/生成脚本执行记录并发布npm包`
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
            { text: '物理机安装Linux同时实现内网穿透', link: `${DEVOPS_OTHERS_PATH}/物理机安装Linux同时实现内网穿透` },
            { text: 'Centos分区合并', link: `${DEVOPS_OTHERS_PATH}/Centos分区合并` },
            { text: 'Github常用api', link: `${DEVOPS_OTHERS_PATH}/Github常用api` },
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