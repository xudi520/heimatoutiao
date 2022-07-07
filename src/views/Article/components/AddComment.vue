<template>
  <!-- 评论组件 -->
  <van-field
    v-model.trim="message"
    rows="2"
    autosize
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
    class="add-field"
    ref="field"
  >
    <template #extra>
      <van-button
        type="default"
        :disabled="message.length === 0"
        @click="onclick"
      >
        发布</van-button
      >
      <!-- :disabled="message.length === 0  是否禁用按钮 -->
    </template>
  </van-field>
</template>

<script>
import { AddComment } from '@/api/comment'
export default {
  props: {
    // 接收文章id
    // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
    target: {
      type: [Number, String],
      required: true
    },
    art_id: {
      type: [String, Number]
    }

  },
  created () {
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onclick () {
      try {
        const res = await AddComment({
          target: this.target,
          content: this.message,
          // 对评论进行评论才需要的id
          art_id: this.art_id
        })
        console.log(res)
        // 子把数据传给父 index
        this.$emit('add-comment', res.data.data.new_obj)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
  mounted () {
    // 打开光标自动获取   focus()获取光标
    // 组件最终会变成dom结构 $el可以获取这个组件安定跟标签
    this.$refs.field.$el.querySelector('textarea').focus()
  }
}
</script>

<style scoped lang='less'>
.add-field {
  align-items: center;
  button {
    border: none;
  }
}
</style>
