<template>
  <div class="fillInTicketMsg">
    <div class="fillInContent">
      <div class="userInput">
        <h1 class="inputTitle border-1px-b">买家信息</h1>
        <p class="massage">门票信息将发送到您和每位订票人的邮箱中</p>
        <userInput-3 :titleSize="14"></userInput-3>
      </div>
      <div class="userInput">
        <h1 class="inputTitle border-1px-b">门票信息</h1>
        <userInputBox :selectTicket="setSelectTicketToArray"></userInputBox>
      </div>
    </div>
    <shopCart ref="shopCart" :select-tickets="selectTickets"></shopCart>
  </div>
</template>

<script type="text/ecmascript-6">
import userInput3 from '@/components/userInput3.vue';
import userInputBox from '@/components/userInputBox.vue';
import shopCart from '@/components/shopCart.vue';

export default {
  props: {
    meeting: {
      type: Object,
    },
    selectTickets: {
      type: Array,
    },
  },
  computed: {
    setSelectTicketToArray() {
      const tickets = [];
      this.selectTickets.forEach((ticket) => {
        for (let i = 0; i < ticket.count; i += 1) {
          tickets.push(ticket);
        }
      });
      return tickets;
    },
  },
  components: {
    userInput3,
    userInputBox,
    shopCart,
  },
};
</script>

<style lang="less">
@import '../../common/style/mixin.less';

.fillInContent {
  width: 100%;
  box-sizing: border-box;
  padding: 0 22px 70px;
  background-color: #ffffff;
  .userInput {
    width: 100%;
    .inputTitle {
      height: 45px;
      line-height: 45px;
      font-size: 16px;
      font-weight: 200;
      .border-1px-b(@border-1px-color);
    }
    .massage {
      height: 40px;
      line-height: 40px;
      font-size: 12px;
      color: @text-color;
    }
  }
}
</style>
