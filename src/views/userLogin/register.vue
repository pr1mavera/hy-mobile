<template>
  <div class="register">
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
        <!-- 验证码 -->
        <div class="inputItem verCode">
          <div class="userInput">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yanzhengma"></use>
            </svg>
            <input type="text" placeholder="验证码">
          </div>
          <button class="messageCodeBtn">发送短信验证码</button>
        </div>
      </form>
    </div>
    <!-- line - yingxiang -->
    <div class="lineItem lineYX">
      <div class="line"></div>
      <span class="text">《映像活动服务条款》</span>
      <div class="line"></div>
    </div>
    <!-- 主按钮 -->
    <button class="loginBtn">同意条款并注册</button>
  </div>
</template>

<script>
export default {
  mounted() {
    this.resetParams();
  },
  methods: {
    resetParams() {
      this.$route.params.type = 1;
    },
  },
};
</script>

<style lang="less">

</style>
