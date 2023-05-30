import type { ResponseData } from '../../user/type'

// 三级列表ts数据类型
export interface categoryType{
  id:number | string,
  name:string,
  category1Id?:number,
  category2Id?:number,
}
// 相应接口返回的数据类型
export interface categoryresType extends ResponseData{
  data:categoryType[]
}

// 属性值ts类型
export interface attrValType{
  id?:number,
  valueName:string,
  attrId?:number,
  flag?:boolean
}
// 属性值列表ts类型
export type attrvalListType=attrValType[]
// 属性对象ts类型
export interface attrType{
  id?:number,
  attrName:string,
  categoryId:number|string,
  categoryLevel:number,
  attrValueList:attrvalListType,
  // 用来保存sku时收集参数的ts类型
  attrIdAndAttrValueId?:string
}
//每个对象的数组的ts类型
export type attrListType=attrType[]
// 属性接口返回的ts类型
export interface attrResType extends ResponseData{
  data:attrType[]
}
