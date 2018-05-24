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
          有效票({{getValidTicketTotalCount}})
        </tab-item>
        <tab-item @on-item-click="onTabItemClick">
          已失效({{getInvalidTicketTotalCount}})
        </tab-item>
      </tab>
    </div>
    <div class="activityListView" v-if="currentShowActivityIndex === 0">
      <ul>
        <li v-for="(activity, index) in ticketsIsValid" class="activityTicketsListLi" :key="index">
          <activityTicketsList @update="getActivityTicketsList" :currentIndex="currentShowActivityIndex" :activity="activity"></activityTicketsList>
        </li>
      </ul>
    </div>
    <div class="activityListView" v-if="currentShowActivityIndex === 1">
      <ul>
        <li v-for="(activity, index) in ticketsIsInvalid" class="activityTicketsListLi" :key="index">
          <activityTicketsList @update="getActivityTicketsList" :currentIndex="currentShowActivityIndex" :activity="activity"></activityTicketsList>
        </li>
      </ul>
    </div>
    <div class="bottom">
      已经到底啦~
    </div>
  </div>
</template>

<script>
import { getActivityMyJoin } from '@/server/index.js';
import { Tab, TabItem } from 'vux';
import activityTicketsList from '@/components/activityTicketsList';

export default {
  data() {
    return {
      ticketsIsInvalid: [ // 失效
        // ticketsRecords: [],
      ],
      ticketsIsValid: [ // 有效
        // ticketsRecords: [],
      ],
      currentShowActivityIndex: 0, // 0有效 1失效
    };
  },
  mounted() {
    this.getActivityTicketsList();
  },
  computed: {

    getInvalidTicketTotalCount() {
      let count = 0;
      this.ticketsIsInvalid.forEach((item) => {
        count += item.ticketsRecords.length;
      });
      return count;
    },
    getValidTicketTotalCount() {
      let count = 0;
      this.ticketsIsValid.forEach((item) => {
        count += item.ticketsRecords.length;
      });
      return count;
    },
  },
  methods: {
    async getActivityTicketsList() {
      const res0 = await getActivityMyJoin(false);
      this.ticketsIsInvalid = res0.data;
      const res1 = await getActivityMyJoin(true);
      this.ticketsIsValid = res1.data;
      if (res1.code !== 0 || res1.code !== 0) {
        console.log('error in getActivityTicketsList');
      }
    },
    onTabItemClick(index) {
      this.currentShowActivityIndex = index;
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
