<template>
  <div class="reset">
    <div class="inputContent">
      <form action="index.html" method="post">
        <!-- 手机号输入框 -->
        <div class="inputItem userInput">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yonghu"></use>
          </svg>
          <input type="text" placeholder="手机号/用户名">
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
        <!-- 新密码输入框 -->
        <div class="inputItem  userInput">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-mima"></use>
          </svg>
          <input type="password" placeholder="新密码（6-16位）">
        </div>
      </form>
    </div>
    <!-- 主按钮 -->
    <button class="loginBtn">重置密码</button>
    <!-- 返回登录页 -->
    <div class="backToLogin">
      返回 <span @click="backToLogin(0)">登录页</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    loginType: {
      type: Number,
    },
  },
  mounted() {
    this.resetParams();
  },
  methods: {
    resetParams() {
      this.$route.params.type = 2;
    },
    backToLogin(index) {
      this.$emit('backToLogin', index);
    },
  },
};
</script>

<style lang="less">

</style>
