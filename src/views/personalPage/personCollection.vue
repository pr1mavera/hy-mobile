<template>
  <div class="PPCollection">
    <div class="tab-container">
      <tab
      class="SLtab"
      bar-active-color="transparent"
      default-color="#5d6574"
      active-color="#2c7dfa"
      >
        <tab-item selected @on-item-click="onTabItemClick">
          发布中({{activityPublish.total}})
        </tab-item>
        <tab-item @on-item-click="onTabItemClick">
          已结束({{activityOver.total}})
        </tab-item>
      </tab>
    </div>
    <keep-alive>
      <activity-list-new
        v-if="curIndex === 0"
        :activityList="activityPublish.list"
        :loadStatus="activityPublish.loadStatus"
      >
      </activity-list-new>
      <activity-list-new
        v-if="curIndex === 1"
        :activityList="activityOver.list"
        :loadStatus="activityOver.loadStatus"
      >
      </activity-list-new>
    </keep-alive>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import { getActivityMyWatch } from '@/server/index.js';
import { Tab, TabItem } from 'vux';
import activityListNew from '@/components/activityListNew';

export default {
  data() {
    return {
      activityPublish: {
        list: [],
        total: '',
        loadStatus: 0,
        nextPage: 1,
      },
      activityOver: {
        list: [],
        total: '',
        loadStatus: 0,
        nextPage: 1,
      },
      curIndex: 0,
      activityStatus: ['activityPublish', 'activityOver'],
      activityStatusNum: [1, 0],
    };
  },
  mounted() {
    this.getActivityTotal();
  },
  // computed: {
  //   // ...mapGetters([
  //   //   'id',
  //   //   'query',
  //   // ]),
  // },
  methods: {
    loadMore() {
      // debugger;
      const index = this.curIndex;// 标签
      const statusText = this.activityStatus[index];// 对应data
      const curStatus = this.activityStatus[index];// 对应当前状态
      this.getActivityList(this[statusText].nextPage, curStatus, statusText);
    },
    getActivityList(status, num, statusText) {
      if (this[statusText].loadStatus !== 0) return;
      this[statusText].loadStatus = 1;
      const query = {
        pageNum: num,
        pageSize: 10,
      };
      getActivityMyWatch(status, query).then((data) => {
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
    getActivityTotal() {
      this.getActivityList(1, 1, 'activityPublish');
      this.getActivityList(0, 1, 'activityOver');
    },
    onTabItemClick(index) {
      this.curIndex = index;
    },
  },
  components: {
    Tab,
    TabItem,
    activityListNew,
  },
};
</script>

<style lang="less">
.PPCollection {
  .tab-container{
    background-color: #f4f7fa;
    .SLtab {
      width: 85%;
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
            // flex: 0 0 50%;
          }

        }
      }
    }
  }
  .activityListView {
    ul > .activityListLi {
      margin-bottom: 5px;
      padding: 14px 20px;
      background-color: #ffffff;
      list-style-type:none;
    }
  }
  .bottom{
    text-align: center;
    color: #b8bcc4;
    margin: 15px;
  }
}
</style>
