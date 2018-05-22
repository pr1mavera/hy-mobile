<template>
  <div class="success">
    <div class="orderType">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-chenggong" v-if="feedback.code === 0"></use>
          <use xlink:href="#icon-shibai" v-if="feedback.code === 1"></use>
          <use xlink:href="#icon-dengdaishenhe" style="color: #ff9041;" v-if="feedback.code === -1"></use>
      </svg>
      <span class="text" v-if="feedback.code !== -1">购票{{feedback.code ? '失败' : '成功'}}！</span>
      <span class="text" v-if="feedback.code === -1">等待审核！</span>
    </div>
    <div class="msgContent" v-if="feedback.code !== 1">
      <p class="text" v-if="feedback.code === 0">您的订单及门票信息已下发到您的邮箱，请注意查收！若未收到邮件，请查看垃圾邮件是否屏蔽。</p>
      <p class="text" v-if="feedback.code === -1">您本次申请的门票需要组织者审核，审核结果将发送至您的邮箱，请注意查收。</p>
      <p class="text">订单号：<span class="orderNum">{{feedback.message.orderNum}}</span></p>
      <p class="text">订票时间：<span class="orderTime">{{feedback.message.orderTime}}</span></p>
      <div class="QRbox">
        <img :src="feedback.message.QRcode" alt="二维码" width="150" height="150">
        <p class="QRtext">长按保存</p>
        <p class="QRtext">微信扫码领取电子票</p>
      </div>
    </div>
    <div class="orderBtn">
      <button class="btnItem" type="button" name="button" @click="ticketMsgFn" v-if="feedback.code !== -1" :class="{'btnItemHighLight': feedback.code}">{{feedback.code ? '重新购买' : '查看门票'}}</button>
      <button class="btnItem" type="button" name="button" @click="$router.push('/')">返回首页</button>
    </div>
    <!-- <scan-tickets :activity="activityMsg" :currentTicket="currentTicket" :showTicket="showTicket"></scan-tickets> -->
  </div>
</template>

<script>
import { purchaseTicket } from '@/server';
import { mapGetters } from 'vuex';

export default {
  props: {
    tickets: {
      type: Array,
    },
    selectTickets: {
      type: Array,
    },
  },
  data() {
    return {
      // 假数据
      feedback: {
        code: 0,
        message: {
          orderNum: '', // 订单号
          orderTime: '', // 订票时间
          QRcode: '', // 二维码
          overTime: '', // 二维码失效时间
        },
        // code: 1,
        // message: {
        //   error: '',
        // },
        // code: -1,
        // message: {
        //   orderNum: '518032490929310',
        //   orderTime: '2018-03-26 14:36:56',
        //   QRcode: 'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=fa9140accd95d143ce7bec711299e967/2934349b033b5bb571dc8c5133d3d539b600bc12.jpg',
        // },
      },
      userMsg: { // 买家信息和门票信息
        buyer: '', // （必填）
        buyerPhone: '', // （必填）
        buyerEmail: '', // （必填）
        ticketsRecordList: [],
      },
      // showTicket: false,
      // activityMsg: {
      //   activityTitle: '',
      // }, // 会议信息
      // currentTicket: {
      //   ticketsName: '',
      // }, // 买票成功后返回信息
    };
  },
  computed: {
    ...mapGetters([
      'activityId',
      'firstEditData',
      'ticketsRecordList',
      'id',
    ]),
  },
  components: {
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.userMsg.buyer = this.firstEditData.name;
      this.userMsg.buyerPhone = this.firstEditData.phone;
      this.userMsg.buyerEmail = this.firstEditData.email;
      this.userMsg.ticketsRecordList = this.ticketsRecordList;
      // console.log(this.userMsg, 'success');
      /* eslint-disable */
      purchaseTicket(this.activityId, this.userMsg).then((res) => {
        if (res.code === 0) {
          this.feedback.message.QRcode = res.data.qrcodeTicketUrl;
          this.feedback.message.orderNum = res.data.orderNo;
          this.feedback.message.orderTime = res.data.createTime;
          this.feedback.message.overTime = res.data.overTime;
        }
        // console.log(res, 123);
      });
    },
    ticketMsgFn() {
      // 购买成功(等待审核，购票成功，购票失败)
      if (this.feedback.code === 0) {
        // 跳转查看门票
        this.$router.push(`/usercenter/partake/${this.id}`);
      }
    },
  },
};
</script>

<style lang="less">
@import '../../common/style/mixin.less';

Body {
  background-color: #ffffff;
}
.success {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  .orderType {
    padding: 30px 0;
    text-align: center;
    .icon {
      font-size: 35px;
      #icon-dengdaishenhe {
        color: #ff9041;
      }
    }
    .text {
      display: inline-block;
      vertical-align: top;
      line-height: 35px;
      margin-left: 10px;
      font-size: 20px;
    }
  }
  .msgContent {
    width: calc(~'100% - 60');
    padding: 0 30px;
    p:first-child {
      margin-bottom: 15px;
    }
    .text {
      color: @text-color;
      font-size: 14px;
      text-align: center;
      font-weight: 200;
      span {
        color: @text-color-darker;
      }
    }
    .QRbox {
      width: 170px;
      margin: 35px auto 15px;
      text-align: center;
      img {
        padding: 10px;
        box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, .07);
      }
      .QRtext {
        font-size: 14px;
        color: @text-color;
      }
    }
  }
  .orderBtn {
    display: flex;
    justify-content: center;
    .btnItem {
      width: 115px;
      height: 40px;
      padding: 0;
      margin: 0 10px;
      background-color: #ffffff;
      border: 1px solid rgba(144, 152, 168, .2);
      border-radius: 3px;
      font-size: 14px;
      color: @text-color;
      outline: none;
      &.btnItemHighLight {
        border-color: @warning-red;
        color: @warning-red;
      }
    }
  }
}
</style>
