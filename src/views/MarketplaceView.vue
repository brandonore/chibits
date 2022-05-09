<template>
  <div class="max-w-7xl mx-auto px-4 pt-6 pb-8 sm:px-6 md:px-8">
    <h1 class="titles text-2xl text-left text-slate-500">Marketplace</h1>
  </div>
  <div class="staking max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <!-- Replace with your content -->

    <div class="grid grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
      <div
        v-for="item in marketplace"
        :key="item.id"
        class="rounded-lg"
      >
        <div
          class="flex items-center justify-evenly card-bg h-full w-full px-5 py-10"
        >

        </div>
      </div>
    </div>
    
    <!-- /End replace -->
  </div>
</template>

<script>
import Web3 from "web3";
import contract from "@/contracts/ABIs.json";
import { mapActions, mapGetters } from "vuex";
// import {db, storage} from '@/firebase'
// import {onSnapshot, collection, getDoc, getDocs, QuerySnapshot } from "firebase/firestore";
// const collectionRef = await getDocs(collection(db, 'chibitsraffle/doc/'))
export default {
  name: "StakingView",
  components: {

  },
  data() {
    return {
      starIcon: ["fas", "star-shooting"],
      spinnerIcon: ["fal", "spinner-third"],
      interval: null,
      txSubmitted: false,
      marketplace: []
    };
  },
  methods: {
      getMarketplaceItems() {
          let data = []
        //   onSnapshot(collectionRef, (querySnapshot) => {
        //       querySnapshot.forEach((doc) => {
        //           console.log(doc.id)
        //       })
        //   })
      }
  },
  watch: {

  },
  computed: {
    ...mapGetters([
      "getUserAccount",
      "getBalance",
      "getStakedBalance",
      "getWeb3",
      "getStakingInstance",
    ]),
  },
  mounted() {
      this.getMarketplaceItems()
  }, 
  destroyed() {
    clearInterval(this.interval);
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
  /* text-transform: uppercase; */
}
</style>
