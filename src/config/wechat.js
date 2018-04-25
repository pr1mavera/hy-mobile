import Vue from 'vue';
import { wxConfig } from '../server';

const jsApiList = [
  'checkJsApi',
  'onMenuShareTimeline',
  'onMenuShareAppMessage',
  'onMenuShareQQ',
  'onMenuShareWeibo',
  'onMenuShareQZone',
  'hideMenuItems',
  'showMenuItems',
  'hideAllNonBaseMenuItem',
  'showAllNonBaseMenuItem',
  'translateVoice',
  'startRecord',
  'stopRecord',
  'onVoiceRecordEnd',
  'playVoice',
  'onVoicePlayEnd',
  'pauseVoice',
  'stopVoice',
  'uploadVoice',
  'downloadVoice',
  'chooseImage',
  'previewImage',
  'uploadImage',
  'downloadImage',
  'getNetworkType',
  'openLocation',
  'getLocation',
  'hideOptionMenu',
  'showOptionMenu',
  'closeWindow',
  'scanQRCode',
  'chooseWXPay',
  'openProductSpecificView',
  'addCard',
  'chooseCard',
  'openCard',
];


export default (callback) => {
  const url = encodeURIComponent(window.location.href.split('#')[0]);
  if (window.navigator.userAgent.indexOf('MicroMessenger') > -1) {
    Vue.wechat.error((res) => {
      // document.body.innerHTML = res.errMsg;
      // IOS 报错但任然可以正常使用
      console.info(res);
    });
    wxConfig(url).then((r) => {
      if (callback) {
        callback(r);
      }
      if (r && r.code === 0) {
        Vue.wechat.config({
          ...r.data,
          // debug: false,
          debug: process.env.NODE_ENV === 'development',
          jsApiList,
        });
      }
    }).catch((err) => {
      document.body.innerHTML = err.toString();
    });
  } else {
    console.info('not wechat');
  }
};
