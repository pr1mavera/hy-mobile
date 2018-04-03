import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import { state, mutations } from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  getters,
  state,
  mutations,
});

export default store;
