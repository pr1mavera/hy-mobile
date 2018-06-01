<template>
  <div id="personalPage">
    <!--<div class="scrollWrapper" ref="scrollWrapper">-->
      <!--<div class="mainContainer">-->
        <meetingHeader :colorStyle="colorStyle" @rightSliderClickToChangeTabFlag="ChangeCurrentTabIndex"></meetingHeader>
        <bannerWithTransBlur :userProfile="userProfile" :isCurrentUser="isCurrentUser"></bannerWithTransBlur>
        <tab
          class="tab"
          :line-width="2"
          default-color="#9098a8"
          active-color="#2b313c"
          bar-active-color="#2c7dfa"
          custom-bar-width="28px"
        >
          <tab-item :selected="currIndex === 0"  @on-item-click="onTabItemClick">活动</tab-item>
          <tab-item :selected="currIndex === 1"  @on-item-click="onTabItemClick" v-if="isCurrentUser">参与</tab-item>
          <tab-item :selected="currIndex === 2"  @on-item-click="onTabItemClick" v-if="isCurrentUser">收藏</tab-item>
          <tab-item :selected="currIndex === 3"  @on-item-click="onTabItemClick" v-if="isCurrentUser">关注</tab-item>
          <tab-item :selected="currIndex === 4"  @on-item-click="onTabItemClick" v-if="isCurrentUser">动态</tab-item>
        </tab>
        <div class="routerBody clearfix">
          <keep-alive>
            <!--<router-view class="routerView"></router-view>-->
            <person-activity ref="activity" v-if="currIndex === 0"></person-activity>
            <person-partake ref="partake" v-else-if="currIndex === 1"></person-partake>
            <person-collection ref="collection" v-else-if="currIndex === 2"></person-collection>
            <person-follow ref="follow" v-else-if="currIndex === 3"></person-follow>
            <person-dynamic ref="dynamic" v-else-if="currIndex === 4"></person-dynamic>
          </keep-alive>
        </div>
        <footer class="footer">
          <p class="text">本站由<span> 映目活动 </span>提供技术支持</p>
          <p class="text">Copyright &copy; 2013-2018 版权所有 北京韦尔科技有限公司</p>
          <p class="text">京ICP备14040981号-2</p>
        </footer>
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
import { getProfileById } from '@/server/index.js';
import { Tab, TabItem } from 'vux';
import { mapGetters } from 'vuex';
import meetingHeader from '@/components/meetingHeader';
import bannerWithTransBlur from '@/components/bannerWithTransBlur';
import personActivity from './personalPage/personActivity';
import personPartake from './personalPage/personPartake';
import personCollection from './personalPage/personCollection';
import personFollow from './personalPage/personFollow';
import personDynamic from './personalPage/personDynamic';

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
      // blurConfig: {
      //   isBlurred: false, // activate and deactivate blur directive example 2
      //   opacity: 0.3,
      //   filter: 'blur(1.2px)',
      //   transition: 'all .3s linear',
      // },
      refs: ['activity', 'partake', 'collection', 'follow', 'dynamic'],
      // pathMap: ['PPActivity', 'PPPartake', 'PPCollection', 'PPFollow', 'PPDynamic'],
      userProfile: {
        userStatistics: {},
      },
      currIndex: 0,
      nearNode: false,
    };
  },
  mounted() {
    // debugger;
    // this.currIndex = this.pathMap.indexOf(this.$route.name);
    this.getUserProfile();
    // debugger;
    // document.querySelector('.mainContainer').addEventListener('scroll', this.throttleScroll);
    document.addEventListener('scroll', this.throttleScroll);
    // this.setIDInQuery();
  },
  created() {

  },
  computed: {
    isCurrentUser() {
      // eslint-disable-next-line
      // debugger;
      return Number(this.$route.params.id) === this.id ? 1 : 0;
    },
    ...mapGetters([
      'id',
    ]),
  },
  methods: {
    throttleScroll() {
      if (this.$route.name !== 'usercenter') {
        return;
      }
      if (this.reachBottom()) {
        const refName = this.refs[this.currIndex];
        this.$refs[refName].loadMore();
      }
    },
    reachBottom() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      // console.log(scrollTop);
      // console.log(clientHeight);
      // console.log(scrollHeight);
      return scrollHeight - scrollTop - clientHeight < 300;
    },
    onTabItemClick(index) {
      // debugger;
      this.currIndex = index;
      // this.$router.push({
      //   name: this.pathMap[index],
      //   params: {
      //     id: this.$route.params.id,
      //   },
      // });
    },
    // setIDInQuery() {
    //   if (this.$route.query.id) {
    //     const reg = new RegExp('(^|&)id=([^&]*)');
    //     const r = window.location.search.substr(1).match(reg);
    //     this.setIdInQuery(r ? { id: decodeURIComponent(r[2]) } : {});
    //   }
    // },
    ChangeCurrentTabIndex(tabFlag) {
      this.currIndex = tabFlag;
      this.$nextTick(() => {
        // debugger
        // this.resetNavSelected();
      });
    },
    // resetNavSelected() {
    //   // document.getElementsByClassName('userCenterNavItem')[this.currentTabIndex].click();
    // },
    async getUserProfile() {
      // eslint-disable-next-line
      const res = await getProfileById(Number(this.$route.params.id));
      this.userProfile = res.data;
      // this.$nextTick(() => {
      //   debugger
      //   // this.resetNavSelected();
      // });
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
    personActivity,
    personPartake,
    personCollection,
    personFollow,
    personDynamic,
  },
};
</script>

<style lang="less">
#personalPage {
  // height:auto;
  // .scrollWrapper {
  //   position: absolute;
  //   top: 0;
  //   bottom: 0;
  //   width: 100%;
  //   height: auto;
  //   overflow: hidden;
    // .mainContainer {
    //   overflow: scroll;
    //   height: auto;
    //   -webkit-overflow-scrolling: touch;
      .header {
        // position: absolute;
        top: 0;
        width: 100%;
        height: 45px;
        .meetingHeader{
          padding: 0;
          height: 45px;
          width: 100%;
          background-color: transparent;
          z-index: 999;
          // position: absolute;
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
      }
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
        min-height: calc(~'100vh - 427px');
        background-color: #f4f7fa;
        // .routerView {
        //   padding-bottom: 90px;
        // }
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
        // margin-top: -90px;
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
    .activity-footer{
      padding:4px 0 9px; 
      text-align:center;
      color:#646464;
    }
    // }
  // }
}
</style>
