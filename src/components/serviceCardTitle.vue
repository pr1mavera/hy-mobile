<template>
<div class="serviceTitle">
  <div class="title">
    <h4>{{data.title}}</h4>
  </div>
  <div class="intro">
    <span>{{data.content}}</span>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  props: {
    data: Object,
  },
};
</script>

<style lang="less">
.serviceTitle{
  .title{
    color:#2b313c;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .intro{
    font-size: 14px;
    color:#9098a8;
  }
}
</style>
