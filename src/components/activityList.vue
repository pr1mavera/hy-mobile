<template>
  <div class="activityList" @click='$router.push("/activity/"+activity.id)'>
    <div class="listImg">
      <img :src="activity.activityBannerMobileUrl">
    </div>
    <div class="listContent">
      <p class="name">{{activity.activityTitle}}</p>
      <p class="date">{{activity.startTime | timeFilter}}</p>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/common/js/index.js';

export default {
  props: {
    activity: {
      type: Object,
    },
  },
  filters: {
    timeFilter(val) {
      const temp = new Date(val.replace(/-/g, '/'));
      return formatDate(temp, 'MM月dd日 hh:mm');
    },
  },
};
</script>

<style lang="less">
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
