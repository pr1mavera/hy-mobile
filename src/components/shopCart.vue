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
      <div class="contentLight" @click="clickToNextRoute">
        <div class="next">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'selTickets',
      'query',
      'firstEditData',
      'ticketsRecordList',
    ]),
    totalPrice() { // 计算所选商品总价格
      let total = 0;
      this.selTickets.forEach((ticket) => {
        total += ticket.ticketPrice * ticket.count;
      });
      return total;
    },
    totalCount() { // 计算所选商品总数(传递给父组件)
      let count = 0;
      this.selTickets.forEach((ticket) => {
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
  methods: {
    clickToNextRoute() {
      // const nextRoute = this.$route.name === 'selectTicket' ? 'fillInTicketMsg' : 'success';
      // 跳转的时候添加判断
      if (this.$route.name === 'selectTicket') {
        // 判断是否选票
        if (this.totalCount >= 1) {
          this.$router.push({
            path: 'fillInTicketMsg',
            query: this.query,
          });
        } else {
          console.log('请先选择门票');
          this.$vux.alert.show({
            title: '警告',
            content: '请先选择门票！',
            buttonText: '知道了',
          });
        }
      } else if (this.$route.name === 'fillInTicketMsg') {
        // 判断是否填写个人信息
        /* eslint-disable */
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
        if (this.firstEditData.name !== '' && this.firstEditData.phone !== '' && this.firstEditData.email !== '' && judge) {
          this.$router.push({
            path: 'success',
            query: this.query,
          });
        } else {
          this.$vux.alert.show({
            title: '警告',
            content: '请先完善个人信息',
            buttonText: '知道了',
          });
        }
      } else if (this.$route.name === 'success') {
        // if (false) {
        //   // 未审核
        //   console.log('存在未选择的票');
        // } else {
        //   this.$router.push({
        //     path: 'selectTicket',
        //     query: this.query,
        //   });
        // }
      }
      // this.$router.push({
      //   path: nextRoute,
      //   query: this.query,
      // });
    },
  },
};
</script>

<style lang="less">
@import '../common/style/mixin.less';

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
        color: @text-color;
      }
      .priceU {
        color: @text-color-yellow;
      }
      .price {
        &.highLight {
          color: @text-color-yellow;
        }
        &.highLightFree {
          color: @text-color-green;
        }
      }
    }
    .contentLight {
      width: 140px;
      height: 100%;
      text-align: center;
      color: #ffffff;
      background-color: @theme-blue;
    }
  }
}
</style>
