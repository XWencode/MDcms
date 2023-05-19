// 统一管理项目用户相关接口
import request from "@/utils/request";
import type { loginType,loginResDataType,userReqInfoType } from "./type";
// 统一管理接口
enum API{
  LOGIN_URL="/user/login",
  USERINFO_URL="/user/info"
}

// 登录接口
export const reqLogin=(data:loginType)=>request.post<any,loginResDataType>(API.LOGIN_URL,data)
// 获取用户信息
export const reqUserInfo=()=>request.get<any,userReqInfoType>(API.USERINFO_URL)
