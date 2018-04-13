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
    <div class="scrollWrapper" ref="scrollWrapper">
      <div class="mainContainer">
        <bannerWithTransBlur :userProfile="userProfile" :scrollY="scrollY"></bannerWithTransBlur>
        <tab
        class="tab"
        :line-width="2"
        default-color="#9098a8"
        active-color="#2b313c"
        bar-active-color="#2c7dfa"
        custom-bar-width="28px"
        >
          <tab-item @on-item-click="onTabItemClick" selected>活动</tab-item>
          <tab-item @on-item-click="onTabItemClick" v-if="!this.$route.query.id">参与</tab-item>
          <tab-item @on-item-click="onTabItemClick" v-if="!this.$route.query.id">收藏</tab-item>
          <tab-item @on-item-click="onTabItemClick" v-if="!this.$route.query.id">关注</tab-item>
          <tab-item @on-item-click="onTabItemClick" v-if="!this.$route.query.id">动态</tab-item>
        </tab>
        <div class="routerBody clearfix" :style="`min-height: ${this.routerBodyMinHeight}px;`">
          <keep-alive>
            <router-view class="routerView"></router-view>
          </keep-alive>
        </div>
        <footer class="footer">
          <p class="text">本站由<span> 会议站 </span>提供技术支持</p>
          <p class="text">Copyright &copy; 2013-2018 版权所有 北京韦尔科技有限公司</p>
          <p class="text">京ICP备14040981号-2</p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getProfile, getProfileById } from '@/server/index.js';
import { XHeader, Tab, TabItem } from 'vux';
import { mapMutations, mapGetters } from 'vuex';
import BScroll from 'better-scroll';
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
      pathMap: ['PPActivity', 'PPParticipate', 'PPCollection', 'PPFollow', 'PPTrack'],
      userProfile: {},
      scrollY: 0,
      routerBodyMinHeight: 0,
      nearNode: false,
    };
  },
  mounted() {
    this.getUserProfile();
    this.setIDInQuery();
    this.initScroll();
    this.calculateHeight();
  },
  computed: {
    ...mapGetters([
      'id',
      'query',
    ]),
  },
  methods: {
    onTabItemClick(index) {
      this.$router.push({
        path: this.pathMap[index],
        query: this.query,
      });
    },
    setIDInQuery() {
      if (this.$route.query.id) {
        const reg = new RegExp('(^|&)id=([^&]*)');
        const r = window.location.search.substr(1).match(reg);
        this.setIdInQuery(r ? { id: decodeURIComponent(r[2]) } : {});
      }
    },
    async getUserProfile() {
      // eslint-disable-next-line
      const res = this.$route.query.id ? await getProfileById(Number(this.$route.query.id)) : await getProfile();
      this.userProfile = res.data;
      if (res.code !== 0) {
        console.log('error in getUserProfile');
      }
    },
    initScroll() {
      this.scrollWrapper = new BScroll(this.$refs.scrollWrapper, {
        bounce: true,
        probeType: 3,
        momentum: false,
        // click: true,
      });
      this.scrollWrapper.on('scroll', (pos) => {
        this.scrollY = -Math.round(pos.y);
        console.log(`当前滚动位置：${this.scrollY}`);
      });
      this.scrollWrapper.on('touchEnd', (pos) => {
        this.scrollY = -Math.round(pos.y);
        if (this.scrollY >= 20 && this.scrollY <= 110) {
          this.scrollWrapper.scrollTo(0, -50, 400);
        }
      });
    },
    calculateHeight() {
      const bannerH = document.getElementsByClassName('bannerWithTransBlur')[0].clientHeight;
      const windowH = document.documentElement.clientHeight;
      this.routerBodyMinHeight = windowH - bannerH - 44;
    },
    ...mapMutations({
      setIdInQuery: 'SET_QUERY',
    }),
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
html, body, #app, #personalPage {
  height: 100%;
}
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
  .scrollWrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .mainContainer {
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      .tab {
        .vux-tab-container {
          .vux-tab {
            width: 100%;
            border: 0;
            .vux-tab-item {
              background-size: 100% 0px;
              flex: 1;
            }
          }
        }
      }
      .routerBody {
        width: 100%;
        height: auto;
        background-color: #f4f7fa;
        .routerView {
          padding-bottom: 90px;
        }
      }
      .clearfix{
        display: inline-block;
      }
      .clearfix:after {
        content: "";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
      }
      .footer {
        position: relative;
        height: 90px;
        margin-top: -90px;
        background-color: #2b3134;
        color: #aaaaaa;
        text-align: center;
        padding: 12px 0;
        box-sizing: border-box;
        clear:both;
        .text {
          font-size: 12px;
          font-weight: 200;
          line-height: 22px;
          span {
            color: #1191ff;
          }
        }
      }
    }
  }
}
</style>
