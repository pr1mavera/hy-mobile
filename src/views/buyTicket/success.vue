<template>
  <div class="success">
    <div class="orderType">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-chenggong" v-if="feedback.typeCode === 1"></use>
          <use xlink:href="#icon-shibai" v-if="feedback.typeCode === 0"></use>
      </svg>
      <span class="text">购票{{feedback.typeCode ? '成功' : '失败'}}！</span>
    </div>
    <div class="msgContent" v-if="feedback.typeCode === 1">
      <p class="text">您的订单及门票信息已下发到您的邮箱，请注意查收！若未收到邮件，请查看垃圾邮件是否屏蔽。</p>
      <p class="text">订单号：<span class="orderNum">{{feedback.massage.orderNum}}</span></p>
      <p class="text">订票时间：<span class="orderTime">{{feedback.massage.orderTime}}</span></p>
      <div class="QRbox">
        <img :src="feedback.massage.QRcode" alt="二维码" width="150" height="150">
        <p class="QRtext">长按保存</p>
        <p class="QRtext">微信扫码领取电子票</p>
      </div>
    </div>
    <div class="orderBtn">
      <button class="btnItem" type="button" name="button" :class="{'btnItemHighLight': !feedback.typeCode}">{{feedback.typeCode ? '查看门票' : '重新购买'}}</button>
      <button class="btnItem" type="button" name="button">返回首页</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
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
      feedback: {
        typeCode: 1,
        massage: {
          orderNum: '41665212851523654',
          orderTime: '2018-03-26 14:36:56',
          QRcode: 'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=fa9140accd95d143ce7bec711299e967/2934349b033b5bb571dc8c5133d3d539b600bc12.jpg',
        },
        // typeCode: 0,
        // massage: {
        //   error: '',
        // },
      },
    };
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
    justify-content: space-between;
    width: 250px;
    margin: 0 auto 60px;
    .btnItem {
      width: 115px;
      height: 40px;
      padding: 0;
      margin: 0;
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
