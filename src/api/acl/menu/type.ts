import type { ResponseData } from "@/api/user/type";
// 角色的所有权限列表ts的数据类型
export interface allMenuType {
  id?: 1
  createTime?: string
  updateTime?: string
  pid: number
  name: string
  code: string
  toCode?: null
  type?: number
  status?: null
  level: number
  children?: childrenType
  select?: boolean
}
export type childrenType = allMenuType[]
export interface allMenuResType extends ResponseData {
  data: allMenuType[]
}
