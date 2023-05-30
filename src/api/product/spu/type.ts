import type { ResponseData } from '@/api/user/type'
// spu数据ts类型
export interface spuValType {
  id?: number
  category3Id: number | string
  description: string
  spuImageList: null | spuImageType[]
  spuName: string
  spuPosterList: null
  spuSaleAttrList: null | saleAttrType[]
  tmId: number | string
}
export type Records = spuValType[]
// 获取spu列表返回的数据类型

export interface spuResListType extends ResponseData {
  data: {
    total: number
    size: number
    current: number
    orders: string[]
    pages: number
    records: Records
    searchCount: boolean
  }
}

// 已有的品牌的ts类型
export interface TradeMarkType {
  id?: number
  tmName: string
  logoUrl: string
}
// 返回数据的品牌ts类型
export interface spuTradeMarkResType extends ResponseData {
  data: TradeMarkType[]
}
// 每个照片的ts数据类型
export interface spuImageType {
  id?: number
  createTime?: string
  updateTime?: string
  spuId?: number
  imgName?: string
  imgUrl?: string
  name?: string
  url?: string
}
// 请求照片墙返回数据的ts类型
export interface spuImageListResType extends ResponseData {
  data: spuImageType[]
}
// spu售卖属性的ts数据类型
export interface saleAttrValueType {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: boolean
}
// 存储已有的销售属性值类型
export type spuSaleAttrValueListType = saleAttrValueType[]
// 销售属性对象的ts类型
export interface saleAttrType {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number
  saleAttrName: string
  spuSaleAttrValueList: spuSaleAttrValueListType
  flag?: boolean
  saleAttrValueName?: string
  // 用来保存sku时收集参数的ts类型
  saleAttrIdAndSaleAttrValId?: string
}
// 请求销售属性列表返回的ts数据类型
export interface saleAttrResType extends ResponseData {
  data: saleAttrType[]
}
// 某个销售属性的ts类型
export interface allSaleAttrType {
  id: number
  name: string
}
// 获取整个项目已有的全部销售属性请求返回的ts数据类型
export interface allSaleAttrListType extends ResponseData {
  data: allSaleAttrType[]
}

// 平台属性类型
export interface skuAttrType {
  attrId: number | string
  valueId: number | string
}
// 销售属性类型
export interface skuSaleAttrType {
  saleAttrId: number | string
  saleAttrValueId: number | string
}
// 保存追加sku信息的数据类型
export interface saveSkuType {
  category3Id: number | string
  spuId: number | string
  tmId: number | string
  skuName: string
  price: number | string
  weight: string
  skuDesc: string
  skuDefaultImg: string
  skuAttrValueList: skuAttrType[]
  skuSaleAttrValueList: skuSaleAttrType[]
}
// 发请求获取sku信息的ts数据类型
export interface skuResType extends ResponseData {
  data: saveSkuType[]
}
