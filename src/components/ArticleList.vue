
<template>
  <van-cell-group>
    <!-- 下拉刷新 -->
    <van-pull-refresh
      class="article"
      v-model="refreshing"
      @refresh="onRefresh"
      ref="pullrefresh"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in articleList"
          :key="index"
          :title="item.title"
          value=""
          label="描述信息"
        /> -->
        <!-- 内容 -->
        <ArticleItem
          v-for="(item, index) in articleList"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </van-cell-group>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
// 分装的列表组件
import { getAeticleList } from '@/api/home'
let ele = null // 全局
let scrollTop = 0
export default {
  name: 'ArticleList',
  props: {
    id: {
      type: Number,
      // 必须要要给属性值
      required: true
    }
  },
  created () {
    this.getAeticleList()
  },
  // 操作DOM
  mounted () {
    // 记住列表的滚动位置
    // $el 是根标签
    // console.log(this.$refs.pullrefresh)
    ele = this.$refs.pullrefresh.$el
    this.$refs.pullrefresh.$el.addEventListener('scroll', function () {
      // console.log(this.scrollTop)
      // 获取的滚动位置负值给新的滚动位置
      scrollTop = this.scrollTop
    })
  },

  activated () {
    // 每次进入home页面的时候 把滚动条记录到上传滚动到的位置
    ele.scrollTop = scrollTop
  },
  data () {
    return {
      timestamp: Date.now(),
      articleList: [],
      loading: false,
      finished: false,
      refreshing: false,
      error: false
    }
  },
  methods: {
    async getAeticleList () {
      if (this.refreshing) {
        // 数据重置  清空之前的数据 和获取时间
        this.articleList = []
        this.timestamp = Date.now()
        this.refreshing = false
      }
      try {
        // axios 获取的俩数据
        const res = await getAeticleList({ channel_id: this.id, timestamp: this.timestamp })
        console.log(res)
        // 获取时间数据对象
        this.timestamp = res.data.data.pre_timestamp
        // 若数据已全部加载完毕，则直接将 finished 设置成 true 即可。
        if (this.timestamp === null) {
          this.finished = true
        }
        // this.articleList = res.data.data.results
        // 在旧数据的基础上 添加新的数据  滚动之后往里面追加内容
        this.articleList.push(...res.data.data.results)
        // 数据更新完毕后，将 loading 设置成 false
        this.loading = false
      } catch (err) {
        // console.log(err)
        // 展示错误提示状态
        this.error = true
        this.loading = false
      }
    },
    // 错误之后再去请求数据
    onLoad () {
      this.getAeticleList()
    },
    // 下拉刷新时触发
    onRefresh () {
      // 清空之前的数据
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      // 清空之前的数据
      // this.articleList = []
      // this.timestamp = Date.now()
      this.getAeticleList()
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
.van-cell-group {
  margin-top: 174px;
  // .article{
  //   height: 79vh;
  //   overflow-y: auto;
  // }
}
</style>
