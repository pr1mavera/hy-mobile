<template>
  <div class="buyTicket">
    <div class="header">
      <headerWithProcess :title="meeting.title" :processType="1"></headerWithProcess>
    </div>
    <div class="ticketWrapper">
      <ul>
        <li v-for="ticket in meeting.tickets.list" class="ticketList">
          <div class="content border-1px">
            <h1 class="title">{{ticket.name}}</h1>
            <p class="price">￥{{ticket.price}}</p>
            <cartControl :ticket="ticket"></cartControl>
          </div>
          <div class="type">
            <p class="typeItem" v-if="ticket.needVerify">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-shenhe"></use>
              </svg>
              <span class="text">此门票需要主办方审核</span>
            </p>
            <p class="typeItem" v-if="ticket.needVerify">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-tanhao"></use>
              </svg>
              <span class="text">该票不予开具发票</span>
            </p>
          </div>
        </li>
      </ul>
      <span class="refund">退款说明：不支持退票</span>
    </div>
    <shopCart ref="shopCart" :select-tickets="selectTickets"></shopCart>
  </div>
</template>

<script type="text/ecmascript-6">
import headerWithProcess from '@/components/headerWithProcess.vue';
import cartControl from '@/components/cartControl.vue';
import shopCart from '@/components/shopCart.vue';

export default {
  data() {
    return {
      meeting: {
        code: 0,
        title: '2017年国际节能与新能源汽车展览会',
        tickets: {
          list: [
            {
              name: '1月12日门票',
              surplus: 45,
              price: 0,
              needVerify: true,
              canInvoice: false,
            },
            {
              name: 'VIP贵宾票',
              surplus: 15,
              price: 99,
              needVerify: true,
              canInvoice: true,
            },
            {
              name: 'VIP早鸟票',
              surplus: 0,
              price: 59,
              needVerify: true,
              canInvoice: true,
            },
            {
              name: '1月12日门票',
              surplus: 45,
              price: 0,
              needVerify: true,
              canInvoice: false,
            },
            {
              name: 'VIP贵宾票',
              surplus: 15,
              price: 99,
              needVerify: true,
              canInvoice: true,
            },
            {
              name: 'VIP早鸟票',
              surplus: 0,
              price: 59,
              needVerify: true,
              canInvoice: true,
            },
          ],
          total: 60,
        },
      },
    };
  },
  computed: {
    selectTickets() {
      const tickets = [];
      this.meeting.tickets.list.forEach((ticket) => {
        if (ticket.count) {
          tickets.push(ticket);
        }
      });
      return tickets;
    },
  },
  created() {

  },
  methods: {

  },
  components: {
    headerWithProcess,
    cartControl,
    shopCart,
  },
};
</script>

<style lang="less">
@import '../common/style/mixin.less';

.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
}
.ticketWrapper{
  font-size: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(~'100% - 36px');
  padding: 18px 18px 73px;
  margin-top: 100px;
  ul > li.ticketList {
    margin-bottom: 18px;
    background-color: #ffffff;
    font-size: 14px;
    border-radius: 3px;
    box-shadow: 0px 2px 3px 2px rgba(44, 125, 250, .05);
    list-style: none;
    .content {
      padding: 20px 18px 10px;
      .border-1px(rgba(216, 219, 224, .7));
      .title {
        font-size: 16px;
        font-weight: 200;
      }
      .price {
        color: #ff9041;
        line-height: 30px;
      }
      .cartControl {
        position: absolute;
        right: 18px;
        top: 25px;
      }
    }
    .type {
      padding: 14px 18px;
      .typeItem {
        line-height: 26px;
        .icon {
          color: #2c7dfa;
        }
        .text {
          color: #5d6574;
        }
      }
    }
  }
  .refund {
    font-size: 14px;
    color: #ff4b40;
  }
}
</style>
