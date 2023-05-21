// 创建用户相关的小仓库
import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import { LocalCache } from '@/utils/caches'
// 引入数据类型
import type { loginResDataType, loginType } from '@/api/user/type'
import type {UserStateType} from './type'
import {constantRouter} from '@/router/routes'
const LOGIN_TOKEN = 'token'
const useUserState = defineStore('User', {
  state: ():UserStateType => ({
    token: LocalCache.getCache(LOGIN_TOKEN),
    menuRoutes:constantRouter //仓库存储生成菜单的路由
  }),
  actions: {
    async userLogin(loginForm: loginType) {
      let res:loginResDataType = await reqLogin(loginForm)
      if (res.code === 200) {
        // 持久化储存token
        LocalCache.setCache(LOGIN_TOKEN, res.data.token)
        // 能保证当前async函数返回一个成功的Promise
        return 'ok'
      } else {
        return Promise.reject(res.data.message)
      }
    }
  },
  getters: {}
})
export default useUserState
