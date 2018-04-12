<template>
  <div class="PPTrack">
    <div class="tab-container">
      <tab
      class="SLtab"
      bar-active-color="transparent"
      default-color="#5d6574"
      active-color="#2c7dfa"
      v-model="check"
      >
        <tab-item selected @on-item-click="check=0">
          收藏
        </tab-item>
        <tab-item @on-item-click="check=1">
          关注
        </tab-item>
      </tab>
    </div>
    <div class="swiper-container">
      <swiper  @on-index-change="handlerHeight(check)" id="swiper2" class="swiper" v-model="check" height="100px" :show-dots="false">
        <swiper-item >
          <div class="tab-swiper vux-center"  v-for="item in meetingData">
            <div class="flex-box">
              <div class="left">
                <img :src="item.user.avatarUrl" alt="">
              </div>
              <div class="center">
                <!-- 别人收藏你 -->
                <div v-if="item.status">
                  <h5>{{item.user.nickname}}</h5>
                  <p>收藏了你的会议</p>
                  <p class="time">{{item.watchDate | timeApart}}</p>
                </div>
                <div v-else>
                  <h5>我<span class="gray">收藏了会议</span></h5>
                  <h5>{{item.activity.activityTitle}}</h5>
                  <p class="time">{{item.watchDate | timeApart}}</p>
                </div>
              </div>
              <div class="right">
                <img :src="item.activity.activityBannerMobileUrl" alt="">
              </div>
            </div>
          </div>
        </swiper-item>
        <swiper-item >
          <div class="tab-swiper vux-center" v-for="item in personData">
            <div class="flex-box">
              <div class="left">
                <img :src="item.user.avatarUrl" alt="">
              </div>
              <div class="center">
                <!-- 别人关注你 -->
                <div v-if="item.status">
                  <h5>{{item.user.nickname}}<span class="gray">关注了你</span></h5>
                  <p class="time">{{item.watchDate | timeApart}}</p>
                </div>
                <div v-else>
                  <h5>我<span class="gray">关注了</span>{{item.user.nickname}}</h5>
                  <p class="time">{{item.watchDate | timeApart}}</p>
                </div>
              </div>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <div class="bottom">
      已经到底啦~
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Tab, TabItem, Swiper, SwiperItem } from 'vux';
import { getDynamicOfMeeting, getDynamicOfPerson } from '@/server/index.js';

export default {
  name: 'personalPage',
  data() {
    return {
      check: 0,
      meetingData: [],
      personData: [],
      queryMeeting: {
        page: 1,
        pageNum: 1,
        pageSize: 5,
      },
      queryPerson: {
        page: 1,
        pageNum: 1,
        pageSize: 5,
      },
      mboxNum: 0,
      pboxNum: 0,
    };
  },
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.resetData();
      this.getDynamicOfMeetingList();
      this.getDynamicOfPersonList();
    },
    resetData() {
      this.meetingData = [];
      this.personData = [];
      this.queryMeeting.pageNum = 1;
      this.queryPerson.pageNum = 1;
    },
    getDynamicOfMeetingList() {
      getDynamicOfMeeting(this.queryMeeting).then((res) => {
        this.meetingData.push(...res.data.list);
        if (res.data.pageNum < res.data.pages) {
          this.mboxNum = res.data.pageNum * res.data.size;
        } else {
          this.mboxNum = res.data.total;
        }
        document.getElementById('swiper2').style.height = `${this.mboxNum * 95}px`;
        document.getElementById('swiper2').firstChild.style.height = `${this.mboxNum * 95}px`;
      });
    },
    getDynamicOfPersonList() {
      getDynamicOfPerson(this.queryPerson).then((res) => {
        this.personData.push(...res.data.list);
        if (res.data.pageNum < res.data.pages) {
          this.pboxNum = res.data.pageNum * res.data.size;
        } else {
          this.pboxNum = res.data.total;
        }
      });
    },
    handlerHeight(index) {
      if (index === 0) {
        document.getElementById('swiper2').style.height = `${this.mboxNum * 95}px`;
        document.getElementById('swiper2').firstChild.style.height = `${this.mboxNum * 95}px`;
      } else {
        document.getElementById('swiper2').style.height = `${this.pboxNum * 95}px`;
        document.getElementById('swiper2').firstChild.style.height = `${this.pboxNum * 95}px`;
      }
    },
  },
  filters: {
    timeApart(value = '') {
      const occur = new Date(value.replace(/-/g, '/')).getTime();
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
@import '../../common/style/mixin.less';
.PPTrack{
  .tab-container{
    background-color: #f4f7fa;
    .SLtab {
      width: 60%;
      background-color: #f4f7fa;
      margin: 0 auto;
      .vux-tab-container {
        .vux-tab {
          background-color: #f4f7fa;
          padding: 0 20px;
          box-sizing: border-box;
          border: 0;
          .vux-tab-item {
            background-size: 100% 0px;
            flex: 0 0 50%;
          }

        }
      }
    }
  }
  .swiper-container{
    background-color: #ffffff;
    .swiper{
      .tab-swiper.vux-center{
        padding: 0 20px;
        &:not(:last-child){
          .border-1px-b(#d8dbe0);
        }
        .flex-box{
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
    }
  }
  .bottom{
    text-align: center;
    color: #b8bcc4;
    margin: 15px;
  }
}
</style>
