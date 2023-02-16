const DEVOPS_FRONT_PATH = '/devops/frontend'
const DEVOPS_OTHERS_PATH = '/devops/others'

function sidebarDevops() {
  return [
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
        { text: 'Centos挂载硬盘', link: `${DEVOPS_OTHERS_PATH}/Centos挂载硬盘` },
        { text: 'Github常用api', link: `${DEVOPS_OTHERS_PATH}/Github常用api` },
      ]
    }
  ]
}

const navDevops = {
  text: 'Devops',
  items: [
    {
      text: '前端配置',
      link: '/devops/frontend/eslint和prettier配置',
      activeMatch: '/devops/'
    },
    {
      text: '其他配置相关',
      link: '/devops/others/express中配置log4js',
      activeMatch: '/devops/'
    },
  ]
}

module.exports = {
  sidebarDevops: sidebarDevops(),
  navDevops,
}