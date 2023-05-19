// 常量路由
export const constantRouter = [
  {
    name: 'login', //路由命名
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    name: 'home', //路由命名
    path: '/home',
    component: () => import('@/views/home/index.vue')
  },
  {
    name: '404', //路由命名
    path: '/404',
    component: () => import('@/views/404/index.vue')
  },
  {
    name:'any',
    path:'/:pathMatch(.*)*',
    redirect:'/404'
  }
]
