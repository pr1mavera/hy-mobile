/*
* @Author: 15620
* @Date:   2018-01-15 15:25:00
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-03-28 16:53:28
*/
import ENV from './env';

const production = {
  publicPath: 'http://172.168.1.5:5081/api',
};

const development = {
  publicPath: 'http://172.168.1.5:5081/api',
};

const location = ENV === 'production' ? production : development;
export default location;
