<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(item, index) in list"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  props: {
    searchText: {
      type: String,
      required: true // 必须要的参数
    }
  },
  created () {
    this.getSearchResult()
  },
  data () {
    return {
      page: 1,
      // 获取数据的数量
      per_page: 20,
      list: [],
      loading: false,
      finished: false,
      // 下拉列表初始值
      refreshing: false
    }
  },
  methods: {
    async getSearchResult () {
      try {
        const res = await getSearchResult({ page: this.page, per_page: this.per_page, q: this.searchText })
        console.log(res)
        // 如果数据加载完了 就提示没有更多数据
        if (res.data.data.results.length === 0) {
          // 数据加载完了 把finished设置为true
          this.finished = true
          return
        }
        // 旧数据和新数据合并 而不是覆盖替换
        this.list.push(...res.data.data.results)
        // this.list = res.data.data.results
        this.loading = false
        // 下拉跟新新的数据
        // 在每次请求完毕后，需要手动将loading设置为false，表示加载结束
        this.refreshing = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      // 到底部页码加1 请求下一页数据
      this.page++
      this.getSearchResult()
    },
    // 下拉刷新
    onRefresh () {
      this.list = []
      this.page = 1
      this.getSearchResult()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    ArticleItem
  }
}
</script>

<style scoped lang='less'>
.container {
  overflow: auto;
  height: calc(100vh - 108px);
}
</style>
