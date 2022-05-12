<template>
  <div class="max-w-7xl px-4 pt-6 pb-8 sm:px-6 md:px-8">
    <h1 class="titles text-2xl text-left text-slate-500">Marketplace</h1>
  </div>
  <div class="marketplace flex flex-col md:flex-row justify-evenly max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <!-- Replace with your content -->
    <!-- sid nav -->
    <div class="side-nav w-full mb-12 md:mr-12 flex-col md:w-48">
      <div class="bg-white dark:bg-slate-800 dark:border-slate-500 rounded-md border-2">
        <div class="h-12 my-2 flex items-center justify-center">
          <h1 class="text-xl text-slate-500 uppercase">Categories</h1>
        </div>
        <nav class="space-y-1 pb-2 px-2" aria-label="Sidebar">
          <div
            v-for="item in navigation"
            :key="item.name"
            @click.prevent="setActive(item.name)"
            :class="[(isActive == item.name) ? 'side-nav-active' : 'text-slate-500 hover:bg-gray-100']"
            class="cursor-pointer flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all linear"
          >
            <span class="truncate">
              {{ item.name }}
            </span>
          </div>
        </nav>
      </div>
    </div>
    <!-- marketplace items -->
    <div class="grid-view flex-1">
        <!-- chibits category -->
      <ul
      v-if="isActive === 'Chibits'"
        role="list"
        class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <li
          v-for="item in chibits"
          :key="item.id"
          class="col-span-1 flex flex-col text-center bg-white dark:bg-slate-800 rounded-md shadow divide-y divide-gray-200"
        >
          <div class="flex-1 flex flex-col rounded-md">
            <img
              class="rounded-tl-md rounded-tr-md w-full object-cover h-60"
              :src="item.imgUrl"
              alt=""
            />
            <h1
              class="mt-4 text-slate-600 uppercase text-2xl cera-extrabold font-light"
            >
              {{ item.title }}
            </h1>
            <div class="mt-1 px-2 flex-grow flex flex-col pb-8 justify-between">
              <div class="text-slate-500 text-sm">{{ item.desc }}</div>
              <div class="mt-3 flex justify-center">
                <div class="pr-2">Price</div>
                <div
                  class="px-3 py-0.5 text-emerald-600 text-sm dark:bg-slate-500 dark:text-slate-800 cera-extrabold bg-emerald-100 rounded-lg"
                >
                  {{ item.amountToEnter }} $CHI
                </div>
              </div>
              <div class="mt-3 text-sm">
                <span class="titles text-rose-500">Ends on</span>
                {{ formatExpiration(item.expirationDate) }}
              </div>
              <div class="mt-3">
                  <div>{{ item.numberOfWinners }} winners!</div>
              </div>
            </div>
          </div>
          <div>
            <div class="-mt-px flex divide-x divide-gray-200">
              <div
                class="rounded-bl-md rounded-br-md w-0 flex-1 flex bg-indigo-500"
              >
                <button
                  class="relative rounded-bl-md rounded-br-md -mr-px w-0 flex-1 inline-flex items-center justify-center py-3 text-sm text-white transition-all linear hover:opacity-75"
                >
                  <font-awesome-icon
                    :icon="['fas', 'circle-dollar']"
                    class="mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  <span>Purchase</span>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <!-- instant wl category -->
      <ul
      v-if="isActive === 'Instant WL'"
        role="list"
        class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <li
          v-for="item in instantWL"
          :key="item.id"
          class="col-span-1 flex flex-col text-center bg-white rounded-md shadow divide-y divide-gray-200"
        >
          <div class="flex-1 flex flex-col rounded-md">
            <img
              class="rounded-tl-md rounded-tr-md w-full object-cover h-60"
              :src="item.imgUrl"
              alt=""
            />
            <h1
              class="mt-4 text-slate-500 uppercase text-2xl cera-extrabold font-light"
            >
              {{ item.title }}
            </h1>
            <div class="mt-1 px-2 flex-grow flex flex-col pb-8 justify-between">
              <div class="text-slate-500 text-sm">{{ item.desc }}</div>
              <div class="mt-3 flex justify-center">
                <div class="pr-2">Price</div>
                <div
                  class="px-3 py-0.5 text-emerald-600 text-sm dark:bg-slate-500 dark:text-slate-800 cera-extrabold bg-emerald-100 rounded-lg"
                >
                  {{ item.amountToEnter }} $CHI
                </div>
              </div>
              <div class="mt-3 text-sm">
                <span class="titles text-rose-500">Ends on</span>
                {{ formatExpiration(item.expirationDate) }}
              </div>
              <div class="mt-3">
                <div>{{ item.numberOfWinners }} winners!</div>
              </div>
            </div>
          </div>
          <div>
            <div class="-mt-px flex divide-x divide-gray-200">
              <div
                class="rounded-bl-md rounded-br-md w-0 flex-1 flex bg-indigo-500"
              >
                <button
                  class="relative rounded-bl-md rounded-br-md -mr-px w-0 flex-1 inline-flex items-center justify-center py-3 text-sm text-white transition-all linear hover:opacity-75"
                >
                  <font-awesome-icon
                    :icon="['fas', 'circle-dollar']"
                    class="mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  <span>Purchase</span>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <!-- wl raffle category -->
      <ul
      v-if="isActive === 'WL Raffle'"
        role="list"
        class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <li
          v-for="item in wlRaffle"
          :key="item.id"
          class="col-span-1 flex flex-col text-center bg-white rounded-md shadow divide-y divide-gray-200"
        >
          <div class="flex-1 flex flex-col rounded-md">
            <img
              class="rounded-tl-md rounded-tr-md w-full object-cover h-60"
              :src="item.imgUrl"
              alt=""
            />
            <h1
              class="mt-4 text-slate-500 uppercase text-2xl cera-extrabold font-light"
            >
              {{ item.title }}
            </h1>
            <div class="mt-1 px-2 flex-grow flex flex-col pb-8 justify-between">
              <div class="text-slate-500 text-sm">{{ item.desc }}</div>
              <div class="mt-3 flex justify-center">
                <div class="pr-2">Price</div>
                <div
                  class="px-3 py-0.5 text-emerald-600 text-sm dark:bg-slate-500 dark:text-slate-800 cera-extrabold bg-emerald-100 rounded-lg"
                >
                  {{ item.amountToEnter }} $CHI
                </div>
              </div>
              <div class="mt-3 text-sm">
                <span class="titles text-rose-500">Ends on</span>
                {{ formatExpiration(item.expirationDate) }}
              </div>
              <div class="mt-3">
                <div>{{ item.numberOfWinners }} winners!</div>
              </div>
            </div>
          </div>
          <div>
            <div class="-mt-px flex divide-x divide-gray-200">
              <div
                class="rounded-bl-md rounded-br-md w-0 flex-1 flex bg-indigo-500"
              >
                <button
                  class="relative rounded-bl-md rounded-br-md -mr-px w-0 flex-1 inline-flex items-center justify-center py-3 text-sm text-white transition-all linear hover:opacity-75"
                >
                  <font-awesome-icon
                    :icon="['fas', 'circle-dollar']"
                    class="mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  <span>Purchase</span>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <!-- irl raffle category -->
      <ul
      v-if="isActive === 'IRL Raffle'"
        role="list"
        class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <li
          v-for="item in irlRaffle"
          :key="item.id"
          class="col-span-1 flex flex-col text-center bg-white rounded-md shadow divide-y divide-gray-200"
        >
          <div class="flex-1 flex flex-col rounded-md">
            <img
              class="rounded-tl-md rounded-tr-md w-full object-cover h-60"
              :src="item.imgUrl"
              alt=""
            />
            <h1
              class="mt-4 text-slate-500 uppercase text-2xl cera-extrabold font-light"
            >
              {{ item.title }}
            </h1>
            <div class="mt-1 px-2 flex-grow flex flex-col pb-8 justify-between">
              <div class="text-slate-500 text-sm">{{ item.desc }}</div>
              <div class="mt-3 flex justify-center">
                <div class="pr-2">Price</div>
                <div
                  class="px-3 py-0.5 text-emerald-600 text-sm dark:bg-slate-500 dark:text-slate-800 cera-extrabold bg-emerald-100 rounded-lg"
                >
                  {{ item.amountToEnter }} $CHI
                </div>
              </div>
              <div class="mt-3 text-sm">
                <span class="titles text-rose-500">Ends on</span>
                {{ formatExpiration(item.expirationDate) }}
              </div>
              <div class="mt-3">
                <div>{{ item.numberOfWinners }} winners!</div>
              </div>
            </div>
          </div>
          <div>
            <div class="-mt-px flex divide-x divide-gray-200">
              <div
                class="rounded-bl-md rounded-br-md w-0 flex-1 flex bg-indigo-500"
              >
                <button
                  class="relative rounded-bl-md rounded-br-md -mr-px w-0 flex-1 inline-flex items-center justify-center py-3 text-sm text-white transition-all linear hover:opacity-75"
                >
                  <font-awesome-icon
                    :icon="['fas', 'circle-dollar']"
                    class="mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  <span>Purchase</span>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- /End replace -->
  </div>
</template>

<script>
import Web3 from "web3";
import contract from "@/contracts/ABIs.json";
import { mapActions, mapGetters } from "vuex";
import { supabase } from "@/supabase";
import { DateTime } from "luxon";

export default {
  name: "MarketplaceView",
  data() {
    return {
      starIcon: ["fas", "star-shooting"],
      spinnerIcon: ["fal", "spinner-third"],
      interval: null,
      loading: false,
      marketplaceItems: [],
      navigation: [
        { name: "Chibits", current: true },
        { name: "Instant WL", current: false },
        { name: "WL Raffle", current: false },
        { name: "IRL Raffle", current: false },
      ],
      isActive: 'Chibits',
      people: [
        {
          name: "Jane Cooper",
          title: "Paradigm Representative",
          role: "Admin",
          email: "janecooper@example.com",
          telephone: "+1-202-555-0170",
          imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        },
        {
          name: "Jane Cooper",
          title: "Paradigm Representative",
          role: "Admin",
          email: "janecooper@example.com",
          telephone: "+1-202-555-0170",
          imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        },
        {
          name: "Jane Cooper",
          title: "Paradigm Representative",
          role: "Admin",
          email: "janecooper@example.com",
          telephone: "+1-202-555-0170",
          imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        },
        {
          name: "Jane Cooper",
          title: "Paradigm Representative",
          role: "Admin",
          email: "janecooper@example.com",
          telephone: "+1-202-555-0170",
          imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        },
        {
          name: "Jane Cooper",
          title: "Paradigm Representative",
          role: "Admin",
          email: "janecooper@example.com",
          telephone: "+1-202-555-0170",
          imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        },
      ],
    };
  },
  methods: {
    async getData() {
      try {
        this.loading = true;
        const { data, error, status } = await supabase
          .from("marketplace")
          .select();

        if (error && status !== 406) throw error;

        if (data) {
          this.marketplaceItems = data;
        }
      } catch (error) {
        alert(error.message);
      } finally {
        this.loading = false;
      }
    },
    formatExpiration(x) {
      if (x) {
        let date = DateTime.fromISO(x).toFormat("f");
        return date;
      } else {
        return "No expiration!";
      }
    },
    setActive(name) {
       this.isActive = name
    },
  },
  watch: {},
  computed: {
    ...mapGetters([
      "getUserAccount",
      "getBalance",
      "getStakedBalance",
      "getWeb3",
      "getStakingInstance",
    ]),
    chibits() {
        return this.marketplaceItems.filter(item => item.category === 'Chibits NFT' || item.category === '$CHI Tokens')
    },
    instantWL() {
        return this.marketplaceItems.filter(item => item.category === 'Instant WL')
    },
    wlRaffle() {
        return this.marketplaceItems.filter(item => item.category === 'WL Raffle')
    },
    irlRaffle() {
        return this.marketplaceItems.filter(item => item.category === 'IRL Raffle')
    }
  },
  mounted() {
    this.getData();
  },
  destroyed() {
    clearInterval(this.interval);
  },
};
</script>

<style>
.side-nav-active {
    background-color: #f43f5e;
    color: white;
}
.titles {
  font-family: "CeraBold", sans-serif;
  text-transform: uppercase;
}
.small-title {
  font-family: "CeraLight", sans-serif;
  /* text-transform: uppercase; */
}
/* .marketplace {
  border: 2px solid red;
}
.grid-view {
  border: 2px solid green;
}
.side-nav {
    border: 2px solid blue;
} */
</style>
