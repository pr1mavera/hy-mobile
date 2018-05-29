<template>
  <div class="userInput-3">
    <!-- 第一张门票信息默认是买家信息 -->
    <form method="post" v-if="index === 0">
      <div class="inputItem">
        <label class="title" :class="setTitleSize" for="ticketName">
          姓名<i>*</i>
          <span class="info-msg" v-if="user.nameInfo">请填入正确的姓名</span>
        </label>
        <input class="input input-hook" type="text" name="name" v-on:input="ownerNameFn" id="ticketName" ref='name' :value="setNameDefaultInput" v-if="ticketDefault.name">
        <input class="input input-hook" type="text" name="name" v-on:input="ownerNameFn" id="ticketName" ref='name' v-else>
      </div>
      <div class="inputItem">
        <label class="title" :class="setTitleSize" for="ticketPhone">
          电话<i>*</i>
          <span class="info-msg" v-if="user.phoneInfo">请填入正确的号码</span>
        </label>
        <input class="input input-hook" type="text" name="phone" v-on:input="ownerPhoneFn"  ref='phone' :value="setPhoneDefaultInput" v-if="ticketDefault.phone" id="ticketPhone">
        <input class="input input-hook" type="text" name="phone" v-on:input="ownerPhoneFn"  ref='phone'  v-else  id="ticketPhone">
      </div>
      <div class="inputItem">
        <label class="title" :class="setTitleSize" for="ticketEmail">
          邮箱<i>*</i>
          <span class="info-msg" v-if="user.emailInfo">请填入正确的邮箱</span>
        </label>
        <input class="input input-hook" type="text" name="email" v-on:input="ownerEmailFn"  ref='email' :value="setEmailDefaultInput" v-if="ticketDefault.email" id="ticketEmail">
        <input class="input input-hook" type="text" name="email" v-on:input="ownerEmailFn"  ref='email'  v-else  id="ticketEmail">
      </div>
    </form>
    <form method="post" v-else>
      <div class="inputItem">
        <label class="title" :class="setTitleSize" for="ticketSecName">
          姓名<i>*</i>
          <span class="info-msg" v-if="user.nameInfo">请填入正确的姓名</span>
        </label>
        <input class="input input-hook" id="ticketSecName" type="text" name="name" v-on:input="ownerNameFn" ref='name'>
      </div>
      <div class="inputItem">
        <label class="title" :class="setTitleSize" for="ticketSecPhone">
          电话<i>*</i>
          <span class="info-msg" v-if="user.phoneInfo">请填入正确的号码</span>
        </label>
        <input class="input input-hook" id="ticketSecPhone" type="text" name="phone" v-on:input="ownerPhoneFn"  ref='phone'>
      </div>
      <div class="inputItem">
        <label class="title" :class="setTitleSize" for="ticketSecEmail">
          邮箱<i>*</i>
          <span class="info-msg" v-if="user.emailInfo">请填入正确的邮箱</span>
        </label>
        <input class="input input-hook" id="ticketSecEmail" type="text" name="email" v-on:input="ownerEmailFn"  ref='email'>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapMutations } from 'vuex';

export default {
  props: {
    // titleSize: {
    //   type: Number,
    // },
    index: {
      type: Number,
    },
    value: {
      type: Object,
      default: function() {
        return {};
      }
    },
  },
  data() {
    return {
      user: { // 判断信息的正确性
        nameInfo: false,
        phoneInfo: false,
        emailInfo: false,
      },
      ticketDefault: { // 默认第一张填写买家信息
        name: true,
        phone: true,
        email: true,
      }
    };
  },
  computed: {
    ...mapGetters([
      'firstEditData',
      'ticketsRecordList',
    ]),
    // 双向绑定待更新的数据
    ticketOwner: {
      get: function() {
        return this.value;
      },
      set: function(val) {
        this.$emit('input', val);
      }
    },
    setTitleSize() {
      const className = `titleSize-${this.titleSize}`;
      return className;
    },
    // 第一张门票信息默认是买家信息
    setNameDefaultInput() {
      if (this.index === 0 && this.ticketDefault.name) {
        return this.firstEditData.name;
      }
      //  else if (this.index && this.ticketsRecordList.length > 1 || this.ticketDefault.name === false){
      //   return this.ticketsRecordList[this.index].confereeName;
      // } else {
      //   return '';
      // }
      // // eslint-disable-next-line
      // return;
    },
    setPhoneDefaultInput() {
      if (this.index === 0 && this.ticketDefault.phone) {
        return this.firstEditData.phone;
      }
      //  else if (this.index && this.ticketsRecordList.length > 1 || this.ticketDefault.phone === false){
      //   return this.ticketsRecordList[this.index].confereePhone;
      // } else {
      //   return '';
      // }
      // eslint-disable-next-line
      // return;
    },
    setEmailDefaultInput() {
      if (this.index === 0 && this.ticketDefault.email) {
        return this.firstEditData.email;
      }
      //  else if (this.index && this.ticketsRecordList.length > 1 || this.ticketDefault.email === false){
      //   return this.ticketsRecordList[this.index].confereeEmail;
      // } else {
      //   return '';
      // }
      // eslint-disable-next-line
      // return;
    },
  },
  methods: {
    ...mapMutations({
      setTicketsRecordList: 'SET_TICKET_RECORD_LIST'
    }),
    ownerNameFn() {
      if (this.index === 0) {
        this.ticketDefault.name = false;
      }
      // 正则验证
      const userName = this.$refs.name.value.replace(/\s+/g, '');
      const list = this.ticketsRecordList.slice(0);
      if (userName !== '') {
        this.user.nameInfo = false;
        list[this.index].confereeName = userName;
        this.setTicketsRecordList(list);
      } else {
        this.user.nameInfo = true;
        list[this.index].confereeName = '';
        this.setTicketsRecordList(list);
      }
    },
    ownerPhoneFn() {
      if (this.index === 0) {
        this.ticketDefault.phone = false;
      }
      const phone = this.$refs.phone.value.replace(/\s+/g, '');
      const regNum = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
      const list = this.ticketsRecordList.slice(0);
        if (phone !== '' && phone.match(regNum)) {
          this.user.phoneInfo = false;
          list[this.index].confereePhone = phone;
          this.setTicketsRecordList(list);
        } else {
          this.user.phoneInfo = true;
          list[this.index].confereePhone = '';
          this.setTicketsRecordList(list);
        }
    },
    ownerEmailFn() {
      if (this.index === 0) {
        this.ticketDefault.email = false;
      }
      const email = this.$refs.email.value.replace(/\s+/g, '');
      const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      const list = this.ticketsRecordList.slice(0);
      if (email !== '' && email.match(regEmail)) {
        this.user.emailInfo = false;
        list[this.index].confereeEmail = email;
        this.setTicketsRecordList(list);
      } else {
        this.user.emailInfo = true;
        list[this.index].confereeEmail = '';
        this.setTicketsRecordList(list);
      }
    },
    
  },
};
</script>

<style lang="less">
@import '../common/style/mixin.less';

.userInput-3 {
  width: 100%;
  .inputItem {
    padding-bottom: 8px;
    .title {
      display: block;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      color: @text-color;
      i {
        color: #ff584e;
      }
      .info-msg{
        display:inline-block;
        color:red;
        font-size:0.6rem;
        padding-left:10px;
      }
      &.titleSize-12 {
        font-size: 12px;
      }
      &.titleSize-14 {
        font-size: 14px;
      }
      &.titleSize-16 {
        font-size: 16px;
      }
    }
    .input {
      width: 100%;
      height: 40px;
      line-height: 40px;
      box-sizing: border-box;
      border-radius: 3px;
      border: 1px solid @border-1px-color;
      padding-left: 10px;
      outline: none;
      transition: all .25s cubic-bezier(0.84, 0, 0.24, 1);
      &:focus {
        border-color: @theme-blue;
      }
      &.inputWarning {
        color: @warning-red;
        background-color: #fff2f1;
        border-color: @warning-red;
      }
    }
  }

}
</style>
