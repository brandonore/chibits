<template>
  <div class="max-w-7xl pt-6 mx-auto px-4 sm:px-6 md:px-8">
    <h1 class="titles text-2xl text-left text-slate-500">Admin Dashboard</h1>
  </div>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <!-- Replace with your content -->
    <div class="py-4">
      <AuthLogin />
    </div>
    <!-- /End replace -->
  </div>
</template>

<script>

import AuthLogin from '../components/AuthLogin.vue';

export default {
  name: "AdminView",
  components: {
    AuthLogin
},
};
</script>
