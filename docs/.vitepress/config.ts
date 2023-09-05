import { defineConfig } from "vitepress"
import { VitePressNav } from "@/types/common";
import { sidebarProject, navProject } from "./config/projectConfig"
import { sidebarExplore, navExplore } from "./config/exploreConfig"
import { sidebarJsConfig, navJsConfig } from "./config/jsConfig"
import { resolve } from 'path'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { visualizer } from "rollup-plugin-visualizer";

export default withMermaid(defineConfig({
  vite: {
    resolve: {
      alias: {
        "@": resolve(__dirname, "../../docs"), // 这里拆分配置后根目录发生了变化
        "@viewComponents": resolve(
          __dirname,
          "../../docs/pages/project/50projects50days/viewComponent"
        ), // 这里拆分配置后根目录发生了变化
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json']
    },
    plugins: [
      visualizer({
        gzipSize: true,
        brotliSize: true,
        emitFile: false,
        filename: "test.html", //分析图生成的文件名
        open: false //如果存在本地服务端口，将在打包后自动展示
      }),
    ],
  },
  title: 'Scatter Site',
  head: [
    ['meta', { name: 'google-site-verification', content: 'pe2Js8d1Jm4CaobO0Wg5Ij5cBBYN177ph1_-uJYdMLo' }],
  ],
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
      '/pages/project/': sidebarProject(),
      '/pages/explore/': sidebarExplore(),
      '/pages/js/': sidebarJsConfig(),
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
    navExplore,
    navJsConfig,
    {
      text: 'About Me',
      link: '/about'
    }
  ]
}