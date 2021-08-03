<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link class="navbar-brand" :to="{ name: 'Home' }">
          Vue Auth App
        </router-link>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            <template v-if="loggedIn">
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  exact-active-class="active"
                  :to="{ name: 'Dashboard' }"
                >
                  Dashboard
                </router-link>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  exact-active-class="active"
                  href="#"
                  @click="signout"
                >
                  Sign out
                </a>
              </li>
            </template>
            <template v-else>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  exact-active-class="active"
                  :to="{ name: 'Signin' }"
                >
                  Sign in
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  exact-active-class="active"
                  :to="{ name: 'Signup' }"
                >
                  Sign up
                </router-link>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container pt-3">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "App",
  setup() {
    const store = useStore();
    const router = useRouter();

    const loggedIn = computed(() => store.getters["loggedIn"]);

    if (loggedIn) {
      store.dispatch("fetchUser");
    }

    function signout() {
      store.dispatch("signout");

      router.push({ name: "Home" });
    }

    return {
      loggedIn,
      signout,
    };
  },
});
</script>