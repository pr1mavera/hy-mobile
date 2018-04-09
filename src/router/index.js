import Vue from 'vue';
import Router from 'vue-router';
import detail from '@/views/detail';

import buyTicket from '@/views/buyTicket';
import selectTicket from '@/views/buyTicket/selectTicket';
import fillInTicketMsg from '@/views/buyTicket/fillInTicketMsg';
import success from '@/views/buyTicket/success';

import personalPage from '@/views/personalPage';
import PPActivity from '@/views/personalPage/PPActivity';
import PPParticipate from '@/views/personalPage/PPParticipate';
import PPCollection from '@/views/personalPage/PPCollection';
import PPFollow from '@/views/personalPage/PPFollow';
import PPTrack from '@/views/personalPage/PPTrack';

// const pathToRegexp = require('path-to-regexp');

// const re = pathToRegexp('/personalPage/:id*');
// re.exec('/personalPage');

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/detail/:id',
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: detail,
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
      path: '/personalPage/:id(\\d+)',
      name: 'personalPage',
      component: personalPage,
      children: [
        {
          path: '/personalPage/:id/',
          redirect: '/personalPage/:id(\\d+)/PPActivity',
        },
        {
          path: 'PPActivity',
          component: PPActivity,
          name: 'PPActivity',
        },
        {
          path: 'PPParticipate',
          component: PPParticipate,
          name: 'PPParticipate',
        },
        {
          path: 'PPCollection',
          component: PPCollection,
          name: 'PPCollection',
        },
        {
          path: 'PPFollow',
          component: PPFollow,
          name: 'PPFollow',
        },
        {
          path: 'PPTrack',
          component: PPTrack,
          name: 'PPTrack',
        },
      ],
    },
  ],
});
