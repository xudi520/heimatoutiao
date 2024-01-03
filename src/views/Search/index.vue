<template>
  <div>
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="rgb(50, 150, 250)"
        @cancel="$router.go(-1)"
        @search="onSearch"
        autofocus
        @focus="isSearch = false"
      />
      <!-- @cancel="$routet.go(-1)" 取消 -->
      <!-- autofocus 自动聚焦 -->
    </form>
    <!-- 搜索历史 -->
    <SearchHistory v-if="searchText === ''" @search="onSearch"></SearchHistory>
    <template v-else>
      <!-- 搜索结果 -->
      <SearchResult v-if="isSearch" :searchText="searchText"></SearchResult>
      <!-- 搜索提示 -->
      <!-- :searchText="searchText" 搜索文本框内容 -->
      <SearchSuggest
        v-else
        :searchText="searchText"
        @search="onSearch"
      ></SearchSuggest>
    </template>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggest from './components/SearchSuggest.vue'

export default {
  created () { },
  data () {
    return {
      searchText: '',
      isSearch: false
    }
  },
  methods: {
    // 需求 在搜索input回车的时候 点击提示内容 也进行搜索
    // 搜索关键字
    onSearch (str) {
      // console.log(str)
      // 跟新文本框内容
      this.searchText = str
      // 渲染搜索结果
      this.isSearch = true
      this.$store.commit('setSearchHistoryList', str)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    SearchHistory,
    SearchSuggest,
    SearchResult
  }
}
</script>

<style scoped lang='less'>
</style>
