import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import http from "./assets/js/http";
// import Modal from './MobileModal/index';
// Vue.use(Modal);
// import Actions from './MobileAction/index';
// Vue.use(Actions);
// import Switchs from './MobileSwitch/index';
// Vue.use(Switchs);
Vue.use(http);
// 移动端引入amfe-flexible依赖 并在postcss.config.js中打开px2rem插件
// import "amfe-flexible"
const wx = require("weixin-js-sdk");
//挂载原型
Vue.prototype.wx = wx;
console.log(wx);
Vue.config.productionTip = false;
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
