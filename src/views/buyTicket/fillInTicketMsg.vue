<template>
  <div class="fillInTicketMsg">
    <div class="fillInContent">
      <div class="userInput">
        <h1 class="inputTitle border-1px-b">买家信息</h1>
        <p class="massage">门票信息将发送到您和每位订票人的邮箱中</p>
        <!-- <userInput-3
        :titleSize="14"
        :firstFocus="BuyerFirstFocus"
        :firstEdit="BuyerFirstEdit"
        @hasFirstFocused="hasFirstFocused"
        ></userInput-3> -->
        <div class="userInputBuyer">
          <form method="post">
            <div class="inputItem">
              <label class="title">姓名<i>*</i></label>
              <input class="input input-hook" type="text" name="name" v-on:input="nameInput" id="firstFocus">
            </div>
            <div class="inputItem">
              <label class="title">电话<i>*</i></label>
              <input class="input input-hook" type="text" name="phone" v-on:input="phoneInput">
            </div>
            <div class="inputItem">
              <label class="title">邮箱<i>*</i></label>
              <input class="input input-hook" type="text" name="email" v-on:input="emailInput">
            </div>
          </form>
        </div>
      </div>
      <div class="userInput">
        <h1 class="inputTitle border-1px-b">门票信息</h1>
        <userInputBox :selectTicket="setSelectTicketToArray" @userChangeEdit="userChangeEdit"></userInputBox>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from 'vuex';
import userInput3 from '@/components/userInput3.vue';
import userInputBox from '@/components/userInputBox.vue';

export default {
  data() {
    return {
      BuyerFirstFocus: true,
      BuyerFirstEdit: true,
    };
  },
  created() {
    this.$nextTick(() => {
      this.setFirstFocus();
    });
  },
  computed: {
    ...mapGetters([
      'tickets',
      'selTickets',
      'firstEditData',
    ]),
    setSelectTicketToArray() {
      const tickets = [];
      this.selTickets.forEach((ticket) => {
        for (let i = 0; i < ticket.count; i += 1) {
          tickets.push(ticket);
        }
      });
      return tickets;
    },
  },
  methods: {
    setFirstFocus() {
      if (this.BuyerFirstFocus) {
        document.getElementById('firstFocus').focus();
        this.BuyerFirstFocus = false;
      }
    },
    userChangeEdit() {
      this.BuyerFirstEdit = false;
    },
    copy(obj) {
      const newObj = {};
      // eslint-disable-next-line
      for (const key in obj) {
        newObj[key] = obj[key];
      }
      return newObj;
    },
    nameInput() {
      if (this.BuyerFirstEdit) {
        const inputItem = document.getElementsByClassName('input-hook');
        const editData = this.copy(this.firstEditData);
        editData.name = inputItem[0].value;
        this.setFirstEditData(editData);
        console.log('修改编辑name');
      }
    },
    phoneInput() {
      if (this.BuyerFirstEdit) {
        const inputItem = document.getElementsByClassName('input-hook');
        const editData = this.copy(this.firstEditData);
        editData.phone = inputItem[1].value;
        this.setFirstEditData(editData);
        console.log('修改编辑phone');
      }
    },
    emailInput() {
      if (this.BuyerFirstEdit) {
        const inputItem = document.getElementsByClassName('input-hook');
        const editData = this.copy(this.firstEditData);
        editData.email = inputItem[2].value;
        this.setFirstEditData(editData);
        console.log('修改编辑email');
      }
    },
    ...mapMutations({
      setFirstEditData: 'SET_FIRST_EDIT_DATA',
    }),
  },
  components: {
    userInput3,
    userInputBox,
  },
};
</script>

<style lang="less">
@import '../../common/style/mixin.less';

.fillInContent {
  width: 100%;
  box-sizing: border-box;
  padding: 0 22px 70px;
  background-color: #ffffff;
  .userInput {
    width: 100%;
    .inputTitle {
      height: 45px;
      line-height: 45px;
      font-size: 16px;
      font-weight: 200;
      .border-1px-b(@border-1px-color);
    }
    .massage {
      height: 40px;
      line-height: 40px;
      font-size: 12px;
      color: @text-color;
    }
    .userInputBuyer {
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
  }
}
</style>
