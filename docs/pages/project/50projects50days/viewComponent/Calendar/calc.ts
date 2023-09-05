const HEADER = ['日', '一', '二', '三', '四', '五', '六']
const DOUBLEHEADER = HEADER.concat(HEADER)
const WEEKDAYS = 7

// 获取日历的头
// 默认从周日开始
const getHeader = (beginDay: number = 0) => {
  return DOUBLEHEADER.slice(beginDay, beginDay + 7)
}

// 获取当月第一天是周几
const getFirstDayWeekInMonth = (time: Date = new Date()) => {
  time.setDate(1)
  return time.getDay()
}

// 获取当月有多少天
const getDaysInMonth = (time: Date = new Date()) => {
  return new Date(time.getFullYear(), time.getMonth() + 1, 0).getDate()
}

// 组装表格数据
export const setupDays = (begin = 0, time = new Date()) => {
  const header: string[] = getHeader(begin)
  const temps: string[] = new Array(getFirstDayWeekInMonth(time) - begin)
  // @ts-ignore
  const days: string[] = [...Array(getDaysInMonth(time)).keys()].map(key => key+= 1)
  // getHeader(begin) header
  // Array(getFirstDayWeekInMonth(time)).fill(0)  补0
  // getDaysInMonth(time) 添加具体的数字, 后续从1开始打印
  return header.concat(temps).concat(days)
}