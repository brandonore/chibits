import { createStore } from "vuex";

const store = createStore({
  state: {
    userAccount: null,
    tokenInstance: null,
    stakingInstance: null,
    selectedNfts: [],
  },
  mutations: {
    SET_USER_ACCOUNT: (state, payload) => {
      state.userAccount = payload;
    },
    SET_TOKEN_INSTANCE: (state, payload) => {
      state.tokenInstance = payload;
    },
    SET_STAKING_INSTANCE: (state, payload) => {
      state.stakingInstance = payload;
    },
    SET_SELECTED_NFTS: (state, payload) => {
      state.selectedNfts.push(payload);
    },
    REMOVE_SELECTED_NFTS: (state, payload) => {
      state.selectedNfts = state.selectedNfts.filter(
        (value) => value !== payload
      );
    },
    INIT_STORE(state) {
      if (localStorage.getItem("userAccount")) {
        state.userAccount = JSON.parse(localStorage.userAccount);
      }
    },
  },
  getters: {
    getUserAccount: (state) => {
      return state.userAccount;
    },
    getTokenInstance: (state) => {
      return state.tokenInstance;
    },
    getStakingInstance: (state) => {
      return state.stakingInstance;
    },
    getSelectedNfts: (state) => {
      return state.selectedNfts;
    },
  },
  actions: {
    SET_USER_ACCOUNT({ commit }, payload) {
      commit("SET_USER_ACCOUNT", payload);
    },
    SET_TOKEN_INSTANCE({ commit }, payload) {
      commit("SET_TOKEN_INSTANCE", payload);
    },
    SET_STAKING_INSTANCE({ commit }, payload) {
      commit("SET_STAKING_INSTANCE", payload);
    },
    SET_SELECTED_NFTS({ commit }, payload) {
      commit("SET_SELECTED_NFTS", payload);
    },
   REMOVE_SELECTED_NFTS({ commit }, payload) {
        commit("REMOVE_SELECTED_NFTS", payload);
      },
  },
});

export default store;
