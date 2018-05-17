<template>
<div class="banner-list-container">
  <div class="banner_list_item" v-if="this.activityBannerMobileUrl || this.activityTitle">
    <img :src="activityBannerMobileUrl" alt="banenr">
    <p class="banner_item_footer">{{activityTitle}}</p>
  </div>
  <div class="banner_list_item" v-else>
    <p class="banner_item_footer">暂无内容</p>
  </div>
</div>
</template>

<script>
export default {
  props: ['activityBannerMobileUrl', 'activityTitle'],
  mounted() {
    console.log(this.activityBannerMobileUrl, this.activityTitle);
  },
  data() {
    return {

    };
  },
};
</script>
<style lang='less'>
.banner-list-container{
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
}
</style>