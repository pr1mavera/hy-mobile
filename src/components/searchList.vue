<template>
  <div class="searchList" @click='$router.push("/activity/"+activity.id)'>
    <div class="listImg">
      <img :src="activity.activityBannerMobile">
    </div>
    <div class="listContent">
      <p class="name">{{activity.activityTitle}}</p>
      <p class="date">{{activity.startTime | timeFormat}}</p>
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
    timeFormat(value = '') {
      const temp = new Date(value);
      return formatDate(temp, 'MM月dd日 hh:mm');
    },
  },
};
</script>

<style lang="less">
.searchList {
  width: 100%;
  // padding: 14px 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  .listImg {
    width: 135px;
    height: 75px;
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
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .date {
      font-size: 12px;
      font-weight: 200;
      color: #9098a8;
      position: absolute;
      bottom: 15px;
    }
  }
}
</style>
