import { createStore } from "vuex";

const store = createStore({
  state: {
    web3: null,
    userAccount: null,
    tokenInstance: null,
    stakingInstance: null,
    balance: 0,
    isApproved: false,
    stakedReload: false,
    unstakedReload: false,
    disableStakeButton: false,
    disableUnstakeButton: false,
    stakedBalance: 0,
    unstakedBalance: 0
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
    SET_BALANCE: (state, payload) => {
        state.balance = payload;
      },
    SET_APPROVAL: (state, payload) => {
        state.isApproved = payload
    },
    SET_STAKED_RELOAD: (state, payload) => {
        state.stakedReload = payload
    },
    SET_UNSTAKED_RELOAD: (state, payload) => {
        state.unstakedReload = payload
    },
    SET_DISABLE_STAKE_BUTTON: (state, payload) => {
        state.disableStakeButton = payload
    },
    SET_DISABLE_UNSTAKE_BUTTON: (state, payload) => {
        state.disableUnstakeButton = payload
    },
    SET_STAKED_BALANCE: (state, payload) => {
        state.stakedBalance = payload
    },
    SET_UNSTAKED_BALANCE: (state, payload) => {
        state.unstakedBalance = payload
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
    getBalance: (state) => {
        return state.balance
    },
    getIsApproved: (state) => {
        return state.isApproved;
    },
    getStakedReload: (state) => {
        return state.stakedReload
    },
    getUnstakedReload: (state) => {
        return state.unstakedReload
    },
    getDisableStakeButton: (state) => {
        return state.disableStakeButton
    },
    getDisableUnstakeButton: (state) => {
        return state.disableUnstakeButton
    },
    getStakedBalance: (state) => {
        return state.stakedBalance
    },
    getUnstakedBalance: (state) => {
        return state.unstakedBalance
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
    SET_BALANCE({ commit }, payload) {
        commit("SET_BALANCE", payload);
      },
    SET_APPROVAL({ commit }, payload) {
        commit("SET_APPROVAL", payload)
    },
    SET_STAKED_RELOAD({ commit }, payload) {
        commit("SET_STAKED_RELOAD", payload)
    },
    SET_UNSTAKED_RELOAD({ commit }, payload) {
        commit("SET_UNSTAKED_RELOAD", payload)
    },
    SET_DISABLE_STAKE_BUTTON({ commit }, payload) {
        commit("SET_DISABLE_STAKE_BUTTON", payload)
    },
    SET_DISABLE_UNSTAKE_BUTTON({ commit }, payload) {
        commit("SET_DISABLE_UNSTAKE_BUTTON", payload)
    },
    SET_STAKED_BALANCE({ commit }, payload) {
        commit("SET_STAKED_BALANCE", payload)
    },
    SET_UNSTAKED_BALANCE({ commit }, payload) {
        commit("SET_UNSTAKED_BALANCE", payload)
    },
  },
});

export default store;
