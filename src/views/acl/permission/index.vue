<template>
  <div class="permission">
    <el-table :data="permisstionList" style="width: 100%; margin-bottom: 20px" border row-key="id">
      <el-table-column label="名称" prop="name" />
      <el-table-column label="权限值" prop="code" />
      <el-table-column label="修改时间" prop="createTime" />
      <el-table-column label="操作">
        <template #default="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            :disabled="row.level == 4 ? true : false"
            @click=""
            >{{ row.level == 3 ? '添加功能' : '添加菜单' }}</el-button
          >
          <el-button type="warning" size="small" :disabled="row.level == 1 ? true : false" @click=""
            >编辑</el-button
          >
          <el-button type="danger" size="small" :disabled="row.level == 1 ? true : false" @click=""
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqMenuList } from '@/api/acl/menu/index'
import type { allMenuResType, childrenType } from '@/api/acl/menu/type'
// 存储获取的全部菜单项
let permisstionList = ref<childrenType>([])
onMounted(() => {
  getHasPermisstion()
})
// 获取的全部菜单项
const getHasPermisstion = async () => {
  let res: allMenuResType = await reqMenuList()
  if (res.code == 200) {
    permisstionList.value = res.data
  }
}
</script>

<style lang="scss" scoped>
.permission {
}
</style>
