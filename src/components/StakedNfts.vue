<template>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
</template>

<script>
import Moralis from "../plugins/moralis";
import contract from "@/contracts/ABIs.json";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "StakedNfts",
  data() {
    return {
      nfts: [],
            checkedIcon: ["fas", "circle-check"],
    };
  },
  methods: {
      ...mapActions([
      "SET_SELECTED_NFTS",
      "REMOVE_SELECTED_NFTS"
    ]),
    async getNfts() {
      const tokenAddr = contract.TOKEN_ADDR
      const options = {
        chain: "rinkeby",
        address: this.getUserAccount,
        token_address: tokenAddr,
      };
      let nfts = await Moralis.Web3API.account.getNFTsForContract(options)
      if (nfts.result.length > 0) {
        nfts.result.forEach((n) => {
          let metadata = JSON.parse(n.metadata)
          let url = this.fixUrl(metadata.image)
          this.nfts.push({
            tokenId: metadata.edition,
            url,
          });
        });
      }
    },
    fixUrl(url) {
      if (url.startsWith("ipfs")) {
        return (
          "https://ipfs.moralis.io:2053/ipfs/" + url.split("ipfs://").slice(-1)
        );
      } else {
        return url + "?format=json"
      }
    },
    getNftId(nft) {
      nft.active = !nft.active
      if (nft.active) {
        this.SET_SELECTED_NFTS(nft.tokenId)
      } else {
          this.REMOVE_SELECTED_NFTS(nft.tokenId)
        // this.nftsSelected = this.nftsSelected.filter(
        //   (value) => value !== nft.tokenId
        // );
      }
    },
  },
    computed: {
    ...mapGetters(["getUserAccount"]),
  },
  mounted() {
    this.getNfts()
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
