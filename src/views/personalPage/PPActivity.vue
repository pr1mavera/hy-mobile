<template>
  <div class="PPActivity">
    <listNav :activityList="activityListData" :navOption="navOption"></listNav>
    <div class="activityListView">
      <ul>
        <li v-for="(activity, index) in activityListData" class="activityListLi" :key="index">
          <activityList :activity="activity"></activityList>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import { getActivityListById } from '@/server/index.js';
import listNav from '@/components/listNav';
import activityList from '@/components/activityList';

export default {
  data() {
    return {
      activityListData: [],
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
    };
  },
  mounted() {
    // this.setId(this.$route.params.id);
    this.getListById();
  },
  computed: {
    ...mapGetters([
      'id',
    ]),
  },
  methods: {
    async getListById() {
      const res = await getActivityListById(this.id);
      this.activityListData = res.data;
      // console.log(this.activityListData);
      if (res.code) {
        console.log('error in getInfoById');
      }
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
