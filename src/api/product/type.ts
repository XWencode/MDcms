import type { ResponseData } from '../user/type'

// 已有的品牌的ts类型
export interface TradeMarkType{
  id?:number,
  tmName:string,
  logoUrl:string
}
// 包含全部品牌数据的ts类型
export type Records=TradeMarkType[]

// 获取已有的全部品牌的数据ts类型
export interface trademarkresType extends ResponseData {
  data: {
    current: number,
    page: number,
    records: Records,
    searchCount: boolean,
    size: number,
    total: number,
  }
}
