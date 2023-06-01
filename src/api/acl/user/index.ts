import request from "@/utils/request";
import type {userInfoListResType,userInfoType,userInfoResType,assginRoleResType,addRoleType} from './type'
enum API{
  // 获取用户列表
  USER_URL='/admin/acl/user/',
  // 添加用户
  ADDUSER_URL='/admin/acl/user/save',
  // 修改用户信息
  UPDATEUSER_URL='/admin/acl/user/update',
  // 通过id得到用户信息
  USERINFO_URL='/admin/acl/user/get/',
  // 删除用户
  DELETEUSER_URL='/admin/acl/user/remove/',
  // 获取用户角色管理
  ROLEASSIGN_URL='/admin/acl/user/toAssign/',
  // 为用户添加职位
  ADDROLE_URL='/admin/acl/user/doAssignRole',
  // 批量删除用户
  DELETEMOREUSER_URL='/admin/acl/user/batchRemove'
}
// 获取用户列表的接口
export const reqUserList=(page:number,limit:number,username:string)=>request.get<any,userInfoListResType>(API.USER_URL+`${page}/${limit}?username=${username}`)
//添加或修改用户信息的接口
export const reqAddorUpdateUser=(data:userInfoType)=>{
  // 修改用户信息
  if(data.id){
    return request.put<any,any>(API.UPDATEUSER_URL,data)
  }else{
    // 添加用户
    return request.post<any,any>(API.ADDUSER_URL,data)
  }
}

// 通过id拿到用户的信息
export const reqUserInfo=(id:number)=>request.get<any,userInfoResType>(API.USERINFO_URL+id)
// 删除用户信息
export const reqDeleteUser=(id:number)=>request.delete<any,any>(API.DELETEUSER_URL+id)
// 获取用户角色管理
export const reqRoleAssgin=(adminId:number)=>request.get<any,assginRoleResType>(API.ROLEASSIGN_URL+adminId)
// 添加用户职位
export const reqAddRole=(data:addRoleType)=>request.post<any,any>(API.ADDROLE_URL,data)
// 批量删除用户
export const reqDeleteMoreUser=(idList:number[])=>request.delete<any,any>(API.DELETEMOREUSER_URL,{data:idList})
