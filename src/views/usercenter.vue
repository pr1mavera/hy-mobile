<template>
  <div id="personalPage">
    <meetingHeader :colorStyle="colorStyle" @rightSliderClickToChangeTabFlag="ChangeCurrentTabIndex"></meetingHeader>
    <div class="scrollWrapper" ref="scrollWrapper">
      <div class="mainContainer">
        <bannerWithTransBlur :userProfile="userProfile" :isCurrentUser="isCurrentUser"></bannerWithTransBlur>
        <tab
        class="tab"
        :line-width="2"
        default-color="#9098a8"
        active-color="#2b313c"
        bar-active-color="#2c7dfa"
        custom-bar-width="28px"
        >
          <tab-item class="userCenterNavItem" @on-item-click="onTabItemClick">活动</tab-item>
          <tab-item class="userCenterNavItem" @on-item-click="onTabItemClick" v-if="isCurrentUser">参与</tab-item>
          <tab-item class="userCenterNavItem" @on-item-click="onTabItemClick" v-if="isCurrentUser">收藏</tab-item>
          <tab-item class="userCenterNavItem" @on-item-click="onTabItemClick" v-if="isCurrentUser">关注</tab-item>
          <tab-item class="userCenterNavItem" @on-item-click="onTabItemClick" v-if="isCurrentUser">动态</tab-item>
        </tab>
        <div class="routerBody clearfix">
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
import { getProfileById } from '@/server/index.js';
import { Tab, TabItem } from 'vux';
import { mapGetters } from 'vuex';
import meetingHeader from '@/components/meetingHeader';
import bannerWithTransBlur from '@/components/bannerWithTransBlur';

export default {
  name: 'personalPage',
  data() {
    return {
      colorStyle: {
        mainColor: '#ffffff',
        minorColor: '#ffffff',
        backgroundColor: 'transparent',
      },
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
      pathMap: ['PPActivity', 'PPPartake', 'PPCollection', 'PPFollow', 'PPDynamic'],
      userProfile: {
        userStatistics: {},
      },
      currentTabIndex: null,
      nearNode: false,
    };
  },
  mounted() {
    this.currentTabIndex = this.pathMap.indexOf(this.$route.name);
    this.getUserProfile();
    // this.setIDInQuery();
  },
  created() {

  },
  computed: {
    isCurrentUser() {
      // eslint-disable-next-line
      return Number(this.$route.params.id) === this.id ? true : false;
    },
    ...mapGetters([
      'id',
    ]),
  },
  methods: {
    onTabItemClick(index) {
      this.currentTabIndex = index;
      this.$router.push({
        name: this.pathMap[index],
        params: {
          id: this.$route.params.id,
        },
      });
    },
    // setIDInQuery() {
    //   if (this.$route.query.id) {
    //     const reg = new RegExp('(^|&)id=([^&]*)');
    //     const r = window.location.search.substr(1).match(reg);
    //     this.setIdInQuery(r ? { id: decodeURIComponent(r[2]) } : {});
    //   }
    // },
    ChangeCurrentTabIndex(tabFlag) {
      this.currentTabIndex = tabFlag;
      this.$nextTick(() => {
        this.resetNavSelected();
      });
    },
    resetNavSelected() {
      document.getElementsByClassName('userCenterNavItem')[this.currentTabIndex].click();
    },
    async getUserProfile() {
      // eslint-disable-next-line
      const res = await getProfileById(Number(this.$route.params.id));
      this.userProfile = res.data;
      this.$nextTick(() => {
        this.resetNavSelected();
      });
      if (res.code !== 0) {
        console.log('error in getUserProfile');
      }
    },
  },
  watch: {
    $route() {
      this.getUserProfile();
    },
  },
  components: {
    meetingHeader,
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
    position: absolute;
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
    height: 100%;
    overflow: hidden;
    .mainContainer {
      overflow: scroll;
      height: 100%;
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
        min-height: calc(~'100% - 330px');
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
