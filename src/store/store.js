import { createStore } from "vuex";

const store = createStore({
  state: {
    web3: null,
    userAccount: null,
    tokenInstance: null,
    stakingInstance: null,
    nfts: null,
    balance: null,
    isApproved: false
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
    SET_NFTS: (state, payload) => {
      state.nfts = payload;
    },
    SET_BALANCE: (state, payload) => {
        state.balance = payload;
      },
    SET_APPROVAL: (state, payload) => {
        state.isApproved = payload
    },
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
    getNftCount: (state) => {
      return state.nfts;
    },
    getBalance: (state) => {
        return state.balance
    },
    getIsApproved: (state) => {
        return state.isApproved;
    }
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
    SET_NFTS({ commit }, payload) {
      commit("SET_NFTS", payload);
    },
    SET_BALANCE({ commit }, payload) {
        commit("SET_BALANCE", payload);
      },
    SET_APPROVAL({ commit }, payload) {
        commit("SET_APPROVAL", payload)
    }
  },
});

export default store;
