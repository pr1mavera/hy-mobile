<template>
  <div id="detail">
    <x-header
    class="meetingHeader"
    :left-options="titleOptions.left"
    :right-options="titleOptions.right"
    @on-click-back=""
    @on-click-more=""
    >
      <div class="left" slot="left">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-Seach"></use>
        </svg>
      </div>
      <div class="title" slot="default">
        <h1>会议站</h1>

      </div>
      <div class="right" slot="right">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-caidan"></use>
        </svg>
      </div>

    </x-header>
    <div class="main-container">
      <banner :src="tableData.activityBannerMobileUrl"></banner>
      <div class="container-title">
        <div class="company">
          <p>{{sponsor.contactName}}</p>
          <a >关注</a>
        </div>
        <h1 class="title">{{tableData.activityTitle}}</h1>
        <div class="time">
           <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shijian"></use>
           </svg>
           <span v-if="isSameYear">{{tableData.startTime | timeFormatExceptYear}}</span>
           <span v-else>{{tableData.startTime | timeFormat}}</span>
           —
           <span v-if="isSameYear">{{tableData.endTime | timeFormatExceptYear}}</span>
           <span v-else>{{tableData.endTime | timeFormat}}</span>
        </div>
        <div class="location">
           <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-weizhi"></use>
           </svg>
           <span>{{tableData.activityAddress | adressFormat}}</span>
        </div>
        <div class="sectionStyle detailTime">
          <h1 class="title">
            日期时间
          </h1>
          <div class="content">
            <span v-if="isSameYear">{{tableData.startTime | timeFormatExceptYear}}</span>
            <span v-else>{{tableData.startTime | timeFormat}}</span>
            —
            <p v-if="isSameYear">{{tableData.endTime | timeFormatExceptYear}}</p>
            <p v-else>{{tableData.endTime | timeFormat}}</p>
          </div>
        </div>
        <div class="sectionStyle detailLocation">
          <h1 class="title">
            位置
          </h1>
          <div class="content">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader, XImg, XButton } from 'vux';
import { mapMutations, mapState } from 'vuex';
import banner from '@/components/banner';
import { getActivityInfoById, getSponsorByUserId } from '@/server/index.js';
import { formatDate } from '@/common/js/index.js';

export default {
  name: 'detail',
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
      blurConfig: {
        isBlurred: false, // activate and deactivate blur directive example 2
        opacity: 0.3,
        filter: 'blur(1.2px)',
        transition: 'all .3s linear',
      },
      tableData: {
        activityBannerMobileUrl: '',
      },
      sponsor: {
        contactName: '',
      },
    };
  },
  components: {
    XHeader,
    XImg,
    banner,
    XButton,
  },
  mounted() {
    this.SET_ID(this.$route.params.id);
    this.getInfoById();
  },
  computed: {
    ...mapState({ id: state => state.id }),
    isSameYear() {
      if ((Object.keys(this.tableData).length > 1) &&
      (this.tableData.startTime.substr(0, 4) === this.tableData.endTime.substr(0, 4))) {
        return true;
      }
      return false;
    },
  },
  filters: {
    timeFormat(value = '') {
      const temp = new Date(value.replace(/-/g, '/'));
      return formatDate(temp, 'yyyy年MM月dd日 hh:mm');
    },
    timeFormatExceptYear(value = '') {
      const temp = new Date(value.replace(/-/g, '/'));
      return formatDate(temp, 'MM月dd日 hh:mm');
    },
    adressFormat(value = '{}') {
      let temp = JSON.parse(value);
      temp = Object.values(temp);
      temp = temp.join('');
      return temp;
    },
  },
  methods: {
    ...mapMutations(['SET_ID']),
    async getInfoById() {
      const res1 = await getActivityInfoById(this.id);
      this.tableData = res1.data;
      const res2 = await getSponsorByUserId(res1.data.userId);
      this.sponsor = res2.data;
      if (!(res1.code === 0 && res2.code === 0)) {
        console.log('error in getInfoById');
      }
    },
  },
};
</script>

<style  lang="less">
#detail{

  .meetingHeader{
    padding: 0;
    height: 45px;
    width: 100%;
    background-color: transparent;
    z-index: 999;
    position: fixed;
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
  .main-container{
    .container-title{
      background-color: #ffffff;
      padding: 15px 25px;
      z-index: 1;
      position: relative;
      .company{
        p{
          font-size: 12px;
          color:#5d6574;
          display: inline-block;
        }
        a{
          font-size: 12px;
          color: #2c7dfa;
        }
      }
      h1.title{
        font-size: 18px;
        color: #2b313c;
      }
      .time,.location{
        color: #5d6574;
        font-size: 12px;
        line-height: 30px;
        .more{
          text-decoration: underline;
        }
      }
      .sectionStyle{
        padding: 20px 0;
        .title{
          font-size: 15px;
          color:#2b313c;
          margin-bottom: 15px;
          &::before{
            content:'';
            background-color: #2c7dfa;
            width: 2px;
            height: 15px;
            display: inline-block;
            vertical-align: middle;
          }
        }
        &.detailTime{
          .content{
            display: inline-block;
            background-color: #f2f5f7;
            color: #2b313c;
            font-size: 12px;
            padding: 16px 20px;
          }
        }
        &.detailLocation{
          .content{

          }
        }
      }
    }
  }
}
</style>
