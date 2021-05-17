import Vue from "vue";
import vueRouter from "vue-router";
import routes from "./routers";
Vue.use(vueRouter);

const router = new vueRouter({
  routes,
});

// router.beforeEach((to, from, next) => {
//   // 路由发生变化修改页面title
//   if (to.meta.title) {
//     document.title = to.meta.title;
//   }
//   next();
// });

export default router;
