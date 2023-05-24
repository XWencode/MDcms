// 统一管理项目用户相关接口
import request from "@/utils/request";
import type { loginType,loginResDataType,userResInfoType } from "./type";
// 统一管理接口
enum API{
  LOGIN_URL="/admin/acl/index/login",
  USERINFO_URL="/admin/acl/index/info",
  USERLOGOUT_URL="/admin/acl/index/logout"
}

// 登录接口
export const reqLogin=(data:loginType)=>request.post<any,loginResDataType>(API.LOGIN_URL,data)
// 获取用户信息
export const reqUserInfo=()=>request.get<any,userResInfoType>(API.USERINFO_URL)
// 退出登录接口
export const reqUserLogOut=()=>request.post<any,any>(API.USERLOGOUT_URL)

