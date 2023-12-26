import { VitePressConfig, VitePressNav } from '@/types/common'

const EXPLORE_FRONT_PATH = '/pages/explore/frontend'
const EXPLORE_OTHERS_PATH = '/pages/explore/others'
const EXPLORE_OPTIMIZE_PATH = '/pages/explore/optimize'

const otherExploreItems = [
  { text: 'express中配置log4js', link: `${EXPLORE_OTHERS_PATH}/express中配置log4js` },
  { text: '物理机安装Linux同时实现内网穿透', link: `${EXPLORE_OTHERS_PATH}/物理机安装Linux同时实现内网穿透` },
  { text: 'Centos分区合并', link: `${EXPLORE_OTHERS_PATH}/Centos分区合并` },
  { text: 'Centos挂载硬盘', link: `${EXPLORE_OTHERS_PATH}/Centos挂载硬盘` },
  { text: 'Github常用api', link: `${EXPLORE_OTHERS_PATH}/Github常用api` },
  { text: '常用docker配置', link: `${EXPLORE_OTHERS_PATH}/常用docker配置`},
  { text: '公网访问(DDNS+IPV6)', link: `${EXPLORE_OTHERS_PATH}/公网访问(DDNS+IPV6)`},
  {
    text: '前端语音识别探索',
    link: `${EXPLORE_OTHERS_PATH}/前端语音识别探索`
  },
  {
    text: '24小时直播推流探索',
    link: `${EXPLORE_OTHERS_PATH}/24小时直播推流`
  },
  {
    text: '软路由探索',
    link: `${EXPLORE_OTHERS_PATH}/软路由探索`
  },
  {
    text: '家用摄像头本地存储和查看',
    link: `${EXPLORE_OTHERS_PATH}/家用摄像头本地存储和查看`
  },
  {
    text: '客户端控制服务端下电影',
    link: `${EXPLORE_OTHERS_PATH}/客户端控制服务端下电影`
  }
]

export function sidebarExplore(): VitePressConfig[] {
  return [
    {
      text: '前端探索',
      collapsible: true,
      items: [
        { text: 'eslint和prettier配置', link: `${EXPLORE_FRONT_PATH}/eslint和prettier配置` },
        { text: '生成脚本执行记录并发布npm包', link: `${EXPLORE_OTHERS_PATH}/生成脚本执行记录并发布npm包` },
        { text: 'arco-design简单使用记录', link: `${EXPLORE_FRONT_PATH}/arco-design简单使用记录` },
        { text: '前端项目部署方案', link: `${EXPLORE_FRONT_PATH}/前端项目部署方案` },
        { text: '同构渲染', link: `${EXPLORE_FRONT_PATH}/同构渲染` },
        { text: '浏览器和服务器间交互', link: `${EXPLORE_FRONT_PATH}/浏览器和服务器间交互` },
        { text: '基于AST的循环引用检测', link: `${EXPLORE_FRONT_PATH}/基于AST的循环引用检测` },
        { text: '处理主题包切换主题多余刷新', link: `${EXPLORE_FRONT_PATH}/处理主题包切换主题多余刷新` },
        { text: '项目打包资源底层替换', link: `${EXPLORE_FRONT_PATH}/项目打包资源底层替换` }
      ]
    },
    {
      text: '性能优化',
      collapsible: true,
      items: [
        { text: 'eslint和prettier配置', link: `${EXPLORE_OPTIMIZE_PATH}/工厂模式缓存函数调用` },
      ]
    },
    {
      text: '其他探索',
      collapsible: true,
      items: otherExploreItems,
    }
  ]
}

export const navExplore: VitePressNav = {
  text: 'Explore',
  items: [
    {
      text: '前端探索',
      link: '/pages/explore/frontend/eslint和prettier配置',
      activeMatch: '/pages/explore/'
    },
    {
      text: '性能优化',
      link: '/pages/explore/optimize/工厂模式缓存函数调用',
      activeMatch: '/pages/explore/'
    },
    {
      text: '其他探索',
      link: '/pages/explore/others/express中配置log4js',
      activeMatch: '/pages/explore/'
    },
  ]
}