import http from './request';
/* eslint-disable */
// 获取首页轮播图
export const getBanner = () => http.get('/banner');
// 获取当前登录人的热门会议列表
export const getActivityHots = () => http.get('/activity/hots');
// 获取当前登录人的最近活动列表
export const getActivityRecents = () => http.get('/activity/recents');

// 根据id获取会议详情
export const getActivityInfoById = id => http.get(`/activity/detail/${id}`);

// 根据会议id获取门票
export const getTicketsByActivityId = activityId => http.get(`/activityTickets/activity/${activityId}`);
// 购买门票
export const purchaseTicket = (activityId, data) => http.post(`/trxOrder/addOrderTicket/${activityId}`, data);
// 根据id获取到当前会议信息
export const getActivityMsg = activityId => http.get(`/activity/${activityId}`);
//下载门票
// export const getPDFTicket = ticketId => http.get(`/ticketsRecord/getPDFTicket/${ticketId}`);
//修改门票
export const updateTicket = (id, data) => http.put(`/ticketsRecord/${id}`,data);

// 会议搜索
export const getSearchList = (data) => http.post('/search/activity/conditionalQuery', null, null, {params :  data });

// 获取用户基本信息
export const getProfile = () => http.get('/user');
// 根据id获取用户基本信息
export const getProfileById = id => http.get(`/user?id=${id}`);
// 获取用户基本信息
export const getProfileDetail = () => http.get('/user/detail');
// 获取会议类别列表
export const getActivityClass = () => http.get('/activity/getActivityType');
// 获取会议列表(不分页)
export const getAllActivityList = () => http.get(`/activity/getAll?page=0`);
//获取参与门派数
export const getTicketsRecord = () => http.get(`/ticketsRecord/statisticsMyTicket`);
// 获取关注人信息
export const getWatchList = (status, query) => http.get(`/watchPeople/${status}`, null, { params: query });
// 获取粉丝信息
// export const getFanList = query => http.get(`/watchPeople/fans`, null, { params: query });

// 根据主办方获取会议列表(不分页)(未发布/发布中)
export const getActivityList = status => http.get(`/activity/issue/${status}?page=0`);
// 根据主办方获取已结束会议列表(不分页)
export const getActivityListIsOver = () => http.get('/activity/issueOver?page=0');

// 根据用户ID获取会议列表(不分页)(未发布/已结束)
export const getActivityListById = (query) => http.get(`/activity/userId?page=1`, null, { params: query });

// 根据主办方获取参与的会议(购票)
export const getActivityMyJoin = (query) => http.get(`/activity/myJoin?page=0`, null, { params: query });
// 根据状态获取当前登录人参与的会议的 票的信息（有效票—已失效）
export const getActivityWithStatus = status => http.get(`/ticketsRecord/participation/${status}`);

// 个人中心获取关注人动态 会议
export const getDynamicList = (status, query) => http.get(`/${status}/dynamic`, null, { params: query});

// 个人中心获取关注人动态 人
// export const getDynamicOfPerson = (query) => http.get('/watchPeople/dynamic', null, { params: query});
// 根据主办方获取收藏的会议
export const getActivityMyWatch = (status, query) => http.get(`/watch/${status}?page=1`, null, { params: query});

// 添加关注
export const addWatch = (id) => http.post(`/watchPeople/${id}`);
//取消关注
export const deleteWatch = (id) => http.delete(`/watchPeople/${id}`);

// 添加会议收藏
export const addWatchCollect = (meetingId) => http.post(`/watch/${meetingId}`);

// 取消会议收藏
export const removeWatchCollect = (meetingId) =>http.delete(`/watch/${meetingId}`);
// 获取验票签到成功列表
export const signedRecord = (activityId) =>http.get(`/ticketsRecord/signedRecord/${activityId}`);
// 获取签到信息
export const signedInfo = (activityId, code) =>http.get(`/ticketsRecord/${activityId}/code/${code}`);
// 确认签到
export const confirmSign = (activityId, ticketId) =>http.post(`/ticketsRecord/${ticketId}/signIn/${activityId}`);

// 获取微信签名
export const wxConfig = url => http.get(`/wxConfig?url=${url}`);
