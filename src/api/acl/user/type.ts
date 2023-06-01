import type { ResponseData } from '@/api/user/type'
export interface userInfoType {
  id?: number | string
  createTime?: string
  updateTime?: string
  username: string
  password: string
  name: string
  phone?: null
  roleName?: string
}
export interface userInfoListResType extends ResponseData {
  data: {
    records: userInfoType[]
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
export interface userInfoResType extends ResponseData {
  data: userInfoType
}
export interface roleType {
  id: number
  createTime: string
  updateTime: string
  roleName: string
  remark: null
}
export interface roleListType {
  assignRoles: roleType[]
  allRolesList: roleType[]
}
export interface assginRoleResType extends ResponseData {
  data: roleListType
}
export interface addRoleType {
  roleIdList: number[]
  userId: number
}
