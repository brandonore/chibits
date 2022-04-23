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
        class="overflow-hidden rounded-lg"
        :class="card.bg"
      >
        <div
          class="flex items-center justify-evenly card-bg h-full w-full px-5 py-10"
        >
          <dl>
            <dt
              v-if="card.id !== 3"
              class="text-3xl font-bold text-pink-chi truncate"
            >
              {{ card.amount }}
            </dt>
            <dt v-else class="text-3xl font-bold text-pink-chi truncate">
              {{ card.amount }}%
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
        <!-- <div class="icon-box p-2 rounded-md flex-shrink-0">
              <font-awesome-icon
                class="h-6 w-6"
                :icon="card.icon"
              />
            </div> -->
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
            @click="nftCount(nfts)"
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
        <span>{{ nftsSelected }}</span>
        <button
          type="button"
          class="p-3 w-1/3 md:w-1/6 text-md font-extrabold rounded-md text-white bg-gradient-to-l from-[#FFBE96] to-[#FE7096] transition-all linear hover:opacity-75"
        >
          Unstake
          <span v-if="nftsSelected.length">({{ nftsSelected.length }})</span>
        </button>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="nft in nfts"
          :key="nft.tokenId"
          class="nft-card overflow-hidden"
        >
          <div
            class="flex-col relative items-center justify-evenly"
            :class="{ active: nft.active }"
            @click="getNftId(nft)"
          >
            <span v-show="nft.active" class="absolute top-2 right-2 text-violet-500">
              <font-awesome-icon class="h-6 w-6" :icon="checkedIcon"
            /></span>
            <img
              :src="require(`../assets/images/nfts/${nft.tokenId}.png`)"
              class="rounded-lg nft-img w-full"
            />
          </div>
          <div class="flex p-2 items-center justify-evenly">
            <h1 class="small-title text-sm text-slate-400">
              chibits //
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
    <!-- /End replace -->
  </div>
</template>

<script>
import { isTemplateNode } from "@vue/compiler-core";

export default {
  name: "StakingView",
  components: {},
  data() {
    return {
      nfts: [
        { tokenId: 0 },
        { tokenId: 1 },
        { tokenId: 2 },
        { tokenId: 3 },
        { tokenId: 4 },
        { tokenId: 5 },
        { tokenId: 6 },
        { tokenId: 7 },
        { tokenId: 8 },
      ],
      nftsSelected: [],
      isLoaded: false,
      checkedIcon: ["fas", "circle-check"],
      cards: [
        {
          id: 1,
          title: "Number of NFTs Owned",
          amount: 0,
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
  computed: {
    nftCount() {
      return this.nfts.length;
    },
  },
  methods: {
    getNftId(event) {
      let nft = this.nfts[event.tokenId];
      nft.active = !nft.active;
      if (nft.active) {
        this.nftsSelected.push(nft.tokenId);
      } else {
        this.nftsSelected = this.nftsSelected.filter(
          (value) => value !== nft.tokenId
        );
      }
    },
  },
  created() {
    this.cards[0].amount = this.nftCount;
  },
};
</script>

<style scoped>
.staking {
}
.titles {
  font-family: "CeraBold", sans-serif;
  text-transform: uppercase;
}
.small-title {
  font-family: "CeraLight", sans-serif;
  text-transform: uppercase;
}
.active:before {
  /* content: 'selected';
    color: #9c57ff; */
}
.active {
  border: 4px solid #8b5cf6;
;
  border-radius: 3%;
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
.nft-card {
  transition: all 0.1s linear;
}
@media (hover: hover) and (pointer: fine) {
  .nft-card:hover {
    max-width: 300px;
    cursor: pointer;
    transform: scale(1.1);
  }
}
</style>
