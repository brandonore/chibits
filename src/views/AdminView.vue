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
import { mapGetters, mapActions } from "vuex";
import { supabase } from "@/supabase";
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
  methods: {
      ...mapActions(["SET_AUTH_USER"])
  },
  computed: {
      ...mapGetters(["getAuthUser"])
  },
  mounted() {
      const session = supabase.auth.session()
      if(session) {
          this.SET_AUTH_USER(session.user)
      }
  }
};
</script>
