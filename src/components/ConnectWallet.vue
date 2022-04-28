<template>
  <!-- Replace with your content -->
  <div v-if="getUserAccount" class="text-center">
    <div>
      <button
        @click.prevent="logOut"
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
        @click.prevent="login"
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
import { mapActions, mapGetters } from "vuex";
import Web3 from "web3";
import Web3Modal from "web3modal";
import Moralis from "../plugins/moralis";
import contract from '@/contracts/ABIs'

export default {
  name: "ConnectWallet",
  components: {},
  data() {
    return {
      walletIcon: ["fas", "wallet"],
      disconnectIcon: ["fas", "hexagon-exclamation"],
      currentUser: null
    };
  },
  methods: {
    ...mapActions([
      "SET_WEB3",
      "SET_USER_ACCOUNT",
      "SET_TOKEN_INSTANCE",
      "SET_STAKING_INSTANCE",
    ]),
    async logOut() {
        if(!this.getUserAccount) {
            return
        }
        Moralis.User.logOut().then(() => {
            this.currentUser = Moralis.User.current()
            this.SET_USER_ACCOUNT(this.currentUser)
        })
    },
    async login() {
        try {
            let user = await Moralis.authenticate({ signingMessage: "Connect to Chibits ❤️" })
            this.currentUser = user
            this.SET_USER_ACCOUNT(user.get('ethAddress'))
            await Moralis.enableWeb3();
            const web3 = new Web3(Moralis.provider);
            this.SET_WEB3(web3);
            this.$store.commit("INIT_STORE");

            let TOKEN_INSTANCE = new web3.eth.Contract(
                contract.TOKEN_ABI,
                contract.TOKEN_ADDR
            );
            let STAKING_INSTANCE = new web3.eth.Contract(
                contract.STAKING_ABI,
                contract.STAKING_ADDR
            );

            this.SET_TOKEN_INSTANCE(TOKEN_INSTANCE);
            this.SET_STAKING_INSTANCE(STAKING_INSTANCE);
        } catch (error) {
            console.log(error)
        } 
    },
  },
  computed: {
    ...mapGetters(["getUserAccount", "getWeb3"]),
  },
  beforeMount() {
    this.currentUser = Moralis.User.current()
  },
};
</script>
