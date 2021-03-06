<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="px-4 lg:px-0 mt-16">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl text-left text-slate-500">Marketplace Items</h1>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          @click.prevent="openModal"
          type="button"
          class="inline-flex items-center justify-center p-2 rounded-sm text-sm font-medium text-white bg-gradient-to-tl from-pink-500 to-rose-500 transition-all linear hover:opacity-75 sm:w-auto"
        >
          New Item
        </button>
      </div>
    </div>
    <!-- table -->
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div
            class="overflow-hidden md:rounded-sm border border-slate-300 dark:border-slate-500"
          >
            <table
              class="min-w-full divide-y divide-slate-300 dark:divide-slate-500"
            >
              <thead class="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm text-slate-500 sm:pl-6"
                  >
                    <a href="#" class="cera-extrabold group inline-flex">
                      Category
                      <span
                        class="invisible ml-2 flex-none rounded text-slate-400 group-hover:visible group-focus:visible"
                      >
                        <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </a>
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-slate-500"
                  >
                    <a href="#" class="cera-extrabold group inline-flex">
                      Title
                      <span
                        class="ml-2 flex-none rounded dark:bg-slate-600 text-slate-700 group-hover:bg-slate-300"
                      >
                        <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </a>
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-slate-500"
                  >
                    <a href="#" class="cera-extrabold group inline-flex">
                      Description
                      <span
                        class="invisible ml-2 flex-none rounded text-slate-400 group-hover:visible group-focus:visible"
                      >
                        <ChevronDownIcon
                          class="invisible ml-2 h-5 w-5 flex-none rounded text-slate-400 group-hover:visible group-focus:visible"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-slate-500"
                  >
                    <a href="#" class="cera-extrabold group inline-flex">
                      $CHI Cost
                      <span
                        class="invisible ml-2 flex-none rounded text-slate-400 group-hover:visible group-focus:visible"
                      >
                        <ChevronDownIcon
                          class="invisible ml-2 h-5 w-5 flex-none rounded text-slate-400 group-hover:visible group-focus:visible"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody
                class="divide-y divide-slate-200 bg-white dark:bg-slate-800 dark:divide-slate-500"
              >
                <tr v-for="item in data" :key="item.id">
                  <td
                    class="whitespace-nowrap text-left pl-4 pr-3 py-4 text-sm font-medium text-slate-500"
                  >
                    {{ item.category }}
                  </td>
                  <td
                    class="whitespace-nowrap text-left px-3 py-4 text-sm text-slate-500"
                  >
                    {{ item.title }}
                  </td>
                  <td
                    class="whitespace-nowrap text-left px-3 py-4 text-sm text-slate-500"
                  >
                    {{ item.desc }}
                  </td>
                  <td
                    class="whitespace-nowrap text-left px-3 py-4 text-sm text-slate-500"
                  >
                    {{ item.amountToEnter }}
                  </td>
                  <td
                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                  >
                    <button
                      @click.prevent="deleteItem(item)"
                      class="text-pink-500 hover:text-pink-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- modal -->
    <TransitionRoot as="template" :show="showModal">
      <Dialog as="div" class="relative z-10" @close="showModal = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <div class="fixed z-10 inset-0 overflow-y-auto">
          <div
            class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
          >
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
              <DialogPanel
                class="w-full sm:w-2/3 xl:w-1/2 2xl:w-1/3 relative inline-block align-middle bg-white dark:bg-slate-800 rounded-sm p-8 transform transition-all"
              >
                <AddMarketplaceItem @dbreload="triggerDbReload" />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { supabase } from "@/supabase";
import { ChevronDownIcon } from "@heroicons/vue/solid";
import {
  Dialog,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
  DialogPanel,
} from "@headlessui/vue";
import AddMarketplaceItem from "./AddMarketplaceItem.vue";

export default {
  name: "DataTable",
  components: {
    ChevronDownIcon,
    Dialog,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    DialogPanel,
    AddMarketplaceItem,
  },
  data() {
    return {
      data: null,
      loading: false,
      showModal: false,
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
          this.data = data;
        }
      } catch (error) {
        alert(error.message);
      } finally {
        this.loading = false;
      }
    },
    openModal() {
      this.showModal = true;
    },
    triggerDbReload() {
      this.showModal = false;
      this.getData();
    },
    async deleteItem(item) {
      const id = item.id;
      let prefix =
        "https://vpyikcjriwwrxoblslds.supabase.co/storage/v1/object/public/images/public/";
      let url = "";
      let imgUrl = "";
      if (item.url) {
        url = item.imgUrl;
        imgUrl = url.slice(prefix.length);
      }

      try {
        const { data, error } = await supabase
          .from("marketplace")
          .delete()
          .match({ id: id });

        if (error) throw error;
      } catch (error) {
        alert(error.message);
      } finally {
        console.log("item deleted successfully");
        this.getData();
        if (url !== "") {
          this.deleteImg(imgUrl);
        }
      }
    },
    async deleteImg(url) {
      try {
        const { data, error } = await supabase.storage
          .from("images")
          .remove([`public/${url}`]);
        if (error) throw error;
      } catch (error) {
        alert(error.message);
      } finally {
        console.log("img deleted");
      }
    },
  },
  computed: {
    ...mapGetters(["getAuthUser"]),
  },
  mounted() {
    this.getData();
  },
};
</script>
