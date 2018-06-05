<template>
  <div class="activityListView">
    <ul>
      <li v-for="(activity, index) in ticketsList" :key="index">
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
              <li v-for="(ticket, i) in activity.ticketsRecords" class="ticketsListLi" :key="i">
                <span class="ticketState">{{ticket.ticketStatus | ticketFilter}}</span>
                <p class="text">{{ticket.ticketsName?ticket.ticketsName:'无'}}</p>
                <p class="text">{{ticket.confereeName}}</p>
                <div class="ticketOptionBtn">
                  <button :class="['item',ticket.ticketStatus === 3?'active':'']" type="button" name="button" @click="clickToShowTicket(ticket, activity)">查看门票</button>
                  <button :class="['item',ticket.ticketStatus === 3?'active':'']" type="button" name="button" @click="downloadTicket(ticket, i)">下载门票</button>
                  <a :href="`${http}/ticketsRecord/getPDFTicket/${ticket.id}?mp.weixin.qq.com`" download>你好</a>
                  <!-- <button class="item" type="button" name="button" @click="downloadTicket2(ticket, activity)">下2</button> -->
                  <button class="item" type="button" name="button" @click="clickToShowEdit(ticket, i, index)">修改门票</button>
                </div>
                <!-- 下载png格式门票二维码 -->
                <!--<qrcode v-show="false" class="ticketCode" :ref="'ticketCode' + ticket.id" :value="ticket.authCode" type="img"></qrcode>-->
              </li>
            </ul> 
            <!--<div v-transfer-dom>
              <confirm v-model="loadConfirm" title="选择要下载的类型" @on-confirm="loadTicketsFn">
                <checklist :options="downloadArray" @on-change="loadTypeFn" :max="1"></checklist>
              </confirm>
            </div>-->
          </div>
        </div>
      </li>
    </ul>
    <div class="activity-footer" v-show="ticketsList && ticketsList.length > 0">
      <span class="no-more-tip" v-if='loadStatus === 2'>没有更多数据</span>
      <span class="loading-tip" v-else-if='loadStatus === 1'>加载中...</span>
    </div>
  </div>
  <!-- 查看门票 -->
</template>

<script>
/* eslint-disable */
import { TransferDom, Popup, Qrcode, XInput, Group, Checklist, Confirm } from 'vux';
import { formatDate } from '@/common/js/index.js';
import Conf from '@/config/index';
// import { updateTicket } from '@/server';
import PDFTicketItem from '@/common/js/PDFTicketItem.js';

export default {
  props: {
    loadStatus: {
      type: Number,
    },
    ticketsList: {
      type: Array,
    },
  },
  data() {
    return {
      downloadArray: [{
        key: 1,
        value: 'pdf',
      },{
        key: 2,
        value: 'png',
      }],
      loadConfirm: false, // 下载弹框
      selectLoadArray: [], // 下载类型
      downTickets: {}, // 要下载的门票信息
      // http: '',
    };
  },
  computed:{
    http(){
      return Conf.publicPath;
    }
  },
  methods: {
    /* eslint-disable */
    loadTypeFn(value) {
      this.selectLoadArray = value;
    },
    loadTicketsFn() {
      const ticket = this.downTickets;
      const activity = this.activity;
      if (!ticket.id && this.selectLoadArray[0] === 1) {
        this.$vux.toast.text('没有pdf门票，请联系管理员', 'top');
      } else {
        try {
          const downloadLink = document.createElement('a');
          downloadLink.download = `${ticket.ticketsName}门票`;
          downloadLink.href = `${Conf.publicPath}/ticketsRecord/getPDFTicket/${ticket.id}`;
          downloadLink.click();
          // this.$vux.toast.text('正在下载', 'top');
        } catch (err) {
          console.log(err);
        }
      }
      if (this.selectLoadArray[0] === 2) {
        this.downloadTicket2(ticket, activity);
      }
    },
    // 下载门票pdf
    downloadTicket(ticket, index) {
      // debugger;
      if (ticket.ticketStatus !== 3) {
        // this.loadConfirm = true;
        if (!ticket.id) {
          this.$vux.toast.text('没有pdf门票，请联系管理员', 'top');
        } else {
          try {
            const downloadLink = document.createElement('a');
            downloadLink.download = `${ticket.ticketsName}-门票`;
            console.log(downloadLink.download);
            downloadLink.href = `${Conf.publicPath}/ticketsRecord/getPDFTicket/${ticket.id}#mp.weixin.qq.com`;
            console.log(downloadLink.href);
            downloadLink.click();
            // this.$vux.toast.text('正在下载', 'top');
          } catch (err) {
            console.log(err);
          }
        }
        // this.downTickets = this.activity.ticketsRecords[index];
      } else {
        return false;
      }
    },
    // 下载门票png
    downloadTicket2(ticket, activity) {
    // downloadTicket2() {
      // debugger;
      // const [ticketsName, cTime, confereeName, , ticketLinkUrl] = ticket;
      // const [activityAddress] = activity;
      // eslint-disable-next-line
      let canvas = document.createElement('CANVAS');
      // 初始化背景
      canvas.setAttribute('height', 786);
      canvas.setAttribute('width', 1837);
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 1837, 786);
      ctx.fillStyle = '#213C67';
      ctx.fillRect(0, 0, 156, 786);
      // 这里绘画~  212，213行 用到时解开注释；

      // 绘制PDF默认标题
      this.PDFDrawDefine(ctx);
      // 绘制PDF会议门票基本信息
      this.PDFDrawMsg(ctx, ticket, activity);

      // 生成
      this.downLoadImage(canvas, '2');
    },
    PDFDrawDefine(context) {
      const startTimeTitle = new PDFTicketItem({
        itemText: '开始时间',
        x: 260,
        y: 309,
        font: '36px PingFangSC-Regular',
      });
      startTimeTitle.draw(context, '#999999');

      const addressTitle = new PDFTicketItem({
        itemText: '活动地址',
        x: 736,
        y: 309,
        font: '36px PingFangSC-Regular',
      });
      addressTitle.draw(context, '#999999');

      const attendeeTitle = new PDFTicketItem({
        itemText: '参会人',
        x: 260,
        y: 562,
        font: '36px PingFangSC-Regular',
      });
      attendeeTitle.draw(context, '#999999');

      const ticketNameTitle = new PDFTicketItem({
        itemText: '票名',
        x: 736,
        y: 562,
        font: '36px PingFangSC-Regular',
      });
      ticketNameTitle.draw(context, '#999999');
      // 画虚线
      context.fillStyle = '#DDDDDD';
      context.setLineDash([15, 5]);
      context.lineWidth = .1;
      context.moveTo(1243, 146);
      context.lineTo(1243, 640);
      context.stroke();
      context.setLineDash([]);

      const ticketNoticeOnLeft = new PDFTicketItem({
        itemText: '请将此票保管好携带至会场',
        x: 0,
        y: 0,
        font: '36px PingFangSC-Regular',
      });
      context.save();
      context.translate(90, 609);
      context.rotate(-90 * Math.PI / 180);
      ticketNoticeOnLeft.draw(context, '#CADFFF');
      context.restore();
    },
    PDFDrawMsg(context, ticket, activity) {
      const activityName = new PDFTicketItem({
        itemText: activity.activityTitle,
        // itemText: '好多字啊好多字啊好多字啊好多字啊好多字啊好多字啊好多字啊',
        x: 260,
        y: 133,
        font: '52px PingFangSC-Medium',
      });
      activityName.drawTextChangeLine(context, '#333333', 837);

      const startTime = new PDFTicketItem({
        itemText: ticket.cTime,
        x: 260,
        y: 374,
        font: '42px PingFangSC-Medium',
      });
      startTime.drawTextChangeLine(context, '#333333', 417);

      const address = new PDFTicketItem({
        itemText: this.addressFormat(activity.activityAddress),
        x: 737,
        y: 374,
        font: '42px PingFangSC-Medium',
      });
      address.drawTextChangeLine(context, '#333333', 417);

      const attendee = new PDFTicketItem({
        itemText: ticket.confereeName,
        x: 260,
        y: 630,
        font: '42px PingFangSC-Medium',
      });
      attendee.drawTextChangeLine(context, '#333333', 417);

      const ticketName = new PDFTicketItem({
        itemText: ticket.ticketsName,
        x: 737,
        y: 630,
        font: '42px PingFangSC-Medium',
      });
      ticketName.drawTextChangeLine(context, '#333333', 417);

      // 绘制二维码
      const value = 'ticketCode' + ticket.id;
      const img = this.$refs[value][0].$el.childNodes[2];
      context.drawImage(img, 1372, 150, 300, 300);

      const code = new PDFTicketItem({
        itemText: ticket.signCode,
        x: 1402,
        y: 613,
        font: '62px SFUIText-Medium',
      });
      code.draw(context, '#4D4D4D');
    },
    clickToShowTicket(ticket,activity) {
      // debugger
      if (ticket.ticketStatus !== 3) {
        this.$emit("checkTicket", true, ticket, activity)
        // this.showTicket = true;
        // this.currentTicket = ticket;
      }
      // this.$nextTick(() => {
      //   const popupTicketBoxHeight = document.getElementById('popupTicketBox').clientHeight;
      //   document.getElementById('hole').style.height = `${popupTicketBoxHeight}px`;
      // });
    },
    copy(ticket) {
      let obj = {};
      for(let key in ticket){
        if (key === 'id' || key === 'confereeName'|| key === 'confereePhone'|| key === 'confereeEmail') {
          obj[key] = ticket[key];
        }
      }
      return obj;
    },
    clickToShowEdit(ticket, tindex, aindex) {
      const copyTicket = this.copy(ticket);
      this.$emit("updateTicket", true, copyTicket, tindex, aindex);
    },
    downLoadImage(canvas, name) {
      const a = document.createElement('a');
      a.href = canvas.toDataURL();
      a.download = name;
      a.click();
    },
    addressFormat(value) {
      const json1 = value.replace(/'/g, '"');
      const json2 = json1.replace(/^"/, "'");
      const json3 = json2.replace(/"$/, "'");
      let temp = JSON.parse(json3);
      temp = Object.values(temp);
      temp = temp.join('');
      return temp;
    },
  },
  filters: {
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
    Checklist,
    Confirm,
  },
};
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import '../common/style/mixin.less';
.weui-cells:before{
  border-top:0px!important;
}
.weui-cells:after{
  border-bottom:0px!important;
}
.weui-cell:before{
  border-top:0px!important;
}
// .weui-mask{
//   background: rgba(0,0,0,0.03)!important;
// }
.activityListView {
    ul {
      width: calc(~'100% - 40px');
      padding: 0 20px;
    }
  }
.activityTicketsList {
  width: 100%;
  margin-bottom: 10px;
  list-style-type: none;
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
            &.active{
              color:rgb(144, 152, 168);
              border: 1px solid rgb(144, 152, 168);
            }
          }
        }
      }
    }
  }
}
// .v-transfer-dom {
//   width: 100%;
//   .popup {
//     position: absolute;
//     background: transparent;
//     &.popupTicket {
//       width: calc(~'100% - 50px');
//       height: calc(~'100% - 20px');
//       margin: 20px 25px 0;
//       .popupTicketBox {
//         position: relative;
//         .popupTicketBoxContent {
//           position: relative;
//           bottom: 0;
//           width: 100%;
//           border-radius: 4px;
//           box-sizing: border-box;
//           overflow: hidden;
//           // ================================================== hole ===================================================
//           .hole {
//             position: absolute;
//             overflow: hidden;
//           }
//           .hole-top-r {
//             top: 0;
//             right: 0;
//             width: 50%;
//             height: 50%;
//           }
//           .hole-top-l {
//             top: 0;
//             left: 0;
//             width: 50%;
//             height: 50%;
//           }
//           .hole-bottom-r {
//             bottom: 0;
//             right: 0;
//             width: 50%;
//             height: 50%;
//           }
//           .hole-bottom-l {
//             bottom: 0;
//             left: 0;
//             width: 50%;
//             height: 50%;
//           }
//           .hole-top-l::after {
//             top: 0;
//             left: 0;
//             transform: translate(-50%, -50%);
//           }
//           .hole-top-r::after {
//             top: 0;
//             right: 0;
//             transform: translate(50%, -50%);
//           }
//           .hole-bottom-l::after {
//             bottom: 0;
//             left: 0;
//             transform: translate(-50%, 50%);
//           }
//           .hole-bottom-r::after {
//             bottom: 0;
//             right: 0;
//             transform: translate(50%, 50%);
//           }
//           .hole-top-l::after, .hole-top-r::after, .hole-bottom-l::after, .hole-bottom-r::after {
//             position: absolute;
//             content: '';
//             width: 20px;
//             height: 20px;
//             border-radius: 50%;
//             border: 5000px solid #ffffff;
//             z-index: 0;
//           }
//           .hole-block-top, .hole-block-bottom {
//             position: absolute;
//             left: 0;
//             width: 100%;
//             height: 50%;
//             background-color: #ffffff;
//           }
//           .hole-block-top {
//             top: 0;
//           }
//           .hole-block-bottom {
//             bottom: 0;
//           }
//           // ================================================== hole end ===================================================

//           .activity {
//             position: relative;
//             padding: 39px 31px 24px;
//             .content {
//               position: relative;
//               z-index: 10;
//               p {
//                 color: #2B313C;
//                 &.title {
//                   font-size: 18px;
//                   margin-bottom: 16px;
//                   line-height: 20px;
//                 }
//                 &.desc {
//                   font-size: 13px;
//                   font-weight: 200;
//                 }
//                 &.ticketN {
//                   text-align: center;
//                   margin-bottom: 20px;
//                 }
//               }
//             }
//           }
//           .ticket {
//             position: relative;
//             padding: 24px 31px 30px;
//             &.border-1px-t:after {
//               margin: 0 25px;
//               width: calc(~'100% - 50px');
//             }
//             .content {
//               position: relative;
//               z-index: 10;
//               p {
//                 color: #2B313C;
//                 &.title {
//                   font-size: 18px;
//                   margin-bottom: 16px;
//                   line-height: 20px;
//                 }
//                 &.desc {
//                   font-size: 13px;
//                   font-weight: 200;
//                 }
//                 &.ticketN {
//                   text-align: center;
//                   margin-bottom: 20px;
//                 }
//               }
//               .QRCodeBox {
//                 position: relative;
//                 margin: 0 auto;
//                 width: 160px;
//               }
//               .examine-ticket{
//                 text-align: center;
//                 margin-bottom: 6px;
//               }
//               .examine-title{
//                 color:#FF9044;
//                 text-align: center;
//                 margin: 0 auto;
//                 width: 80%;
//               }
//               .examine-desc{
//                 font-size: 14px;
//                 text-align: center;
//                 margin: 6px auto 16px;
//                 width: 80%;
//               }
//               .code {
//                 padding: 12px 19px;
//                 width: 160px;
//                 font-size: 14px;
//                 text-align: center;
//                 margin: 19px auto;
//               }
//               .massage {
//                 display: flex;
//                 justify-content: center;
//                 p {
//                   margin: 0 11px;
//                   color: #5D6574;
//                   font-size: 16px;
//                   line-height: 16px;
//                   span {
//                     color: #9098A8;
//                     font-size: 14px;
//                   }
//                 }
//               }
//             }
//           }
//         }
//         .close {
//           position: absolute;
//           display: block;
//           bottom: -45px;
//           left: 50%;
//           transform: translateX(-50%);
//           padding: 8px;
//           font-size: 14px;
//           line-height: 14px;
//           border-radius: 50%;
//           border: 2px solid #ffffff;
//           .icon {
//             color: #ffffff;
//           }
//         }
//       }
//     }
//     &.popupEdit {
//       width: calc(~'100% - 50px');
//       height: calc(~'100% - 20px');
//       margin: 20px 25px 0;
//       overflow: hidden;
//       .popupEditBox {
//         position: relative;
//         bottom: 0;
//         width: 100%;
//         padding: 39px 31px 30px;
//         box-sizing: border-box;
//         border-radius: 4px;
//         background-color: #ffffff;
//         p {
//           color: #666666;
//           &.title {
//             text-align: center;
//             font-size: 18px;
//             margin-bottom: 16px;
//             line-height: 20px;
//           }
//         }
//         .inputContent {
//           width: 100%;
//           margin-top: 24px;
//           font-size: 15px;
//           color: #5d6574-light;
//           form {
//             .inputItem {
//               width: 100%;
//               height: 40px;
//               margin-bottom: 15px;
//             }
//             .userInput {
//               display: flex;
//               align-items: center;
//               border: 1px solid rgba(184, 188, 196, .5);
//               box-sizing: border-box;
//               border-radius: 4px;
//               overflow: hidden;
//               -webkit-font-smoothing: antialiased;
//               -moz-osx-font-smoothing: grayscale;
//               input {
//                 border: 0;
//                 padding: 0;
//                 padding-left: 11px;
//                 width: 100%;
//                 height: 100%;
//                 line-height: 100%;
//                 font-size: 14px;
//                 color: #5d6574;
//                 outline: none;
//               }
//             }
//           }
//         }
//         .loginBtn {
//           width: 100%;
//           height: 42px;
//           border: 0;
//           margin-top: 11px;
//           border-radius: 4px;
//           font-size: 15px;
//           color: #fff;
//           outline: none;
//           background-color: #2c7dfa;
//         }
//         .close {
//           position: absolute;
//           display: block;
//           bottom: -50px;
//           left: 50%;
//           transform: translateX(-50%);
//           padding: 8px;
//           font-size: 14px;
//           line-height: 14px;
//           border-radius: 50%;
//           border: 2px solid #ffffff;
//           .icon {
//             color: #ffffff;
//           }
//         }
//       }
//       .block {
//         width: 100%;
//         height: 65px;
//       }
//     }
//   }
// }

</style>
