<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import wxConfig from './config/wechat';

export default {
  name: 'app',
  created() {
    wxConfig();
  },
  watch: {
    $route() {
      wxConfig();
    },
  },
};
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #f4f7fa;
  font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  overflow-x: hidden;
}
.icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
html, body, #app {
  height: 100%;
  -webkit-overflow-scrolling: touch;
}
img{
  vertical-align: middle;
}
ul{
  list-style: none;
}
</style>
