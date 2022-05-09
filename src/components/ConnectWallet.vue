<template>
  <!-- Replace with your content -->
  <div v-if="getUserAccount && getWeb3" class="text-center">
    <button
      @click.prevent="logOut"
      type="button"
      class="inline-flex items-center px-12 py-3 rounded-sm text-sm font-medium text-white bg-gradient-to-tl from-pink-500 to-rose-500 hover:opacity-75 hover:text-white transition-all linear"
    >
      <font-awesome-icon
        :icon="['fas', 'circle-exclamation']"
        class="-ml-1 mr-2 h-5 w-5"
        aria-hidden="true"
      />
      Disconnect
    </button>
  </div>

  <div v-else class="text-center">
    <button
      @click.prevent="login"
      type="button"
      class="inline-flex items-center px-12 py-3 rounded-sm text-sm font-medium text-white bg-gradient-to-tl from-pink-500 to-rose-500 hover:opacity-75 hover:text-white transition-all linear"
    >
      <font-awesome-icon
        :icon="['fas', 'wallet']"
        class="-ml-1 mr-2 h-5 w-5"
        aria-hidden="true"
      />
      Connect Wallet
    </button>
  </div>
  <!-- /End replace -->
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ConnectWallet",
  components: {},
  data() {
    return {
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
    ]),
    logOut() {
      if (!this.getUserAccount) {
        return;
      } else {
        this.SET_USER_ACCOUNT(null);
        localStorage.removeItem('userAccount')
        this.$router.push('/')
      }
    },
    async login() {
      try {
          let accounts = await this.getWeb3.eth.getAccounts()
          this.SET_USER_ACCOUNT(accounts[0])
          localStorage.setItem('userAccount', accounts[0])
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapGetters(["getUserAccount", "getWeb3"]),
  },
};
</script>
