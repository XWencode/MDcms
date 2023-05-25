import { defineStore } from 'pinia'
import { reqCategory1List, reqCategory2List, reqCategory3List } from '@/api/product/attr/index'
import type { categoryresType } from '@/api/product/attr/type'
import type { categoryStateType } from './type'

const useCategoryStore = defineStore('category', {
  state: ():categoryStateType => ({
    // 一级分类id
    c1Id: '',
    // 二级分类id
    c2Id: '',
    // 三级分类id
    c3Id: '',
    // 一级分类列表
    category1List: [],
    // 二级分类列表
    category2List: [],
    // 三级分类列表
    category3List: []
  }),
  actions: {
    async getCategory1List() {
      let res: categoryresType = await reqCategory1List()
      if (res.code == 200) {
        this.category1List = res.data
        return 'ok'
      } else {
        return Promise.reject("获取一级分类列表失败")
      }
    },
    // 获取二级分类列表
    async getCategory2List() {
      let res: categoryresType = await reqCategory2List(this.c1Id)
      if(res.code==200){
        this.category2List=res.data
        return 'ok'
      }else{
        return Promise.reject("获取二级分类列表失败")
      }
    },
    // 获取三级分类列表
    async getCategory3List() {
      let res: categoryresType = await reqCategory3List(this.c2Id)
      if(res.code==200){
        this.category3List=res.data
        return 'ok'
      }else{
        return Promise.reject("获取三级分类列表失败")
      }
    },
  }
})
export default useCategoryStore
