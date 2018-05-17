<template>
  <div class="ticketsRecordActivityList">
    <tab :line-width="2" custom-bar-width="60px">
      <tab-item selected  @on-item-click="handleIndex">进行中</tab-item>
      <tab-item @on-item-click="handleIndex">已结束</tab-item>
    </tab>
    <div>
      <bannerItem
        v-if='currentStatus === 1'
        :activityBannerMobileUrl='item.activityBannerMobileUrl'
        :activityTitle='item.activityTitle'
        :key='inx'
        v-for='(item,inx) in activityList'
        @click.native="$router.push(`/record/${item.id}`)"/>
      <bannerItem
        v-if='currentStatus === 0'
        :activityBannerMobileUrl='item.activityBannerMobileUrl'
        :activityTitle='item.activityTitle'
        :key='inx'
        v-for='(item,inx) in activityList'
        @click.native="$router.push(`/record/${item.id}`)"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Tab, TabItem, AlertModule, Alert } from 'vux';
import bannerItem from '@/components/bannerList';
import { getActivityList, getProfile } from '@/server';


export default {
  data() {
    return {
      currentStatus: 1, // 1:进行中 3：已结束
      activityList: [],
      endList: [],
    };
  },
  created() {
    this.getActivityList();
  },
  computed: {
    ...mapGetters([
      'id',
    ]),
  },
  methods: {
    async getActivityList() {
      const user = await getProfile();
      if (user.code === 0) {
        getActivityList(this.currentStatus).then((res) => {
          this.activityList = res.data;
          // console.log(this.activityList, 1);
        });
        // getActivityList(0).then((res) => {
        //   this.endList = res.data;
        //   // console.log(this.endList, 0)
        // });
      } else {
        this.noLogin();
      }
    },
    noLogin() {
      AlertModule.show({
        title: '当前用户未登录！',
        content: '前往登录？',
        onHide() {
          // console.log('Plugin: I\'m hiding now');
          window.location.href = 'http://login.ourwill.cn/login';
        },
      });
    },
    handleIndex(index) {
      if (index === 0) { // 进行中
        this.currentStatus = 1;
        this.getActivityList();
      } else if (index === 1) { // 已结束
        this.currentStatus = 0;
        this.getActivityList();
      }
    },
  },
  components: {
    Tab, TabItem, bannerItem, AlertModule, Alert,
  },
};
</script>
<style lang="less">
.ticketsRecordActivityList {
  .vux-tab-warp{
    margin-bottom: 15px;
  }
}
.weui-dialog__btn, .weui-dialog__btn_primary {
  color: #2c7dfa;
}
</style>
