<template>
  <div>
    <h1>Welcome, {{ user.username }}!</h1>
    <h6>Your User ID: {{ user._id }}</h6>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();

    const user = computed(() => store.getters["user"]);

    return {
      user,
    };
  },
});
</script>