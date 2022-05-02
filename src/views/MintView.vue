<template>
  <div
    class="mint mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-center"
  >
    <!-- Replace with your content -->
    <div class="mint-container flex flex-col justify-center h-1/2 w-full max-w-7xl">
      <div class="title text-7xl mb-16 text-white">Mint Chibits</div>
      <div class="flex items-center px-12 justify-center">
                  <button
          @click.prevent=""
          type="button"
          class="p-2 mr-6 w-1/5 text-md font-medium text-white border-2 border-white transition-all linear hover:bg-white hover:text-slate-500"
        >
          Check Whitelist
        </button>
        <button
          @click.prevent=""
          type="button"
          class="p-2 w-1/5 text-md font-medium border-2 border-transparent text-white bg-gradient-to-tl from-pink-500 to-rose-500 transition-all linear hover:opacity-80"
        >
          Mint
        </button>
      </div>
    </div>
    <!-- /End replace -->
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "MintView",
  components: {},
};
</script>

<style scoped>
.mint {
  height: 100vh;
  background-image: linear-gradient(to bottom, #667eeaa8, #764ba2a6),
    url("../assets/images/banner.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.mint-container {
  border: 2px solid white;
}
.title {
    /* border: 2px solid red; */
    font-family: 'Colombo', sans-serif;
    width: 100%;
}
</style>
