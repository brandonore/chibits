<template>
  <div class="max-w-7xl mx-auto px-4 pb-8 sm:px-6 md:px-8">
    <h1 class="titles text-2xl text-left text-slate-500">Staking Dashboard</h1>
  </div>
  <div class="staking max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <!-- Replace with your content -->

    <div class="grid grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
      <div
        v-for="card in cards"
        :key="card.id"
        class=" rounded-lg"
        :class="card.bg"
      >
        <div
          class="flex items-center justify-evenly card-bg h-full w-full px-5 py-10"
        >
          <dl>
            <dt
              v-if="card.id === 1 && getBalance"
              class="text-3xl font-bold text-pink-chi truncate"
            >
              {{ getBalance }}
            </dt>
            <dt
              v-else-if="card.id === 1 && !getBalance"
              class="text-3xl font-bold text-pink-chi truncate"
            >
              0
            </dt>
            <dt
              v-else-if="card.id === 3"
              class="text-3xl font-bold text-pink-chi truncate"
            >
              {{ card.amount }}%
            </dt>
            <dt v-else class="text-3xl font-bold text-pink-chi truncate">
              {{ card.amount }}
            </dt>
            <dd>
              <div class="text-sm font-medium text-white">
                {{ card.title }}
              </div>
            </dd>
          </dl>
        </div>
      </div>
      <div
        class="flex card-4 overflow-hidden col-span-3 lg:col-span-2 rounded-lg"
      >
        <div class="flex items-center justify-evenly card-bg w-full px-5 py-10">
          <dl>
            <dt class="text-3xl font-bold text-pink-chi truncate">5500</dt>
            <dd>
              <div class="text-sm font-medium text-white">
                Claimable CHI Balance
              </div>
            </dd>
          </dl>
          <button
            type="button"
            class="w-1/3 p-3 text-center text-sm font-extrabold rounded-md text-[#DE14E9] bg-pink-chi transition-all linear hover:opacity-75"
          >
            Claim CHI
          </button>
        </div>
      </div>
    </div>

    <!-- staked nfts -->
    <div v-if="!getUserAccount" class="md:mt-8 pt-4">
      <div class="flex items-center justify-between pt-4 pb-8">
        <h1 class="titles text-2xl text-left text-slate-500">Staked NFTs</h1>
        <button
          type="button"
          class="p-3 w-1/3 md:w-1/6 text-md font-extrabold rounded-md text-white bg-gradient-to-tl from-pink-500 to-rose-500 hover:text-white transition-all linear hover:opacity-75"
        >
          Unstake
          <!-- <span v-if="selectedNfts.length">({{ selectedNfts.length }})</span> -->
        </button>
      </div>
    </div>
    <div v-if="getUserAccount && getWeb3">
        <StakedNfts />
      <!-- unstaked nfts -->
      <UnstakedNfts />
    </div>

    <div v-else class="py-24 mb-8 border-2 dark:border-slate-500 rounded-xl">
      <font-awesome-icon
        :icon="starIcon"
        class="text-orange-300 mx-auto h-12 w-12"
        aria-hidden="true"
      />
      <h1 class="mt-2 text-xl font-medium text-slate-500">
        Wallet disconnected
      </h1>
      <p class="mb-6 mt-1 text-sm text-slate-500">
        Connect your wallet to view your Chibits & start staking!
      </p>
      <ConnectWallet />
    </div>
    <!-- /End replace -->
  </div>
</template>

<script>
import ConnectWallet from "@/components/ConnectWallet.vue";
import StakedNfts from "@/components/StakedNfts.vue";
import { mapActions, mapGetters } from "vuex";
import Moralis from "../plugins/moralis";
import contract from "@/contracts/ABIs.json";
import UnstakedNfts from "../components/UnstakedNfts.vue";

export default {
  name: "StakingView",
  components: {
    ConnectWallet,
    StakedNfts,
    UnstakedNfts,
  },
  data() {
    return {
      starIcon: ["fas", "star-shooting"],
      spinnerIcon: ["fal", "spinner-third"],
      cards: [
        {
          id: 1,
          title: "Number of NFTs Owned",
          amount: null,
          icon: ["far", "hashtag"],
          bg: "card-1",
        },
        {
          id: 2,
          title: "CHI Earnings Per Day",
          amount: 350,
          icon: ["far", "coins"],
          bg: "card-2",
        },
        {
          id: 3,
          title: "Current Boost Amount",
          amount: 5,
          icon: ["far", "bolt"],
          bg: "card-3",
        },
      ],
      stakedReload: false,
      unstakedReload: false
    };
  },
  computed: {
    ...mapGetters(["getUserAccount", "getBalance", "getWeb3"]),
  },
};
</script>

<style>
.titles {
  font-family: "CeraBold", sans-serif;
  text-transform: uppercase;
}
.small-title {
  font-family: "CeraLight", sans-serif;
  text-transform: uppercase;
}
.card-1 {
    background-image: url('../assets/images/other/card-1a.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
.card-2 {
    background-image: url('../assets/images/other/card-2a.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
.card-3 {
    background-image: url('../assets/images/other/card-3a.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
.card-4 {
    background-image: url('../assets/images/other/card-4a.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
</style>
