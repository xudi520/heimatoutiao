import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
// in your vue.config.js
const vuexLocal = new VuexPersistence({
  // 指定的是本地存储
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    searchHistoryList: []
  },
  getters: {
  },
  mutations: {
    // login提交的token
    setUser (state, payload) {
      state.user = payload
    },
    // 搜索栏
    setSearchHistoryList (state, payload) {
      let arr = state.searchHistoryList
      // unshift添加到最前面
      arr.unshift(payload)
      // 数组去重
      arr = [...new Set(arr)]
      state.searchHistoryList = arr
    },
    // 数据是vuex里面的只能在这删除
    // 单个删除
    delHistory (state, index) {
      state.searchHistoryList.splice(index, 1)
    },
    // 删除所有
    delAllHistory (state) {
      state.searchHistoryList = []
    }

  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
