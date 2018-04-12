<template>
  <div class="bannerWithTransBlur">
    <div class="bannerBg">
      <img src="http://p5zhgy42k.bkt.clouddn.com/test/14/20180410/1524643919513.jpg">
    </div>
    <div class="avatar" :style="this.setAvatarByScrollY">
      <img src="@/views/personalPage/icon.png" width="64" height="64">
    </div>
    <div class="title" :style="this.setTitleByScrollY" :class="{'textAlignLeft': this.scrollY > 0}">
      <!-- <h1 class="titleItem name">{{this.userProfile.nickname}}</h1> -->
      <!-- <p class="titleItem desc">这个人很烂，什么都没有留下...</p> -->
      <h1 class="titleItem name">家居安静安静安静安静啊</h1>
      <p class="titleItem desc">{{this.scrollY}}</p>
    </div>
    <x-button class="followBtn" v-if="this.$route.query.id">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon-test"></use>
      </svg>
      关注
    </x-button>
    <div class="fillBox" v-if="!this.$route.query.id"></div>
    <div class="attribute">
      <div class="item">
        <p>223</p>
        <p>会议</p>
      </div>
      <div class="item">
        <p>3366</p>
        <p>粉丝</p>
      </div>
      <div class="item">
        <p>160</p>
        <p>人气</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XButton } from 'vux';

export default {
  name: 'detail',
  props: {
    userProfile: {
      type: Object,
    },
    scrollY: {
      type: Number,
    },
  },
  data() {
    return {
      mul: 0,
    };
  },
  computed: {
    setAvatarByScrollY() {
      const mul = this.scrollY / 50;
      let X = 50;
      let Y = 56;
      if (this.scrollY >= 0) {
        if (mul <= 1) {
          // eslint-disable-next-line
          X = 50 + mul * 160;
          // eslint-disable-next-line
          Y = 56 + mul * 50;
        } else if (mul >= 1) {
          X = 50 + 160;
          Y = 56 + 50;
        }
      }
      return `top: ${Y}px; transform: translateX(-${X}%);`;
    },
    setTitleByScrollY() {
      const mul = this.scrollY / 50;
      let X = 50;
      let Y = 136;
      if (this.scrollY >= 0) {
        if (mul <= 1) {
          // eslint-disable-next-line
          X = 50 + mul * (-20);
          // eslint-disable-next-line
          Y = 136 + mul * (-20);
        } else if (mul >= 1) {
          X = 50 + (-20);
          Y = 136 + (-20);
        }
      }
      return `top: ${Y}px; transform: translateX(-${X}%);`;
    },
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
  // height: 400px;
  color: #ffffff;
  text-align: center;
  overflow-y: hidden;
  .bannerBg {
    position: fixed;
    width: 100%;
    height: 300px;
    top: 0;
    z-index: -1;
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
    transform: translate(-50%, 0, 0);
    // transition: all cubic-bezier(0.4, 0, 0.6, 1) .2s;
    img {
      border-radius: 50%;
      border: solid #6586cf 5px;
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
      opacity: .7;
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
  }
  .attribute {
    display: flex;
    justify-content: center;
    font-size: 14px;
    font-weight: lighter;
    opacity: .8;
    .item {
      margin: 8px 30px;
    }
  }
}
</style>
