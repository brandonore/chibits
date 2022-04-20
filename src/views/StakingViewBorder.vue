<template>
  <div class="max-w-7xl mx-auto px-4 pb-4 sm:px-6 md:px-8">
    <h1 class="text-2xl text-left font-semibold text-slate-600">
      Staking Dashboard
    </h1>
  </div>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <!-- Replace with your content -->
    <div class="mt-2 grid grid-cols-3 lg:grid-cols-5 gap-5">
      <div
        v-for="card in cards"
        :key="card.id"
        class="overflow-hidden rounded-lg bg-white"
        :class="card.bg"
      >
        <div class="flex items-center justify-evenly card-bg h-full w-full p-5">
          <dl>
            <dd>
              <div class="text-sm pb-2 text-left font-medium text-slate-500">
                {{ card.title }}
              </div>
            </dd>
            <dt
              v-if="card.id !== 3"
              class="text-2xl text-left font-bold text-slate-500 truncate"
            >
              {{ card.amount }}
            </dt>
            <dt
              v-else
              class="text-2xl text-left font-bold text-slate-500 truncate"
            >
              {{ card.amount }}%
            </dt>
          </dl>
          <div class="icon-box p-2 rounded-md flex-shrink-0">
              <font-awesome-icon
                class="h-6 w-6"
                :icon="card.icon"
              />
            </div>
        </div>
      </div>
      <div
        class="flex bg-white border-l-4 border-[#3BD8BF] overflow-hidden col-span-3 lg:col-span-2 rounded-lg"
      >
        <!-- <div class="icon-box p-2 rounded-md flex-shrink-0">
              <font-awesome-icon
                class="h-6 w-6"
                :icon="card.icon"
              />
            </div> -->
        <div class="flex items-center justify-evenly card-bg w-full p-5">
          <dl>
            <dd>
              <div class="text-sm pb-2 text-left font-medium text-slate-500">
                Claimable CHI Balance
              </div>
            </dd>
            <dt class="text-2xl text-left font-bold text-slate-500 truncate">
              5500
            </dt>
          </dl>
          <button
            type="button"
            class="h-1/2 p-4 flex items-center text-sm font-extrabold rounded-md text-white bg-indigo-500 transition-all linear"
          >
            Claim CHI
          </button>
        </div>
      </div>
    </div>
    <!-- /End replace -->
  </div>
</template>

<script>
const cards = [
  {
    id: 1,
    title: "Number of NFTs Owned",
    amount: 10,
    icon: ["far", "hashtag"],
    bg: "border-l-4 border-indigo-500",
  },
  {
    id: 2,
    title: "CHI Earnings Per Day",
    amount: 350,
    icon: ["far", "coins"],
    bg: "border-l-4 border-[#FE8DAB]",
  },
  {
    id: 3,
    title: "Current Boost Amount",
    amount: 5,
    icon: ["far", "bolt"],
    bg: "border-l-4 border-[#FFBE96]",
  },
];

export default {
  name: "StakingView",
  components: {},
  data() {
    return {
      cards,
    };
  },
};
</script>

<style scoped>
.icon-box {
  /* background-color: #e3008c33; */
  color: #94a3b8;
}
.card-bg {
  background-image: url("../assets/images/other/circles.svg");
  background-repeat: no-repeat;
  background-size: cover;
}
button:hover {
  background-color: #696cffbe;
}
</style>
