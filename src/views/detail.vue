<template>
  <div id="detail">
    <meetingHeader :colorStyle="colorStyle"></meetingHeader>
    <div class="main-container">
      <banner :src="tableData.activityBannerMobileUrl"></banner>
      <div class="container-title">
        <div class="company">
          <p>{{tableData.nickname}}</p>
          <a v-if="!isWatch"  @click="addWatchPerson()">关注</a>
          <a v-else  @click="removeWatchPerson()">取消关注</a>
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
        <button class="buttonStyle1" v-if="!tableData.isCollect" @click="addWatchMeeting()">收藏</button>
        <button  class="buttonStyle2" v-else @click="removeWatchMeeting()">已收藏</button>
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
            <div id="container" >

            </div>
          </div>
        </div>
        <div class="sectionStyle detailIntroduction">
          <h1 class="title">
            简介
          </h1>
          <div class="content" >
            <p v-html="this.tableData.activityDescription"></p>
          </div>
        </div>
        <div class="sectionStyle detailSchedule" v-if="activitySchedulesOBJ && activitySchedulesOBJ.length>0">
          <h1 class="title">
            日程
          </h1>
          <div class="content">
            <div v-for="item in activitySchedulesOBJ">
              <h1>{{item.scheduleTitle}}</h1>
              <div class="info border-1px-b">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-weizhi"></use>
                </svg>
                <span style="padding-right:15px;">{{item.schedulePlace}}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shijian"></use>
                </svg>
                <span>{{item.startDate | timeFormatExceptHour}}</span>
              </div>
              <div class="timeLine-container" v-if="item.scheduleDetail && item.scheduleDetail instanceof Array && item.scheduleDetail.length > 0">
                <div v-for="itm in item.scheduleDetail" class="timeLine">
                  <div class="left">
                    <p class="hour">{{itm.startTime}}-{{itm.endTime}}</p>
                    <p class="day">{{item.startDate | timeFormatExceptHour2}}</p>
                  </div>
                  <div class="right">
                    <p class="theme">{{itm.theme}}</p>
                    <p class="remark">{{itm.remark}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sectionStyle detailGuests" v-if="tableData.activityGuests && tableData.activityGuests.length>0">
          <h1 class="title">
            嘉宾
          </h1>
          <div class="content">
            <div class="main-container" v-for="item in tableData.activityGuests">
              <div class="left">
                <div class="avator">
                  <img :src="item.guestAvatarUrl" alt="">
                </div>
              </div>
              <div class="right">
                <p class="title_little">
                  {{item.guestName}}
                  <span>{{item.guestIntro}}</span>
                </p>
                <p>
                  {{item.guestIdentity}}

                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="sectionStyle detailSupport" v-if="partnersOBJ && partnersOBJ.length>0">
          <h1 class="title">
            合作支持
          </h1>
          <div class="content">
            <div class="container-layout" v-for="item in partnersOBJ">
              <h2>{{item[0].partnerType}}</h2>
              <flexbox :gutter='0' class="container" >
                <flexbox-item :span='1/3' class="box" v-for="(itm ,index) in item" :key="index">
                  <img :src="itm.logoUrl">
                </flexbox-item>
              </flexbox>
            </div>
          </div>
        </div>
        <div class="sectionStyle detailContact" v-if="tableData.activityContacts && tableData.activityContacts.length>0">
          <h1 class="title">
            联系方式
          </h1>
          <div class="content">
            <div v-for="item in tableData.activityContacts" class="box">
              <flexbox >
                <flexbox-item >
                  <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-wode"></use>
                  </svg>
                  <span>{{item.contactName}}</span>
                </flexbox-item>
                <flexbox-item  >
                  <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-youxiang1"></use>
                  </svg>
                  <span>{{item.contactEmail}}</span>
                </flexbox-item>
              </flexbox>
              <flexbox>
                <flexbox-item  >
                  <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-Telephone"></use>
                  </svg>
                  <span>{{item.contactPhone}}</span>
                </flexbox-item>
                <flexbox-item  >
                  <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-weixin"></use>
                  </svg>
                  <span>{{item.contactWechat}}</span>
                </flexbox-item>

              </flexbox>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <p>本站由<span>会议站</span>提供技术支持</p>
      <p>Copyright © 2013-2017 版权所有 北京韦尔科技有限公司</p>
      <p>京ICP备14040981号-2</p>
    </footer>
    <aside>
      <div class="box-container">
        <div class="price">
          <!-- <span class="money" v-if="tableData.activityTickets[0].ticketPrice > 0">
            {{tableData.activityTickets[0].ticketPrice}}
          </span> -->
          <span class="free" >免费</span>
        </div>
        <div class="next" @click="goBuyTicket('click')" ref="getTicket">
          <span>获取门票</span>
        </div>
        <div id='url' style='display: none'>{{currentUrl}}</div>
      </div>
    </aside>
  </div>
</template>

<script>
import { XImg, XButton, Grid, GridItem, Flexbox, FlexboxItem, Alert } from 'vux';
import { mapMutations, mapState } from 'vuex';
import banner from '@/components/banner';
import meetingHeader from '@/components/meetingHeader';
import { getActivityInfoById, addWatchCollect, removeWatchCollect, addWatch, deleteWatch, getWatchPeopleList } from '@/server/index.js';
import { formatDate, MP } from '@/common/js/index.js';

export default {
  name: 'detail',
  data() {
    return {
      currentUrl: location.href,
      colorStyle: {
        mainColor: '#ffffff',
        minorColor: '#ffffff',
        backgroundColor: 'transparent',
      },
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
        activitySchedules: [],
        activityPartners: [],
        activityContacts: [],
        activityGuests: [],
      },
      isWatch: 0,
    };
  },
  components: {
    meetingHeader,
    XImg,
    banner,
    XButton,
    Grid,
    GridItem,
    Flexbox,
    FlexboxItem,
    Alert,
  },
  mounted() {
    // debugger;
    this.SET_ACTIVITY_ID(this.$route.params.id);
    this.getInfoById();
  },
  computed: {
    ...mapState({ id: state => state.activityId }),
    isSameYear() {
      // debugger;
      if ((Object.keys(this.tableData).length > 1) && this.tableData.startTime &&
      (this.tableData.startTime.substr(0, 4) === this.tableData.endTime.substr(0, 4))) {
        return true;
      }
      return false;
    },
    activitySchedulesOBJ() {
      const obj = this.tableData.activitySchedules.map((e) => {
        const temp = e;
        temp.scheduleDetail = JSON.parse(e.scheduleDetail);
        console.log(temp);
        return temp;
      });
      return obj;
    },
    partnersOBJ() {
      // eslint-disable-next-line
      const keyArrayTemp = this.tableData.activityPartners.map((e) => {
        return e.partnerType;
      });
      const keyArray = [...new Set(keyArrayTemp)];
      const obj = [];
      keyArray.forEach((e) => {
        // eslint-disable-next-line
        const temp = this.tableData.activityPartners.filter((element) => {
          if (e === element.partnerType) {
            return element;
          }
        });
        obj.push(temp);
      });
      return obj;
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
    timeFormatExceptHour(value = '') {
      const temp = new Date(value.replace(/-/g, '/'));
      return formatDate(temp, 'yyyy年MM月dd日');
    },
    timeFormatExceptHour2(value = '') {
      const temp = new Date(value.replace(/-/g, '/'));
      return formatDate(temp, 'yyyy/MM/dd');
    },
    timeFormatExceptTime(value = '') {
      const temp = new Date(value.replace(/-/g, '/'));
      return formatDate(temp, 'hh:mm');
    },
    adressFormat(value = '{}') {
      let temp = JSON.parse(value);
      temp = Object.values(temp);
      temp = temp.join('');
      return temp;
    },

  },
  methods: {
    ...mapMutations(['SET_ACTIVITY_ID']),
    async getInfoById() {
      // debugger;
      // 获取会议详情
      const res1 = await getActivityInfoById(this.id);
      this.tableData = res1.data;
      // this.goBuyTicket();
      const res2 = await getWatchPeopleList({ page: 0, orderBy: 1 });
      if (!(res1.code === 0 && res1) || !(res2.code === 0 && res2)) {
        console.log('error in getInfoById ');
      } else {
        res2.data.forEach((e) => {
          if (e.id === res1.data.userId) {
            this.isWatch = 1;
          }
        });
        this.$nextTick(() => {
          MP().then((mp) => {
            const map = new mp.Map('container');
            let temp = JSON.parse(this.tableData.activityAddress);
            const city = Object.values(temp)[0];
            temp = Object.values(temp).join('');
            map.centerAndZoom(temp, 12);
            const myGeo = new mp.Geocoder();
            // 将地址解析结果显示在地图上,并调整地图视野
            myGeo.getPoint(temp, (point) => {
              if (point) {
                map.centerAndZoom(point, 16);
                map.addOverlay(new mp.Marker(point));
              } else {
                console.log('您选择地址没有解析到结果!');
              }
            }, city);
          });
        });
      }
    },
    /* eslint-disable */
    copyToClipboard(elem) {
      // create hidden text element, if it doesn't already exist
      var targetId = "_hiddenCopyText_";
      var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
      var origSelectionStart, origSelectionEnd;
      if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
      } else {
          // must use a temporary form element for the selection and copy
          target = document.getElementById(targetId);
          if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
          }
          target.textContent = elem.textContent;
      }
      // select the content
      var currentFocus = document.activeElement;
      target.focus();
      target.setSelectionRange(0, target.value.length);

      // copy the selection
      var succeed;
      try {
          succeed = document.execCommand("copy");
      } catch(e) {
          succeed = false;
      }
      // restore original focus
      if (currentFocus && typeof currentFocus.focus === "function") {
          currentFocus.focus();
      }

      if (isInput) {
          // restore prior selection
          elem.setSelectionRange(origSelectionStart, origSelectionEnd);
      } else {
          // clear temporary content
          target.textContent = "";
      }
      this.$vux.alert.show({
        title: '温馨提示',
        content: '链接已复制，请先到PC端购票',
      });
      return succeed;
    },
    /* eslint-enable */
    goBuyTicket() {
      debugger
      const url = document.getElementById('url');
      this.copyToClipboard(url);
      // 判断会议 是否结束
      // if (new Date(this.tableData.endTime) - new Date() > 0) {
      //   this.$refs.getTicket.style.backgroundColor = '#2c7dfa';
      //   if (value) {
      //     const id = this.id;
      //     const nextRoute = `/buyTicket/${id}`;
      //     this.$router.push({
      //       path: nextRoute,
      //     });
      //   }
      // } else {
      //   this.$refs.getTicket.style.backgroundColor = '#ccc';
      //   // 会议已结束
      //   if (value) {
      //     this.$vux.alert.show({
      //       title: '温馨提示',
      //       content: '会议已结束，不能购票！',
      //     });
      //   }
      // }
    },
    addWatchMeeting() {
      // debugger;
      addWatchCollect(this.id).then((res) => {
        if (res && res.code === 0) {
          this.$vux.toast.text('收藏成功', 'top');
          this.tableData.isCollect = 1;
        } else {
          this.$vux.toast.text('收藏失败', 'top');
        }
      });
    },
    removeWatchMeeting() {
      removeWatchCollect(this.id).then((res) => {
        if (res && res.code === 0) {
          this.$vux.toast.text('取消成功', 'top');
          this.tableData.isCollect = 0;
        } else {
          this.$vux.toast.text('取消失败', 'top');
        }
      });
    },
    addWatchPerson() {
      addWatch(this.tableData.userId).then((res) => {
        if (res && res.code === 0) {
          this.$vux.toast.text('关注成功', 'top');
          this.isWatch = 1;
        } else {
          this.$vux.toast.text('关注失败', 'top');
        }
      });
    },
    removeWatchPerson() {
      deleteWatch(this.tableData.userId).then((res) => {
        if (res && res.code === 0) {
          this.$vux.toast.text('取消成功', 'top');
          this.isWatch = 0;
        } else {
          this.$vux.toast.text('取消失败', 'top');
        }
      });
    },

  },
};
</script>

<style  lang="less">
@import '../common/style/mixin.less';
#detail{
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
      .buttonStyle1{
        width: 100%;
        color: #2C7DFA;
        border: 1px solid #2C7DFA;
        background-color: #ffffff;
        border-radius: 4px;
        font-size: 16px;
        height: 45px;
        margin-top: 10px;
      }
      .buttonStyle2{
        margin-top: 10px;
        width: 100%;
        color: #B8BCC4;
        background-color: #ffffff;
        border: 1px solid #B8BCC4;
        border-radius: 4px;
        font-size: 16px;
        height: 45px;
      }
      .sectionStyle{
        padding-top: 20px;
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
            #container{
              height: 150px;
            }
          }
        }
        &.detailIntroduction{
          .content{
            p{
              font-size: 13px;
              color:#5d6574;
            }
          }
        }
        &.detailSchedule{
          .content{
            &>div{
              overflow: hidden;
            }
            h1{
              font-size: 14px;
              color:#2b313c;
            }
            .info{
              padding: 15px 0;
              font-size: 12px;
              color:#5d6574;
              .border-1px-b(#d8dbe0);
            }
            .timeLine-container{
              padding-top: 14px;
              padding-bottom: 40px;
              .timeLine{
                display: flex;
                .left{
                  width: 100px;
                  min-width: 100px;
                  max-width: 100px;
                  flex-grow: 0;
                  text-align: right;
                  padding-right: 12px;
                  box-sizing: border-box;
                  .border-1px-timeLine(#d8dbe0);
                  .hour{
                    color: #2b313c;
                    font-size: 13px;
                    line-height: 40px;
                  }
                  .day{
                    font-size: 12px;
                    color: #5d6574;
                    line-height: 15px;
                  }
                }
                .right{
                  margin-left: 10px;
                  width: auto;
                  .theme{
                    color: #2b313c;
                    font-size: 13px;
                    font-weight: bold;
                    line-height: 40px;
                  }
                  .remark{
                    font-size: 12px;
                    color: #5d6574;
                    line-height: 15px;
                    margin-bottom: 10px;
                  }
                }
                &:last-child{
                  overflow: hidden;
                  .right{
                    .remark{
                      margin-bottom: 0;
                    }
                  }
                }
              }
            }
          }
        }
        &.detailGuests{
          .content{
            .main-container{
              display: flex;

              .left{
                width: 50px;
                min-width: 50px;
                max-width: 50px;
                flex-grow: 0;
                .avator{
                  display: inline-block;
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                  background-color:#ddd;
                  img{
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                  }
                }
              }
              .right{
                p{
                  font-size: 12px;
                  color: #5d6574;
                  &.title_little{
                    color: #2b313c;
                    font-weight: 600;
                    line-height: 25px;
                    span{
                      color: #5d6574;
                      padding-left: 15px;
                      margin-left: 10px;
                      .border-1px-l(#5d6574);
                    }
                  }
                }
              }
            }
          }
        }
        &.detailSupport{
          .content{
            .container-layout{
              h2{
                font-size: 13px;
                color: #666666;
              }
              .container{
                margin:15px 0;
                .box{
                  &:nth-child(2+3n){
                    text-align: center;
                  }
                  width: 100px;
                  height: 50px;
                  img{
                    width: 100px;
                    height: 50px;

                  }
                }
              }
            }
          }
        }
        &.detailContact{
          .content{
            .box{
              color:#5d6574;
              font-size: 12px;
              &:not(:last-child){
                .border-1px-b(#5d6574)
              }
              padding-bottom: 15px;
              &:not(:first-child){
                padding: 15px 0;
              }
              span{
                margin-left: 10px;
              }
            }
          }
        }
      }
    }
  }
  footer{
    margin-bottom: 65px;
    background-color: #f3f4f8;
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p{
      font-size: 10px;
      color:#b8bcc4;
      span{
        color:#8a8e94;
      }
      &:nth-child(1){
        line-height: 40px;
      }
    }
  }
  aside{
    position: fixed;
    width: 100vw;
    bottom: 0;
    background-color: #ffffff;
    z-index: 2;
    .box-container{
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 65px;
      box-shadow: 0px -3px 5px 0px rgba(44,125,250,.1);
      font-size: 16px;
      line-height: 65px;
      .price{
        flex-grow: 1;
        text-align: left;
        padding-left: 26px;
        span.free{
          color: #07D79C;
        }
      }
      .next{
        text-align: center;
        flex-grow: 0;
        width: 150px;
        max-width: 150px;
        min-width: 150px;
        background-color: #2c7dfa;
        span{
          color: #ffffff;

        }
      }
    }
  }
}

</style>

