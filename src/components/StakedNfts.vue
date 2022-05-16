<template>
  <div class="md:mt-8 pt-4 mb-8">
    <div class="flex items-center justify-between pt-4 pb-8">
      <h1 class="titles text-2xl text-left text-slate-500">
        Staked NFTs ({{ getStakedBalance.length }})
        <div class="tooltip">
          <font-awesome-icon class="text-slate-500 h-5 pl-2" :icon="infoIcon" />
          <div class="right p-5">
            <h3 class="text-2xl pb-2 font-bold text-center">About Staking</h3>
            <p class="text-sm normal-case text-center">
              Chibits are "staked" in the vault and will generate $CHI per day.
              This means that the vault address will be shown as the "owner"
              while staked, and unstaking will move them back to your wallet.
              You will maintain full ownership, but they will not show up in
              your wallet while staked.
            </p>
            <i></i>
          </div>
        </div>
      </h1>
      <button
        v-if="!txSubmitted"
        @click.prevent="onUnstake"
        type="button"
        class="unstake-btn p-3 w-1/3 rounded-sm md:w-1/6 text-md font-extrabold text-white bg-gradient-to-tl from-pink-500 to-rose-500 transition-all linear hover:opacity-75"
      >
        <span v-if="!selectedNfts.length">Unstake All</span>
        <span v-else>Unstake ({{ selectedNfts.length }})</span>
      </button>
      <button
        v-else
        type="button"
        disabled
        class="cursor-not-allowed disabled:opacity-50 inline-flex justify-center items-center p-3 w-1/3 md:w-1/6 text-md font-extrabold rounded-md text-white bg-gradient-to-tl from-pink-500 to-rose-500 transition-all linear hover:opacity-75"
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
        Unstaking...
      </button>
    </div>
    <!-- unstaked nfts -->
    <div v-if="getUserAccount && stakedNfts.length && !txSubmitted">
      <div
        class="unstaked-container rounded-lg grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
      >
        <div
          v-for="nft in sortedNfts"
          :key="nft.tokenId"
          :class="{ active: nft.active }"
          @click="!txSubmitted && getNftId(nft)"
          class="rounded-lg nft-card bg-white pb-3 dark:bg-slate-800 overflow-hidden"
        >
          <div class="flex-col relative items-center justify-evenly">
            <span
              v-show="nft.active"
              class="absolute top-2 right-2 text-violet-500"
            >
              <font-awesome-icon class="h-6 w-6" :icon="checkedIcon"
            /></span>
            <img
              :src="nft.url"
              class="rounded-tl-lg rounded-tr-lg nft-img w-full"
            />

            <div class="flex-col p-2 items-center justify-evenly">
              <h1 class="small-title pb-1 text-md text-slate-500">
                hana //
                <span class="text-lg cera-bold">NO. {{ nft.tokenId }}</span>
              </h1>
              <div class="small-title text-md">
                <span
                  class="inline-flex items-center px-3 py-0.5 rounded-lg text-sm cera-bold dark:bg-slate-500 dark:text-slate-800 bg-emerald-100 text-emerald-600"
                  >{{ nft.reward }} $CHI per day</span
                >
              </div>
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
      v-else-if="getUserAccount && !stakedNfts.length"
      class="py-24 border-2 dark:border-slate-500 rounded-xl"
    >
      <font-awesome-icon
        :icon="starsIcon"
        class="text-slate-400 mx-auto h-12 w-12"
        aria-hidden="true"
      />
      <h1 class="mt-2 text-xl font-medium text-slate-500">
        No Chibits Staked!
      </h1>
      <p class="mb-6 mt-1 text-sm text-slate-500">
        Select your chibits to stake
      </p>
    </div>
  </div>
</template>

<script>
import contract from "@/contracts/ABIs.json";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "StakedNfts",
  data() {
    return {
      stakedNfts: [],
      selectedNfts: [],
      isApproved: false,
      checkedIcon: ["fas", "circle-check"],
      starsIcon: ["fas", "stars"],
      starIcon: ["fas", "star"],
      infoIcon: ["far", "circle-info"],
      txSubmitted: false,
      loading: true,
      disableBtn: false,
    };
  },
  methods: {
    ...mapActions([
      "SET_APPROVAL",
      "SET_STAKED_RELOAD",
      "SET_UNSTAKED_RELOAD",
      "SET_DISABLE_STAKE_BUTTON",
      "SET_DISABLE_UNSTAKE_BUTTON",
      "SET_STAKED_BALANCE",
    ]),

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
    getStakedTokens() {
      this.getStakingInstance.methods
        .depositsOf(this.getUserAccount)
        .call({
          from: this.getUserAccount,
        })
        .then((tokenIds) => {
          this.stakedNfts = [];
          this.selectedNfts = [];
          this.txSubmitted = false;
          this.SET_DISABLE_UNSTAKE_BUTTON(false);
          this.SET_STAKED_BALANCE(tokenIds);
          console.log("staked tokens: " + tokenIds);
          if (tokenIds.length) {
            tokenIds.forEach((n) => {
              this.stakedNfts.push({
                tokenId: JSON.parse(n),
                url: require(`../assets/images/nfts/${n}.png`),
                reward: this.assignRarity(n),
              });
            });
          } else {
            this.loading = false;
          }
        });
    },
    onUnstake() {
      let ids = [];
      if (this.selectedNfts.length) {
        ids = this.selectedNfts;
      } else {
        ids = this.getStakedBalance;
      }
      this.getStakingInstance.methods
        .withdraw(ids)
        .send({
          from: this.getUserAccount,
          to: contract.STAKING_ADDR,
        })
        .on("transactionHash", (hash) => {
          console.log("Transaction Hash: ", hash);
          this.txSubmitted = true;
          this.SET_DISABLE_STAKE_BUTTON(true);
          this.$moshaToast("Transaction has been submitted", {
            showIcon: "true",
            position: "top-center",
            timeout: 4000,
            type: "info",
            transition: "bounce",
            toastBackgroundColor: "#0ea5e9",
            hideProgressBar: true,
          });
        })
        .on("receipt", (receipt) => {
          console.log("Receipt: ", receipt);
          this.SET_UNSTAKED_RELOAD(true);
          this.getStakedTokens();
          this.$emit("updateUnclaimedBalance");
          this.$moshaToast("Unstake successful!", {
            showIcon: "true",
            position: "top-center",
            timeout: 4000,
            type: "success",
            transition: "bounce",
            hideProgressBar: true,
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
            hideProgressBar: true,
          });
        });
    },
    disableUnstakeButton(val) {
      if (val) {
        document
          .querySelector(".unstake-btn")
          .classList.add("pointer-events-none", "opacity-50");
      } else {
        document
          .querySelector(".unstake-btn")
          .classList.remove("pointer-events-none", "opacity-50");
      }
    },
    getTokenReward(id) {
      this.getStakingInstance.methods
        .tokenRarity(id)
        .call()
        .then((reward) => {
          return reward;
        });
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
      "getTokenInstance",
      "getStakingInstance",
      "getStakedReload",
      "getUnstakedReload",
      "getDisableUnstakeButton",
      "getStakedBalance",
      "getRarity",
    ]),
    sortedNfts() {
      return this.stakedNfts.sort((a, b) => {
        return a.tokenId - b.tokenId;
      });
    },
  },
  mounted() {
    this.getStakedTokens();
  },
  watch: {
    getStakedReload(val) {
      if (val) {
        this.getStakedTokens();
        this.SET_STAKED_RELOAD(false);
      }
    },
    getDisableUnstakeButton(val) {
      this.disableUnstakeButton(val);
    },
  },
};
</script>

<style>
.tooltip {
  display: inline-block;
  position: relative;
  text-align: left;
}

.tooltip .right {
  min-width: 400px;
  top: 40px;
  left: 50%;
  margin-left: 10px;
  transform: translate(-50%, 0);
  color: #ffffff;
  background-color: #334155ea;
  /* border-left: 6px solid #7c3aed; */
  border-radius: 0.75rem;
  position: absolute;
  z-index: 99999999;
  box-sizing: border-box;
  display: none;
}

.tooltip:hover .right {
  display: block;
}

.tooltip .right i {
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -12px;
  width: 24px;
  height: 12px;
  overflow: hidden;
}

.tooltip .right i::after {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  left: 50%;
  transform: translate(-50%, 50%) rotate(45deg);
  background-color: #334155ea;
  border: 1px solid transparent;
}
</style>
