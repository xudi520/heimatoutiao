<template>
  <div>
    <van-nav-bar fixed>
      <template #title>
        <van-button
          type="info"
          icon="search"
          class="search-btn"
          round
          to="/search"
          >
          搜索
        </van-button>
      </template>
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs v-model="active" animated swipeable>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 文章内容组件 -->
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <!-- 汉堡插槽 -->
      <template #nav-right>
        <div class="menu" @click="isChannelPanelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="isChannelPanelShow"
      position="bottom"
      :style="{ height: '100%', paddingTop: '1rem' }"
      closeable
      close-icon-position="top-left"
    >
      <!-- 频道编辑组件 -->
      <!-- 父向子传值 -->
      <ChannelPanel
        :channels="channels"
        :active="active"
        @change-active="
          active = $event;
          isChannelPanelShow = false;
        "
        @del-event="active = $event"
      >
        <!-- active 高亮 -->
        <!-- @change-active事件  子向父传值  $event值没有可以不写-->
        <!-- isChannelPanelShow = false; 关闭子页面 -->
        <!-- @del-event="active = $event" 解决删除bug问题 -->
      </ChannelPanel>
    </van-popup>
  </div>
</template>

<script>
import ArticleList from '@/components/ArticleList.vue'
import { getMyChannels } from '@/api/home'
import ChannelPanel from './components/ChannelPanel.vue'
import { getItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'

export default {
  name: 'home',
  created () {
    // 进入页面就获取频道
    this.getMyChannels()
  },
  data () {
    return {
      active: 0,
      // 频道数据
      channels: [],
      isChannelPanelShow: false
    }
  },
  // 方法
  methods: {
    /*
      三种情况
      1.没有登录过 第一次安装app1第一次打开的时候智能去ajax中拿数据
      2.没有登录 ，但是第二次(多次)  可能之前编辑修改过 这样的话从本地拿数据
      3.登录过 直接从ajax中拿
    */
    async getMyChannels () {
      const channels = getItem(CHANNELS)
      // 没有登录
      // 匹配未登录并且本地存储中没有频道数据的情况
      // 没有user或没有token或没有数据的情况下让数据进行本地存储
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.channels = channels
      } else {
        try {
          // 登录情况下 去获取后台数据
          const res = await getMyChannels()
          this.channels = res.data.data.channels
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  computed: {},
  watch: {},

  filters: {},
  components: {
    ArticleList,
    ChannelPanel
  }
}
</script>

<style scoped lang='less'>
.search-btn {
  width: 555px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
}
/deep/.van-nav-bar__title {
  max-width: unset;
}
/deep/.van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/.van-tabs__line {
  width: 31px;
  background-color: #3296fa;
  border-radius: 3px;
}
.menu {
  min-width: 100px;
  height: 82px;
  background-color: rgb(255, 255, 255);
  position: fixed;
  right: 0;
  text-align: center;
  line-height: 82px;
  .toutiao {
    font-size: 33px;
  }
}
.menu1 {
  min-width: 100px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
}
/deep/ .van-tabs__wrap {
  width: 750px;
  position: fixed;
  top: 92px;
  z-index: 1;
  border-bottom: 1px solid #edeff3;
}
// 添加滚动条
/deep/ .van-pull-refresh {
  // 高度计算属性
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
