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
        <li v-for="(ticket, index) in activity.activityTickets" class="ticketsListLi" :key="index">
          <span class="ticketState">待审核</span>
          <p class="text">{{ticket.ticketName}}</p>
          <p class="text">{{ticket.confereeName}}</p>
          <div class="ticketOptionBtn">
            <button class="item" type="button" name="button" @click="clickToShowTicket(ticket)">查看门票</button>
            <button class="item" type="button" name="button">下载门票</button>
            <button class="item" type="button" name="button" @click="clickToShowEdit(ticket)">修改门票</button>
          </div>
        </li>
      </ul>
    </div>
    <div v-transfer-dom>
      <popup
        v-model="showTicket"
        height="100%"
        position="top"
        :is-transparent='true'
        >
        <div class="popupTicket">
          <div class="popupTicketBox">
            <p class="title">{{currentTicket.ticketName}}</p>
            <p class="desc time">{{currentTicket.startTime | timeFormat}} ~ {{currentTicket.cutTime | timeFormat}}</p>
            <p class="desc location">{{currentTicket.activityAddress | adressFormat}}</p>
            <div class="line vux-1px-t"></div>
            <p class="title ticketN">{{currentTicket.ticketName}}</p>
            <img :src="currentTicket.QRcode" width=60%>
            <p class="code vux-1px">{{currentTicket.getTicketCode}}</p>
            <div class="massage">
              <p class="name"><span>姓名</span> {{currentTicket.confereeName}}</p>
              <p class="price"><span>票价</span> ￥{{currentTicket.ticketPrice}}</p>
            </div>
            <div class="close" @click="showTicket=false">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-guanbi2"></use>
              </svg>
            </div>
          </div>
          <div class="block"></div>
          <div class="hole holeLeft"></div>
          <div class="hole holeRight"></div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup
        v-model="showEdit"
        height="65%"
        position="top">
        <div class="popupEdit">

        </div>
      </popup>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { TransferDom, Popup } from 'vux';
import { formatDate } from '@/common/js/index.js';

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
    };
  },
  methods: {
    clickToShowTicket(ticket) {
      this.showTicket = true;
      this.currentTicket = ticket;
    },
    clickToShowEdit(ticket) {
      this.showEdit = true;
      this.currentTicket = ticket;
    },
  },
  filters: {
    // calcTicketType(value) {
    //   return (value.notPassOrOver ? '已失效' : '未通过');
    //   return (value.isCheck ? '已出票' : '待审核');
    // }
    timeFormat(value = '') {
      const temp = new Date(value.replace(/-/g, '/'));
      return formatDate(temp, 'yyyy.MM.dd hh:mm');
    },
    adressFormat(value = '{}') {
      let temp = JSON.parse(value);
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
  },
};
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';

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
          font-size: 18px;
          line-height: 28px;
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
  .popupTicket {
    position: absolute;
    background: transparent;
    width: 100%;
    height: 100%;
    padding: 20px 25px 0;
    box-sizing: border-box;
    overflow: scroll;
    .hole {
      position: absolute;
      bottom: 0;
      width: 20px;
      height: 20px;
      background: transparent;
      border-radius: 50%;
      z-index: 9999;
    }
    .popupTicketBox {
      position: relative;
      bottom: 0;
      width: 100%;
      padding: 39px 31px 30px;
      box-sizing: border-box;
      border-radius: 4px;
      background-color: #ffffff;
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
      .line {
        width: 100%;
        margin-top: 20px;
        padding-bottom: 20px;
      }
      img {
        position: relative;
        display: block;
        margin: 0 auto;
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

</style>
