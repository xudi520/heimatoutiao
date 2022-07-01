import request from '@/utils/request'
export const getMyChannels = () => {
  return request({
    url: 'user/channels'
  })
}

/**
 *获取文章列表信息
 * @param {channel_id, timestamp} param0 id 时间戳
 * @returns
 */

// eslint-disable-next-line camelcase
export const getAeticleList = ({ channel_id, timestamp }) => {
  return request({
    // 默认是GET请求
    url: 'articles',
    params: { channel_id, timestamp }
  })
}

/**
 *获取所有列表的频道列表数据
 * @returns
 */

export const getAllArticleList = () => {
  return request({
    url: 'channels'
  })
}

/**
 *频道数据持久化
 * @param {*} channels
 * @returns
 */
export const saveChannels = (channels) => {
  return request({
    url: 'user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
}
