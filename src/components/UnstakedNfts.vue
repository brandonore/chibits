<template>
  <div class="md:mt-8 px-4 pt-4 pb-0">
    <div class="flex items-center justify-between pt-4 pb-8">
      <h1 class="titles text-2xl text-left text-slate-500">Unstaked NFTs</h1>
      <span class="pr-5">{{ selectedNfts }}</span>
      <button
        type="button"
        class="p-3 w-1/3 md:w-1/6 text-md font-extrabold rounded-md text-white bg-gradient-to-l from-[#FFBE96] to-[#FE7096] transition-all linear hover:opacity-75"
      >
        Stake
        <span v-if="selectedNfts.length">({{ selectedNfts.length }})</span>
      </button>
    </div>
    <!-- staked container -->
    <div v-if="getUserAccount" class="bg-white rounded-xl p-8">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div
          v-for="nft in sortedNfts"
          :key="nft.tokenId"
          class="nft-card overflow-hidden"
        >
          <div
            class="flex-col relative items-center justify-evenly"
            :class="{ active: nft.active }"
            @click="getNftId(nft)"
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
    <!-- loading staked nfts -->
    <!-- <div v-else-if="!getUserAccount" class="py-24">
        <font-awesome-icon
          :icon="spinnerIcon"
          class="text-slate-400 mx-auto h-12 w-12 animate-spin"
          aria-hidden="true"
        />
        <h1 class="mt-2 text-xl font-medium text-slate-400">
          Fetching Chibits ⭐ ...
        </h1>
      </div> -->
    <!-- no staked nfts -->
    <div v-else class="py-24 border-2 rounded-xl">
      <font-awesome-icon
        :icon="starsIcon"
        class="text-slate-400 mx-auto h-12 w-12"
        aria-hidden="true"
      />
      <h1 class="mt-2 text-xl font-medium text-slate-500">
        No Chibits found!
      </h1>
      <p class="mb-6 mt-1 text-sm text-slate-500">
        Visit the official OpenSea collection
      </p>
    </div>
  </div>
</template>

<script>
import Moralis from "../plugins/moralis";
import contract from "@/contracts/ABIs.json";
import { mapActions, mapGetters } from "vuex";
import { computeAddress } from "@ethersproject/transactions";

export default {
  name: "StakedNfts",
  data() {
    return {
      nfts: [],
      selectedNfts: [],
      checkedIcon: ["fas", "circle-check"],
      starsIcon: ["fas", "stars"],
    };
  },
  methods: {
    ...mapActions(["SET_NFTS"]),

    async getNfts() {
      const tokenAddr = contract.TOKEN_ADDR;
      const options = {
        chain: "rinkeby",
        address: this.getUserAccount,
        token_address: tokenAddr,
      };
      let nfts = await Moralis.Web3API.account.getNFTsForContract(options);
      let x = new Promise((resolve, reject) => {
        if (nfts.result.length > 0) {
          nfts.result.forEach((n) => {
            let metadata = JSON.parse(n.metadata);
            let url = this.fixUrl(metadata.image);
            this.nfts.push({
              tokenId: metadata.edition,
              url,
            });
            if (this.nfts.length === nfts.result.length) resolve();
          });
        }
      });
      x.then(() => {
        this.SET_NFTS(this.nfts);
      });
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
  },
  computed: {
    ...mapGetters(["getUserAccount"]),
    sortedNfts() {
        return this.nfts.sort((a, b) => {
           return a.tokenId - b.tokenId
        })
    }
  },
  mounted() {
    this.getNfts();
  },
};
</script>

<style scoped>
.active {
  border: 4px solid #8b5cf6;
  border-radius: 3%;
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
