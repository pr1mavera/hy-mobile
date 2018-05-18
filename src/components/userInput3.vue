<template>
  <div class="userInput-3">
    <form method="post">
      <div class="inputItem">
        <label class="title" :class="setTitleSize">姓名<i>*</i></label>
        <input class="input input-hook" type="text" name="name" :value="setNameDefaultInput" v-on:input="userChangeEdit" id="firstFocus">
      </div>
      <div class="inputItem">
        <label class="title" :class="setTitleSize">电话<i>*</i></label>
        <input class="input input-hook" type="text" name="phone" :value="setPhoneDefaultInput" v-on:input="userChangeEdit">
      </div>
      <div class="inputItem">
        <label class="title" :class="setTitleSize">邮箱<i>*</i></label>
        <input class="input input-hook" type="text" name="email" :value="setEmailDefaultInput" v-on:input="userChangeEdit">
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
  methods: {
    userChangeEdit() {
      if (this.index === 0) {
        this.$emit('userChangeEdit');
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
