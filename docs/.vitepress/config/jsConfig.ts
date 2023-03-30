import { VitePressConfig, VitePressNav } from '@/types/common'

const JS_CONFIG_PATTERNS_PATH = '/js/designPatterns'
const JS_CONFIG_VUE_PATH = '/js/vue'


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
        { text: '模块模式', link: `${JS_CONFIG_PATTERNS_PATH}/module/index` },
        { text: '混入模式', link: `${JS_CONFIG_PATTERNS_PATH}/mixin/index` },
        { text: '单例模式', link: `${JS_CONFIG_PATTERNS_PATH}/singleton/index` },
      ]
    },
    {
      text: 'vue相关',
      collapsible: true,
      items: [
        { text: 'tooltip指令', link: `${JS_CONFIG_VUE_PATH}/directives/tooltip/index` },
      ]
    },
  ]
}

export const navJsConfig: VitePressNav = {
  text: 'Javascript',
  items: [
    {
      text: '设计模式',
      link: '/js/designPatterns/index',
      activeMatch: '/js/'
    },
    {
      text: 'vue相关',
      link: `${JS_CONFIG_VUE_PATH}/directives/tooltip/index`,
      activeMatch: '/js/'
    },
  ]
}