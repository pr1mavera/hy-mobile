<template>
  <div class="activity">
    <activityHeader :colorStyle="colorStyle"></activityHeader>
    <div class="selectNav vux-1px-b">
      <div
      class="selectItem"
      @click="showSelectView(1)"
      :class="{'selectItemHighLight': flag === true && selectState === 1}"
      >
        所有类别
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xia1"></use>
        </svg>
      </div>
      <div
      class="selectItem"
      @click="showSelectView(2)"
      :class="{'selectItemHighLight': flag === true && selectState === 2}"
      >
        全部时间
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xia1"></use>
        </svg>
      </div>
      <div class="selectView" v-if="flag">
        <div class="selectBox select_time" v-show="selectState === 1">
          <ul>
            <li class="selectLi" @click="setCurrentActivity(1, 1)">全部</li>
            <li class="selectLi">1</li>
            <li class="selectLi">1</li>
            <li class="selectLi">1</li>
            <li class="selectLi">1</li>
            <li class="selectLi">1</li>
            <li class="selectLi">1</li>
            <li class="selectLi">1</li>
          </ul>
        </div>
        <div class="selectBox select_category" v-show="selectState === 2">
          <ul>
            <li class="selectLi">全部</li>
            <li class="selectLi">明天</li>
            <li class="selectLi">未来一周</li>
            <li class="selectLi">未来一月</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mask" v-if="flag" @click="closeSelectView"></div>
    <div class="activityContent">
      <div class="activityContentWrapper">
        <div class="activityListView">
          <ul>
            <li v-for="(activity, index) in currentActivityList" class="activityListLi vux-1px-b" :key="index">
              <activityList :activity="activity"></activityList>
            </li>
          </ul>
        </div>
        <div class="bottom">
          已经到底啦~
        </div>
      </div>
    </div>
    <activityFooter></activityFooter>
  </div>
</template>

<script type="text/ecmascript-6">
import { getAllActivityList } from '@/server/index.js';
import meetingHeader from '@/components/meetingHeader';
import activityList from '@/components/activityList';
import homeFooter from '@/components/homeFooter';

export default {
  data() {
    return {
      colorStyle: {
        mainColor: '#2c7dfa',
        minorColor: '#b8bcc4',
        backgroundColor: '#ffffff',
      },
      AllActivityList: [],
      currentActivityList: [],
      flag: false,      // select开关
      selectState: 1,   // 选择方式（类别/时间）
      selectIndex: -1,  // 选项索引
    };
  },
  mounted() {
    this.getHomeActivityList();
  },
  methods: {
    async getHomeActivityList() {
      const res = await getAllActivityList();
      this.AllActivityList = res.data;
      this.currentActivityList = this.AllActivityList;
      if (res.code !== 0) {
        console.log('error in getActivityTicketsList');
      }
    },
    showSelectView(index) {
      if (this.flag) { // 当前状态为打开
        // eslint-disable-next-line
        (this.selectState === index) ? (this.flag = false) : (this.selectState = index);
      } else { // 当前状态为关闭
        this.selectState = index;
        this.flag = true;
      }
    },
    closeSelectView() {
      this.flag = false;
    },
    // initCategoryOption() {
    //
    // },
    // initTimeOption() {
    //
    // },
    setCurrentActivity(state, index) {
      // eslint-disable-next-line
      (state === 1) ? this.filterActivityByCategory(index) : this.filterActivityByTime(index);
      this.flag = false;
    },
    filterActivityByCategory(index) {
      this.currentActivityList = this.AllActivityList.filter(item => item.activityType === index);
    },
    // filterActivityByTime(index) {},
  },
  components: {
    activityHeader: meetingHeader,
    activityList,
    activityFooter: homeFooter,
  },
};
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';

.activity {
  height: 100%;
  .selectNav {
    position: absolute;
    display: flex;
    justify-content: center;
    top: 44px;
    width: 100%;
    height: 44px;
    line-height: 44px;
    background-color: #ffffff;
    z-index: 999;
    .selectItem {
      margin: 0 20px;
      font-size: 14px;
      color: #9098a8;
      &.selectItemHighLight {
        color: rgb(44, 125, 250);
        .icon {
          transform: rotate(180deg);
        }
      }
    }
    .selectItem, .selectItem > .icon {
      transition: all ease .3s;
    }
    .selectView {
      position: absolute;
      top: 44px;
      width: 100%;
      // height: 200px;
      // overflow: hidden;
      z-index: 900;
      .selectBox {
        position: absolute;
        width: 100%;
        top: 0;
        border-radius: 2px;
        background-color: #ffffff;
        padding: 10px 20px;
        box-sizing: border-box;
        overflow-y: scroll;
        ul > .selectLi {
          color: #2b313c;
          line-height: 44px;
          list-style-type:none;
        }
      }
    }
  }
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    background-color: rgba(0, 0, 0, .5);
  }
  .activityContent {
    height: auto;
    min-height: 100%;
    background-color: #ffffff;
    // box-sizing: border-box;
    .activityContentWrapper {
      padding-top: 88px;
      padding-bottom: 134px;
      .activityListView {
        ul > .activityListLi {
          padding: 14px 0;
          margin: 0 20px;
          list-style-type:none;
        }
      }
      .bottom{
        text-align: center;
        color: #b8bcc4;
        margin: 15px;
      }
    }
  }
}
</style>
