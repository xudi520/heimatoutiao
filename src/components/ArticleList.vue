
<template>
  <van-cell-group>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      ref="pullrefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in articleList"
          :key="index"
          :title="item.title"
          value=""
          label="描述信息"
        /> -->
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
      required: true
    }
  },
  created () {
    this.getAeticleList()
  },
  // 操作DOM
  mounted () {
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
      refreshing: false
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
        // console.log(res)
        // 获取时间数据对象
        this.timestamp = res.data.data.pre_timestamp
        // 若数据已全部加载完毕，则直接将 finished 设置成 true 即可。
        if (this.timestamp === null) {
          this.finished = true
        }
        // 在旧数据的基础上 添加新的数据
        // this.articleList = res.data.data.results
        this.articleList.push(...res.data.data.results)
        // 数据更新完毕后，将 loading 设置成 false
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getAeticleList()
    },
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
}
</style>
