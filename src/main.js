// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import { WechatPlugin, AlertPlugin, ToastPlugin, ConfirmPlugin } from 'vux';
import router from './router/index';
import App from './App';
import storeConfig from './store/index';

Vue.use(WechatPlugin);
Vue.use(AlertPlugin);
Vue.use(ToastPlugin);
Vue.use(ConfirmPlugin);

FastClick.attach(document.body); // 这儿是移动端消除300

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  router,
  store: storeConfig,
  render: h => h(App),
}).$mount('#app-box');
