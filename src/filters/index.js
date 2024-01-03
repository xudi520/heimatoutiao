import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
// 相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')

// 配置使用处理时间的插件
dayjs.extend(relativeTime)
/**
 *把时间改为相对时间
 * @param {*} time
 * @returns
 * fromNow() 到现在的相对时间
 */
export const dateformat = (time) => {
  return dayjs(time).fromNow()
}
