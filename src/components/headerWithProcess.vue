<template>
  <div class="headerWithProcess border-1px-b">
    <h1 class="title">2017年国际节能与新能源汽车展览会</h1>
    <div class="process">
      <router-link tag="span" class="processItem" to="selectTicket">选择门票</router-link>
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-you2"></use>
      </svg>
      <router-link tag="span" class="processItem" to="fillInTicketMsg">填写信息</router-link>
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-you2"></use>
      </svg>
      <router-link tag="span" class="processItem" to="success">购买成功</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    activityId: {
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
  .border-1px-b(@border-1px-color);
  .title {
    font-size: 19px;
    color: @text-color-darker;
  }
  .process {
    font-size: 14px;
    color: @text-color;
    .processItem {
      &.router-link-active {
        color: @text-color-darker;
      }
    }
  }
}
</style>
