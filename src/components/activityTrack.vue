<template>
  <div class=" dynamic-center">
    <div class="flex-box" v-for="(item,index) in dynamicList" :key="index" v-if="item.user">
      <div class="left">
        <img :src="item.user.avatarUrl" alt="">
      </div>
      <div v-if="curStatus === 'meetingData'" class="center">
        <!-- 别人收藏你 -->
        <div v-if="item.status">
          <h5>{{item.user.nickname}}</h5>
          <p>收藏了你的活动</p>
          <p class="time">{{item.watchDate | timeApart}}</p>
        </div>
        <div v-else>
          <h5>我<span class="gray">收藏了活动</span></h5>
          <h5>{{item.activity.activityTitle}}</h5>
          <p class="time">{{item.watchDate | timeApart}}</p>
        </div>
      </div>
      <div v-else class="center">
        <div v-if="item.status">
          <h5>{{item.user.nickname?item.user.nickname:item.user.username}}<span class="gray">关注了你</span></h5>
          <p class="time">{{item.watchDate | timeApart}}</p>
        </div>
        <div v-else>
          <h5>我<span class="gray">关注了</span>{{item.user.nickname?item.user.nickname:item.user.username}}</h5>
          <p class="time">{{item.watchDate | timeApart}}</p>
        </div>
      </div>
      <div v-if="curStatus === 'meetingData'" class="right" @click='$router.push("/activity/"+item.activityId)'>
        <img :src="item.activity.activityBannerMobileUrl" alt="">
      </div>
    </div>
    <div class="activity-footer" v-show="dynamicList && dynamicList.length > 0">
      <span class="no-more-tip" v-if='loadStatus === 2'>没有更多数据</span>
      <span class="loading-tip" v-else-if='loadStatus === 1'>加载中...</span>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    dynamicList: {
      type: Array,
    },
    loadStatus: {
      type: Number,
    },
    curStatus: {
      type: String,
    },
  },
  filters: {
    timeApart(value = '') {
      // eslint-disable-next-line
      const val = value ? value : '';
      const occur = new Date(val.replace(/-/g, '/')).getTime();
      const now = new Date().getTime();
      const dis = now - occur;
      let temp = '';
      if (dis < (1000 * 60)) {
        temp = `${parseInt(dis / 1000, 10)}秒前`;
      } else if (dis < (1000 * 60 * 60)) {
        temp = `${parseInt(dis / 1000 / 60, 10)}分钟前`;
      } else if (dis < (1000 * 60 * 60 * 24)) {
        temp = `${parseInt(dis / 1000 / 60 / 60, 10)}小时前`;
      } else if (dis < (1000 * 60 * 60 * 24 * 365)) {
        temp = `${parseInt(dis / 1000 / 60 / 60 / 24, 10)}天前`;
      } else if (dis) {
        temp = `${parseInt(dis / 1000 / 60 / 60 / 24 / 365, 10)}年前`;
      }
      return temp;
    },
  },
};
</script>

<style lang="less">
@import '../common/style/mixin.less';
.dynamic-center{
  
  .flex-box{
    &:not(:last-child){
      .border-1px-b(#d8dbe0);
    }
    background-color:#fff;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 95px;
    .left{
      width: 55px;
      min-width: 55px;
      max-width: 55px;
      flex-grow: 0;
      img{
        border-radius: 50%;
        width: 55px;
        height: 55px;
      }
    }
    .center{
      flex-grow: 1;
      padding: 0 15px;
      h5{
        font-weight: normal;
        font-size: 14px;
        color:#2b313c;
        .gray{
          margin-left: 10px;
          margin-right: 10px;
          color:#5d6574;
        }
      }
      p{
        color:#5d6574;
        font-size: 14px;
        &.time{
          color:#b8bcc4;
          font-size: 12px;
        }
      }
    }
    .right{
      width: 110px;
      min-width: 110px;
      max-width: 110px;
      flex-grow: 0;
      img{
        width: 110px;
        height: 60px;
      }
    }
  }
}
</style>
