import request from '@/utils/request'
import type { categoryresType,attrResType,attrType } from './type'
enum API {
  // 一级商品属性分类接口
  CATEGORY1LIST_URL = '/admin/product/getCategory1',
  // 二级商品属性分类接口
  CATEGORY2LIST_URL = '/admin/product/getCategory2/',
  // 三级商品属性分类接口
  CATEGORY3LIST_URL = '/admin/product/getCategory3/',
  // 获取商品属性列表
  GOODSATTR_URL = '/admin/product/attrInfoList/',
  // 新增或修改商品属性
  ADDORADITATTR_URL='/admin/product/saveAttrInfo',
  // 删除属性
  DELETEATTR_URL='/admin/product/deleteAttr/'
}
// 获取一级分类列表
export const reqCategory1List = () => request.get<any, categoryresType>(API.CATEGORY1LIST_URL)
// 获取二级分类列表
export const reqCategory2List = (category1Id: number | string) =>
  request.get<any, categoryresType>(API.CATEGORY2LIST_URL + category1Id)
// 获取三级分类列表
export const reqCategory3List = (category2Id: number | string) =>
  request.get<any, categoryresType>(API.CATEGORY3LIST_URL + category2Id)
// 获取商品属性列表
export const reqGoodsAttrList = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string
) => request.get<any, attrResType>(API.GOODSATTR_URL + `${category1Id}/${category2Id}/${category3Id}`)
// 新增或修改商品属性的接口
export const reqaddOrEditAttr=(data:attrType)=>request.post<any,any>(API.ADDORADITATTR_URL,data)
// 通过属性id拿到对应的属性值数据接口
export const reqDeleteAttr=(attrId:number)=>request.delete<any,any>(API.DELETEATTR_URL+attrId)
