<template>
  <div class="max-w-7xl mx-auto px-4 pt-6 pb-8 sm:px-6 md:px-8">
    <h1 class="titles text-2xl text-left text-slate-500">Staking Dashboard</h1>
  </div>
  <div class="staking max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <!-- Replace with your content -->

    <div class="grid grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
      <div
        v-for="card in cards"
        :key="card.id"
        class="rounded-lg"
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
              <span
                v-if="!getUserAccount"
                >0</span
              >
              <span v-else-if="getBalance && !getStakedBalance">
                  {{ getBalance }}
              </span>
              <span v-else-if="!getBalance && getStakedBalance">
                  {{ getStakedBalance.length }}
              </span>
              <span v-else>{{
                Number(getBalance) + Number(getStakedBalance.length)
              }}</span>
            </dt>
            <dt
              v-if="card.id === 2"
              class="text-3xl font-bold text-pink-chi truncate"
            >
              <span v-if="getStakedBalance.length >= 5"> 5% </span>
              <span v-else> 0% </span>
            </dt>
            <dt
              v-if="card.id === 3"
              class="text-3xl font-bold text-pink-chi truncate"
            >
              {{ Math.trunc(totalRewards) }}
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
            <dt class="text-3xl font-bold text-pink-chi truncate">
              {{ totalUnclaimedRewards }}
            </dt>
            <dd>
              <div class="text-sm font-medium text-white">
                Claimable CHI Balance<br>
                <span class="italic">(CHI auto-claims when you unstake)</span>
              </div>
            </dd>
          </dl>
                    <button
          v-if="!getUserAccount"
            type="button"
            class="w-1/3 p-3 text-center text-sm font-extrabold rounded-md text-[#DE14E9] bg-pink-chi transition-all linear hover:opacity-75"
          >
            Claim CHI
          </button>
          <button
          v-else-if="getUserAccount && !txSubmitted"
            @click.prevent="claimRewards"
            type="button"
            class="w-1/3 p-3 text-center text-sm font-extrabold rounded-md text-[#DE14E9] bg-pink-chi transition-all linear hover:opacity-75"
          >
            Claim CHI
          </button>
          <button
          v-else
          disabled
            type="button"
            class="cursor-not-allowed disabled:opacity-75 inline-flex justify-center items-center w-1/3 p-3 text-center text-sm font-extrabold rounded-md text-[#DE14E9] bg-pink-chi transition-all linear"
          >
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-[#DE14E9]"
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
            Claiming...
          </button>
        </div>
      </div>
    </div>

    <!-- staked nfts -->
    <div v-if="!getUserAccount" class="md:mt-8 pt-4">
      <div class="flex items-center justify-between pt-4 pb-8">
        <h1 class="titles text-2xl text-left text-slate-500">Owned NFTs</h1>
        <button
          type="button"
          class="p-3 w-1/3 md:w-1/6 text-md font-extrabold rounded-md text-white bg-gradient-to-tl from-pink-500 to-rose-500 hover:text-white transition-all linear hover:opacity-75"
        >
          Stake
          <!-- <span v-if="selectedNfts.length">({{ selectedNfts.length }})</span> -->
        </button>
      </div>
    </div>
    <div v-if="getUserAccount && getWeb3">
      <StakedNfts @updateUnclaimedBalance="calcCurrentRewards" />
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
import Web3 from "web3";
import contract from "@/contracts/ABIs.json";
import ConnectWallet from "@/components/ConnectWallet.vue";
import StakedNfts from "@/components/StakedNfts.vue";
import { mapActions, mapGetters } from "vuex";
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
          title: "Total Chibits Owned",
          icon: ["far", "hashtag"],
          bg: "card-1",
        },
        {
          id: 2,
          title: "Current Boost Amount",
          icon: ["far", "coins"],
          bg: "card-2",
        },
        {
          id: 3,
          title: "Total CHI Earnings Per Day",
          icon: ["far", "bolt"],
          bg: "card-3",
        },
      ],
      stakedReload: false,
      unstakedReload: false,
      totalTokens: 0,
      tokenRewards: [],
      totalRewards: 0,
      totalUnclaimedRewards: 0,
      interval: null,
      txSubmitted: false,
    };
  },
  methods: {
    assignRarity() {
      this.tokenRewards = [];
      this.getStakedBalance.forEach((i) => {
        switch (true) {
          case i <= 5:
            this.tokenRewards.push({
              stakedId: i,
              rarity: 0,
              rewardPerDay: 100,
            });
            break;
          case i > 5 && i <= 10:
            this.tokenRewards.push({
              stakedId: i,
              rarity: 1,
              rewardPerDay: 80,
            });
            break;
          case i > 10 && i <= 15:
            this.tokenRewards.push({
              stakedId: i,
              rarity: 2,
              rewardPerDay: 60,
            });
            break;
          case i > 15 && i <= 20:
            this.tokenRewards.push({
              stakedId: i,
              rarity: 3,
              rewardPerDay: 40,
            });
            break;
          case i > 20 && i <= 25:
            this.tokenRewards.push({
              stakedId: i,
              rarity: 4,
              rewardPerDay: 20,
            });
            break;
        }
      });
      this.getTotalRewards();
    },
    getTotalRewards() {
      let result = 0;
      this.tokenRewards.forEach((n) => {
        result += n.rewardPerDay;
      });
      this.totalRewards = result;
    },
    calcCurrentRewards() {
      const ids = this.getStakedBalance;
      this.getStakingInstance.methods
        .calculateRewards(this.getUserAccount, ids)
        .call({
          from: this.getUserAccount,
        })
        .then((rewards) => {
          let result = 0;
          rewards.forEach((n) => {
            let x = Web3.utils.fromWei(n.toString(), "ether");
            let y = x.substring(0, 6);
            let z = Number(y);
            result += z;
          });
          if (this.getStakedBalance.length >= 5) {
            let total = result * 0.05 + result;
            this.totalUnclaimedRewards = total.toFixed(3);
          } else {
            this.totalUnclaimedRewards = result.toFixed(3);
          }
        });
    },
    startIntervalRewards() {
      this.interval = setInterval(() => {
        this.calcCurrentRewards();
      }, 15000);
    },
    claimRewards() {
      const ids = this.getStakedBalance;
      this.getStakingInstance.methods
        .claimRewards(ids)
        .send({
          from: this.getUserAccount,
          to: contract.STAKING_ADDR,
        })
        .on("transactionHash", (hash) => {
          console.log(hash);
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
          this.txSubmitted = false;
          this.calcCurrentRewards()
          this.$moshaToast("Claim successful!", {
            showIcon: "true",
            position: "top-center",
            timeout: 4000,
            type: "success",
            transition: "bounce",
            hideProgressBar: "true",
          });
        })
        .on("error", (error) => {
          this.txSubmitted = false;
          console.log("Error receipt: ", error);
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
  },
  watch: {
    getStakedBalance(val) {
      if (val) {
        this.assignRarity();
        this.calcCurrentRewards();
        this.startIntervalRewards();
      }
    },
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
.card-1 {
  background-image: url("../assets/images/other/card-1a.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.card-2 {
  background-image: url("../assets/images/other/card-2a.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.card-3 {
  background-image: url("../assets/images/other/card-3a.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.card-4 {
  background-image: url("../assets/images/other/card-4a.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
