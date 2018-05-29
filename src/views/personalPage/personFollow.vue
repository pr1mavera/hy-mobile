<template>
  <div class="PPFollow">
    <div class="tab-container">
      <tab
      class="SLtab"
      bar-active-color="transparent"
      default-color="#5d6574"
      active-color="#2c7dfa"
      v-model="curIndex"
      >
        <tab-item selected @on-item-click="curIndex=0">
          关注({{wTableData.total}})
        </tab-item>
        <tab-item @on-item-click="curIndex=1">
          粉丝({{fTableData.total}})
        </tab-item>
      </tab>
    </div>
    <keep-alive>
      <activity-see
        v-if="curIndex === 0"
        :userList = "wTableData.list"
        :curStatus = curStatus[0]
        @remove="removeWatch"
        @watch="watchPeople" 
        :loadStatus="wTableData.loadStatus"
      ></activity-see>
      <activity-see
        v-else-if="curIndex === 1"
        :userList = "fTableData.list"
        :curStatus = curStatus[1]
        @remove="removeWatch"
        @watch="watchPeople"
        :loadStatus="fTableData.loadStatus"
      ></activity-see>
    </keep-alive>
  </div>
</template>

<script>
/* eslint-disable */
import { Tab, TabItem, Swiper, SwiperItem } from 'vux';
import { getWatchList, addWatch, deleteWatch } from '@/server/index.js';
import activitySee from '@/components/activitySee';

export default {
  name: 'personalPage',
  data() {
    return {
      curIndex: 0,
      wTableData: {
        list: [],
        total: '',
        loadStatus: 0,
        nextPage: 1,
      },
      fTableData: {
        list: [],
        total: '',
        loadStatus: 0,
        nextPage: 1,
      },
      curStatus: ['wTableData', 'fTableData'],
      curStatusWord: ['users', 'fans'],
    };
  },
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    activitySee,
  },
  mounted() {
    this.getTotalList();
  },
  methods: {
    loadMore() {
      const index = this.curIndex;// 标签
      const statusText = this.curStatus[index];// 对应data
      const word = this.curStatusWord[index];// 对应当前状态
      this.getList(this[statusText].nextPage, word,statusText);
    },
    getTotalList() {
      this.getList(1, 'users', 'wTableData');
      this.getList(1, 'fans', 'fTableData');
    },
    getList(num, word, statusText) {
      if (this[statusText].loadStatus !== 0) return;
      this[statusText].loadStatus = 1;
      const query = {
        page: 1,
        pageNum: num,
        pageSize: 10,
      };
      getWatchList(word, query).then((data) => {
        // debugger;
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
    watchPeople(id, index, statusText) {
      addWatch(id).then((res) => {
        if (res.code === 0) {
          this.$vux.toast.text('关注成功', 'top');
          const object = this[statusText].list[index];
          object.watchFlag = false;
          this.$set(this[statusText].list, index, object);
        } else {
          this.$vux.toast.text('关注失败', 'top');
        }
      });
    },
    removeWatch(id, index, statusText) {
      deleteWatch(id).then((res) => {
        if (res.code === 0) {
          this.$vux.toast.text('取消成功', 'top');
          const object = this[statusText].list[index];
          object.watchFlag = true;
          this.$set(this[statusText].list, index, object);
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
}
</style>
