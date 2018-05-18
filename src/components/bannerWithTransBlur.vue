<template>
  <div class="bannerWithTransBlur">
    <div class="bannerBg">
      <img src="http://p5zhgy42k.bkt.clouddn.com/test/14/20180410/1524643919513.jpg">
    </div>
    <div class="avatar">
      <img :src="this.userProfile.avatarUrl" width="64" height="64">
    </div>
    <div class="title">
      <h1 class="titleItem name">{{this.userProfile.username}}</h1>
      <p class="titleItem desc">{{this.userProfile.info ? this.userProfile.info : '这个人很懒，什么都没有留下...'}}</p>
    </div>
    <x-button class="followBtn" v-if="!isCurrentUser">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon-test"></use>
      </svg>
      关注
    </x-button>
    <!-- <div class="fillBox" v-if="isCurrentUser"></div> -->
    <div class="attribute" v-if="isCurrentUser">
      <div class="item">
        <p>{{this.userProfile.userStatistics.activityCount}}</p>
        <p>会议</p>
      </div>
      <div class="item">
        <p>{{this.userProfile.userStatistics.fansCount}}</p>
        <p>粉丝</p>
      </div>
      <div class="item">
        <p>{{this.userProfile.userStatistics.popularity}}</p>
        <p>人气</p>
      </div>
    </div>
  </div>
</template>

<script>
import { XButton } from 'vux';

export default {
  name: 'detail',
  props: {
    userProfile: {
      type: Object,
    },
    isCurrentUser: {
      type: Number,
    },
  },
  data() {
    return {
      mul: 0,
    };
  },
  created() {

  },
  computed: {

  },
  components: {
    XButton,
  },
};
</script>

<style lang="less">
.bannerWithTransBlur {
  position: relative;
  width: 100%;
  height: 286px;
  color: #ffffff;
  margin-top: -45px;
  text-align: center;
  overflow-y: hidden;
  .bannerBg {
    // position: fixed;
    width: 100%;
    height: 300px;
    top: 0;
    // z-index: -1;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .avatar {
    position: absolute;
    top: 56px;
    left: 50%;
    transform: translate(-50%, 0);
    // transition: all cubic-bezier(0.4, 0, 0.6, 1) .2s;
    img {
      border-radius: 50%;
      border: solid #6586cf 5px;
      object-fit: cover;
    }
  }
  .title {
    position: absolute;
    width: 60%;
    top: 136px;
    left: 50%;
    transform: translateX(-50%);
    // transition: all cubic-bezier(0.165, 0.84, 0.44, 1) .5s;
    &.textAlignLeft {
      text-align: left;
    }
    .titleItem {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .name {
      font-size: 16px;
      line-height: 30px;
      font-weight: 200;
    }
    .desc {
      font-size: 12px;
      opacity: .8;
    }
  }
  .followBtn {
    position: relative;
    width: 60px;
    line-height: 24px;
    font-size: 13px;
    color: #ffffff;
    padding: 0;
    margin-top: 200px;
    background-color: rgba(0, 0, 0, .3);
    border-radius: 2px;
    border: solid #ffffff 1px;
    .icon {
      font-size: 12px;
      transform: scale(.8);
    }
  }
  .fillBox {
    width: 100%;
    height: 34px;
    margin-top: 192px;
  }
  .attribute {
    width: 100%;
    position: absolute;
    bottom:0;
    left:50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    font-size: 14px;
    font-weight: lighter;
    // opacity: .8;
    .item {
      margin: 8px 30px;
      P{
        color: #e6e6e6;
      }
    }
  }
}
</style>
