<template>
  <div class="PPTrack" >
    <div class="tab-container">
      <tab
        class="SLtab"
        bar-active-color="transparent"
        default-color="#5d6574"
        active-color="#2c7dfa"
        v-model="curIndex"
      >
        <tab-item selected @on-item-click="curIndex=0">
          收藏({{meetingData.total}})
        </tab-item>
        <tab-item @on-item-click="curIndex=1">
          关注({{personData.total}})
        </tab-item>
      </tab>
    </div>
    <keep-alive>
      <activity-track
        v-if="curIndex === 0"
        :dynamicList = "meetingData.list"
        :curStatus = curStatus[0]
        :loadStatus="meetingData.loadStatus"
      ></activity-track>
      <activity-track
        v-else-if="curIndex === 1"
        :dynamicList = "personData.list"
        :curStatus = curStatus[1]
        :loadStatus="personData.loadStatus"
      ></activity-track>
    </keep-alive>
  </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem } from 'vux';
// import BScroll from 'better-scroll';
import { getDynamicList } from '@/server/index.js';
import activityTrack from '@/components/activityTrack';

export default {
  data() {
    return {
      curIndex: 0,
      meetingData: {
        list: [],
        total: '',
        loadStatus: 0,
        nextPage: 1,
      },
      personData: {
        list: [],
        total: '',
        loadStatus: 0,
        nextPage: 1,
      },
      curStatus: ['meetingData', 'personData'],
      curStatusWord: ['watch', 'watchPeople'],
    };
  },
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    activityTrack,
  },
  mounted() {
    this.getDynamicAll();
  },
  methods: {
    loadMore() {
      const index = this.curIndex;// 标签
      const statusText = this.curStatus[index];// 对应data
      const word = this.curStatusWord[index];// 对应当前状态
      this.getDynamic(this[statusText].nextPage, word, statusText);
    },
    getDynamic(num, status, statusText) {
      if (this[statusText].loadStatus !== 0) return;
      this[statusText].loadStatus = 1;
      const query = {
        page: 1,
        pageNum: num,
        pageSize: 10,
      };
      getDynamicList(status, query).then((data) => {
        if (data.code === 0) {
          this[statusText].list.push(...data.data.list);
          if (this[statusText].nextPage === 1) {
            this[statusText].total = data.data.total;
          }
          if (data.data.hasNextPage) {
            this[statusText].nextPage += 1;
            this[statusText].loadStatus = 0;
          } else {
            this[statusText].loadStatus = 2;
          }
        } else {
          this.$vux.toast.text(data.msg, 'middle');
        }
      }).catch((e) => {
        this[statusText].loadStatus = 0;
        console.warn(e);
      });
    },
    getDynamicAll() {
      this.getDynamic(1, this.curStatusWord[0], this.curStatus[0]);
      this.getDynamic(1, this.curStatusWord[1], this.curStatus[1]);
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
}
</style>
