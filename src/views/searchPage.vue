<template>
  <div class="searchPage">
      <div class="search-header">
        <button class="back" @click="goback()">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jiantou1"></use>
          </svg>
        </button>
        <div class="input">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-sousuo"></use>
          </svg>
          <input ref='input' type="text" v-model="searchVal" placeholder="搜索活动关键字">
        </div>
        <button class="searchButton" :class="{'active':searchVal!='' }" @click="getList()">搜索</button>
      </div>
      <ul class="ul-container">
        <li v-for="(activity, index) in activityList" class="activityListLi vux-1px-b" :key="index">
          <activityList :activity="activity"></activityList>
        </li>
      </ul>
  </div>
</template>

<script>
import { getSearchList } from '@/server/index.js';
import activityList from '@/components/searchList';

export default {
  data() {
    return {
      activityList: [],
      searchVal: '',
    };
  },
  mounted() {
    this.$refs.input.focus();
  },
  methods: {
    async getList() {
      const query = {
        keyword: this.searchVal,
        // isMobile: true,
      };
      const res = await getSearchList(query);
      if (res.code === 0) {
        // debugger;
        this.activityList = res.data.list;
      } else {
        console.log('error in getSearchlist');
      }
    },
    goback() {
      this.$router.go(-1);
    },
  },
  components: {
    activityList,
  },
};
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';

.searchPage {
  background-color: #ffffff;
  min-height: 100vh;
  .search-header{
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #D8DBE0;
    .back{
      height: 100%;
      width: 50px;
      flex-grow: 0;
      font-size: 15px;
      color: #2C7DFA;
      background-color:#fff;
      border:none;

    }
    div.input{
      flex-grow: 1;
      height: 35px;
      border-radius: 18px;
      background-color: #F4F7FA;
      svg{
        font-size: 18px;
        color: #B8BCC4;
        margin: 0 12px;
        vertical-align: middle;
      }
      input{
        height: 100%;
        outline: none;
        background-color: inherit;
        border: none;
        font-size: 14px;
        &::-moz-placeholder{
          color: #B8BCC4;
        }
        &::-webkit-input-placeholder{
          color: #B8BCC4;
        }

      }

    }
    .searchButton{
      background-color:#fff;
      border:none;
      width: 60px;
      font-size: 15px;
      color: #B8BCC4;
      height: 100%;
      flex-grow: 0;
      &.active{
        color: #2C7DFA;
      }
    }
  }
  .ul-container{
    padding: 0 30px;
    list-style: none;
    .activityListLi{
      padding: 15px 0;
    }
  }
}
</style>
