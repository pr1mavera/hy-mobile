<template>
  <div class="listNav">
    <p v-for="(item, index) in navOption" class="tabItem" :key="index">{{item.name}}({{item.count}})</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    activityList: {
      type: Array,
    },
    navOption: {
      type: Array,
    },
  },
  data() {
    return {

    };
  },
};
</script>

<style lang="less">
.listNav {
  display: flex;
  justify-content: center;
  font-size: 14px;
  line-height: 36px;
  color: #5d6574;
  .tabItem {
    margin: 0 16px;
  }
}
</style>
