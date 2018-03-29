import * as types from './ActionTypes';

export const state = {
  id: 1,
};

/* eslint-disable no-param-reassign */
export const mutations = {
  [types.SET_ID](st, data) {
    st.id = data;
  },
};
