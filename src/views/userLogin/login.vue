<template>
  <div class="login">
    <div class="inputContent">
      <form action="index.html" method="post">
        <!-- 手机号输入框 -->
        <div class="inputItem userInput">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yonghu"></use>
          </svg>
          <input type="text" placeholder="手机号/用户名">
        </div>
        <!-- 密码输入框 -->
        <div class="inputItem userInput">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-mima"></use>
          </svg>
          <input type="password" placeholder="密码">
        </div>
        <!-- 滑动验证 -->
        <div class="inputItem slide">
          <div class="sliderBtn"> &gt;&gt;</div>
          <span class="sliderText">按住滑块拖到最右侧，完成验证</span>
        </div>
      </form>
      <!-- 保存密码 & 记住密码 -->
      <div class="pagination">
        <span class="paginationItem remPW">
          <input type="checkbox" id="iconfont"/>
          <label for="iconfont"></label>
          <span class="label">保存密码</span>
        </span>
        <span class="paginationItem forgetPW" @click="forgetPW(2)">
          <span class="label">忘记密码?</span>
        </span>
      </div>
    </div>
    <!-- 主按钮 -->
    <button class="loginBtn">立即登录</button>
    <!-- line - or -->
    <div class=" lineItem lineOr">
      <div class="line"></div>
      <span class="text">or</span>
      <div class="line"></div>
    </div>
    <!-- 微信登录按钮 -->
    <button class="weixinloginBtn">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-weixin"></use>
      </svg>
      <span class="text" @click="loginByWeixin(3)">微信登录</span>
    </button>
  </div>
</template>

<script>
export default {
  mounted() {
    this.resetParams();
  },
  methods: {
    resetParams() {
      this.$route.params.type = 0;
    },
    forgetPW(index) {
      this.$emit('forgetPW', index);
    },
    loginByWeixin(index) {
      this.$emit('loginByWeixin', index);
    },
  },
};
</script>

<style lang="less">

</style>
