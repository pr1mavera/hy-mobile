<template>
  <div class="PPActivity">
    <div class="tab-container">
      <tab
      class="SLtab"
      bar-active-color="transparent"
      default-color="#5d6574"
      active-color="#2c7dfa"
      >
        <tab-item selected @on-item-click="changeTab">
          发布中({{activityHas.total}})
        </tab-item>
        <tab-item @on-item-click="changeTab">
          未发布({{activityNo.total}})
        </tab-item>
        <tab-item @on-item-click="changeTab" v-if="!this.$route.query.id">
          已结束({{activityOver.total}})
        </tab-item>
      </tab>
    </div>
    <div class="activityListView" v-show="curIndex === 0">
      <ul>
        <li v-for="(activity, index) in activityHas.list" class="activityListLi" :key="index">
          <activityList :activity="activity"></activityList>
        </li>
      </ul>
    </div>
    <div class="activityListView" v-show="curIndex === 1">
      <ul>
        <li v-for="(activity, index) in activityNo.list" class="activityListLi" :key="index">
          <activityList :activity="activity"></activityList>
        </li>
      </ul>
    </div>
    <div class="activityListView" v-show="curIndex === 2">
      <ul>
        <li v-for="(activity, index) in activityOver.list" class="activityListLi" :key="index">
          <activityList :activity="activity"></activityList>
        </li>
      </ul>
    </div>
    <div class="bottom">
      已经到底啦~
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getActivityListById } from '@/server/index.js';
import { Tab, TabItem } from 'vux';
import activityList from '@/components/activityList';
// import { constants } from 'zlib';
// import { mapState } from 'vuex';

export default {
  data() {
    return {
      activityHas: {
        list: [],
        total: '',
      },
      activityNo: {
        list: [],
        total: '',
      },
      activityOver: {
        list: [],
        total: '',
      },
      curIndex: 0,
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
    // ...mapMutations(['SET_ID']),
    async getActivity(curId, curStatus) {
      const query = {
        id: curId,
        pageNum: 1,
        pageSize: 10,
        status: curStatus,
      };
      const res = await getActivityListById(query);
      // debugger;
      if (res && res.code === 0) {
        return res.data;
      }
      const obj = {
        list: [],
        total: '',
      };
      return obj;
    },
    getActivityTotal() {
      const curId = this.$route.params.id;
      const p1 = this.getActivity(curId, 1);
      const p2 = this.getActivity(curId, 0);
      const p3 = this.getActivity(curId, 3);
      Promise.all([p1, p2, p3]).then((values) => {
        this.activityHas = values[0];
        this.activityNo = values[1];
        this.activityOver = values[2];
      });
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
    activityList,
  },
};
</script>

<style lang="less">
.PPActivity {
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
