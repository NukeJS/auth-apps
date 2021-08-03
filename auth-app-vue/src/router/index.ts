import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/index.vue"),
  },
  {
    path: "/signin",
    name: "Signin",
    component: () => import("../views/signin.vue"),
    meta: {
      auth: "guest",
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/singup.vue"),
    meta: {
      auth: "guest",
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/dashboard.vue"),
    meta: {
      auth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

import store from "../store";

router.beforeEach((to, from, next) => {
  const loggedIn = store.getters["loggedIn"];

  if (to.meta.auth) {
    if (to.meta.auth == "guest") {
      if (!loggedIn) {
        next();
      } else {
        next({ name: "Dashboard" });
      }
    } else {
      if (!loggedIn) {
        next({ name: "Home" });
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router;
