import { createRouter, createWebHashHistory } from 'vue-router'
import {constantRoute} from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  // 路由注册
  routes:constantRoute,
  // 滚动条位置
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { left:0,top: 0 }
  },
})

export default router
