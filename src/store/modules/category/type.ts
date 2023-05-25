import type {categoryType} from '@/api/product/attr/type'
// 定义仓库state的ts类型
export interface categoryStateType {
  c1Id: string|number
  // 二级分类id
  c2Id: string|number
  // 三级分类id
  c3Id: string |number
  // 一级分类列表
  category1List: categoryType[]
  // 二级分类列表
  category2List: categoryType[]
  // 三级分类列表
  category3List: categoryType[]
}
