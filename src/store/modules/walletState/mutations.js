const mutations = {
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
    }
    
  };
  
  export default mutations;
  