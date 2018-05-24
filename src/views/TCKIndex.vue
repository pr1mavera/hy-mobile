<template>
<div id="TCKIndex">
  <div class="tab-container">
    <tab
    class="SLtab"
    custom-bar-width="25px"
    :line-width="2"
    bar-active-color="#2c7dfa"
    default-color="#9098a8"
    active-color="#2b313c"
    v-model="check"
    >
      <tab-item selected @on-item-click="check=0">
        进行中
      </tab-item>
      <tab-item @on-item-click="check=1">
        已结束
      </tab-item>
    </tab>
  </div>
</div>
</template>

<script>
import { Tab, TabItem } from 'vux';

export default {
  name: 'TCKIndex',
  data() {
    return {
      check: 0,
    };
  },
  components: {
    Tab,
    TabItem,
  },
  mounted() {
  },
  methods: {

  },
};
</script>

<style lang="less">
#TCKIndex{
  .tab-container{
    background-color: #ffffff;
    box-shadow: 0px 1px 10px rgba(216, 219, 224, .7);
    .SLtab {
      width: 50%;
      background-color: #ffffff;
      margin: 0 auto;
      .vux-tab-container {
        .vux-tab {
          background-color: #ffffff;
          box-sizing: border-box;
          border: 0;
          .vux-tab-item {
            background-size: 100% 0px;
            flex: 0 0 50%;
          }
          .vux-tab-ink-bar{
            bottom: 5px;
          }

        }
      }
    }
  }
}
</style>
