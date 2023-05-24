// 路由鉴权：鉴权，项目中路由能不能被访问的权限设置(某一个路由什么条件下可以访问，什么条件不能访问)
import router from '@/router'
import { LocalCache } from './utils/caches'
import { LOGIN_TOKEN, TITLE } from './global'
import useUserState from './store/modules/user/user'
// 引入进度条
import nprogress from 'nprogress'
nprogress.configure({showSpinner:false})
// 引入进度条样式
import 'nprogress/nprogress.css'
// 全局前置路由守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  nprogress.start()
  // 改变导航栏标题
  document.title=`${TITLE}`+`-${to.meta.title}`
  let token = LocalCache.getCache(LOGIN_TOKEN)
  let userState = useUserState()
  // 拿到用户信息
  let username = userState.username
  // 判断用户是否登录
  if (token) {
    // 用户登录了
    if (to.path == '/login') {
      // 登录了不能去登录页
      next('/home')
    } else {
      // 登录成功访问其他路由都可以
      // 是否存在用户信息
      if (!username) {
        try {
          // 发请求获取用户信息
          await userState.getUserInfo()
          next()
        } catch (error) {
          // 获取用户信息失败(也就是token过期)
          // 先退出登录
          await userState.userLogOut()
          next({path:'/login',query:{redirect:to.path}})
        }
      } else {
        // 存在则直接放行
        next()
      }
    }
  } else {
    // 用户未登录
    // 如果不是去登录页
    if (to.path != '/login') {
      // 将想要去的页面等到登录后重定向去
      next({ path: '/login', query: { redirect: to.path } })
    } else {
      next()
    }
  }
})
// 全局后置路由守卫
router.afterEach((to: any, from: any) => {
  nprogress.done()
})
