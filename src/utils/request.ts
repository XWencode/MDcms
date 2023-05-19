import axios from "axios";
import { ElMessage  } from "element-plus";

const request=axios.create({
  baseURL:import.meta.env.VITE_APP_BASE_API,
  timeout:5000
})

request.interceptors.request.use((config)=>{

  return config
})

request.interceptors.response.use(res=>{
  // 简化数据
  return res.data
},error=>{
  // 失败回调，处理网路错误的回调
  // 定义一个变量存储网路错误信息
  let message=''
  let status=error.response.status
  switch(status){
    case 401:
      message="token过期了"
      break;
    case 403:
      message="无权访问"
      break;
    case 404:
      message="请求地址错误"
      break;
    case 500:
      message="服务器出现异常"
      break;
  }
  ElMessage({
    type:'error',
    message
  });
  return Promise.reject(error)
})

export default request;
