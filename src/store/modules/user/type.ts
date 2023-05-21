import type { RouteRecordRaw } from "vue-router"
export interface UserStateType{
  token:string | null,
  menuRoutes:RouteRecordRaw[],
  username:string,
  avatar:string
}
