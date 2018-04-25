<template>
  <div id="record">
    <ul class="sign_list">
      <li class="sign_item" v-for='item in sigedList'>
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
      <XButton @click='openScanQRCode'>扫码验票</XButton>
      <XButton>签到码验票</XButton>
    </div>
    <confirm
    v-model='ticketSucess'
    title='2019w我的那科技卡到我空间大打的'
    confirm-text='确认签到'
    @on-confirm='confirmSign'
    >
    <div class="ticket_confirm">
      <div class="base_info_wrap">
        <div class="info_item">
          <label>姓名</label>
          <span>接志蒙</span>
        </div>
        <div class="info_item">
          <label>电话</label>
          <span>158012934014</span>
        </div>
      </div>
      <div class="info_item">
        <label>邮箱</label>
        <span>158012934014@qq.com</span>
      </div>
      <divider>详情</divider>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shijian"></use>
        </svg>
        10月12日 10:00-10月13日 12:00
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-weizhi"></use>
        </svg>
        北京市朝阳区双榆树一街北里213号
      </div>
    </div>
    </confirm>
  </div>
</template>

<script>
import { XButton, Confirm, Divider } from 'vux';
import { signedRecord, signedInfo, confirmSign } from '@/server';
import defaultAvatar from '@/assets/vux_logo.png';

export default {
  data() {
    return {
      defaultAvatar,
      ticketSucess: false,
      sigedList: [],
      ticketInfo: {},
      activityId: this.$route.params.id,
    };
  },
  created() {
    signedRecord(this.activityId).then((res) => {
      this.sigedList = res.data;
    });
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
    confirmSign() {
      confirmSign(this.activityId, this.ticketInfo.ticketsId).then((res) => {
        if (res.code === 0) {
          this.$vux.toast.text('签到成功');
        } else {
          this.$vux.toast.text('签到失败');
        }
      });
    },
    openScanQRCode() {
      this.$wechat.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: (res) => {
          const result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          signedInfo(this.activityId, result).then((ticketInfo) => {
            if (ticketInfo.code !== 0) {
              this.$vux.alert.show({
                title: '验票失败',
                content: '失败可能原因：过期票、无效票、非本场活动门票、签到码输入有误，或网络异常，请重试验票！',
                buttonText: '知道了',
              });
            } else {
              this.ticketInfo = ticketInfo.data;
              this.ticketSucess = true;
            }
          });
        },
      });
    },
  },
  components: {
    XButton, Confirm, Divider,
  },
  filter: {
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
}

</style>