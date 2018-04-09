<template>
  <div class="PPActivity">
    <!-- <listTab :activityList="activityList"></listTab> -->
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import { getActivityListById } from '@/server/index.js';

export default {
  data() {
    return {
      activityList: [],
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
      this.activityList = res.data;
      console.log(this.activityList);
      if (res.code) {
        console.log('error in getInfoById');
      }
    },
  },
};
</script>

<style lang="less">

</style>
