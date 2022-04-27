<template>
        <div class="md:mt-8 p-4">
      <div class="flex items-center justify-between pt-4 pb-8">
        <h1 class="titles text-2xl text-left text-slate-500">Staked NFTs</h1>
        <button
          type="button"
          class="p-3 w-1/3 md:w-1/6 text-md font-extrabold rounded-md text-violet-500 bg-[#8a5cf638] hover:bg-violet-500 hover:text-white transition-all linear hover:opacity-75"
        >
          Unstake
          <span v-if="selectedNfts.length"
            >({{ selectedNfts.length }})</span
          >
        </button>
      </div>
      <!-- staked container -->
      <!-- <div v-if="getUserAccount && getNftCount.length > 0">
        <StakedNfts />
      </div> -->
      <!-- loading staked nfts -->
      <!-- <div v-else-if="!getUserAccount" class="py-24">
        <font-awesome-icon
          :icon="spinnerIcon"
          class="text-slate-400 mx-auto h-12 w-12 animate-spin"
          aria-hidden="true"
        />
        <h1 class="mt-2 text-xl font-medium text-slate-400">
          Fetching Chibits ⭐ ...
        </h1>
      </div> -->
      <!-- no staked nfts -->
      <div class="py-24 border-2 rounded-xl">
        <font-awesome-icon
          :icon="starsIcon"
          class="text-slate-400 mx-auto h-12 w-12"
          aria-hidden="true"
        />
        <h1 class="mt-2 text-xl font-medium text-slate-500">
          No Chibits staked!
        </h1>
        <p class="mb-6 mt-1 text-sm text-slate-500">
          Select your chibits to stake
        </p>
      </div>
    </div>
</template>

<script>
export default {
    name: 'StakedNfts',
    data() {
        return {
            selectedNfts: [],
            starsIcon: ["fas", "stars"],
        }
    }
}
</script>

<style>

</style>