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
import Moralis from "../plugins/moralis";

export default {
  name: "ConnectWallet",
  components: {},
  data() {
    return {
      walletIcon: ["fas", "wallet"],
      disconnectIcon: ["fas", "hexagon-exclamation"],
    };
  },
  methods: {
    ...mapActions([
      "SET_WEB3",
      "SET_USER_ACCOUNT",
      "SET_NFTS",
      "SET_TOKEN_INSTANCE",
      "SET_STAKING_INSTANCE",
    ]),
    async logOut() {
      await Moralis.User.logOut();
      this.SET_USER_ACCOUNT(null);
    },
    async login() {
      const user = await Moralis.authenticate({
        signingMessage: "Connect to Chibits ❤️",
      });
      this.SET_USER_ACCOUNT(user.get("ethAddress"))
    },
  },
  computed: {
    ...mapGetters(["getUserAccount"]),
  },
};
</script>
