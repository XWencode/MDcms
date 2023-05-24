// 创建用户相关的小仓库
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqUserLogOut } from '@/api/user'
import { LocalCache } from '@/utils/caches'
// 引入数据类型
import type { loginResDataType, loginType,userResInfoType } from '@/api/user/type'
import type { UserStateType } from './type'
import { constantRouter } from '@/router/routes'
import { LOGIN_TOKEN } from '@/global'
const useUserState = defineStore('User', {
  state: (): UserStateType => ({
    token: LocalCache.getCache(LOGIN_TOKEN),
    menuRoutes: constantRouter, //仓库存储生成菜单的路由
    // 存储用户名称和图像
    username: '',
    avatar: ''
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
      let res:userResInfoType = await reqUserInfo()
      if (res.code == 200) {
        this.username = res.data.name
        this.avatar = res.data.avatar
        return 'ok'
      } else {
        return Promise.reject(res.message)
      }
    },
    // 退出登录
    async userLogOut() {
      let res:any = await reqUserLogOut()
      if (res.code == 200) {
        // 清除useUserState中的用户信息
        LocalCache.removeCache(LOGIN_TOKEN)
        this.username = ''
        this.avatar = ''
        return 'ok'
      }else{
        return Promise.reject(res.message)
      }
    }
  },
  getters: {}
})
export default useUserState
