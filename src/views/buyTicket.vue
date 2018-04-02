<template>
  <div class="buyTicket">
    <div class="header">
      <headerWithProcess :query="setQuery" :activityId="parseInt(this.$route.params.activityId)"></headerWithProcess>
    </div>
    <div class="routerBody">
      <keep-alive>
        <router-view :tickets="tickets" :select-tickets="selectTickets"></router-view>
      </keep-alive>
    </div>
    <shopCart ref="shopCart" :query="setQuery" :select-tickets="selectTickets"></shopCart>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapMutations } from 'vuex';
// import { mapMutations, mapState } from 'vuex';
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
      // meeting: {
      //   code: 0,
      //   tickets: {
      //     title: '2017年国际节能与新能源汽车展览会',
      //     list: [
      //       {
      //         name: '1月12日门票', // 门票名称
      //         surplus: 45,        // 剩余票数
      //         price: 0,           // 价格
      //         needVerify: true,   // 是否需要官方审核
      //         canInvoice: false,  // 能否开发票
      //       },
      //       {
      //         name: 'VIP贵宾票',
      //         surplus: 15,
      //         price: 99,
      //         needVerify: true,
      //         canInvoice: true,
      //       },
      //       {
      //         name: 'VIP早鸟票',
      //         surplus: 0,
      //         price: 59,
      //         needVerify: true,
      //         canInvoice: true,
      //       },
      //       {
      //         name: '1月12日门票',
      //         surplus: 45,
      //         price: 0,
      //         needVerify: true,
      //         canInvoice: false,
      //       },
      //       {
      //         name: 'VIP贵宾票',
      //         surplus: 15,
      //         price: 99,
      //         needVerify: true,
      //         canInvoice: true,
      //       },
      //       {
      //         name: 'VIP早鸟票',
      //         surplus: 0,
      //         price: 59,
      //         needVerify: true,
      //         canInvoice: true,
      //       },
      //     ],
      //     total: 60,
      //   },
      // },
      // tickets: [],
    };
  },
  computed: {
    // ...mapState({ activityId: state => state.activityId }),
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
      const tickets = this.tickets.map((v) => {
        /* eslint max-len: ["error", 200] */
        v.count = ~Object.keys(this.$route.query).indexOf(v.id) ? 0 : Number(this.$route.query[v.id]);
        return v;
      });
      this.tickets = tickets;
      // if (res.code !== 0) {
      //   console.log('error in getTicketsById');
      // }
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
