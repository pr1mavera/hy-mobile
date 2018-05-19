<template>
  <div class="userInput-3">
    <form method="post">
      <div class="inputItem">
        <label class="title" :class="setTitleSize">
          姓名<i>*</i>
          <span class="info-msg" v-if="user.nameInfo">请填入正确的姓名</span>
        </label>
        <input class="input input-hook" type="text" name="name" v-on:input="ownerNameFn" id="firstFocus" ref='name'>
      </div>
      <div class="inputItem">
        <label class="title" :class="setTitleSize">
          电话<i>*</i>
          <span class="info-msg" v-if="user.phoneInfo">请填入正确的号码</span>
        </label>
        <input class="input input-hook" type="text" name="phone" v-on:input="ownerPhoneFn"  ref='phone'>
      </div>
      <div class="inputItem">
        <label class="title" :class="setTitleSize">
          邮箱<i>*</i>
          <span class="info-msg" v-if="user.emailInfo">请填入正确的邮箱</span>
        </label>
        <input class="input input-hook" type="text" name="email" v-on:input="ownerEmailFn"  ref='email'>
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
    setNameDefaultInput() {
      if (this.index === 0) {
        return this.firstEditData.name;
      }
      // eslint-disable-next-line
      return;
    },
    setPhoneDefaultInput() {
      if (this.index === 0) {
        return this.firstEditData.phone;
      }
      // eslint-disable-next-line
      return;
    },
    setEmailDefaultInput() {
      if (this.index === 0) {
        return this.firstEditData.email;
      }
      // eslint-disable-next-line
      return;
    },
  },
  methods: {
    ...mapMutations({
      setTicketsRecordList: 'SET_TICKET_RECORD_LIST'
    }),
    ownerNameFn() {
      // 正则验证
      const userName = this.$refs.name.value.replace(/\s+/g, '');
      if (userName !== '') {
        this.user.nameInfo = false;
        const list = this.ticketsRecordList.slice(0);
        list[this.index].confereeName = userName;
        this.setTicketsRecordList(list);
      } else {
        this.user.nameInfo = true;
      }
    },
    ownerPhoneFn() {
      // debugger;
      const phone = this.$refs.phone.value.replace(/\s+/g, '');
      const regNum = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
        if (phone !== '' && phone.match(regNum)) {
          this.user.phoneInfo = false;
          const list = this.ticketsRecordList.slice(0);
          list[this.index].confereePhone = phone;
          // debugger;
          this.setTicketsRecordList(list);
        } else {
          this.user.phoneInfo = true;
        }
    },
    ownerEmailFn() {
      const email = this.$refs.email.value.replace(/\s+/g, '');
      const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (email !== '' && email.match(regEmail)) {
        this.user.emailInfo = false;
        const list = this.ticketsRecordList.slice(0);
          list[this.index].confereeEmail = email;
          this.setTicketsRecordList(list);
      } else {
        this.user.emailInfo = true;
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
