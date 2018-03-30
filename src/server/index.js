import http from './request';

// 根据id获取会议详情
export const getActivityInfoById = id => http.get(`/activity/detail/${id}`);
export const getSponsorByUserId = id => http.get(`/activityContact/${id}`);
export const getTicketsByActivityId = activityId => http.get(`/activityTickets/activity/${activityId}`);
