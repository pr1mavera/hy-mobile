/*
* @Author: 15620
* @Date:   2018-01-15 15:25:00
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-25 20:16:25
*/
import ENV from './env';

const production = {
  publicPath: '/api',
};

const development = {
  publicPath: 'http://huiyizhan.ourwill.cn/api',
};

const location = ENV === 'production' ? production : development;
export default location;