<template>
  <div class="buyTicket">
    <div class="header">
      <headerWithProcess :activityId="parseInt(this.$route.params.activityId)"></headerWithProcess>
    </div>
    <div class="routerBody">
      <keep-alive>
        <router-view :tickets="ticketData" :select-tickets="selectTickets"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapMutations, mapState } from 'vuex';
import { getTicketsByActivityId } from '@/server/index.js';
import headerWithProcess from '@/components/headerWithProcess.vue';

export default {
  data() {
    return {
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
      ticketData: [],
    };
  },
  computed: {
    ...mapState({ activityId: state => state.activityId }),
    selectTickets() {
      const tickets = [];
      this.ticketData.forEach((ticket) => {
        if (ticket.count) {
          tickets.push(ticket);
        }
      });
      return tickets;
    },
  },
  mounted() {
    this.SET_ACTIVITY_ID(this.$route.params.activityId);
    this.getTicketsById();
  },
  methods: {
    ...mapMutations(['SET_ACTIVITY_ID']),
    async getTicketsById() {
      const res = await getTicketsByActivityId(this.activityId);
      this.ticketData = res.data;
      if (res.code !== 0) {
        console.log('error in getTicketsById');
      }
    },
  },
  components: {
    headerWithProcess,
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
