import request from '@/utils/request'

/**
 *搜索联想数据列表
 * @param {搜索关键词} q
 * @returns
 */
export const getSuggestList = q => {
  return request({
    url: 'suggestion',
    params: {
      q
    }
  })
}

/**
 * 搜索数据接口
 * @param { page默认页数, per_page 每页数量, q关键词} param0
 * @returns
 * page = 1 默认值
 */

// eslint-disable-next-line camelcase
export const getSearchResult = ({ page = 1, per_page, q }) => {
  return request({
    url: 'search',
    params: { page, per_page, q }

  })
}
