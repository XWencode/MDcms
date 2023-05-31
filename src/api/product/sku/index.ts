import request from '@/utils/request'
import type {skuDataListResType,skuInfoResType} from './type'

enum API{
  // 获取sku列表信息
  SKULIST_URL='/admin/product/list/',
  SKUONSALE_URL='/admin/product/onSale/',
  SKUCANCELSALE_URL='/admin/product/cancelSale/',
  // 获取某个sku的详情信息
  SKUINFO_URL='/admin/product/getSkuInfo/',
  // 删除sku
  DELETESKU_URL='/admin/product/deleteSku/'
}
// 获取sku列表的接口
export const reqSkuList=(page:number,limit:number)=>request.get<any,skuDataListResType>(API.SKULIST_URL+`${page}/${limit}`)
// 商品上架接口
export const reqOnSale=(skuId:number)=>request.get<any,any>(API.SKUONSALE_URL+skuId)
// 商品下架接口
export const reqCancelSale=(skuId:number)=>request.get<any,any>(API.SKUCANCELSALE_URL+skuId)
// 获取某个商品详细信息
export const reqSkuInfo=(skuId:number)=>request.get<any,skuInfoResType>(API.SKUINFO_URL+skuId)
// 删除sku
export const reqDeleteSku=(skuId:number)=>request.delete<any,any>(API.DELETESKU_URL+skuId)
