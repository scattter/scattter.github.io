import { defineConfig } from "vitepress"
import { VitePressNav } from "@/types/common";
import { sidebarProject, navProject } from "./config/projectConfig"
import { sidebarDevops, navDevops } from "./config/devopsConfig"
import { sidebarJsConfig, navJsConfig } from "./config/jsConfig"
import { resolve } from 'path'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  vite: {
    resolve: {
      alias: {
        "@": resolve(__dirname, "../../docs"), // 这里拆分配置后根目录发生了变化
        "@viewComponents": resolve(
          __dirname,
          "../../docs/project/50projects50days/viewComponent"
        ), // 这里拆分配置后根目录发生了变化
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json']
    },
  },
  title: 'Scatter Site',
  head: [],
  description: 'self write',
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
    // 目录 options for markdown-it-toc
    toc: { level: [1, 2, 3] },
  },
  themeConfig: {
    logo: '/logo.jpeg',
    siteTitle: 'scatter',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/scattter' }
    ],
    outline: [2,3],
    nav: nav(),
    sidebar: {
      '/project/': sidebarProject(),
      '/devops/': sidebarDevops(),
      '/js/': sidebarJsConfig(),
    },
  },
}))

function nav(): VitePressNav[] {
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