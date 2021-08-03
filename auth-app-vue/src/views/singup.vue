<template>
  <form @submit.prevent="onSubmit">
    <h1>Sign up</h1>
    <div class="mt-4">
      <label class="form-label">Username</label>
      <input v-model="username" type="text" class="form-control" />
    </div>
    <div class="mt-3">
      <label class="form-label">Password</label>
      <input v-model="password" type="password" class="form-control" />
    </div>
    <button type="submit" class="mt-3 btn btn-primary">Sign up</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      username: null,
      password: null,
    });

    async function onSubmit() {
      try {
        await store.dispatch("signup", {
          username: state.username,
          password: state.password,
        });

        router.push({ name: "Dashboard" });
      } catch (error) {
        console.log(error);
      }
    }

    return {
      ...toRefs(state),
      onSubmit,
    };
  },
});
</script>