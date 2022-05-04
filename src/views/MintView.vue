<template>
  <div
    class="mint mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-center"
  >
    <!-- Replace with your content -->
    <div
      class="mint-container relative flex flex-col justify-center h-2/3 md:h-1/2 w-full max-w-7xl"
    >
      <div v-if="getUserAccount" class="justify-end absolute top-6 right-6">
        <ConnectWallet />
      </div>
      <!-- title -->
      <div class="title text-7xl mb-16 text-white">Mint Chibits</div>
      <!-- steps -->

      <!-- buttons -->
      <div class="flex items-center px-8 md:px-12 justify-center">
        <div
          v-if="!getUserAccount"
          class="relative mr-6 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
        >
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <font-awesome-icon
              :icon="['fab', 'ethereum']"
              class="text-[#524B93] mx-auto h-6 w-4"
              aria-hidden="true"
            />
          </div>
          <input
            type="text"
            pattern="#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?"
            v-model="checkAddress"
            class="focus:ring-rose-500 focus:border-rose-500 block w-full pl-10 py-2.5 sm:text-sm border-gray-300"
            placeholder="enter address 0x..."
          />
        </div>
        <button
          @click.prevent="checkWhitelisted(checkAddress)"
          type="button"
          class="p-2 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 text-md font-medium text-white border-2 border-white transition-all linear hover:bg-white hover:text-slate-500"
        >
          Check Whitelist
        </button>
      </div>

      <div class="mt-8 px-12 flex justify-center">
        <ConnectWallet v-if="!getUserAccount" />
        <button
          v-if="getUserAccount && getWeb3"
          @click.prevent=""
          type="button"
          class="inline-flex items-center justify-center p-2 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 border-2 border-rose-500 text-md font-medium hover:opacity-75 text-white transition-all linear bg-gradient-to-tl from-pink-500 to-rose-500"
        >
          <font-awesome-icon
            :icon="['fas', 'star']"
            class="-ml-1 mr-2 h-5 w-5"
            aria-hidden="true"
          />
          Mint
        </button>
      </div>
      <!-- notifications -->
      <div
        :style="{
          visibility:
            walletNotification === 'success' || walletNotification === 'error'
              ? 'visible'
              : 'hidden',
        }"
      >
        <Transition name="fade">
          <div
            class="notification flex w-full justify-center"
          >
            <div
              :style="{
                visibility:
                  walletNotification === 'success' ||
                  walletNotification === 'error'
                    ? 'visible'
                    : 'hidden',
              }"
              class="pt-8 w-1/4 h-1"
            >
              <div v-if="walletNotification === 'success'" class="rounded-sm py-2 bg-emerald-50 border-l-4 border-emerald-400">
                <div class="flex items-center justify-center">
                  <div class="flex-shrink-0 items-center flex">
                    <font-awesome-icon
                      :icon="['fas', 'circle-check']"
                      class="text-emerald-400 h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-green-800">
                      Wallet is whitelisted! 👍
                    </p>
                  </div>
                </div>
              </div>
              <div v-if="walletNotification === 'error'" class="rounded-sm py-2 bg-red-50 border-l-4 border-red-400">
                <div class="flex items-center justify-center">
                  <div class="flex-shrink-0 items-center flex">
                    <font-awesome-icon
                      :icon="['fas', 'circle-check']"
                      class="text-red-400 h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-green-800">
                      Wallet is whitelisted! 😥
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
      <!-- steps -->
      <div class="mt-16">
        <div class="max-w-5xl mx-auto my-4 pb-4">
          <div class="flex pb-3 mx-8 md:mx-16">
            <!-- step upcoming  -->
            <div class="flex flex-1">
              <div
                v-if="steps[0].status === 'upcoming'"
                class="w-8 md:w-10 h-8 md:h-10 bg-white border-2 md:border-4 border-slate-400 justify-center rounded-full text-lg flex items-center"
              ></div>
            </div>
            <!-- step current  -->
            <div class="flex flex-1">
              <div
                v-if="steps[0].status === 'current'"
                class="w-8 md:w-10 h-8 md:h-10 bg-white border-2 md:border-4 border-emerald-400 justify-center rounded-full text-lg flex items-center"
              >
                <span class="bg-emerald-400 text-center h-3 w-3 rounded-full">
                </span>
              </div>
            </div>
            <!-- step complete  -->
            <div class="flex flex-1">
              <div
                v-if="steps[0].status === 'complete'"
                class="w-8 md:w-10 h-8 md:h-10 bg-emerald-400 mx-auto rounded-full text-lg flex items-center"
              >
                <span class="text-white text-center w-full">
                  <font-awesome-icon
                    :icon="['fas', 'check']"
                    class="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </div>
            <!-- line upcoming/current/complete -->
            <div
              class="w-full align-center items-center align-middle content-center flex"
            >
              <div
                class="w-full h-0.5 bg-slate-400 items-center align-middle align-center flex-1"
              >
                <div
                  v-if="
                    steps[0].status === 'upcoming' ||
                    steps[0].status === 'current'
                  "
                  class="bg-slate-400 text-xs leading-none h-0.5 text-center text-grey-darkest rounded"
                  style="width: 100%"
                ></div>
                <div
                  v-if="steps[0].status === 'complete'"
                  class="bg-emerald-400 text-xs leading-none h-0.5 text-center text-grey-darkest rounded"
                  style="width: 100%"
                ></div>
              </div>
            </div>
            <!-- step upcoming  -->
            <div class="flex flex-1">
              <div
                v-if="steps[1].status === 'upcoming'"
                class="w-8 md:w-10 h-8 md:h-10 bg-white border-2 md:border-4 border-slate-400 justify-center rounded-full text-lg flex items-center"
              ></div>
            </div>
            <!-- step current  -->
            <div class="flex flex-1">
              <div
                v-if="steps[1].status === 'current'"
                class="w-8 md:w-10 h-8 md:h-10 bg-white border-2 md:border-4 border-emerald-400 justify-center rounded-full text-lg flex items-center"
              >
                <span class="bg-emerald-400 text-center h-3 w-3 rounded-full">
                </span>
              </div>
            </div>
            <!-- step complete  -->
            <div class="flex flex-1">
              <div
                v-if="steps[1].status === 'complete'"
                class="w-8 md:w-10 h-8 md:h-10 bg-emerald-400 mx-auto rounded-full text-lg flex items-center"
              >
                <span class="text-white text-center w-full">
                  <font-awesome-icon
                    :icon="['fas', 'check']"
                    class="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </div>
            <!-- line upcoming/current/complete -->
            <div
              class="w-full align-center items-center align-middle content-center flex"
            >
              <div
                class="w-full h-0.5 bg-slate-400 items-center align-middle align-center flex-1"
              >
                <div
                  v-if="
                    steps[1].status === 'upcoming' ||
                    steps[1].status === 'current'
                  "
                  class="bg-slate-400 text-xs leading-none h-0.5 text-center text-grey-darkest rounded"
                  style="width: 100%"
                ></div>
                <div
                  v-if="steps[1].status === 'complete'"
                  class="bg-emerald-400 text-xs leading-none h-0.5 text-center text-grey-darkest rounded"
                  style="width: 100%"
                ></div>
              </div>
            </div>
            <!-- step upcoming  -->
            <div class="flex flex-1">
              <div
                v-if="steps[2].status === 'upcoming'"
                class="w-8 md:w-10 h-8 md:h-10 bg-white border-2 md:border-4 border-slate-400 justify-center rounded-full text-lg flex items-center"
              ></div>
            </div>
            <!-- step current  -->
            <div class="flex flex-1">
              <div
                v-if="steps[2].status === 'current'"
                class="w-8 md:w-10 h-8 md:h-10 bg-white border-2 md:border-4 border-emerald-400 justify-center rounded-full text-lg flex items-center"
              >
                <span class="bg-emerald-400 text-center h-3 w-3 rounded-full">
                </span>
              </div>
            </div>
            <!-- step complete  -->
            <div class="flex flex-1">
              <div
                v-if="steps[2].status === 'complete'"
                class="w-8 md:w-10 h-8 md:h-10 bg-emerald-400 mx-auto rounded-full text-lg flex items-center"
              >
                <span class="text-white text-center w-full">
                  <font-awesome-icon
                    :icon="['fas', 'check']"
                    class="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </div>
            <!-- line upcoming/current/complete -->
            <div
              class="w-full align-center items-center align-middle content-center flex"
            >
              <div
                class="w-full h-0.5 bg-slate-400 items-center align-middle align-center flex-1"
              >
                <div
                  v-if="
                    steps[2].status === 'upcoming' ||
                    steps[2].status === 'current'
                  "
                  class="bg-slate-400 text-xs leading-none h-0.5 text-center text-grey-darkest rounded"
                  style="width: 100%"
                ></div>
                <div
                  v-if="steps[2].status === 'complete'"
                  class="bg-emerald-400 text-xs leading-none h-0.5 text-center text-grey-darkest rounded"
                  style="width: 100%"
                ></div>
              </div>
            </div>
            <!-- step upcoming  -->
            <div class="flex flex-1">
              <div
                v-if="steps[3].status === 'upcoming'"
                class="w-8 md:w-10 h-8 md:h-10 bg-white border-2 md:border-4 border-slate-400 justify-center rounded-full text-lg flex items-center"
              ></div>
            </div>
            <!-- step current  -->
            <div class="flex flex-1">
              <div
                v-if="steps[3].status === 'current'"
                class="w-8 md:w-10 h-8 md:h-10 bg-white border-2 md:border-4 border-emerald-400 justify-center rounded-full text-lg flex items-center"
              >
                <span class="bg-emerald-400 text-center h-3 w-3 rounded-full">
                </span>
              </div>
            </div>
            <!-- step complete  -->
            <div class="flex flex-1">
              <div
                v-if="steps[3].status === 'complete'"
                class="w-8 md:w-10 h-8 md:h-10 bg-emerald-400 mx-auto rounded-full text-lg flex items-center"
              >
                <span class="text-white text-center w-full">
                  <font-awesome-icon
                    :icon="['fas', 'check']"
                    class="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </div>
          </div>

          <!-- steps text -->
          <div class="flex justify-between text-xs content-center text-center">
            <div
              class="w-[6rem] md:w-[10rem]"
              v-for="step in steps"
              :key="step.name"
            >
              <div class="flex flex-col text-white">
                <span class="text-sm font-semibold tracking-wide uppercase">{{
                  step.name
                }}</span>
                <span class="text-sm">{{ step.text }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- /End replace -->
  </div>
</template>

<script>
import contract from "@/contracts/ABIs.json";
import whitelist from "@/contracts/WhitelistAccounts.json";
import ConnectWallet from "@/components/ConnectWallet.vue";
import { mapGetters } from "vuex";

const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

export default {
  name: "MintView",
  components: {
    ConnectWallet,
  },
  data() {
    return {
      steps: [
        { name: "Step 1", text: "Contracts Deployed", status: "complete" },
        { name: "Step 2", text: "Presale Started!", status: "upcoming" },
        {
          name: "Step 3",
          text: "Public Sale Started!",
          status: "upcoming",
        },
        { name: "Step 4", text: "Mint Over 😭", status: "upcoming" },
      ],
      presaleStarted: false,
      publicSaleStarted: false,
      presalePrice: "0.06",
      publicSalePrice: "0.08",
      maxSupply: null,
      totalSupply: null,
      isWhitelisted: false,
      presaleMintAmount: 2,
      publicMintAmount: 5,
      hexProof: [],
      mintAmount: [1, 2],
      mintSelected: 1,
      checkAddress: "",
      walletNotification: "",
    };
  },
  methods: {
    checkPresaleStart() {
      if (this.getTokenInstance) {
        this.getTokenInstance.methods
          .presaleStarted()
          .call()
          .then((res) => {
            if (res) {
              this.presaleStarted = res;
              this.checkPublicSaleStart();
            } else {
              this.presaleStarted = false;
              this.steps[1].status = "upcoming";
            }
          });
      } else {
        return;
      }
    },
    checkPublicSaleStart() {
      this.getTokenInstance.methods
        .publicSaleStarted()
        .call()
        .then((res) => {
          if (res) {
            this.publicSaleStarted = res;
          }
          if (this.presaleStarted && !this.publicSaleStarted) {
            this.steps[1].status = "current";
          } else if (this.presaleStarted && this.publicSaleStarted) {
            this.steps[1].status = "complete";
            this.steps[2].status = "current";
          }
        });
    },
    checkWhitelisted(address) {
      const leafNodes = whitelist.map((addr) => keccak256(addr));
      const merkleTree = new MerkleTree(leafNodes, keccak256, {
        sortPairs: true,
      });
      const rootHash = merkleTree.getRoot();
      let claimingAddress = "";
      if (this.getUserAccount) {
        claimingAddress = keccak256(this.getUserAccount);
      } else if (this.checkAddress) {
        claimingAddress = keccak256(address.replace(/\s/g, ""));
      }

      this.hexProof = merkleTree.getHexProof(claimingAddress);
      this.isWhitelisted = merkleTree.verify(
        this.hexProof,
        claimingAddress,
        rootHash
      );
      if (this.isWhitelisted) {
        this.walletNotification = "success";
        this.checkAddress = "";
        setTimeout(() => {
          this.walletNotification = "";
        }, 2000);
      } else if (!this.isWhitelisted) {
        this.walletNotification = "error";
        this.checkAddress = "";
        setTimeout(() => {
          this.walletNotification = "";
        }, 2000);
      }
      console.log("Whitelisted? " + this.isWhitelisted);
    },
  },
  computed: {
    ...mapGetters(["getUserAccount", "getWeb3", "getTokenInstance"]),
  },
  watch: {
    getTokenInstance(val) {
      if (val) {
        this.checkPresaleStart();
      }
    },
  },
  mounted() {
    this.checkPresaleStart();
  },
};
</script>

<style scoped>
.step-desc {
  border: 2px solid red;
}
.mint {
  height: 100vh;
  background-image: linear-gradient(to bottom, #667eeaa8, #764ba2a6),
    url("../assets/images/banner.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: left;
}
.mint-container {
  border: 2px solid white;
}
.title {
  /* border: 2px solid red; */
  font-family: "Colombo", sans-serif;
  width: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
