<template>
  <div id="service">
    <meetingHeader :colorStyle="colorStyle"></meetingHeader>
    <div class="mainContainer">
      <div class="banner">
        <img src="../assets/service-banner.png" alt="">
        <div class="content">
          <h5>服务</h5>
          <p>专业的技术团队</br>
          为不同需求用户量身定制会议主页
          </p>
          <p>专业票务管理系统<br/>
          专属管理后台会议管理<br/>
          为您打造极致的一站式会议创建服务体验
          </p>
          <button>立即创建</button>
        </div>
      </div>
      <div class="layout layout1">
        <div class="box">
          <img src="../assets/service-pic1.png" alt="">
          <p>一站式创建</p>
        </div>
        <div class="box">
          <img src="../assets/service-pic2.png" alt="">
          <p>专属活动页面</p>
        </div>
        <div class="box">
          <img src="../assets/service-pic3.png" alt="">
          <p>永久保存会议</p>
        </div>
      </div>
      <div class="layout layout2" v-for="item in serviceData">
        <service-card-title :data="item.head"></service-card-title>
        <service-card :data="item.boxList"></service-card>
        <div class="img-container">
          <img :src="item.imgsrc">
        </div>
      </div>

    </div>
    <meetingFooter></meetingFooter>
  </div>
</template>

<script>
import meetingHeader from '@/components/meetingHeader';
import meetingFooter from '@/components/meetingFooter';
import serviceCard from '@/components/serviceCard';
import serviceCardTitle from '@/components/serviceCardTitle';
/* eslint-disable */
export default {
  name: 'service',
  data() {
    return {
      colorStyle: {
        mainColor: '#2c7dfa',
        minorColor: '#b8bcc4',
        backgroundColor: '#ffffff',
      },
      serviceData: [
        {
          head: {
            title: '可选组件优化创建流程',
            content: '会议站为您定制多种自定义组件，创建会议时只需选择您所需要的内容，实现活动页面的自定义，有效避免冗杂的信息干扰',
          },
          boxList: [
            {
              title: '多种自定义组件',
              content: '活动日程、活动嘉宾、合作支持、联系方式等组件可选',
            },
          ],
          imgsrc: require('../assets/service-layout-pic1.png'),
        },
        {
          head: {
            title: '专业票务管理',
            content: '用户可以在线自定义门票发售日期、发售时间、票数、限额等，并支持设置多个价格点和最大/最小订单数，以此保证门票的可用性',
          },
          boxList: [
            {
              title: '在线售票与门票管理',
              content: '采用线上售票的形式，并配有专业的票务管理，实现会议人员管理与实时数据统计',
            },
            {
              title: '自动生成电子门票',
              content: '用户购买成功后，自动生成电子门票，门票含二维码，用于现场扫码验票',
            },
          ],
          imgsrc: require('../assets/service-layout-pic2.png'),
        },
        {
          head: {
            title: '专属会议管理后台',
            content: '用户注册并使用会议站平台后，便可拥有会议站为用户打造的专属后台，使用户更自由的管理会议内容和个人信息',
          },
          boxList: [
            {
              title: '会议创建与发布',
              content: '创建的会议可立即发布也可保存为草稿，可随时修改会议信息',
            },
            {
              title: '门票设置与管理',
              content: '可设置门票的类型，售票数量等，实现门票、实时查看售票情况等功能',
            },
            {
              title: '订单与发票管理',
              content: '订单购买信息可在管理后台查看，如需发票可在后台填写发票信息索要发票',
            },
          ],
          imgsrc: require('../assets/service-layout-pic3.png'),
        },
        {
          head: {
            title: '平台推广助您引流吸粉',
            content: '会议站平台可以免费为用户定制专属的活动主页，用户可以在主页嵌入主办方的logo等推广内容，有助于用户吸引更多的粉丝，扩大用户现有的客户群',
          },
          boxList: [
            {
              title: '活动页面嵌入推广内容',
              content: '创建活动时用户可嵌入推广内容，内容都显示在活动主页',
            },
            {
              title: '专属活动页面一键分享',
              content: '专属活动页面可一键分享至微信、微博、QQ等社交平台',
            },
          ],
          imgsrc: require('../assets/service-layout-pic4.png'),
        },
        {
          head: {
            title: '合理价格，多买多优惠',
            content: '会议站为满足用户需求，特推出多个优惠活动，提供给用户最优惠的价格，有意向长期合作的用户，还可以享受更多的优惠',
          },
          boxList: [
            {
              title: '多种版本不同价格供用户选择',
              content: '开发免费版、包场版、年费版、定制版等多种版本满足用户不同的需求',
            },
            {
              title: '多买多优惠',
              content: '目前只开放免费版本，后期将陆续开放收费版本，买的越多优惠越多',
            },
          ],
          imgsrc: require('../assets/service-layout-pic5.png'),
        },
      ],
    };
  },
  computed: {
  },
  mounted() {
  },
  methods: {
  },
  components: {
    meetingHeader,
    serviceCard,
    serviceCardTitle,
    meetingFooter,
  },
};
</script>

<style lang="less">
@import '../common/style/mixin.less';

#service{
  .mainContainer{
    .banner{
      position: relative;
      margin-top: 45px;
      background-color: #ffffff;
      img{
        width: 100%;
      }
      .content{
        color: #ffffff;
        position: absolute;
        top: 45px;
        left: 30px;
        h5{
          font-size: 25px;
          font-weight: 300;
        }
        p{
          font-weight: lighter;
          font-size: 14px;
          line-height: 24px;
          margin-top: 10px;
        }
        button{
          margin-top: 30px;
          font-size: 14px;
          color: #2c7dfa;
          background-color: #ffffff;
          width: 95px;
          height: 35px;
          border: none;
          border-radius: 18px;
          outline: none;
        }
      }
    }
    .layout{
      display: flex;
      justify-content: space-between;
      padding: 25px;
      &:nth-child(even){
        background-color: #ffffff;
      }
      &:nth-child(odd){
        background-color: #f4f7fa;
      }
      &.layout1{
        .box{
          height: 60px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          img{
            height: 30px;
          }
          p{
            font-size: 14px;
            color: #333333;
          }
        }
      }
      &.layout2{
        display: block;
        .img-container{
          text-align: center;
          img{
            margin-top: 60px;
            margin-left: -9999px;
            margin-right: -9999px;
            zoom: 0.5;// 火狐不支持，然而这是移动端
          }
        }
      }
    }
  }
}
</style>
