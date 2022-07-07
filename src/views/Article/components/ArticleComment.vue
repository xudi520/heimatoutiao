<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- <van-cell v-for="(item, index) in commentList" :key="index">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title">hello</span>
        <div slot="label">
          <p style="color: #363636">{{ item.content }}</p>
          <p>
            <span style="margin-right: 10px">
              {{ item.pubdate | dateformat }}
            </span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell> -->

      <CommentItem
        v-for="item in commentList"
        :key="item.com_id"
        :item="item"
        @replay-show="$emit('replay-show', $event)"
      >
        <!-- @replay-show="$emit('replay-show', $event);" 值默认的有个true 不太用写 -->
      </CommentItem>
    </van-list>
  </div>
</template>,

<script>
import { getCommentList } from '@/api/comment.js'
import CommentItem from './CommentItem.vue'
export default {
  props: {
    source: {
      type: [Number, String],
      required: true
    },
    type: {
      type: String,
      required: true,
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['a', 'c'].indexOf(value) !== -1
      }
    },
    // 接收父的数据
    commentList: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      paramsObj: {
        type: this.type,
        source: this.source,
        limit: 5,
        offset: null
      },
      // commentList: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList(this.paramsObj)
        // console.log(res)
        // 若数据已全部加载完毕，则直接将 finished 设置成 true 即可。
        // 判断是否加载完毕
        if (res.data.data.results.length === 0) {
          this.finished = true
        }
        // 评论的数量
        this.$emit('set-count', res.data.data.total_count)
        // this.commentList = res.data.data.results
        // 保留每一页数据
        this.commentList.push(...res.data.data.results)
        // 本次返回结果的最后一个评论id 作为请求下一页数据 offset参数 如本次无具体数据 则值为null
        this.paramsObj.offset = res.data.data.last_id
        this.loading = false// 此时可以发起异步操作并更新数据，数据更新完毕后，将 loading 设置成 false 即可
      } catch (error) {
        console.log(error)
      }
    },
    onLoad () {
      this.getCommentList()// 获取下一页数据
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    CommentItem
  }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
