<template>
  <div class="role">
    <el-card style="margin-bottom: 10px">
      <el-form :inline="true" size="normal">
        <el-form-item label="用户名:">
          <el-input v-model="keyword" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="keyword ? false : true" @click="searchUser"
            >搜索</el-button
          >
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button type="primary" icon="plus" @click="addRole">添加职位</el-button>
      <el-table :data="roleList" border style="margin: 5px 0">
        <el-table-column type="index" align="center" label="#" width="80" />
        <el-table-column label="id" prop="id" width="80" />
        <el-table-column label="角色名称" show-overflow-tooltip prop="roleName" />
        <el-table-column label="创建时间" show-overflow-tooltip prop="createTime" />
        <el-table-column label="更新时间" show-overflow-tooltip prop="updateTime" />
        <el-table-column label="操作" width="280">
          <template #default="{ row, $index }">
            <el-button type="primary" size="small" icon="user" @click="allocationRole(row)"
              >分配权限</el-button
            >
            <el-button type="warning" size="small" icon="edit" @click="editRole(row)"
              >编辑</el-button
            >
            <el-popconfirm
              :title="`确定删除职位${row.roleName}吗?`"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="deleteRole(row)"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-config-provider :locale="locale">
        <el-pagination
          class="elpagination"
          v-model:current-page="page"
          v-model:page-size="limit"
          :page-sizes="[3, 5, 10]"
          background
          layout=" prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="getRoleList"
        />
      </el-config-provider>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog v-model="dialogFormVisible" :title="roleInfo.id ? '修改职位' : '新增职位'">
      <el-form ref="RoleForm" :model="roleInfo" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleInfo.roleName" placeholder="请输入角色名称" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmAdd"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 抽屉：用户权限tree -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>分配权限</h4>
      </template>
      <template #default>
        <el-tree
          :data="allRoleMenuList"
          ref="treeRef"
          show-checkbox
          default-expand-all
          node-key="id"
          :default-checked-keys="hasRoleMenuList"
          :props="defaultProps"
        />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer = false">取消</el-button>
          <el-button type="primary" @click="savaSetPermistion">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive, nextTick } from 'vue'
import {
  reqRoleList,
  reqAddOrUpdateRole,
  reqDeleteRole,
  reqAllMenuList,
  reqSetRoleList
} from '@/api/acl/role/index'
import type {
  roleListResType,
  roleType,
  allRoleMenuResType,
  allRoleMenuType
} from '@/api/acl/role/type'
import type { FormInstance, FormRules } from 'element-plus'
// 引入控制刷新的仓库
import useSettingStore from '@/store/setting'
// 使用中文语言
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { ElMessage } from 'element-plus'
const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))
// 当前页码数
let page = ref<number>(1)
// 每页的数据条数
let limit = ref<number>(5)
// 总数据条数
let total = ref<number>(10)
// 存储用户输入的关键字
let keyword = ref<string>('')
// 存储角色列表信息
let roleList = ref<roleType[]>([])
// 获取setting仓库的实例
const settingStore = useSettingStore()
// 控制添加角色对话框的显示与隐藏
const dialogFormVisible = ref(false)
// 表单实例
const RoleForm = ref<FormInstance>()
// 控制抽屉的显示与隐藏
const drawer = ref(false)
// tree的props配置
const defaultProps = {
  children: 'children',
  label: 'name'
}
// 存储全部的职位权限
const allRoleMenuList = ref<allRoleMenuType[]>([])
// 存储职位拥有的职位权限
let hasRoleMenuList = ref<number[]>([])
// tree的dom实例
let treeRef = ref()
// 职位名称的自定义表单校验规则
const validateRoleName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('职位名称长度至少为2'))
  }
}
// 表单校验规则
const rules = reactive<FormRules>({
  roleName: [{ required: true, validator: validateRoleName, trigger: 'blur' }]
})
// 存储将要添加或者修改的职位信息
let roleInfo = reactive<roleType>({
  createTime: '',
  updateTime: '',
  roleName: '',
  remark: null
})
onMounted(() => {
  getRoleList()
})
// 获取角色列表
const getRoleList = async (pager = 1) => {
  page.value = pager
  let res: roleListResType = await reqRoleList(page.value, limit.value, keyword.value)
  if (res.code == 200) {
    roleList.value = res.data.records
    total.value = res.data.total
  }
}
// 搜索用户
const searchUser = () => {
  getRoleList()
}
// 点击重置的回调
const reset = () => {
  // 改变仓库的isrefresh使组件重新加载实现刷新
  settingStore.isrefresh = !settingStore.isrefresh
}
// 添加角色
const addRole = () => {
  // 清空上一次填写未保存的数据
  Object.assign(roleInfo, {
    id: '',
    createTime: '',
    updateTime: '',
    roleName: '',
    remark: null
  })
  nextTick(() => {
    // 清除上一次校验的错误提示
    RoleForm.value.clearValidate('roleName')
  })
  dialogFormVisible.value = true
}
// 点击编辑按钮的回调
const editRole = (row: roleType) => {
  /* 这里使用roleInfo=row会存在一个问题,用户更改职位名称时没有保存，
      下次点击此职位编辑发现职位名称还停留在上一次修改未保存的样子,
        这里必须使用Object.assign(roleInfo,row)进行浅拷贝
  */
  Object.assign(roleInfo, row)
  nextTick(() => {
    // 清除上一次校验的错误提示
    RoleForm.value.clearValidate('roleName')
  })
  // 打开对话框
  dialogFormVisible.value = true
}
// 确认添加职位
const confirmAdd = async () => {
  await RoleForm.value.validate()
  let res: any = await reqAddOrUpdateRole(roleInfo)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: roleInfo.id ? '修改成功' : '添加成功'
    })
    // 更新留在当前页，添加去第一页
    getRoleList(roleInfo.id ? page.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: roleInfo.id ? '修改失败' : '添加失败'
    })
  }
  dialogFormVisible.value = false
}
// 分配角色权限
const allocationRole = async (row: roleType) => {
  // 将id收集到用于之后发请求修改角色权限时使用
  roleInfo.id = row.id
  let res: allRoleMenuResType = await reqAllMenuList(row.id as number)
  if (res.code == 200) {
    allRoleMenuList.value = res.data
    // 使用一个函数实现
    hasRoleMenuList.value = selectHasRoleId(allRoleMenuList.value)
  }
  drawer.value = true
}
// 筛选出该角色已有的权限id
const selectHasRoleId = (arr: any) => {
  let resArr = []
  for (let obj of arr) {
    if (obj.select && obj.level == 4) {
      resArr.push(obj.id)
    }
    if (obj.children && obj.children.length >= 1) {
      resArr = resArr.concat(selectHasRoleId(obj.children))
    }
  }
  return resArr
}
// 保存分配的角色权限
const savaSetPermistion = async () => {
  // 存储发请求保存分配权限的参数
  // 收集角色id(用于之后发请求保存分配的权限请求参数)
  let roleId = roleInfo.id as number
  // 收集勾选的权限id
  let checkIdList = treeRef.value.getCheckedKeys()
  //收集半选的角色id
  let halfCheckIdList = treeRef.value.getHalfCheckedKeys()
  // 整理勾选与半选的角色id
  let permissionId = checkIdList.concat(halfCheckIdList)
  let res: any = await reqSetRoleList(roleId, permissionId)
  if (res.code == 200) {
    drawer.value = false
    ElMessage({
      type: 'success',
      message: '保存成功'
    })
    // 页面刷新(因为可能修改的权限为当前登录的用户，刷新用来重新获取权限路由展示)
    window.location.reload()
  } else {
    drawer.value = false
    ElMessage.error('保存失败')
  }
}
// 删除职位
const deleteRole = async (row: roleType) => {
  let res: any = await reqDeleteRole(row.id as number)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getRoleList(roleList.value.length > 1 ? page.value : page.value - 1)
    // 页面刷新(如果删除的是当前登录的用户)
    window.location.reload()
  } else {
    ElMessage.error('删除失败')
  }
}
// 切换分页器一页显示条数
const handleSizeChange = () => {
  getRoleList()
}
</script>

<style lang="scss" scoped></style>
