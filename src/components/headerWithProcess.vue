<template>
  <div class="headerWithProcess border-1px-b">
    <h1 class="title">{{this.activityId}}</h1>
    <div class="process">
      <router-link tag="span" class="processItem" :to="{ path: 'selectTicket', name: 'selectTicket', query: this.query ? this.query : {}}">选择门票</router-link>
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-you2"></use>
      </svg>
      <!-- <router-link tag="span" class="processItem" :to="{ path: 'fillInTicketMsg', name: 'fillInTicketMsg', query: this.query ? this.query : {}}">填写信息</router-link> -->
      <span tag="span" class="processItem" @click="toMsgFn">填写信息</span>
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-you2"></use>
      </svg>
      <!-- <router-link tag="span" class="processItem" :to="{ path: 'success', name: 'success'}">购买成功</router-link> -->
      <span tag="span" class="processItem" @click='toSuccessFn'>购买成功</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'activityId',
      'query',
      'selTickets',
      'firstEditData',
      'ticketsRecordList',
    ]),
    ticketTitle() {
      return this.title;
    },
    totalCount() { // 计算所选商品总数(传递给父组件)
      let count = 0;
      this.selTickets.forEach((ticket) => {
        count += ticket.count;
      });
      return count;
    },
  },
  methods: {
    // 判断是否选择门票之后跳转
    toMsgFn() {
      if (this.totalCount >= 1) {
        this.$router.push({
          path: 'fillInTicketMsg',
          query: this.query,
        });
      } else {
        this.$vux.alert.show({
          title: '警告',
          content: '请先选择门票！',
          buttonText: '知道了',
        });
      }
    },
    /* eslint-disable */
    // 判断个人信息是否完善之后跳转
    toSuccessFn() {
      var judge = false;
      for (let i = 0; i < this.ticketsRecordList.length; i += 1) {
        for(let j in this.ticketsRecordList[i]) {
          if (this.ticketsRecordList[i][j] !== '') {
            judge = true;
          } else {
            judge = false;
          }
        }
      }
      if (this.firstEditData.name !== '' && this.firstEditData.phone !== 0 && this.firstEditData.email !== '' && judge) {
        this.$router.push({
          path: 'success',
          query: this.query,
        });
      } else if (this.$route.name === 'selectTicket') {
        this.$vux.alert.show({
          title: '警告',
          content: '请先选择门票！',
          buttonText: '知道了',
        });
      } else if (this.$route.name === 'fillInTicketMsg') {
        this.$vux.alert.show({
          title: '警告',
          content: '请先完善个人信息！',
          buttonText: '知道了',
        });
      }
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
