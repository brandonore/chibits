<template>
  <div class="dark:bg-gray-900 dark:text-white antialiased">
    <Transition name="slide-fade">
      <div
        v-if="sidebarOpen"
        class="absolute left-0 w-full z-50 border-b dark:border-b-gray-700 md:border-b-0 md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 transition-all"
      >
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div
          class="flex flex-col flex-grow md:border-r border-gray-200 pt-5 bg-white overflow-y-auto dark:bg-gray-900 dark:text-white dark:border-gray-600"
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
          />
        </div>
      </div>
    </Transition>
    <!-- Menu Bar -->
    <div :class="{ [`md:pl-64`]: sidebarOpen }" class="flex flex-col flex-1">
      <div
        class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white dark:bg-slate-800 dark:text-white shadow"
      >
        <button
          type="button"
          class="px-4 text-gray-500 border-r dark:border-gray-700"
          @click="sidebarOpen = !sidebarOpen"
        >
          <span class="sr-only">Open sidebar</span>
          <MenuAlt2Icon class="h-6 w-6" aria-hidden="true" />
        </button>
        <div class="flex-1 flex justify-between">
          <div class="flex-1 flex items-center justify-end">
              <ConnectWallet />
          </div>
          <!-- dark/light toggle -->
          <div class="flex px-5 items-center">
            <button
              @click="applyDarkMode"
              type="button"
              class="text-gray-400 hover:text-gray-500"
            >
              <SunIcon
                v-if="darkMode"
                class="h-6 w-6 text-gray-400"
                aria-hidden="true"
              />
              <MoonIcon v-else class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <main class="flex-1 bg-main">
        <div class="pt-6 bg-girl">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import ConnectWallet from '@/components/ConnectWallet.vue'
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
  UsersIcon,
  XIcon,
} from "@heroicons/vue/outline";
import { SearchIcon } from "@heroicons/vue/solid";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: false },
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
    SearchIcon,
    CurrencyDollarIcon,
    ShoppingBagIcon,
    XIcon,
    ConnectWallet
},
  data() {
    return {
      navigation,
      sidebarOpen: ref(false),
      darkMode: ref(false),
      walletIcon: ["fas", "wallet"],
    };
  },
  methods: {
    applyDarkMode() {
      this.darkMode = !this.darkMode;
      console.log("clicked");
      document
        .querySelector("html")
        .classList[this.darkMode ? "add" : "remove"]("dark");
    },
  },
  computed: {
    notHome() {
      return this.$route.name !== "home";
    },
  },
};
</script>

<style>
* {
  font-family: "CeraRegular", sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #94a3b8;
}

.router-link-exact-active {
  background-color: #8a5cf638;
  color: #8b5cf6;
}

.logo-text {
  font-family: "Colombo", sans-serif;
}
.sidebar {
  background-color: white;
}
@font-face {
  font-family: "Colombo";
  src: local("Colombo"), url(./fonts/Colombo.ttf) format("truetype");
}
.slide-fade-enter-active {
  /* transition: all 0.5s ease-out; */
}

.slide-fade-leave-active {
  /* transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1); */
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  /* transform: translateX(10px); */
  transition: all 0.5s linear;
  opacity: 0;
}
.bg-main {
  /* background-image: url('./assets/images/other/banner.png'); */
  /* background-repeat: no-repeat;
    background-size: cover;
    background-position: left;
    z-index: -1; */
}
/* .bg-girl {
        background-image: url('./assets/images/other/girl-bg-staking.png');
    background-size: 25%;
    background-position: bottom right;
    background-repeat: no-repeat;
    background-attachment: fixed;
} */
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
