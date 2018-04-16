<template>
  <div class="activity">
    <activityHeader :colorStyle="colorStyle"></activityHeader>
    <div class="selectNav vux-1px-b">
      <div
      class="selectItem"
      @click="showSelectView(1)"
      :class="{'selectItemHighLight': flag === true && selectMode === 1}"
      >
        所有类别
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xia1"></use>
        </svg>
      </div>
      <div
      class="selectItem"
      @click="showSelectView(2)"
      :class="{'selectItemHighLight': flag === true && selectMode === 2}"
      >
        全部时间
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xia1"></use>
        </svg>
      </div>
      <div class="selectView" v-if="flag" ref="selectView">
        <div class="selectBox select_time select-box-hook" v-show="selectMode === 1">
          <ul>
            <li class="selectLi" @click="setCurrentActivity(selectMode, 0)">全部</li>
            <li
            v-for="(item, index) in activityClass"
            :key="index"
            class="selectLi"
            @click="setCurrentActivity(selectMode, item.type)"
            >
              {{item.typeName}}
            </li>
          </ul>
        </div>
        <div class="selectBox select_category select-box-hook" v-show="selectMode === 2">
          <ul>
            <li class="selectLi" @click="setCurrentActivity(selectMode, 0)">全部</li>
            <li
            v-for="(item, index) in activityTime"
            :key="index"
            class="selectLi"
            @click="setCurrentActivity(selectMode, item.type)"
            >
              {{item.typeName}}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mask" v-if="flag" @click="closeSelectView"></div>
    <div class="activityContent">
      <div class="activityContentWrapper">
        <div class="activityListView">
          <ul :style="this.scrollWhenSelect">
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
import { getAllActivityList, getActivityClass } from '@/server/index.js';
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
      activityClass: [],
      activityTime: [
        {
          id: 1,
          type: 1,
          typeName: '明天',
        },
        {
          id: 2,
          type: 2,
          typeName: '未来一周',
        },
        {
          id: 3,
          type: 3,
          typeName: '未来一月',
        },
      ],
      allActivityList: [],
      currentActivityList: [],
      flag: false,            // select开关
      selectMode: 1,         // 选择方式（类别/时间）
      selectIndex: 0,        // 选项索引
      scrollWhenSelect: 'height: auto;',    // 下拉菜单出现时可滚动范围
    };
  },
  mounted() {
    this.getActivity();
  },
  methods: {
    async getActivity() {
      const resOfActivityClass = await getActivityClass();
      const resOfAllActivity = await getAllActivityList();
      this.activityClass = resOfActivityClass.data;
      this.allActivityList = resOfAllActivity.data;
      // 初始化当前显示的会议列表
      this.currentActivityList = this.allActivityList;
      if (resOfActivityClass.code !== 0 || resOfAllActivity.code !== 0) {
        console.log('error in getActivity');
      }
    },
    showSelectView(index) {
      if (this.flag) { // 当前状态为打开
        // eslint-disable-next-line
        (this.selectMode === index) ? (this.flag = false) : (this.selectMode = index);
      } else { // 当前状态为关闭
        this.selectMode = index;
        this.flag = true;
      }
      this.$nextTick(() => {
        this.setScrollWhenSelect();
      });
    },
    closeSelectView() {
      this.flag = false;
      this.$nextTick(() => {
        this.setScrollWhenSelect();
      });
    },
    setCurrentActivity(state, index) {
      // eslint-disable-next-line
      (state === 1) ? this.filterActivityByCategory(index) : this.filterActivityByTime(index);
      this.flag = false;
      this.$nextTick(() => {
        this.setScrollWhenSelect();
      });
    },
    filterActivityByCategory(index) {
      // eslint-disable-next-line
      this.currentActivityList = (index > 0) ? this.allActivityList.filter(item => item.activityType === index) : this.allActivityList;
    },
    filterActivityByTime(index) {
      // eslint-disable-next-line
      this.currentActivityList = (index > 0) ? this.allActivityList.filter(item => item.timeStatus === index - 1) : this.allActivityList;
    },
    setScrollWhenSelect() {
      if (this.flag) {
        const selectBox = this.$refs.selectView.getElementsByClassName('select-box-hook');
        this.scrollWhenSelect = `height: ${selectBox[0].clientHeight}px; overflow: hidden;`;
      } else {
        this.scrollWhenSelect = 'height: auto;';
      }
    },
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
