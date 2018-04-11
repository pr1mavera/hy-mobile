<template>
  <div class="activityTicketsList">
    <div class="activityBanner">
      <h1 class="title">
        <div class="text">
          {{activity.activityTitle}}
        </div>
        <div class="BgImg">
          <img :src="activity.activityBannerMobileUrl">
        </div>
      </h1>
      <div class="activityDetail">
        <p class="text">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shijian"></use>
          </svg>
          {{activity.startTime}}
        </p>
        <p class="text">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-weizhi"></use>
          </svg>
          {{activity.activityAddress}}
        </p>
      </div>
    </div>
    <div class="ticketsList">
      <ul>
        <li v-for="(ticket, index) in activity.ticketsRecords" class="ticketsListLi" :key="index">
          <span class="ticketState">待审核</span>
          <p class="text">{{ticket.confereeName}}</p>
          <p class="text">{{ticket.confereeName}}</p>
          <div class="ticketOptionBtn">
            <button class="item" type="button" name="button">查看门票</button>
            <button class="item" type="button" name="button">下载门票</button>
            <button class="item" type="button" name="button">修改门票</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    activity: {
      type: Object,
    },
  },
};
</script>

<style lang="less">

.activityTicketsList {
  .activityBanner {
    width: 100%;
    border-radius: 6px;
    overflow: hidden;
    background-color: #ffffff;
    .title {
      position: relative;
      .text {
        position: relative;
        height: 64px;
        color: #ffffff;
        font-size: 18px;
        font-weight: 400;
        line-height: 64px;
        padding: 0 16px;
        background-color: rgba(78, 148, 255, .8);
        z-index: 100;
      }
      .BgImg {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    .activityDetail {
      padding: 5px 16px;
      color: #5d6574;
      font-size: 14px;
      .text {
        line-height: 26px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .icon {
          margin-right: 8px;
        }
      }
    }
  }
  .ticketsList {
    ul {
      width: 100%;
      padding: 0;
      li.ticketsListLi {
        position: relative;
        width: 100%;
        padding: 14px 16px;
        box-sizing: border-box;
        margin-top: 2px;
        border-radius: 6px;
        overflow: hidden;
        background-color: #ffffff;
        list-style-type: none;
        .ticketState {
          position: absolute;
          right: 16px;
          top: 12px;
          font-size: 14px;
        }
        .text {
          font-size: 18px;
          line-height: 28px;
        }
        .ticketOptionBtn {
          display: flex;
          justify-content: flex-end;
          margin-top: 5px;
          .item {
            margin-left: 8px;
            padding: 5px 12px;
            font-weight: 200px;
            color: #2c7dfa;
            border: 1px solid #2c7dfa;
            border-radius: 27px;
            background-color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
