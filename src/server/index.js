import http from './request';

// 根据id获取会议详情
export const getActivityInfoById = id => http.get(`/activity/detail/${id}`);
export const getActivityInfoById2 = id => http.get(`/activity/${id}`);
