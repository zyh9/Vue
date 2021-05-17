let routes = [
  {
    path: "/",
    name: "",
    component: () => import("@/pages/home.vue"),
    meta: {
      title: "首页",
      keepAlive: true,
    },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/pages/about.vue"),
    meta: {
      title: "关于",
    },
  },
  {
    path: "*",
    redirect: "/",
  },
];
export default routes;
