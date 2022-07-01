import request from '@/utils/request'

/**
 *获取短信验证码
 * @param {number} mobile
 * @returns
 */
export const getSmsCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}

/**
 *账号号密码
 * @param {mobile, code} param0
 */
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}

/**
 *登录信息
 * @returns
 */
export const getUserInfo = () => {
  return request({
    url: 'user'
  })
}

// 拦截器 一堆代码都需要axios 见ajax前半段
