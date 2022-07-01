import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

/**
 *把时间改为相对时间
 * @param {*} time
 * @returns
 */
export const dateformat = (time) => {
  return dayjs(time).fromNow()
}
