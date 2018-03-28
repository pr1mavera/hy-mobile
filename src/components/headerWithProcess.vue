<template>
  <div class="headerWithProcess border-1px">
    <h1 class="title">{{ticketTitle}}</h1>
    <div class="process">
      <span class="processItem">选择门票</span>
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-you2"></use>
      </svg>
      <span class="processItem">填写信息</span>
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-you2"></use>
      </svg>
      <span class="processItem">购买成功</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
    },
    processType: {
      type: Number,
    },
  },
  computed: {
    ticketTitle() {
      return this.title;
    },
  },
};
</script>

<style lang="less">
@import '../common/style/mixin.less';

.headerWithProcess {
  width: 100%;
  height: 65px;
  text-align: center;
  padding: 25px 0 10px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .border-1px(rgba(216, 219, 224, .7));
  .title {
    font-size: 19px;
    color: #333333;
  }
  .process {
    font-size: 14px;
    color: #999999;
  }
}
</style>
