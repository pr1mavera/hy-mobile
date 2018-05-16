<template>
  <div>
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
import { Tab, TabItem } from 'vux';
import bannerItem from '@/components/bannerList';
import { getActivityList } from '@/server';

export default {
  data() {
    return {
      currentStatus: 1,
      activityList: [],
      endList: [],
    };
  },
  created() {
    getActivityList(1).then((res) => {
      this.activityList = res.data.list;
    });
    getActivityList(3).then((res) => {
      this.endList = res.data.list;
    });
  },
  components: {
    Tab, TabItem, bannerItem,
  },
};
</script>
<style>
  .vux-tab-warp{
    margin-bottom: 15px;
  }
</style>