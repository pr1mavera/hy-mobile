<template>
  <div class="selectTickets">
    <div class="ticketWrapper">
      <ul>
        <li v-for="ticket in meeting.tickets.list" class="ticketList" :class="{'borderHighLight': ticket.count > 0}">
          <div class="content border-1px-b">
            <h1 class="title">{{ticket.name}}</h1>
            <p class="priceU" v-if="ticket.price">￥</p>
            <p class="price"
              :class="{'highLightFree': ticket.price == 0}">
              {{ticket.price ? ticket.price : '免费'}}
            </p>
            <cartControl :ticket="ticket" v-if="ticket.surplus"></cartControl>
            <span class="sellOut" v-if="!ticket.surplus">已售罄</span>
          </div>
          <div class="type">
            <p class="typeItem" v-if="ticket.needVerify">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-shenhe"></use>
              </svg>
              <span class="text">此门票需要主办方审核</span>
            </p>
            <p class="typeItem" v-if="ticket.canInvoice">
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
import cartControl from '@/components/cartControl.vue';
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
  computed: {},
  components: {
    cartControl,
    shopCart,
  },
};
</script>

<style lang="less">
@import '../../common/style/mixin.less';

.ticketWrapper{
  font-size: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  padding: 18px 18px 73px;
  // margin-top: 100px;
  ul > li.ticketList {
    margin-bottom: 18px;
    background-color: #ffffff;
    font-size: 14px;
    border-radius: 3px;
    box-sizing: border-box;
    border: 1px solid #ffffff;
    box-shadow: 0px 2px 3px 2px rgba(44, 125, 250, .05);
    list-style: none;
    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46);
    &.borderHighLight {
      border-color: @theme-blue;
    }
    .content {
      padding: 20px 18px 10px;
      .border-1px-b(@border-1px-color);
      .title {
        font-size: 16px;
        font-weight: 200;
      }
      p {
        display: inline-block;
        line-height: 30px;
        color: @text-color-yellow;
      }
      .price {
        &.highLightFree {
          color: @text-color-green;
        }
      }
      .cartControl {
        position: absolute;
        right: 18px;
        top: 25px;
      }
      .sellOut {
        position: absolute;
        right: 40px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 16px;
        color: @text-color;
      }
    }
    .type {
      padding: 14px 18px;
      .typeItem {
        line-height: 26px;
        .icon {
          color: @theme-blue;
        }
        .text {
          color: @text-color-dark;
        }
      }
    }
  }
  .refund {
    font-size: 14px;
    color: @warning-red;
  }
}
</style>
