<template>
  <div class="mt-6 flex justify-center">
    <form class="w-1/3 space-y-6">
      <div class="text-left">
        <label for="email" class="block text-sm font-regular text-slate-500">
          Email address
        </label>
        <div class="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            v-model="email"
            required=""
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm placeholder-slate-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
      </div>

      <div class="space-y-1 text-left">
        <label for="password" class="block text-sm font-regular text-slate-500">
          Password
        </label>
        <div class="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            v-model="password"
            required=""
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm placeholder-slate-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
      </div>
      <div class="pt-4">
        <button
          @click="login"
          class="w-full flex justify-center py-3 px-4 rounded-sm text-sm font-medium text-white bg-gradient-to-tl from-pink-500 to-rose-500 transition-all linear hover:opacity-75"
        >
          Sign in
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { supabase } from "@/supabase";
import { mapActions } from "vuex";

export default {
  name: "AuthLogin",
  data() {
    return {
      loading: false,
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["SET_AUTH_USER"]),
    async login() {
      try {
        this.loading = true;
        const { user, session, error } = await supabase.auth.signIn({
          email: this.email,
          password: this.password,
        });
        if (error) throw error;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
        this.SET_AUTH_USER(supabase.auth.user());
      }
    },
  },
};
</script>

<style></style>
