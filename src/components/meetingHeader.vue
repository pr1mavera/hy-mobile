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
      <div class="left" slot="left" :style="{color:colorStyle.minorColor}" @click="showSearch = true">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-Seach"></use>
        </svg>
      </div>
      <div class="title" slot="default" >
        <h1 :style="{color:colorStyle.mainColor}">会议站</h1>

      </div>
      <div class="right" slot="right" :style="{color:colorStyle.minorColor}" @click="showMenu = true">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-caidan"></use>
        </svg>
      </div>

    </x-header>
    <div v-transfer-dom>
      <popup v-model="showMenu" position="right" >
        <div class="menu">
          <button class="close" @click="showMenu = false">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-guanbi2"></use>
            </svg>
          </button>
          <div class="noLogin" v-if="!isLogin">
            <x-button type="" text="登录" :link="loginUrl+'/login?service='+curUrl"></x-button>
            <x-button type="" text="注册" :link="loginUrl+'/register?service='+curUrl"></x-button>
          </div>
          <div class="Login" v-if="isLogin">
            <span class="version">免费版</span>
            <div class="userInfo">
              <div>
                <h1>{{this.userProfile.nickname ? this.userProfile.nickname : this.userName}}</h1>
                <p>{{this.userProfile.email ? this.userProfile.email : '未绑定邮箱'}}</p>
              </div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-you2"></use>
              </svg>
            </div>
            <div class="lineContainer">
              <div class="line"></div>
            </div>
            <div class="powerInfo">
              <p>未购买企业版授权</p>
              <button>购买</button>
            </div>
            <div class="lineContainer">
              <div class="line"></div>
            </div>
            <div class="list">
              <a @click="clickToRouteByPathName('/usercenter/activity/', 0)">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-wodehuiyi"></use>
                </svg>
                <span>我的会议</span>
              </a>
              <a @click="clickToRouteByPathName('/usercenter/partake/', 1)">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-wodemenpiao"></use>
                </svg>
                <span>我的门票</span>
              </a>
              <!-- <a href="http://huiyizhan.ourwill.cn/manage#/dataCenter">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-gbannerBguanlihoutai"></use>
                </svg>
                <span>管理后台</span>
              </a> -->
              <a v-show="!this.userProfile.unionid" href="/logout">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-tuichudenglu"></use>
                </svg>
                <span>退出登录</span>
              </a>
            </div>
          </div>
          <div class="router" >
            <a href="/" class="box">
              <svg  class="icon" aria-hidden="true">
                <use xlink:href="#icon-shouye"></use>
              </svg>
              <span>首页</span>
            </a>
            <a href="/meetingList" class="box">
              <svg  class="icon" aria-hidden="true">
                <use xlink:href="#icon-huodong"></use>
              </svg>
              <span>活动</span>
            </a>
            <a href="/service" class="box">
              <svg  class="icon" aria-hidden="true">
                <use xlink:href="#icon-fuwu"></use>
              </svg>
              <span>服务</span>
            </a>
            <a href="/price" class="box">
              <svg  class="icon" aria-hidden="true">
                <use xlink:href="#icon-jiage"></use>
              </svg>
              <span>价格</span>
            </a>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="showSearch" position="top" >
        <div class="searchContainer">
          <div class="iconContainer" @click="showSearch = false">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shangla"></use>
            </svg>
          </div>
          <div class="search">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-Seach"></use>
            </svg>
            <input
              v-model="searchVal"
              type="text"
              placeholder="搜索会议关键字"
              @focus="changeHandler"
            >
              <!-- <div >
              </div>
            <input> -->
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { getProfileDetail } from '@/server/index.js';
import config from '@/config/index.js';
import { XHeader, Popup, TransferDom, XButton } from 'vux';
import { mapMutations, mapGetters } from 'vuex';

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
      showMenu: false,
      showSearch: false,
      searchVal: '',
      isLogin: false,
      userProfile: {},
      loginUrl: '',
      curUrl: '',
    };
  },
  directives: {
    TransferDom,
  },
  props: {
    colorStyle: Object,
  },
  components: {
    XHeader,
    Popup,
    XButton,
  },
  mounted() {
    this.loginUrl = config.loginPath;
    this.curUrl = window.location.href;
    this.getUserProfile();
    // this.setIDInQuery();
  },
  computed: {
    ...mapGetters([
      'id',
    ]),
    /* eslint-disable */
    userName() {
      const length = this.userProfile.username.length;
      if (length === 2) {
        return this.userProfile.username ? this.userProfile.username.replace(/^(.).*(.)$/, '$1*') : '';
      } else if (length > 2) {
        let name = this.userProfile.username[0] + '*' + this.userProfile.username[length-1]
        return this.userProfile.username ? this.userProfile.username.replace(/^(.).*(.)$/, name) : '';
      }
    },
  },
  methods: {
    // 获取用户信息
    async getUserProfile() {
      const res = await getProfileDetail();
      if (res.code === -1) {
        this.isLogin = false;
      } else if (res.code === 0) {
        this.isLogin = true;
        this.setId(res.data.id);
        this.userProfile = res.data;
        // console.log(this.userProfile, 123);
      } else {
        console.log('error in getUserProfile');
      }
    },
    clickToRouteByPathName(name, tabFlag) {
      this.showMenu = false;
      this.$router.push(name + this.id);
      this.$emit('rightSliderClickToChangeTabFlag', tabFlag);
    },
    changeHandler() {
      this.$router.push({
        name: 'search',
      });
    },
    ...mapMutations({
      setId: 'SET_ID',
    }),
  },
};
</script>

<style lang="less">
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #b8bcc4;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #b8bcc4;
}
input:-ms-input-placeholder { /* IE */
    color: #b8bcc4;
}
input::-webkit-input-placeholder{/* webkit内核的浏览器，如谷歌，edge */
    color: #b8bcc4;
}
.vux-popup-dialog.vux-popup-right,.vux-popup-dialog.vux-popup-top{
  z-index: 1000;
  background-color: #ffffff;
  .menu{
    width: 250px;
    .close{
      position: absolute;
      top: 15px;
      right: 16px;
      .icon{
        width: 15px;
        height: 15px;
      }
    }
    .noLogin{
      margin-top: 95px;
      margin-left: 30px;
      margin-right: 30px;
      button{
        &:first-child{
          color:#2c7dfa;
          background-color: #ffffff;
          border: 1px solid #2c7dfa;
        }
        &:last-child{
          background-color: #2c7dfa;
        }
      }
    }
    .Login{
      margin-top:60px;
      margin-left: 30px;
      margin-right: 30px;
      .version{
        color:#07d79c;
        font-size: 13px;
        display: inline-block;
        margin-bottom: 10px;
      }
      .userInfo{
        display: flex;
        justify-content: space-between;
        align-items: center;
        &>div{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          h1{
            color:#2b313c;
            font-size: 17px;
          }
          p{
            color:#9098a8;
            font-size: 13px;
          }
        }
        svg{
           color:#9098a8;
           width: 10px;
           height: 10px;
        }
      }
      .lineContainer{
        display: flex;
        justify-content: center;
        margin: 14px 0;
        .line{
          height: 1px;
          background-color: #d8dbe0;
          margin-left: -100px;
          margin-right: -100px;
          width: 250px;

        }
      }
      .powerInfo{
        display: flex;
        justify-content: space-between;
        align-items: center;
        p{
          color:#2b313c;
          font-size: 13px;
        }
        button{
          font-size: 12px;
          color:#ff9041;
          border:1px solid #ff9041;
          width: 45px;
          height: 25px;
          background-color: #ffffff;
          outline: none;
          border-radius: 2px;
        }
      }
      .list{
        margin-top: 20px;
        &>a{
          display: block;
          height: 45px;
          line-height: 45px;
          color:#5d6574;
          cursor:pointer;
        }
      }
    }
    .router{
      position: absolute;
      bottom: 0;
      right: 0;
      left:0;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .box{
        flex-basis: 50%;
        text-align: center;
        height: 50px;
        min-height: 50px;
        max-height: 50px;
        box-sizing: border-box;
        line-height: 50px;
        border-top: 1px solid #e9ebef;
        border-right: 1px solid #e9ebef;
        &:nth-child(1){
          svg{
            color: #2c7dfa;
          }
        }
        &:nth-child(2){
          svg{
            color: #ff9041;
          }
        }
        &:nth-child(3){
          svg{
            color: #ff9041;
          }
        }
        &:nth-child(4){
          svg{
            color: #07d79c;
          }
        }
        span{
          font-size: 14px;
          color:#5d6574;
        }
      }
    }
  }
  .searchContainer{
    height: 115px;
    .iconContainer{
      position: relative;
      top: 12px;
      left:17px;
      .icon{
        width: 20px;
        height: 20px;;
      }
    }
    .search{
      position: absolute;
      top: 45px;
      left: 30px;
      right: 30px;
      height: 45px;
      border: 1px solid #d8dbe0;
      border-radius: 4px;
      font-size: 16px;
      line-height: 45px;
      svg{
        color:#2c7dfa;
        font-size: inherit;
        margin-left: 10px;
      }
      input{
        font-size: inherit;
        color: #5d6574;
        width: calc(~'100% - 50px');
        outline: none;
        border:none;
      }
    }
  }
}
.header{
  .meetingHeader{
    padding: 0;
    top: 0;
    height: 45px;
    width: 100%;
    background-color: transparent;
    z-index: 499;
    // position: absolute;
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
