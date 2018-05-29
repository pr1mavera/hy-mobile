<template>
  <div class="PPActivity">
    <div class="tab-container">
      <tab
      class="SLtab"
      bar-active-color="transparent"
      default-color="#5d6574"
      active-color="#2c7dfa"
      >
        <tab-item selected @on-item-click="changeTab(0)">
          发布中({{activityHas.total}})
        </tab-item>
        <tab-item @on-item-click="changeTab(1)">
          未发布({{activityNo.total}})
        </tab-item>
        <tab-item @on-item-click="changeTab(2)" v-if="!this.$route.query.id">
          已结束({{activityOver.total}})
        </tab-item>
      </tab>
    </div>
    <keep-alive>
      <activity-list-new
        v-if="curIndex === 0"
        :activityList="activityHas.list"
        :loadStatus="activityHas.loadStatus"
      >
      </activity-list-new>
      <activity-list-new
        :activityList="activityNo.list"
        :loadStatus="activityNo.loadStatus"
        v-else-if="curIndex === 1"
      >
      </activity-list-new>
      <activity-list-new
        :activityList="activityOver.list"  
        v-else-if="curIndex === 2"
        :loadStatus="activityOver.loadStatus"
      >
      </activity-list-new>
    </keep-alive>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getActivityListById } from '@/server/index.js';
import { Tab, TabItem } from 'vux';
import activityListNew from '@/components/activityListNew';
// import { constants } from 'zlib';
// import { mapState } from 'vuex';

export default {
  data() {
    return {
      activityHas: {
        list: [],
        total: '',
        loadStatus: 0,
        nextPage: 1,
      },
      activityNo: {
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
      releasStatus: ['activityHas', 'activityNo', 'activityOver'],
      releasStatusNum: [1, 0, 3],
    };
  },
  created() {

  },
  mounted() {
    // this.setId(this.$route.params.id);
    this.getActivityTotal();
  },
  computed: {
    ...mapGetters([
      'id',
    ]),
    // ...mapState({ userId: state => state.id }),
  },
  methods: {
    loadMore() {
      // debugger;
      const index = this.curIndex;// 标签
      const statusText = this.releasStatus[index];// 对应data
      const curStatus = this.releasStatusNum[index];// 对应当前状态
      this.getActivity(this[statusText].nextPage, curStatus, statusText);
    },
    // ...mapMutations(['SET_ID']),
    getActivity(num, curStatus, statusText) {
      // debugger;
      if (this[statusText].loadStatus !== 0) return;
      this[statusText].loadStatus = 1;
      const curId = this.$route.params.id;
      const query = {
        id: curId,
        pageNum: num,
        pageSize: 5,
        status: curStatus,
      };
      getActivityListById(query).then((data) => {
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
      this.getActivity(1, 1, 'activityHas');
      this.getActivity(1, 0, 'activityNo');
      this.getActivity(1, 3, 'activityOver');
      // Promise.all([p1, p2, p3]).then((values) => {
      //   this.activityHas = values[0];
      //   this.activityNo = values[1];
      //   this.activityOver = values[2];
      // });
    },
    changeTab(index) {
      this.curIndex = index;
    },
  },
  // watch: {
  //   // $route() {
  //   //   this.getActivityTotal();
  //   // },
  // },
  components: {
    Tab,
    TabItem,
    activityListNew,
  },
};
</script>

<style lang="less">
.PPActivity {
  height: 100%;
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
  
  .bottom{
    text-align: center;
    color: #b8bcc4;
    margin: 15px;
  }
}
</style>
