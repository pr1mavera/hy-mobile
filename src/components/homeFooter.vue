<template>
  <footer class="homeFooter">
    <p class="text"><span> 会议站 </span></p>
    <p class="text phone">免费服务热线 <i>400-616-1905</i></p>
    <p class="text">Copyright &copy; 2013-2018 版权所有 北京韦尔科技有限公司</p>
    <p class="text">京ICP备14040981号-2</p>
  </footer>
</template>

<script type="text/ecmascript-6">
export default {

};
</script>

<style lang="less">
.homeFooter {
  position: relative;
  height: 134px;
  margin-top: -134px;
  background-color: #2b313c;
  color: #5d6574;
  text-align: center;
  padding: 12px 0;
  box-sizing: border-box;
  clear: both;
  .text {
    font-size: 12px;
    font-weight: 200;
    line-height: 22px;
    &.phone {
      color: #ffffff;
      i {
        font-weight: 700;
      }
    }
    span {
      font-size: 24px;
      line-height: 44px;
      font-weight: 700;
      color: #1191ff;
    }
  }
}
</style>
