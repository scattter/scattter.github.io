// @ts-ignore
import dayjs from "dayjs";

export const calcTimeToDiffDayLabel = (time: string | Date): string => {
  const curDay = dayjs().format('YYYY-MM-DD HH:mm:ss')
  const targetDay = dayjs(time).format('YYYY-MM-DD HH:mm:ss')
  let label = '无定义'
  const diff: number = dayjs(curDay).diff(targetDay, 'day')
  if (diff === 0) {
    label = '今天'
  } else if (diff === 1) {
    label = '昨天'
  } else if (diff === 2) {
    label = '前天'
  } else if (diff < 4) {
    label = '三天内'
  } else if (diff < 7) {
    label = '一周内'
  } else {
    label = '一周前'
  }
  return label
}