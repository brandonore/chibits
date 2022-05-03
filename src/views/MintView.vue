<template>
  <div
    class="mint mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-center"
  >
    <!-- Replace with your content -->
    <div
      class="mint-container relative flex flex-col justify-center h-1/2 w-full max-w-7xl"
    >
      <div v-if="getUserAccount" class="justify-end absolute top-6 right-6">
        <ConnectWallet />
      </div>
      <!-- title -->
      <div class="title text-7xl mb-16 text-white">Mint Chibits</div>
      <!-- steps -->

      <!-- buttons -->
      <div class="flex items-center px-4 md:px-12 justify-center">
        <div class="relative w-1/2 md:w-1/3 lg:w-1/5">
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
            type="email"
            name="email"
            id="email"
            class="focus:ring-rose-500 focus:border-rose-500 block w-full pl-10 py-2.5 sm:text-sm border-gray-300"
            placeholder="enter address 0x..."
          />
        </div>
        <button
          @click.prevent=""
          type="button"
          class="p-2 ml-6 w-1/2 md:w-1/3 lg:w-1/5 text-md font-medium text-white border-2 border-white transition-all linear hover:bg-white hover:text-slate-500"
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
          class="inline-flex items-center justify-center p-2 w-1/2 md:w-1/3 lg:w-1/5 border-2 border-rose-500 text-md font-medium hover:opacity-75 text-white transition-all linear bg-gradient-to-tl from-pink-500 to-rose-500"
        >
          <font-awesome-icon
            :icon="['fas', 'star']"
            class="-ml-1 mr-2 h-5 w-5"
            aria-hidden="true"
          />
          Mint
        </button>
      </div>
      <!-- steps -->
      <div class="flex justify-evenly mt-16">
        <div v-for="step in steps" :key="step.name" class="flex justify-center">
          <!-- complete -->
          <div v-if="step.status === 'complete'" class="">
            <div class="relative mb-2">
              <div
                class="w-8 h-8 mx-auto bg-emerald-400 rounded-full text-lg text-white flex items-center"
              >
                <span class="text-center text-white w-full">
                  <font-awesome-icon
                    :icon="['fas', 'check']"
                    class="h-4 w-4"
                    aria-hidden="true"
                  />
                </span>
              </div>
              <div
                class="absolute flex align-center items-center align-middle content-center"
                style="
                  width: calc(100% + 4rem);
                  top: 50%;
                  transform: translate(50%, -50%);
                "
              >
                <div
                  class="w-full h-0.5 bg-emerald-400 items-center align-middle align-center flex-1"
                ></div>
              </div>
            </div>

            <div class="text-white">
              <span class="min-w-0 flex flex-col">
                <span class="text-sm font-semibold tracking-wide uppercase"
                  >{{ step.name }}</span
                >
                <span class="text-sm text-white">{{ step.text }}</span>
              </span>
            </div>
          </div>
          <!-- current -->
          <div v-if="step.status === 'current'" class="">
            <div class="relative mb-2">
              <div
                class="w-8 h-8 mx-auto bg-emerald-400 rounded-full text-lg text-white flex items-center"
              >
                <span class="text-center text-white w-full">
                  <font-awesome-icon
                    :icon="['fas', 'circle']"
                    class="w-5"
                    aria-hidden="true"
                  />
                </span>
              </div>
              <div
                class="absolute flex align-center items-center align-middle content-center"
                style="
                  width: calc(100% + 5rem);
                  top: 50%;
                  transform: translate(50%, -50%);
                "
              >
                <div
                  class="w-full h-0.5 bg-slate-400 items-center align-middle align-center flex-1"
                ></div>
              </div>
            </div>

            <div class="text-white">
              <span class="min-w-0 flex flex-col">
                <span class="text-sm font-semibold tracking-wide uppercase"
                  >{{ step.name }}</span
                >
                <span class="text-sm text-white">{{ step.text }}</span>
              </span>
            </div>
          </div>
          <!-- upcoming -->
                    <div v-if="step.status === 'upcoming'" class="">
            <div class="relative mb-2">
              <div
                class="w-8 h-8 mx-auto bg-slate-400 rounded-full text-lg text-white flex items-center"
              >
                <span class="text-center text-slate-400 w-full">
                  <font-awesome-icon
                    :icon="['fas', 'circle']"
                    class="w-5"
                    aria-hidden="true"
                  />
                </span>
              </div>
              <div
              v-if="step.name !== 'Step 4'"
                class="absolute flex align-center items-center align-middle content-center"
                style="
                  width: calc(100% + 4rem);
                  top: 50%;
                  transform: translate(50%, -50%);
                "
              >
                <div
                  class="w-full h-0.5 bg-slate-400 items-center align-middle align-center flex-1"
                ></div>
              </div>
            </div>

            <div class="text-white">
              <span class="min-w-0 flex flex-col">
                <span class="text-sm font-semibold tracking-wide uppercase"
                  >{{ step.name }}</span
                >
                <span class="text-sm text-white">{{ step.text }}</span>
              </span>
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
import ConnectWallet from "@/components/ConnectWallet.vue";
import { mapGetters } from "vuex";

export default {
  name: "MintView",
  components: {
    ConnectWallet,
  },
  data() {
    return {
      steps: [
        { name: "Step 1", text: "Presale Not Started", status: "complete" },
        { name: "Step 2", text: "Presale Started", status: "current" },
        {
          name: "Step 3",
          text: "Public Sale Started",
          status: "upcoming",
        },
        { name: "Step 4", text: "Mint Over", status: "upcoming" },
      ],
    };
  },
  methods: {},
  computed: {
    ...mapGetters(["getUserAccount", "getWeb3"]),
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
</style>
