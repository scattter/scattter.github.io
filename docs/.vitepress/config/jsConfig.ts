import { VitePressConfig, VitePressNav } from '@/types/common'

const JS_CONFIG_PATTERNS_PATH = '/pages/js/designPatterns'
const JS_CONFIG_VUE_PATH = '/pages/js/vue'


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
        { text: '装饰器模式', link: `${JS_CONFIG_PATTERNS_PATH}/decorator/index` },
        { text: '工厂模式', link: `${JS_CONFIG_PATTERNS_PATH}/factory/index` },
      ]
    },
    {
      text: 'vue相关',
      collapsible: true,
      items: [
        { text: 'tooltip指令', link: `${JS_CONFIG_VUE_PATH}/directives/tooltip/index` },
        { text: 'ClickOutside指令', link: `${JS_CONFIG_VUE_PATH}/directives/clickoutside/index` },
        { text: 'placeholder指令', link: `${JS_CONFIG_VUE_PATH}/directives/placeholder/index` },
      ]
    },
  ]
}

export const navJsConfig: VitePressNav = {
  text: 'Javascript',
  items: [
    {
      text: '设计模式',
      link: '/pages/js/designPatterns/index',
      activeMatch: '/pages/js/'
    },
    {
      text: 'vue相关',
      link: `${JS_CONFIG_VUE_PATH}/directives/tooltip/index`,
      activeMatch: '/pages/js/'
    },
  ]
}