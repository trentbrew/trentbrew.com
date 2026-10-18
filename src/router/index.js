import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Intro",
    component: () => import("@/views/Intro.vue"),
  },
  {
    path: "/desktop",
    name: "Desktop",
    component: () => import("@/views/Screen.vue"),
  },
  {
    path: "/go/:id",
    name: "Go",
    component: () => import("@/views/Redirect.vue"),
  },
  {
    path: "/redirect",
    name: "Redirect",
    component: () => import("@/views/Redirect.vue"),
  },
  {
    path: "/tv",
    name: "Channels",
    component: () => import("@/views/Redirect.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
