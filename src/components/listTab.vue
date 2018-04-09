<template>
  <div class="listTab">
    <p v-for="(ticket, index) in activityList" class="tabItem" :key="index"></p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    activityList: {
      type: Array,
    },
  },
};
</script>

<style lang="less">

</style>
