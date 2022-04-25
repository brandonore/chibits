<template>
  <!-- Replace with your content -->
    <div v-if="getUserAccount" class="text-center">
    <div>
      <button
      @click.prevent="disconnect"
        type="button"
        class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-rose-500 bg-[#f43f5d2d] hover:bg-rose-500 hover:text-white transition-all linear"
      >
        <font-awesome-icon
          :icon="disconnectIcon"
          class="-ml-1 mr-2 h-5 w-5"
          aria-hidden="true"
        />
        Disconnect
      </button>
    </div>
  </div>

  <div v-else class="text-center">
    <div>
      <button
      @click.prevent="onConnect"
        type="button"
        class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-violet-500 bg-[#8a5cf638] hover:bg-violet-500 hover:text-white transition-all linear"
      >
        <font-awesome-icon
          :icon="walletIcon"
          class="-ml-1 mr-2 h-5 w-5"
          aria-hidden="true"
        />
        Connect Wallet
      </button>
    </div>
  </div>
  <!-- /End replace -->
</template>

<script>
import Web3 from "web3";
import Web3Modal from "web3modal";
import { mapActions, mapGetters } from "vuex";
// import contract from "./contracts/ABIs.json";

export default {
  name: "ConnectWallet",
  components: {},
  data() {
    return {
      walletIcon: ["fas", "wallet"],
      disconnectIcon: ["fas", "hexagon-exclamation"],
      chainId: 4,
      web3Modal: "",
      claim_ids: null,
      staked_ids: null,
      unStaked_ids: null,
      loading: false,
      rewards: "",
      staked_tokens: ""
    };
  },
  beforeMount() {
    this.web3Modal = new Web3Modal({
      cacheProvider: true,
      disableInjectedProvider: false,
    });
  },
  methods: {
    ...mapActions([
      "SET_WEB3",
      "SET_USER_ACCOUNT",
      "SET_TOKEN_INSTANCE",
      "SET_STAKING_INSTANCE",
    ]),
    async onConnect() {
      try {
        if(this.web3Modal.cachedProvider) {
            let provider = await this.web3Modal.connect();
            this.onProvider(provider);
        provider.on("accountsChanged", (accounts) => {
          console.log(accounts);
          this.onProvider(provider);
        });
        }
        
      } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
      }
    },
    async onProvider(provider) {
      let web3 = new Web3(provider);
      this.SET_WEB3(web3);

      let accounts = await web3.eth.getAccounts();
      this.SET_USER_ACCOUNT(accounts[0]);
      console.log(this.getUserAccount)

      let chainId = await web3.eth.getChainId();
      if (chainId !== this.chainId) {
        return;
      }

    //   let TOKEN_INSTANCE = new web3.eth.Contract(
    //     contract.TOKEN_ABI,
    //     contract.TOKEN_ADDR
    //   );
    //   let STAKING_INSTANCE = new web3.eth.Contract(
    //     contract.STAKING_ABI,
    //     contract.STAKING_ADDR
    //   );

    //   this.SET_TOKEN_INSTANCE(TOKEN_INSTANCE);
    //   this.SET_STAKING_INSTANCE(STAKING_INSTANCE);
    },
    disconnect() {
        this.SET_USER_ACCOUNT(null)
        console.log(this.getUserAccount)
    }
  },
    computed: {
    ...mapGetters([
      "getWeb3",
      "getUserAccount",
      "getTokenInstance",
      "getStakingInstance",
    ]),
  },
};
</script>
