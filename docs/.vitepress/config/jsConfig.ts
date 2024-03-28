import { VitePressConfig, VitePressNav } from '@/types/common'

const JS_CONFIG_PATTERNS_PATH = '/pages/js/designPatterns'
const JS_CONFIG_VUE_PATH = '/pages/js/vue'
const JS_CONFIG_SHARE_PATH = '/pages/js/share'


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
    {
      text: 'share',
      collapsible: true,
      items: [
        { text: 'JS内置深拷贝函数介绍', link: `${JS_CONFIG_SHARE_PATH}/deepClone/JS内置深拷贝函数介绍` },
        { text: '基于Grid的栅格化布局', link: `${JS_CONFIG_SHARE_PATH}/基于Grid的栅格化布局` }
      ]
    }
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

    {
      text: 'share',
      link: `${JS_CONFIG_SHARE_PATH}/deepClone/JS内置深拷贝函数介绍`,
      activeMatch: '/pages/js/'
    },
  ]
}