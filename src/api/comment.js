import request from '@/utils/request.js'
/**
 *!获取评论或评论回复
 * @param
 * type 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
 * source 源id，文章id或评论id
 * offset 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 * limit 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
 * @returns
 */
export const getCommentList = ({ type, source, offset, limit }) => {
  return request({
    url: 'comments',
    params: { type, source, offset, limit }
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
    url: 'comment/likings',
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
    url: `comment/likings/${target}`
  })
}

/**
 *target  必须  评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
 content 必须  评论内容
 art_id  可选 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
 * @param {*} data
 * @returns
 */

export const AddComment = (data) => {
  return request({
    method: 'POST',
    url: 'comments',
    data
  })
}
