<template>
  <div class="activityTicketsList">
    <div class="activityBanner">
      <h1 class="title">
        <div class="text">
          {{activity.activityTitle}}
        </div>
        <div class="BgImg">
          <img :src="activity.activityBannerMobileUrl">
        </div>
      </h1>
      <div class="activityDetail">
        <p class="text">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shijian"></use>
          </svg>
          {{activity.startTime | timeFormat}}
        </p>
        <p class="text">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-weizhi"></use>
          </svg>
          {{activity.activityAddress | adressFormat}}
        </p>
      </div>
    </div>
    <div class="ticketsList">
      <ul>
        <li v-for="(ticket, index) in activity.ticketsRecords" class="ticketsListLi" :key="index">
          <span class="ticketState">{{ticket.ticketStatus | ticketFilter}}</span>
          <p class="text">{{ticket.ticketsName}}</p>
          <p class="text">{{ticket.confereeName}}</p>
          <div class="ticketOptionBtn">
            <button class="item" type="button" name="button" @click="clickToShowTicket(ticket)">查看门票</button>
            <button class="item" type="button" name="button" @click="downloadTicket(ticket)">下载门票</button>
            <button v-show="false" class="item" type="button" name="button" @click="downloadTicket2(ticket,activity)">下2</button>
            <button class="item" type="button" name="button" @click="clickToShowEdit(ticket)">修改门票</button>
          </div>
        </li>
      </ul>
    </div>
    <div v-transfer-dom>
      <popup
        v-model="showTicket"
        height="90%"
        position="top"
        :is-transparent='true'
        >
        <div class="popup popupTicket">
          <div class="popupTicketBox" id="popupTicketBox">
            <div class="popupTicketBoxContent">
              <div class="activity">
                <div class="content">
                  <p class="title">{{activity.activityTitle}}</p>
                  <p class="desc time">{{activity.startTime | timeFormat}} ~ {{activity.endTime | timeFormat}}</p>
                  <p class="desc location">{{activity.activityAddress | adressFormat}}</p>
                </div>
                <div class="hole-block-top"></div>
                <div class="hole hole-bottom-r"></div>
                <div class="hole hole-bottom-l"></div>
              </div>
              <div class="ticket border-1px-t">
                <div class="content">
                  <p class="title ticketN">{{currentTicket.ticketsName}}</p>
                  <div class="QRCodeBox">
                    <qrcode :value="currentTicket.ticketLinkUrl"></qrcode>
                  </div>
                  <p class="code vux-1px">取票号 {{currentTicket.signCode}}</p>
                  <div class="massage">
                    <p class="name"><span>姓名</span> {{currentTicket.confereeName}}</p>
                    <p class="price"><span>票价</span> ￥{{currentTicket.ticketsPrice}}</p>
                  </div>
                </div>
                <div class="hole hole-top-r"></div>
                <div class="hole hole-top-l"></div>
                <div class="hole-block-bottom"></div>
              </div>
            </div>
            <div class="close" @click="showTicket=false">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-guanbi2"></use>
              </svg>
            </div>
          </div>
          <!-- <div class="block"></div> -->
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup
        v-model="showEdit"
        height="90%"
        position="bottom"
        :is-transparent='true'
        >
        <div class="popup popupEdit">
          <div class="popupEditBox">
            <p class="title">修改门票</p>
            <div class="inputContent">
              <form>
                <group>
                  <x-input title="" v-model="ticketForm.confereeName" :min="1" :max="10"></x-input>
                </group>
                <group>
                  <x-input title="" type v-model="ticketForm.confereePhone"></x-input>
                </group>
                <group>
                  <x-input title="" v-model="ticketForm.confereeEmail"></x-input>
                </group>
                <!-- 姓名输入框 -->
                <!-- <div class="inputItem userInput">
                  <input type="text" placeholder="姓名" v-model="ticketForm.confereeName">
                </div> -->
                <!-- 手机号输入框 -->
                <!-- <div class="inputItem userInput">
                  <input type="number" placeholder="手机号" v-model="ticketForm.confereePhone">
                </div> -->
                <!-- 邮箱输入框 -->
                <!-- <div class="inputItem userInput">
                  <input type="email" placeholder="邮箱" v-model="ticketForm.confereeEmail">
                </div> -->
              </form>
            </div>
            <!-- 主按钮 -->
            <button class="loginBtn" @click="updateTicket">确认</button>
            <div class="close" @click="showEdit=false">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-guanbi2"></use>
              </svg>
            </div>
          </div>
          <div class="block"></div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { TransferDom, Popup, Qrcode, XInput, Group } from 'vux';
import { formatDate } from '@/common/js/index.js';
import Conf from '@/config/index';
import { updateTicket } from '@/server';

export default {
  props: {
    currentIndex: {
      type: Number,
    },
    activity: {
      type: Object,
    },
  },
  data() {
    return {
      showTicket: false,
      showEdit: false,
      currentTicket: {},
      ticketForm: {
        id: '',
        confereeName: '',
        confereePhone: '',
        confereeEmail: '',
      },
    };
  },
  methods: {
    updateTicket() {
      const data = { ...this.ticketForm };
      const len = data.confereeName.length;
      const regNum = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
      const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (len === 0) {
        this.$vux.toast.text('姓名不能为空', 'top');
      } else if (len > 10) {
        this.$vux.toast.text('姓名在10个字符', 'top');
      } else if (!regNum.test(data.confereePhone)) {
        this.$vux.toast.text('手机号码格式不正确', 'top');
      } else if (!regEmail.test(data.confereeEmail)) {
        this.$vux.toast.text('邮箱格式不正确', 'top');
      } else {
        updateTicket(data.id, data).then((res) => {
          if (res.code === 0) {
            this.$vux.toast.text('修改成功', 'top');
            this.$emit('update');
            this.showEdit = false;
          } else {
            this.$vux.toast.text('修改失败', 'top');
          }
        });
      }
      // return;
    },
    downloadTicket(ticket) {
      if (!ticket.id) {
        this.$vux.toast.text('没有pdf门票，请联系管理员', 'top');
      } else {
        try {
          const downloadLink = document.createElement('a');
          downloadLink.download = `${ticket.ticketsName}门票`;
          downloadLink.href = `${Conf.publicPath}/ticketsRecord/getPDFTicket/${ticket.id}`;
          downloadLink.click();
          this.$vux.toast.text('正在下载', 'top');
        } catch (err) {
          console.log(err);
        }
      }
    },
    // downloadTicket2(ticket, activity) {
    downloadTicket2() {
      // debugger;
      // const [ticketsName, cTime, confereeName, , ticketLinkUrl] = ticket;
      // const [activityAddress] = activity;
      // eslint-disable-next-line
      let canvas = document.createElement('CANVAS');
      canvas.setAttribute('height', 786);
      canvas.setAttribute('width', 1837);
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#213C67';
      ctx.fillRect(0, 0, 156, 786);
      // 这里绘画~  212，213行 用到时解开注释；

      // 生成
      this.downLoadImage(canvas, '2');
    },
    clickToShowTicket(ticket) {
      // debugger
      this.showTicket = true;
      this.currentTicket = ticket;
      // this.$nextTick(() => {
      //   const popupTicketBoxHeight = document.getElementById('popupTicketBox').clientHeight;
      //   document.getElementById('hole').style.height = `${popupTicketBoxHeight}px`;
      // });
    },
    clickToShowEdit(ticket) {
      // debugger;
      this.showEdit = true;
      this.ticketForm.id = ticket.id;
      this.ticketForm.confereeName = ticket.confereeName;
      this.ticketForm.confereePhone = ticket.confereePhone;
      this.ticketForm.confereeEmail = ticket.confereeEmail;
      // const ticketForm = this.ticketForm;
    },
    downLoadImage(canvas, name) {
      const a = document.createElement('a');
      a.href = canvas.toDataURL();
      a.download = name;
      a.click();
    },
  },
  filters: {
    // calcTicketType(value) {
    //   return (value.notPassOrOver ? '已失效' : '未通过');
    //   return (value.isCheck ? '已出票' : '待审核');
    // }
    ticketFilter(val) {
      if (val === 0) {
        return '未生成';
      } else if (val === 1) {
        return '未签到';
      } else if (val === 2) {
        return '已签到';
      } else if (val === 3) {
        return '待审核';
      } else if (val === 4) {
        return '审核未通过';
      } else if (val === 9) {
        return '已退票';
      }
      return '';
    },
    timeFormat(value = '') {
      const temp = new Date(value.replace(/-/g, '/'));
      return formatDate(temp, 'yyyy.MM.dd hh:mm');
    },
    adressFormat(value = '{}') {
      const json1 = value.replace(/'/g, '"');
      const json2 = json1.replace(/^"/, "'");
      const json3 = json2.replace(/"$/, "'");
      let temp = JSON.parse(json3);
      temp = Object.values(temp);
      temp = temp.join('');
      return temp;
    },
  },
  directives: {
    TransferDom,
  },
  components: {
    Popup,
    Qrcode,
    XInput,
    Group,
  },
};
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import '../common/style/mixin.less';

.activityTicketsList {
  .activityBanner {
    width: 100%;
    border-radius: 6px;
    overflow: hidden;
    background-color: #ffffff;
    .title {
      position: relative;
      .text {
        position: relative;
        height: 64px;
        color: #ffffff;
        font-size: 18px;
        font-weight: 400;
        line-height: 64px;
        padding: 0 16px;
        background-color: rgba(78, 148, 255, .8);
        z-index: 100;
      }
      .BgImg {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    .activityDetail {
      padding: 5px 16px;
      color: #5d6574;
      font-size: 14px;
      .text {
        line-height: 26px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .icon {
          margin-right: 8px;
        }
      }
    }
  }
  .ticketsList {
    ul {
      width: 100%;
      padding: 0;
      li.ticketsListLi {
        position: relative;
        width: 100%;
        padding: 14px 16px;
        box-sizing: border-box;
        margin-top: 2px;
        border-radius: 6px;
        overflow: hidden;
        background-color: #ffffff;
        list-style-type: none;
        .ticketState {
          position: absolute;
          right: 16px;
          top: 12px;
          font-size: 14px;
        }
        .text {
          width: calc(~'100% - 58px');
          font-size: 16px;
          line-height: 28px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .ticketOptionBtn {
          display: flex;
          justify-content: flex-end;
          margin-top: 5px;
          .item {
            margin-left: 8px;
            padding: 5px 12px;
            font-weight: 200px;
            color: #2c7dfa;
            border: 1px solid #2c7dfa;
            border-radius: 27px;
            background-color: #ffffff;
          }
        }
      }
    }
  }
}
.v-transfer-dom {
  width: 100%;
  .popup {
    position: absolute;
    background: transparent;
    &.popupTicket {
      width: calc(~'100% - 50px');
      height: calc(~'100% - 20px');
      margin: 20px 25px 0;
      .popupTicketBox {
        position: relative;
        .popupTicketBoxContent {
          position: relative;
          bottom: 0;
          width: 100%;
          border-radius: 4px;
          box-sizing: border-box;
          overflow: hidden;

          // ================================================== hole ===================================================
          .hole {
            position: absolute;
            overflow: hidden;
          }
          .hole-top-r {
            top: 0;
            right: 0;
            width: 50%;
            height: 50%;
          }
          .hole-top-l {
            top: 0;
            left: 0;
            width: 50%;
            height: 50%;
          }
          .hole-bottom-r {
            bottom: 0;
            right: 0;
            width: 50%;
            height: 50%;
          }
          .hole-bottom-l {
            bottom: 0;
            left: 0;
            width: 50%;
            height: 50%;
          }
          .hole-top-l::after {
            top: 0;
            left: 0;
            transform: translate(-50%, -50%);
          }
          .hole-top-r::after {
            top: 0;
            right: 0;
            transform: translate(50%, -50%);
          }
          .hole-bottom-l::after {
            bottom: 0;
            left: 0;
            transform: translate(-50%, 50%);
          }
          .hole-bottom-r::after {
            bottom: 0;
            right: 0;
            transform: translate(50%, 50%);
          }
          .hole-top-l::after, .hole-top-r::after, .hole-bottom-l::after, .hole-bottom-r::after {
            position: absolute;
            content: '';
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 5000px solid #ffffff;
            z-index: 0;
          }
          .hole-block-top, .hole-block-bottom {
            position: absolute;
            left: 0;
            width: 100%;
            height: 50%;
            background-color: #ffffff;
          }
          .hole-block-top {
            top: 0;
          }
          .hole-block-bottom {
            bottom: 0;
          }
          // ================================================== hole end ===================================================

          .activity {
            position: relative;
            padding: 39px 31px 24px;
            .content {
              position: relative;
              z-index: 10;
              p {
                color: #2B313C;
                &.title {
                  font-size: 18px;
                  margin-bottom: 16px;
                  line-height: 20px;
                }
                &.desc {
                  font-size: 13px;
                  font-weight: 200;
                }
                &.ticketN {
                  text-align: center;
                  margin-bottom: 20px;
                }
              }
            }
          }
          .ticket {
            position: relative;
            padding: 24px 31px 30px;
            &.border-1px-t:after {
              margin: 0 25px;
              width: calc(~'100% - 50px');
            }
            .content {
              position: relative;
              z-index: 10;
              p {
                color: #2B313C;
                &.title {
                  font-size: 18px;
                  margin-bottom: 16px;
                  line-height: 20px;
                }
                &.desc {
                  font-size: 13px;
                  font-weight: 200;
                }
                &.ticketN {
                  text-align: center;
                  margin-bottom: 20px;
                }
              }
              .QRCodeBox {
                position: relative;
                margin: 0 auto;
                width: 160px;
              }
              .code {
                padding: 12px 19px;
                width: 160px;
                font-size: 14px;
                text-align: center;
                margin: 19px auto;
              }
              .massage {
                display: flex;
                justify-content: center;
                p {
                  margin: 0 11px;
                  color: #5D6574;
                  font-size: 16px;
                  line-height: 16px;
                  span {
                    color: #9098A8;
                    font-size: 14px;
                  }
                }
              }
            }
          }
        }
        .close {
          position: absolute;
          display: block;
          bottom: -45px;
          left: 50%;
          transform: translateX(-50%);
          padding: 8px;
          font-size: 14px;
          line-height: 14px;
          border-radius: 50%;
          border: 2px solid #ffffff;
          .icon {
            color: #ffffff;
          }
        }
      }
    }
    &.popupEdit {
      width: calc(~'100% - 50px');
      height: calc(~'100% - 20px');
      margin: 20px 25px 0;
      overflow: hidden;
      .popupEditBox {
        position: relative;
        bottom: 0;
        width: 100%;
        padding: 39px 31px 30px;
        box-sizing: border-box;
        border-radius: 4px;
        background-color: #ffffff;
        p {
          color: #666666;
          &.title {
            text-align: center;
            font-size: 18px;
            margin-bottom: 16px;
            line-height: 20px;
          }
        }
        .inputContent {
          width: 100%;
          margin-top: 24px;
          font-size: 15px;
          color: #5d6574-light;
          form {
            .inputItem {
              width: 100%;
              height: 40px;
              margin-bottom: 15px;
            }
            .userInput {
              display: flex;
              align-items: center;
              border: 1px solid rgba(184, 188, 196, .5);
              box-sizing: border-box;
              border-radius: 4px;
              overflow: hidden;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              input {
                border: 0;
                padding: 0;
                padding-left: 11px;
                width: 100%;
                height: 100%;
                line-height: 100%;
                font-size: 14px;
                color: #5d6574;
                outline: none;
              }
            }
          }
        }
        .loginBtn {
          width: 100%;
          height: 42px;
          border: 0;
          margin-top: 11px;
          border-radius: 4px;
          font-size: 15px;
          color: #fff;
          outline: none;
          background-color: #2c7dfa;
        }
        .close {
          position: absolute;
          display: block;
          bottom: -50px;
          left: 50%;
          transform: translateX(-50%);
          padding: 8px;
          font-size: 14px;
          line-height: 14px;
          border-radius: 50%;
          border: 2px solid #ffffff;
          .icon {
            color: #ffffff;
          }
        }
      }
      .block {
        width: 100%;
        height: 65px;
      }
    }
  }
}

</style>
