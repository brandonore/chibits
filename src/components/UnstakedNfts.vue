<template>
  <div class="md:mt-8 pt-4 mb-8">
    <div class="flex items-center justify-between pt-4 pb-8">
      <h1 class="titles text-2xl text-left text-slate-500">Unstaked NFTs</h1>
      <span class="pr-5">{{ selectedNfts }}</span>
      <button
        v-if="!txSubmitted"
        @click.prevent="onStake"
        type="button"
        class="p-3 w-1/3 md:w-1/6 text-md font-extrabold rounded-md text-white bg-gradient-to-tl from-pink-500 to-rose-500 transition-all linear hover:opacity-75"
      >
        <span v-if="!selectedNfts.length">Stake All</span>
        <span v-else>Stake ({{ selectedNfts.length }})</span>
      </button>
      <button
        v-else
        type="button"
        disabled
        class="cursor-not-allowed disabled:opacity-75 inline-flex justify-center items-center p-3 w-1/3 md:w-1/6 text-md font-extrabold rounded-md text-white bg-gradient-to-tl from-pink-500 to-rose-500 transition-all linear hover:opacity-75"
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
          class="rounded-lg nft-card overflow-hidden"
        >
          <div
            class="flex-col relative items-center justify-evenly"
            :class="{ active: nft.active }"
            @click="!txSubmitted && getNftId(nft)"
          >
            <span
              v-show="nft.active"
              class="absolute top-2 right-2 text-violet-500"
            >
              <font-awesome-icon class="h-6 w-6" :icon="checkedIcon"
            /></span>
            <img :src="nft.url" class="rounded-lg nft-img w-full" />
          </div>
          <div class="flex p-2 items-center justify-evenly">
            <h1 class="small-title text-sm text-slate-400">
              hana //
              <span class="text-lg font-bold">NO. {{ nft.tokenId }}</span>
            </h1>
            <a
              class="w-1/12 transition-all duration-200 hover:opacity-75"
              href="https://opensea.io"
            >
              <img class="" src="../assets/icons/opensea.svg" alt="" />
            </a>
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
        class="text-slate-400 mx-auto h-12 w-12 animate-spin"
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
        class="inline-flex justify-center items-center p-3 w-1/3 md:w-1/6 text-md font-extrabold rounded-md text-white bg-gradient-to-tl from-pink-500 to-rose-500 transition-all linear hover:opacity-75"
      >
        Approve
      </button>
      <button
        v-else
        type="button"
        disabled
        class="cursor-not-allowed disabled:opacity-75 inline-flex justify-center items-center p-3 w-1/3 md:w-1/6 text-md font-extrabold rounded-md text-white bg-gradient-to-tl from-pink-500 to-rose-500 transition-all linear hover:opacity-75"
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
import { createAlchemyWeb3 } from '@alch/alchemy-web3'

export default {
  name: "StakedNfts",
  data() {
    return {
      nfts: [],
      selectedNfts: [],
      isApproved: false,
      checkedIcon: ["fas", "circle-check"],
      starsIcon: ["fas", "stars"],
      starIcon: ["fas", "star"],
      txSubmitted: false,
      loading: true,
    };
  },
  methods: {
    ...mapActions(["SET_APPROVAL", "SET_BALANCE", "SET_STAKED_RELOAD", "SET_UNSTAKED_RELOAD"]),

    async getNfts() {
      const tokenAddr = contract.TOKEN_ADDR;
      const aWeb3 = createAlchemyWeb3(process.env.VUE_APP_ALCHEMY_SERVER_URL + process.env.VUE_APP_ALCHEMY_API_KEY)
      this.txSubmitted = false
      let nfts = await aWeb3.alchemy.getNfts({
          owner: this.getUserAccount,
          contractAddresses: [tokenAddr],
          withMetadata: true
      })
      nfts.ownedNfts.forEach((n) => {
          let id = Number(n.id.tokenId)
          this.nfts.push({
              tokenId: id,
              url: require(`../assets/images/nfts/${id}.png`)
          })
      })
    },

    fixUrl(url) {
      if (url.startsWith("ipfs")) {
        return (
          "https://ipfs.moralis.io:2053/ipfs/" + url.split("ipfs://").slice(-1)
        );
      } else {
        return url + "?format=json";
      }
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
          this.SET_BALANCE(response);
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
          });
        })
        .on("receipt", (receipt) => {
          console.log("Receipt: ", receipt);
          this.txSubmitted = false;
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
        });
    },
    toggleLoading() {
      this.loading = false;
    },
    onStake() {
      const ids = this.selectedNfts;
      this.getStakingInstance.methods
        .deposit(ids)
        .send({
          from: this.getUserAccount,
          to: contract.STAKING_ADDR,
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
          });
        })
        .on("receipt", (receipt) => {
          console.log("Receipt: ", receipt);
          this.checkBalance();
          this.SET_STAKED_RELOAD(true)
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
        });
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
      "getUnstakedReload"
    ]),
    sortedNfts() {
      return this.nfts.sort((a, b) => {
        return a.tokenId - b.tokenId;
      });
    },
  },
  mounted() {
    this.checkBalance();
  },
};
</script>

<style>
.active {
  border: 4px solid #8b5cf6;
  border-radius: 0.75rem;
}
.nft-card {
  transition: all 0.1s linear;
}
@media (hover: hover) and (pointer: fine) {
  .nft-card:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
}
</style>
