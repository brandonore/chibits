<template>
  <div class="flex-col">
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
      <div
        v-if="
          selected.category === 'WL Raffle' ||
          selected.category === 'Instant WL'
        "
        class="flex justify-between"
      >
        <!-- twitter link -->
        <div class="w-full space-y-1 text-left pr-4">
          <label class="block text-sm font-regular text-slate-500">
            Projects Twitter Link
          </label>
          <div class="mt-1">
            <input
              name="title"
              type="text"
              v-model="twitterLink"
              placeholder="Twitter link"
              required=""
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm placeholder-slate-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            />
          </div>
        </div>
        <!-- discord link -->
        <div class="w-full space-y-1 text-left">
          <label class="block text-sm font-regular text-slate-500">
            Projects Discord Link
          </label>
          <div class="mt-1">
            <input
              name="title"
              type="text"
              v-model="discordLink"
              placeholder="Discord link"
              required=""
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm placeholder-slate-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
      <!-- row 3 -->
      <div class="flex justify-between">
        <!-- number of winners -->
        <div class="w-full space-y-1 text-left">
          <label class="block text-sm font-regular text-slate-500">
            Number of Winners
          </label>
          <div class="mt-1">
            <input
              name="winners"
              type="text"
              v-model="numberOfWinners"
              placeholder="0"
              required=""
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm placeholder-slate-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            />
          </div>
        </div>
        <!-- date & time -->
        <div class="w-full ml-4 space-y-1 text-left">
          <label class="block text-sm font-regular text-slate-500">
            Set Expiration Date & Time
          </label>
          <div class="mt-1">
            <Datepicker v-model="expirationDate" :is24="false" />
          </div>
        </div>
      </div>
      <!-- row 4 -->
      <div class="flex justify-between">
        <!-- amount to enter -->
        <div class="w-full space-y-1 text-left">
          <label class="block text-sm font-regular text-slate-500">
            $CHI Cost
          </label>
          <div class="mt-1">
            <input
              name="cost"
              type="text"
              v-model="amountToEnter"
              placeholder="0"
              required=""
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm placeholder-slate-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            />
          </div>
        </div>
        <!-- amount to win -->
        <div
          v-if="selected.category === '$CHI Tokens'"
          class="w-full ml-4 space-y-1 text-left"
        >
          <label class="block text-sm font-regular text-slate-500">
            Reward
          </label>
          <div class="mt-1">
            <input
              name="reward"
              type="text"
              v-model="amountToWin"
              placeholder="# of $CHI Tokens the winner will get"
              required=""
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm placeholder-slate-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            />
          </div>
        </div>
        <!-- token id -->
        <div
          v-if="selected.category === 'Chibits NFT'"
          class="w-full ml-4 space-y-1 text-left"
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
      <!-- row 5 -->
      <div class="flex-col text-sm justify-center">
        <!-- img upload blank -->
        <div v-if="!preview">
          <label class="block font-normal text-left text-slate-500"> Cover photo </label>
          <div class="mt-2">
            <div
              class="flex justify-center px-6 pt-8 pb-9 border-2 border-slate-300 border-dashed rounded-md"
            >
              <div class="space-y-1 text-center">
                <div class="flex justify-center text-sm text-slate-600">
                  <label
                    for="file-upload"
                    class="relative cursor-pointer rounded-md font-medium text-pink-500 hover:text-pink-400"
                  >
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
                </div>
                <p class="text-xs text-gray-500">PNG, JPG or GIF</p>
              </div>
            </div>
          </div>
        </div>
        <!-- img preview -->
        <div class="" v-if="preview">
          <div class="flex-col space-y-6 text-left">
            <button
              type="button"
              @click.prevent="clearImage"
              class="inline-flex hover:opacity-75 text-white transition-all linear bg-gradient-to-tl from-pink-500 to-rose-500 items-center p-2 border border-transparent rounded-sm"
            >
              Clear Image
            </button>
            <div class="flex justify-center">
                <img :src="preview" class="h-96" />
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="pt-8">
      <button
        v-if="loading"
        disabled
        class="disabled:opacity-50 cursor-not-allowed w-full flex justify-center py-3 px-4 rounded-sm text-sm font-medium text-white bg-gradient-to-tl from-pink-500 to-rose-500 transition-all linear hover:opacity-75"
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
        Uploading...
      </button>
      <button
        v-else
        @click.prevent="submitNewItem"
        class="w-full flex justify-center py-3 px-4 rounded-sm text-sm font-medium text-white bg-gradient-to-tl from-pink-500 to-rose-500 transition-all linear hover:opacity-75"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { v4 as uuidv4 } from "uuid";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";
import { supabase } from "@/supabase";

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
      amountToEnter: null,
      amountToWin: null,
      tokenId: "",
      numberOfWinners: null,
      twitterLink: "",
      discordLink: "",
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
      filePath: null,
      file: null,
      expirationDate: new Date(),
      startDate: new Date(),
      loading: false,
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
        this.file = input.files[0];
        const fileExt = this.file.name.split(".").pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${fileName}`;
        this.filePath = filePath;
        reader.readAsDataURL(input.files[0]);
      }
    },
    clearImage() {
      this.preview = null;
      this.file = null;
      this.filePath = null;
    },
    async submitNewItem() {
      try {
        this.loading = true;
        if (!this.file) {
          throw new Error("You must select and image to upload.");
        }

        let { error: uploadError } = await supabase.storage
          .from("images")
          .upload(`public/${this.filePath}`, this.file, {
            cacheControl: "3600",
            upsert: false,
          });
        if (uploadError) throw uploadError;
      } catch (error) {
        alert(error.message);
      } finally {
        const { publicURL } = supabase.storage
          .from("images")
          .getPublicUrl(`public/${this.filePath}`);
        this.clearImage();
        this.addItemToDatabase(publicURL);
      }
    },
    async addItemToDatabase(publicURL) {
      let item = {
        title: this.title,
        desc: this.desc,
        amountToEnter: this.amountToEnter,
        amountToWin: this.amountToWin,
        tokenId: this.tokenId,
        numberOfWinners: this.numberOfWinners,
        category: this.selected.category,
        expirationDate: this.expirationDate,
        twitterLink: this.twitterLink,
        discordLink: this.discordLink,
        imgUrl: publicURL,
        user_id: this.getAuthUser.id
      };
      try {
        if (!this.title) {
          throw new Error("You must have a title");
        }
        let { error: uploadError } = await supabase
          .from("marketplace")
          .insert(item);
        if (uploadError) throw uploadError;
      } catch (error) {
        alert(error.message);
      } finally {
        this.loading = false;
        this.$emit('dbreload')
        console.log("item added successfully");
      }
    },
  },
  computed: {
      ...mapGetters(["getAuthUser"])
  }
};
</script>

<style></style>
