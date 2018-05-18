<template>
  <div class="listNav">
    <p
    v-for="(item, index) in navOption"
    class="tabItem"
    :class="{ navHighLight:currentNav === index}"
    :key="index"
    @click="changeCurrentNav(index)"
    >
      {{item.name}}({{item.count}})
    </p>
  </div>
</template>

<script>
export default {
  props: {
    navOption: {
      type: Array,
    },
  },
  data() {
    return {
      currentNav: 0,
    };
  },
  methods: {
    changeCurrentNav(index) {
      this.currentNav = index;
      this.$emit('navChange', index);
    },
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
    &.navHighLight {
      color: #2c7dfa;
    }
  }
}
</style>
