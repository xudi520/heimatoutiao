<template>
  <div>
    <van-nav-bar title="登录" @click-left="$router.back()">
      <template #left>
        <van-icon name="cross"></van-icon>
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          {
            pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
            message: '不符合手机号码格式',
          },
        ]"
      >
        <!-- <i class="toutiao toutiao-shouji" slot="left-icon"></i> -->
        <MyIcon name="shouji" slot="left-icon"></MyIcon>
      </van-field>

      <van-field
        v-model.trim="code"
        name="code"
        placeholder="验证码"
        :rules="[
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码长度必须是6位数' },
        ]"
      >
        <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>
        <template #button>
          <van-count-down
            :time="time"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            size="small"
            class="yzm"
            native-type="button"
            v-else
            @click="OnSendSms"
          >
            发送验证码
          </van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block native-type="submit" class="login-btn">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '15037695173', // 手机号
      code: '246810', // 短信验证码
      time: 10 * 1000,
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        // console.log(res)
        // token有效俩个小时 俩种思路让用户从新登录
        this.$store.commit('setUser', res.data.data)
        // 跳转到已登录页面
        this.$router.push({ name: 'my' })
      } catch (err) {
        console.log(err)
      }
    },
    async OnSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        this.isCountDownShow = true
        // console.log('校验通过')
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          // console.log(err)
          this.$toast.fail('发送失败')
        }
      } catch (err) {
        // console.log(err)
        console.log('校验失败')
        // 轻提示
        this.$toast.fail('手机号格式不正确')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
  }
}
</script>

<style scoped lang="less">
.toutiao {
  font-size: 37px;
}
.yzm {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  border-radius: 23px;
  font-size: 22px;
  color: #666;
  .van-button__text {
    zoom: 0.95;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  color: #ffffff;
}
.van-count-down {
  position: fixed;
  right: 30px;
}
.yzm {
  position: fixed;
  right: 20px;
}
</style>
