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
              <label class="title">姓名<i>*</i><span class="info-msg" v-if="user.nameInfo">请填入正确的姓名</span></label>
              <input class="input input-hook" type="text" name="name" v-on:input="nameInput" id="firstFocus" autocomplete='name'>
            </div>
            <div class="inputItem">
              <label class="title">电话<i>*</i><span class="info-msg" v-if="user.phoneInfo">请填入正确的号码</span></label>
              <input class="input input-hook" type="text" name="phone" v-on:input="phoneInput" autocomplete='tel-national'>
            </div>
            <div class="inputItem">
              <label class="title">邮箱<i>*</i><span class="info-msg" v-if="user.emailInfo">请填入正确的邮箱</span></label>
              <input class="input input-hook" type="text" name="email" v-on:input="emailInput" autocomplete='email'>
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

<script>
import { mapGetters, mapMutations } from 'vuex';
import userInput3 from '@/components/userInput3.vue';
import userInputBox from '@/components/userInputBox.vue';

export default {
  data() {
    return {
      BuyerFirstFocus: true,
      BuyerFirstEdit: true,
      user: {
        nameInfo: false,
        phoneInfo: false,
        emailInfo: false,
      },
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
        // 姓名不能为空
        const userName = editData.name.replace(/\s+/g, '');
        if (userName !== '') {
          this.user.nameInfo = false;
          this.setFirstEditData(editData);
        } else {
          this.user.nameInfo = true;
        }
      }
    },
    phoneInput() {
      if (this.BuyerFirstEdit) {
        const inputItem = document.getElementsByClassName('input-hook');
        const editData = this.copy(this.firstEditData);
        editData.phone = inputItem[1].value;
        // 电话号码
        const phoneNum = editData.phone.replace(/\s+/g, '');
        const regNum = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
        if (phoneNum !== '' && editData.phone.match(regNum)) {
          this.user.phoneInfo = false;
          this.setFirstEditData(editData);
        } else {
          this.user.phoneInfo = true;
        }
        // console.log('修改编辑phone');
      }
    },
    emailInput() {
      if (this.BuyerFirstEdit) {
        const inputItem = document.getElementsByClassName('input-hook');
        const editData = this.copy(this.firstEditData);
        editData.email = inputItem[2].value;
        // 邮箱
        const userEmail = editData.email.replace(/\s+/g, '');
        const regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (userEmail !== '' && editData.email.match(regEmail)) {
          this.user.emailInfo = false;
          this.setFirstEditData(editData);
        } else {
          this.user.emailInfo = true;
        }
        // console.log('修改编辑email');
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
          .info-msg{
            display:inline-block;
            color:red;
            font-size:0.6rem;
            padding-left:10px;
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
