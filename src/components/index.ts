import SvgIcon from "./SvgIcon/index.vue";
import Pagination from "./Pagination/index.vue";
// 全局对象
const allGlobalComponent = { SvgIcon, Pagination };

// 对外暴露插件对象
export default {
  //务必叫做install方法
  install(app) {
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key]);
    });
  },
};
