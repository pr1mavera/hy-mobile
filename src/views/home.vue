<template>
  <div class="home">
    <homeHeader :colorStyle="colorStyle"></homeHeader>
    <div class="homeContent">
      <div class="homeContentWrapper">
        <swiper
        loop auto
        :list="swiperList"
        dots-position="center"
        >
        </swiper>
        <div class="activityListView">
          <div class="title">热门推荐</div>
          <ul>
            <li v-for="(activity, index) in activityHots" class="activityListLi vux-1px-b" :key="index">
              <activityList :activity="activity"></activityList>
            </li>
          </ul>
        </div>
        <div class="activityListView">
          <div class="title">最近活动</div>
          <ul>
            <li v-for="(activity, index) in activityRecents" class="activityListLi vux-1px-b" :key="index">
              <activityList :activity="activity"></activityList>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <homeFooter></homeFooter>
  </div>
</template>

<script>
import { getBanner, getActivityHots, getActivityRecents } from '@/server/index.js';
import meetingHeader from '@/components/meetingHeader';
import activityList from '@/components/activityList';
import homeFooter from '@/components/homeFooter';
import { Swiper } from 'vux';

export default {
  data() {
    return {
      colorStyle: {
        mainColor: '#2c7dfa',
        minorColor: '#b8bcc4',
        backgroundColor: '#ffffff',
      },
      bannerList: [],
      swiperList: [],
      activityHots: [],
      activityRecents: [],
    };
  },
  mounted() {
    this.getHomeActivityList();
  },
  methods: {
    async getHomeActivityList() {
      const res0 = await getBanner();
      this.bannerList = res0.data;
      const res1 = await getActivityHots();
      this.activityHots = res1.data;
      const res2 = await getActivityRecents();
      this.activityRecents = res2.data;
      this.setSwiperList();
      if (res0.code !== 0 || res1.code !== 0 || res2.code !== 0) {
        console.log('error in getActivityTicketsList');
      }
    },
    setSwiperList() {
      this.swiperList = this.bannerList.map(item => ({
        img: item.picUrl,
        // url: item.link.substring(4),
        url: item.link,
        title: item.title,
      }));
    },
  },
  components: {
    homeHeader: meetingHeader,
    activityList,
    Swiper,
    homeFooter,
  },
};
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';

.home {
  height: 100%;
  .homeContent {
    height: auto;
    min-height: 100%;
    background-color: #ffffff;
    // box-sizing: border-box;
    .homeContentWrapper {
      padding-bottom: 134px;
      .vux-slider{
        padding-top:45px;
      }
      .vux-slider > .vux-indicator > a > .vux-icon-dot, .vux-slider .vux-indicator-right > a > .vux-icon-dot {
        background-color: rgba(255, 255, 255, .5);
      }
      .vux-slider > .vux-indicator > a > .vux-icon-dot.active, .vux-slider .vux-indicator-right > a > .vux-icon-dot.active {
        background-color: #ffffff;
      }
      .activityListView {
        .title {
          width: calc(~'100% - 40px');
          margin: 0 20px;
          margin-top: 14px;
          padding-left: 8px;
          box-sizing: border-box;
          border-left: 2px solid #2c7dfa;
          line-height: 20px;
          font-size: 16px;
          font-weight: 200;
        }
        ul > .activityListLi {
          // margin-bottom: 5px;
          padding: 14px 0;
          margin: 0 20px;
          list-style-type:none;
        }
      }
    }
  }
}
</style>
