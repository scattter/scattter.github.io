const JS_CONFIG_PATTERNS_PATH = '/js/designPatterns'


function sidebarJsConfig() {
  return [
    {
      text: '设计模式',
      collapsible: true,
      items: [
        { text: '发布订阅模式', link: `${JS_CONFIG_PATTERNS_PATH}/event/index` },
        { text: '观察者模式', link: `${JS_CONFIG_PATTERNS_PATH}/observe/index` },
      ]
    },
  ]
}

const navJsConfig = {
  text: 'Javascript',
  items: [
    {
      text: '设计模式',
      link: '/js/designPatterns/index',
      activeMatch: '/js/'
    },
  ]
}

module.exports = {
  sidebarJsConfig: sidebarJsConfig(),
  navJsConfig,
}