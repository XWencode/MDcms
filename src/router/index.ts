import { createRouter, createWebHashHistory } from 'vue-router'
import {constantRouter} from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes:constantRouter,
  // 滚动条位置
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { left:0,top: 0 }
  },
})

export default router
