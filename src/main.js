import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// import 'vant/lib/index.css'
import 'vant/lib/index.less'
import 'amfe-flexible'
// 字体图标 初始化样式
import '@/style/reset.less'
import MyIcon from '@/components/MyIcon.vue'
// 过滤器
// 一次性把filters/index.js中所有按需导出全部导出来  里面是dayjs处理时间的
import * as obj from '@/filters'

// 收藏组件
import '@/components/index'
// 关注全局组件
import FollowUser from '@/components/FollowUser.vue'
Vue.component(FollowUser.name, FollowUser)
// 处理时间
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})

Vue.use(Vant)
// component组件
Vue.component('MyIcon', MyIcon)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
