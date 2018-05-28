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
          有效票({{ticketsIsValid.total}})
        </tab-item>
        <tab-item @on-item-click="onTabItemClick">
          已失效({{ticketsIsInvalid.total}})
        </tab-item>
      </tab>
    </div>
    <div class="activityListView" v-if="curIndex === 0">
      <ul>
        <li v-for="(activity, index) in ticketsIsValid.list" class="activityTicketsListLi" :key="index">
          <activityTicketsList
            @updateTicket="updateTicketFn"
            @checkTicket="checkTicketFn" 
            @update="getActivityTicketsList" 
            :currentIndex="curIndex" 
          :activity="activity"></activityTicketsList>
        </li>
      </ul>
    </div>
    <div class="activityListView" v-if="curIndex === 1">
      <ul>
        <li v-for="(activity, index) in ticketsIsInvalid.list" class="activityTicketsListLi" :key="index">
          <activityTicketsList 
            @updateTicket="updateTicketFn"
            @checkTicket="checkTicketFn" 
            @update="getActivityTicketsList" 
            :currentIndex="curIndex" 
            :activity="activity"
          ></activityTicketsList>
        </li>
      </ul>
    </div>
    <div class="bottom">
      已经到底啦~
    </div>
    <checkTicket
      @closeTicket="checkTicketFn"
      :currentTicket="currTickets"
      :ticketView="ticketView"
      :activity="curActivity"
    ></checkTicket>
    <updateTicket
      :ticketForm="formTickets"
      :formView="formView"
      @closeTicket="updateTicketFn"
    >
    </updateTicket>
  </div>
</template>

<script>
import { getActivityMyJoin } from '@/server/index.js';
import { Tab, TabItem } from 'vux';
import activityTicketsList from '@/components/activityTicketsList';
import checkTicket from '@/components/checkTicket';
import updateTicket from '@/components/updateTicket';

export default {
  data() {
    return {
      ticketsIsInvalid: { // 失效
        list: [],
        ticketsTotal: '',
        Total: '',
      },
      ticketsIsValid: {
        list: [],
        ticketsTotal: '',
        Total: '',
      },
      curIndex: 0, // 0有效 1失效
      currTickets: {},
      ticketView: false,
      curActivity: {},
      formView: false,
      formTickets: {},
    };
  },
  mounted() {
    this.getActivityTicketsList();
  },
  // computed: {
  //   // getInvalidTicketTotalCount() {
  //   //   let count = 0;
  //   //   this.ticketsIsInvalid.forEach((item) => {
  //   //     count += item.ticketsRecords.length;
  //   //   });
  //   //   return count;
  //   // },
  //   // getValidTicketTotalCount() {
  //   //   let count = 0;
  //   //   this.ticketsIsValid.forEach((item) => {
  //   //     count += item.ticketsRecords.length;
  //   //   });
  //   //   return count;
  //   // },
  // },
  methods: {
    updateTicketFn(isview, data) {
      this.formView = isview;
      if (isview) {
        this.formTickets = data;
      }
    },
    checkTicketFn(isview, data, activity) {
      this.ticketView = isview;
      if (isview) {
        this.currTickets = data;
        this.curActivity = activity;
      }
    },
    async getTicketsList(num, valid) {
      const query = {
        pageNum: num,
        pageSize: 2,
        isValid: valid,
      };
      const res = await getActivityMyJoin(query);
      if (res.code === 0) {
        return res.data;
      }
      return {
        list: [],
        ticketsTotal: '',
        Total: '',
      };
    },
    getActivityTicketsList() {
      const res0 = this.getTicketsList(1, true);
      const res1 = this.getTicketsList(1, false);
      Promise.all([res0, res1]).then((values) => {
        this.ticketsIsValid = values[0];
        this.ticketsIsInvalid = values[1];
      });
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
  .activityListView {
    ul {
      width: calc(~'100% - 40px');
      padding: 0 20px;
      .activityTicketsListLi {
        width: 100%;
        margin-bottom: 10px;
        list-style-type: none;
      }
    }
  }
  .bottom{
    text-align: center;
    color: #b8bcc4;
    margin: 15px;
  }
}
</style>
