<template>
  <div class="activityList">
    <div class="listImg">
      <img :src="activity.activityBannerUrl">
    </div>
    <div class="listContent">
      <p class="name">{{activity.activityTitle}}</p>
      <p class="date">{{activity.startTime}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    activity: {
      type: Object,
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
