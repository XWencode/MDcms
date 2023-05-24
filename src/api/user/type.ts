// 用户登录接口的类型
export interface loginType {
  username: string
  password: string
}

// 所有返回值都有的数据类型
export interface ResponseData{
  code:number,
  message:string,
  ok:boolean
}

// 用户登录返回数据的类型
export interface loginResDataType extends ResponseData {
  data: string
}

interface userInfoType{
  avatar: string
  name: string
  roles: string[]
  buttons: string[]
  routes: string[]
}

// 获取用户返回信息的类型
export interface userResInfoType extends ResponseData  {
  data: userInfoType
}
