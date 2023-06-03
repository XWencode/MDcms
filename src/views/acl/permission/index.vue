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
            @click="addMenuHanler(row)"
            >{{ row.level == 3 ? '添加功能' : '添加菜单' }}</el-button
          >
          <el-button
            type="warning"
            size="small"
            :disabled="row.level == 1 ? true : false"
            @click="editMenu(row)"
            >编辑</el-button
          >
          <el-popconfirm
            :title="`确定删除菜单${row.name}吗?`"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="deleteMenu(row)"
          >
            <template #reference>
              <el-button type="danger" size="small" :disabled="row.level == 1 ? true : false"
                >删除</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" :title="changeTitle(menuInfo)" width="30%">
      <el-form label-position="right" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="menuInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="权限值">
          <el-input v-model="menuInfo.code"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="addOrEditMenu"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { reqMenuList, reqAddOrEditMneu, reqDeleteMenu } from '@/api/acl/menu/index'
import type { allMenuResType, childrenType, allMenuType } from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus'
// 存储获取的全部菜单项
let permisstionList = ref<childrenType>([])
// 控制对话框显示与隐藏
const dialogFormVisible = ref(false)
// 存储添加或修改参数信息
let menuInfo = reactive<allMenuType>({
  pid: 0,
  name: '',
  level: 0,
  code: ''
})
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
// 点击添加菜单的回调
const addMenuHanler = (row: allMenuType) => {
  // 清空上一次填写的内容
  Object.assign(menuInfo, {
    pid: 0,
    name: '',
    level: 0,
    code: ''
  })
  delete menuInfo.id
  // 重新收集参数
  menuInfo.pid = row.id as number
  menuInfo.level = row.level + 1
  dialogFormVisible.value = true
}
// 点击编辑菜单按钮的回调
const editMenu = (row: allMenuType) => {
  Object.assign(menuInfo, row)
  dialogFormVisible.value = true
}
// 点击确认添加或修改的回调
const addOrEditMenu = async () => {
  let res: any = await reqAddOrEditMneu(menuInfo)
  if (res.code == 200) {
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: menuInfo.id ? '修改成功' : '添加成功'
    })
    getHasPermisstion()
  } else {
    dialogFormVisible.value = false
    ElMessage({
      type: 'error',
      message: menuInfo.id ? '修改失败' : '添加失败'
    })
  }
}
// 点击删除的回调
const deleteMenu = async (row: allMenuType) => {
  let res: any = await reqDeleteMenu(row.id as number)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getHasPermisstion()
  } else {
    ElMessage.error('删除失败')
  }
}
// 动态决定对话框的标题
const changeTitle = (menu: any) => {
  if (menu.id) {
    if (menu.level == 4) {
      return '修改功能'
    } else {
      return '修改菜单'
    }
  } else {
    if (menu.level == 4) {
      return '添加功能'
    } else {
      return '添加菜单'
    }
  }
}
</script>

<style lang="scss" scoped></style>
