// 仓库
import {createPinia} from 'pinia'
// 创建大仓库
const pinia=createPinia();
// 对外暴露pinia，因为入口文件需要引入pinia
export default pinia
