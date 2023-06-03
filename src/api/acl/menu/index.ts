import request from "@/utils/request";
import type {allMenuType,allMenuResType} from './type'
enum API{
  // 获取全部菜单管理
  MENU_URL='/admin/acl/permission',
  // 添加菜单
  ADDMENU_URL='/admin/acl/permission/save',
  // 修改菜单
  EDITMENU_URL='/admin/acl/permission/update',
  // 删除菜单
  DELETEMENU_URL='/admin/acl/permission/remove/'
}
// 获取全部菜单项
export const reqMenuList=()=>request.get<any,allMenuResType>(API.MENU_URL)
//添加或者修改菜单
export const reqAddOrEditMneu=(data:allMenuType)=>{
  if(data.id){
    return request.put<any,any>(API.EDITMENU_URL,data)
  }else{
    return request.post<any,any>(API.ADDMENU_URL,data)
  }
}
// 删除菜单
export const reqDeleteMenu=(id:number)=>request.delete<any,any>(API.DELETEMENU_URL+id)
