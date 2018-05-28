<template>
  <div class="success">
    <div class="orderType">
      <svg :class="['icon', feedback.code === 1 ?'ex-icon' : '']" aria-hidden="true">
          <use xlink:href="#icon-chenggong" v-if="feedback.code === 0"></use>
          <use xlink:href="#icon-shibai" v-if="feedback.code === -1"></use>
          <use xlink:href="#icon-dengdaishenhe" v-if="feedback.code === 1"></use>
      </svg>
      <span class="text" v-if="feedback.code !== 1">购票{{feedback.code ? '失败' : '成功'}}！</span>
      <span class="text" v-if="feedback.code === 1">等待审核！</span>
    </div>
    <div class="msgContent" v-if="feedback.code !== -1">
      <p class="text" v-if="feedback.code === 0">您的订单及门票信息已下发到您的邮箱，请注意查收！若未收到邮件，请查看垃圾邮件是否屏蔽。</p>
      <p class="text" v-if="feedback.code === 1">您本次申请的门票需要组织者审核，审核结果将发送至您的邮箱，请注意查收。</p>
      <p class="text">订单号：<span class="orderNum">{{feedback.message.orderNum}}</span></p>
      <p class="text">订票时间：<span class="orderTime">{{feedback.message.orderTime}}</span></p>
      <div class="QRbox">
        <img v-if="feedback.message.code !== -1" :src="feedback.message.QRcode" alt="二维码" width="150" height="150">
        <loading :show="loadingQrcode" tip="订单已提交，请等待"></loading>
        <p class="QRtext">长按保存</p>
        <p class="QRtext">微信扫码领取电子票</p>
      </div>
    </div>
    <div class="orderBtn">
      <button class="btnItem" type="button" name="button" @click="ticketMsgFn" v-if="feedback.code !== 1" :class="{'btnItemHighLight': feedback.code}">{{feedback.code ? '重新购买' : '查看门票'}}</button>
      <button class="btnItem" type="button" name="button" @click="backhomeFn">返回首页</button>
    </div>
    <!-- <scan-tickets :activity="activityMsg" :currentTicket="currentTicket" :showTicket="showTicket"></scan-tickets> -->
  </div>
</template>

<script>
/* eslint-disable */
import { purchaseTicket } from '@/server';
import { mapGetters } from 'vuex';
import { AlertModule, Loading } from 'vux';
// import conf from '@/config/index';

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
        code: Number, // 0：购票成功，-1： 购票失败, 1: 待审核
        message: {
          orderNum: '', // 订单号
          orderTime: '', // 订票时间
          QRcode: '', // 二维码
          overTime: '', // 二维码失效时间
        },
      },
      userMsg: { // 买家信息和门票信息
        buyer: '', // （必填）
        buyerPhone: '', // （必填）
        buyerEmail: '', // （必填）
        ticketsRecordList: [],
      },
      currentUser: {
        id: '',
      }, // 判断当前用户是否登录
      loadingQrcode: true, // 二维码渲染之前loading
    };
  },
  computed: {
    ...mapGetters([
      'activityId',
      'firstEditData',
      'ticketsRecordList',
      'id', // 用户id
    ]),
  },
  components: {
    AlertModule,
    Loading,
  },
  mounted() {
    this.dealData();
  },
  updated() {
    // 页面跳转置顶
    window.scroll(0, 0);
  },
  methods: {
    dealData() {
      // 判断sessionStorage有无数据
      var successMsg = null;
      successMsg = sessionStorage.getItem('successMsg');
      if (successMsg) {
        successMsg = JSON.parse(successMsg);
        this.feedback.message.QRcode = successMsg.qrcodeTicketUrl;
        this.feedback.message.orderNum = successMsg.orderNo;
        this.feedback.message.orderTime = successMsg.createTime;
        this.feedback.message.overTime = successMsg.overTime;
        this.feedback.code = successMsg.isCheckView === 0 ? 0 : 1;
        this.loadingQrcode = false;
      } else {
        this.postUserFn();
      }
    },
    postUserFn() {
      this.userMsg.buyer = this.firstEditData.name;
      this.userMsg.buyerPhone = this.firstEditData.phone;
      this.userMsg.buyerEmail = this.firstEditData.email;
      this.userMsg.ticketsRecordList = this.ticketsRecordList;
      // 提交请求之前判断一下，有无信息
      purchaseTicket(this.activityId, this.userMsg).then((res) => {
        if (res.code === 0) {
          this.feedback.message.QRcode = res.data.qrcodeTicketUrl;
          this.feedback.message.orderNum = res.data.orderNo;
          this.feedback.message.orderTime = res.data.createTime;
          this.feedback.message.overTime = res.data.overTime;
          this.loadingQrcode = false;
          // isCheckView; //是否显示需要审核页面 0：否  1：是   用于下单返回前端的标志位
          this.feedback.code = res.data.isCheckView === 0 ? 0 : 1;
          // 购票成功，存储信息
          sessionStorage.setItem('successMsg', JSON.stringify(res.data));
        } else {
          this.feedback.code = -1;
          this.$vux.alert.show({
            title: '提示：',
            content: res.msg,
          })
          // sessionStorage.setItem('successMsg', '');
        }
      });
    },
    ticketMsgFn() { // 查看门票
      // 购买成功(购票成功，购票失败)
      if (this.id) {
        if (this.feedback.code === 0) {
          // 跳转查看门票
          this.$router.push(`/usercenter/partake/${this.id}`);
        } else if (this.feedback.code === -1) {
          // 购票失败，重新购买
          this.$router.push(`/buyTicket/${this.activityId}/`);
        }
      } else {
        // 用户未登录
        this.$vux.alert.show({
          title: '提示',
          content: '当前用户未登录，不能查看门票',
        });
        // AlertModule.show({
        //   title: '当前用户未登录！',
        //   content: '前往登录？',
        //   onHide() {
        //     // console.log('Plugin: I\'m hiding now');
        //     window.location.href = 'http://login.ourwill.cn/login';
        //   },
        // });
      }
    },
    backhomeFn() { // 返回首页
      // const host=window.location.host;
      // this.$router.push('/');
      window.location.href="/";
    }
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
  height: 100vh;
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
    .ex-icon{
      color: #ff9041;
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
