const { sidebarProject, navProject } = require("./config/projectConfig");
const { sidebarDevops, navDevops } = require("./config/devopsConfig");
const { sidebarJsConfig, navJsConfig } = require("./config/jsConfig");


module.exports = {
  title: 'Scatter Site',
  head: [],
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
      '/project/': sidebarProject,
      '/devops/': sidebarDevops,
      '/js/': sidebarJsConfig,
    },
  },
}

function nav() {
  return [
    {
      text: '首页',
      link: '/',
    },
    navProject,
    navDevops,
    navJsConfig,
    {
      text: 'About Me',
      link: '/about'
    }
  ]
}