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
import search from '@/views/searchPage';
import ticketActivity from '@/views/ticketsRecord/activityList';
import record from '@/views/ticketsRecord/record';
import NotFoundComponent from '@/views/404';

// import TCKIndex from '@/views/TCKIndex';
// import home from '@/views/home';
// import service from '@/views/service';
// import activity from '@/views/activity';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: home,
    // },
    // {
    //   path: '/TCKIndex',
    //   name: 'TCKIndex',
    //   component: TCKIndex,
    // },
    // {
    //   path: '/activity',
    //   name: 'activity',
    //   component: activity,
    // },
    // {
    //   path: '/service',
    //   name: 'service',
    //   component: service,
    // },
    {
      path: '/search',
      name: 'search',
      component: search,
    },
    {
      path: '/activity/:id',
      name: 'detail',
      component: detail,
    },
    {
      path: '/ticketActivity',
      name: 'buyTicket',
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
      component: personalPage,
      children: [
        {
          path: '/usercenter/',
          redirect: '/usercenter/activity',
        },
        {
          path: 'activity/:id?',
          component: PPActivity,
          name: 'PPActivity',
        },
        {
          path: 'partake',
          component: PPParticipate,
          name: 'PPParticipate',
        },
        {
          path: 'collection',
          component: PPCollection,
          name: 'PPCollection',
        },
        {
          path: 'follow',
          component: PPFollow,
          name: 'PPFollow',
        },
        {
          path: 'dynamic',
          component: PPTrack,
          name: 'PPTrack',
        },
      ],
    },
    { path: '*', name: '404', component: NotFoundComponent },
  ],
  base: '/web/',
});
