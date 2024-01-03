<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="isDelete === true">
        <span @click="$store.commit('delAllHistory')">全部删除</span
        >&nbsp;&nbsp;
        <span @click="isDelete = false">完成</span>
      </template>
      <!-- 删除图标 -->
      <van-icon name="delete" @click="isDelete = true" v-else />
    </van-cell>

    <van-cell
      :title="item"
      v-for="(item, index) in searchHistoryList"
      :key="index"
      @click="$emit('search', item)"
    >
      <van-icon
        name="close"
        v-if="isDelete === true"
        @click.stop="$store.commit('delHistory', index)"
      />
      <!-- stop 阻止冒泡 -->
    </van-cell>
  </div>
</template>

<script>
// vuex 全局绑定属性 任何一个页面都可以使用
import { mapState } from 'vuex'
export default {
  name: 'SearchHistory',
  components: {},
  props: {},
  data () {
    return {
      isDelete: false
    }
  },
  // computed计算属性
  computed: {
    ...mapState(['searchHistoryList'])
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style scoped lang="less"></style>
