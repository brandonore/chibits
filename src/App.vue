<template>
  <div
    :class="darkMode ? 'dark' : ''"
    class="dark:bg-gray-900 dark:text-slate-500 bg-gray-100 antialiased"
  >
    <Transition name="slide-fade">
      <div
        v-if="sidebarOpen"
        class="absolute left-0 w-full z-50 dark:border-b-gray-700 md:border-b-0 md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 transition-all"
      >
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div
          :class="mintRoute ? 'sidebar-mint' : 'sidebar-reg'"
          class="flex flex-col flex-grow md:border-r border-gray-200 pt-5 overflow-y-auto dark:bg-gray-900 dark:text-slate-500 dark:border-gray-600"
        >
          <div class="flex items-center flex-shrink-0 px-4">
            <img
              class="h-8 w-auto"
              src="./assets/images/other/chick.png"
              alt="Chicken"
            />
            <h1 class="pl-5 text-2xl logo-text">Chibits</h1>
          </div>
          <div class="mt-5 flex-grow flex flex-col">
            <nav class="flex-1 px-2 pb-4 space-y-1">
              <router-link
                :to="item.href"
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                @click.prevent="closeSidebar"
                class="transition duration-200 linear group flex items-center px-2 py-2 text-sm font-medium rounded-md active:dark:bg-slate-700"
              >
                <component
                  :is="item.icon"
                  class="mr-3 flex-shrink-0 h-6 w-6"
                  aria-hidden="true"
                />
                {{ item.name }}
              </router-link>
            </nav>
          </div>
        </div>
        <div>
          <XIcon
            @click="sidebarOpen = !sidebarOpen"
            class="h-6 w-6 absolute top-6 right-6"
            :class="mintRoute ? 'x-icon-mint' : 'x-icon-reg'"
          />
        </div>
      </div>
    </Transition>
    <!-- Menu Bar -->
    <div v-if="mintRoute">
      <div :class="mintRoute ? 'top-mint' : 'top-regular'" class="">
        <div
          :class="mintRoute ? 'mint-route' : 'not-mint-route'"
          class="sticky top-0 z-10 flex h-16 dark:bg-slate-800 dark:text-slate-500"
        >
          <button
            v-if="!sidebarOpen"
            type="button"
            class="px-4 text-white dark:border-gray-700"
            @click="sidebarOpen = !sidebarOpen"
          >
            <span class="sr-only">Open sidebar</span>
            <MenuAlt2Icon class="h-6 w-6" aria-hidden="true" />
          </button>
          <div class="flex-1 flex justify-between">
            <div class="flex-1 flex items-center justify-end">
              <ConnectWallet v-if="notHome && !mintRoute" />
            </div>
            <div class="flex px-5 items-center">
              <button
                v-if="!mintRoute"
                @click="applyDarkMode"
                type="button"
                class="text-slate-500 hover:text-gray-500"
              >
                <SunIcon
                  v-if="darkMode"
                  class="h-6 w-6 text-slate-500"
                  aria-hidden="true"
                />
                <MoonIcon v-else class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <main class="dark:bg-gray-900 dark:text-slate-500">
        <router-view></router-view>
      </main>
    </div>
    <!-- not mint route -->
    <div v-else :class="{ [`md:pl-64`]: sidebarOpen }">
      <div class="">
        <div
          class="sticky menu-reg top-0 z-10 flex bg-white dark:bg-slate-800 dark:text-slate-500"
        >
          <button
            type="button"
            class="px-4 text-gray-500 border-r dark:border-gray-700"
            @click="sidebarOpen = !sidebarOpen"
          >
            <span class="sr-only">Open sidebar</span>
            <MenuAlt2Icon class="h-6 w-6" aria-hidden="true" />
          </button>
          <div class="flex-1 flex">
            <div class="flex-1 flex items-center justify-end">
              <ConnectWallet v-if="notHome" />
            </div>
            <!-- dark/light toggle -->
            <div class="flex px-5 items-center">
              <button
                @click="applyDarkMode"
                type="button"
                class="text-slate-500 hover:text-gray-500"
              >
                <SunIcon
                  v-if="darkMode"
                  class="h-6 w-6 text-slate-500"
                  aria-hidden="true"
                />
                <MoonIcon v-else class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <main class="dark:bg-gray-900 dark:text-slate-500">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import Web3 from "web3";
import Web3Modal from 'web3modal'
import contract from "@/contracts/ABIs";
import ConnectWallet from "@/components/ConnectWallet.vue";
import {
  Dialog,
  DialogOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  SunIcon,
  MoonIcon,
  HomeIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  MenuAlt2Icon,
  XIcon,
} from "@heroicons/vue/outline";

const web3Modal = new Web3Modal({
    cacheProvider: false,
    disableInjectedProvider: false
})

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: false },
  {
    name: "Mint",
    href: "/mint",
    icon: CurrencyDollarIcon,
    current: false,
  },
  {
    name: "Staking",
    href: "/staking",
    icon: CurrencyDollarIcon,
    current: false,
  },
  {
    name: "Marketplace",
    href: "/marketplace",
    icon: ShoppingBagIcon,
    current: false,
  },
];

export default {
  components: {
    Dialog,
    DialogOverlay,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
    SunIcon,
    MoonIcon,
    MenuAlt2Icon,
    CurrencyDollarIcon,
    ShoppingBagIcon,
    XIcon,
    ConnectWallet,
  },
  data() {
    let darkMode = localStorage.getItem("darkMode") == "true";
    return {
      navigation,
      sidebarOpen: ref(false),
      darkMode,
      walletIcon: ["fas", "wallet"],
    };
  },
  methods: {
    ...mapActions([
      "SET_WEB3",
      "SET_USER_ACCOUNT",
      "SET_TOKEN_INSTANCE",
      "SET_STAKING_INSTANCE",
      "SET_NFTS",
    ]),
    applyDarkMode() {
      this.darkMode = !this.darkMode;
      localStorage.setItem("darkMode", this.darkMode);
    },
    closeSidebar() {
        this.sidebarOpen = false
    }
  },
  computed: {
    ...mapGetters(["getWeb3"]),
    notHome() {
      return this.$route.name !== "home";
    },
    mintRoute() {
      return this.$route.name === "mint";
    },
  },
  watch: {
    darkMode(val) {
      if (val) {
        document.querySelector("html").classList.add("dark");
      } else {
        document.querySelector("html").classList.remove("dark");
      }
    },
  },
 async mounted() {
     let account = localStorage.getItem('userAccount')
     this.SET_USER_ACCOUNT(account)
      if(web3Modal.cachedProvider) {
          await web3Modal.connect()
      }
    if (localStorage.getItem("darkMode") == "true") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  },
  async beforeMount() {
    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    
    this.SET_WEB3(web3)
    // listen for provider changes
    provider.on('accountsChanged', (accounts) => {
        console.log('Disconnected')
        this.SET_USER_ACCOUNT(null)
    })

    let TOKEN_INSTANCE = new web3.eth.Contract(
      contract.TOKEN_ABI,
      contract.TOKEN_ADDR
    );
    let STAKING_INSTANCE = new web3.eth.Contract(
      contract.STAKING_ABI,
      contract.STAKING_ADDR
    );

    this.SET_TOKEN_INSTANCE(TOKEN_INSTANCE);
    this.SET_STAKING_INSTANCE(STAKING_INSTANCE);
  },
  
};
</script>

<style>
* {
  font-family: "CeraRegular", sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.router-link-exact-active {
  background-color: #f43f5e;
  color: white;
}

.logo-text {
  font-family: "Colombo", sans-serif;
}
.sidebar {
  background-color: white;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  /* transform: translateX(5px); */
  transition: all 0.5s linear;
  opacity: 0;
}
.top-mint {
  position: absolute;
  width: 100%;
}
.top-regular {
  position: relative;
  width: 100%;
}
.menu-reg {
    height: 4.5rem;
}
.not-mint-route {
  background-color: white;
}
.mint-route {
  background-color: transparent;
  position: absolute;
}
.sidebar-mint {
  background-color: transparent;
  color: white;
  border: none;
}
.sidebar-reg {
  background-color: white;
}
.x-icon-mint {
  color: white;
}
.x-icon-reg {
  color: #64748b;
}
/* ========== import fonts ========== */
@font-face {
  font-family: "Colombo";
  src: local("Colombo"), url(./fonts/Colombo.ttf) format("truetype");
}
@font-face {
  font-family: "CeraBlack";
  src: local("CeraBlack"), url(./fonts/Cera/CeraBlack.otf) format("truetype");
}
@font-face {
  font-family: "CeraBold";
  src: local("CeraBold"), url(./fonts/Cera/CeraBold.otf) format("truetype");
}
@font-face {
  font-family: "CeraLight";
  src: local("CeraLight"), url(./fonts/Cera/CeraLight.otf) format("truetype");
}
@font-face {
  font-family: "CeraMedium";
  src: local("CeraMedium"), url(./fonts/Cera/CeraMedium.otf) format("truetype");
}
@font-face {
  font-family: "CeraRegular";
  src: local("CeraRegular"),
    url(./fonts/Cera/CeraRegular.otf) format("truetype");
}
@font-face {
  font-family: "CeraThin";
  src: local("CeraThin"), url(./fonts/Cera/CeraThin.otf) format("truetype");
}
</style>
