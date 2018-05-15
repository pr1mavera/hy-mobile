<template>
  <div class="ticketsRecordActivityList">
    <tab :line-width="2" custom-bar-width="60px">
      <tab-item selected>进行中</tab-item>
      <tab-item>已结束</tab-item>
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
        v-if='currentStatus === 3'
        :activityBannerMobileUrl='item.activityBannerMobileUrl'
        :activityTitle='item.activityTitle'
        :key='inx'
        v-for='(item,inx) in endList'
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
      currentStatus: 1,
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
        getActivityList(1).then((res) => {
          this.activityList = res.data;
        });
        getActivityList(3).then((res) => {
          this.endList = res.data;
        });
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
