<template>
  <div class="headerWithProcess border-1px-b">
    <h1 class="title">{{this.activityId}}</h1>
    <div class="process">
      <router-link tag="span" class="processItem" :to="{ path: 'selectTicket', name: 'selectTicket', query: this.query ? this.query : {}}">选择门票</router-link>
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-you2"></use>
      </svg>
      <router-link tag="span" class="processItem" :to="{ path: 'fillInTicketMsg', name: 'fillInTicketMsg', query: this.query ? this.query : {}}">填写信息</router-link>
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-you2"></use>
      </svg>
      <router-link tag="span" class="processItem" :to="{ path: 'success', name: 'success'}">购买成功</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'activityId',
      'query',
    ]),
    ticketTitle() {
      return this.title;
    },
  },
  methods: {

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
