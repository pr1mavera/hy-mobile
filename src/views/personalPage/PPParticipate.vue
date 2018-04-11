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
          有效票({{getTicketTotalCount}})
        </tab-item>
        <tab-item @on-item-click="onTabItemClick">
          已失效({{getTicketTotalCount}})
        </tab-item>
      </tab>
    </div>
    <div class="activityListView" v-if="currentShowActivityIndex === 0">
      <ul>
        <li v-for="(activity, index) in activityTickets" class="activityTicketsListLi" :key="index">
          <activityTicketsList :activity="activity"></activityTicketsList>
        </li>
      </ul>
    </div>
    <div class="activityListView" v-if="currentShowActivityIndex === 1">
      <ul>
        <li v-for="(activity, index) in activityTickets" class="activityTicketsListLi" :key="index">
          <activityTicketsList :activity="activity"></activityTicketsList>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getActivityMyJoin } from '@/server/index.js';
import { Tab, TabItem } from 'vux';
import activityTicketsList from '@/components/activityTicketsList';

export default {
  data() {
    return {
      activityTickets: [],
      currentShowActivityIndex: 0,
    };
  },
  mounted() {
    // this.setId(this.$route.params.id);
    this.getActivityTicketsList();
  },
  computed: {
    getTicketTotalCount() {
      let count = 0;
      // debugger;
      this.activityTickets.forEach((item) => {
        count += item.ticketsRecords.length;
      });
      return count;
    },
  },
  methods: {
    async getActivityTicketsList() {
      const res = await getActivityMyJoin();
      this.activityTickets = res.data.list;
      if (res.code) {
        console.log('error in getActivityTicketsList');
      }
    },
    onTabItemClick(index) {
      this.currentShowActivityIndex = index;
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
}
</style>
