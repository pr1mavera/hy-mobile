<template>
  <div class="banner_list_item" >
    <img :src="activityBannerMobileUrl" alt="banenr">
    <p class="banner_item_footer">{{activityTitle}}</p>
  </div>
</template>

<script>
export default {
  props: ['activityBannerMobileUrl', 'activityTitle'],
  data() {
    return {

    };
  },
};
</script>
<style lang='less'>
.banner_list_item{
  margin: 0 16px 16px;
  border-radius: 3px;
  overflow: hidden;
  img{
    height: 190px;
    width: 100%;
  }
  .banner_item_footer{
    height: 48px;
    line-height: 48px;
    background-color: #fff;
    padding:0 15px;
  }
}
  
</style>