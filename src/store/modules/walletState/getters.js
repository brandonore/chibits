const getters = {
    getWeb3: state => {
      return state.web3;
    },
    getUserAccount: state => {
      return state.userAccount;
    },
    getTokenInstance: state => {
      return state.tokenInstance;
    },
    getStakingInstance: state => {
      return state.stakingInstance;
    },
  };
  
  export default getters;
  