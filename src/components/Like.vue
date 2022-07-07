<template>
  <van-loading v-if="isLoading" size=".53333rem" />
  <van-icon
    v-else
    color="#777"
    :name="like_count ? 'good-job' : 'good-job-o'"
    @click="onclick"
  />
  <!-- $emit('update:like_count', !this.like_count) -->
</template>

<script>
import { allLike, delLike } from '@/api/article'
export default {
  name: 'Like',
  props: {
    like_count: {
      type: [Boolean, Number],
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
      const target = this.$route.params.article_id
      if (this.like_count) {
        try {
          await delLike(target)
          this.$emit('update:like_count', !this.like_count)
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          await allLike(target)
          this.$emit('update:like_count', !this.like_count)
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
