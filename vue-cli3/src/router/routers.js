
let routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../pages/About.vue')
  },
]
export default routes