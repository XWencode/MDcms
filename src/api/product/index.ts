import request from '@/utils/request'
import type { trademarkresType,TradeMarkType } from './type'
enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 新增品牌信息
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改品牌信息
  UPDATATRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 删除品牌信息
  DELETETRADEMARK_URL='/admin/product/baseTrademark/remove/'
}
// 获取已有品牌数据接口
export const reqTrademarkList = (page: number, limit: number) =>
  request.get<any, trademarkresType>(API.TRADEMARK_URL + `${page}/${limit}`)
// 新增或者修改品牌信息
export const reqAddTrademark = (data:TradeMarkType) => {
  // 如果带id说明是修改品牌信息
  if (data.id) {
    return request.put<any,any>(API.UPDATATRADEMARK_URL, data)
  } else {
    // 增加品牌
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}
// 删除品牌信息
export const reqDeleteTrademark = (id:number) =>
  request.delete<any, trademarkresType>(API.DELETETRADEMARK_URL + `${id}`)
