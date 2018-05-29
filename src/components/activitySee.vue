<template>
  <div class="vux-center">
    <div class="flex-box" v-for="(item, index) in userList":key="index">
      <div class="left">
        <img :src="item.avatarUrl" alt="">
      </div>
      <div class="center">
          <h5>{{item.nickname?item.nickname:item.username}}</h5>
          <p p-intro>{{item.info?item.info:'这个人很懒，但还是什么都没写...'}}</p>
          <div v-if="item.userStatistics">
            <p>活动<span class="num" >{{item.userStatistics.activityCount }}</span></p>
            <p>粉丝<span class="num">{{item.userStatistics.fansCount }}</span></p>
          </div>
      </div>
      <div class="right">
        <button v-if="item.mutualFansStatus && !item.watchFlag" class="style1" @click ="removeWatch(item.id, index, curStatus)">互相关注</button>
        <button v-if="!item.mutualFansStatus && !item.watchFlag" class="style1"  @click ="removeWatch(item.id, index, curStatus)">已关注</button>
        <button v-if="item.watchFlag" class="style2" @click="watchPeople(item.id, index, curStatus)">关注</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    userList: {
      type: Array,
    },
    loadStatus: {
      type: Number,
    },
    curStatus: {
      type: String,
    },
  },
  methods: {
    removeWatch(id, index, curStatus) {
      this.$emit('remove', id, index, curStatus);
    },
    watchPeople(id, index, curStatus) {
      this.$emit('watch', id, index, curStatus);
    },
  },
};
</script>

<style lang="less">
@import '../common/style/mixin.less';
.vux-center{
  background-color: #ffffff;
  .flex-box{
    &:not(:last-child){
      .border-1px-b(#d8dbe0);
    }
    display: flex;
    display:-webkit-flex;
    justify-content: space-between;
    align-items: center;
    min-height: 95px;
    padding: 0 20px;
    .left{
      width: 55px;
      min-width: 55px;
      max-width: 55px;
      flex-grow: 0;
      img{
        border-radius: 50%;
        width: 55px;
        height: 55px;
      }
    }
    .center{
      flex-grow: 1;
      padding: 0 15px;
      h5{
        font-size: 14px;
        color:#2b313c;
      }
      p{
        color:#5d6574;
        font-size: 12px;
        padding: 2px 0;
      }
      p[p-intro]{
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      &>div{
        display: flex;
        p{
          width: 70px;
          color:#2b313c;
          font-size: 12px;
          .num{
            font-size: 12px;
            padding-left: 5px;
          }
        }
      }
    }
    .right{
      width: 70px;
      min-width: 70px;
      max-width: 70px;
      flex-grow: 0;
      button {
        width: 70px;
        height: 30px;
        font-size: 12px;
        border-radius: 15px;
        &.style1{
          color: #9a9a9a;
          background-color: #eeeeee;
          border: none;
        }
        &.style2{
          background-color: #ffffff;
          color:#2c7dfa;
          border: 1px solid #2c7dfa;
        }
      }
    }
  }
}
</style>
