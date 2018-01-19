import Vue from "vue";
import app from "./app.vue";
import router from "../router";

import stores from '../store/store.js'

new Vue({
    el: "#app",
    router,
    store:stores,
    render: h => h(app)
})
