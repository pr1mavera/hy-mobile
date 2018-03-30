<template>
  <div class="userInput-3">
    <form method="post">
      <div class="inputItem">
        <label class="title" :class="setTitleSize">姓名<i>*</i></label>
        <input class="input" type="text" name="name" value="">
      </div>
      <div class="inputItem">
        <label class="title" :class="setTitleSize">电话<i>*</i></label>
        <input class="input" type="text" name="phone" value="">
      </div>
      <div class="inputItem">
        <label class="title" :class="setTitleSize">邮箱<i>*</i></label>
        <input class="input" type="text" name="email" value="">
      </div>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    titleSize: {
      type: Number,
    },
  },
  computed: {
    setTitleSize() {
      // eslint-disable-next-line
      const className = 'titleSize-' + this.titleSize;
      return className;
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
    }
  }

}
</style>
