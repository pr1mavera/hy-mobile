<template>
  <div class="cartControl">
    <div class="cart-decrease" @click="decreaseCart" :class="{'btn-disable': !ticket.count}">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon--"></use>
      </svg>
    </div>
{{ticket.count}}
    <div class="cart-count">{{ticket.count ? ticket.count : 0}}</div>
    <div class="cart-add" @click="addCart" :class="{'btn-disable': ticket.count >= (ticket.totalNumber - ticket.sellStatus)}">
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
      debugger;
      if (!this.ticket.count) {
        Vue.set(this.ticket, 'count', 1);
      } else if (this.ticket.count < (this.ticket.totalNumber - this.ticket.sellStatus)) {
        this.ticket.count += 1;
      }
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
    &.btn-disable {
      opacity: .3;
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
