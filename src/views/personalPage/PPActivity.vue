<template>
  <div class="PPActivity">
    <div class="tab-container">
      <tab
      class="SLtab"
      bar-active-color="transparent"
      default-color="#5d6574"
      active-color="#2c7dfa"
      >
        <tab-item selected @on-item-click="onTabItemClick">
          发布中({{activityIsPublish.length}})
        </tab-item>
        <tab-item @on-item-click="onTabItemClick">
          未发布({{activityNotPublish.length}})
        </tab-item>
        <tab-item @on-item-click="onTabItemClick" v-if="!this.$route.query.id">
          已结束({{activityIsOver.length}})
        </tab-item>
      </tab>
    </div>
    <div class="activityListView" v-if="currentShowActivityIndex === 0">
      <ul>
        <li v-for="(activity, index) in activityIsPublish" class="activityListLi" :key="index">
          <activityList :activity="activity"></activityList>
        </li>
      </ul>
    </div>
    <div class="activityListView" v-if="currentShowActivityIndex === 1">
      <ul>
        <li v-for="(activity, index) in activityNotPublish" class="activityListLi" :key="index">
          <activityList :activity="activity"></activityList>
        </li>
      </ul>
    </div>
    <div class="activityListView" v-if="currentShowActivityIndex === 2">
      <ul>
        <li v-for="(activity, index) in activityIsOver" class="activityListLi" :key="index">
          <activityList :activity="activity"></activityList>
        </li>
      </ul>
    </div>
    <div class="bottom">
      已经到底啦~
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import { getActivityListById, getActivityList, getActivityListIsOver } from '@/server/index.js';
import { Tab, TabItem } from 'vux';
import activityList from '@/components/activityList';

export default {
  data() {
    return {
      activityIsPublish: [],
      activityNotPublish: [],
      activityIsOver: [],
      currentShowActivityIndex: 0,
    };
  },
  mounted() {
    // this.setId(this.$route.params.id);
    this.getActivityList();
  },
  computed: {
    ...mapGetters([
      'id',
    ]),
  },
  methods: {
    async getActivityList() {
      if (this.$route.params.id) {
        const res0 = await getActivityListById(this.$route.params.id, 1);
        this.activityIsPublish = res0.data;
        const res1 = await getActivityListById(this.$route.params.id, 3);
        this.activityIsOver = res1.data;
        if (res0.code !== 0 || res1.code !== 0) {
          console.log('error in getActivityList');
        }
      } else {
        const res0 = await getActivityList(0);
        this.activityNotPublish = res0.data;
        const res1 = await getActivityList(1);
        this.activityIsPublish = res1.data;
        const res2 = await getActivityListIsOver();
        this.activityIsOver = res2.data;
        if (res0.code !== 0 || res1.code !== 0 || res2.code !== 0) {
          console.log('error in getActivityList');
        }
      }
    },
    onTabItemClick(index) {
      this.currentShowActivityIndex = index;
    },
  },
  watch: {
    '$route.path'(newVal, oldVal) {
      this.getActivityList();
    },
  },
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
