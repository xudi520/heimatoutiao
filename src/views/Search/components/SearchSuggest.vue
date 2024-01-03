<template>
  <div>
    <!-- 搜索提示 -->
    <van-cell
      icon="search"
      v-for="(item, index) in list"
      :key="index"
      @click="$emit('search', item)"
    >
      <!-- @click="$emit('search', item)" 子向父传值 -->
      <template #title>
        <span v-html="highight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestList } from '@/api/search.js'
let timer = null
export default {
  name: 'searchsuggest',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {
    // console.log('发送ajax请求')
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    // 因为这块要渲染的不是普通的字符串，而是html片段 所以用v-html v-html是属性绑定不能用过滤器
    // 所有只能在methods中写
    highight (str) {
      console.log(str)
      const res = new RegExp(this.searchText, 'g')
      return str.replace(res, `<span style="color: red">${this.searchText}</span>`)
    }
  },
  computed: {},

  watch: {
    searchText: {
      handler (newVal) {
        // 解决防抖
        clearTimeout(timer)
        // async 和 await 必须同属于一个函数
        timer = setTimeout(async () => {
          // 通过axios获取搜索列表信息
          try {
            const res = await getSuggestList(newVal)
            // console.log(res)s
            this.list = res.data.data.options
          } catch (err) {
            console.log(err)
          }
        }, 500)
      },
      immediate: true // 立即监听 在组件创建的时候就会监听
    }
  },
  // 组件被销毁了 要清理定时器，避免内存泄漏
  beforeDestroy () {
    clearTimeout(timer)
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
