<template>
  <div class="buyTicket">
    <div class="header">
      <headerWithProcess></headerWithProcess>
    </div>
    <div class="routerBody">
      <keep-alive>
        <router-view @countChangeWithId="countChangeWithId"></router-view>
      </keep-alive>
    </div>
    <shopCart v-if="this.$route.name !== 'success'"></shopCart>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { getTicketsByActivityId } from '@/server/index.js';
import headerWithProcess from '@/components/headerWithProcess.vue';
import shopCart from '@/components/shopCart.vue';

export default {
  data() {
    return {
      ticketsList: [
        {
          id: 12,
          ticketName: '门票1',
          totalNumber: 45,
          sellStatus: 12,
          ticketPrice: 0,
          isCheck: true,
        },
        {
          id: 13,
          ticketName: '门票2',
          totalNumber: 45,
          sellStatus: 12,
          ticketPrice: 457,
          isCheck: true,
        },
        {
          id: 14,
          ticketName: '门票3',
          totalNumber: 45,
          sellStatus: 12,
          ticketPrice: 75,
          isCheck: true,
        },
        {
          id: 15,
          ticketName: '门票4',
          totalNumber: 45,
          sellStatus: 12,
          ticketPrice: 4,
          isCheck: true,
        },
        {
          id: 16,
          ticketName: '门票5',
          totalNumber: 45,
          sellStatus: 12,
          ticketPrice: 26,
          isCheck: true,
        },
      ],
      ticketsData: [],
    };
  },
  computed: {
    ...mapGetters([
      'activityId',
      'tickets',
      'query',
    ]),
  },
  mounted() {
    this.setActivityId(this.$route.params.activityId);

    this.getTicketsById();
  },
  methods: {
    async getTicketsById() {
      const res = await getTicketsByActivityId(this.activityId);
      this.ticketsData = res.data;
      // 初始化state ==> tickets
      this.resetState(this.ticketsData);
      if (res.code !== 0) {
        console.log('error in getTicketsById');
      }
    },
    resetState(ticketsList) {
      const tickets = this.resetTickets(ticketsList);
      this.setTickets(tickets);
      this.resetSelTickets(tickets);
      this.resetQueryBySelTickets(tickets);
    },
    resetTickets(ticketsList) { // 给门票数据加入count字段
      return ticketsList.map((item) => {
        // eslint-disable-next-line
        item.count = ~Object.keys(this.$route.query).indexOf(item.id.toString()) ? Number(this.$route.query[item.id]) : 0;
        return item;
      });
    },
    resetSelTickets(tickets) {
      const selTickets = [];
      tickets.forEach((ticket) => {
        if (ticket.count) {
          selTickets.push(ticket);
        }
      });
      this.setSelTicketsByChangeCount(selTickets);
    },
    resetQueryBySelTickets(tickets) {
      const query = {};
      tickets.forEach((item) => {
        if (item.count) {
          query[item.id] = item.count;
        }
      });
      this.setQuery(query);
    },
    // 根据id添加相应的cont字段表示已经选择的门票个数
    countChangeWithId(id, val) { // 响应子组件事件方法
      const tickets = this.tickets.map((item) => {
        if (item.id === id) {
          // eslint-disable-next-line
          item.count = val;
        }
        return item;
      });
      this.setTickets(tickets);
      this.resetSelTickets(tickets);
      this.resetQueryBySelTickets(tickets);
    },
    ...mapMutations({
      setActivityId: 'SET_ACTIVITY_ID',
      setTickets: 'SET_TICKETS',
      setSelTicketsByChangeCount: 'SET_SELTICKETS',
      setQuery: 'SET_QUERY',
    }),
  },
  components: {
    headerWithProcess,
    shopCart,
  },
};
</script>

<style lang="less">
@import '../common/style/mixin.less';

.buyTicket {
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
  }
  .routerBody {
    margin-top: 100px;
  }
}

</style>
