<template>
  <div id="detail">
    <x-header
    class="meetingHeader"
    :left-options="titleOptions.left"
    :right-options="titleOptions.right"
    @on-click-back=""
    @on-click-more=""
    >
      <div class="left" slot="left">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-Seach"></use>
        </svg>
      </div>
      <div class="title" slot="default">
        <h1>会议站</h1>

      </div>
      <div class="right" slot="right">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-caidan"></use>
        </svg>
      </div>

    </x-header>
    <div>
      <x-img
      class="ximg-banner"
      :src="bannerSrc"
      >
      </x-img>
    </div>
  </div>
</template>

<script>
import { XHeader, XImg } from 'vux';

export default {
  name: 'detail',
  data() {
    return {
      titleOptions: {
        left: {
          showBack: false,
          backText: '',
          preventDefault: true,
        },
        right: {
          showMore: false,
        },
      },
      blurConfig: {
        isBlurred: false, // activate and deactivate blur directive example 2
        opacity: 0.3,
        filter: 'blur(1.2px)',
        transition: 'all .3s linear',
      },
      bannerSrc: '../../src/assets/testBanner.png',
    };
  },
  components: {
    XHeader,
    XImg,
  },
};
</script>

<style  lang="less">
#detail{
  .meetingHeader{
    padding: 0;
    height: 45px;
    position: fixed;
    width: 100%;
    background-color: transparent;
    z-index: 999;
    &::after{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255,255,255,0.8);
      z-index: -1;
    }
    .vux-header-left{
      left: 15px;
      top: 50%;
      margin-top: -12px;
      .left{
        font-size: 24px;
        color: #ffffff;
      }
    }
    .vux-header-right{
      right: 15px;
      top: 50%;
      margin-top: -12px;
      .right{
        font-size: 24px;
        color: #ffffff;
      }
    }
    .vux-header-title{
      height: 45px;
      .title{
        h1{
          line-height: 45px;
          font-size: 23px;
          color: #ffffff;
        }
      }
      .background{
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100vw;
        overflow: visible;
        left: 50%;
        transform: translateX(-50%);
        background-color: transparent;
        filter: blur(20px);
        z-index: -1;
      }
    }

  }
}
</style>
