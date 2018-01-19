import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
//路由懒加载
const Index = () =>import ("../page/Index");
const Con = () =>import ("../page/Content");
const End = () =>import ("../page/End");

const router = [
    {
        path: "/",
        component: Index
    },
    {
        path: "/con",
        component: Con
    },
    {
        path: "/end",
        component: End
    },
    { 
        path: '*', 
        redirect: '/' 
    }
]

export default new VueRouter({
    mode: 'history',
    routes: router
})
