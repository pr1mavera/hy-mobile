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
};

const development = {
  // publicPath: 'http://huiyizhan.ourwill.cn/api',
  publicPath: 'http://hyzdev.ourwill.cn/api',
};

const location = env === 'production' ? production : development;
export default location;
