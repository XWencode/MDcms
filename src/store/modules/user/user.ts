// 创建用户相关的小仓库
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqUserLogOut } from '@/api/user'
import { LocalCache } from '@/utils/caches'
// 引入数据类型
import type { loginResDataType, loginType, userResInfoType } from '@/api/user/type'
import type { UserStateType } from './type'
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes'
import { LOGIN_TOKEN } from '@/global'
// 引入lodash深拷贝方法
import cloneDeep from 'lodash/cloneDeep'
import router from '@/router'
// 用于过滤当前登录用户需要展示的路由
// 路由过滤的函数
function filterRouter( asyncRoutes:any,resRoutes:any) {
  return asyncRoutes.filter((item:any) => {
    if (resRoutes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterRouter( item.children,resRoutes)
      }
      return true
    }
  })
}

const useUserState = defineStore('User', {
  state: (): UserStateType => ({
    token: LocalCache.getCache(LOGIN_TOKEN),
    menuRoutes: constantRoute, //仓库存储生成菜单的路由
    // 存储用户名称和图像
    username: '',
    avatar: '',
    // 存储用户按钮权限
    roleBtnList:[]
  }),
  actions: {
    //用户登录
    async userLogin(loginForm: loginType) {
      let res: loginResDataType = await reqLogin(loginForm)
      if (res.code == 200) {
        // 持久化储存token
        LocalCache.setCache(LOGIN_TOKEN, res.data)
        // 能保证当前async函数返回一个成功的Promise
        return 'ok'
      } else {
        return Promise.reject(res.data)
      }
    },
    // 获取用户信息
    async getUserInfo() {
      let res: userResInfoType = await reqUserInfo()
      if (res.code == 200) {
        this.username = res.data.name
        this.avatar = res.data.avatar
        // 获取用户按钮权限列表
        this.roleBtnList=res.data.buttons
        // 得到用户具有权限的路由
        let userAsyncRoutes=filterRouter(cloneDeep(asyncRoute),res.data.routes)
        // 整合路由
        this.menuRoutes=[...constantRoute,...userAsyncRoutes,...anyRoute];
        // 目前路由器管理的只有常量路由：用户计算完毕异步路由、任意路由动态追加
        [...userAsyncRoutes,...anyRoute].forEach((route:any) => {
          router.addRoute(route)
        })
        return 'ok'
      } else {
        return Promise.reject(res.message)
      }
    },
    // 退出登录
    async userLogOut() {
      let res: any = await reqUserLogOut()
      if (res.code == 200) {
        // 清除useUserState中的用户信息
        LocalCache.removeCache(LOGIN_TOKEN)
        this.username = ''
        this.avatar = ''
        return 'ok'
      } else {
        return Promise.reject(res.message)
      }
    },
  },
  getters: {}
})
export default useUserState
