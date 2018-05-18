import Vue from 'vue';
import Router from 'vue-router';
import detail from '@/views/detail';
import buyTicket from '@/views/buyTicket';
import selectTicket from '@/views/buyTicket/selectTicket';
import fillInTicketMsg from '@/views/buyTicket/fillInTicketMsg';
import success from '@/views/buyTicket/success';
import usercenter from '@/views/usercenter';
import PPActivity from '@/views/personalPage/PPActivity';
import PPPartake from '@/views/personalPage/PPPartake';
import PPCollection from '@/views/personalPage/PPCollection';
import PPFollow from '@/views/personalPage/PPFollow';
import PPDynamic from '@/views/personalPage/PPDynamic';
import search from '@/views/searchPage';
import ticketActivity from '@/views/ticketsRecord/activityList';
import record from '@/views/ticketsRecord/record';

// const pathToRegexp = require('path-to-regexp');

import TCKIndex from '@/views/TCKIndex';
import home from '@/views/home';
import service from '@/views/service';
import activity from '@/views/activity';

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
      path: '/ticketActivity', // 微信端嵌入页面（进行中，已结束）
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
      path: '/usercenter', // 我的会议
      name: 'usercenter',
      component: usercenter,
      children: [
        {
          path: '/usercenter/',
          redirect: '/usercenter/activity/:id?',
        },
        {
          path: 'activity/:id?', // 活动
          component: PPActivity,
          name: 'PPActivity',
        },
        {
          path: 'partake/:id?', // 参与
          component: PPPartake,
          name: 'PPPartake',
        },
        {
          path: 'collection/:id?', // 收藏
          component: PPCollection,
          name: 'PPCollection',
        },
        {
          path: 'follow/:id?', // 关注
          component: PPFollow,
          name: 'PPFollow',
        },
        {
          path: 'dynamic/:id?', // 动态
          component: PPDynamic,
          name: 'PPDynamic',
        },
      ],
    },
    // { path: '*', name: '404', component: NotFoundComponent },
  ],
  base: '/web/',
});
