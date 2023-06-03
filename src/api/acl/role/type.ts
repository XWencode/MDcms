import type { ResponseData } from '@/api/user/type'
export interface roleType {
  id?: number
  createTime: string
  updateTime: string
  roleName: string
  remark: null
}
export type records = roleType[]
export interface roleListResType extends ResponseData {
  data: {
    records: records
    total: number
    size: number
    current: number
    orders: string[]
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}

// 角色的所有权限列表ts的数据类型
export interface allRoleMenuType {
  id: 1
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: null
  toCode: null
  type: number
  status: null
  level: number
  children?: childrenType
  select: boolean
}
export type childrenType = allRoleMenuType[]
export interface allRoleMenuResType extends ResponseData {
  data: allRoleMenuType[]
}
