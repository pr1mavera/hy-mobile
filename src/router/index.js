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
      path: '/activity/:id', // 活动具体页面
      name: 'detail',
      component: detail,
    },
    {
      path: '/ticketActivity',
      name: 'ticketActivity',
      component: ticketActivity,
    },
    {
      path: '/record/:id',
      name: 'record',
      component: record,
    },
    {
      path: '/buyTicket/:activityId',
      name: 'buyTicket',
      component: buyTicket,
      children: [
        {
          path: '/buyTicket/:activityId/',
          redirect: '/buyTicket/:activityId/selectTicket',
        },
        {
          path: 'selectTicket',
          component: selectTicket,
          name: 'selectTicket',
        },
        {
          path: 'fillInTicketMsg',
          component: fillInTicketMsg,
          name: 'fillInTicketMsg',
        },
        {
          path: 'success',
          component: success,
          name: 'success',
        },
      ],
    },
    {
      path: '/usercenter',
      name: 'usercenter',
      component: usercenter,
      children: [
        {
          path: '/usercenter/',
          redirect: '/usercenter/activity/:id?',
        },
        {
          path: 'activity/:id?',
          component: PPActivity,
          name: 'PPActivity',
        },
        {
          path: 'partake/:id?',
          component: PPPartake,
          name: 'PPPartake',
        },
        {
          path: 'collection/:id?',
          component: PPCollection,
          name: 'PPCollection',
        },
        {
          path: 'follow/:id?',
          component: PPFollow,
          name: 'PPFollow',
        },
        {
          path: 'dynamic/:id?',
          component: PPDynamic,
          name: 'PPDynamic',
        },
      ],
    },
    // { path: '*', name: '404', component: NotFoundComponent },
  ],
  base: '/web/',
});
