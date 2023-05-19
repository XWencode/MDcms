// 用户登录接口的类型
export interface loginType {
  username: string
  password: string
}
// token类型
interface tokenType {
  token: string
}
// 用户登录返回数据的类型
export interface loginResDataType {
  code: number
  data: tokenType
}

interface userInfoType {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}

interface user {
  checkUser: userInfoType
}

// 获取用户返回信息的类型
export interface userReqInfoType {
  code: number
  data: user
}
