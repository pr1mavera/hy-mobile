<template>
  <div class="cartControl">
    <div class="cart-decrease" @click="decreaseCart" :class="{'btn-enable': ticket.count > 0}">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon--"></use>
      </svg>
    </div>
    <div class="cart-count">{{ticket.count ? ticket.count : 0}}</div>
    <div class="cart-add" @click="addCart">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon-test"></use>
      </svg>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';

export default {
  props: {
    ticket: {
      type: Object,
    },
  },
  methods: {
    addCart() {
      if (!this.ticket.count) {
        Vue.set(this.ticket, 'count', 1);
      } else {
        this.ticket.count += 1;
      }
      // this.$dispatch('cart.add', event.target)
    },
    decreaseCart() {
      if (this.ticket.count) {
        this.ticket.count -= 1;
      }
    },
  },
};
</script>

<style lang="less">
@import '../common/style/mixin.less';

.cartControl {
  font-size: 0;
  .cart-decrease, .cart-add {
    display: inline-block;
    padding: 6px;
    line-height: 14px;
    font-size: 14px;
    color: @text-color;
    background-color: #f3f4f8;
    border: 1px solid #dddddd;
  }
  .cart-decrease {
    opacity: .3;
    &.btn-enable {
      opacity: 1;
    }
  }
  .cart-count {
    display: inline-block;
    vertical-align: top;
    // width: 12px;
    padding: 0 12px;
    line-height: 26px;
    text-align: center;
    font-size: 16px;
    color: @text-color-dark;
  }
}

</style>
