<template>
  <div class="buyTicket">
    <div class="header">
      <headerWithProcess :query="setQuery" :activity-id="parseInt(this.$route.params.activityId)"></headerWithProcess>
    </div>
    <div class="routerBody">
      <keep-alive>
        <router-view :tickets="ticketsData" :select-tickets="selectTickets"></router-view>
      </keep-alive>
    </div>
    <shopCart ref="shopCart" :query="setQuery" :select-tickets="selectTickets"></shopCart>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapMutations, mapState } from 'vuex';
// import { getTicketsByActivityId } from '@/server/index.js';
import headerWithProcess from '@/components/headerWithProcess.vue';
import shopCart from '@/components/shopCart.vue';

export default {
  data() {
    return {
      tickets: [
        {
          id: 12,
          ticketName: '1月12日门票',
          totalNumber: 45,
          sellStatus: 12,
          ticketPrice: 0,
          isCheck: true,
        },
        {
          id: 13,
          ticketName: '1月12日门票',
          totalNumber: 45,
          sellStatus: 12,
          ticketPrice: 457,
          isCheck: true,
        },
        {
          id: 14,
          ticketName: '1月12日门票',
          totalNumber: 45,
          sellStatus: 12,
          ticketPrice: 75,
          isCheck: true,
        },
        {
          id: 15,
          ticketName: '1月12日门票',
          totalNumber: 45,
          sellStatus: 12,
          ticketPrice: 4,
          isCheck: true,
        },
        {
          id: 16,
          ticketName: '1月12日门票',
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
    // ...mapState({ activityId: state => state.activityId }),
    ...mapState({ tickets: 'tickets' }),
    selectTickets() {
      const tickets = [];
      this.tickets.forEach((ticket) => {
        if (ticket.count) {
          tickets.push(ticket);
        }
      });
      return tickets;
    },
    setQuery() {
      const query = {};
      this.selectTickets.forEach((item) => {
        query[item.id] = item.count;
      });
      return query;
    },
  },
  mounted() {
    this.SET_ACTIVITY_ID(this.$route.params.activityId);
    this.getTicketsById();
  },
  methods: {
    ...mapMutations(['SET_ACTIVITY_ID']),
    getTicketsById() {
      // const res = await getTicketsByActivityId(this.activityId);
      // this.tickets = res.data;
      const tickets = this.tickets.map((item) => {
        // eslint-disable-next-line
        item.count = ~Object.keys(this.$route.query).indexOf(item.id.toString()) ? Number(this.$route.query[item.id]) : 0;
        return item;
      });
      this.ticketsData = tickets;
      // if (res.code !== 0) {
      //   console.log('error in getTicketsById');
      // }
    },
    sendProps() {
      this.$router.push({
        path: 'yourPath',
        name: 'fillInTicketMsg',
        query: this.query,
      });
    },
  },
  components: {
    headerWithProcess,
    shopCart,
  },
};
</script>

<style lang="less">
@import '../common/style/mixin.less';

.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
}
.routerBody {
  margin-top: 100px;
}

</style>
