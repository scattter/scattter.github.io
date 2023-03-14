import { VitePressConfig } from '@/types/common'

const JS_CONFIG_PATTERNS_PATH = '/js/designPatterns'


export function sidebarJsConfig(): VitePressConfig[] {
  return [
    {
      text: '设计模式',
      collapsible: true,
      items: [
        { text: '发布订阅模式', link: `${JS_CONFIG_PATTERNS_PATH}/event/index` },
        { text: '观察者模式', link: `${JS_CONFIG_PATTERNS_PATH}/observe/index` },
        { text: '代理模式', link: `${JS_CONFIG_PATTERNS_PATH}/proxy/index` },
        { text: '广播模式', link: `${JS_CONFIG_PATTERNS_PATH}/provide/index` },
        { text: '原型链模式', link: `${JS_CONFIG_PATTERNS_PATH}/prototype/index` },
      ]
    },
  ]
}

export const navJsConfig: VitePressConfig = {
  text: 'Javascript',
  items: [
    {
      text: '设计模式',
      link: '/js/designPatterns/index',
      activeMatch: '/js/'
    },
  ]
}