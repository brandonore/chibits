<template>
  <!-- Replace with your content -->
  <div v-if="getUserAccount && getWeb3" class="text-center">
    <div>
      <button
        @click.prevent="logOut"
        type="button"
        class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-gradient-to-tl from-pink-500  to-rose-500 hover:opacity-75 hover:text-white transition-all linear"
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
        @click.prevent="login"
        type="button"
        class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-gradient-to-tl from-pink-500  to-rose-500 hover:opacity-75 hover:text-white transition-all linear"
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
import { mapActions, mapGetters } from "vuex";
import Web3 from "web3";
import Web3Modal from "web3modal";
import Moralis from "../plugins/moralis";
import contract from "@/contracts/ABIs";

export default {
  name: "ConnectWallet",
  components: {},
  data() {
    return {
      walletIcon: ["fas", "wallet"],
      disconnectIcon: ["fas", "hexagon-exclamation"],
      currentUser: "",
      web3Modal: "",
    };
  },
  methods: {
    ...mapActions([
      "SET_WEB3",
      "SET_USER_ACCOUNT",
      "SET_TOKEN_INSTANCE",
      "SET_STAKING_INSTANCE",
      "SET_NFTS",
    ]),
    logOut() {
      if (!this.getUserAccount) {
        return;
      } else {
        this.SET_USER_ACCOUNT(null);
        this.SET_NFTS(null);
      }
    },
    // async onConnect() {
    //   try {
    //     let provider = await this.web3Modal.connect();
    //     this.onProvider(provider);
    //     provider.on("accountsChanged", (accounts) => {
    //       console.log(accounts);
    //       this.onProvider(provider);
    //     });
    //   } catch (e) {
    //     console.log("Unable to get a wallet connection", e);
    //     return;
    //   }
    // },

    // async onProvider(provider) {
    //   let web3 = new Web3(provider);
    //   this.SET_WEB3(web3);

    //   let accounts = await web3.eth.getAccounts();
    //   this.SET_USER_ACCOUNT(accounts[0]);

    // // localStorage.setItem('userAccount', JSON.stringify(accounts[0]))
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

    // },
    async login() {
      try {
        let user = await Moralis.authenticate({
          signingMessage: "Connect to Chibits ❤️",
        });
                this.SET_USER_ACCOUNT(user.get("ethAddress"));

      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapGetters(["getUserAccount", "getWeb3"]),
  },
  beforeMount() {
    this.currentUser = Moralis.User.current();
    // this.web3Modal = new Web3Modal({
    //   cacheProvider: false,
    //   disableInjectedProvider: false,
    // });
  },
};
</script>
