import Vue from 'vue'
import VueRouter from "vue-router"
Vue.use(VueRouter)

//路由懒加载
const Index = () =>import ("../page/Index");
const Template = () =>import ("../page/Template");

const router = [
    {
        path: "/",
        component: Index
    },
    {
        path:'/template/:id',
        component:Template
    },
    { 
        path: '*', 
        redirect: '/' 
    }
]

export default new VueRouter({
    routes: router
})
