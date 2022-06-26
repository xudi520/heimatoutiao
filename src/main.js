import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// import 'vant/lib/index.css'
import 'vant/lib/index.less'
import 'amfe-flexible'
// 字体图标
import '@/style/icon.less'
import MyIcon from '@/components/MyIcon.vue'

Vue.use(Vant)
// component组件
Vue.component('MyIcon', MyIcon)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
