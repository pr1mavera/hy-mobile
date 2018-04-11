<template>
  <div class="PPActivity">
    <listNav @navChange="navChange" :navOption="navOption"></listNav>
    <div class="activityListView">
      <ul>
        <li v-for="(activity, index) in ShowActivityMap[0]" class="activityListLi" :key="index">
          <activityList :activity="activity"></activityList>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import { getActivityListById, getActivityList, getActivityListIsOver } from '@/server/index.js';
import listNav from '@/components/listNav';
import activityList from '@/components/activityList';

export default {
  data() {
    return {
      activityIsPublish: [],
      activityNotPublish: [],
      activityIsOver: [],
      //
      ShowActivityMap: [],
      navOption: [
        {
          name: '发布中',
          count: 6,
        },
        {
          name: '未发布',
          count: 8,
        },
        {
          name: '已结束',
          count: 8,
        },
      ],
      currentNav: 0,
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
      'query',
    ]),
  },
  methods: {
    async getActivityList() {
      if (this.query.id) {
        const res = await getActivityListById(this.query.id);
        this.classifyActivityAndSetToDate(res.data);
        if (res.code) {
          console.log('error in getInfoById');
        }
      } else {
        const res0 = await getActivityList(0);
        this.activityNotPublish = res0.data;
        const res1 = await getActivityList(1);
        this.activityIsPublish = res1.data;
        const res2 = await getActivityListIsOver();
        this.activityIsOver = res2.data;
        if (res0.code !== 0 || res1.code !== 0 || res2.code !== 0) {
          console.log('error in getInfoById');
        }
      }
    },
    classifyActivityAndSetToDate(list) {
      this.activityIsPublish = list.filter(item => item.issueStatus === 1);
      this.activityNotPublish = list.filter(item => item.issueStatus === 0);
    },
    navChange(index) {
      this.currentNav = index;
      // if (this.currentNav === 0) { // 发布中
      //   this.currentShowActivity = this.activityListData.filter((item) => {
      //     return item.activityType === 1;
      //   });
      // } else if (this.currentNav === 1) { // 未发布
      //   this.currentShowActivity = this.activityListData.filter((item) => {
      //     return item.activityType === 0;
      //   });
      // } else if (this.currentNav === 2) {
      //
      // }
    },
  },
  components: {
    listNav,
    activityList,
  },
};
</script>

<style lang="less">
.PPActivity {
  .activityListView {
    ul > .activityListLi {
      margin-bottom: 5px;
    }
  }
}
</style>
