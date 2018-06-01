<template>
  <div v-transfer-dom>
    <popup
      v-model="formView"
      height="90%"
      position="bottom"
      :is-transparent='true'
      >
      <div class="popup popupEdit">
        <div class="popupEditBox">
          <p class="title">修改门票</p>
          <div class="inputContent">
            <form>
              <group>
                <input class="popup-conferee" placeholder="姓名" @blur="validateNameFn" v-model="ticketForm.confereeName"></input>
              </group>
              <group>
                <input class="popup-conferee" placeholder="手机号" @blur="validatePhoneFn" v-model="ticketForm.confereePhone"></input>
              </group>
              <group>
                <input class="popup-conferee" placeholder="邮箱" @blur="validateEmailFn" v-model="ticketForm.confereeEmail"></input>
              </group>
            </form>
          </div>
          <!-- 主按钮 -->
          <button class="loginBtn" @click="updateTicketFn">确认</button>
          <div class="close" @click="closeFormTicket">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-guanbi2"></use>
            </svg>
          </div>
        </div>
        <div class="block"></div>
      </div>
    </popup>
  </div>
</template>
<script>
/* eslint-disable */
import { TransferDom, Popup, Group, XInput } from 'vux';
// import Conf from '@/config/index';
import { updateTicket } from '@/server';

export default {
  props: {
    formView: {
      type: Boolean,
    },
    ticketForm: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {
      validate: true,
      // showTicket: false,
      // currentTicket: {},
    };
  },
  methods: {
    regValidate (type){
      switch (type){
        case '':
          this.$vux.toast.text('姓名不能为空', 'top');
          break;
        case 'len':
          this.$vux.toast.text('姓名在10个字符', 'top');
          break;
        case 'phone':
          this.$vux.toast.text('手机格式不正确', 'top');
          break;
        case 'email':
          this.$vux.toast.text('邮箱格式不正确', 'top');
          break;
      }
      this.regValue=type;
    },
    validateNameFn() {
      const val = this.ticketForm.confereeName;
      const len = val.length;
      if (len === 0) {
        this.regValidate('');
        this.validate = false;
      } else if (len > 10) {
        this.regValidate('len');
        this.validate = false;
      } else {
        this.validate = true;
      }
    },
    validatePhoneFn() {
      const val = this.ticketForm.confereePhone;
      const regNum = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
      if (!regNum.test(val)) {
        this.regValidate('phone');
        this.validate = false;
      } else {
        this.validate = true;
      }
    },
    validateEmailFn() {
      const val = this.ticketForm.confereeEmail;
      const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!regEmail.test(val)) {
        this.regValidate('email');
        this.validate = false;
      } else {
        this.validate = true;
      }
    },
    updateTicketFn() {
      const data = { ...this.ticketForm };
      if (this.validate) {
        updateTicket(data.id, data).then((res) => {
          if (res.code === 0) {
            this.$vux.toast.text('修改成功', 'top');
            // this.$emit('update');
            this.showEdit = false;
            this.$emit('closeTicket', false, data, true);
          } else {
            this.$vux.toast.text('修改失败', 'top');
          }
        });
      }else{
        this.$vux.toast.text('请填写正确格式内容', 'top');
      }
    },
    closeFormTicket() {
      this.$emit('closeTicket',false);
    }
  },
  directives: {
    TransferDom,
  },
  components: {
    Popup,
    Group,
    XInput
  },
  // watch: {
  //   'ticketForm.confereeName'(newVal) {
      
  //     //  else if (len > 10) {
  //     //   this.$vux.toast.text('姓名在10个字符', 'top');
  //     // }
  //   },
  //   'ticketForm.confereePhone'(newVal) {

  //   },
  //   'ticketForm.confereeEmail'(newVal) {
      
  //   },
  // }
};
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import '../common/style/mixin.less';

.v-transfer-dom {
  width: 100%;
  .popup {
    position: absolute;
    background: transparent;
    &.popupTicket {
      width: calc(~'100% - 50px');
      height: calc(~'100% - 20px');
      margin: 20px 25px 0;
      .popupTicketBox {
        position: relative;
        .popupTicketBoxContent {
          position: relative;
          bottom: 0;
          width: 100%;
          border-radius: 4px;
          box-sizing: border-box;
          overflow: hidden;

          // ================================================== hole ===================================================
          .hole {
            position: absolute;
            overflow: hidden;
          }
          .hole-top-r {
            top: 0;
            right: 0;
            width: 50%;
            height: 50%;
          }
          .hole-top-l {
            top: 0;
            left: 0;
            width: 50%;
            height: 50%;
          }
          .hole-bottom-r {
            bottom: 0;
            right: 0;
            width: 50%;
            height: 50%;
          }
          .hole-bottom-l {
            bottom: 0;
            left: 0;
            width: 50%;
            height: 50%;
          }
          .hole-top-l::after {
            top: 0;
            left: 0;
            transform: translate(-50%, -50%);
          }
          .hole-top-r::after {
            top: 0;
            right: 0;
            transform: translate(50%, -50%);
          }
          .hole-bottom-l::after {
            bottom: 0;
            left: 0;
            transform: translate(-50%, 50%);
          }
          .hole-bottom-r::after {
            bottom: 0;
            right: 0;
            transform: translate(50%, 50%);
          }
          .hole-top-l::after, .hole-top-r::after, .hole-bottom-l::after, .hole-bottom-r::after {
            position: absolute;
            content: '';
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 5000px solid #ffffff;
            z-index: 0;
          }
          .hole-block-top, .hole-block-bottom {
            position: absolute;
            left: 0;
            width: 100%;
            height: 50%;
            background-color: #ffffff;
          }
          .hole-block-top {
            top: 0;
          }
          .hole-block-bottom {
            bottom: 0;
          }
          // ================================================== hole end ===================================================

          .activity {
            position: relative;
            padding: 39px 31px 24px;
            .content {
              position: relative;
              z-index: 10;
              p {
                color: #2B313C;
                &.title {
                  font-size: 18px;
                  margin-bottom: 16px;
                  line-height: 20px;
                }
                &.desc {
                  font-size: 13px;
                  font-weight: 200;
                }
                &.ticketN {
                  text-align: center;
                  margin-bottom: 20px;
                }
              }
            }
          }
          .ticket {
            position: relative;
            padding: 24px 31px 30px;
            &.border-1px-t:after {
              margin: 0 25px;
              width: calc(~'100% - 50px');
            }
            .content {
              position: relative;
              z-index: 10;
              p {
                color: #2B313C;
                &.title {
                  font-size: 18px;
                  margin-bottom: 16px;
                  line-height: 20px;
                }
                &.desc {
                  font-size: 13px;
                  font-weight: 200;
                }
                &.ticketN {
                  text-align: center;
                  margin-bottom: 20px;
                }
              }
              .QRCodeBox {
                position: relative;
                margin: 0 auto;
                width: 160px;
              }
              .examine-ticket{
                text-align: center;
                margin-bottom: 6px;
              }
              .examine-title{
                color:#FF9044;
                text-align: center;
                margin: 0 auto;
                width: 80%;
              }
              .examine-desc{
                font-size: 14px;
                text-align: center;
                margin: 6px auto 16px;
                width: 80%;
              }
              .code {
                padding: 12px 19px;
                width: 160px;
                font-size: 14px;
                text-align: center;
                margin: 19px auto;
              }
              .massage {
                display: flex;
                justify-content: center;
                p {
                  margin: 0 11px;
                  color: #5D6574;
                  font-size: 16px;
                  line-height: 16px;
                  span {
                    color: #9098A8;
                    font-size: 14px;
                  }
                }
              }
            }
          }
        }
        .close {
          position: absolute;
          display: block;
          bottom: -45px;
          left: 50%;
          transform: translateX(-50%);
          padding: 8px;
          font-size: 14px;
          line-height: 14px;
          border-radius: 50%;
          border: 2px solid #ffffff;
          .icon {
            color: #ffffff;
          }
        }
      }
    }
    &.popupEdit {
      width: calc(~'100% - 50px');
      height: calc(~'100% - 20px');
      margin: 20px 25px 0;
      overflow: hidden;
      .popupEditBox {
        position: relative;
        bottom: 0;
        width: 100%;
        padding: 39px 31px 30px;
        box-sizing: border-box;
        border-radius: 4px;
        background-color: #ffffff;
        p {
          color: #666666;
          &.title {
            text-align: center;
            font-size: 18px;
            margin-bottom: 16px;
            line-height: 20px;
          }
        }
        .inputContent {
          width: 100%;
          margin-top: 24px;
          font-size: 15px;
          color: #5d6574-light;
          form {
            .popup-conferee{
              width:100%;
              box-sizing:border-box;
              border: solid 1px #d8dbe0;
              border-radius: 2px;
              padding:2px 6px;
              line-height:40px;
              height:40px;
              font-size:14px;
              color:#b8bcc4;
              // &:focus{
              //   border: solid 1px #6ea4f7;
              // }
            }
            .inputItem {
              width: 100%;
              height: 40px;
              margin-bottom: 15px;
            }
            .userInput {
              display: flex;
              align-items: center;
              border: 1px solid rgba(184, 188, 196, .5);
              box-sizing: border-box;
              border-radius: 4px;
              overflow: hidden;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              input {
                border: 0;
                padding: 0;
                padding-left: 11px;
                width: 100%;
                height: 100%;
                line-height: 100%;
                font-size: 14px;
                color: #5d6574;
                outline: none;
              }
            }
          }
        }
        .loginBtn {
          width: 100%;
          height: 42px;
          border: 0;
          margin-top: 11px;
          border-radius: 4px;
          font-size: 15px;
          color: #fff;
          outline: none;
          background-color: #2c7dfa;
        }
        .close {
          position: absolute;
          display: block;
          bottom: -50px;
          left: 50%;
          transform: translateX(-50%);
          padding: 8px;
          font-size: 14px;
          line-height: 14px;
          border-radius: 50%;
          border: 2px solid #ffffff;
          .icon {
            color: #ffffff;
          }
        }
      }
      .block {
        width: 100%;
        height: 65px;
      }
    }
  }
}

</style>