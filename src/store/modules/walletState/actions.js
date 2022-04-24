const actions = {
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
    }
  };
  
  export default actions;
  