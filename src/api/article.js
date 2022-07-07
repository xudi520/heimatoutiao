import request from '@/utils/request'

export const getArticle = (article_id) => {
  return request({
    url: `/articles/${article_id}`
  })
}

/**
 *添加关注用户
 * @param {用户id} target
 * @returns
 */
export const addUser = (target) => {
  return request({
    method: 'POST',
    url: 'user/followings',
    data: {
      target
    }
  })
}

/**
 *取消关注用户
 * @param {用户id} target
 * @returns
 */
export const delUser = (target) => {
  return request({
    method: 'DELETE',
    url: `user/followings/${target}`
  })
}

/**
 *点击收藏
 * @param {收藏的目标文章id} target
 * @returns
 */

export const addCollect = (target) => {
  return request({
    method: 'POST',
    url: 'article/collections',
    data: { target }
  })
}

/**
 *  取消收藏
 * @param {取消收藏的文章} target
 * @returns
 */
export const delCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `article/collections/${target}`

  })
}

/**
 *
 * @param {点赞的文章id} target
 * @returns
 */
export const allLike = (target) => {
  return request({
    method: 'POST',
    url: 'article/likings',
    data: { target }
  })
}

/**
 *  取消点赞
 * @param {文章id} target
 * @returns
 */
export const delLike = (target) => {
  return request({
    method: 'DELETE',
    url: `article/likings/${target}`
  })
}
