import axios from 'axios'
// 只有views里面有this  js中没有this所以用
import store from '@/store'
const instance = axios.create({
  baseURL: 'http://toutiao.itheima.net/v1_0',
  timeout: 5000
})

//! 添加请求拦截器 注入token
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (store.state.user && store.state.user.token) {
    config.headers = {
      Authorization: 'Bearer ' + store.state.user.token
    }
  }
  // 必须返回 不然出不去
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

//! 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default instance
