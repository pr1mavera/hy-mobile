import * as types from './ActionTypes';

export const state = {
  id: null,
  activityId: 14,
  tickets: [],
  selTickets: [],
  firstEditData: {
    name: '',
    phone: 0,
    email: '',
  },
};

/* eslint-disable no-param-reassign */
export const mutations = {
  [types.SET_ID](st, data) {
    st.id = data;
  },
  [types.SET_ACTIVITY_ID](st, data) {
    st.activityId = data;
  },
  [types.SET_TICKETS](st, tickets) {
    st.tickets = tickets;
  },
  [types.SET_SELTICKETS](st, selTickets) {
    st.selTickets = selTickets;
  },
  [types.SET_QUERY](st, query) {
    st.query = query;
  },
  [types.SET_FIRST_EDIT_DATA](st, EditData) {
    st.firstEditData = EditData;
  },
};
