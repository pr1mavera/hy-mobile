<template>
  <div class="activity-list-new">
    <ul>
      <li v-for="(activity, index) in activityList" :key="index">
        <div class="activityList" @click='$router.push("/activity/"+activity.id)'>
          <div class="listImg">
            <img :src="activity.activityBannerMobileUrl">
          </div>
          <div class="listContent">
            <p class="name">{{activity.activityTitle}}</p>
            <p class="date">{{activity.startTime | timeFilter}}</p>
          </div>
        </div>
      </li>
    </ul>
    <div class="activity-footer" v-show="activityList && activityList.length > 0">
      <span class="no-more-tip" v-if='loadStatus === 2'>没有更多数据</span>
      <span class="loading-tip" v-else-if='loadStatus === 1'>加载中...</span>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/common/js/index.js';

export default {
  props: {
    activityList: {
      type: Array,
    },
    loadStatus: {
      type: Number,
    },
  },
  filters: {
    timeFilter(val) {
      const temp = new Date(val.replace(/-/g, '/'));
      return formatDate(temp, 'MM月dd日 hh:mm');
    },
  },
  computed: {
    // noShow() {
    //   return this.activityList && this.activityList.length > 0;
    // },
  },
};
</script>

<style lang="less">
.activity-list-new{
    li {
      margin-bottom: 5px;
      padding: 14px 20px;
      background-color: #ffffff;
      list-style-type:none;
    }
}
.activityList {
  width: 100%;
  // padding: 14px 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  .listImg {
    width: 130px;
    height: 70px;
    border-radius: 4px;
    overflow: hidden;
    margin-right: 14px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .listContent {
    width: calc(~"100% - 144px");
    .name {
      font-size: 16px;
      color: #2b313c;
    }
    .date {
      font-size: 12px;
      font-weight: 200;
      color: #9098a8;
    }
  }
}
</style>
