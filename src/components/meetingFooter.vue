<template>
  <div class="meetingFooter">
    <div class="container">
      <h1>映目活动</h1>
      <p class="tel">免费服务热线  400-616-1905</p>
      <p class="bottom">Copyright © 2013-2018 版权所有 北京韦尔科技有限公司
  京ICP备14040981号-2</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
};
</script>

<style lang="less">
.meetingFooter{
  background-color: #2b313c;
  height: 136px;
  text-align: center;
  display: flex;
  .container{
    width: 300px;
    margin: auto;

    h1{
      font-size: 23px;
      color:#2c7dfa;
    }
    p{
      font-size: 14px;
      &.tel{
        color:#ffffff;
        margin:5px 0;
      }
      &.bottom{
        font-size: 12px;
        color:#5d6574;
      }
    }
  }
}
</style>
