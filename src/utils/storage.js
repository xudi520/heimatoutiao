// 为了方便项目中使用本地存储的时候写的时候  简化操作分装 获取 设置 删除 全部删除工具函数
// window.localStorage.getItem('a',"['a']")

/**
 *获取
 * @param {*} key
 * @returns
 */
export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    // parse 解析
    return JSON.parse(res)
  } catch (err) {
    // console.log(err)
    return res
  }
}

/**
 * 设置
 * @param {*} key
 * @param {*} value
 */
export function setItem (key, value) {
  console.log(value)
  if (typeof value === 'object') { // 判断是否是objeck
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}

/**
 *删除 本地存储中的一个
 * @param {*} key
 */
export function removeIten (key) {
  window.localStorage.removeItem(key)
}

/**
 * 删除所有本地存储
 */
export function clearItem () {
  window.localStorage.clearItem()
}
