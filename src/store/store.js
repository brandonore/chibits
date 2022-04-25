import { createStore } from "vuex";

const store = createStore({
  state: {
    web3: null,
    userAccount: null,
    tokenInstance: null,
    stakingInstance: null,
  },
  mutations: {
    SET_WEB3: (state, payload) => {
      state.web3 = payload;
    },
    SET_USER_ACCOUNT: (state, payload) => {
      state.userAccount = payload;
    },
    SET_TOKEN_INSTANCE: (state, payload) => {
      state.tokenInstance = payload;
    },
    SET_STAKING_INSTANCE: (state, payload) => {
      state.stakingInstance = payload;
    },
    INIT_STORE(state) {
        if(localStorage.getItem('userAccount')) {
            state.userAccount = JSON.parse(localStorage.userAccount)
        }
    }
  },
  getters: {
    getWeb3: (state) => {
      return state.web3;
    },
    getUserAccount: (state) => {
      return state.userAccount;
    },
    getTokenInstance: (state) => {
      return state.tokenInstance;
    },
    getStakingInstance: (state) => {
      return state.stakingInstance;
    },
  },
  actions: {
    SET_WEB3({ commit }, payload) {
      commit("SET_WEB3", payload);
    },
    SET_USER_ACCOUNT({ commit }, payload) {
      commit("SET_USER_ACCOUNT", payload);
    },
    SET_TOKEN_INSTANCE({ commit }, payload) {
      commit("SET_TOKEN_INSTANCE", payload);
    },
    SET_STAKING_INSTANCE({ commit }, payload) {
      commit("SET_STAKING_INSTANCE", payload);
    },
  },
});

export default store;
