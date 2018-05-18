<template>
  <div class="userLogin">
    <div class="banner">会议站</div>
    <div class="userLoginContent">
      <tab
      class="tab"
      :line-width="8"
      default-color="#ffffff"
      active-color="#ffffff"
      bar-active-color="#ffffff"
      custom-bar-width="8px"
      >
        <tab-item @on-item-click="onTabItemClick" v-if="this.loginType === 0 || this.loginType === 1" selected>登录</tab-item>
        <tab-item @on-item-click="onTabItemClick" v-if="this.loginType === 0 || this.loginType === 1">注册</tab-item>
        <tab-item @on-item-click="onTabItemClick" v-if="this.loginType === 2">重置密码</tab-item>
        <tab-item @on-item-click="onTabItemClick" v-if="this.loginType === 3">绑定微信</tab-item>
      </tab>
      <div class="routerBody clearfix">
        <router-view
        class="routerView"
        @forgetPW="jumpByType"
        @loginByWeixin="jumpByType"
        @backToLogin="jumpByType"
        >
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem } from 'vux';

export default {
  data() {
    return {
      pathMap: ['login', 'register', 'reset', 'weixin'],
      loginType: 0,
    };
  },
  methods: {
    onTabItemClick(index) {
      this.loginType = index;
      if (this.loginType !== this.$route.params.type) {
        this.$router.push({
          path: this.pathMap[this.loginType],
        });
      }
    },
    jumpByType(type) {
      this.loginType = type;
    },
  },
  components: {
    Tab,
    TabItem,
  },
};
</script>

<style lang="less">

input, select, button {
	outline: none;
}
button {
	cursor: pointer;
}
.displayNone {
  display: none;
}
a {
  padding: 6px 0;
  box-sizing: border-box;
  text-decoration:none;
  cursor: pointer;
}

@nav-text-color: #9098a8;
@text-color: #5d6574;
@text-color-light: rgba(184, 188, 196, 1);
@text-color-placeholder: rgba(184, 188, 196, .7);
@theme-blue: #2c7dfa;

::-webkit-input-placeholder { color: @text-color-placeholder; }
::-moz-placeholder { color: @text-color-placeholder; } /* firefox 19+ */
:-ms-input-placeholder { color: @text-color-placeholder; } /* ie */
input:-moz-placeholder { color: @text-color-placeholder; }
.icon {
	width: 1em; height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}

.userLogin {
  width: 100%;
  min-height: 100%;
  background-color: #ffffff;
  .banner {
    width: 100%;
    height: 210px;
    line-height: 210px;
    background-image: url('userLogin/loginBg.png');
    background-size: cover;
    background-position: center;
    font-size: 30px;
    text-align: center;
    color: #ffffff;
  }
  .userLoginContent {
    position: relative;
    width: 100%;
    height: calc(~'100% - 210px');
    .tab {
      position: relative;
      margin-top: -44px;
      .vux-tab-container {
        .vux-tab {
          width: 64%;
          border: 0;
          margin: 0 auto;
          background-color: transparent;
          .vux-tab-item {
            font-size: 18px;
            background-size: 100% 0px;
            flex: 1;
          }
          .vux-tab-ink-bar {
            .vux-tab-bar-inner {
              position: relative;
              -webkit-transform: rotate(45deg);
              transform: rotate(45deg);
              top: 4px;
              // -webkit-transform-origin: left bottom;
              // transform-origin: left bottom;
            }
          }
        }
      }
    }
    .routerBody {
      width: 100%;
      .routerView {
        width: 100%;
        padding: 30px;
        box-sizing: border-box;
        .inputContent {
          width: 100%;
          font-size: 15px;
          color: @text-color-light;
          form {
            .inputItem {
              width: 100%;
              height: 42px;
              margin-bottom: 18px;
              &:last-child {
                margin-bottom: 0;
              }
            }
            .userInput {
              display: flex;
              align-items: center;
              border: 1px solid rgba(184, 188, 196, .5);
              box-sizing: border-box;
              border-radius: 4px;
              overflow: hidden;
              svg {
                width: 35px;
              }
              input {
                border: 0;
                padding: 0;
                width: calc(~"100% - 40px");
                height: 100%;
                line-height: 100%;
                font-size: 15px;
                color: @text-color;
              }
            }
            .slide {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              background-color: #e6e9ec;
              color: @text-color;
              font-size: 13px;
              .sliderBtn {
                text-align: center;
                box-sizing: border-box;
                line-height: 42px;
                width: 50px;
                height: 100%;
                border: 1px solid rgba(184, 188, 196, .5);
                background-color: #fff;
                cursor: pointer;
              }
              .sliderText {
                box-sizing: border-box;
                height: 100%;
                line-height: 42px;
                padding-left: 10px;
              }
            }
            .verCode {
              display: flex;
              justify-content: space-between;
              .userInput {
                width: 55%;
                height: 100%;
                margin-right: 18px;
              }
              .messageCodeBtn {
                width: calc(~"45% - 18px");
                height: 100%;
                border: 1px solid rgba(184, 188, 196, .5);
                box-sizing: border-box;
                border-radius: 4px;
                background-color: #f4f7fa;
                font-size: 12px;
                color: @text-color;
              }
            }
          }
          .pagination {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            .paginationItem {
              position: relative;
              input {
                position: absolute;
                top: 0;
                clip: rect(0, 0, 0, 0);
              }
              input[type="checkbox"] + label::before {
                content: "";
                display: inline-block;
                vertical-align: text-bottom;
                width: 15px;
                height: 15px;
                line-height: 15px;
                border: 1px solid rgba(184, 188, 196, .5);
                box-sizing: border-box;
                transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
              }
              input[type="checkbox"]:checked + label::after {
                box-sizing: content-box;
                content: "";
                border: 2px solid #fff;
                border-left: 0;
                border-top: 0;
                height: 8px;
                position: absolute;
                transform: rotate(45deg) scaleY(1) translate(-3px, 12px);
                width: 4px;
                transition: transform .25s cubic-bezier(.71,-.46,.88,.6) .05s;
                transform-origin: center;
              }
              input[type="checkbox"]:checked + label::before {
                border: 0;
                background-color: @theme-blue;
                transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
              }
              span.label {
                vertical-align: top;
              }
            }
            .forgetPW {
              .label a {
                color: @text-color-light;
              }
            }
          }
        }
        .loginBtn {
          width: 100%;
          height: 42px;
          border: 0;
          margin-top: 20px;
          border-radius: 4px;
          font-size: 15px;
          color: #fff;
          background-color: @theme-blue;
          box-shadow: 0px 2px 3px 1px rgba(44, 125, 250, 0.2);
        }
        .lineItem {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-top: 20px;
          font-size: 13px;
          .text {
            color: @text-color-light;
            // transform: translateY(-2px);
          }
        }
        .lineOr {
          .line {
            width: calc(~"50% - 15px");
            border-bottom: 1px dashed @text-color-light;
          }
        }
        .lineYX {
          .line {
            width: calc(~"50% - 65px");
            border-bottom: 1px solid @text-color-light;
          }
          .text {
            cursor: pointer;
          }
        }
        .weixinloginBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 150px;
          height: 42px;
          border: 1px solid @text-color-placeholder;
          padding: 0;
          margin: 20px calc(~"50% - 75px") 0;
          border-radius: 21px;
          font-size: 15px;
          background-color: #fff;
          box-sizing: border-box;
          .icon {
            color: #07d79c;
            font-size: 28px;
            margin-right: 8px;
          }
          .text {
            color: @text-color-light;
          }
        }
        .backToLogin {
          margin-top: 16px;
          color: @text-color-light;
          font-size: 15px;
          span {
            text-decoration: underline;
            color: @text-color;
          }
        }
      }
    }
    .clearfix:after {
      content: "";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }
  }
}
</style>
