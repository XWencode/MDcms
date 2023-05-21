import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 全局对象
const allGlobalComponent = { SvgIcon, Pagination }

// 对外暴露插件对象
export default {
  //务必叫做install方法
  install(app) {
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key])
    })
    // 注册全部el-icon图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}
