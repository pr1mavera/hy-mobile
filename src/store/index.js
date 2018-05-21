import Vue from 'vue';
import Vuex from 'vuex';
// import createLogger from 'vuex/dist/logger';
import * as getters from './getters';
import { state, mutations } from './mutations';

Vue.use(Vuex);

// const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  getters,
  state,
  mutations,
  strict: false,
  // plugins: debug ? [createLogger()] : [],
});

export default store;
