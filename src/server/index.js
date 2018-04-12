import http from './request';
/* eslint-disable */
// 根据id获取会议详情
export const getActivityInfoById = id => http.get(`/activity/detail/${id}`);

// 根据会议id获取门票
export const getTicketsByActivityId = activityId => http.get(`/activityTickets/activity/${activityId}`);

// 获取用户基本信息
export const getProfile = () => http.get('/user');
// 根据id获取用户基本信息
export const getProfileById = id => http.get(`/user?id=${id}`);
// 根据用户id获取会议列表(不分页)
export const getActivityListById = id => http.get(`/activity/getAll?id=${id}&page=0`);

// 获取关注人信息
export const getWatchPeopleList = query => http.get(`/watchPeople/users`, null, { params: query });
// 获取粉丝信息
export const getFanList = query => http.get(`/watchPeople/fans`, null, { params: query });
// 根据主办方获取会议列表(不分页)(未发布/发布中)
export const getActivityList = status => http.get(`/activity/issue/${status}`);
// 根据主办方获取已结束会议列表(不分页)(未发布/发布中)
export const getActivityListIsOver = () => http.get('/activity/issueOver');
// 根据主办方获取参与的会议
export const getActivityMyJoin = () => http.get('/activity/myJoin');

// 个人中心获取关注人动态 会议
export const getDynamicOfMeeting = (query) => http.get('/watch/dynamic', null, { params: query});

// 个人中心获取关注人动态 人
export const getDynamicOfPerson = (query) => http.get('/watchPeople/dynamic', null, { params: query});
