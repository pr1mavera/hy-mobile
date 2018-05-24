/*
* @Author: 15620
* @Date:   2018-01-15 15:25:00
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-25 20:16:25
*/
// import ENV from './env';
const env = process.env.NODE_ENV;
const production = {
  publicPath: '/api',
  loginPath: 'http://login.ourwill.cn',
  // 正式登录域名变更，需要手动变更；
};

const development = {
  // publicPath: 'http://huiyizhan.ourwill.cn/api',
  publicPath: 'http://hyzdev.ourwill.cn/api',
  loginPath: 'http://logindev.ourwill.cn',
};

const location = env === 'production' ? production : development;
export default location;
