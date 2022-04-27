<template>
  <div class="max-w-7xl mx-auto px-4 pb-8 sm:px-6 md:px-8">
    <h1 class="titles text-2xl text-left text-slate-500">Staking Dashboard</h1>
  </div>
  <div
    v-if="getUserAccount"
    class="staking max-w-7xl mx-auto px-4 sm:px-6 md:px-8"
  >
    <!-- Replace with your content -->

    <div class="grid grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
      <div
        v-for="card in cards"
        :key="card.id"
        class="overflow-hidden rounded-lg"
        :class="card.bg"
      >
        <div
          class="flex items-center justify-evenly card-bg h-full w-full px-5 py-10"
        >
          <dl>
            <dt
              v-if="card.id === 1"
              class="text-3xl font-bold text-pink-chi truncate"
            >
              <!-- {{ nftCount }} -->
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
        class="flex bg-gradient-to-r from-[#D88BFF] to-[#9C57FF] overflow-hidden col-span-3 lg:col-span-2 rounded-lg"
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
            class="w-1/3 p-3 text-center text-sm font-extrabold rounded-md text-[#B57DFF] bg-pink-chi transition-all linear hover:opacity-75"
          >
            Claim CHI
          </button>
        </div>
      </div>
    </div>

    <!-- nft container -->
    <div class="md:mt-8 p-4">
      <div class="flex items-center justify-between pt-4 pb-8">
        <h1 class="titles text-2xl text-left text-slate-500">Staked NFTs</h1>
        <span class="pr-5">{{ getSelectedNfts }}</span>
        {{ getUserAccount }}
        <button
          type="button"
          class="p-3 w-1/3 md:w-1/6 text-md font-extrabold rounded-md text-white bg-gradient-to-l from-[#FFBE96] to-[#FE7096] transition-all linear hover:opacity-75"
        >
          Unstake
          <span v-if="getSelectedNfts.length">({{ getSelectedNfts.length }})</span>
        </button>
      </div>
      <!-- staked container -->
      <div v-if="getUserAccount">
        <StakedNfts />
      </div>
    </div>
    <!-- /End replace -->
  </div>
  <div v-else>
    <font-awesome-icon
      :icon="starIcon"
      class="text-orange-300 mx-auto h-12 w-12"
      aria-hidden="true"
    />
    <h3 class="mt-2 text-lg font-medium text-slate-500">Wallet disconnected</h3>
    <p class="mb-6 mt-1 text-sm text-slate-500">
      Connect your wallet to view your Chibits & start staking!
    </p>
    <ConnectWallet />
  </div>
</template>

<script>
import ConnectWallet from "@/components/ConnectWallet.vue";
import StakedNfts from "@/components/StakedNfts.vue";
import { mapActions, mapGetters } from "vuex";
import Moralis from "../plugins/moralis";
import contract from "@/contracts/ABIs.json";

export default {
  name: "StakingView",
  components: {
    ConnectWallet,
    StakedNfts,
  },
  data() {
    return {
      nfts: [],
      nftsSelected: [],
      staked_tokens: null,
      isLoaded: false,
      starIcon: ["fal", "star-shooting"],
      cards: [
        {
          id: 1,
          title: "Number of NFTs Owned",
          amount: null,
          icon: ["far", "hashtag"],
          bg: "bg-gradient-to-r from-[#FFBE96] to-[#FE7096]",
        },
        {
          id: 2,
          title: "CHI Earnings Per Day",
          amount: 350,
          icon: ["far", "coins"],
          bg: "bg-gradient-to-r from-[#8FCAF9] to-[#047EDF]",
        },
        {
          id: 3,
          title: "Current Boost Amount",
          amount: 5,
          icon: ["far", "bolt"],
          bg: "bg-gradient-to-r from-[#84D9D2] to-[#07CDAE]",
        },
      ],
    };
  },
  methods: {

  },
  computed: {
    ...mapGetters(["getUserAccount", "getSelectedNfts"]),
    nftCount() {
      return this.nfts.length;
    },
  },
};
</script>

<style scoped>
.staking {
  height: 100vh;
}
.titles {
  font-family: "CeraBold", sans-serif;
  text-transform: uppercase;
}
.small-title {
  font-family: "CeraLight", sans-serif;
  text-transform: uppercase;
}
.icon-box {
  background-color: #e3008c33;
  color: #e3008c;
}
.card-bg {
  background-image: url("../assets/images/other/circles.svg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
