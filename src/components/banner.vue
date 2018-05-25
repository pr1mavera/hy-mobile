<template>
  <div class="banner">
    <blur :blur-amount=5 :url="src">
      <div class="center">
        <div :style="`backgroundImage:url(${src})`" class="banner-img"></div>
        <!--<img :src="src">-->
      </div>
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
  .banner-img{
    width:calc(~'100vw - 50px');
    height:calc(~'(100vw - 50px)/16*9');
    background-repeat:no-repeat;
    background-position:center;
    background-size:cover;
    margin:0 auto;
  }
  &>div{
    height: unset !important;
  }
  .center {
    // text-align: center;
    padding-top: 45px;
    padding-bottom: 15px;
    color: #fff;
    font-size: 18px;
  }
  // .center img {
  //   width: calc(~'100vw - 50px');
  //   height: auto;
  // }
}
</style>
