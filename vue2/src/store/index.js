import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
Vue.use(Vuex);
import VuexPersistence from "vuex-persist";

import models from "./store";
// console.log(models);

// vuex持久存储 https://www.npmjs.com/package/vuex-persist
const persist = new VuexPersistence({
  storage: window.sessionStorage,
});

const plugins = [persist.plugin];

// https://vuex.vuejs.org/zh/guide/plugins.html#内置-logger-插件
if (process.env.NODE_ENV === "development") {
  plugins.push(
    createLogger({
      collapsed: false,
    })
  );
}

export default new Vuex.Store({
  modules: {
    ...models,
  },
  plugins,
});
