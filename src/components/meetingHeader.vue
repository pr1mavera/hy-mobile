<template>
  <div class="header">
    <x-header
      class="meetingHeader"
      :left-options="titleOptions.left"
      :right-options="titleOptions.right"
      @on-click-back=""
      @on-click-more=""
      :style="{backgroundColor:colorStyle.backgroundColor}"
    >
      <div class="left" slot="left" :style="{color:colorStyle.minorColor}">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-Seach"></use>
        </svg>
      </div>
      <div class="title" slot="default" >
        <h1 :style="{color:colorStyle.mainColor}">会议站</h1>

      </div>
      <div class="right" slot="right" :style="{color:colorStyle.minorColor}">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-caidan"></use>
        </svg>
      </div>

    </x-header>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader } from 'vux';

export default {
  data() {
    return {
      titleOptions: {
        left: {
          showBack: false,
          backText: '',
          preventDefault: true,
        },
        right: {
          showMore: false,
        },
      },
    };
  },
  props: {
    colorStyle: Object,
  },
  components: {
    XHeader,
  },
  methods: {

  },
};
</script>

<style lang="less">
.header{
  .meetingHeader{
    padding: 0;
    top: 0;
    height: 45px;
    width: 100%;
    background-color: transparent;
    z-index: 999;
    position: absolute;
    &::after{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 1;
      z-index: -1;
    }
    .vux-header-left{
      left: 15px;
      top: 50%;
      margin-top: -12px;
      .left{
        font-size: 24px;
        color: #ffffff;
      }
    }
    .vux-header-right{
      right: 15px;
      top: 50%;
      margin-top: -12px;
      .right{
        font-size: 24px;
        color: #ffffff;
      }
    }
    .vux-header-title{
      height: 45px;
      .title{
        h1{
          line-height: 45px;
          font-size: 23px;
          color: #ffffff;
        }
      }
    }

  }
}
</style>
