import { createApp } from "vue";
import App from "./App.vue";
//引入element-plus与样式
// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css'
// 这里改为了按需导入
const app = createApp(App);
// app.use(ElementPlus)
// svg插件需要的配置代码
import "virtual:svg-icons-register";
// 引入自定义插件对象：注册整个项目全局组件
import gloalComponents from "@/components";
// 引入自定义插件
app.use(gloalComponents);
// 引入模板的全局样式
import "@/styles/index.scss";

app.mount("#app");
