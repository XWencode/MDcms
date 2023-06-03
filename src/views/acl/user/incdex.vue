<template>
  <div class="user">
    <el-card style="margin-bottom: 10px">
      <el-form :inline="true" size="normal">
        <el-form-item label="用户名:">
          <el-input v-model="keyword"  placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="keyword?false:true" @click="searchUser">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button type="primary" @click="addUserInfo">添加</el-button>
      <el-popconfirm
        title="确定删除选中用户?"
        confirm-button-text="确定"
        cancel-button-text="取消"
        @confirm="deleteMoreUser"
      >
        <template #reference>
          <el-button type="danger" :disabled="idList.length == 0">批量删除</el-button>
        </template>
      </el-popconfirm>
      <el-table
        :data="userInfoList"
        border
        style="margin: 5px 0"
        @select="selectUser"
        @select-all="selectAllUser"
      >
        <el-table-column type="selection" width="50" />
        <el-table-column type="index" align="center" label="#" width="80" />
        <el-table-column label="id" prop="id" width="80" />
        <el-table-column label="用户名字" show-overflow-tooltip prop="username" />
        <el-table-column label="用户名称" show-overflow-tooltip prop="name" />
        <el-table-column label="用户角色" show-overflow-tooltip prop="roleName" />
        <el-table-column label="创建时间" show-overflow-tooltip prop="createTime" />
        <el-table-column label="更新时间" show-overflow-tooltip prop="updateTime" />
        <el-table-column label="操作" width="280">
          <template #default="{ row, $index }">
            <el-button type="primary" size="small" icon="user" @click="assignRoles(row)"
              >角色分配</el-button
            >
            <el-button type="warning" size="small" icon="edit" @click="editUserInfo(row)"
              >编辑</el-button
            >
            <el-popconfirm
              :title="`确定删除用户${row.name}?`"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="deleteUser(row)"
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
          @current-change="getUserList"
        />
      </el-config-provider>
    </el-card>
    <!-- 控制添加或删除用户的抽屉 -->
    <el-drawer v-model="drawer" :title="userInfo.id ? '修改用户' : '添加用户'" :with-header="true">
      <el-form :model="userInfo" ref="formRef" :rules="rules" :inline="false" size="normal">
        <el-form-item label="用户姓名" prop="username">
          <el-input placeholder="请填写用户姓名" v-model="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input placeholder="请填写用户昵称" v-model="userInfo.name"></el-input>
        </el-form-item>
        <el-form-item v-if="!userInfo.id" label="用户密码" prop="password">
          <el-input
            type="password"
            placeholder="请填写用户密码"
            v-model="userInfo.password"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary" @click="addOrUpdateUser">确定</el-button>
      </template>
    </el-drawer>
    <!-- 控制分配角色的抽屉 -->
    <el-drawer v-model="drawerRole" title="分配角色用户" :with-header="true">
      <el-form
        :model="userInfo"
        ref="formRef"
        :rules="rules"
        :inline="false"
        size="normal"
        label-width="70px"
      >
        <el-form-item label="用户姓名">
          <el-input v-model="userInfo.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色列表">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-checkbox-group v-model="role.assignRoles" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="item in role.allRolesList" :key="item.id" :label="item">{{
              item.roleName
            }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="drawerRole = false">取消</el-button>
        <el-button type="primary" @click="addRole">确定</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import {
  reqUserList,
  reqAddorUpdateUser,
  reqUserInfo,
  reqDeleteUser,
  reqRoleAssgin,
  reqAddRole,
  reqDeleteMoreUser
} from '@/api/acl/user/index'
import type {
  userInfoListResType,
  userInfoType,
  userInfoResType,
  assginRoleResType,
  roleListType,
  addRoleType
} from '@/api/acl/user/type'
import type { FormInstance } from 'element-plus'
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
// 控制添加或修改抽屉的显示与隐藏
const drawer = ref<boolean>(false)
// 控制分配角色抽屉的显示与隐藏
const drawerRole = ref<boolean>(false)
// 控制是否全选
const checkAll = ref<boolean>(false)
// 设置checkbox不确定样式
let isIndeterminate = ref<boolean>(true)
// 存储用户列表
let userInfoList = ref<userInfoType[]>([])
// 存储用户输入的关键字
let keyword = ref<string>('')
// 获取setting仓库的实例
const settingStore =useSettingStore()
// 存储用户角色管理的数据
let role = ref<roleListType>({
  assignRoles: [],
  allRolesList: []
})
// 存储添加或修改用户的信息
let userInfo = ref<userInfoType>({
  username: '',
  name: '',
  password: ''
})
onMounted(() => {
  getUserList()
})
// 搜索用户
const searchUser=()=>{
  getUserList()
}
// 点击重置的回调
const reset=()=>{
  // 改变仓库的isrefresh使组件重新加载实现刷新
  settingStore.isrefresh=!settingStore.isrefresh
}
// 表单实例
const formRef = ref<FormInstance>()
// 用户名的自定义表单校验规则
const validatorUsername = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户名字至少五位'))
  }
}
// 用户名称的自定义表单校验规则
const validatorName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户名称至少五位'))
  }
}
// 密码的自定义表单校验规则
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 6) {
    callback()
  } else {
    callback(new Error('密码至少六位'))
  }
}
// 表单校验规则
let rules = ref({
  username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
  name: [{ required: true, trigger: 'blur', validator: validatorName }],
  password: [{ required: true, trigger: 'blur', validator: validatorPassword }]
})
// 获取用户列表
const getUserList = async (pager = 1) => {
  page.value = pager
  let res: userInfoListResType = await reqUserList(page.value, limit.value,keyword.value)
  if (res.code == 200) {
    userInfoList.value = res.data.records
    total.value = res.data.total
  }
}
// 点击分配角色按钮的回调
const assignRoles = async (row: userInfoType) => {
  userInfo.value = row
  let res: assginRoleResType = await reqRoleAssgin(row.id as number)
  if (res.code == 200) {
    role.value = res.data
  }
  drawerRole.value = true
}
//按钮全选
const handleCheckAllChange = (val: boolean) => {
  role.value.assignRoles = val ? role.value.allRolesList : []
  isIndeterminate.value = false
}
// 选中角色
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === role.value.allRolesList.length

  isIndeterminate.value = checkedCount > 0 && checkedCount < role.value.allRolesList.length
}
// 点击确定添加用户角色按钮的回调
const addRole = async () => {
  // 整理参数发请求添加或修改角色
  const roleParams: addRoleType = {
    roleIdList: role.value.assignRoles.map((item) => item.id),
    userId: userInfo.value.id as number
  }
  // 发请求保存
  let res: any = await reqAddRole(roleParams)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '分配角色成功'
    })
    getUserList(page.value)
  } else {
    ElMessage.error('分配失败')
  }
  // 隐藏抽屉
  drawerRole.value = false
}
// 点击添加的回调
const addUserInfo = () => {
  // 清除上一次填写的信息
  Object.assign(userInfo.value, { username: '', name: '', password: '' })
  // 清除校验信息
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
  drawer.value = true
}
// 点击编辑的回调
const editUserInfo = async (row: userInfoType) => {
  // 清除校验信息
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
  let res: userInfoResType = await reqUserInfo(row.id as number)
  if (res.code == 200) {
    userInfo.value = res.data
  }
  drawer.value = true
}
// 添加或修改用户
const addOrUpdateUser = async () => {
  // 判断是否全部校验通过
  await formRef.value.validate()
  let res: any = await reqAddorUpdateUser(userInfo.value)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: userInfo.value.id ? '修改成功' : '添加成功'
    })
    getUserList(userInfo.value.id ? page.value : 1)
    // 如果更改的是当前用户名，需要重新登录
    // 让浏览器自动刷新一次
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: userInfo.value.id ? '修改失败' : '添加失败'
    })
  }
  // 关闭抽屉
  drawer.value = false
}
// 点击删除按钮的回调
const deleteUser = async (row: userInfoType) => {
  let res: any = await reqDeleteUser(row.id as number)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getUserList(userInfoList.value.length > 1 ? page.value : page.value - 1)
  } else {
    ElMessage.error('删除失败')
  }
}
// 存储将要删除的用户id列表
let idList = ref<any>([])
// 手动勾选用户的回调
const selectUser = (select: any, row: userInfoType) => {
  // 收集用户id
  idList.value = select.map((item: userInfoType) => item.id)
}
// 用户手动全选的回调
const selectAllUser = (select: any) => {
  idList.value = select.map((item: userInfoType) => item.id)
}

// 批量删除的回调
const deleteMoreUser = async () => {
  let res: any = await reqDeleteMoreUser(idList.value)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getUserList(userInfoList.value.length > 1 ? page.value : page.value - 1)
  } else {
    ElMessage.error('删除失败')
  }
}
// 切换分页器一页显示条数
const handleSizeChange = () => {
  getUserList()
}
</script>

<style lang="scss" scoped></style>
