<template>
  <div class="cartControl">
    <div class="cart-decrease" @click="decreaseCart">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xinzeng"></use>
      </svg>
    </div>
    <div class="cart-count">{{ticket.count ? ticket.count : 0}}</div>
    <div class="cart-add" @click="addCart">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xinzeng"></use>
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
.cartControl {
  font-size: 0;
  .cart-decrease, .cart-add {
    display: inline-block;
    padding: 4px;
    line-height: 16px;
    font-size: 16px;
    color: #9098a8;
    background-color: #f3f4f8;
    border: 1px solid #dddddd;
  }
  .cart-decrease {

  }
  .cart-count {
    display: inline-block;
    vertical-align: top;
    // width: 12px;
    padding: 0 12px;
    line-height: 26px;
    text-align: center;
    font-size: 16px;
    color: #5d6574;
  }
}

</style>
