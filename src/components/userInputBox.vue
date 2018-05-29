<template>
  <div class="userInputBox">
    <ul>
      <li v-for="(ticket, index) in selectTicket" class="inputBoxItem" :key="index">
        <div class="boxTitle border-1px-b">{{index + 1}}.{{ticket.ticketName}}</div>
        <div class="boxContent">
          <userInput-3 :titleSize="12" :index="index" v-model="ticketsOwnerList[index]"></userInput-3>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import userInput3 from '@/components/userInput3.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
  props: {
    selectTicket: { // 所选门票的信息
      type: Array,
    },
  },
  computed: {
    ...mapGetters([
      'ticketsRecordList', // 门票所有者信息
    ]),
  },
  data() {
    return {
      ticketsOwnerList: [],
    };
  },
  mounted() {
    this.handelData();
  },
  watch: {
    selectTicket: function(val, oldVal) {
      if (val !== oldVal) {
        this.handelData();
      }
    }
  },
  methods: {
    // userChangeEdit() {
    //   this.$emit('userChangeEdit');
    // },
    ...mapMutations({
      setTicketsRecordList: 'SET_TICKET_RECORD_LIST',
    }),
    handelData() {
      this.selectTicket = this.selectTicket ? this.selectTicket : [];
      for (let i = 0; i < this.selectTicket.length; i += 1) {
        const obj = {
          ticketsId: this.selectTicket[i].id,
          confereeName: '',
          confereePhone: '',
          confereeEmail: '',
        };
        this.ticketsOwnerList.push(obj);
      }
      this.setTicketsRecordList(this.ticketsOwnerList);
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
