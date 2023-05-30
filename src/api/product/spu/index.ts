import request from '@/utils/request'
import type {
  spuValType,
  spuResListType,
  spuTradeMarkResType,
  spuImageListResType,
  saleAttrResType,
  allSaleAttrListType,
  saveSkuType,
  skuResType
} from './type'
enum API {
  // 获取spu列表
  HASSPU_URL = '/admin/product/',
  // 获取全部品牌数据
  HASSPUTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  // 获取某个SPU下的全部的售卖商品的图片数据
  SPUIMGAGE_URL = '/admin/product/spuImageList/',
  // 获取某个spu下已有销售属性的详细数据
  SALEATTR_URL = '/admin/product/spuSaleAttrList/',
  // 获取整个项目已有的全部销售属性
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  //追加一个新的SPU
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  //更新已有的SPU
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
  // 添加一个sku
  ADDSKU_URL = '/admin/product/saveSkuInfo',
  // 查看已保存的sku信息
  SKUINFO_URL = '/admin/product/findBySpuId/',
  // 删除某个spu
  DELETESPU_URL = '/admin/product/deleteSpu/'
}
// 获取spu列表
export const reqHasSpu = (page: number, limit: number, category3Id: number | string) =>
  request.get<any, spuResListType>(API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`)
// 获取全部spu品牌数据
export const reqSpuTradeMark = () => request.get<any, spuTradeMarkResType>(API.HASSPUTRADEMARK_URL)
// 获取全部spu售卖商品图片数据
export const reqSpuImage = (spuId: number) =>
  request.get<any, spuImageListResType>(API.SPUIMGAGE_URL + `${spuId}`)
// 获取spu销售属性列表数据
export const reqSpuSaleAttr = (spuId: number) =>
  request.get<any, saleAttrResType>(API.SALEATTR_URL + `${spuId}`)
// 获取整个项目已有的全部销售属性请求
export const reqAllSaleAttr = () => request.get<any, allSaleAttrListType>(API.ALLSALEATTR_URL)
//添加一个新的SPU的
//更新已有的SPU接口
//data:即为新增的SPU|或者已有的SPU对象
export const reqAddOrUpdateSpu = (data: spuValType) => {
  //如果SPU对象拥有ID,更新已有的SPU
  if (data.id) {
    return request.post<any, any>(API.UPDATESPU_URL, data)
  } else {
    return request.post<any, any>(API.ADDSPU_URL, data)
  }
}
// 添加一个sku
export const reqAddSku = (data: saveSkuType) => request.post<any, any>(API.ADDSKU_URL, data)
/*
参数:
{
  "category3Id": 0,
  "spuId": 0,
  "tmId": 0,
  "skuName": "string",
  "price": 0,
  "weight": "string"，
  "skuDesc": "string",
  "skuDefaultImg": "string",
  "skuAttrValueList": [
    {
      "attrId": 0,
      "valueId": 0,
    }
  ],
  "skuSaleAttrValueList": [
    {
      "saleAttrId": 0,
      "saleAttrValueId": 0,
    }
  ],
}
*/
// 查看已保存的sku信息
export const reqSkuInfo = (spuId: number) => request.get<any, skuResType>(API.SKUINFO_URL + spuId)
// 删除某个spu的接口
export const reqDeleteSpu = (spuId: number) => request.delete<any, any>(API.DELETESPU_URL + spuId)
