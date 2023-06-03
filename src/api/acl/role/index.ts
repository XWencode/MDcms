import request from '@/utils/request'
import type { roleType, roleListResType,allRoleMenuResType } from './type'
enum API {
  ROLELIST_URL = '/admin/acl/role/',
  // 新增职位
  ADDROLE_URL = '/admin/acl/role/save',
  // 修改职位
  UPDATEROLE_URL = '/admin/acl/role/update',
  // 删除职位
  DELETEROLE_URL='/admin/acl/role/remove/',
  // 获取角色权限列表
  ALLPERMISSTION_URL='/admin/acl/permission/toAssign/',
  // 分配权限
  SETPERMISTION_URL='/admin/acl/permission/doAssign'
}
// 获取角色列表的接口
export const reqRoleList = (page: number, limit: number, roleName: string) =>
  request.get<any, roleListResType>(API.ROLELIST_URL + `${page}/${limit}?roleName=${roleName}`)
// 新增或者修改职位
export const reqAddOrUpdateRole = (data: roleType) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, data)
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data)
  }
}
// 删除职位的接口
export const reqDeleteRole=(id:number)=>request.delete<any,any>(API.DELETEROLE_URL+id)
// 获取所以权限信息接口
export const reqAllMenuList=(roleId:number)=>request.get<any,allRoleMenuResType>(API.ALLPERMISSTION_URL+roleId)
// 分配权限接口
export const reqSetRoleList=(roleId:number,permissionId:number[])=>request.post<any,any>(API.SETPERMISTION_URL+`?roleId=${roleId}&permissionId=${permissionId}`)
