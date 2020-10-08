import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/movie",
    },
    {
      path: "/movie",
      component: () => import("../views/movie/index.vue"),
      redirect: "/movie/nowplaying",
      children: [
        {
          path: "city",
          name: "City",
          component: () => import("../views/movie/city/index.vue"),
        },
        {
          path: "nowplaying",
          name: "Nowplaying",
          component: () => import("../views/movie/nowplaying/index.vue"),
        },
        {
          path: "commingsoon",
          name: "Commingsoon",
          component: () => import("../views/movie/commingsoon/index.vue"),
        },
        {
          path: "search",
          name: "Search",
          component: () => import("../views/movie/search/index.vue"),
        },
      ],
    },
    {
      path: "/cinema",
      component: () => import("../views/cinema/index.vue"),
    },
    {
      path: "/mine",
      component: () => import("../views/mine/index.vue"),
    },
    {
      path: "/*",
      component: () => import("../views/not/notfound.vue"),
    },
  ],
  linkActiveClass: "active",
});
export default router;
