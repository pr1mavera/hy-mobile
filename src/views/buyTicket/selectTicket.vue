<template>
  <div class="selectTickets">
    <div class="ticketWrapper">
      <ul>
        <li v-for="(ticket, index) in this.tickets" :key='index' class="ticketList" :class="{'borderHighLight': ticket.count > 0}">
          <div class="content border-1px-b">
            <h1 class="title">{{ticket.ticketName}}</h1>
            <p class="priceU" v-if="ticket.ticketPrice">￥</p>
            <p class="price"
              :class="{'highLightFree': ticket.ticketPrice == 0}">
              {{ticket.ticketPrice ? ticket.ticketPrice : '免费'}}
            </p>
            <XNumberSetCount
              class="cartControl"
              :ticket="ticket"
              @countChangeWithId="countChangeWithId"
              >
            </XNumberSetCount>
            <span class="sellOut" v-if="!(ticket.totalNumber - ticket.sellStatus)">已售罄</span>
          </div>
          <div class="type">
            <p class="typeItem" v-if="ticket.isCheck">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-shenhe"></use>
              </svg>
              <span class="text">此门票需要主办方审核</span>
            </p>
            <p class="typeItem" v-if="ticket.isCheck">
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
  </div>
</template>

<script>
import XNumberSetCount from '@/components/XNumberSetCount.vue';
import { mapMutations, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'tickets',
      'selTickets',
    ]),
  },
  updated() {
    // 页面跳转置顶
    window.scroll(0, 0);
  },
  methods: {
    countChangeWithId(id, val) { // 响应子组件事件方法 (门票的id及购买门票的数量)
      this.$emit('countChangeWithId', id, val);
    },
    ...mapMutations({
      ticketChangeCount: 'SET_TICKETS',
      setSelTicketsByChangeCount: 'SET_SELTICKETS',
      setQuery: 'SET_QUERY',
    }),
  },
  components: {
    XNumberSetCount,
  },
};
</script>

<style lang="less">
@import '../../common/style/mixin.less';

Body {
  background-color: #f4f7fa;
}
.routerBody {
  background-color: #f4f7fa;
}
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
        .weui-cells {
          margin-top: 0;
        }
        .weui-cells:after, .weui-cell:before, .weui-cell:after {
          display: none;
        }
        .weui-cell {
          padding: 0;
          .vux-number-round {
            .vux-number-selector {
              margin-right: 0;
              border: 1px solid #dddddd;
              background-color: #f3f4f8;
              border-radius: 0;
              svg {
                fill: @text-color;
              }
            }
            .vux-number-disabled {
              opacity: .4;
            }
          }
        }
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
