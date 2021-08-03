import { createStore } from "vuex";

import { API } from "../constants";

const store = createStore({
  state: () => ({
    loggedIn: !!localStorage.getItem("token"),
    user: null,
  }),

  mutations: {
    SET_LOGGED_IN(state, payload) {
      state.loggedIn = payload;
    },
    SET_USER(state, payload) {
      state.user = payload;
      console.log(state.user);
    },
  },

  actions: {
    async fetchUser({ commit }) {
      API.defaults.headers.authorization = `Bearer ${localStorage.getItem(
        "token"
      )}`;

      const { data: user } = await API.get("/users/me");

      commit("SET_USER", user);
      commit("SET_LOGGED_IN", true);
    },

    async signin({ commit }, { username, password }) {
      const {
        data: { token, user },
      } = await API.post("/auth/signin", { username, password });

      localStorage.setItem("token", token);
      commit("SET_USER", user);
      commit("SET_LOGGED_IN", true);
    },

    async signup({ commit }, { username, password }) {
      const {
        data: { token, user },
      } = await API.post("/auth/signup", { username, password });

      localStorage.setItem("token", token);
      commit("SET_USER", user);
      commit("SET_LOGGED_IN", true);
    },

    signout({ commit }) {
      localStorage.removeItem("token");
      commit("SET_USER", null);
      commit("SET_LOGGED_IN", false);
    },
  },

  getters: {
    loggedIn: (state) => state.loggedIn,
    user: (state) => state.user,
  },
});

export default store;
