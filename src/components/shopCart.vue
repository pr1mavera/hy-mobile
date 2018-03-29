<template>
  <div class="shopcart">
    <div class="content">
      <div class="contentLeft">
        <p>总价：</p>
        <p class="priceU" v-if="totalPrice">￥</p>
        <p class="price"
          :class="[
            {'highLight': totalPrice > 0},
            {'highLightFree': totalCount > 0 && totalPrice == 0}
          ]">
          {{showTotalPrice}}
        </p>
      </div>
      <div class="contentLight">
        <div class="next">下一步</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    selectTickets: {
      type: Array,
    },
  },
  computed: {
    totalPrice() { // 计算所选商品总价格
      let total = 0;
      this.selectTickets.forEach((ticket) => {
        total += ticket.price * ticket.count;
      });
      return total;
    },
    totalCount() { // 计算所选商品总数
      let count = 0;
      this.selectTickets.forEach((ticket) => {
        count += ticket.count;
      });
      return count;
    },
    showTotalPrice() { // 总价格显示方式
      if (this.totalCount === 0) {
        return 0;
      } else if (this.totalCount !== 0 && this.totalPrice === 0) {
        return '免费';
      }
      return this.totalPrice;
    },
  },
};
</script>

<style lang="less">
.shopcart {
  position: fixed;
  bottom: 0;
  width: 100%;
  .content {
    display: flex;
    align-items: center;
    width: 100%;
    height: 55px;
    line-height: 55px;
    box-shadow: 0px -2px 3px 2px rgba(44, 125, 250, .05);
    .contentLeft {
      width: calc(~"100% - 140px");
      box-sizing: border-box;
      padding-left: 25px;
      height: 100%;
      background-color: #ffffff;
      p {
        display: inline-block;
        color: #9098a8;
      }
      .priceU {
        color: #ff9041;
      }
      .price {
        &.highLight {
          color: #ff9041;
        }
        &.highLightFree {
          color: #07d79c;
        }
      }
    }
    .contentLight {
      width: 140px;
      height: 100%;
      text-align: center;
      color: #ffffff;
      background-color: #2c7dfa;
    }
  }
}
</style>
