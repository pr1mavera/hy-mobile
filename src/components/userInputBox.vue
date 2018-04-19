<template>
  <div class="userInputBox">
    <ul>
      <li v-for="(ticket, index) in selectTicket" class="inputBoxItem" :key="index">
        <div class="boxTitle border-1px-b">{{index + 1}}.{{ticket.ticketName}}</div>
        <div class="boxContent">
          <userInput-3 :titleSize="12" :index="index" @userChangeEdit="userChangeEdit"></userInput-3>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import userInput3 from '@/components/userInput3.vue';

export default {
  props: {
    selectTicket: {
      type: Array,
    },
  },
  computed: {

  },
  methods: {
    userChangeEdit() {
      this.$emit('userChangeEdit');
    },
  },
  components: {
    userInput3,
  },
};
</script>

<style lang="less">
@import '../common/style/mixin.less';

.userInputBox {
  width: 100%;
  margin-top: 20px;
  box-sizing: border-box;
  ul > li.inputBoxItem {
    margin-bottom: 20px;
    border-radius: 2px;
    border: 1px solid @border-1px-color;
    background-color: #f4f7fa;
    list-style: none;
    .boxTitle{
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      font-weight: 200;
      padding: 0 10px;
      box-sizing: border-box;
      background-color: #ffffff;
      .border-1px-b(@border-1px-color);
    }
    .boxContent {
      padding: 5px 15px 10px;
    }
  }
}
</style>
