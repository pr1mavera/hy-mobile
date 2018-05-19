<template>
  <div class="PPFollow">
    <div class="tab-container">
      <tab
      class="SLtab"
      bar-active-color="transparent"
      default-color="#5d6574"
      active-color="#2c7dfa"
      v-model="check"
      >
        <tab-item selected @on-item-click="check=0">
          关注({{wTableData.length}})
        </tab-item>
        <tab-item @on-item-click="check=1">
          粉丝({{fTableData.length}})
        </tab-item>
      </tab>
    </div>
    <div class="swiper-container">
      <swiper @on-index-change="handlerHeight(check)" id="swiper" class="swiper" v-model="check"  :show-dots="false">
        <swiper-item >
          <div class="tab-swiper vux-center" v-for="(item, index) in wTableData">
            <div class="flex-box">
              <div class="left">
                <img :src="item.avatarUrl" alt="">
              </div>
              <div class="center">
                  <h5>{{item.nickname?item.nickname:item.username}}</h5>
                  <p p-intro>{{item.info?item.info:'这个人很懒，但还是什么都没写...'}}</p>
                  <div v-if="item.userStatistics">
                    <p>会议<span class="num" >{{item.userStatistics.activityCount }}</span></p>
                    <p>粉丝<span class="num">{{item.userStatistics.fansCount }}</span></p>
                  </div>
              </div>
              <div class="right">
                <button v-if="item.mutualFansStatus && !item.watchFlag" class="style1" @click ="removeWatch(item, index, 0)">互相关注</button>
                <button v-if="!item.mutualFansStatus && !item.watchFlag" class="style1"  @click ="removeWatch(item, index, 0)">已关注</button>
                <button v-if="item.watchFlag" class="style2" @click="watchPeople(item, index, 0)">关注</button>
              </div>
            </div>
          </div>
        </swiper-item>
        <swiper-item >
          <div class="tab-swiper vux-center" v-for="(item, index) in fTableData">
            <div class="flex-box">
              <div class="left">
                <img :src="item.avatarUrl" alt="">
              </div>
              <div class="center">
                  <h5>{{item.nickname}}</h5>
                  <p>{{item.info}}</p>
                  <div v-if="item.userStatistics">
                    <p>会议<span class="num">{{item.userStatistics.activityCount }}</span></p>
                    <p>粉丝<span class="num">{{item.userStatistics.fansCount }}</span></p>
                  </div>
              </div>
              <div class="right">
                <button v-if="item.mutualFansStatus && !item.watchFlag" @click="removeWatch(item, index, 1)" class="style1">互相关注</button>
                <!-- <button v-if="false" class="style1">已关注</button> -->
                <button v-if="!item.mutualFansStatus || item.watchFlag" @click="watchPeople(item, index, 1)" class="style2">关注</button>
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

<script>
import { Tab, TabItem, Swiper, SwiperItem } from 'vux';
import { getWatchPeopleList, getFanList, addWatch, deleteWatch } from '@/server/index.js';

export default {
  name: 'personalPage',
  data() {
    return {
      check: 0,
      queryWatch: {
        page: 0,
        orderBy: 1,
      },
      queryFan: {
        page: 0,
        orderBy: 1,
      },
      wTableData: [],
      fTableData: [],
      swiperHeight: '0px',
    };
  },
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
  },
  mounted() {
    this.getWatchPeopleListF();
    this.getFanListF();
  },
  methods: {
    getWatchPeopleListF() {
      getWatchPeopleList(this.queryWatch).then((res) => {
        if (res.code === 0) {
          this.wTableData = res.data;
          // 丑陋。。
          document.getElementById('swiper').style.height = `${this.wTableData.length * 95}px`;
          document.getElementById('swiper').firstChild.style.height = `${this.wTableData.length * 95}px`;
        } else {
          console.log('error in getWatchPeopleList');
        }
      });
    },
    getFanListF() {
      getFanList(this.queryFan).then((res) => {
        if (res.code === 0) {
          this.fTableData = res.data;
        } else {
          console.log('error in getFanList');
        }
      });
    },
    handlerHeight(index) {
      if (index === 0) {
        document.getElementById('swiper').style.height = `${this.wTableData.length * 95}px`;
        document.getElementById('swiper').firstChild.style.height = `${this.wTableData.length * 95}px`;
      } else {
        document.getElementById('swiper').style.height = `${this.fTableData.length * 95}px`;
        document.getElementById('swiper').firstChild.style.height = `${this.fTableData.length * 95}px`;
      }
    },
    watchPeople(obj, index, swiper) {
      addWatch(obj.id).then((res) => {
        if (res.code === 0) {
          this.$vux.toast.text('关注成功', 'top');
          if (swiper === 0) {
            const object = this.wTableData[index];
            object.watchFlag = false;
            this.$set(this.wTableData, index, object);
          } else {
            const object = this.fTableData[index];
            object.watchFlag = false;
            this.$set(this.fTableData, index, object);
          }
        } else {
          this.$vux.toast.text('关注失败', 'top');
        }
      });
    },
    removeWatch(obj, index, swiper) {
      deleteWatch(obj.id).then((res) => {
        if (res.code === 0) {
          this.$vux.toast.text('取消成功', 'top');
          if (swiper === 0) {
            const object = this.wTableData[index];
            object.watchFlag = true;
            this.$set(this.wTableData, index, object);
          } else {
            const object = this.fTableData[index];
            object.watchFlag = true;
            this.$set(this.fTableData, index, object);
          }
        } else {
          this.$vux.toast.text('取消失败', 'top');
        }
      });
    },
  },
};
</script>

<style lang="less">
@import '../../common/style/mixin.less';
.PPFollow{
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
          display:-webkit-flex;
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
              font-size: 14px;
              color:#2b313c;
            }
            p{
              color:#5d6574;
              font-size: 12px;
              padding: 2px 0;
            }
            p[p-intro]{
              overflow : hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
            &>div{
              display: flex;
              p{
                width: 70px;
                color:#2b313c;
                font-size: 12px;
                .num{
                  font-size: 12px;
                  padding-left: 5px;
                }
              }
            }
          }
          .right{
            width: 70px;
            min-width: 70px;
            max-width: 70px;
            flex-grow: 0;
            button {
              width: 70px;
              height: 30px;
              font-size: 12px;
              border-radius: 15px;
              &.style1{
                color: #9a9a9a;
                background-color: #eeeeee;
                border: none;
              }
              &.style2{
                background-color: #ffffff;
                color:#2c7dfa;
                border: 1px solid #2c7dfa;
              }
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
