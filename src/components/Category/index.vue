<template>
  <div class="category">
    <el-card class="el_card">
      <el-form ref="form" :inline="true">
        <el-form-item label="一级分类">
          <el-select
            v-model="categoryStore.c1Id"
            placeholder="请选择属性"
            size="large"
            :disabled="scene==1"
            @change="getC2"
          >
            <el-option
              v-for="c1 in categoryStore.category1List"
              :key="c1.id"
              :label="c1.name"
              :value="c1.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select
            v-model="categoryStore.c2Id"
            placeholder="请选择属性"
            size="large"
            :disabled="(scene==0 && categoryStore.category2List.length > 0 )? false : true"
            @change="getC3"
          >
            <el-option
              v-for="c2 in categoryStore.category2List"
              :key="c2.id"
              :label="c2.name"
              :value="c2.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select
            v-model="categoryStore.c3Id"
            placeholder="请选择属性"
            size="large"
            :disabled="(scene==0 && categoryStore.category3List.length > 0) ? false : true"
          >
            <el-option
              v-for="c3 in categoryStore.category3List"
              :key="c3.id"
              :label="c3.name"
              :value="c3.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted,onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
import useCategoryStore from '@/store/modules/category'
// 接收父组件传过来的scene
defineProps(['scene'])
const categoryStore = useCategoryStore()
onMounted(() => {
  getC1()
})
// 获取一级分类列表
const getC1 = async () => {
  try {
    // 通知仓库获取一级分类列表
    await categoryStore.getCategory1List()
  } catch (error) {
    ElMessage({
      type: 'error',
      message: error
    })
  }
}
// 获取二级分类列表
const getC2 = async () => {
  try {
    // 清空二级三级列表清空
    categoryStore.c2Id = ''
    categoryStore.c3Id = ''
    categoryStore.category3List = []
    // 通知仓库获取二级分类列表
    await categoryStore.getCategory2List()
  } catch (error) {
    ElMessage({
      type: 'error',
      message: error
    })
  }
}
// 获取三级分类列表
const getC3 = async () => {
  try {
    // 清空三级分类列表
    categoryStore.c3Id = ''
    // 通知仓库获取三级分类列表
    await categoryStore.getCategory3List()
  } catch (error) {
    ElMessage({
      type: 'error',
      message: error
    })
  }
}
// 组件销毁的时候清空仓库数据
onBeforeUnmount(()=>{
  // pinia仓库对象身上有$reset方法可以清空仓库数据使恢复初始化状态
  categoryStore.$reset()
})

</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 10px;
}
</style>
