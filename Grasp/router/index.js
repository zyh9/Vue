import Vue from 'vue'
import VueRouter from "vue-router"
Vue.use(VueRouter)

//路由懒加载
// const Index = () =>import ("../page/Index");

const router = [
    // {
    //     path: "/",
    //     component: Index
    // },
    // { 
    //     path: '*', 
    //     redirect: '/' 
    // }
]

export default new VueRouter({
    routes: router
})
