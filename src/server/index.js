import http from './request';

// 根据id获取会议详情
export const getActivityInfoById = id => http.get(`/activity/detail/${id}`);
export const getSponsorByUserId = id => http.get(`/activityContact/${id}`);

// 根据会议id获取门票
export const getTicketsByActivityId = activityId => http.get(`/activityTickets/activity/${activityId}`);

// 获取用户基本信息
export const getProfile = () => http.get('/user');
// 根据id获取用户基本信息
export const getProfileById = id => http.get(`/user?id=${id}`);
// 根据用户id获取会议列表(不分页)
export const getActivityListById = id => http.get(`/activity/getAll?id=${id}&page=0`, { params: { id } });
// 根据主办方获取会议列表(不分页)(未发布/发布中)
export const getActivityList = status => http.get(`/activity/issue/${status}`);
// 根据主办方获取已结束会议列表(不分页)(未发布/发布中)
export const getActivityListIsOver = () => http.get('/activity/issueOver');
