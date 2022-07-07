<template>
  <van-loading v-if="isLoading" size=".53333rem" />
  <van-icon
    v-else
    color="#777"
    :name="is_collected ? 'star' : 'star-o'"
    @click="onclick"
  />
</template>

<script>
import { addCollect, delCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  props: {
    is_collected: {
      type: Boolean,
      required: true
    }
  },
  created () { },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async onclick () {
      this.isLoading = true
      // console.log(this.$route.params.article_id)
      // 拿取网址后的id
      const target = this.$route.params.article_id
      // this.$meit('update:is_collected', !this.is_collected)
      if (this.is_collected) { // 值是true说明已收藏
        // 取消收藏
        try {
          await delCollect(target)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (error) {
          console.log(error)
        }
      } else {
        // 已收藏
        try {
          await addCollect(target)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (error) {
          console.log(error)
        }
      }
      this.isLoading = false
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
