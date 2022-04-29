<template>
  <div class="py-24 border-2 rounded-xl">
    <font-awesome-icon
      :icon="starsIcon"
      class="text-slate-400 mx-auto h-12 w-12"
      aria-hidden="true"
    />
    <h1 class="mt-2 text-xl font-medium text-slate-500">No Chibits staked!</h1>
    <p class="mb-6 mt-1 text-sm text-slate-500">Select your chibits to stake</p>
  </div>
</template>

<script>
export default {
  name: "StakedNfts",
  data() {
    return {
      selectedNfts: [],
      starsIcon: ["fas", "stars"],
    };
  },
};
</script>

<style></style>
