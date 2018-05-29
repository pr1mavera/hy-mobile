import Vue from 'vue';
import Router from 'vue-router';

const detailC = require('@/views/detail');
const buyTicketC = require('@/views/buyTicket');
const selectTicketC = require('@/views/buyTicket/selectTicket');
const fillInTicketMsgC = require('@/views/buyTicket/fillInTicketMsg');
const successC = require('@/views/buyTicket/success');
const usercenterC = require('@/views/usercenter');
// const PPActivityC = require('@/views/personalPage/PPActivity');
// const PPPartakeC = require('@/views/personalPage/PPPartake');
// const PPCollectionC = require('@/views/personalPage/PPCollection');
// const PPFollowC = require('@/views/personalPage/PPFollow');
// const PPDynamicC = require('@/views/personalPage/PPDynamic');
const searchC = require('@/views/searchPage');
const activityListC = require('@/views/ticketsRecord/activityList');
const recordC = require('@/views/ticketsRecord/record');
const TCKIndexC = require('@/views/TCKIndex');
const homeC = require('@/views/home');
const serviceC = require('@/views/service');
const activityC = require('@/views/activity');

// import detail from '@/views/detail';
const detail = r => require.ensure([], () => r(detailC), 'detail');
// import buyTicket from '@/views/buyTicket';
const buyTicket = r => require.ensure([], () => r(buyTicketC), 'buyTicket');
// import selectTicket from '@/views/buyTicket/selectTicket';
const selectTicket = r => require.ensure([], () => r(selectTicketC), 'selectTicket');
// import fillInTicketMsg from '@/views/buyTicket/fillInTicketMsg';
const fillInTicketMsg = r => require.ensure([], () => r(fillInTicketMsgC), 'fillInTicketMsg');
// import success from '@/views/buyTicket/success';
const success = r => require.ensure([], () => r(successC), 'success');
// import usercenter from '@/views/usercenter';
const usercenter = r => require.ensure([], () => r(usercenterC), 'usercenter');
// import PPActivity from '@/views/personalPage/PPActivity';
// const PPActivity = r => require.ensure([], () => r(PPActivityC), 'PPActivity');
// const PPPartake = r => require.ensure([], () => r(PPPartakeC), 'PPPartake');
// const PPCollection = r => require.ensure([], () => r(PPCollectionC), 'PPCollection');
// const PPFollow = r => require.ensure([], () => r(PPFollowC), 'PPFollow');
// const PPDynamic = r => require.ensure([], () => r(PPDynamicC), 'PPDynamic');
// import PPPartake from '@/views/personalPage/PPPartake';
// import PPCollection from '@/views/personalPage/PPCollection';
// import PPFollow from '@/views/personalPage/PPFollow';
// import PPDynamic from '@/views/personalPage/PPDynamic';
// import search from '@/views/searchPage';
const search = r => require.ensure([], () => r(searchC), 'search');
// import ticketActivity from '@/views/ticketsRecord/activityList';
const ticketActivity = r => require.ensure([], () => r(activityListC), 'ticketActivity');
// import record from '@/views/ticketsRecord/record';
const record = r => require.ensure([], () => r(recordC), 'record');
// const pathToRegexp = require('path-to-regexp');
// import TCKIndex from '@/views/TCKIndex';
const TCKIndex = r => require.ensure([], () => r(TCKIndexC), 'TCKIndex');
// import home from '@/views/home';
const home = r => require.ensure([], () => r(homeC), 'home');
// import service from '@/views/service';
const service = r => require.ensure([], () => r(serviceC), 'service');
// import activity from '@/views/activity';
const activity = r => require.ensure([], () => r(activityC), 'activity');
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home, // 主页
    },
    {
      path: '/TCKIndex',
      name: 'TCKIndex',
      component: TCKIndex,
    },
    {
      path: '/activity', // 活动
      name: 'activity',
      component: activity,
    },
    {
      path: '/search', // 搜索
      name: 'search',
      component: search,
    },
    {
      path: '/service', // 服务
      name: 'service',
      component: service,
    },
    {
      path: '/activity/:id', // 活动详情页面，可获取门票
      name: 'detail',
      component: detail,
    },
    {
      path: '/ticketActivity', // 主办方验票
      name: 'ticketActivity',
      component: ticketActivity,
    },
    {
      path: '/record/:id', // 扫码验票，签到码验票
      name: 'record',
      component: record,
    },
    {
      path: '/buyTicket/:activityId', // 买票步骤
      name: 'buyTicket',
      component: buyTicket,
      children: [
        {
          path: '/buyTicket/:activityId/',
          redirect: '/buyTicket/:activityId/selectTicket',
        },
        {
          path: 'selectTicket', // 选择门票
          component: selectTicket,
          name: 'selectTicket',
        },
        {
          path: 'fillInTicketMsg', // 填写信息
          component: fillInTicketMsg,
          name: 'fillInTicketMsg',
        },
        {
          path: 'success', // 购买成功
          component: success,
          name: 'success',
        },
      ],
    },
    {
      path: '/usercenter/:id', // 我的会议
      name: 'usercenter',
      component: usercenter,
      // children: [
        // {
        //   path: '/usercenter/',
        //   redirect: '/usercenter/activity/:id?',
        // },
        // {
        //   path: 'activity/:id?', // 活动
        //   component: PPActivity,
        //   name: 'PPActivity',
        // },
        // {
        //   path: 'partake/:id?', // 参与
        //   component: PPPartake,
        //   name: 'PPPartake',
        // },
        // {
        //   path: 'collection/:id?', // 收藏
        //   component: PPCollection,
        //   name: 'PPCollection',
        // },
        // {
        //   path: 'follow/:id?', // 关注
        //   component: PPFollow,
        //   name: 'PPFollow',
        // },
        // {
        //   path: 'dynamic/:id?', // 动态
        //   component: PPDynamic,
        //   name: 'PPDynamic',
        // },
      // ],
    },
    // { path: '*', name: '404', component: NotFoundComponent },
  ],
  base: '/web/',
});
