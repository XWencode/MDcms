import type { ResponseData } from '@/api/user/type'
import type {saleAttrType} from '../spu/type'
import type {attrValType} from '../attr/type'
export interface skuDataType {
  id?: number |string
  spuId?: number
  price?: number|string
  skuName?: string
  skuDesc?: string
  weight?: number|string
  tmId?: number
  isSale?:number
  category3Id?: number
  skuDefaultImg?: string
  skuImageList?: string[]
  skuAttrValueList?: attrValType[]
  skuSaleAttrValueList?: saleAttrType[]
}
export interface skuDataListResType extends ResponseData {
  data: {
    records: skuDataType[]
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
export interface skuInfoResType extends ResponseData{
  data:skuDataType
}
