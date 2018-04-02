import Vue from 'vue';
import Router from 'vue-router';
import detail from '@/views/detail';
import buyTicket from '@/views/buyTicket';
import selectTicket from '@/views/buyTicket/selectTicket';
import fillInTicketMsg from '@/views/buyTicket/fillInTicketMsg';
import success from '@/views/buyTicket/success';

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
  ],
});
