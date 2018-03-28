import Vue from 'vue';
import Router from 'vue-router';
import detail from '@/views/detail';
import buyTicket from '@/views/buyTicket';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/detail/:id',
      name: 'detail',
      component: detail,
    },
    {
      path: '/buyTicket',
      name: 'buyTicket',
      component: buyTicket,
    },
  ],
});
