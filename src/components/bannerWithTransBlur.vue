<template>
  <div class="bannerWithTransBlur">
    <div class="bannerBg">
      <img src="@/views/personalPage/bannerBg.png" height="300">
    </div>
    <div class="avatar">
      <img src="@/views/personalPage/icon.png" width="60" height="60">
    </div>
    <h1 class="name">北京汽车广场展览有限公司</h1>
    <p class="desc">这个人很烂，什么都没有留下...</p>
    <x-button class="followBtn">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon-test"></use>
      </svg>
      关注
    </x-button>
    <div class="attribute">
      <div class="item">
        <p>223</p>
        <p>会议</p>
      </div>
      <div class="item">
        <p>3366</p>
        <p>粉丝</p>
      </div>
      <div class="item">
        <p>160</p>
        <p>人气</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { XButton } from 'vux';

export default {
  name: 'detail',
  data() {
    return {

    };
  },
  components: {
    XButton,
  },
};
</script>

<style lang="less">
.bannerWithTransBlur{
  width: 100%;
  // height: 400px;
  color: #ffffff;
  text-align: center;
  overflow-y: hidden;

  .bannerBg {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
  }
  .avatar {
    img {
      margin-top: 60px;
      border-radius: 50%;
      border: solid #6586cf 5px;
    }
  }
  .name {
    font-size: 20px;
    font-weight: 200;
  }
  .desc {
    font-size: 12px;
    opacity: .7;
  }
  .followBtn {
    width: 60px;
    line-height: 24px;
    font-size: 13px;
    color: #ffffff;
    padding: 0;
    margin-top: 8px;
    background-color: rgba(0, 0, 0, .3);
    border-radius: 2px;
    border: solid #ffffff 1px;
    .icon {
      font-size: 12px;
      transform: scale(.8);
    }
  }
  .attribute {
    display: flex;
    justify-content: center;
    font-size: 14px;
    font-weight: lighter;
    opacity: .8;
    .item {
      margin: 8px 30px;
    }
  }
}
</style>
