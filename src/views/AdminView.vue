<template>
  <div class="max-w-7xl pt-6 mx-auto px-4 sm:px-6 md:px-8">
    <h1 class="titles text-2xl text-left text-slate-500">Admin Dashboard</h1>
  </div>
  <div class="flex justify-center max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <!-- Replace with your content -->
    <div class="w-full" v-if="getAuthUser">
        <DataTable />
    </div>
    <div class="w-full" v-else>
        <AuthLogin />
    </div>
    <!-- /End replace -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AuthLogin from "../components/AuthLogin.vue";
import AddMarketplaceItem from "@/components/AddMarketplaceItem.vue";
import DataTable from "@/components/DataTable.vue";

export default {
  name: "AdminView",
  components: {
    AuthLogin,
    AddMarketplaceItem,
    DataTable
},
  data() {
    return {};
  },
  computed: {
      ...mapGetters(["getAuthUser"])
  }
};
</script>
