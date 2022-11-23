const MR_NOTICE_PATH = '/project/mr-notice'
const _50_PROJECTS_50_DAYS = '/project/50projects50days'

function sidebarProject() {
  return [
    {
      text: 'self projects',
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