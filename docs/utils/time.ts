// @ts-ignore
import dayjs from "dayjs";

export const calcTimeToDiffDayLabel = (time: string | Date): string => {
  const curDay = dayjs().format('YYYY-MM-DD')
  const targetDay = dayjs(time).format('YYYY-MM-DD')
  const diff: number = dayjs(curDay).diff(targetDay, 'day')
  if (diff === 0) {
    return '今天'
  } else if (diff === 1) {
    return '昨天'
  } else if (diff === 2) {
    return '前天'
  } else if (diff < 4) {
    return '三天内'
  } else if (diff < 7) {
    return '一周内'
  } else {
    return '一周前'
  }
}

interface DateTime {
  year: number
  month: number
  day?: unknown
}

export const isToday = (date: DateTime, carry: number = 0) => {
  if (typeof date.day !== 'number') return false
  const { year, month, day } = date
  return dayjs().isSame(dayjs(`${year}-${month + carry}-${day}`), 'day')
}