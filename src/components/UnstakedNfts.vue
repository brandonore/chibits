<template>
  <div class="md:mt-8 pt-4 pb-12">
    <div class="flex items-center justify-between pt-4 pb-8">
      <h1 class="titles text-2xl text-left text-slate-500">
        Unstaked NFTs ({{ getBalance }})
      </h1>
      <button
        v-if="!txSubmitted"
        @click.prevent="onStake"
        type="button"
        class="stake-btn p-3 w-1/3 md:w-1/6 rounded-sm text-md font-extrabold text-white bg-gradient-to-tl from-pink-500 to-rose-500 transition-all linear hover:opacity-75"
      >
        <span v-if="!selectedNfts.length">Stake All</span>
        <span v-else>Stake ({{ selectedNfts.length }})</span>
      </button>
      <button
        v-else
        type="button"
        disabled
        class="cursor-not-allowed disabled:opacity-50 inline-flex justify-center items-center p-3 w-1/3 md:w-1/6 text-md font-extrabold rounded-sm text-white bg-gradient-to-tl from-pink-500 to-rose-500 transition-all linear hover:opacity-75"
      >
        <svg
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Staking...
      </button>
    </div>
    <!-- unstaked nfts -->
    <div v-if="getUserAccount && getIsApproved && nfts.length && !txSubmitted">
      <div
        class="unstaked-container rounded-lg grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
      >
        <div
          v-for="nft in sortedNfts"
          :key="nft.tokenId"
          :class="{ active: nft.active }"
          @click="!txSubmitted && getNftId(nft)"
          class="rounded-lg nft-card overflow-hidden bg-white dark:bg-slate-800 pb-3"
        >
          <div class="flex-col relative items-center justify-evenly">
            <span
              v-show="nft.active"
              class="absolute top-2 right-2 text-violet-500"
            >
              <font-awesome-icon class="h-6 w-6" :icon="checkedIcon"
            /></span>
            <img :src="nft.url" class="rounded-lg nft-img w-full" />
          </div>
          <div class="flex-col p-2 items-center justify-evenly">
            <h1 class="small-title text-md text-slate-400">
              hana //
              <span class="text-lg cera-bold">NO. {{ nft.tokenId }}</span>
            </h1>
            <div class="small-title text-md text-slate-400">
              <span
                class="inline-flex items-center px-3 py-0.5 rounded-lg text-sm cera-bold dark:bg-slate-500 dark:text-slate-800 bg-emerald-100 text-emerald-600"
                >{{ nft.reward }} $CHI per day</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- loading -->
    <div
      class="py-24 border-2 dark:border-slate-500 rounded-xl"
      v-else-if="(getUserAccount && loading) || (getUserAccount && txSubmitted)"
    >
      <font-awesome-icon
        :icon="starIcon"
        class="text-slate-400 mx-auto h-12 w-12 animate-bounce"
        aria-hidden="true"
      />
      <h1 class="mt-2 text-xl font-medium text-slate-500">Loading...</h1>
      <p class="mb-6 mt-1 text-sm text-slate-500">Please be patient!</p>
    </div>
    <!-- no nfts found -->
    <div
      v-else-if="getUserAccount && getBalance == 0"
      class="py-24 border-2 dark:border-slate-500 rounded-xl"
    >
      <font-awesome-icon
        :icon="starsIcon"
        class="text-slate-400 mx-auto h-12 w-12"
        aria-hidden="true"
      />
      <h1 class="mt-2 text-xl font-medium text-slate-500">No Chibits found!</h1>
      <p class="mb-6 mt-1 text-sm text-slate-500">
        Visit the official OpenSea collection
      </p>
    </div>
    <!-- approve wallet -->
    <div
      v-else-if="getUserAccount && !getIsApproved && !loading"
      class="py-24 border-2 dark:border-slate-500 rounded-xl"
    >
      <font-awesome-icon
        :icon="starsIcon"
        class="text-slate-400 mx-auto h-12 w-12"
        aria-hidden="true"
      />
      <h1 class="mt-2 text-xl font-medium text-slate-500">
        Chibits found! Approve wallet for staking
      </h1>
      <p class="mb-6 mt-1 text-sm text-slate-500">
        This only needs to be done once!
      </p>
      <button
        v-if="!txSubmitted"
        @click.prevent="onApproval"
        type="button"
        class="inline-flex justify-center items-center p-3 w-1/3 md:w-1/6 text-md font-extrabold rounded-sm text-white bg-gradient-to-tl from-pink-500 to-rose-500 transition-all linear hover:opacity-75"
      >
        Approve
      </button>
      <button
        v-else
        type="button"
        disabled
        class="cursor-not-allowed disabled:opacity-50 rounded-sm inline-flex justify-center items-center p-3 w-1/3 md:w-1/6 text-md font-extrabold text-white bg-gradient-to-tl from-pink-500 to-rose-500 transition-all linear hover:opacity-75"
      >
        <svg
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Approving...
      </button>
    </div>
  </div>
</template>

<script>
import contract from "@/contracts/ABIs.json";
import { mapActions, mapGetters } from "vuex";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

export default {
  name: "StakedNfts",
  data() {
    return {
      nfts: [],
      selectedNfts: [],
      stateNfts: [],
      isApproved: false,
      checkedIcon: ["fas", "circle-check"],
      starsIcon: ["fas", "stars"],
      starIcon: ["fas", "star"],
      txSubmitted: false,
      loading: true,
      disableBtn: true,
    };
  },
  methods: {
    ...mapActions([
      "SET_APPROVAL",
      "SET_BALANCE",
      "SET_STAKED_RELOAD",
      "SET_UNSTAKED_RELOAD",
      "SET_DISABLE_UNSTAKE_BUTTON",
      "SET_DISABLE_STAKE_BUTTON",
      "SET_UNSTAKED_BALANCE",
    ]),

    async getNfts() {
      const tokenAddr = contract.TOKEN_ADDR;
      const aWeb3 = createAlchemyWeb3(
        process.env.VUE_APP_ALCHEMY_SERVER_URL +
          process.env.VUE_APP_ALCHEMY_API_KEY
      );
      this.txSubmitted = false;
      let nfts = await aWeb3.alchemy.getNfts({
        owner: this.getUserAccount,
        contractAddresses: [tokenAddr],
        withMetadata: false,
      });
      nfts.ownedNfts.forEach((n) => {
        let id = Number(n.id.tokenId);
        this.nfts.push({
          tokenId: id.toString(),
          url: require(`../assets/images/nfts/${id}.png`),
          reward: this.assignRarity(id),
        });
        this.stateNfts.push(id.toString());
      });
      this.SET_UNSTAKED_BALANCE(this.stateNfts);
    },

    getNftId(nft) {
      nft.active = !nft.active;
      if (nft.active) {
        this.selectedNfts.push(nft.tokenId);
      } else {
        this.selectedNfts = this.selectedNfts.filter(
          (value) => value !== nft.tokenId
        );
      }
    },

    checkBalance() {
      this.getTokenInstance.methods
        .balanceOf(this.getUserAccount)
        .call()
        .then((response) => {
          console.log("balance: " + response);
          this.nfts = [];
          this.selectedNfts = [];
          this.stateNfts = [];
          this.SET_BALANCE(response);
          this.SET_DISABLE_STAKE_BUTTON(false);
          if (response > 0) {
            this.checkApproval();
          } else {
            this.loading = false;
            this.txSubmitted = false;
          }
        });
    },

    checkApproval() {
      this.getTokenInstance.methods
        .isApprovedForAll(this.getUserAccount, contract.STAKING_ADDR)
        .call()
        .then((response) => {
          console.log("is approved? " + response);
          this.SET_APPROVAL(response);
          if (response) {
            this.getNfts();
          } else {
            this.loading = false;
          }
        });
    },

    onApproval() {
      this.getTokenInstance.methods
        .setApprovalForAll(contract.STAKING_ADDR, true)
        .send({
          from: this.getUserAccount,
          to: contract.TOKEN_ADDR,
        })
        .on("transactionHash", (hash) => {
          console.log("Transaction Hash: ", hash);
          this.txSubmitted = true;
          this.$moshaToast("Transaction has been submitted", {
            showIcon: "true",
            position: "top-center",
            timeout: 4000,
            type: "info",
            transition: "bounce",
            toastBackgroundColor: "#0ea5e9",
            hideProgressBar: "true",
          });
        })
        .on("receipt", (receipt) => {
          console.log("Receipt: ", receipt);
          this.txSubmitted = false;
          this.checkApproval();
          this.$moshaToast("Approval successful!", {
            showIcon: "true",
            position: "top-center",
            timeout: 4000,
            type: "success",
            transition: "bounce",
            hideProgressBar: "true",
          });
        })
        .on("error", (error) => {
          console.log("Error: ", error);
          this.txSubmitted = false;
          this.$moshaToast("Transaction Rejected", {
            showIcon: "true",
            position: "top-center",
            timeout: 4000,
            type: "danger",
            transition: "bounce",
            hideProgressBar: "true",
          });
        });
    },
    toggleLoading() {
      this.loading = false;
    },
    onStake() {
      let ids = [];
      if (this.selectedNfts.length) {
        ids = this.selectedNfts;
      } else {
        ids = this.getUnstakedBalance;
      }
      this.getStakingInstance.methods
        .deposit(ids)
        .send({
          from: this.getUserAccount,
          to: contract.STAKING_ADDR,
        })
        .on("transactionHash", (hash) => {
          console.log("Transaction Hash: ", hash);
          this.txSubmitted = true;
          this.SET_DISABLE_UNSTAKE_BUTTON(true);
          this.$moshaToast("Transaction has been submitted", {
            showIcon: "true",
            position: "top-center",
            timeout: 4000,
            type: "info",
            transition: "bounce",
            toastBackgroundColor: "#0ea5e9",
            hideProgressBar: "true",
          });
        })
        .on("receipt", (receipt) => {
          console.log("Receipt: ", receipt);
          this.checkBalance();
          this.SET_STAKED_RELOAD(true);
          this.$moshaToast("Stake successful!", {
            showIcon: "true",
            position: "top-center",
            timeout: 4000,
            type: "success",
            transition: "bounce",
            hideProgressBar: "true",
          });
        })
        .on("error", (error) => {
          console.log("Error: ", error);
          this.txSubmitted = false;
          this.loading = false;
          this.$moshaToast("Transaction Rejected", {
            showIcon: "true",
            position: "top-center",
            timeout: 4000,
            type: "danger",
            transition: "bounce",
            hideProgressBar: "true",
          });
        });
    },
    disableStakeButton(val) {
      if (val) {
        document
          .querySelector(".stake-btn")
          .classList.add("pointer-events-none", "opacity-50");
      } else {
        document
          .querySelector(".stake-btn")
          .classList.remove("pointer-events-none", "opacity-50");
      }
    },
    assignRarity(i) {
      switch (true) {
        case i <= 5:
          return 100;
        case i > 5 && i <= 10:
          return 80;
        case i > 10 && i <= 15:
          return 60;
        case i > 15 && i <= 20:
          return 40;
        case i > 20 && i <= 100:
          return 20;
      }
    },
  },
  computed: {
    ...mapGetters([
      "getUserAccount",
      "getWeb3",
      "getIsApproved",
      "getTokenInstance",
      "getStakingInstance",
      "getBalance",
      "getStakedReload",
      "getUnstakedReload",
      "getDisableStakeButton",
      "getUnstakedBalance",
    ]),
    sortedNfts() {
      return this.nfts.sort((a, b) => {
        return a.tokenId - b.tokenId;
      });
    },
  },
  watch: {
    getUnstakedReload(val) {
      if (val) {
        this.checkBalance();
        this.SET_UNSTAKED_RELOAD(false);
      }
    },
    getDisableStakeButton(val) {
      this.disableStakeButton(val);
    },
  },
  mounted() {
    this.checkBalance();
  },
};
</script>

<style>
.active {
  outline: 4px solid #8b5cf6;
  border-radius: 0.75rem;
}
.nft-card {
  transition: all 0.1s linear;
}
.disable {
  pointer-events: none;
  opacity: 50%;
}
@media (hover: hover) and (pointer: fine) {
  .nft-card:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
}
</style>
