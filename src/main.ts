import { createApp } from "vue";
import App from "./App.vue";
//引入element-plus与样式
// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css'
// 这里改为了按需导入
// svg插件需要的配置代码
import "virtual:svg-icons-register";
// 引入自定义插件对象：注册整个项目全局组件
import gloalComponents from "@/components";
// 暗黑模式的样式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 引入模板的全局样式
import "@/styles/index.scss";
// 引入路由
import router from "./router";
// 引入pinia
import pinia from './store'
// 引入路由守卫
import './permisstion'
const app = createApp(App);
// app.use(ElementPlus)
// 引入自定义插件
app.use(gloalComponents);
// 注册路由
app.use(router)
// 注册pinia
app.use(pinia)
app.mount("#app");
