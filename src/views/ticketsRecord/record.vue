<template>
  <div id="record">
    <ul class="sign_list">
      <li class="sign_item" v-for='(item,index) in sigedList' :key='index'>
        <span class="avatar">
          <img :src="defaultAvatar" alt="" >
        </span>
        <span class="username">{{item.confereeName}}</span>
        <span>{{item.confereePhone}}</span>
        <span>{{item.ticketStatus | ticketStatus}}</span>
      </li>
      <li v-if='sigedList.length === 0'><divider>暂无信息</divider></li>
    </ul>
    <div class="btn_group">
      <XButton @click.native='openScanQRCode'>扫码验票</XButton>
      <XButton @click.native='ticketInput=true;focus=1'>签到码验票</XButton>
    </div>
    <confirm
    v-model='ticketSucess'
    :title='ticketInfo.activity.activityTitle'
    confirm-text='确认签到'
    @on-confirm='confirmSign'
    >
    <div class="ticket_confirm">
      <div class="base_info_wrap">
        <div class="info_item">
          <label>姓名</label>
          <span>{{ticketInfo.confereeName}}</span>
        </div>
        <div class="info_item">
          <label>电话</label>
          <span>{{ticketInfo.confereePhone}}</span>
        </div>
      </div>
      <div class="info_item">
        <label>邮箱</label>
        <span>{{ticketInfo.confereeEmail}}</span>
      </div>
      <divider>详情</divider>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shijian"></use>
        </svg>
        {{ticketInfo.activity.startTime}}
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-weizhi"></use>
        </svg>
        {{ticketInfo.activity.address}}
      </div>
    </div>
    </confirm>
     <confirm
    v-model='ticketInput'
    title='请输入签到码'
    confirm-text='确认'
    @on-confirm='checkSignIn(ticketNum)'
    :close-on-confirm='false'
    >
    <group>
      <x-input v-model='ticketNum' placeholder='请输入签到码' :focus='focus === 1'></x-input>
    </group>
    </confirm>
  </div>
</template>

<script>
import { XButton, Confirm, Divider, XInput, Group } from 'vux';
import { signedRecord, signedInfo, confirmSign } from '@/server';
import defaultAvatar from '@/assets/vux_logo.png';

export default {
  data() {
    return {
      defaultAvatar,
      focus: 0,
      ticketInput: false,
      ticketSucess: false,
      ticketNum: '',
      sigedList: [],
      ticketInfo: { activity: {} },
      activityId: this.$route.params.id,
    };
  },
  created() {
    document.title = this.$route.query.activity;
    this.getSignedRecord();
    // this.$vux.confirm.show({
    //   // 组件除show外的属性
    //   onCancel () {
    //     console.log(this) // 非当前 vm
    //     console.log(_this) // 当前 vm
    //   },
    //   onConfirm () {}

    // })
  },
  methods: {
    getSignedRecord() {
      signedRecord(this.activityId).then((res) => {
        this.sigedList = res.data;
      });
    },
    confirmSign() {
      confirmSign(this.activityId, this.ticketInfo.id).then((res) => {
        if (res.code !== 0) {
          this.$vux.toast.text(res.msg);
        } else {
          this.$vux.toast.text(res.msg);
          this.getSignedRecord();
        }
      });
    },
    checkSignIn(code) {
      if (!code) {
        this.$vux.toast.text('请填写正确签到码');
      } else {
        signedInfo(this.activityId, code).then((ticketInfo) => {
          if (ticketInfo.data) {
            const address = JSON.parse(ticketInfo.data.activity.activityAddress);
            this.ticketInfo = ticketInfo.data;
            this.ticketInfo.activity.address = address.province + address.city + address.address;
            this.ticketInput = false;
            this.ticketSucess = true;
          } else {
            this.ticketNum = '';
            this.$vux.alert.show({
              title: '验票失败',
              content: '失败可能原因：过期票、无效票、非本场活动门票、签到码输入有误，或网络异常，请重试验票！',
              buttonText: '知道了',
            });
          }
        });
      }
    },
    openScanQRCode() {
      this.$wechat.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: (res) => {
          const result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          this.checkSignIn(result);
        },
      });
    },
  },
  components: {
    XButton, Confirm, Divider, XInput, Group,
  },
  filters: {
    ticketStatus(source) {
      switch (source) {
        case 0:
          return '未生成';
        case 1:
          return '未签到';
        case 2:
          return '已签到';
        case 3:
          return '待审核';
        case 4:
          return '未通过';
        case 9:
          return '已退票';
        default:
          return '已签到';
      }
    },
  },
};
</script>
<style lang='less'>
#record{
  .sign_list{
    margin: 16px;
    .sign_item{
      padding: 15px;
      background-color: #fff;
      display: flex;
      align-items: center;
      text-align: center;
      .avatar{
        flex: 1;
        border-radius: 50%;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
      span{
        flex: 3;
        color: #5d6574
      }
    }
  }
  .btn_group {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    .weui-btn{
      flex: 1;
      margin: 0;
      border-radius: 0;
      font-size: 16px;
      height: 55px;
      color: #2c7dfa;
      & + .weui-btn{
        border-left: 1px solid #e2e4e8;
      }
      &:after{
        display: none;
      }
    }
  }
  .ticket_confirm{
    font-size: 14px;
    text-align: left;
    .icon{
      margin-right: 10px;
    }
    .base_info_wrap{
      display: flex;
      display: -webkit-flex;
    }
    .info_item{
      display: flex;
      flex-direction: column;
      align-items: baseline;
      min-width: 100px;
      line-height: 32px;
      & > span{
        color: #333;
        font-size: 18px;
      }
    }
  }
  .vux-x-input{
    border: 1px solid #c0c0c0;
    padding: 5px;
    border-radius: 4px;
    font-size: 14px;
  }
}

</style>
