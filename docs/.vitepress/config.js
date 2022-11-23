const { sidebarDevops, sidebarProject } = require('./sideBar.config')


module.exports = {
  title: 'Scatter Site',
  description: 'self write',
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
    // 目录 options for markdown-it-toc
    toc: { includeLevel: [1, 2] },
  },
  themeConfig: {
    logo: '/logo.jpeg',
    siteTitle: 'scatter',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/scattter' }
    ],
    search: true,
    lastUpdated: 'Last Updated',
    nav: nav(),
    sidebar: {
      '/project/': sidebarProject(),
      '/devops/': sidebarDevops(),
    },
  },
}

function nav() {
  return [
    {
      text: '首页',
      link: '/',
    },
    {
      text: 'Project',
      items: [
        {
          text: 'mr-notice',
          link: '/project/mr-notice/auto-deploy',
          activeMatch: '/project/'
        },
        {
          text: '50projects50days',
          link: '/project/50projects50days/scrollAnimation',
          activeMatch: '/project/'
        }
      ]
    },
    {
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
  ]
}