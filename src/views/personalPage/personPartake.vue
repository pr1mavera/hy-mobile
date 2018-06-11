<template>
  <div class="PPParticipate">
    <div class="tab-container">
      <tab
      class="SLtab"
      bar-active-color="transparent"
      default-color="#5d6574"
      active-color="#2c7dfa"
      >
        <tab-item selected @on-item-click="onTabItemClick">
          有效票({{ticketsValid.ticketsTotal}})
        </tab-item>
        <tab-item @on-item-click="onTabItemClick">
          已失效({{ticketsInvalid.ticketsTotal}})
        </tab-item>
      </tab>
    </div>
    <keep-alive>
      <activityTicketsList
        v-if="curIndex === 0"
        @updateTicket="updateTicketFn"
        @checkTicket="checkTicketFn"
        :currentIndex="curIndex"
        :ticketsList="ticketsValid.list"
        :loadStatus="ticketsValid.loadStatus"
      >
      </activityTicketsList>
      <activityTicketsList
        v-else-if="curIndex === 1"
        @updateTicket="updateTicketFn"
        @checkTicket="checkTicketFn"
        :currentIndex="curIndex"
        :ticketsList="ticketsInvalid.list"
        :loadStatus="ticketsInvalid.loadStatus"
      ></activityTicketsList>
    </keep-alive>
    <checkTicket
      @closeTicket="checkTicketFn"
      :currentTicket="currTickets"
      :ticketView="ticketView"
      :activity="curActivity"
      :canvasImg="curCanvasImg"
    ></checkTicket>
    <updateTicket
      :ticketForm="formTickets"
      :formView="formView"
      @closeTicket="updateTicketFn"
    >
    </updateTicket>
    <canvas id="canvas" width="320" height="500"></canvas>
  </div>
</template>

<script>
import { getActivityMyJoin, getTicketsRecord } from '@/server/index.js';
import { Tab, TabItem } from 'vux';
import activityTicketsList from '@/components/activityTicketsList';
import checkTicket from '@/components/checkTicket';
import updateTicket from '@/components/updateTicket';

export default {
  data() {
    return {
      ticketsInvalid: { // 失效
        list: [],
        ticketsTotal: '',
        loadStatus: 0,
        nextPage: 1,
      },
      ticketsValid: {
        list: [],
        ticketsTotal: '',
        loadStatus: 0,
        nextPage: 1,
      },
      ticketStatus: ['ticketsValid', 'ticketsInvalid'],
      ticketStatusNum: [true, false],
      curIndex: 0, // 0有效 1失效
      curCanvasImg: null,
      currTickets: {},
      ticketView: false,
      curActivity: {},
      formView: false,
      formTickets: {},
      curIndexTicket: '', // 编辑当前门票index
      curIndexActivity: '', // 编辑当前门票所在会议的index
    };
  },
  mounted() {
    this.getTicketsCount();
    this.getActivityTicketsList();
  },
  // computed: {
  //   // getInvalidTicketTotalCount() {
  //   //   let count = 0;
  //   //   this.ticketsInvalid.forEach((item) => {
  //   //     count += item.ticketsRecords.length;
  //   //   });
  //   //   return count;
  //   // },
  //   // getValidTicketTotalCount() {
  //   //   let count = 0;
  //   //   this.ticketsValid.forEach((item) => {
  //   //     count += item.ticketsRecords.length;
  //   //   });
  //   //   return count;
  //   // },
  // },
  methods: {
    getTicketsCount() {
      getTicketsRecord().then((res) => {
        // debugger;
        if (res.code === 0) {
          this.ticketsInvalid.ticketsTotal = res.data.invalid;
          this.ticketsValid.ticketsTotal = res.data.valid;
        }
      });
    },
    updateTicketFn(isview, data, tindex, aindex) {
      this.formView = isview;
      if (isview) { // open弹窗
        this.formTickets = data;
        this.curIndexTicket = tindex;
        this.curIndexActivity = aindex;
      } else {
        // 关闭弹窗 两种情况:1、普通关闭；
        if (!tindex) return;// 2、更新提交后关闭,改变本地数据
        const ticketStatus = this.ticketStatus[this.curIndex];
        const aindexVal = this.curIndexActivity;
        const tindexVal = this.curIndexTicket;
        this[ticketStatus].list[aindexVal].ticketsRecords.splice(tindexVal, 1, data);
      }
    },
    checkTicketFn(isview, data, activity) {
      this.ticketView = isview; // false 关闭 true 弹出
      if (isview) {
        this.createCanvas(data, activity);
        this.currTickets = data;
        this.curActivity = activity;
      }
    },
    /* ******************************* 初始化canvas并且绘制并且转换成png ******************************** */
    createCanvas(ticket, activity) {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      // 重置画布高度，相当于清空画布
      canvas.height = canvas.height;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 320, 500);
      // ctx.fillStyle = '#213C67';
      // ctx.fillRect(0, 0, 156, 786);
      // 这里绘画~  212，213行 用到时解开注释；

      // 绘制PDF默认标题
      // this.PDFDrawDefine(ctx);
      // 绘制PDF会议门票基本信息

      // 生成
      this.curCanvasImg = this.downLoadImage(canvas);
    },
    downLoadImage(canvas) {
      const img = new Image();
      img.src = canvas.toDataURL('image/png');
      return img;
    },
    loadMore() {
      // debugger;
      const index = this.curIndex;// 标签
      const statusText = this.ticketStatus[index];// 对应data
      const curStatus = this.ticketStatusNum[index];// 对应当前状态
      this.getTicketsList(this[statusText].nextPage, curStatus, statusText);
    },
    getTicketsList(num, valid, statusText) {
      // debugger;
      if (this[statusText].loadStatus !== 0) return;
      this[statusText].loadStatus = 1;
      const query = {
        pageNum: num,
        pageSize: 2,
        isValid: valid,
      };
      getActivityMyJoin(query).then((data) => {
        // debugger;
        if (data.code === 0) {
          this[statusText].list.push(...data.data.list);
          if (data.data.hasNextPage) {
            this[statusText].nextPage += 1;
            this[statusText].loadStatus = 0;
          } else {
            this[statusText].loadStatus = 2;
          }
        } else {
          this.$vux.toast.text(data.msg, 'middle');
        }
      }).catch((e) => {
        this[statusText].loadStatus = 0;
        console.warn(e);
      });
    },
    getActivityTicketsList() {
      this.getTicketsList(1, true, 'ticketsValid');
      this.getTicketsList(1, false, 'ticketsInvalid');
    },
    onTabItemClick(index) {
      this.curIndex = index;
    },
  },
  filters: {
    // calcTicketType(value) {
    //   return (value.notPassOrOver ? '已失效' : '未通过');
    //   return (value.isCheck ? '已出票' : '待审核');
    // },
    adressFormat(value = '{}') {
      let temp = JSON.parse(value);
      temp = Object.values(temp);
      temp = temp.join('');
      return temp;
    },
  },
  components: {
    Tab,
    TabItem,
    activityTicketsList,
    checkTicket,
    updateTicket,
  },
};
</script>

<style lang="less">
.PPParticipate {
  .tab-container{
    background-color: #f4f7fa;
    .SLtab {
      width: 85%;
      background-color: #f4f7fa;
      margin: 0 auto;
      .vux-tab-container {
        .vux-tab {
          background-color: #f4f7fa;
          padding: 0 20px;
          box-sizing: border-box;
          border: 0;
          .vux-tab-item {
            background-size: 100% 0px;
            // flex: 0 0 50%;
          }

        }
      }
    }
  }

  // .bottom{
  //   text-align: center;
  //   color: #b8bcc4;
  //   margin: 15px;
  // }
}
</style>
