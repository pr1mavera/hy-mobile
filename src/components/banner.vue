<template>
  <div class="banner">
    <blur :blur-amount=5 :url="src">
      <p class="center"><img :src="src"></p>
    </blur>
  </div>
</template>

<script>
import { XImg, Blur } from 'vux';

export default {
  name: 'detail',
  data() {
    return {

    };
  },
  props: {
    src: String,
  },
  components: {
    XImg,
    Blur,
  },
};
</script>

<style lang="less" >
.banner{
  &>div{
    height: unset !important;
  }
  .center {
    text-align: center;
    padding-top: 45px;
    padding-bottom: 14px;
    color: #fff;
    font-size: 18px;
  }
  .center img {
    width: calc(~'100vw - 50px');
    height: auto;
  }
}
</style>
