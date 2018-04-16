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
          有效票({{getTicketTotalCount1}})
        </tab-item>
        <tab-item @on-item-click="onTabItemClick">
          已失效({{getTicketTotalCount0}})
        </tab-item>
      </tab>
    </div>
    <div class="activityListView" v-if="currentShowActivityIndex === 0">
      <ul>
        <li v-for="(activity, index) in ticketsIsValid" class="activityTicketsListLi" :key="index">
          <activityTicketsList :currentIndex="currentShowActivityIndex" :activity="activity"></activityTicketsList>
        </li>
      </ul>
    </div>
    <div class="activityListView" v-if="currentShowActivityIndex === 1">
      <ul>
        <li v-for="(activity, index) in ticketsIsInvalid" class="activityTicketsListLi" :key="index">
          <activityTicketsList :currentIndex="currentShowActivityIndex" :activity="activity"></activityTicketsList>
        </li>
      </ul>
    </div>
    <div class="bottom">
      已经到底啦~
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getActivityWithStatus } from '@/server/index.js';
import { Tab, TabItem } from 'vux';
import activityTicketsList from '@/components/activityTicketsList';

export default {
  data() {
    return {
      ticketsIsInvalid: [
        {
          activityId: 1,
          activityTitle: '吃饭',
          startTime: '2018-04-14 08:00:00',
          endTime: '2018-04-25 20:00:00',
          activityBannerMobileUrl: 'http://p5zhgy42k.bkt.clouddn.com/test/15/20180322/1523002854047.jpg',
          activityAddress: `{"province":"北京市","city":"东城区","address":"测试"}`,
          activityTickets: [
            {
              id: 3,
              ticketName: "vip门票1",
              ticketPrice: 100,
              confereeName: "林吉炫",
              confereePhone: "13111111111",
              confereeEmail: "llllll@qq.com",
              startTime: '2018-04-14 08:00:00',
              cutTime: '2018-04-14 08:00:00',
              activityAddress: `{"province":"北京市","city":"东城区","address":"测试"}`,
              getTicketCode: '2018 0320 1234 1558',
              QRcode: 'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=fa9140accd95d143ce7bec711299e967/2934349b033b5bb571dc8c5133d3d539b600bc12.jpg',
              notPassOrOver: 1,
              isFree: 0,
              isCheck: 1,
              userId: 1,
            },
          ],
        },
        {
          activityId: 1,
          activityTitle: '打麻将',
          startTime: '2018-04-14 08:00:00',
          endTime: '2018-04-25 20:00:00',
          activityBannerMobileUrl: 'http://p5zhgy42k.bkt.clouddn.com/test/15/20180322/1523002854047.jpg',
          activityAddress: `{"province":"北京市","city":"东城区","address":"测试"}`,
          activityTickets: [
            {
              id: 3,
              ticketName: "vip门票2",
              ticketPrice: 100,
              confereeName: "林吉炫",
              confereePhone: "13111111111",
              confereeEmail: "llllll@qq.com",
              startTime: "2018-04-08 08:00:00",
              cutTime: "2018-04-30 18:21:09",
              activityAddress: `{"province":"北京市","city":"东城区","address":"测试"}`,
              getTicketCode: '2018 0320 1234 1558',
              QRcode: 'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=fa9140accd95d143ce7bec711299e967/2934349b033b5bb571dc8c5133d3d539b600bc12.jpg',
              notPassOrOver: 0,
              isFree: 0,
              isCheck: 1,
              userId: 1,
            },
            {
              id: 3,
              ticketName: "vip门票3",
              ticketPrice: 0,
              confereeName: "林吉炫",
              confereePhone: "13111111111",
              confereeEmail: "llllll@qq.com",
              startTime: "2018-04-08 08:00:00",
              cutTime: "2018-04-30 18:21:09",
              activityAddress: `{"province":"北京市","city":"东城区","address":"测试"}`,
              getTicketCode: '2018 0320 1234 1558',
              QRcode: 'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=fa9140accd95d143ce7bec711299e967/2934349b033b5bb571dc8c5133d3d539b600bc12.jpg',
              notPassOrOver: 0,
              isFree: 1,
              isCheck: 0,
              userId: 1,
            },
          ],
        },
      ],
      ticketsIsValid: [
        {
          activityId: 1,
          activityTitle: '吃饭',
          startTime: '2018-04-14 08:00:00',
          endTime: '2018-04-25 20:00:00',
          activityBannerMobileUrl: "http://p5zhgy42k.bkt.clouddn.com/test/15/20180322/1523002854047.jpg",
          activityAddress: `{"province":"北京市","city":"东城区","address":"测试"}`,
          activityTickets: [
            {
              id: 3,
              ticketName: "vip门票4",
              ticketPrice: 100,
              confereeName: "林吉炫",
              confereePhone: "13111111111",
              confereeEmail: "llllll@qq.com",
              startTime: "2018-04-08 08:00:00",
              cutTime: "2018-04-30 18:21:09",
              activityAddress: `{"province":"北京市","city":"东城区","address":"测试"}`,
              getTicketCode: '2018 0320 1234 1558',
              QRcode: 'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=fa9140accd95d143ce7bec711299e967/2934349b033b5bb571dc8c5133d3d539b600bc12.jpg',
              isFree: 0,
              isCheck: 1,
              userId: 1,
            },
            {
              id: 3,
              ticketName: "vip门票5",
              ticketPrice: 0,
              confereeName: "林吉炫",
              confereePhone: "13111111111",
              confereeEmail: "llllll@qq.com",
              startTime: "2018-04-08 08:00:00",
              cutTime: "2018-04-30 18:21:09",
              activityAddress: `{"province":"北京市","city":"东城区","address":"测试"}`,
              getTicketCode: '2018 0320 1234 1558',
              QRcode: 'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=fa9140accd95d143ce7bec711299e967/2934349b033b5bb571dc8c5133d3d539b600bc12.jpg',
              isFree: 1,
              isCheck: 0,
              userId: 1,
            },
          ],
        },
        {
          activityId: 1,
          activityTitle: '打麻将',
          startTime: '2018-04-14 08:00:00',
          endTime: '2018-04-25 20:00:00',
          activityBannerMobileUrl: "http://p5zhgy42k.bkt.clouddn.com/test/15/20180322/1523002854047.jpg",
          activityAddress: `{"province":"北京市","city":"东城区","address":"测试"}`,
          activityTickets: [
            {
              id: 3,
              ticketName: "vip门票6",
              ticketPrice: 100,
              confereeName: "林吉炫",
              confereePhone: "13111111111",
              confereeEmail: "llllll@qq.com",
              startTime: "2018-04-08 08:00:00",
              cutTime: "2018-04-30 18:21:09",
              activityAddress: `{"province":"北京市","city":"东城区","address":"测试"}`,
              getTicketCode: '2018 0320 1234 1558',
              QRcode: 'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=fa9140accd95d143ce7bec711299e967/2934349b033b5bb571dc8c5133d3d539b600bc12.jpg',
              isFree: 0,
              isCheck: 1,
              userId: 1,
            },
          ],
        },
      ],
      currentShowActivityIndex: 0,
    };
  },
  mounted() {
    // this.getActivityTicketsList();
  },
  computed: {
    getTicketTotalCount1() {
      let count = 0;
      // debugger;
      this.ticketsIsValid.forEach((item) => {
        count += item.activityTickets.length;
      });
      return count;
    },
    getTicketTotalCount0() {
      let count = 0;
      // debugger;
      this.ticketsIsInvalid.forEach((item) => {
        count += item.activityTickets.length;
      });
      return count;
    },
  },
  methods: {
    // async getActivityTicketsList() {
    //   const res0 = await getActivityWithStatus(0);
    //   this.ticketsIsInvalid = res0.data.list;
    //   const res1 = await getActivityWithStatus(1);
    //   this.ticketsIsValid = res1.data.list;
    //   if (res1.code !== 0 || res2.code !== 0) {
    //     console.log('error in getActivityTicketsList');
    //   }
    // },
    onTabItemClick(index) {
      this.currentShowActivityIndex = index;
    },
  },
  filters: {
    // calcTicketType(value) {
    //   return (value.notPassOrOver ? '已失效' : '未通过');
    //   return (value.isCheck ? '已出票' : '待审核');
    // }
    timeFormatFromStartToEnd(value = '') {
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
