<template>
  <div
    class="mint mx-auto px-4 sm:px-6 md:px-8 relative flex items-center justify-center"
  >
    <!-- Replace with your content -->
    <div
      class="mint-container relative flex flex-col justify-center h-3/4 md:h-3/5 w-full max-w-7xl"
    >
      <!-- socials -->
      <div
        class="absolute top-6 left-6 flex-col justify-center space-x-6 md:order-2"
      >
        <a
          v-for="item in socials"
          :key="item.name"
          :href="item.href"
          class="text-gray-400 hover:text-gray-500"
        >
          <span class="sr-only">{{ item.name }}</span>
          <img class="w-7 h-7" :src="item.icon" alt="" />
        </a>
      </div>
      <!-- hana -->
      <!-- <div class="absolute top-0 right-60">
          <img class="h-44" src="../assets/images/hana/taiyaki.png" alt="">
      </div> -->
      <div class="absolute -bottom-1 -left-3 z-0">
          <img class="h-44 w-44" src="../assets/images/hana/peek.png" alt="">
      </div>
      <!-- disconnect btn -->
      <div v-if="getUserAccount" class="absolute top-6 right-6">
        <ConnectWallet />
      </div>
      <!-- title -->
      <div class="title text-7xl mb-16 text-white">Mint Chibits</div>
      <!-- buttons -->
      <div class="mb-16 px-12 flex justify-center">
        <ConnectWallet v-if="!getUserAccount" />
        <!-- user logged in msgs -->
        <div
          v-if="getUserAccount && isWhitelisted"
          class="flex px-8 md:px-12 justify-center min-h-[44px]"
        >
          <div class="flex items-center">
            <font-awesome-icon
              :icon="['fas', 'circle-check']"
              class="text-emerald-400 mx-auto pr-3 h-6"
              aria-hidden="true"
            />
            <div v-if="!publicSaleStarted" class="flex-col">
              <h1 class="text-white font-bold text-xl">
                Your wallet is whitelisted
              </h1>
              <p
                v-if="!presaleStarted && !publicSaleStarted"
                class="text-white text-sm font-normal"
              >
                Presale hasn't started yet. Come back later
              </p>
              <p
                v-else-if="presaleStarted && !publicSaleStarted"
                class="text-white text-sm font-normal"
              >
                Presale has started! Mint below
              </p>
            </div>
            <div v-else-if="publicSaleStarted" class="flex-col">
              <h1 class="text-white font-bold text-xl">
                Public sale has started!
              </h1>
              <p class="text-white text-sm font-normal">
                Mint your chibits below
              </p>
            </div>
          </div>
        </div>
        <div
          v-if="getUserAccount && !isWhitelisted && !publicSaleStarted"
          class="flex-col px-8 md:px-12 justify-center min-h-[44px]"
        >
          <div class="flex items-center">
            <font-awesome-icon
              :icon="['fas', 'circle-x']"
              class="text-rose-500 mx-auto pr-3 h-6"
              aria-hidden="true"
            />
            <div class="flex-col">
              <h1 class="text-white font-bold text-xl">
                Your wallet is not whitelisted
              </h1>
              <p class="text-white text-sm font-normal">
                Come back when the public sale starts!
              </p>
            </div>
          </div>
        </div>
        <div
          v-if="getUserAccount && !isWhitelisted && publicSaleStarted"
          class="flex-col px-8 md:px-12 justify-center min-h-[44px]"
        >
          <div class="flex items-center">
            <font-awesome-icon
              :icon="['fas', 'circle-check']"
              class="text-emerald-400 mx-auto pr-3 h-6"
              aria-hidden="true"
            />
            <div class="flex-col">
              <h1 class="text-white font-bold text-xl">
                Public sale has started!
              </h1>
              <p class="text-white text-sm font-normal">
                Mint your chibits below
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- wallet check -->
      <div
        v-if="!getUserAccount"
        class="flex items-center mb-16 px-8 md:px-12 min-h-[48px] justify-center"
      >
        <div class="relative mr-6 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex justify-start items-center pointer-events-none"
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
            placeholder="Enter address 0x..."
          />
        </div>
        <button
          @click.prevent="checkWhitelisted(checkAddress)"
          type="button"
          class="p-2 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 text-md rounded-sm font-medium text-white border-2 border-white transition-all linear hover:bg-white hover:text-slate-500"
        >
          Verify Whitelist
        </button>
      </div>
      <div
        v-if="getUserAccount && getWeb3"
        class="flex items-center mb-16 px-8 md:px-12 justify-center"
      >
        <button
          :style="{
            visibility:
              (getUserAccount && presaleStarted && isWhitelisted) ||
              (getUserAccount && publicSaleStarted)
                ? 'visible'
                : 'hidden',
          }"
          @click.prevent="showMintModal"
          type="button"
          class="inline-flex items-center rounded-sm justify-center p-2 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 border-2 border-rose-500 text-md font-medium hover:opacity-75 text-white transition-all linear bg-gradient-to-tl from-pink-500 to-rose-500"
        >
          Mint
        </button>
      </div>
      <!-- supply -->
      <div
        :style="{
          visibility:
            presaleStarted || publicSaleStarted ? 'visible' : 'hidden',
        }"
        class="text-white flex justify-center items-center"
      >
        <div v-if="presaleStarted && !publicSaleStarted" class="pr-3 text-lg">
          Presale Price: {{ presalePrice }}Ξ
        </div>
        <div
          v-else-if="!presaleStarted && publicSaleStarted"
          class="pr-3 text-lg"
        >
          Public Sale Price: {{ publicSalePrice }}Ξ
        </div>
        <div :style="{
          visibility:
            presaleStarted || publicSaleStarted ? 'visible' : 'hidden',
        }" class="flex">
          <span class="pr-3">|</span>
          <h1 class="pr-3 text-lg">Supply:</h1>
          <div class="bg-emerald-400 rounded-2xl text-xl px-3 py-0.2">
            {{ currentSupply }} / {{ totalSupply }}
          </div>
        </div>
      </div>
      <!-- steps -->
      <div class="mt-16 z-10">
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
                class="w-8 md:w-10 h-8 md:h-10 bg-white border-2 border-emerald-400 justify-center rounded-full text-lg flex items-center"
              >
                <span class="text-emerald-400 text-center w-full">
                  <font-awesome-icon
                    :icon="['fas', 'star']"
                    class="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>
                <!-- <span class="bg-emerald-400 text-center h-3 w-3 rounded-full">
                </span> -->
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
                    :icon="['fas', 'star']"
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
                <span class="text-emerald-400 text-center w-full">
                  <font-awesome-icon
                    :icon="['fas', 'star']"
                    class="h-5 w-5"
                    aria-hidden="true"
                  />
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
                    :icon="['fas', 'star']"
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
                <span class="text-emerald-400 text-center w-full">
                  <font-awesome-icon
                    :icon="['fas', 'star']"
                    class="h-5 w-5"
                    aria-hidden="true"
                  />
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
                    :icon="['fas', 'star']"
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
                <span class="text-emerald-400 text-center w-full">
                  <font-awesome-icon
                    :icon="['fas', 'star']"
                    class="h-5 w-5"
                    aria-hidden="true"
                  />
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
                    :icon="['fas', 'star']"
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
    <!--  mint modal  -->
    <TransitionRoot as="template" :show="modalOpen">
      <Dialog
        as="div"
        class="fixed z-10 inset-0 overflow-y-auto"
        @close="modalOpen = false"
      >
        <div
          class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-200"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay
              class="fixed inset-0 bg-gradient-to-b from-[#667eeae5] to-[#764ba2e8] bg-opacity-80 transition-opacity"
            />
          </TransitionChild>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
            >&#8203;</span
          >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              class="mint-modal-container inline-block align-bottom bg-transparent border-2 border-white rounded-sm px-8 pb-8 pt-2 text-left overflow-hidden transform transition-all sm:align-middle sm:max-w-lg sm:w-full"
            >
              <div>
                <!-- <div
                              class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
                            ></div> -->
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle
                    as="h3"
                    class="mint-ask text-3xl font-bold leading-6 text-white"
                  >
                    Mint
                  </DialogTitle>
                  <div class="my-5 text-white text-lg font-medium">
                    How many would you like to mint?
                  </div>
                  <div class="">
                    <RadioGroup
                      v-model="mintSelected"
                      class="flex justify-center mt-2"
                    >
                      <div
                        class="cursor-pointer w-1/2 gap-4 grid sm:grid-cols-2"
                      >
                        <RadioGroupOption
                          as="template"
                          v-for="number in mintAmount"
                          :key="number"
                          :value="number"
                          v-slot="{ checked }"
                        >
                          <div
                            :class="[
                              checked
                                ? 'bg-gradient-to-tl from-pink-500 to-rose-500 border-transparent text-white'
                                : 'bg-transparent border-white border-2 text-white hover:bg-white hover:text-slate-500',
                              'border rounded-sm py-2 px-3 flex items-center justify-center text-md font-bold uppercase sm:flex-1',
                            ]"
                          >
                            <RadioGroupLabel as="p">
                              {{ number }}
                            </RadioGroupLabel>
                          </div>
                        </RadioGroupOption>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
              <div class="flex justify-evenly mt-5">
                <!-- cancel button -->
                <button
                  @click.prevent="modalOpen = false"
                  type="button"
                  class="inline-flex mr-4 items-center rounded-sm justify-center p-2 w-1/2 border-2 border-white text-md font-medium hover:bg-white hover:text-slate-500 text-white transition-all linear"
                >
                  Cancel
                </button>
                <!-- mint button -->
                <button
                  v-if="!mintInProgress"
                  @click.prevent="mintPresale"
                  type="button"
                  class="inline-flex items-center rounded-sm justify-center p-2 w-1/2 border-2 border-rose-500 text-md font-medium hover:opacity-75 text-white transition-all linear bg-gradient-to-tl from-pink-500 to-rose-500"
                >
                  Mint
                </button>
                <!-- mint in progress -->
                <button
                  v-else
                  disabled
                  type="button"
                  class="disabled:opacity-50 cursor-not-allowed inline-flex items-center rounded-sm justify-center p-2 w-1/2 border-2 border-rose-500 text-md font-medium hover:opacity-75 text-white transition-all linear bg-gradient-to-tl from-pink-500 to-rose-500"
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
                  Minting...
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
    <!-- /End replace -->
  </div>
</template>

<script>
import contract from "@/contracts/ABIs.json";
import whitelist from "@/contracts/WhitelistAccounts.json";
import ConnectWallet from "@/components/ConnectWallet.vue";
import { mapGetters, mapActions } from "vuex";

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from "@headlessui/vue";

const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

export default {
  name: "MintView",
  components: {
    ConnectWallet,
    Popover,
    PopoverButton,
    PopoverPanel,
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
  },
  data() {
    return {
      steps: [
        { name: "Step 1", text: "Whitelist Collection", status: "complete" },
        { name: "Step 2", text: "Presale Started!", status: "upcoming" },
        {
          name: "Step 3",
          text: "Public Sale Started!",
          status: "upcoming",
        },
        { name: "Step 4", text: "Reveal", status: "upcoming" },
      ],
      socials: [
        {
          name: "discord",
          href: "#",
          icon: require("../assets/icons/discord.svg"),
        },
        {
          name: "opensea",
          href: "#",
          icon: require("../assets/icons/opensea.svg"),
        },
        {
          name: "etherscan",
          href: "#",
          icon: require("../assets/icons/etherscan.svg"),
        },
        {
          name: "twitter",
          href: "#",
          icon: require("../assets/icons/twitter.svg"),
        },
      ],
      presaleStarted: false,
      publicSaleStarted: false,
      presalePrice: "0.06",
      publicSalePrice: "0.02",
      totalSupply: null,
      isWalletCheckedWhitelisted: false,
      isWhitelisted: false,
      presaleMintAmount: 2,
      publicMintAmount: 5,
      hexProof: [],
      mintAmount: [1, 2],
      mintSelected: 1,
      checkAddress: "",
      walletNotification: "",
      interval: null,
      mintInProgress: false,
      modalOpen: false,
      currentSupply: 0,
      totalSupply: 0,
    };
  },
  methods: {
    ...mapActions(["SET_UNSTAKED_RELOAD", "SET_STAKED_RELOAD"]),
    checkPresaleStart() {
      if (this.getTokenInstance) {
        this.getTokenInstance.methods
          .presaleStarted()
          .call()
          .then((res) => {
            this.presaleStarted = res;
            this.checkPublicSaleStart();
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
          this.publicSaleStarted = res;
          if (this.presaleStarted && !this.publicSaleStarted) {
            this.steps[1].status = "current";
            this.steps[1].text = "Presale Started!";
            this.steps[2].status = "upcoming";
          } else if (!this.presaleStarted && this.publicSaleStarted) {
            this.steps[1].status = "complete";
            this.steps[1].text = "Presale Complete!";
            this.steps[2].status = "current";
          }
        });
    },
    checkWhitelisted(address) {
      this.hexProof = [];
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
      console.log("Root Hash: ", rootHash.toString("hex"));
      if (!this.getUserAccount && this.isWhitelisted) {
        this.$moshaToast("Your wallet is whitelisted!", {
          showIcon: true,
          position: "top-center",
          timeout: 4000,
          type: "success",
          transition: "bounce",
          hideProgressBar: true,
        });
        this.checkAddress = "";
      } else if (!this.getUserAccount && !this.isWhitelisted) {
        this.$moshaToast("Your wallet is not whitelisted!", {
          showIcon: true,
          position: "top-center",
          timeout: 4000,
          type: "danger",
          transition: "bounce",
          hideProgressBar: true,
        });
        this.checkAddress = "";
      }
      console.log("Whitelisted? " + this.isWhitelisted);
    },
    startIntervalSaleCheck() {
      this.interval = setInterval(() => {
        this.checkPresaleStart();
        this.setCurrentSupply();
      }, 5000);
    },
    mintPresale() {
      if (this.getWeb3 && this.presaleStarted && this.isWhitelisted) {
        let mintPrice = Number(this.mintSelected) * Number(this.presalePrice);
        let value = this.getWeb3.utils.toHex(
          this.getWeb3.utils.toWei(mintPrice.toString(), "ether")
        );

        this.getTokenInstance.methods
          .mintPresale(Number(this.mintSelected), this.hexProof)
          .send({
            from: this.getUserAccount,
            to: contract.TOKEN_ADDR,
            value: value,
          })
          .on("transactionHash", (hash) => {
            console.log("Transaction Hash: " + hash);
            this.$moshaToast("Transaction has been submitted", {
              showIcon: true,
              position: "top-center",
              timeout: 4000,
              type: "info",
              transition: "bounce",
              toastBackgroundColor: "#3B82F6",
              hideProgressBar: true,
            });
            this.mintInProgress = true;
          })
          .on("receipt", (receipt) => {
            console.log("Receipt: " + receipt);
            this.$moshaToast("Mint successful!", {
              showIcon: true,
              position: "top-center",
              timeout: 4000,
              type: "success",
              transition: "bounce",
              hideProgressBar: true,
            });
            this.mintInProgress = false;
            this.SET_UNSTAKED_RELOAD(true);
            this.SET_STAKED_RELOAD(true);
          })
          .on("error", (error) => {
            console.log("Error receipt: ", error);
            //transaction rejected
            this.$moshaToast("Transaction rejected!", {
              showIcon: true,
              position: "top-center",
              timeout: 5000,
              type: "danger",
              transition: "bounce",
              hideProgressBar: true,
            });
          });
        return;
      } else if (
        this.getWeb3 &&
        this.getUserAccount &&
        this.publicSaleStarted
      ) {
        this.mintPublic();
        console.log("public mint");
      }
    },
    mintPublic() {
      let mintPrice = Number(this.mintSelected) * Number(this.publicSalePrice);
      let value = this.getWeb3.utils.toHex(
        this.getWeb3.utils.toWei(mintPrice.toString(), "ether")
      );

      this.getTokenInstance.methods
        .mint(Number(this.mintSelected))
        .send({
          from: this.getUserAccount,
          to: contract.TOKEN_ADDR,
          value: value,
        })
        .on("transactionHash", (hash) => {
          console.log("Transaction Hash: " + hash);
          this.$moshaToast("Transaction has been submitted", {
            showIcon: true,
            position: "top-center",
            timeout: 4000,
            type: "info",
            transition: "bounce",
            toastBackgroundColor: "#3B82F6",
            hideProgressBar: true,
          });
          this.mintInProgress = true;
        })
        .on("receipt", (receipt) => {
          console.log("Receipt: " + receipt);
          this.$moshaToast("Mint successful!", {
            showIcon: true,
            position: "top-center",
            timeout: 4000,
            type: "success",
            transition: "bounce",
            hideProgressBar: true,
          });
          this.mintInProgress = false;
          this.SET_UNSTAKED_RELOAD(true);
          this.SET_STAKED_RELOAD(true);
        })
        .on("error", (error) => {
          console.log("Error receipt: ", error);
          //transaction rejected
          this.$moshaToast("Transaction rejected!", {
            showIcon: true,
            position: "top-center",
            timeout: 5000,
            type: "danger",
            transition: "bounce",
            hideProgressBar: true,
          });
        });
    },
    showMintModal() {
      this.modalOpen = true;
    },
    setCurrentSupply() {
      this.getTokenInstance.methods
        .totalSupply()
        .call()
        .then((val) => {
          if (val !== this.currentSupply) {
            this.currentSupply = val;
          }
        });
    },
    setTotalSupply() {
      if (this.getTokenInstance) {
        this.getTokenInstance.methods
          .MAX_TOKENS()
          .call()
          .then((val) => {
            this.totalSupply = val;
          });
      }
    },
  },
  computed: {
    ...mapGetters(["getUserAccount", "getWeb3", "getTokenInstance"]),
  },
  watch: {
    getTokenInstance(val) {
      if (val) {
        this.checkPresaleStart();
        this.startIntervalSaleCheck();
        this.setCurrentSupply();
        this.setTotalSupply();
      }
    },
    getUserAccount(val) {
      if (val) {
        this.checkWhitelisted();
      }
    },
  },
  mounted() {
    if (this.getUserAccount) {
      this.checkWhitelisted();
    }
    if (this.getTokenInstance) {
      this.checkPresaleStart();
      this.setTotalSupply();
      this.setCurrentSupply();
    }
  },
  destroyed() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
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
