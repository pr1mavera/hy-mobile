<template>
  <div id="personalPage">
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
    <div class="mainContainer">
      <bannerWithTransBlur></bannerWithTransBlur>
      <tab
      class="tab"
      :line-width="2"
      default-color="#9098a8"
      active-color="#2b313c"
      bar-active-color="#2c7dfa"
      custom-bar-width="28px"
      >
        <tab-item @on-item-click="onTabItemClick" selected>活动</tab-item>
        <tab-item @on-item-click="onTabItemClick">参与</tab-item>
        <tab-item @on-item-click="onTabItemClick">收藏</tab-item>
        <tab-item @on-item-click="onTabItemClick">关注</tab-item>
        <tab-item @on-item-click="onTabItemClick">动态</tab-item>
      </tab>
      <div class="routerBody">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, Tab, TabItem } from 'vux';
import bannerWithTransBlur from '@/components/bannerWithTransBlur';

export default {
  name: 'personalPage',
  data() {
    return {
      // XHeader
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
      sponsor: {
        contactName: '',
      },
      pathList: ['PPActivity', 'PPParticipate', 'PPCollection', 'PPFollow', 'PPTrack'],
    };
  },
  methods: {
    onTabItemClick(index) {
      this.$router.push({
        path: this.pathList[index],
      });
    },
  },
  components: {
    XHeader,
    Tab,
    TabItem,
    bannerWithTransBlur,
  },
};
</script>

<style lang="less">
#personalPage {
  .meetingHeader{
    padding: 0;
    height: 45px;
    width: 100%;
    background-color: transparent;
    z-index: 999;
    position: fixed;
    &::after{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 1;
      z-index: -1;
    }
    .vux-header-left{
      left: 15px;
      top: 50%;
      margin-top: -9px;
      .left{
        font-size: 18px;
        color: #ffffff;
      }
    }
    .vux-header-right{
      right: 15px;
      top: 50%;
      margin-top: -9px;
      .right{
        font-size: 18px;
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
    }

  }
  .mainContainer {
    .tab {
      .vux-tab-container {
        .vux-tab {
          padding: 0 20px;
          box-sizing: border-box;
          border: 0;
          .vux-tab-item {
            flex: 0 0 20%;
          }
          .vux-tab-ink-bar {
            bottom: 0;
            transform: translateX(20px);
          }
        }

      }

    }
  }
}
</style>
