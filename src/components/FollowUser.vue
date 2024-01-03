<template>
  <!-- 关注按钮 -->
  <van-button
    :disabled="isAjax"
    :loading="isAjax"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    :icon="value ? '' : 'plus'"
    :plain="value"
    @click="onclick"
    >{{ value ? "已关注" : "关注" }}</van-button
  >
  <!-- @click="$emit('input', !value)" -->
</template>

<script>
import { addUser, delUser } from '@/api/article'
export default {
  name: 'FollowUser',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    // 通过aut_id数据做持续化
    target: {
      type: [Number, String],
      required: true
    }
  },
  created () { },
  data () {
    return {
      // 加载
      isAjax: false
    }
  },
  methods: {
    async onclick () {
      this.isAjax = true
      // 如果当前已关注 调用取消关注接口
      if (this.value) {
        try {
          await delUser(this.target)
          // 调用父组件input 更新视图 input 或者自定事件都可以的
          // 让父组件自己改自己
          this.$emit('input', !this.value)
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          await addUser(this.target)
          this.$emit('input', !this.value)
        } catch (err) {
          console.log(err)
        }
      }
      this.isAjax = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
