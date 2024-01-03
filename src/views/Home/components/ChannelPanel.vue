<template>
  <div>
    <div class="channerl-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          round
          type="danger"
          plain
          size="mini"
          @click="isCloseShow = !isCloseShow"
        >
          {{ isCloseShow ? "完成" : "编辑" }}
        </van-button>
      </div>

      <van-row>
        <van-col span="6" v-for="(item, index) in channels" :key="item.id">
          <!-- :style="{ color: active === index ? 'red' : '' }" 动态class-->
          <div
            @click="onClick(index)"
            class="inner"
            :style="{ color: active === index ? 'red' : '' }"
          >
            {{ item.name }}
            <van-icon
              name="close"
              v-if="index !== 0"
              :style="{ color: active === index ? 'red' : '' }"
              v-show="isCloseShow"
            />
          </div>
        </van-col>
      </van-row>
    </div>

    <div class="channerl-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col span="6" v-for="item in recommendChannels" :key="item.id">
          <div class="inner van-ellipsis" @click="add(item.id)">
            + {{ item.name }}
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getAllArticleList, saveChannels } from '@/api/home'
import { setItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'channelPanel',
  props: {
    channels: {
      type: Array,
      required: true// 必须的
    },
    active: {
      type: Number,
      required: true
    }
  },
  async created () {
    try {
      const res = await getAllArticleList()
      // console.log(res)
      // 过滤出频道 不相等的数据列表
      // 判断俩个对象里面的数据是否相等 如果相等就不能添加 不相等就添加
      this.recommendChannels = res.data.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id))
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      recommendChannels: [],
      isCloseShow: false
    }
  },
  methods: {
    // 添加到我的频道
    add (id) {
      // 判断我的频道索引(id) 和推荐频道id是否相等
      const index = this.recommendChannels.findIndex(item => item.id === id)
      // 相等就添加到我的频道
      this.channels.push(this.recommendChannels[index])
      // 删除(截取)原来的数据
      this.recommendChannels.splice(index, 1)
      // 解决删除的bug问题
      if (index > this.active) {
        this.$emit('del-event', index - 1)
      }
      // if (index.length === 0) {
      //   onClick = onClick.disabled
      // }
    },
    // 编辑状态删除频道 非编辑状态切换频道
    onClick (index) {
      // 编辑状态
      if (this.isCloseShow) {
        if (index === 0) return // 推荐是不能删除的
        // 获取索引值
        const obj = this.channels[index]
        // 删除
        this.channels.splice(index, 1)
        // 添加到推荐频道
        this.recommendChannels.push(obj)
      } else {
        // 非编辑状态
        // 切换高亮active
        // 子向父传值  $emit('change-active', index) 参数1:事件 参数2：参数
        this.$emit('change-active', index)
      }
    }
  },
  computed: {},
  // 为数据做持久化
  watch: {
    // 添加删除频道做持久化
    channels: {
      async handler (newVal) {
        // console.log(newVal, '123')
        // 判断是否为登录状态
        if (this.$store.state.user && this.$store.state.user.token) {
          // 以登陆
          // [{id:1,seq:index}]
          const arr = []
          // 把频道数据处理一下
          // 处理id和索引
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          console.log(arr)
          try {
            // 频道持久化的接口
            const res = await saveChannels(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else { // 未登录
          // 把数据存到本地
          setItem(CHANNELS, newVal)
        }
      },
      deep: true // 深度监听
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.channerl-container {
  .title {
    display: flex;
    justify-content: space-between;
    padding: 52px 16px 48px 24px;
    align-items: center;
    h3 {
      font-size: 32px;
      font-weight: 400;
      color: #333;
    }
    .van-button {
      width: 100px;
      height: 48px;
      border-radius: 20px;
    }
  }
}
.inner {
  width: 160px;
  height: 86px;
  background-color: #f4f5f6;
  border-radius: 6px;
  font-size: 28px;
  font-weight: 400;
  color: #222;
  text-align: center;
  line-height: 86px;
  margin-left: 16px;
  position: relative;
  .van-icon-close {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
  }
}
.van-col {
  margin-bottom: 22px;
}
</style>
