import Vue from 'vue';
import { AjaxPlugin, ToastPlugin } from 'vux';
import conf from '../config/index';
// import { debug } from 'util';

Vue.use(AjaxPlugin);
Vue.use(ToastPlugin);

Vue.http.defaults.withCredentials = true;

const host = conf.publicPath;

// const host = '//m.anjuke.com/live';

Vue.http.interceptors.response.use(data => data, (error) => {
  if (error.response.status === 401) {
    const paramsString = encodeURI(window.location.href);
    if (paramsString.indexOf('ticketActivity') > -1) {
      // const href='http://'+window.location.host;
      // console.log(this)
      Vue.$vux.toast.text(error.response.data.msg, 'top');
      setTimeout(() => {
        window.location.href = `${error.response.data.loginUrl}?service=${paramsString}`;
      }, 500);
    }
  }
  return Promise.reject(error);
});

export default {
  post: (url, data, error, option) =>
    Vue.http.post(host + url, data, option)
    .then(response => response.data)
    .catch((err) => {
      if (error) {
        error(err);
      } else {
        console.error(err);
      }
    }),
  get: (url, error, option) =>
    Vue.http.get(host + url, option)
    .then(response => response.data)
    .catch((err) => {
      if (error) {
        error(err);
      } else {
        console.log(err);
      }
    }),
  getExternal: (url, error, option) =>
    Vue.http.get(url, option)
    .then(response => response.data)
    .catch((err) => {
      if (error) {
        error(err);
      } else {
        console.log(err);
      }
    }),
  put: (url, data, error, option) =>
    Vue.http.put(host + url, data, option)
    .then(response => response.data)
    .catch((err) => {
      if (error) {
        error(err);
      } else {
        console.log(err);
      }
    }),
  delete: (url, error, option) =>
    Vue.http.delete(host + url, option)
    .then(response => response.data)
    .catch((err) => {
      if (error) {
        error(err);
      } else {
        console.log(err);
      }
    }),
  handleLessPost: (url, data, error, option) =>
    Vue.http.post(host + url, data, option)
    .catch((err) => {
      if (error) {
        error(err);
      } else {
        console.error(err);
      }
    }),
  url(path) { return host + path; },
};
