// 常量路由
export const constantRoute = [
  {
    name: 'Login', //路由命名
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', isshow: false }
  },
  {
    name: '',
    path: '/',
    component: () => import('@/layout/index.vue'),
    meta: { title: 'layout', isshow: true },
    redirect: '/home',
    children: [
      {
        name: 'Home',
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页', icon: 'HomeFilled', isshow: true } //title菜单标题，icon菜单图标，isshow是否显示在菜单栏
      }
    ]
  },
  {
    name: 'Sceen',
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    meta: { title: '数据大屏', icon: 'Platform', isshow: true }
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    meta: { title: '404', isshow: false }
  }
]
// 异步路由
export const asyncRoute = [
  {
    name: 'Acl',
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    meta: { title: '权限管理', icon: 'Lock', isshow: true },
    redirect: '/acl/user',
    children: [
      {
        name: 'User',
        path: '/acl/user',
        component: () => import('@/views/acl/user/incdex.vue'),
        meta: { title: '用户管理', icon: 'User', isshow: true }
      },
      {
        name: 'Role',
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: { title: '角色管理', icon: 'UserFilled', isshow: true }
      },
      {
        name: 'Permission',
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: { title: '菜单管理', icon: 'Grid', isshow: true }
      }
    ]
  },
  {
    name: 'Product',
    path: '/product',
    component: () => import('@/layout/index.vue'),
    meta: { title: '商品管理', icon: 'Goods', isshow: true },
    redirect: '/product/trademark',
    children: [
      {
        name: 'Trademark',
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        meta: { title: '品牌管理', icon: 'ShoppingCart', isshow: true }
      },
      {
        name: 'Attr',
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        meta: { title: '属性管理', icon: 'List', isshow: true }
      },
      {
        name: 'Sku',
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        meta: { title: 'SKU管理', icon: 'Briefcase', isshow: true }
      },
      {
        name: 'Spu',
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        meta: { title: 'SPU管理', icon: 'Briefcase', isshow: true }
      }
    ]
  }
]
// 任意路由
export const anyRoute = [
  {
    name: 'Any',
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: { title: '任意路由', isshow: false }
  }
]
