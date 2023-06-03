import request from "@/utils/request";
import type {allMenuResType} from './type'
enum API{
  // 获取全部菜单管理
  MENU_URL='/admin/acl/permission'
}
// 获取全部菜单项
export const reqMenuList=()=>request.get<any,allMenuResType>(API.MENU_URL)
