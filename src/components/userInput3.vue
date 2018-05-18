<template>
  <div class="userInput-3">
    <form method="post">
      <div class="inputItem">
        <label class="title" :class="setTitleSize">
          姓名<i>*</i>
          <span class="info-msg" v-if="user.nameInfo">请填入正确的姓名</span>
        </label>
        <input class="input input-hook" type="text" name="name" v-on:input="ownerNameFn" id="firstFocus" v-model="ticketOwner.confereeName">
      </div>
      <div class="inputItem">
        <label class="title" :class="setTitleSize">
          电话<i>*</i>
          <span class="info-msg" v-if="user.phoneInfo">请填入正确的号码</span>
        </label>
        <input class="input input-hook" type="text" name="phone" v-on:input="ownerPhoneFn" v-model="ticketOwner.confereePhone">
      </div>
      <div class="inputItem">
        <label class="title" :class="setTitleSize">
          邮箱<i>*</i>
          <span class="info-msg" v-if="user.emailInfo">请填入正确的邮箱</span>
        </label>
        <input class="input input-hook" type="text" name="email" v-on:input="ownerEmailFn" v-model="ticketOwner.confereeEmail">
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    titleSize: {
      type: Number,
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {
      ticketOwner: {
        confereeName: '', // 参与人（票面信息）
        confereePhone: '', // 参与人手机
        confereeEmail: '', // 参与人邮箱
      },
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
    ]),
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
  watch: {
    // ticketOwner: {
    //   handler(val) {
    //     console.log(val, 123);
    //   },
    //   deep: true,
    // },
  },
  methods: {
    ownerNameFn() {
      if (this.index === 0) {
        this.$emit('ticketOwnerFn', this.ticketOwner);
      }
    },
    ownerPhoneFn() {
      if (this.index === 0) {
        this.$emit('ticketOwnerFn', this.ticketOwner);
      }
    },
    ownerEmailFn() {
      if (this.index === 0) {
        this.$emit('ticketOwnerFn', this.ticketOwner);
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
