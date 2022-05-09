<template>
  <div class="mt-12 flex-col">
    <h1 class="text-2xl mb-10 text-left">New Marketplace Item</h1>
    <form class="space-y-6">
      <div class="text-left">
        <!-- categories -->
        <label for="email" class="block text-sm text-slate-500">
          Select Category
        </label>
        <div class="mt-1">
          <Listbox as="div" v-model="selected">
            <div class="mt-1 relative">
              <ListboxButton
                class="bg-white relative w-full border border-gray-300 rounded-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              >
                <span class="block truncate">{{ selected.category }}</span>
                <span
                  class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                >
                  <SelectorIcon
                    class="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </ListboxButton>

              <transition
                leave-active-class="transition ease-in duration-100"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  class="absolute z-10 mt-1 w-full bg-white max-h-60 rounded-sm py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    as="template"
                    v-for="item in categories"
                    :key="item.id"
                    :value="item"
                    v-slot="{ active, selected }"
                  >
                    <li
                      :class="[
                        active ? 'text-white bg-pink-500' : 'text-slate-500',
                        'cursor-default select-none relative py-2 pl-3 pr-9',
                      ]"
                    >
                      <span
                        :class="[
                          selected ? 'font-normal' : 'font-normal',
                          'block truncate',
                        ]"
                      >
                        {{ item.category }}
                      </span>

                      <span
                        v-if="selected"
                        :class="[
                          active ? 'text-white' : 'text-pink-500',
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                        ]"
                      >
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>
      </div>
      <!-- row 1 -->
      <div class="flex justify-between">
        <!-- title -->
        <div class="pr-4 space-y-1 text-left">
          <label class="block text-sm font-regular text-slate-500">
            Title
          </label>
          <div class="mt-1">
            <input
              name="title"
              type="text"
              v-model="title"
              :placeholder="selected.title"
              required=""
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm placeholder-slate-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            />
          </div>
        </div>
        <!-- desc -->
        <div class="flex-1 space-y-1 text-left">
          <label class="block text-sm font-regular text-slate-500">
            Description
          </label>
          <div class="mt-1">
            <input
              name="title"
              type="text"
              v-model="desc"
              :placeholder="selected.desc"
              required=""
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm placeholder-slate-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
      <!-- row 2 -->
      <div class="flex justify-between">
        <!-- amount to enter -->
        <div class="space-y-1 text-left pr-4">
          <label class="block text-sm font-regular text-slate-500">
            $CHI Cost
          </label>
          <div class="mt-1">
            <input
              name="title"
              type="text"
              v-model="amountToEnter"
              :placeholder="selected.amountToEnter"
              required=""
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm placeholder-slate-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            />
          </div>
        </div>
        <!-- amount to win -->
        <div
          v-if="selected.category === '$CHI Tokens'"
          class="flex-1 space-y-1 text-left"
        >
          <label class="block text-sm font-regular text-slate-500">
            Reward
          </label>
          <div class="mt-1">
            <input
              name="title"
              type="text"
              v-model="amountToWin"
              placeholder="Number of $CHI Tokens the winner will get"
              required=""
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm placeholder-slate-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            />
          </div>
        </div>
        <!-- token id -->
        <div
          v-if="selected.category === 'Chibits NFT'"
          class="flex-1 space-y-1 text-left"
        >
          <label class="block text-sm font-regular text-slate-500">
            NFT Token ID
          </label>
          <div class="mt-1">
            <input
              name="title"
              type="text"
              v-model="tokenId"
              placeholder="Enter token id of the NFT"
              required=""
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm placeholder-slate-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
      <!-- row 3 -->
      <div class="flex-col text-sm text-left justify-center">
        <!-- img upload blank -->
        <div v-if="!preview">
          <label class="block font-normal text-slate-500"> Cover photo </label>
          <div class="mt-2">
            <div
              class="flex justify-center px-6 pt-8 pb-9 border-2 border-slate-300 border-dashed rounded-md"
            >
              <div class="space-y-1 text-center">
                <svg
                  class="mx-auto h-12 w-12 text-slate-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div class="flex text-sm text-slate-600">
                  <label
                    for="file-upload"
                    class="relative cursor-pointer rounded-md font-medium text-pink-500 hover:text-pink-400"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      accept="image/x-png,image/gif,image/jpeg"
                      type="file"
                      class="sr-only"
                      @change="previewImage"
                    />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        </div>
        <!-- img preview -->
        <div class="" v-if="preview">
          <div class="flex-col space-y-6 relative justify-center">
            <button
              type="button"
              @click.prevent="clearImage"
              class="inline-flex hover:opacity-75 text-white transition-all linear bg-gradient-to-tl from-pink-500 to-rose-500 items-center p-2 border border-transparent rounded-sm"
            >
              Clear Image
            </button>
            <img :src="preview" class="h-1/4" />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";

export default {
  name: "AddMarketplaceItem",
  components: {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
    CheckIcon,
    SelectorIcon,
  },
  data() {
    return {
      title: "",
      desc: "",
      amountToEnter: 0,
      amountToWin: null,
      tokenId: "",
      categories: [
        {
          id: 1,
          category: "$CHI Tokens",
          title: "$CHI Raffle",
          desc: "Enter for a chance to win $CHI Tokens",
          amountToEnter: 0,
          amountToWin: 0,
          tokenId: null,
          img: null,
        },
        {
          id: 2,
          category: "Chibits NFT",
          title: "Chibits NFT Raffle",
          desc: "Enter for a chance to win a Chibits - Hana NFT!",
          amountToEnter: 0,
          amountToWin: 0,
          tokenId: null,
          img: null,
        },
        {
          id: 3,
          category: "WL Raffle",
          title: "WL Raffle",
          desc: "Enter for a chance to win a whitelist spot!",
          amountToEnter: 0,
          amountToWin: 0,
          tokenId: null,
          img: null,
        },
        {
          id: 4,
          category: "Instant WL",
          title: "Instant WL",
          desc: "Buy an instant whitelist spot!",
          amountToEnter: 0,
          amountToWin: 0,
          tokenId: null,
          img: null,
        },
        {
          id: 5,
          category: "IRL Raffle",
          title: "IRL Raffle",
          desc: "Enter for a chance to win irl merch!",
          amountToEnter: 0,
          amountToWin: 0,
          tokenId: null,
          img: null,
        },
      ],
      selected: {
        id: 1,
        category: "$CHI Tokens",
        title: "$CHI Raffle",
        desc: "Enter for a chance to win $CHI Tokens",
        amountToEnter: 0,
        amountToWin: 0,
        tokenId: null,
        img: null,
      },
      preview: null,
      image: null,
    };
  },
  methods: {
    previewImage(event) {
      let input = event.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    clearImage() {
      this.preview = null;
    },
  },
};
</script>

<style></style>
